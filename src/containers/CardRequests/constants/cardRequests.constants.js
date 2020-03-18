import { createCRUDConstants } from "../../../utils/redux.utils";

export const nameSpace = "CARDREQUESTS";
export const cardRequestConstants = createCRUDConstants(nameSpace, [
  "GETSTATUS"
]);
export const requestStatus = [
  { 
    name: "REQUEST_VALIDATION_FAILED",
    bg: "red",
    fontColor: "#fff",
    description: "A required field is not sent or it can’t find one or more of the objects sent in the request"
  },
  {
    name: "REQUEST_PRODUCTION_FAILED",
    bg: "#FF7733",
    fontColor: "#fff",
    description: "The call to produce the card(s) failed",
    shortCode: "RPF"
  },
  {
    name: "REQUEST_SCHEDULED_FOR_PERSONALIZATION",
    bg: "#33FCFF",
    fontColor: "inherit",
    description: "Card(s) has been produced and a preparation job has been scheduled on SCP. At this point, the card is already produced",
    shortCode: "RSFP"
  },
  {
    name: "REQUEST_PERSONALIZATION_FAILED",
    bg: "#FFC433",
    fontColor: "inherit",
    description: "Preparation job failed.",
    shortCode: "RPpF"
  },
  {
    name: "REQUEST_UPLOAD_FAILED",
    bg: "red",
    fontColor: "#fff",
    description: "There is a failure to upload the card data to the perso company. The file can always be downloaded from SCP",
    shortCode: "RUF"
  },
  {
    name: "REQUEST_UPLOADED_TO_PERSO",
    bg: "#33FFA5",
    fontColor: "inherit",
    description: "Card data is successfully uploaded to the perso SFTP location and this is the final step in our flow",
    shortCode: "RUTP"
  },
  {
    name: "REQUEST_FAILED",
    bg: "red",
    fontColor: "#fff",
    description: "There is a system failure on SCP (cases like exceptions been thrown by some methods)",
    shortCode: "RF"
  }
]
