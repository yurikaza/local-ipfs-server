import Hash from "../models/fromDir.model";
import Output from "../models/fromFile.model";
import { create, globSource, urlSource } from "ipfs-http-client";

export async function getDataFromIpfs() {
  const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  for (var i = 0; i < Infinity; i++) {
    const hash: any[] = await Hash.find();
    if (hash.length > 0) {
      console.log(`File Upload Start... ${hash.length} File Uploading`);

      for (let index = 0; index < hash.length; index++) {
        const element = hash[index];

        console.log(element);

        const ipfs = create();

        for await (const file of ipfs.addAll(
          globSource(element.fileDir, element.file)
        )) {
          console.log(file);

          const newFile = `https://ipfs.io/ipfs/${file.cid}?filename=${element.fileName}`;

          return newFile;
        }
      }
      //  await sleep(5000);
    }
    console.log("0 files founded");
    await sleep(5000);
  }
}
