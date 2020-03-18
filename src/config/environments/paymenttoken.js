import { appUtils } from "../../utils/app.utils";

export const paytok = {
  env: "paytok",
  portalUrl: "https://isw-portal-v2-paytok.k12.isw.la",
  mufasaTemplateUrl: "https://mufasa-qa.interswitchng.com/p/templates",
  xsrfToken: document.getElementById("csrf-token")
    ? document.getElementById("csrf-token").getAttribute("content")
    : appUtils.getCookie("XSRF-TOKEN"),
  xsrfTokenHeader: document.getElementById("csrf-token")
    ? document.getElementById("csrf-header").getAttribute("content")
    : "X-XSRF-TOKEN"
};
