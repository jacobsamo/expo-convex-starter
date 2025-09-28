import * as z from "zod";

export const defaultFields = {
  _id: z.string(),
  _creationTime: z.number(),
};

// Add default fields to a schema to form a complete table schema
export const defaultSchema = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
) => {
  return schema.extend(defaultFields);
};

// Make _id and _creationTime optional for inserts
export const insertSchema = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
) => {
  return schema.extend({
    _id: defaultFields._id.optional(),
    _creationTime: defaultFields._creationTime.optional(),
  });
};

// Make all fields optional for editing
export const editSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
  return insertSchema(schema).partial();
};