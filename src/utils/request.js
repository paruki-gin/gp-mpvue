const host = 'http://192.168.123.1:3000/api'

function request (url, method, data, header = {}) {
  const sessionId = wx.getStorageSync('sessionId');
  wx.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'Cookie': sessionId,
        ...header
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading()
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