// pages/order/index.js
/*
* 1 页面被打开的时候 oShow
    0 onShow不同于onLoad 无法在形参上接受 options参数
      1 判断缓存中有没有token
        1 没有 直接跳转到授权页面
        2 有 直接往下进行
    1 获取url上的参数type
    2 根据type来决定页面标题的数组 哪个被激活选中
    2 根据type 去发送请求获取订单数据
    3 渲染页面
  2 点击不同的标题 重新发送请求来获取和渲染数据


    
 */
import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabs: [{
        id: 0,
        value: "全部订单",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "代发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    // 2 修改源数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  // 标题点击事件
  handleTabsItemChange(e) {
    console.log(e);
    // 1 获取被点击的标题索引
    const {
      index
    } = e.detail;
    this.changeTitleByIndex(index)
    // 2 重新发送请求 type = 1 index = 0
    this.getOrders(index+1);
  },
  // 获取订单列表的方法
  async getOrders(type) {
    const res = await request({
      url: "/my/orders/all",
      data: {
        type
      }
    });
    this.setData({
      orders: res.orders
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
  onShow: function(options) {
    // const token = wx.getStorageSync("token");
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index',
    //   })
    //   return;
    // }

    // console.log(options)
    // 1 获取当前小程序的页面栈-数组 长度最大10页面
    let pages = getCurrentPages();
    // 2 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    // 3 获取url上的type参数
    const {
      type
    } = currentPage.options;
    // 4 激活选中页面标题 当type = 1 时候，index = 0
    this.changeTitleByIndex(type-1);
    this.getOrders(type);



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