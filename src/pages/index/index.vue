<template>
  <div class="body">
    <!-- <p>{{location}}</p>
    <search></search> -->
    <div class="main-scroll-container">
      <div class="scroll-view-item" v-for="(item,index) in list" :key="index" v-on:click="clickHandler(item._id)">
        <div class="item-box">
          <div class="item-header">
            <span class="name">{{item.name}}</span>
            <span class="salary">{{item.salary}}</span>
          </div>
          <div class="item-header-sm">
            <span class="area-year-edu">{{item.area}} | {{item.workYear}} | {{item.education}} </span>
            <span class="date">{{item.formatTime}}</span>
          </div>
          <div class="item-label">
            <span v-for="(i,idx) in item.industryLables" :key="idx">{{i}}</span>
          </div>
          <div class="item-footer">
            <div class="company-img-box">
              <img :src="item.companyLogo">
            </div>
            <div class="company-info">
              <p class="company-name">{{item.companyName}}</p>
              <p class="company-label">{{item.financeStage}} | {{item.companySize}} | <span v-for="(i,idx) in item.industryField" :key="idx">{{i}} </span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="top">
      <img class="top-icon" src="/static/images/top.png" >
    </div> -->
  </div>
</template>

<script>
import search from '@/components/search'

export default {
  data () {
    return {
      // motto: 'Hello miniprograme',
      // userInfo: {
      //   nickName: 'mpvue',
      //   avatarUrl: 'http://mpvue.com/assets/logo.png'
      // },
      pageNo: 1,
      list: [],
      location: '杭州市'
    }
  },

  components: {
    search
  },

  methods: {
    // bindViewTap () {
    //   const url = '../logs/main'
    //   if (mpvuePlatform === 'wx') {
    //     mpvue.switchTab({ url })
    //   } else {
    //     mpvue.navigateTo({ url })
    //   }
    // },
    getGeo () {
      let self = this;
      let ak = 'bngYWdoBrDGyZ3WLVoRbxlWv6o1ZncSU';
      let url = `http://api.map.baidu.com/geocoder/v2/`
      wx.getLocation({
        type: 'wgs84',
        success: geo => {
          wx.request({
            url,
            data:{
              ak,
              output:'json',
              location:`${geo.latitude},${geo.longitude}`
            },
            success:(res)=>{
              console.log(res)
              if (res.data.status === 0) {
                self.location = res.data.result.addressComponent.city
                console.log(res.data.result.addressComponent.city)
              } else {
                self.location = '未知地点'
              }
            }
          })
        }
      })
    },
    clickHandler(id, e) {
      var url = "../detail/main?id=" +id
      wx.navigateTo({url})
    },
    getList() {
      this.pageNo += 1;
      let pageNo = this.pageNo;
      // let pageSize = this.pageSize;
      this.$httpWX.post({
        url: '/wx/pageList',
        data: {
          pageNo: pageNo
        }
      }).then(res => {
        if (res.success) {
          res.result.data.forEach((curr, index, arr) => {
            curr.formatTime = this.$timestamp(curr.formatTime)
          })
          this.list = [...this.list, ...res.result.data]
        }
      })
    },
    refreshList() {
      this.$httpWX.post({
        url: '/wx/pageList',
        data: {
          pageNo: 1
        }
      }).then(res => {
        if (res.success) {
          res.result.data.forEach((curr, index, arr) => {
            curr.formatTime = this.$timestamp(curr.formatTime)
          })
          this.list = res.result.data
        }
      })
    }
  },

  async onPullDownRefresh() {
    console.log('下拉刷新')
    this.refreshList();
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    console.log('上划加载')
    this.getList();
  },

  mounted () {
    this.refreshList();
    // this.getGeo();
  },

  created () {
    let app = getApp()
  },

  onLoad(){
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang='less' scoped>
.body {
  // font-family: 'Microsoft YaHei';
  .main-scroll-container {
    .scroll-view-item {
      background: #e0e0e0;
      padding: 2rpx 0;
      .item-box {
        background: #FFF;
        padding: 20rpx 20rpx 10rpx 20rpx;
        .item-header {
          height: 30rpx;
          line-height: 30rpx;
          .name {
            float: left;
            font-size: 14px;
            font-weight: 700;
          }
          .salary {
            float: right;
            font-size: 14px;
            font-weight: 600;
            color: #fda218;
          }
        }
        .item-header-sm {
          font-size: 12px;
          height: 30rpx;
          line-height: 30rpx;
          margin-top: 10rpx;
          .area-year-edu {
            color: #666666;
            float: left;
          }
          .date {
            color: #999999;
            float: right;
          }
        }
        .item-label {
          span {
            display: inline-block;
            padding: 4rpx 8rpx;
            margin-right: 10rpx;
            background: #FFF;
            border: 1px #14c4bb solid;
            border-radius: 4px;
            color: #14c4bb;
            font-size: 10px;
          }
        }
        .item-footer {
          padding: 20rpx 0 10rpx 0;
          position: relative;
          .company-img-box {
            display: inline-block;
            img {
              border: 1rpx #d4d4d4 solid;
              width: 80rpx;
              height: 80rpx;
            }
          }
          .company-info {
            display: inline-block;
            margin-left: 20rpx;
            position: absolute;
            // top: 18rpx;
            .company-name {
              font-size: 14px;
            }
            .company-label {
              font-size: 12px;
              color: #666666;
            }
          }
        }
      }
    }
  }
  // .top {
  //   position: fixed;
  //   bottom: 40rpx;
  //   right: 20rpx;
  //   background: #FFF;
  //   border-radius: 50rpx;
  //   .top-icon {
  //     width: 100rpx;
  //     height: 100rpx;
  //   }
  // }
}
/* .userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
} */
</style>
