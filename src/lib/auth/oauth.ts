import { prisma } from "@/lib/db";
import type { AuthProvider } from "@prisma/client";
import { createSessionForUser, type SessionMeta } from "@/lib/auth/session";
import { randomToken } from "@/lib/auth/crypto";

export interface OAuthProfile {
  provider: AuthProvider;
  providerUserId: string;
  email: string | null;
  displayName: string | null;
}

export async function loginWithOAuthProfile(profile: OAuthProfile, meta: SessionMeta = {}) {
  const user = await prisma.$transaction(async (tx) => {
    const existingIdentity = await tx.authIdentity.findUnique({
      where: {
        provider_providerUserId: {
          provider: profile.provider,
          providerUserId: profile.providerUserId,
        },
      },
      include: { user: true },
    });

    if (existingIdentity) return existingIdentity.user;

    const email = profile.email?.trim().toLowerCase() ?? null;
    const existingUserByEmail = email ? await tx.user.findUnique({ where: { email } }) : null;

    const linkedUser =
      existingUserByEmail ??
      (await tx.user.create({
        data: {
          email: email ?? `${profile.provider}-${profile.providerUserId}@gdetech.local`,
          displayName: profile.displayName ?? undefined,
        },
      }));

    await tx.authIdentity.create({
      data: {
        userId: linkedUser.id,
        provider: profile.provider,
        providerUserId: profile.providerUserId,
        email,
      },
    });

    return linkedUser;
  });

  const session = await createSessionForUser(user.id, meta);
  return { user, ...session };
}

export function randomState(): string {
  return randomToken(24);
}
