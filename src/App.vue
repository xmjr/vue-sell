<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item border-top">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link> 
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import Header from 'header/Header'
  import { getSeller } from '@/api/index.js'
  import { urlParse } from '@/assets/js/util.js'

  export default {
    name: 'App',
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      }
    },
    created() {
      this._getSeller()
    },
    methods: {
      _getSeller() {
        getSeller('?id=' + this.seller.id).then((seller) => {
          this.seller = Object.assign({}, this.seller, seller);
        })
      }
    },
    components: {
      Header
    }
  }
</script>
<style lang="stylus" scoped>
@import '~@/assets/stylus/mixins.styl' 

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(1, 17, 27, .1))
    .tab-item
      flex: 1
      text-align: center
      font-size: 14px
      color: rgb(77, 85, 93)
    .active
      color: rgb(240, 20 ,20)
      border-1px(rgb(240, 20 ,20))
      
</style>
