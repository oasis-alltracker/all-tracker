import { barcodeSearchFatSecret } from "./fatSecretAPI";
import { barcodeSearchOFF } from "../OFF/offAPI";

export async function barcodeSearch(barcode) {
  var barcodeResult = await barcodeSearchFatSecret(barcode);
  if (barcodeResult == null) {
    console.log("failed in fat secret;");
    barcodeResult = await barcodeSearchOFF(barcode);
  }
  console.log(barcodeResult);
  return barcodeResult;
}
