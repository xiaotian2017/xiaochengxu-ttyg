// pages/feedback/index.js
/**
 * 1 点击 "+" 触发tap点击事件
 *   1 调用小程序内置的选择图片的api
 *   2 获取到 图片的路径 数组
 *   3 把图片路径 存到data的变量中
 *   4 页面就可以根据 图片数组 进行循环显示 自定义组件
 * 2 点击 自定义图片 组件
 *   1 获取被点击的元素的索引
 *   2 获取 data中的图片数组
 *   3 根据索引 数组中删除对应的元素
 *   4 把数组重新设置回到data中
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "体检问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImgs: [],
    // 文本域的内容
    textVal: ""
  },
  // 外网的图片的路径数组
  UpLoadImgs: [],

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
  //点击"+" 选择图片
  handleChooseImg() {
    var that = this;
    // 2 调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片的格式 原图 压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源 相册 照相机
      sourceType: ['album', 'camera'],
      success: function(result) {
        console.log(result);
        // this.setData({
        //   // 图片数组 进行拼接
        //   chooseImgs:[...this.data.chooseImgs,...res.tempFilePaths]
        // })
        that.setData({
          //   // 图片数组 进行拼接
          chooseImgs: [...that.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    })
  },
  // 点击自定义图片组件
  handleRemoveImg(e) {
    // 2 获取被点击的组件的索引
    const {
      index
    } = e.currentTarget.dataset;
    // 3 获取data中的图片数组
    let {
      chooseImgs
    } = this.data;
    // 4 删除元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  // 文本域的输入的事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 提交按钮的点击
  handleFormSubmit() {
    // 1 获取文本域的内容
    const {
      textVal,
      chooseImgs
    } = this.data;
    // 2 合法性的验证
    // if (!textVal) {
    //   // 不合法
    //   wx.showToast({
    //     title: '输入的内容不合法',
    //     icon: 'none',
    //     mask: true
    //   });
    //   return;
    // }
    wx.showLoading({
      title: '正在加载中..',
      icon: 'none'
    })
    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          // 图片上传到哪里
          url: 'https://images.as.cn/Home/Index/UploadAction',
          // 上传的文件的路径
          filePath: v,
          // 上传的文件的名称 后来获取文件
          name: "file",
          //上传附带的信息
          formData: {},
          success: (result) => {
            console.log(result)
            let url = JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);

            // 所有的图片都上传完毕了才触发
            if (i === chooseImgs.length - 1) {
              wx.hideLoading();

              console.log("提交成功")
              this.setData({
                textVal: "",
                chooseImgs: []
              });
              //返回上一个页面
              wx.navigateBack({
                delta: 1
              })
            }
          },
          fail: () => {

          },
          complete: () => {

          }
        })
      })
    } else {
      console.log("只是提交了文本")
      wx.showToast({
        title: '提交成功',
        icon:'success'
      })
      //返回上一个页面
      wx.navigateBack({
        delta: 1
      })
    }
    // 3 准备上传图片到专门的服务器
    // 上传文件的api 不支持 多个文件同时上传 遍历数组 挨个上传


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