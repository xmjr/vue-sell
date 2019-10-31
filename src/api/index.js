import axios from 'axios'


const urlMap = {
  development: '/',
  production: 'https://xmjr.gitee.io/vue-element/'
}
const baseUrl = urlMap[process.env.NODE_ENV]

const ERR_OK = 0
const getSeller = get('api/seller')
const getGoods = get('api/goods')
const getRatings = get('api/ratings')

export {
  getSeller,
  getGoods,
  getRatings
}

function get(url) {
  return function(params) {
    return axios.get(baseUrl + url, {
      params
    }).then((res)=> {
      const {errno, data} = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch((e)=> {
      console.log(e)
    })
  }
}

