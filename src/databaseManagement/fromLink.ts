import Hash from "../models/fromDir.model";
import Output from "../models/fromFile.model";
import { create, urlSource } from "ipfs-http-client";
import Link from "../models/fromFile.model";
import LinkOutput from "../models/linkOutput.model";

export async function fromLink() {
  const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  for (var i = 0; i < Infinity; i++) {
    const hash: any[] = await Link.find();

    if (hash.length > 0) {
      console.log(`File Upload Start... ${hash.length} File Uploading`);

      for (let index = 0; index < hash.length; index++) {
        const element = hash[index];
        console.log(element);

        const projectId = "2DAOlno5zO07ea3deWjDmmEuA4i";
        const projectSecret = "2a501091bc040cd731353f70f69663b8";
        const auth =
          "Basic " +
          Buffer.from(projectId + ":" + projectSecret).toString("base64");

        const ipfs = create({
          host: "ipfs.infura.io",
          port: 5001,
          protocol: "https",
          headers: {
            authorization: auth,
          },
        });

        const file = await ipfs.add(urlSource(`${element.link}`));
        const newFile = `https://ipfs.io/ipfs/${file.cid}`;
        console.log("New File Upload Ipfs Link is " + newFile);

        const data = new LinkOutput({
          link: newFile,
          userName: element.userName,
          key: element.key,
          fileName: element.fileName,
          fileSize: element.fileSize,
        });

        await data.save();

        await Link.findOneAndDelete({
          link: element.link,
        });

        console.log("File Uploaded 5 Sec Sleep Time");
        await sleep(1000);
      }
    }
    console.log("0 files founded");
    await sleep(5000);
  }
}
