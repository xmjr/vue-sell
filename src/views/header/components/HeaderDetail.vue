<template>
  <div class="detail">
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <h1 class="name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star
            :size="48"
            :score="seller.score"
          ></star>
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
        <div class="title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="bulletin">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
    </div>
    <div class="detail-close">
      <i class="icon-close"  @click.stop="hideDetail"></i>
    </div>
  </div>
</template>
<script>
  import Star from '@/components/star/Star'

  export default {
    name: 'HeaderDetail',
    props: {
      seller: Object,
      classMap: Array
    },
    methods: {
      hideDetail() {
        this.$emit('hide')
      }
    },
    components: {
      Star
    }
  }
</script>
<style lang="stylus" scoped>
@import '~@/assets/stylus/mixins.styl'


  .detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    background: rgba(7, 17, 27, .8)
    backdrop-filter: blur(10px)
    .detail-wrapper
      min-height: 100%
      width:  100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          line-height: 16px
          text-align: center
          font-size: 16px
          font-weight: 700
        .star-wrapper
          margin-top: 18px
          padding: 2px 0
          text-align: center
        .title
          display: flex
          width: 80%
          margin: 28px auto 24px
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, .2)
          .text
            padding: 0 12px
            font-size: 14px
            font-weight: 700
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding: 0 12px
            margin-bottom: 12px
            font-size: 0
            &:last-child
              margin-bottom: 0
            .icon
              display: inline-block
              width: 16px
              height: 16px
              margin-right: 6px
              vertical-align: top
              background-size: 16px 16px
              background-repeat: no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
            .text
              line-height: 16px
              font-size: 12px
        .bulletin
          width: 80%
          margin: 0 auto
          .content
            padding: 0 12px
            line-height: 24px
            font-size: 12px
              
    .detail-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto 0
      clear: both
      font-size: 32px
        
      
</style>