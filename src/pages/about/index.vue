<template>
  <div class="body">
    <div class="content">
      <p>&emsp;&emsp;GP招聘是提供招聘信息的信息展示平台，为用户提供大量岗位数据，供用户进行收藏、分享等。</p>
      <p>&emsp;&emsp;关于平台数据的公告：本平台保证所有数据来源于互联网招聘网站数据，并保证所有数据引用自相关网站，没有进行任何客观或者主管意图的修改。</p>
      <p>&emsp;&emsp;由于招聘数据造成的损失，本平台恕不负责。</p>
      <p class="email">联系方式: <span>xxxx@foxmail.com</span></p>
    </div>
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
  background: #ffffff;
  height: 100vh;
  .content {
    padding: 20rpx;
    font-size: 16px;
    .email {
      margin-top: 40rpx;
      color: #999999;
      font-size: 12px;
      span {
        color: #14c4bb;
      }
    }
  }
}
</style>
