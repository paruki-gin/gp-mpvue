// const host = 'http://192.168.123.1:3000/api'
// const host = 'http://192.168.43.5:3000/api'
const host = 'http://172.17.162.240:3000/api'

function request (url, method, data, header = {}) {
  // const sessionId = wx.getStorageSync('sessionId');
  if (url.indexOf('/wx/getUserInfo') === -1) {
    wx.showLoading({
      title: '加载中'
    })
  }
  let user_token;
  //获取本地token
  user_token = wx.getStorageSync('user_token')
  return new Promise((resolve, reject) => {
    wx.request({ 
      url: host + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        // 'Cookie': sessionId,
        'Authorization': user_token ? 'Bearer '+user_token : '',
        ...header
      },
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode == 401) {
          console.log('未登录');
          let url = "../index/main"
          wx.switchTab({url});
          wx.removeStorage({
            key: 'user_token',
            success(res) {
              console.log(res)
            }
          });
        }
        if (res.statusCode >=200 && res.statusCode < 300 || res.statusCode == 304) {
          resolve(res.data)
        }
      },
      fail: function (res) {
        wx.hideLoading()
        console.log(res)
        // reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

function get (obj) {
  return request(obj.url, 'GET', obj.data)
}

function post (obj) {
  return request(obj.url, 'POST', JSON.stringify(obj.data))
}

export default {
  request,
  get,
  post,
  host
}