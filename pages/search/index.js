// pages/search/index.js
/**
 * 1 
 * 1 输入框绑定 值改变事件 input事件
 * 2 合法性判断
 * 3 检验通过 把输入框的值 发送到后台
 * 4 返回的数据打印到页面上
 * 2 防抖(防止抖动) 定时器 
 *   1 定义全局的定时器id
 *   2 防抖一般用于输入框中的  目的是防止重复输入 重复发送XHR请求
 *   3 节流 一般是用作下拉和上拉 比如下拉刷新 上拉加载
 * 
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
    goods: [],
    // 取消按钮 是否显示
    isFocus:false,
    // 输入框的值
    inputValue:""
  },
  TimeId: -1,
  // 输入框的值改变 就会触发的事件
  handleInput(e) {
    // console.log(e);
    // 1 获取输入框的值
    const {
      value
    } = e.detail;
    // 2 检测合法性
    if (!value.trim()) {
      this.setData({
        goods:[],
        isFocus:false
      })
      // 值不合法
      return;
    }
    // 3 准备发送请求获取数据
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000)
  },
  // 发送请求获取搜索建议 数据
  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    });
    console.log(res);
    this.setData({
      goods: res
    })
  },
  // 点击取消按钮
  handleCancel(){
    this.setData({
      inputValue:"",
      isFocus:false,
      goods:[]
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