<template>
  <div class="body">
    <div class="door">
      <div class="" v-on:click="clearDataHandler">
        <span>清除浏览历史</span>
        <img class="btn-icon next" src="/static/images/next.png" >
      </div>
      <div class="collection" v-on:click="logoutHandler">
        <span>退出登录</span>
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
    }
  },

  methods: {
    clearDataHandler() {
      //clearUserHistory
      this.$httpWX.get({
        url: "/wx/clearUserHistory"
      }).then((res) => {
        wx.showToast({
          title: '已清除数据',
          icon: 'none',
          duration: 1500,
          mask:true
        })
      }).catch(err => {
        console.log(err);
        wx.showToast({
          title: '未知错误',
          icon: 'none',
          duration: 1500,
          mask:true
        })
      })
      // setTimeout(function() {
      //   wx.showToast({
      //     title: '已清除数据',
      //     icon: 'none',
      //     duration: 1500,
      //     mask:true
      //   })
      // }, 500);
    },
    logoutHandler() {
      const self = this;
      wx.removeStorageSync('user_token');
      this.$httpWX.get({
        url: "/wx/logout"
      }).then((res) => {
      }).catch(err => {
        console.log(err);
      })
    }
  },

  mounted () {
    const self = this;
  },

  created () {
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
