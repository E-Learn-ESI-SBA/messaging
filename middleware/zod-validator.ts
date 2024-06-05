import { z, ZodObject } from "zod";

export function zodValidator<T extends z.ZodRawShape>(
  schema: unknown,
  zodSchema: ZodObject<T>,
): z.infer<typeof zodSchema> | null {
  try {
    if (!schema) {
      return null;
    }
    zodSchema.parse(schema);
    return schema as z.infer<typeof zodSchema>;
  } catch (e) {
    console.log(e);
    return null;
  }
}
