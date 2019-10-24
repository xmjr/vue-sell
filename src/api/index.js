import axios from 'axios'

const ERR_OK = 0
const getSeller = get('/api/seller')
const getGoods = get('/api/goods')
const getRatings = get('/api/ratings')

export {
  getSeller,
  getGoods,
  getRatings
}

function get(url) {
  return function(params) {
    return axios.get(url, {
      params
    }).then((res)=> {
      const {errno, data} = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch(()=> {

    })
  }
}

