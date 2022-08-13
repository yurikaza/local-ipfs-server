import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";

interface IHash {
  fileDir: string;
  file: string;
}

const hashSchema = new Schema<IHash>({
  fileDir: { type: String, required: true },
  file: { type: String, required: true },
});

const Hash = model<IHash>("File", hashSchema);

export default Hash;
