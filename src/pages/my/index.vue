<template>
  <div class="body">
    <div class="user" v-on:click="userHandler">
      <div class="icon">
        <img :src="userInfo.avatarUrl">
      </div>
      <div class="info">
        <p class="username" v-if="userInfo.nickName">{{userInfo.nickName}}</p>
        <!-- <p class="login-btn" v-else @click="bindLogin"></p> -->
        <div v-else>
          <button class="login-btn"  open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
            <img class='btnImg' src='../../../static/images/wx.png'></img>
            <span>登录</span>
          </button>
          <p class="tip">登录发现更多</p>
        </div>
      </div>
      <!-- <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick">获取权限</button> -->
    </div>
    <div class="door">
      <div class="collection" v-on:click="collectionHandler">
        <img class="btn-icon" src="/static/images/collection.png" >
        <span>收藏</span>
        <img class="btn-icon next" src="/static/images/next.png" >
      </div>
      <div class="about" v-on:click="settingHandler">
        <img class="btn-icon" src="/static/images/setting.png">
        <span>设置</span>
        <img class="btn-icon next" src="/static/images/next.png" >
      </div>
      <div class="about" v-on:click="aboutHandler">
        <img class="btn-icon" src="/static/images/problem.png">
        <span>关于</span>
        <img class="btn-icon next" src="/static/images/next.png" >
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'

export default {
  components: {
  },

  data () {
    return {
      logs: [],
      userInfo: {
        avatarUrl: '/static/images/user.png',
        nickName: ''
      }
    }
  },

  methods: {
    /* bindLogin (code) {
      const self = this;
      wx.getUserInfo({
        withCredentials: true,
        success (res) {
          let { encryptedData,userInfo,iv } = res;
          self.$httpWX.post({
            url: "/wx/login",
            data: {
              code: self.code,
              encryptedData,
              iv
            }
          }).then((res, header) => {
            if (res.success) {
              self.userInfo = res.data;
              wx.setStorageSync('user_token', res.data.token);
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: '登录失败'
              })
            }
          }).catch(err => {
            console.log(err);
          })
        },
        fail (err) {
          console.log(err);
          self.buttonVisible = true;
        }
      })
    }, */
    getCurrentUserInfo () {
      const self = this;
      self.$httpWX.get({
        url: "/wx/getUserInfo",
        data: {
          code: self.code
        }
      }).then((res) => {
        if (res.success) {
          self.userInfo = res.data;
        } else {
          self.userInfo.avatarUrl = '/static/images/user.png';
          self.userInfo.nickName = '';
        }
      }).catch(err => {
        console.log(err);
      })
    },
    bindGetUserInfo(e) {
      // console.log('回调事件后触发')
      const self = this;
      if (e.mp.detail.userInfo){
        console.log('允许')
        let { encryptedData,userInfo,iv } = e.mp.detail;
        self.$httpWX.post({
          url: "/wx/login",
          data: {
            code: self.code,
            encryptedData,
            iv
          }
        }).then((res, header) => {
          if (res.success) {
            self.userInfo = res.data;
            wx.setStorageSync('user_token', res.data.token);
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '登录失败'
            })
          }
        }).catch(err => {
          console.log(err);
        })
      } else {
        console.log('拒绝');
      }
    },
    settingHandler() {
      if (this.userInfo.nickName) {
        wx.navigateTo({
          url: "../setting/main"
        })
      } else {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 500,
          mask:true
        })
      }
    },
    collectionHandler() {
      if (this.userInfo.nickName) {
        wx.navigateTo({
          url: "../collection/main"
        })
      } else {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 500,
          mask:true
        })
      }
    },
    aboutHandler() {
      wx.navigateTo({
        url: "../about/main"
      })
    }
  },

  mounted () {
    const self = this;
  },

  created () {
  },

  onShow() {
    const self = this;
    // self.userInfo.avatarUrl = '/static/images/user.png';
    // self.userInfo.nickName = '';
    wx.login({
      success (res) {
        if (res.code){
          self.code = res.code;
        } else {
          wx.showToast({
            title: '未知错误',
            icon: 'none',
            duration: 500,
            mask:true
          })
        }
        self.getCurrentUserInfo();
      }
    })
  }
}
</script>

<style lang='less' scoped >
.body {
  background: #eeeeee;
  .user {
    background: #fff;
    height: 120rpx;
    padding: 20rpx;
    .icon {
      display: inline-block;
      img {
        width: 100rpx;
        height: 100rpx;
        // border: 1px #666666 solid;
        border-radius: 50rpx;
        background: #3b3b3b;
      }
    }
    .info {
      display: inline-block;
      margin-left: 20rpx;
      position: relative;
      bottom: 12rpx;
      .username {
        position:relative;
        bottom:24rpx;
      }
      .login-btn {
        width: 180rpx;
        height: 60rpx;
        background-color: #14c4bb;
        color: white;
        border-radius: 40rpx;
        .btnImg {
          // margin-right: 8rpx;
          width: 40rpx;
          height: 40rpx;
        }
        .login-btn::after {
          border-radius: 40rpx;
          border: 0;
        }
        span {
          position: relative;
          bottom: 10rpx;
        }
      }
      .tip {
        font-size: 10px;
        color: #666666;
        text-align: center;
      }
    }
  }
  .door {
    margin-top: 10rpx;
    &>div {
      padding: 10rpx 20rpx;
      height: 80rpx;
      background: #fff;
      font-size: 14px;
      font-weight: 600;
      border-bottom: 1px #e7e7e7 solid;
      line-height: 80rpx;
      color: #3b3b3b;
      .btn-icon {
        width: 50rpx;
        height: 50rpx;
        position: relative;
        top: 16rpx;
      }
      span {
        margin-left: 20rpx;
      }
      .next {
        float: right;
      }
    }
  }
}
// .log-list {
//   display: flex;
//   flex-direction: column;
//   padding: 40rpx;
// }

// .log-item {
//   margin: 10rpx;
// }
</style>
