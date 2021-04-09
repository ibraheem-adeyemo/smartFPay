import { logoutUrl } from "../constants/app.constants";
import { appConfig } from "../config/config";

const GENERIC_ERROR = "Something went wrong";

class CustomError extends Error {
  constructor(message, errors) {
    super(message);
    this.errors = errors;
  }
}

const createUrlParams = (params, encode) => {
  const esc = encodeURIComponent;
  const cleanParams = JSON.parse(JSON.stringify(params));
  const query = Object.keys(cleanParams)
    .map(k =>
      encode ? esc(k) + "=" + esc(params[k]) : esc(k) + "=" + params[k]
    )
    .join("&");

  return query;
};

const handleResponse = response => {
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.indexOf("application/json") !== -1;
  if (response.ok) {
    if (isJson) {
      return response.json();
    }
    if (response.status === 204) {
      return "Successfully Updated";
    }
    return response.text();
  } else {
    if (isJson) {
      return response.json().then(json => {
        if (process.env.NODE_ENV === "production") {
          if (json.code === 440) {
            window.parent.location.replace(logoutUrl);
          }
        }

        const error = new CustomError(
          json.responseMessage ||
            json.description ||
            json.error_description ||
            GENERIC_ERROR,
          json.errors
        );
        return Promise.reject(Object.assign(error, { response }));
      });
    } else {
      throw new Error('GENERIC_ERROR');
    }
  }
};

export const apiCall = (
  requestType,
  url,
  customHeaders,
  requestBody,
  requestParams
) => {
  let headers = {
    "Content-type": "application/json",
    "Authorization": `Bearer ${window.localStorage.getItem('pc-token')}`,
    ...customHeaders
  };

  const { xsrfToken, xsrfTokenHeader } = appConfig;
  if (xsrfToken && xsrfTokenHeader) {
    headers[xsrfTokenHeader] = xsrfToken;
  }

  const requestOptions = {
    method: requestType,
    headers,
    body: requestBody ? JSON.stringify(requestBody) : undefined
  };
  if (requestParams) {

    const urlParams = createUrlParams(requestParams);
    url = `${url}?${urlParams}`;
  }

  return fetch(url, requestOptions).then(handleResponse);
};

export const apiCallForUpload = async (
  requestType,
  url,
  requestBody,
  requestParams
) => {
  let headers = {};
  const { xsrfToken, xsrfTokenHeader } = appConfig;

  if (xsrfToken && xsrfTokenHeader) {
    headers[xsrfTokenHeader] = xsrfToken;
  }

  const requestOptions = {
    method: requestType,
    body: requestBody,
    headers
  };
  if (requestParams) {
    const urlParams = createUrlParams(requestParams);
    url = `${url}?${urlParams}`;
  }
  return fetch(url, requestOptions).then(handleResponse);
};

export const apiCallForDownload = async (
  requestType,
  url,
  customHeaders,
  requestBody,
  requestParams,
  filename
) => {
  let headers = {
    ...customHeaders
  };
  const { xsrfToken, xsrfTokenHeader } = appConfig;
  let newUrl;
  if (xsrfToken && xsrfTokenHeader) {
    headers[xsrfTokenHeader] = xsrfToken;
  }

  const requestOptions = {
    method: requestType,
    headers,
    body: requestBody ? JSON.stringify(requestBody) : undefined,
    responseType: 'blob'
  };
  if (requestParams) {

    const urlParams = createUrlParams(requestParams);
    url = `${url}?${urlParams}`;
  }


  return fetch(url, requestOptions).then(async (response) => {
    let resp = await response.text();
     newUrl = window.URL.createObjectURL(new Blob([resp]))
     const link = document.createElement('a');
     link.href = newUrl;
     link.setAttribute('download', filename); //or any other extension
     document.body.appendChild(link);
     link.click();
  }).catch((err) => {
    console.log('Error downloading: ', err)
  });
};
