<template>
  <div class="body" v-if="data.name">
    <!--概述-->
    <div class="summary">
      <div class="left">
        <p class="name">{{data.name}}</p>
        <p class="info">{{data.city}}·{{data.area}} | {{data.workYear}} | {{data.education}}</p>
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
        <div class="job-detail" v-html="data.jobDetail"></div>
      </div>
    </div>
    <!--地址-->
    <div class="work_addr">
      <div class="title">公司信息</div>
      <div class="addr-text">
        <p>{{data.workAddr}}<span v-on:click="clickCopyWorkAddr" style="color: #14c4bb">&emsp;复制</span></p>
      </div>
      <map
        id="map"
        :longitude="location.lng"
        :latitude="location.lat"
        :markers="markers"
        scale="15"
        style="width: 100%; height: 300px;"
      ></map>
      <div class="company-card" v-on:click="clickToCompanyPageHandler">
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
        <div class="colle-label colle-active" v-if="isColled" v-on:click="colleHandler">
          <img src="/static/images/colle_fill.png" >
          <span>取消</span>
        </div>
        <div class="colle-label" v-else v-on:click="colleHandler">
          <img src="/static/images/colle.png" >
          <span>收藏</span>
        </div>
      </div>
      <div class="share">
        <div class="share-label" v-on:click="shareHandler">
          <div v-if="isLogined">
            <button open-type='share'>
              <img src="/static/images/share.png" >
              <span>分享</span>
            </button>
          </div>
          <div v-else>
            <img src="/static/images/share.png" >
            <span>分享</span>
          </div>
        </div>
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
import {salaryArr, workYearArr, companySizeArr, financeStageArr} from '@/config/query';
export default {
  data () {
    return {
      data: {
      },
      isColled: false,
      isLogined: false,
      location: {
        lng: 120.19,
        lat: 30.26
      },
      markers: [{
        id: 0,
        latitude: 30.26,
        longitude: 120.19,
        name: '地址',
        iconPath: '/static/images/coordinates.png',
        width: 50,
        height: 50
      }],
    }
  },

  components: {
  },

  methods: {
    colleHandler() {
      const self = this;
      if (!this.isLogined) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 500,
          mask:true
        })
      } else {
        if (this.isColled) {
          //取消收藏
          self.$httpWX.get({
            url: "/wx/delUserCollection",
            data: {
              id: self.data._id
            }
          }).then((res) => {
            if (res.success) {
              this.isColled = false;
              wx.showToast({
                title: '取消收藏成功'
              })
            }
          }).catch(err => {
            console.log(err);
          })
        } else {
          //收藏
          self.$httpWX.get({
            url: "/wx/setUserCollection",
            data: {
              id: self.data._id
            }
          }).then((res) => {
            if (res.success) {
              this.isColled = true;
              wx.showToast({
                title: '收藏成功'
              })
            }
          }).catch(err => {
            console.log(err);
          })
        }
      }
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
    clickToCompanyPageHandler(e) {
      const companyId = this.data.companyId;
      var url = "../company/main?id="+companyId;
      wx.navigateTo({url})
      // wx.setClipboardData({
      //   data: this.data.companyUrl,
      //   success: function (res) {
      //     wx.getClipboardData({
      //       success: function (res) {
      //         wx.showToast({
      //           title: '复制公司链接'
      //         })
      //       }
      //     })
      //   }
      // })
    },
    clickCopyWorkAddr(e) {
      wx.setClipboardData({
        data: this.data.workAddr,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制公司地址'
              })
            }
          })
        }
      })
    },
    shareHandler() {
      if (!this.isLogined) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 500,
          mask:true
        })
      }
    },
    //查询收藏状态
    getCollectionStatus (id) {
      const self = this;
      self.$httpWX.get({
        url: "/wx/getUserCollectionById",
        data: {
          id: id
        }
      }).then((res) => {
        if (res.success) {
          self.isColled = res.data.isColled
          self.isLogined = true;
        } else {
          self.isLogined = false;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getJobData(id) {
      const self = this;
      this.$httpWX.get({
        url: '/wx/getJobDetail',
        data: {
          id: id
        }
      }).then(res => {
        if (res.success) {
          let detail = res.result;
          salaryArr.forEach((item) => {
            if (item.value === detail.salary) {
              detail.salary = item.label
            }
          })
          workYearArr.forEach((item) => {
            if (item.value === detail.workYear) {
              detail.workYear = item.label
            }
          })
          companySizeArr.forEach((item) => {
            if (item.value === detail.companySize) {
              detail.companySize = item.label
            }
          })
          financeStageArr.forEach((item) => {
            if (item.value === detail.financeStage) {
              detail.financeStage = item.label
            }
          })
          this.data = detail;
          return res.result['_id'];
        } else {

        }
      }).then(jobId => {
        self.getCollectionStatus(jobId);
        if (self.data.isComplete) {
          const addrStr = self.data.workAddr;
          self.getBaiduLocation(addrStr);
        }
      })
    },
    getBaiduLocation(addrStr) {
      const self = this;
      let ak = 'bngYWdoBrDGyZ3WLVoRbxlWv6o1ZncSU';
      let url = `http://api.map.baidu.com/geocoder/v2/`
      wx.request({
        url,
        data:{
          address: addrStr,
          ret_coordtype: 'gcj02ll',
          ak,
          output:'json'
        },
        success:(res)=>{
          if (res.data.status === 0) {
            const lat = res.data.result.location.lat;
            const lng = res.data.result.location.lng;
            self.location.lat = lat;
            self.location.lng = lng;
            self.markers.splice(0, 1,{
              id: 0,
              latitude: lat,
              longitude: lng,
              name: '地址',
              iconPath: '/static/images/coordinates_red.png',
              width: 50,
              height: 50
            })
          }
        }
      })
    }
  },

  onShareAppMessage: function(options) {
    console.log(options)
  },

  mounted () {
    this.data={};
    const query = this.$root.$mp.query;
    this.getJobData(query.id)
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
  },

  created () {
    let app = getApp()
  }
}
</script>

<style lang='less' scoped>
.body {
  padding: 10rpx 20rpx 100rpx 20rpx;
  background: #fff;
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
      padding-bottom: 10rpx;
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
    padding: 16rpx 20rpx 0 20rpx;
    box-shadow: -2rpx 0 5rpx #888888;
    z-index: 100;
    &>div {
      display: inline-block;
      // position: absolute;
      // top: 50%;
      // transform: translateY(-50%);
      height: 60rpx;
      font-size: 16px;
      font-weight: 500;
      line-height: 60rpx;
      text-align: center;
    }
    .colle {
      width: 20%;
      margin-right: 14rpx;
      // background: #eafffe;
      color: #999999;
      .colle-label {
        img {
          width: 40rpx;
          height: 40rpx;
          position: relative;
          top:8rpx;
        }
      }
      .colle-active {
        color: #14c4bb;
      }
    }
    .share {
      width: 20%;
      margin-right: 14rpx;
      color: #999999;
      .share-label {
        button {
          position: relative;
          top: 8rpx;
          display: inline-block;
          margin: 0;
          padding: 0;
          background: #fff;
          border-radius:0;
          overflow: none;
          color: #999999;
          line-height: 40rpx;
        }
        button::after {
          border: none;
        }
        img {
          width: 40rpx;
          height: 40rpx;
          position: relative;
          top: 10rpx;
        }
      }
    }
    .goto {
      width: 50%;
      border: 1px #14c4bb solid;
      border-radius: 4rpx;
      background: #14c4bb;
      color: #fff;
    }
  }
}
</style>
