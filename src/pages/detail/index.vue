<template>
  <div class="body" v-if="data.name">
    <!--概述-->
    <div class="summary">
      <div class="left">
        <p class="name">{{data.name}}</p>
        <p class="info">{{data.city}}·{{data.area}} | {{data.workYear}} | {{data.education}} | 全职</p>
        <p class="salary">{{data.salary}}</p>
      </div>
      <div class="right">
        <img :src="data.companyLogo">
      </div>
    </div>
    <!--职位发布者-->
    <!--详情-->
    <div class="info">
      <div class="first">
        <p class="title">职位亮点</p>
        <p class="advantage">{{data.positionAdvantage}}</p>
      </div>
      <div class="second">
        <p class="title">职位描述</p>
        <div class="label">
          <span v-for="(item, index) in data.industryField" :key='index'>{{item}}</span>
        </div>
        <div class="job-detail">
        <p>工岗位职责<br>1、负责公司产品前端的开发工作，按计划完成任务；<br>2、负责调试、解决不同终端、不同浏览器下的兼容性问题；<br>3、HTML5的开发，用户体验优化，各项性能的调优等；<br>4、编写和维护技术文档。</p>
        <p>任职资格</p>
        <p>1、计算机软件及相关专业，本科学历，3年以上前端开发经验，有Html5开发经验；<br>2、熟悉前端核心技术，包括XHTML/XML/CSS/Javascript/Ajax等；<br>3、熟悉Jquery、vue.js、reactJS类库框架中的至少一种；<br>4、熟悉HTML5（响应式布局），能够解决多类型终端，多浏览器兼容问题；<br>5、了解一门非前端的语言（如Java/PHP/NodeJS）；<br>6、能够优化代码并保持良好兼容性，对用户体验、交互操作流程、及用户需求有深入理解；<br>7、具备良好的服务意识、责任心、较强的学习能力、优秀的团队沟通与协作能力；</p>
        </div>
      </div>
    </div>
    <!--地址-->
    <div class="work_addr">
      <div class="title">公司信息</div>
      <div class="addr-text">
        <p>{{data.city}} - {{data.area}} - bizArea - xxxxx</p>
      </div>
      <div class="company-card" v-on:click="clickCopyCompanyUrlHandler">
        <div class="company-info">
          <p class="company-name">{{data.companyName}}</p>
          <p class="company-label">{{data.financeStage}} | {{data.companySize}} | <span v-for="(item, index) in data.industryField" :key='index'>{{item}}</span></p>
        </div>
        <div class="company-img-box">
          <img :src="data.companyLogo">
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="colle">
        <span v-on:click="colleHandler">收藏</span>
      </div>
      <div class="goto">
        <span v-on:click="clickCopyJobUrlHandler">复制链接</span>
      </div>
    </div>
  </div>
  <div v-else>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {}
    }
  },

  components: {
  },

  methods: {
    colleHandler() {
      console.log('收藏')
    },
    clickCopyJobUrlHandler(e) {
      wx.setClipboardData({
        data: this.data.detailLink,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制职位链接'
              })
            }
          })
        }
      })
    },
    clickCopyCompanyUrlHandler(e) {
      wx.setClipboardData({
        data: this.data.companyUrl,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制公司链接'
              })
            }
          })
        }
      })
    },
    getJobData(id) {
      this.$httpWX.get({
        url: '/wx/getJobDetail',
        data: {
          id: id
        }
      }).then(res => {
        if (res.success) {
          this.data = res.result;
        }
      })
    },
    getUserInfo() {
      this.$httpWX.get({
        url: '/wx/getUserInfo'
      }).then(res => {
        if (res.success) {
          console.log('已登录');
        } else {
          console.log('未登录');
        }
      })
    }
  },

  mounted () {
    this.data={};
    const query = this.$root.$mp.query;
    this.getUserInfo()
    this.getJobData(query.id)
  },

  created () {
    let app = getApp()
  }
}
</script>

<style lang='less' scoped>
.body {
  padding: 10rpx 20rpx 100rpx 20rpx;
  .summary {
    padding: 10rpx;
    padding: 10rpx 20rpx;
    border: 2rpx #d4d4d4 solid;
    border-radius: 4rpx;
    box-shadow: 0px 0px 2px #d4d4d4;
    .left {
      width: 80%;
      float: left;
      .name {
        font-size: 18px;
        font-weight: 700;
      }
      .info {
        font-size: 12px;
      }
      .salary {
        font-size: 14px;
        font-weight: 500;
        color: #ff9b17;
      }
    }
    .right {
      float: right;
      img {
        border: 1rpx #d4d4d4 solid;
        width: 80rpx;
        height: 80rpx;
      }
    }
  }
  .summary::after {
    display: block;
    height: 0;
    clear: both;
    content: '';
  }
  .info {
    // margin: 40rpx 20rpx 0 20rpx;
    .first, .second {
      margin: 40rpx 20rpx 0 20rpx;
      .title {
        font-size: 16px;
        font-weight: 700;
      }
    }
    .first {
      .advantage {
        font-size: 14px;
      }
    }
    .second {
      .label {
        margin: 0 0 20rpx 0;
        span {
          display: inline-block;
          padding: 4rpx 8rpx;
          margin-right: 10rpx;
          background: #e7e7e7;
          border-radius: 4rpx;
          color: #666666;
          font-size: 10px;
        }
      }
      .job-detail {
        font-size: 14px;
      }
    }
  }
  .work_addr {
    margin: 40rpx 20rpx 0 20rpx;
    .title {
      font-size: 16px;
      font-weight: 700;
    }
    .addr-text {
      font-size: 14px;
      a {
        display: inline-block;
      }
    }
    .company-card {
      border: 2rpx #d4d4d4 solid;
      border-radius: 4rpx;
      box-shadow: 0px 0px 2px #d4d4d4;
      margin-top: 20rpx;
      padding: 10rpx 20rpx;
      height: 86rpx;
      .company-info {
        float: left;
        .company-name {
          font-size: 14px;
          font-weight: 700;
        }
        .company-label {
          font-size: 12px;
        }
      }
      .company-img-box {
        float: right;
        img {
          width: 80rpx;
          height: 80rpx;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 80rpx;
    width: 100%;
    background: #FFF;
    padding: 10rpx 20rpx 0 20rpx;
    &>div {
      display: inline-block;
      // position: absolute;
      // top: 50%;
      // transform: translateY(-50%);
      height: 60rpx;
      border: 1px #14c4bb solid;
      border-radius: 4rpx;
      font-size: 16px;
      font-weight: 500;
      line-height: 60rpx;
      text-align: center;
    }
    .colle {
      width: 30%;
      margin-right: 22rpx;
      background: #eafffe;
      color: #14c4bb;
    }
    .goto {
      width: 60%;
      background: #14c4bb;
      color: #fff;
    }
  }
}
</style>
