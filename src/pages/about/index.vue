<template>
  <div class="body">
    <p>这是关于</p>
  </div>
</template>

<script>
export default {
  components: {
  },

  data () {
    return {
    }
  },

  methods: {
  },

  mounted () {
  },

  created () {
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
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
