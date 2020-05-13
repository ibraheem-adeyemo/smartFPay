import { dev } from "./environments/dev";
import { production } from "./environments/prod";
import { paytok } from "./environments/paymenttoken";

let config;

switch (process.env.REACT_APP_STAGE) {
  case "dev":
    config = dev;
    break;
  case "prod":
    config = production;
    break;
  case "paytok":
    config = paytok;
    break;
  default:
    config = dev;
}

export const appConfig = {
  ...config,
  appName: "Payment Control",
  apiName: "payment-control-management",
  apiVersion: "api/v1",

  get apiBaseUrl() {
    // return `/${this.apiName}/${this.apiVersion}`;
    return `http://payment-control-management-service.k13.isw.la/api`;
  }
};
