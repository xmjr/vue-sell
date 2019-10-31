import axios from 'axios'


// const urlMap = {
//   development: '/',
//   production: 'http://xmjr.gitee.io/vue-sell/'
// }
// const baseUrl = urlMap[process.env.NODE_ENV]

const ERR_OK = 0
const getSeller = get('seller.json')
const getGoods = get('goods.json')
const getRatings = get('ratings.json')


export {
  getSeller,
  getGoods,
  getRatings
}

function get(url) {
  return function(params) {
    return axios.get(process.env.VUE_APP_API + url, {
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

