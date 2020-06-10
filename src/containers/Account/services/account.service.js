import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

const postLogin = async (params, history) => {
  fetch(API_URLS.AUTH.LOGIN, {
    method: 'POST',
    body: JSON.stringify(params),
  })
  .then(response => response.json())
  .then(data => {
    if(data.token){
      window.localStorage.setItem('token', data.token)
      history.push('/dashboard')
    } 
    console.log('Success:', data);
  })
  .catch(err => {
    console.error('Error:', err)
  })
}

export const accountService = {
    postLogin,
};
