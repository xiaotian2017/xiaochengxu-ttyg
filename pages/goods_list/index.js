// pages/goods_list/index.js
/**
 * 1  用户上滑页面  滚动条触底 开始加载下一页数据
 *  1 找到滚动条触底事件
 *  2 判断还有没有下一页数据
 *    2.1 获取到总页数  只有总页数
 *      总页数 = Math.ceil(总条数 / 页容量 pagessize)
 *    2.2 获取到当前的页码 pagenum
 *    2.3 判断一下 当前的页码是否大于等于  总页数
 *        表示  没有下一页数据
 *  3 假如没有下一页数据  弹出一提示
 *  4 假如还有下一页数据 来加载下一页数据
 *    4.1 当前的页面 ++
 *    4.2 重新发送请求
 *    4.3 数据请求回来  要对data中的数组  进行拼接 而不是全部替换!!!
 * 2  下拉刷新页面
 *  1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
 *  2 重置  数据  数组
 *  3 重置页码  设置为1
 *  4 重新发送请求
 *  5 数据请求回来  需要手动的关闭  等待效果
 */

import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],

    // 定义数据
    goodsList: []
  },

  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  //总页数
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query = options.query||"";
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    });
    // 获取 总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    // console.log(this.totalPages);
    this.setData({
      // 拼接的
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // console.log(res);

    // 关闭下拉刷新的窗口  如果没有调用下拉刷新的窗口  直接关闭也不会报错
    wx.stopPullDownRefresh();
  },
  // 标题点击事件
  handleTabsItemChange(e) {
    console.log(e);
    // 1 获取被点击的标题索引
    const {
      index
    } = e.detail;
    // 2 修改源数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
    // 3 赋值到data中
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
    // 1 重置数组
    this.setData({
      goodsList:[]
    })
    // 2 重置页码
    this.QueryParams.pagenum=1;
    // 3 发送请求
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("页面触底")
    // 1 判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      // 没有下一页数据
      wx.showToast({
        title: '没有下一页数据',
        icon: 'none'
      })
    } else {
      // 还有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新事件
  onPullDownRefresh(){

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})