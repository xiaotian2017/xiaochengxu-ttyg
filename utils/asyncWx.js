/*
* promise形式  getSetting
*/
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success:(result) =>{
        resolve(result)
      },
      fail:(err) =>{
        reject(err)
      },
      complete:() =>{

      }
    })  
  })
}
/*
* promise形式  chooseAddress
*/
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {

      }
    })
  })
}
/*
* promise形式  openSetting
*/
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {

      }
    })
  })
}
/*
* prmise 形式 showModal
* @param {object} param0 参数
*/
export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
       resolve(res)
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}

/*
* prmise 形式 showToast
* @param {object} param0 参数
*/
export const showToast= ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

/*
* prmise 形式 login
* @param {object} param0 参数
*/
export const login= () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result);
      },
      fail:() =>{
        reject(err);
      }
    });
  })
}

/*
* prmise 形式 requestPayment(小程序微信支付)
* @param {object} pay 支付所必要的参数
*/
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
   wx.requestPayment({
     ...pay,
     success:(result) =>{
       resolve(result)
     },
     fail:(error) =>{
       reject(error);
     }
   })
  })
}