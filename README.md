## 优购项目实战

#### 技术选型
  1.腾讯的 wepy       类似vue
  2.美团的 mpvue      类似vue
  3.京东的 taro       类似react
  4.滴滴的 chameleon  
  5.uni-app          类似vue
  由于小程序还不是很稳定，还处于快速迭代当中，所以使用原生的小程序框架，小程序的框架叫MINA

#### 借鉴文档的编排方式

#### 目录结构
  styles 存放公共样式
  component 存放组件
  lib 存放第三方库
  utils 自己的帮助库
  request 自己的接口帮助库

#### 页面
  首页 index
  分类页面 category
  商品列表页面 goods_list
  商品详情页面 goods_detail
  购物车页面 cart
  收藏页面 collect
  订单页面 order
  搜索页面 search
  个人中心页面 user
  意见反馈页面 feedback
  登录页面 login
  授权页面 auth
  结算页面 pay
  
  采用列式编程取出里面的英文复制在json中，同时在小程序工具中的app.json文件中“空格，保存”让小程序工具自动生成页面

#### 字体图标
  在阿里图标库中寻找代码--添加至项目--生成在线地址--打开地址--复制代码--在styles中创建图标样式--在app.wxss中全局引入
  需要注意的是这些字体图标都是存在了外网上，而不是本地图标

#### 搭建tabbar页面

#### 初始化页面样式
  微信不识别通配符*
  主体颜色
    1.less 中存在变量
    2.原生的css和wxss都支持变量
  统一字体
  统一title

  #### 首页
    1.获取轮播图数据
    2.轮播图swiper和swiper-item的使用
    3.this.setData({swiperList: res})的使用
    4.域名校验的修改，同时在小程序后台修改
    5.轮播图的html结构
    6.swiper标签默认宽度和高度
      100% * 150px
      图片标签宽度和高度
      320px * 240px
      设计图和轮播图
      1. 先看一下原图的宽高 750 * 340
      2. 让图片高度自适应 宽度等于100%
      3. 让swiper标签的高度变成和图片一样高，否则当页面发生变化时，swiper大小仍然是150px
      4. 由于750rpx也是小程序的100%的宽度，所以可以根据750这个数值宽度进行等比例转换。
   
#### 优化请求，promise实现，最终实现async await
  1.  export const request = (params)=>{
        return new Promise((resolve, reject)=> {
          var reqTask = wx.request({
            ...params,
            success: (result)=>{
              resolve(result);
            },
            fail: (err)=>{
              reject(err);
            }
          });
        });
      }

#### 导航数据

#### 楼层数据
  1. wx:for绑定的wx:key值必须是一个确定的值，不能是一个对象，而且还要不同
  2. 楼层样式
     1. 使用&:nth-last-child(-n+4)表示从后面往前面取，去后四个标签
     2. 使用less的计算计算出后四个image的高度
     3. 子组件使用浮动，父组件应该清除浮动，可用overflow：hidden的方式简单清除浮动
     4. 总结：善于利用less的计算方式，善于利用nth-child的使用即css3的使用，同时要根据一个原图的宽高进行计算

#### 分类页面
  1. 分成三个步骤实现：UI与数据的对应关系，点击切换效果，优化：缓存
  2. 数据的获取，在data外创建一个变量，将异步获取到的数据存放在这个变量中。
  3. 熟练使用数组的方法，map获取到具体的值
  4. 页面的布局方式，page高度的设置以及calc()的使用
  5. less配合calc的使用需要使用~号
  6. 父元素设置了伸缩盒子，那么其子项的高度默认是100%
  7. scroll-view的使用 scroll-x，scroll-y属性
  8. 100% 的设置是不让page的内容过长而产生滚动，而是在scroll-view中才产生滚动
  9. for循环中使用只是一个一维的字符串数组的数据时，可以使用wx:key="*this"绑定key值的方式
  10. 右边分类中的头部设置其高度为左边一个菜单的高度，这里强调的是注意设计稿
  11. 右边分类中的内容（非头部）使用flex布局和flex-wrap：wrap设置成换行
  12. 同时将里面的内容设置成可以点击的元素navigator，宽度为33.33%
  13. 点击切换
      1. 创建一个active类，active类中有一个border-left: 5rpx solid currentColor;其中currentColor代表当前字体的颜色，可以建立一个重点突出的样式结构。
      2. 在js中再创建一个currentIndex，当这个currentIndex===index时使用这个类样式
      3. 绑定点击事件，并且通过data-index的方式传递参数，熟练使用ES6的方式获取dataset中的数据，如：const index = e.currentTarget.dataset;并且使用const还是let都很有讲究
      4. 点击事件的流程
         1. 获取到点击事件的索引值
         2. 将索引值设置currentIndex
         3. 根据不同的索引来渲染右侧商品内容
         4. 上面的初始化阶段也不用删除
  14. 商品数据的缓存效果
      1.  为什么？因为接口返回的数据量太大，为了优化用户体验，所以就要做一个缓存效果。
      2.  思路：
          1.  在打开页面的时候，做一个判断，判断本地存储中有没有旧的数据
          2.  如果没有就发送新请求
          3.  假如有旧的数据，并且旧的数据没有过期，此时就使用本地存储中的旧数据
      3. 怎么存储呢？
         1. 数据格式：{time:Date.now(),data[...]}
         2. new Date()获取的是一种格式的时间，Date.now()获取的是时间戳
         3. 小程序的本地存储技术：wx.getStorageSync("key")
         4. web端的本地存储和小程序的本地存储的区别
            1. 写的方式不一样，web端是localStorage.setItem(key,value),localStorage.getItem(key);小程序是,wx-setStorageSync(key,value),wx-getStorageSync(key);
            2. ***web端不论存入的是什么类型的数据，最终都会先调用一下toString()方法，把数据变成字符串再存入进去
            3. ***小程序不存在类型转换的这个操作的，存什么类型的数据，获取的时候就是什么类型。
  15. 在当前菜单的内容区拉到最后，点击另一个菜单时，内容区没有回到最上面。
      1.  使用scroll-view标签中的scroll-top属性可以快速实现需求
      2.  同时使用变量scrollTop管理scroll-top的值
      3.  当点击事件发生的时候设置scrollTop的值为0
      4.  注意，直接给scroll-top设置为固定值是不会起作用的。

#### 优化接口代码 提取公共接口路径 使用async，await 将res.data.message提取出来
  1. 在request中定义公共接口路径
  2. 修改页面请求接口的路径
  3. 在请求前拼接路径
  4. 使用async，await语法
     1. 勾选ES6转ES5
     2. 下载 https://github.com/LiangDennis/regenerator/blob/master/packages/regenerator-runtime/runtime.js
     3. 在小程序中创建新文件夹lib/runtime/runtime.js
     4. 在使用async的页面的js文件中都引入（不能全局引入）：import regeneratorRuntime from '../../lib/runtime/runtime.js'
     5. 删除runtime中最后的try-catch块
     6. 注意：在一些老机型中有可能不起作用

#### 小程序编译模式的使用
  1. 可以对特定的页面使用编译模式，提高开发效率
  2. 编译时候还可以设定参数

#### 一些在vscode上使用快速生成css的用法，会有提示，直接enter
  1. d:flex --- display: flex;
  2. jc:cen --- justify-content: center;
  3. ai:cen --- align-items: center;

#### 商品列表页面
  1. 在商品分类中跳转，在navigator中使用url="/pages/goods_list/index?cid={{item.cat_id}}"的方式跳转并传递cid参数
  2. 在onload的生命周期方法中使用其定义的参数options可以获取到传递的数据
  3. 实现
     1. 自定义组件
        1. 自定义tabs组件
        2. 定义样式类和并获取从父组件传递过来的值，父组件传值方式tabs="{{tabs}}"
        3. 定义点击事件bindtap="handleItemTap"，设置参数data-index="{{index}}"
        4. 组件js中的方法获取索引值e.currentTarget.dataset
        5. 触发父组件的事件 自定义，this.triggerEvent("eventName",{data});
        6. 父组件中通过bindeventName的方式自定义一个方法
        7. 这个方法中index在e.detail中
        8. 缓存data中的tabs数据方式：let {tabs} = this.data;使用foreach的方式设置isActive的值，最后setdata
        9. 插槽
           1.  在子组件中使用slot标签
           2.  在父组件中使用block标签和wx:if,wx:elif的方式定义不同的区域
        10. 内容过长时使用省略符号表示
            1.  display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
     2. 上拉加载，下拉刷新
        1. 上拉加载 商品列表js的逻辑
           1. 找到滚动条触底事件
           2. 判断还有没有下一页数据
              1. 总页数 返回的接口数据中有总条数
                 1. 总页数 = Math.ceil(总条数 / 页容量10）
              2. 当前页面 pagenum
              3. 通过总页数和当前页，判断当前页面是否大于总页数
           3. 假如没有下一页数据 弹出一个提示框
           4. 假如还有下一页数据 加载下一页数据
              1. 当前页码++
              2. 重新发起请求
              3. 数据请求回来了，需要对data中的数据进行拼接而不是替换
                 1. 在setData的时候使用this.setData({
                      goodsList:[...this.data.goodsList,...res.goods]
                    }); 
        2. 下拉刷新
           1. 触发下拉事件，需要在页面json文件中开启一个配置项
           2. 重置 数据 数组
           3. 重置页码，设置为1
           4. 数据请求回来了，需要手动关闭等待效果
  4. 实现一个全局的正在加载中的效果
     1. 将这个功能在request.js中实现
     2. 在无论请求成功还是失败的complete函数中关闭loading效果
     3. 同时需要注意的是首页的三个请求同时一起发送的情况

#### 在与data同层级下创建一些变量，是不能在wxml的页面中通过{{}}语法获取到的，只有定义在data中的数据才能被获取到

#### 商品详情页面
  1. 注意swiper与image标签的使用，其中的默认样式的修改
  2. 对于css应该要有更清晰的认识 
  3. 富文本实现标签的解析，类似于vue的v-html
  4. data中只存放标签中使用的属性
  5. 优化页面只渲染的属性
  6. 有一些格式苹果手机不支持的，如图片的webp格式（一般与后台沟通换一换），不过也可以通过replace的方法修改成jpg，但必须保证后台也存在jpg的格式
  7. 放大预览图片
     1. 给轮播图绑定点击事件
     2. 使用小程序的api previewImage
        1. 由于goodsObj是在异步请求中，所以无法直接获取到值，需要在data同层级下创建一个变量保存goodsObj数据
        2. wx.previewImage({current,urls});
  8. 底部工具栏
     1. 使用固定定位，固定定位时，都要给一个宽，否则就是宽度内容撑开的
     2. 同时设置底部的高度，此时需要在page中设置将视图层往上移动
     3. 客服按钮，担心按钮会存在很多的默认样式，没有那么好改样式。可以通过障眼法来实现：在容器中添加button按钮，在父元素使用相对定位，button按钮使用绝对定位，同时设置高度和宽度为100%，即为父元素的高宽，最后设置opacity的值为零
     4. 购物车按钮，点击到购物车的页面，由于购物车页面是tabbar页面，需要使用到switchTab
     5. 点击加入购物车的逻辑
        1. 绑定点击事件
        2. 获取缓存中的购物车数据，数组格式
        3. 先判断 当前的商品是否已经存在于购物车
           1. 由于第一次是空数据，所以应该用||[]的方式确保该变量是一个数组类型。
        4. 已经存在 修改商品数据 执行数量++操作 重新把购物车数组 填充会缓存中
        5. 不存在购物车数组中 直接给购物车数据添加一个新元素，带上数量属性num 重新把购物车数组 填充会缓存中
        6. 弹窗提示

#### 父子组件通信的参数在事件参数event的detail中。标签中通过data-name的方式传递的参数在event中的currentTarget.dataset中

#### 购物车页面
  1. 绑定点击事件
  2. 获取 用户 对小程序所授予的地址权限 状态 scope
     1. 获取权限状态 主要发现一些 属性名很怪异的时候 都要使用["属性.shuxing"]的方式获取属性值
     2. 假设用户 从来没有点击过获取 地址 的api
        1. scope 值为undefined
     3. 假设 用户 点击获取收货地址提示框时 点击了 确定 那么 authSetting scope.addres 
        1. scope值为 true
     4. 假设 用户 点击获取收货地址提示框时 点击了 取消
        1. scope 值为false
        2. 需要用户重新赋予权限 wx.openSetting
        3. 在成功的回调函数中调用获取地址的api
  3. 优化获取地址代码
     1. 将wx的一些api封装在utils中，使用promise和export的方式导出
     2. 优化js中的代码，同时将地址存入缓存中
     3. 可以将地址的信息做一个整合，作为一个属性，保存起来，当用到的时候可以直接取完整的值，而不需要再做拼接
  4. 页面加载时需要对地址的获取
     1. onShow 由于购物车页面是频繁加载的，所以需要使用onShow 的钩子函数。
     2. 获取本地存储中的地址数据
     3. 把数据 设置给data中的变量
     4. 快速建立样式类的格式（使用了less）：使用css tree插件ctrl+shift+p
     5. 固定定位后，容器宽度为内容宽度，需要设置宽度100%，同时还可以设置伸缩盒子
  5. onShow
     1. 商品详情页面，第一次添加商品的时候 手动添加属性
        1. num = 1 
        2. check = true
     2. 获取缓存中 的购物车数组 赋值到data中
  6. 全选的实现
     1. onShow 获取购物车数组
     2. 根据购物车数据 所有商品被选中 checked= true，全选就被选中
     3. 购物车数组可能为空数组的情况
     4. every遍历 所有为true则为true，否则为false，空数组返回true
     5. 并入了第7步的foreach，同时还要判断数组是否为空
  7. 总价格，总数量，都需要在页面中使用，需要在data中定义
     1. 商品被选中 才计算
     2. 购物车数组
     3. 遍历
     4. 判断是否被选中
     5. 总价格 += 商品单价 * 数量
     6. 总数量 += 商品数量
     7. 把计算后的价格和数量 设置回data中
  8. 商品的选中
     1. 绑定change事件
     2. 获取到被修改的商品对象
        1. 通过findIndex的方式获取到数组的index，然后取反该checked
     3. 商品对象的选中状态 取反
     4. 重新填充会data和缓存中
     5. 重新计算 全选 总价格 总数量
  9. 全选 反选
     1.  全选 复选框 绑定 change事件
     2.  获取data中的全选变量 allChecked
     3.  取反 allChecked=！allChecked
     4.  变量购物车数组 让里面商品选中状态跟随 allChecked 改变
     5.  把购物车数组和 allChecked 重新设置回data中，购物车数组设置回缓存中
  10. 商品数量的编辑
      1.  "+" "-"按钮 绑定同一个点击事件 区分的关键 自定义属性 data-operation={{1/-1}}
      2.  传递被点击的商品id goods_id
      3.  获取data中的购物车数组 来获取需要被修改的商品对象
      4.  当商品数量为 1 询问用户 是否删除（showModal）封装到asyncWx中
          1.  确定 删除
          2.  取消 
      5.  直接修改商品对象的数量 num
      6.  把 cart 重新设置回 data 和 缓存 中
  11. 没有商品的状态展示
      1.  在页面中将商品的item标签 block 包裹
      2.  在 block 中使用 判断属性，使用 cart的长度判断
  12. 点击结算
      1.  判断有没有收货地址
      2.  判断有没有选购商品
      3.  以上两点都满足，跳转支付页面
      4.  地址和购物车可以从缓存 或者 data中获取
          1.  缓存使用wx.getStorageSync("key")的方式
          2.  data 使用的 是 let {key} = this.data; 直接使用 this.key 是获取不到的

#### 支付页面
1. 创建订单
   1. 需要获取到用户的token，的组成需要用到的信息
      1. 用户信息，getUserInfo
      2. 小程序登录成功后的信息，wx-login
2. 支付按钮
   1. 判断缓存中有没有token
      1. 没有token 跳转授权页面，获取token
      2. 有token， 执行逻辑
         1. 创建订单，获取订单号，order_number
            1. 封装发送请求的data，获取的res进行解构。
         2. 预支付，使用订单号发送请求，获取到pay值 
            1. pay对象值对应着wx.requestPayment的微信内置支付参数
         3. 发起微信支付wx.requestPayment
         4. 查询后台支付状态，参数order_number
         5. 支付成功之后，从缓存中删除选中的商品，重新更新缓存

#### 使用ES7 语法 需要注意使用trycatch块来捕获异常

#### 优化接口请求 封装的优化
1. 判断是否含有某个字段，请求的私有路径 那么就带上 header token
2. 需要解构传递过来的header，防止header写死后不能修改

#### login 页面 与 个人中心页面 user
1. 设置统一背景颜色 page {background-color: #666}

#### navigator 标签细节，url使用的是/pages/login/index，最前面应该有一个斜杠开头