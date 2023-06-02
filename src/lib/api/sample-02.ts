import axios from 'axios';
import { stringify } from 'qs';

var data = stringify({
  'username': 'xxxx',       // xxx account: 6~22 characters
  'nickname': 'xxxx',       // Nickname in the game: 2~32 characters
  'siteUsername': 'xxxx',  // The user ID of the system you are trying to access: 2~32 characters
  'groupKey': 'xxxx'       // The partner ID of the system you are trying to access: 2~32 characters
});

var config = {
  method: 'post',
  url: 'https://xxx.xxx.com/register',       // SIGN-UP
  headers: {
    'k-username': 'xxxx',                        // LOGIN ID
    'k-secret': 'xxxx', // API KEY
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: data,
  timeout: 10000
};

export async function RunAPI() {

  return axios(config)
    .then(function (response: any) {
      console.debug(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error: any) {
      console.debug(error);
    });

}
