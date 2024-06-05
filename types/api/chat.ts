import { z } from "zod";

export const CreateChatSchema = z.object({
  users: z.array(z.string()).min(2),
  chatName: z.string().min(3),
  avatar: z.string().optional(),
});

export type TCreateChatSchema = z.infer<typeof CreateChatSchema>;

export const EditChatSchema = z.object({
  chatName: z.string().min(3),
  avatar: z.string().optional(),
});
