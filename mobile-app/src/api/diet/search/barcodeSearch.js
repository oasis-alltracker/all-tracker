import { barcodeSearchFatSecret } from "../fatSecret/fatSecretAPI";
import { barcodeSearchOFF } from "../OFF/offAPI";

export async function barcodeSearch(barcode) {
  var barcodeResult = await barcodeSearchFatSecret(barcode);
  if (barcodeResult == null) {
    barcodeResult = await barcodeSearchOFF(barcode);
  }
  return barcodeResult;
}
