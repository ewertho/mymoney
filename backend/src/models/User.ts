import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    preferredLanguage: {
      type: String,
      enum: ["pt-BR", "en-US"],
      default: "pt-BR",
    },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema> & { _id: string };

export const UserModel = model("User", userSchema);
