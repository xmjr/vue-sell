# travel

### 项目演示


#### travel项目（去哪儿App）
github：https://xmjr.github.io/travel/

gitee：https://gitee.com/xmjr/travel/ 

#### sell项目（饿了吗App）

github：https://xmjr.github.io/vue-sell/

gitee：https://gitee.com/xmjr/vue-sell/ 

## 项目总结
跟着慕课网vue实战教程，边看边手敲了遍去哪儿App、饿了吗App的代码，加深了自己对vue、js、css的认识，这里对实战中学习到的知识及常用技巧做下总结。

主要包括这几部分：技术栈、项目构建、vue知识点、组件实现、数据接口处理、项目调试、部署到github和码云、插件使用注意事项。


### 一、技术栈

#### Vue

- Vue-CLI：Vue脚手架工具，用来快速构建项目
- Vue Router：为单页面应用提供的路由系统
- Vuex：Vue集中状态管理
- Devtools：Vue调试工具

#### 插件

- fastClick：解决移动端300毫秒点击事件延迟问题
- axios：请求接口数据
- better-scroll：scroll插件
- vue-swesome-swiper：触摸滑动插件
- stylus、stylus-loader： css预编译处理器，抽离公用样式
- babel-polyfill、transform-runtime：

#### 其他

- iconfont：字体图标
- 设置移动端页面不可缩放
- 用reset重置页面样式，以适应不同浏览器显示
- 用border.css解决1px边框问题
- 通过css预处理器（stylus、scss等）设置样式变量，抽离出公用样式，以便维护
- github、码云：代码管理

### 二、构建项目

#### （一）vue-cli：快速构建项目

用vue-cli快速构建项目travel，在创建的过程中添加项目中需要用到的插件（vue-router、vuex、stylus、stylus-loader等）；

#### （二）reset.css：重置css样式

引用reset.css，重置页面样式，让页面在不同浏览器中显示一致；


```
// main.js
import './assets/styles/reset.css'
```

#### （三）设置页面不可缩放

移动端项目，在html中设置页面不可缩放（该项目用的是flex布局，若用手淘的flexible.js则不要这条meta）；


```
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
```

#### （四）border.css：1px边框

引用border.css，统一处理当移动端dpr大于1时1px边框的问题；
（1）用伪类after来为元素制作一个1px边框，可以借助stylus的mixins来自定义color；
（2）通过媒体查询@media、transfrom:scale()来对不同dpr（device-pixel-ratio）下的边框进行不同程度的缩放。


#### （五）fastClick：移动端点击延迟

使用fastClick插件，解决移动端300毫秒点击事件延迟问题。

（1）在项目中安装

> npm install fastclick

（2）在入口文件main.js中引入并使用


```
// main.js
import fastClick from 'fastclick'

fastClick.attach(document.body)
```

#### （六）stylus：设置公用样式

通过css预处理器stylus抽离、设置公用样式；
要注意两点：
（1）用@import来引入styl文件；
（2）路径使用别名时，要在路径前加波浪号（~）；


```
<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles.styl'
  // css样式
</style>
```

#### （七）iconfont：字体图标

1、制作字体图标
将SVG图片上传至iconfont，然后添加到相应的项目，会生成相应的代码，之后下载下来便可使用了。

2、使用字体图标

（1）将所需的iconfont下载解压后放到项目中，需要修改iconfont.css中src的引用路径；

（2）在main.js中引用iconfont.css,之后可在各组件中使用；


#### （八）alias：路径别名

（1）webpack对路径的处理

在js中，webpack对路径进行处理时，自动将没有路径标识（/，./，../）的第一个we文件夹名当做webpack别名来处理。比如，第一个文件夹名为common，则webpack会自动在alias中搜索是否有对应的别名，如果有，则替换路径，没有则会报错。

在css中，webpack正常情况下不会对路径进行处理，需要在路径前添加标识~，告诉webpack这是一个别名。


```
@import "~common/stylus/variable"
```

（2）设置别名（alias）

在vue.config.js中进行设置，首先，引入‘path’；然后，创建resolve函数；最后，在chainWepack中设置别名：


```
// vue.config.js

const path = reqiure('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets', resolve('src/assets'))
    }
}
```


### 三、vue知识点

#### （一）组件name

（1）当使用keep-alive时，可搭配组件name进行缓存过滤；


```
<div id="app"> 
 <keep-alive exclude="Detail">
  <router-view/>
 </keep-alive>
</div>
```

（2）递归组件调用自身时使用，为避免无限循环需用v-if进行判断；


```
<div v-if="item.children" >
  <detail-list :list="item.children"></detail-list>
</div>

<script>
  export default {
    name:'DetailList'
  }
</script>
```

（3）vue-devtools调试工具里显示的组见名称是由vue中组件name决定的，若不指定则会自定义。


#### （二）父子组件传值

 **1、props**  

（1）父组件通过动态属性向子组件传值，子组件通过props来接收；

（2）子组件不应直接更改props中的值，因为若传递进来的是引用类型，则会改变整分数据，可将从父组件接收到的值复制到子组件的data中再做更改；

（3）可以使用Vue.set()、this.$set(）来为数据添加响应属性；

 **2、events** 

（1）子组件通过this.$emit向外传值，父组件监听到该事件后调用相应的方法；

（2）父组件可借助ref直接调用子组件中的方法：


```
this.$refs.shopcart.drop(target);
```

**3、this.$refs** 

查找命名子组件；

 
 **4、this.$parent、this.$children** 

使用this.$parent查找当前组件的父组件，也使用parent选项指定当前组件的父组件；


使用 _this.$children_ 查找当前组件的直接子组件，可遍历全部子组件，但要注意，$children并不保证顺序，也不是响应式的；

 **5、this.$root** 

使用this.$root查找根组件，并可以配合this.$children遍历全部组件；


#### （三）非父子组件传值

 1、Vuex：状态管理 

 2、vue-bus：总线机制 


#### （四）this.$nextTick()

常用在生命周期钩子、获取到数据、watch到数据更新后，确保获取到更新的DOM，然后执行相应的回调函数。

#### （五）watch

在看Vue官方文档时，里面提到别滥用watch，当时以为有computed和methods的存在，在实际项目中会很少用到watch；然而实际上，很多时候watch非常有用，这三者是功能互补的关系。

虽然计算属性在大多数情况下更合适，但当需要在数据变化时执行异步或开销较大的操作时，watch方法更有用，通过搭配this.$nextTick()使用。


### 四、组件实现

#### travel项目

##### （一）城市搜索功能

 1、相关组件 

Home.city（首页组件）、City.vue（父组件）、Search.vue（子组件）

 2、效果 

用户在Search.vue的城市搜索框中输入字符串，若城市数据中有与之相匹配的城市，则显示在下拉列表中；用户点击下拉列表中的相应城市，会将之设置为当前城市，并跳转到首页，首页中的数据也会更新为该城市的数据。

 3、实现 

（1）在City.vue（父组件）中通过axios获取到城市的数据（cities），通过props传递给子组件Search.vue；

（2）在Search.vue中，通过forEach循环遍历cities数据，看输入的搜索字符串是否有与之匹配的，若有，则将获取到的字符串添加到数组list中，然后将list的数据显示出来；

（3）当用户点击对应城市时，调用两个函数：一是更改Vuex状态管理中的城市，也就是将该城市名作为参数提交到store.js的Mutations中；二是用this.$router.push()跳转到首页。

##### （二）字母滑动

 1、相关组件 

City.vue（父组件）、Header.vue（子组件，相对定位）、Alphabet.vue（子组件，绝对定位）、List.vue（子组件）

 2、效果 

手指滑动City.vue中的Alphabet.vue组件（字母表）时，List.vue页面随之滚动到相应的字母。

 3、实现 

关键是要知道触摸的是哪个字母

（1）用offsetTop获取A字母距离当前栏（Alphabet.vue）顶部的距离，赋值为startY；

```
this.startY = this.$refs['A'][0].offsetTop
```

（2）用clientY(）获取当前手指触摸点距离窗口顶部的距离（为了优化，用setTimeout节流），减去header.vue的高度就是手指距离header区域下沿的高度，也就是触摸点距离Alphabet.vue组件顶部的距离，赋值为touchY；


```
const touchY = e.touches[0].clientY -79
```

（3）touchY - startY得出的结果就是字母A到手指触摸点的距离，除于字母的高（例如20px）就能手指触摸点所在字母的index，也就找到了对应的字母；


```
const index = Math.floor((touchY - this.startY) / 20)
```

（4）通过this.$emit将该字母作为参数传递到父组件City.vue，再由City.vue通过props传递给List.vue；



```
this.$emit('change', this.letters[index])
```

（5）City.vue观测这个数据，当该数据变动时，借助better-scroll的scrollToElement()方法滚动到对应的字母节点。


```
watch: {
  letter () {
    if (this.letter) {
      const element = this.$refs[this.letter][0]
      this.scroll.scrollToElement(element)
    }
  }
}
```


##### （三）缓存数据

 1、相关组件 

Home.city（首页组件）、City.vue（城市选择页，父组件）、Header.vue（子组件）

 2、效果 

（1）city默认为北京；

（2）用户在city.vue的子组件Header.vue中选择了城市之后，再次进入应用后，显示的城市是之前选择的值，而不是默认值“北京”，只有在没有选择城市时才显示“北京”。

 3、实现 

可以借助Vuex、localstorage来实现

（1）首先，将city作为共享数据，放入到store.js的state中，设置默认值为“北京”；

（2）用try..catch来确保localstorage能正常运行，将该city的默认值“北京”存储到localStorage.city；


```
// store.js

let defaultCity = '北京'
try {
    if (localStorage.city) {
        defaultCity = localStorage.city
    }
} catch (e) {

}
```

（3）当city的值改变时，更新localStorage.city的value。


```
// store.js

export default new Vuex.Store({
  state: {
    city: defaultCity
  },
  mutations: {
    changeCity (state, city) {
        state.city = city
        try {
            localStorage.city = city
        } catch (e) {

        }
    }
  }
})
```


##### （四）动态路由

 1、相关组件 

Recommend.vue（热销推荐组件，父组件），Detail.vue（景点详情页，子组件）

 2、效果 

热销推荐里的每个景点详情页根据获取到的数据id设置相应的不同的路径，点击后能获取到对应景点的数据，从而显示不同景点的详情页。

 3、实现 

（1）在router.js中，景点详情页的路由根据传入数据的id设置相应的不同路径：


```
// router.js

{
  path: '/detail/:id',
  name: 'Detail',
  component: Detail
}
```

（2）在Recommend.vue组件中的<router-link>的to中传入这个参数：


```
// Recommend.vue（热销推荐组件）

<router-link 
  tag="li" 
  class="item border-bottom" 
  v-for="item of list" 
  :key="item.id"
  :to="'/detail/' + item.id" 
>
```

（3）在Detail.vue组件中，能通过this.$route.params.id获取到这个参数，从而能在该组件中请求到对应的数据：


```
// Detail.vue

getDetailInfo () {
  axios.get('/api/detail.json', {
    params: {
      id: this.$route.params.id
    }
  }).then(this.handleGetDetailInfoSucc)
}
```

#### vue-sell项目

##### （一）用获取到的图片做背景

方法一:

在dom中增加一个img元素，让该img绝对定位并置于底层（z-index:-1），img为块级行内元素、，通过filter来设置滤镜（父元素要设置overflow:hidden）。


```
<div class="background">
  <img :src="seller.avatar">
</div>
```


```
.background
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: -1
  filter: blur(10px)
  img
    display: inline-block
    width: 100%
    height: 100%
```


方法二：通过js来设置

- 用ref获取到节点；
- 对接口数据进行watch，当获取到seller的下一帧对background进行更换（在mounted钩子的下一帧，并不能保证获取到接口数据，因为ajax请求是异步的）；
- js把双引号内的内容当作字符串处理，而不是参数，这里要用 + 号来进行拼接


```
<div class="header" @click="showDetail" ref="header">
</div>

watch: {
  'seller'() {
    this.$nextTick(() => {
      const Header =  this.$refs.header;
      Header.style.backgroundImage = "url(" + this.seller.avatar + ")";
    })
  }
}
```

##### （二）隐藏 / 显示子组件

 1、相关组件 

Header.vue（父组件）、HeaderDetail.vue（子组件）

 2、效果 

点击父组件（Header.vue）中的某处全屏显示子组件（HeaderDetail.vue），点击子组件则隐藏子组件，显示父组件。

 3、实现 

可以通过路由来实现，但没必要。

可以通过控制v-show的真假值来实现。给子组件的最外层元素添加点击事件，触发后通过this.$emit向父组件传递，父组件通过该事件的名称监测到该事件后，触发一个事件来将v-show的值变为假，从而实现隐藏子组件的目的。


```
// 子组件HeaderDetail.vue

<div class="detail" @click.stop="handleDetail">
   信息
</div>

methods: {
  handleDetail() {
    this.$emit('close')
  }
}
```


```
// 父组件 Header.vue
<div class="header" @click="handleOpenDetail">
  <header-detail 
    v-show="detailChange" 
    @close="handleCloseDetail"
  >
  </header-detail>
</div>

data() {
  return {
    detail: false
  }
},
methods: {
  handleOpenDetail() {
    this.detail = true
  },
  handleCloseDetail() {
    this.detail = false
  }
},
components: {
  HeaderDetail
}
```

其实是很简单且很常见的功能，之所以拿出来，是因为我刚开始的时候碰到了坑。

在子组件点击事件后并不跳转到父组件，用Devtools也没看到v-show所对应的值的改变。通过给点击事件添加打印字符串后才发现问题，点击事件触发了两次，也就是在子组件触发点击事件将v-show的值变为假后很短的时间内，触发了父组件的点击事件，又将v-show的值变为了真，从而隐藏子组件失败。

![输入图片说明](https://images.gitee.com/uploads/images/2019/1031/143205_24e55ce6_5324284.png "1.png")


```
methods: {
  handleOpenDetail() {
    this.detailChange = true
    console.log(this.detailChange)
  },
  handleCloseDetail() {
    this.detailChange = false
    console.log(this.detailChange)
  }
}
```

原因就是事件是会向上冒泡传递的，所以需要给子组件的click事件添加修饰符stop，阻止它冒泡传递。


##### （三）区块滚动联动

 1、相关组件 

Goods.vue（组件）、menu-wrapper（左侧菜单栏）、foods-wrapper（右侧食物列表）

 2、效果 

（1）滚动右侧foods.wrapper时，左侧菜单栏对应项高亮；
（2）点击左侧菜单栏时，右侧foods-wrapper滚动到对应项；

 3、实现 

左侧菜单栏、右侧食物列表都使用了better-scroll实现滚动；区块滚动联动的关键点在于计算出每件食物在右侧食物列表中所处的位置，然后监听滚动时到了哪个区间（数组、索引值），再动态给左侧添加样式。

（1）根据传入的数据，我们可以获取到右侧有多少个dom元素；

（2）每个元素的高为clientHeight，高递加并push为一个数组listHeight（第一个为0），这样，我们就获得了每个元素在dom中的位置；

（3）better-scroll需要传入参数{probeType:3}，用来监听滚动时滚动的位置；当右侧滚动时，获取到scrollY的值（四舍五入取整、取绝对值）；

（4）遍历数组listHeight，scrollY落到哪个区间，就使左侧哪块高亮。


```
<script>
  export default {
    name: 'Goods',
    data() {
      return {
        goods: [],
        scrollY: 0,
        listHeight: [],
        selectedFood: {}
      }
    },
    computed: {
      // 用scrollY与每个元素所在位置对比，得出【index】，
      // 根据这个值来让左侧对应的元素高亮
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }      
    },
    created() {
      // 获取到数据后的下一帧调用方法
      getGoods().then((goods) => {
        this.goods = goods
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      })      
    },
    methods: {
      // 计算出右侧每个元素所在的纵轴位置
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }      
    }

  }
</script>
```

接下来实现第二个效果：点击左侧菜单，右侧滚动到相应的位置

左侧每个区块是有索引值index的，当点击该区块时，传递参数index，选中对应的右侧区块，然后借助better-scroll滚动到对应的区块：


```
selectMenu(index) {
    let foodList = this.$refs.foodList;
    let el = foodList[index];
    this.foodsScroll.scrollToElement(el, 300);
}
```


##### （四）购物车和商品页联动

两者是通过商品的price和count联动的，其中，商品price由数据接口直接获取，关键是count（客户点击每个商品的次数）。

（1）当客户点击加号时，会判断之前是否有点击过该商品的加号，若是第一次点击，则会用Vue.set()添加一个food.count属性，值为1，之后每次点击数量加1；

（2）在商品页，对food进行遍历，若有food.count属性，则push到新数组foods中，这些就是客户选中的商品；

（3）将数组foods传递给购物车组件，购物车组件根据该数组数据进行状态、数据更新。

##### （五）抛物线小球动画

 1、相关组件

Goods.vue（商品页组件）、ShopCart.vue（购物车组件）、CartControl.vue（购买按钮组件）、Food.vue（商品详情页）

 2、效果 

在商品页和商品详情页点击购买按钮（加号），会有小球从所点击的购买按钮以抛物线动画飞向购物车；且连续按加号，空中会有多个小球飞向购物车。

 3、实现 

（1）在购物车添加小球节点

首先要有小球，小球最终落点都是购物车，所以在购物车组件添加小球元素；因为横向、纵向都发生变化，所以要设置两层，外层纵向变化，内层横向变化。

（2）小球与加号元素联动

落点是购物车，起点是每次客户点击的加号元素所在的位置，为此，要在CartControl.vue组件的加号添加点击事件，当用户点击时将该加号元素传递出来，父组件Goods.vue通过事件接收到该加号元素，并将该加号元素作为参数传入并调用购物车组件（ShopCart.vue）的drop()事件，也就让购物车组件获取到了加号元素，通过这个drop()事件与小球联动起来，每次点击加号元素都对应一个小球，将小球设置为显示，并都push到运动中的小球数组中。

（3）实现动画

利用JavaScript动画钩子函数，分别设置为三个状态：before-enter、enter、after-enter；
通过el.getBoundingClientRect()来获取加号元素的位置，跟小球最初位置做对比，计算出x、y轴的差值，根据x、y值来设置动画初始位置。之所以要这样做，是因为我们是将小球放在购物车组件里的，而不是加号元素里，所以要倒推小球运动时的初始位置。

抛物线（y轴）借助贝塞尔曲线，可直接在线调试。

##### （六）评分组件 star.vue
 
 1、分析

（1）star组件接收的参数：星的大小（size）、评分（score）；

（2）获取到的是评分数据score，需要根据评分，来设置每颗星的样式；

（3）star只有三种状态：点亮、半亮、不亮，而评分score的数值是不规则的，需要将评分的小数位转化，只能是0或5；

（4）样式包含固定样式、动态绑定样式，动态样式根据星的大小、星的状态不同而不同；

（5）组件要考虑拓展性，评分不一定就是5星上限、星的大小也不一样、要考虑不同dpr插入不同的star图。

 2、实现思路

（1）获取到星的大小（size），用计算属性拼凑成动态样式，从而根据大小设置对应星的样式；

（2）根据评分score，计算出一个包含星的三种状态（on、half、off）的数组，并分别设置这三种状态的样式，之后，用v-for遍历展示。


##### （七）评价组件 RatingSelect.vue

根据需要，接收四个参数：

（1）ratings：商品 / 商家评价，是个数组

（2）selectType： 正面、负面、全部评价，默认是全部，是个数值

（3）onlyContent：是否只看有内容的评价，默认是true

（4）desc：评价组件的头部描述文字，是一个对象，默认是：全部、满意、不满意

选中时样式改变


```
// 由&.active定义选中时的样式
&.positive
  background: rgba(0, 160, 220, 0.2)
  &.active
    background: rgb(0, 160, 220)
```



```
// 由selectType的值来决定什么时候选中，而selectType是传入值
<span class="block positive" :class="{'active':selectType===2}">
  {{desc.all}}
</span>
```


##### （八）商家实景图横向滚动

1、还是使用better-scroll插件来实现，设置为横向滚动，并忽略竖向的滚动；

2、用js计算出 图片 + margin的宽度；


```
_initPics() {
  if (this.seller.pics) {
    let picWidth = 120;
    let margin = 6;
    let width = (picWidth + margin) * this.seller.pics.length -margin;
    this.$refs.picList.style.width = width + 'px';
    this.$nextTick(() => {
      if (!this.picScroll) {
        this.picScroll = new BScroll(this.$refs.picWrapper, {
          scrollX: true,
          // 忽略竖向的滚动
          eventPassthrough: 'vertical'
        });
      } else {
        this.picScroll.refresh();
      }
    })
  }
}
```


##### （九）商家收藏

用localstorage来建立该应用的存取库。

###### saveToLoacal

参数：id（商家id）、key（收藏的是该商家的哪个部分）、value（值）

（1）声明seller = window.localStorage.__seller__，也就是说关于商家的所有收藏信息保存在该字段中；

（2）判断seller是否存在，若不存在，则说明之前没有收藏过，则新建seller和seller[id]；

（3）若存在，说明之前有收藏过，seller=JSON.parse(seller)，那就判断收藏的是否是这家的信息，若不是，则新建一个seller[id]；

（4）让seller[id][key] = value；

（5）将seller转换成JSON格式，并赋值给window.localStorage.__seller__


```
export function saveToLocal(id, key, value) {
  // 有关商家的信息保存在localStorage中的_seller_下
  let seller = window.localStorage.__seller__;
  // 起初是没有seller的，所以要新建个空对象，并将值存入
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
};
```

###### loadFromLocal

（1）声明seller = window.localStorage.__seller__，也就是说关于商家的所有收藏信息保存在该字段中；

（2）如果seller不存在，则返回默认的值；

（3）若seller存在，则解析，让selller = JSON.parse(seller)[id]；

（4）判断seller.key是否存在，若不存在，则返回def；

（5）最后保存seller[key]为ret，返回ret或def；


```
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
};
```

### 五、数据接口

#### （一）数据mocks

1、在vue-cli中，public文件夹相当于根目录，打包后，里面的内容也会原封不动地复制到dist文件中。所以，可以将模拟数据直接放在public/api下，直接获取使用：


```
getHomeInfo() {
  axios.get('/api/index.json?city=' + this.city)
    .then(this.getHomeInfoSucc)
}
```

2、在vue.config.js中，将大块数据分割成小份，并配备路由和添加响应字段：


```
// // vue.config.js

const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings


devServer: {
  before(app) {
    app.get('/api/seller', function (req, res) {
      res.json({
        errno: 0,
        data: seller
      })
    })
    app.get('/api/goods', function (req, res) {
      res.json({
        errno: 0,
        data: goods
      })
    })
    app.get('/api/ratings', function (req, res) {
      res.json({
        errno: 0,
        data: ratings
      })
    })
  }
}
```

此时，运行项目，可以在对应的路径读取到数据，比如在
 _http://localhost:8080/api/seller_ 可以读取到seller的相关信息。


#### （二）环境变量

开发环境、生产环境设置不同的环境变量，让axios请求到对应的接口数据：开发环境下请求数据mocks数据，生产环境下则向真实的接口请求数据。

要注意的是，在客户端侧使用的环境变量，需要以VUE_APP开头：


```
mounted() {
  this.getHomeInfo()
},
methods: {
  getHomeInfo() {
    axios.get(process.env.VUE_APP_API + '/index.json?city=' + this.city)
      .then(this.getHomeInfoSucc)
  }
}
```

#### （三）封装axios


```
// api/index.js
import axios from 'axios'


const urlMap = {
  development: '/',
  production: 'https://xmjr.gitee.io/vue-sell/'
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
```

在组件中使用：


```
import { getSeller } from 'api'

created() {
  this._getSeller()
},
methods: {
  _getSeller() {
    getSeller({
      id: this.seller.id
    }).then((seller) => {
      this.seller = Object.assign({}, this.seller, seller)
    })
  }
}
```

#### （四）代理服务器

若使用的不是本地数据接口，可以在vue.config.js中配置代理服务器：

```
devServer: {
    host: '0.0.0.0',
    port: 8083,  
    https: false
    proxy: {
        // 当使用'/api'路径时，启用target这里写的服务器
        '/api': {
            target: 'http://localhost:80',
            ws: true,
            changeOrigin: true
        }
    }
}
```

### 六、性能优化

在package.json中配置report命令，打包后会多生成一个report.html文件，打开这个文件能看到代码的一个可视化的界面展示，根据这个能看到各代码所占比例，然后进行相应的优化。


```
"report": "vue-cli-service build --report"
```


> npm run report

### 七、真机调试

通过在vue.config.js文件的devServer字段设置host，可以实现在同一局域网下的任意PC、手机端预览、测试项目。

方法一：直接设置host: '0.0.0.0'

默认下，host:localhost时，运行npm run serve命令，可以看到项目预览网址：

>   App running at:
>   - Local:   http://localhost:8083/
>   - Network: http://localhost:8083/

host: '0.0.0.0'时，运行npm run serve，项目预览网址变为：

>   App running at:
>   - Local:   http://localhost:8083/
>   - Network: http://192.168.31.247:8083/


在同一局域网下，可以在任意PC、手机端通过Network显示的网址预览、测试项目。

方法二：打开命令行，输入：ipconfig，找到本电脑在内网里的IP地址（192.168.31.247），设置host:'192.168.31.247'，效果和方法一相同。


### 八、模拟服务器环境

1、下载安装PHPCUSTOM：http://www.lccee.com ，默认端口号是80；

2、项目打包后，放到该服务器的相应目录下，在任意网络下都能预览、测试项目。

### 九、部署到github

（1）根据部署目录来设置publicPath。比如我要部署到github的travel目录下，则：


```
// vue.config.js

publicPath: process.env.NODE_ENV === 'production' ? '/travel/' : '/',
```

（2）打包项目；

（3）初始化打包项目，把它变成可以管理的git仓库；

（4）暂存、提交项目；

（5）将项目强制push到自己github网址的的gh-pages分支；

（6）部署完成，打开https://xmjr.github.io/travel/ 能预览项目。



> npm run build
> 
> cd dist
> 
> git init
> git add -A
> git commit -m 'deploy'
> 
> // 部署到 https://<USERNAME>.github.io
> git push -f git@github.com:xmjr/xmjr.github.io.git master
> 
> // 部署到 https://<USERNAME>.github.io/<REPO>
> git push -f git@github.com:xmjr/travel.git master:gh-pages
> 


### 十、部署到码云

和github有些不同。

第一步，将打包好的项目上传

因为我是打算部署到码云travel目录里的pages分支，所以先在码云上的travel项目中创建pages分支，然后在打包好的项目（dist文件夹）里输入命令：



> git init
> git add -A
> git commit -m 'deploy'
> 
> git push -f git@gitee.com:xmjr/travel.git  master:pages

第二步，开启页面展示服务

打开码云的travel项目，点击“服务--Gitee Pages“开启页面展示服务，因为我打算部署在pages分支，所以选的是pages，然后开启服务。

部署完毕，要过些时间才能访问。


### 十一、附录：插件使用注意事项


#### better-scroll

1、better-scroll的滚动是针对它里面的第一个子元素，当该子元素的高超过父元素才能实现滚动。

2、better-scroll一般需要根据获取到的数据来计算height，所以除了在counted调用外，通常还需watch到相应的数据后的下一帧调用；调用分两种情况，一是若better-scroll不存在，则创建一个better-scroll，若存在，则重新计算better-scroll，也就是调用它的方法refresh。

3、better-scroll是默认禁止click事件的，若要开启点击事件，需要进行click:true配置。

4、better-scroll默认不派发scroll事件，要开启的话，需要配置probeType:3（看情况，有时可能需要配置为1或2）。

5、若better-scroll所在的组件是子组件，又开启了click事件，很多时候，我们应该禁止该点击事件冒泡和触发默认行为，也就是给click添加修饰符：@click.prevent.stop。

#### vue-awesome-swiper

1、swiper是有样式的，所以引用时记得引入swiper的样式；

2、在刷新页面时，swiper有时会显示最后一张图片，而非第一张图片。

有两个解决办法：

（1）用vi-if，让<swiper>在获取到图片列表长度时再显示；

（2）在swiperOption配置里，将initialSlide设置为0。


