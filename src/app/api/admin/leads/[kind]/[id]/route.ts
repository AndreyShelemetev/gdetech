import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminUser } from "@/lib/auth/session";

const VALID_STATUSES = ["new", "contacted", "done"] as const;
type LeadStatus = (typeof VALID_STATUSES)[number];

function isValidStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && (VALID_STATUSES as readonly string[]).includes(value);
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ kind: string; id: string }> }) {
  const admin = await requireAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { kind, id } = await context.params;
  const body = await req.json().catch(() => null);

  if (!isValidStatus(body?.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  if (kind === "hub") {
    await prisma.hubApplication.update({ where: { id }, data: { status: body.status } });
  } else if (kind === "expert") {
    await prisma.expertMeetingRequest.update({ where: { id }, data: { status: body.status } });
  } else {
    return NextResponse.json({ error: "Unknown kind" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
