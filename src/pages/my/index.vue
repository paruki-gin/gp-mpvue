<template>
  <div class="body">
    <div class="user" v-on:click="userHandler">
      <div class="icon">
        <img :src="userInfo.avatarUrl">
      </div>
      <div class="info">
        <p class="login-btn">{{userInfo.nickName ? userInfo.nickName : '点击登录'}}</p>
        <p class="tip">{{userInfo.nickName ? '&nbsp;' : '登录发现更多'}}</p>
      </div>
      <!-- <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick">获取权限</button> -->
    </div>
    <div class="door">
      <div class="collection" v-on:click="collectionHandler">
        <img class="btn-icon" src="/static/images/collection.png" >
        <span>收藏</span>
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
    wxGetUserInfo (code) {
      const self = this;
      wx.getUserInfo({
        withCredentials: true,
        success (res) {
          let { encryptedData,userInfo,iv } = res;
          self.$httpWX.post({
            url: "/wx/login",
            data: {
              code,
              encryptedData,
              iv
            }
          }).then((res, header) => {
            console.log(res);
            self.userInfo = res.data;
            wx.setStorageSync('sessionId', res.data.sessionId)
          }).catch(err => {
            console.log(err);
          })
        },
        fail (err) {
          console.log(err);
          self.buttonVisible = true;
        }
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
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
      } else {
        console.log('拒绝');
      }
    },
    userHandler() {
      console.log('login');
    },
    collectionHandler() {
      console.log('collection');
    },
    aboutHandler() {
      console.log('about');
    }
  },

  mounted () {
    const self = this;
    wx.login({
      success (res) {
        if (res.code){
          self.code = res.code;
          console.log('res.code', res.code);
          self.wxGetUserInfo(res.code);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  created () {
  }
}
</script>

<style lang='less' scoped >
.body {
  background: #e7e7e7;
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
      bottom: 24rpx;
      .login-btn {
        font-size: 16px;
        font-size: 700
      }
      .tip {
        font-size: 10px;
        color: #666666;
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
