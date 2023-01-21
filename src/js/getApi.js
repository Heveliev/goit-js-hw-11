const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '33000305-b629afd170357acb9b33609ec';


async function getApi(val,pageNow,totalCard) {
    return axios.get(`${BASE_URL}?key=${KEY}&q=${val}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNow}&per_page=${totalCard}`)
    .then(resp=>resp.data)
      };


      export {getApi};