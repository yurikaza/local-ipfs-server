import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface ILink {
  link: string;
  userName: string;
  key: string;
  fileName: string;
  fileSize: string;
}

// 2. Create a Schema corresponding to the document interface.
export const linkSchema = new Schema<ILink>({
  link: { type: String, required: true },
  userName: { type: String, required: true },
  key: { type: String, required: true },
  fileName: { type: String, required: false },
  fileSize: { type: String, required: true },
});

// 3. Create a Model.
const Link = model<ILink>("Link", linkSchema);

export default Link;
