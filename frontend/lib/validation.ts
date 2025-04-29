import { ZodObject } from "zod";

export function validateData(schema: ZodObject<any>, data: any) {
    const validatedData = schema.safeParse(data);

  if (validatedData.error) {
    const errors = {};
    validatedData.error.errors.forEach(err => {
        errors[err.path[0]] = err.message;
      });
      return { errors };
  }
  return null
}