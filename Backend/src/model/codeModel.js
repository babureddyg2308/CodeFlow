import { Schema, model } from "mongoose";

const CodeSchema = new Schema(
  {
    fullCode: {
      html: String,
      css: String,
      javascript: String,
    },
    title: { type: String, required: true },
    ownerInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ownerName: String,
  },
  { timestamps: true }
);

export const codeModel = mongoose.model("Code", CodeSchema);


