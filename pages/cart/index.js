// pages/cart/index.js
/**
 * 1 获取用户的收获地址
 *   1 绑定点击事件
 *   2 调用小程序内置api 获取用户的收获地址
 * 2 获取 用户 对小程序 所授予 获取地址的 权限 状态 scope
 *   1 假设 用户  点击 获取收货地址的提示框 确定 authSetting scope.address: true
 *     scope 值为true 直接调用 获取收获地址
 *   2 假设 用户  点击 获取收货地址的提示框 取消
 *     scope 值为false
 *   3 假设 用户 从来没有调用过 收货地址的api
 *     scope 值为undefined 直接调用 获取收获地址
 *     1 诱导用户 自己 打开 授权设置页面  当用户重新给与 获取地址权限的时候
 *     2 获取收获地址
 *   4 把获取到的收获地址 存入到本地存储中
 * 3 页面加载完毕
 *   0 onLoad onShow
 *   1 获取本地存储中的地址数据
 *   2 把数据 设置给data中的一个变量
 * 4 onShow
 *   0 回到了商品详情页面 第一次添加商品的时候 手动添加了
 *     1 num = 1;
 *     2 checked = true;
 *   1 获取缓存中的购物车数组
 *   2 把购物车数据  填充到data中
 * 5 全选的实现 数据的展示
 *   1 onShow 获取缓存中的购物车数组
 *   2 根据购物车中的商品数据  所有的商品都被选中 checked=true 全部都被选中
 * 6 总价格和总数量
 *   1 都需要商品被选中  我们才拿它来计算
 *   2 获取购物车数组
 *   3 遍历
 *   4 判断商品是否被选中
 *   5 总价格 += 商品的单价 * 商品的数量
 *   6 把计算后的价格和数量 设置回data中即可
 * 7 商品的选中
 *   1 绑定change事件
 *   2 获取到被修改的商品对象
 *   3 商品对象的选中状态 取反
 *   4 重新填充回data中和缓存中
 *   5 重新计算全选。总价格 总数量...
 * 8 全选和反选
 *   1 全选复选框绑定事件 change
 *   2 获取 data中的全选变量 allChecked
 *   3 直接取反 allChecked=!allChecked
 *   4 遍历购物车数组 让里面 商品 的选中状态跟随 allChecked改变而改变
 *   5 把购物车数组 和 allChecked 重新设置回data 把购物车重新设置回缓存中
 * 9 商品数量的编辑
 *   1 "+" "-" 按钮 绑定同一个点击事件 区分的关键 自定义属性
 *     1 "+" "+1"
 *     2 "-" "-1"
 *   2 传递被点击的商品id goods_id
 *   3 获取data中的购物车数组 来获取需要被修改的商品对象
 *   4 当购物车的数量 = 1 同时用户点击"-"
 *     弹窗提示(showModal) 询问用户 是否要删除
 *     1 确定 直接执行删除
 *     2 取消 什么都不做
 *   4 直接修改商品对象的数量 num
 *   5 把cart数组 重新设置回 缓存中 和data中 this.setCart
 */

import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  // 点击收货地址
  async handleChooseAddress() {
    try {

      // 2 获取收获地址
      // wx.chooseAddress({
      //   success:(result) =>{
      //     console.log(result)
      //   }
      // })
      // wx.getSetting({
      //   success: function(result) {
      //     console.log(result)
      //     // 2 获取权限状态 主要发现一些 属性名很怪异的时候 都要使用[]形式来获取属性值
      //     const scopeAddress = result.authSetting["scope.address"];
      //     if (scopeAddress === true || scopeAddress === undefined) {
      //       wx.chooseAddress({
      //         success: function(res1) {
      //           console.log(res1)
      //         },
      //         fail: function(err1) {},
      //         complete: function(res1) {},
      //       })
      //     } else {
      //       // 3 用户 以前拒绝过授予权限 先诱导用户打开授权页面
      //       wx.openSetting({
      //         success: (result2) => {
      //           // 4 可以调用 收获地址代码
      //           wx.chooseAddress({
      //             success: function(res2) {
      //               console.log(res2)
      //             },
      //             fail: function(err2) {},
      //             complete: function(res2) {},
      //           })
      //         }
      //       })
      //     }
      //   },
      //   fail: function(res) {},
      //   complete: function(res) {},
      // })
      // 1 获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断 权限状态
      if (scopeAddress === false) {
        // 3 调用获取收货地址的 api
        // const res2 = await chooseAddress();
        // console.log(res2);
        await openSetting();
      }
      // 4 调用获取收货地址的 api
      const address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      // 5 存入到缓存中
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }
  },
  //商品的选中
  handeItemChange(e) {
    // 1 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组
    let {
      cart
    } = this.data;
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 4 选中状态取反
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);
  },
  // 封装
  // 设置购物车状态 同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart) {
    let allChecked = true;
    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    // 5 6 把购物车数据重新设置回data中和缓存中
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync("cart", cart);
  },
  //商品的全选功能
  handleItemAllCheck() {
    // 1 获取data中的数据
    let {
      cart,
      allChecked
    } = this.data;
    // 2 修改值
    allChecked = !allChecked;
    // 3 循环修改cart数组中的商品选中状态
    cart.forEach(v => v.checked = allChecked);
    // 4 把修改后的值 填充回data或者缓存中
    this.setCart(cart);
  },
  //商品数量的编辑功能
  async hanndleItemNumEdit(e) {
    console.log(e)
    // 1 获取传递过来的参数
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    // 2 获取购物车数组
    let {
      cart
    } = this.data;
    // 3 找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id);
    // 4 判断是否要执行删除
    if (cart[index].num === 1 && operation === -1) {
      // 4.1 弹窗提示
      // wx.showModal({
      //   title: '提示',
      //   content: '您是否要删除',
      //   success:(res)=>{
      //     if (res.confirm) {
      //       // console.log('用户点击确定')
      //       cart.splice(index,1);
      //       this.setCart(cart);
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
      const res = await showModal({
        content: "您是否要删除?"
      });
      if (res.confirm) {
        // console.log('用户点击确定')
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      // 4 进行修改数量
      cart[index].num += operation;
      // 5 设置回缓存和data中
      this.setCart(cart);
    }
  },
  // 点击结算
  async handlePay(){
    // 1 判断收货地址
    const {address,totalNum} = this.data;
    if(!address.userName){
     await wx.showToast({
       title: '您还没有选择收货地址',
       icon:'none'
     });
     return;
    }
    // 2 判断用户有没有选择商品
    if(totalNum==0){
      await wx.showToast({
        title: '您还没有选购商品',
        icon: 'none'
      });
      return;
    }
    // 3 跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 1 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    // 1 计算全选
    // every 数组方法 会遍历 会接受一个回调函数 那么 每一个回调函数都返回true 那么 every方法的返回值就为true
    // 只要有一个回调函数返回了false 那么不再循环执行，直接返回false
    // 空数组 调用 every ,返回值就是true
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    // let allChecked = true;
    // // 1 总价格 总数量
    // let totalPrice = 0;
    // let totalNum = 0;
    // cart.forEach(v=>{
    //   if(v.checked){
    //     totalPrice+=v.num*v.goods_price;
    //     totalNum+=v.num;
    //   }else{
    //     allChecked=false;
    //   }
    // })
    // // 判断数组是否为空
    // allChecked=cart.length!=0?allChecked:false;
    // // 2 给data赋值
    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // })
    this.setData({
      address
    });
    this.setCart(cart);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})