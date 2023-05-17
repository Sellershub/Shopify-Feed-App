import axios            from 'axios';
import { NGROK_TUNNEL } from '../Constants';

export const apiAxios = axios.create({
  baseURL: `${NGROK_TUNNEL}/api`,
  headers: {
    "content-type": "application/json"
  },
});

export const getMediaInstagramApi = async (code) => {
   const { data: authData } = await axios.post(`${NGROK_TUNNEL}/api/shopify/auth/token`, { code });
  console.log("authData", authData);
  // setInstagramData(authData);
  axios
    .get(`${NGROK_TUNNEL}/api/shopify/instagram/posts?access_token=${authData.access_token}&user_id=${authData.user_id}`)
    .then(({ data: data_1 }) => {
    })
    .catch((err) => console.log("err", err));
}

export default apiAxios;