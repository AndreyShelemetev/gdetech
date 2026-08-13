import { z } from "zod";

export const emailRequestSchema = z.object({
  email: z.string().trim().min(3).email(),
});

export const emailVerifySchema = z.object({
  email: z.string().trim().min(3).email(),
  code: z.string().trim().regex(/^\d{6}$/, "Код должен состоять из 6 цифр"),
});

const phoneSchema = z
  .string()
  .trim()
  .min(10, "Укажите номер телефона")
  .max(20)
  .regex(/^[+\d][\d\s()-]{8,19}$/, "Проверьте формат номера телефона");

export const hubApplicationSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(120),
  email: z.string().trim().min(3).email(),
  phone: phoneSchema,
  projectDescription: z.string().trim().min(10, "Расскажите чуть подробнее").max(4000),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export const expertMeetingSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(120),
  email: z.string().trim().min(3).email(),
  phone: phoneSchema,
  expertSlug: z.string().trim().min(1, "Выберите эксперта"),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export type HubApplicationInput = z.infer<typeof hubApplicationSchema>;
export type ExpertMeetingInput = z.infer<typeof expertMeetingSchema>;
