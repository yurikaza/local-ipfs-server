import { model } from "mongoose";
import { ILink, linkSchema } from "./fromFile.model";

const LinkOutput = model<ILink>("LinkOutput", linkSchema);

export default LinkOutput;
