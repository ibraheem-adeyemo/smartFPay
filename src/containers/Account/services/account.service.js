import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

const postLogin = async (params, history) => {
    // const response = await fetch(API_URLS.AUTH.LOGIN, {
    //   method: 'POST',
    //   body: JSON.stringify(params),
    // })
    // const data = await response.json();

    const data = { token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXltZW50Y29udHJvbEBoYm5nLmNvbSIsInBlcm1pc3Npb25zIjpbIlNVUEVSX0FETUlOIiwiVVBEQVRFX0NVU1RPTUVSIl0sImlhdCI6MTYxNDg0OTc5NCwiZXhwIjoxNjE4NDQ5Nzk0fQ.MQvucHfPTGnnmCZbGc2EKMMMZkknUVcvUA2BZh13eUg" }
    
    if(data.token) {
      window.localStorage.setItem('pc-token', data.token)
      return { error: false }
    }
    else return {}
      //throw Error("Login failed");
  
}

export const accountService = {
    postLogin,
};
