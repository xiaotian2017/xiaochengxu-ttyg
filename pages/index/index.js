import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航 数组
    catesList: [],
    // 楼层 数组
    floorList: []
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //  1 发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   method:'GET',
    //   success:(result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    //   fail:(error) =>{
    //     console.log(error)
    //   },
    //   complete:() =>{}
    // })
    //同时发送异步请求
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  // 获取轮播图数据
  getSwiperList() {
    request({
        url: "/home/swiperdata"
      })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
  // 获取分类 导航 数据
  getCateList() {
    request({
        url: "/home/catitems"
      })
      .then(result => {
        this.setData({
          catesList: result
        })
      })
  },
  // 获取 楼层数据
  getFloorList() {
    request({
        url: "/home/floordata"
      })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
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