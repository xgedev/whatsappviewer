import JSZIP from "jszip";

export default {
 readJSONBlob(blob) {
  return new Promise((resolve) => {
   let reader = new FileReader();
   reader.addEventListener("loadend", () => {
    try {
     resolve(JSON.parse(reader.result));
    } catch (err) {
     console.log(err);
     resolve({});
    }
   })
   reader.readAsBinaryString(blob);
  });
 },
 readZipBlob(blob) {
  return new Promise((resolve) => {
   let zip = new JSZIP();
   let reader = new FileReader();
   reader.addEventListener("loadend", async () => {
    try {
     resolve(await zip.loadAsync(reader.result));
    } catch (err) {
     console.log(err);
     resolve({});
    }
   })
   reader.readAsArrayBuffer(blob);
  });
 }
}