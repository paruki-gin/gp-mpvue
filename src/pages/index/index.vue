<template>
  <div class="body">
    <!-- <div class="location">
      <p>{{location}}</p>
    </div> -->
    <!-- <div id="backToTop" v-show="showBackTop" @click="backToTop">
      返回<br>顶部
    </div> -->
    <search v-on:queryChange="queryChange"></search>
    <div class="main-scroll-container">
      <div v-if="list.length">
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
      <div v-else>
        <div class="no-data-tip">没找到您要的职位哦，看看别的吧</div>
      </div>
    </div>
    <!-- <div class="top">
      <img class="top-icon" src="/static/images/top.png" >
    </div> -->
  </div>
</template>

<script>
import search from '@/components/search'
import {salaryArr, workYearArr, companySizeArr, financeStageArr} from '@/config/query';

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
      showBackTop: false,
      currRegion: '杭州市',
      currInput: '',
      currSalary: '-1',
      currWorkYear: '-1',
      currCompanySize: '-1',
      currFinanceStage: '-1'
    }
  },

  components: {
    search
  },

  onPageScroll: function(e){
    if (e.scrollTop > 1800){
      this.showBackTop = true;
    } else {
      this.showBackTop = false;
    }
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
    backToTop (e) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    },
    queryChange (region, inputVal, salary, workYear, companySize, financeStage) {
      let regionStr = '';
      if (region[2] && region[2] !== '全部') {
        regionStr = region[2];
      } else if (region[1] && region[1] !== '全部') {
        regionStr = region[1];
      }
      this.currRegion = regionStr;
      this.currInput = inputVal;
      this.currSalary = salary.value;
      this.currWorkYear = workYear.value;
      this.currCompanySize = companySize.value;
      this.currFinanceStage = financeStage.value;
      // console.log(currRegion, inputVal, salary.value, workYear.value, companySize.value, financeStage.value);
      this.refreshList();
    },
    clickHandler(id, e) {
      var url = "../detail/main?id=" +id
      wx.navigateTo({url})
    },
    getList() {
      const self = this;
      this.pageNo += 1;
      let pageNo = this.pageNo;
      // let pageSize = this.pageSize;
      this.$httpWX.post({
        url: '/wx/pageList',
        data: {
          pageNo,
          currRegion: this.currRegion,
          currInput: this.currInput,
          currSalary: this.currSalary,
          currWorkYear: this.currWorkYear,
          currCompanySize: this.currCompanySize,
          currFinanceStage: this.currFinanceStage
        }
      }).then(res => {
        if (res.success) {
          if (!res.result.data.length) {
            wx.showToast({
              title: '没有更多',
              icon: 'none',
              duration: 500,
              mask:true
            })
            self.pageNo -=1
          } else {
            res.result.data.forEach((curr, index, arr) => {
              curr.formatTime = this.$timestamp(curr.formatTime)
              salaryArr.forEach((item) => {
                if (item.value === curr.salary) {
                  curr.salary = item.label
                }
              })
              workYearArr.forEach((item) => {
                if (item.value === curr.workYear) {
                  curr.workYear = item.label
                }
              })
              companySizeArr.forEach((item) => {
                if (item.value === curr.companySize) {
                  curr.companySize = item.label
                }
              })
              financeStageArr.forEach((item) => {
                if (item.value === curr.financeStage) {
                  curr.financeStage = item.label
                }
              })
            })
          }
          this.list = [...this.list, ...res.result.data]
        }
      })
    },
    refreshList() {
      const self = this;
      this.$httpWX.post({
        url: '/wx/pageList',
        data: {
          pageNo: 1,
          currRegion: this.currRegion,
          currInput: this.currInput,
          currSalary: this.currSalary,
          currWorkYear: this.currWorkYear,
          currCompanySize: this.currCompanySize,
          currFinanceStage: this.currFinanceStage
        }
      }).then(res => {
        res = JSON.parse(JSON.stringify(res).replace(/[\r\n]|\s+/g, ''));
        // console.log(res);
        if (res.success) {
          if (res.result.total === 0) {
            console.log('无数据')
          }
          res.result.data.forEach((curr, index, arr) => {
            curr.formatTime = this.$timestamp(curr.formatTime)
            salaryArr.forEach((item) => {
              if (item.value === curr.salary) {
                curr.salary = item.label
              }
            })
            workYearArr.forEach((item) => {
              if (item.value === curr.workYear) {
                curr.workYear = item.label
              }
            })
            companySizeArr.forEach((item) => {
              if (item.value === curr.companySize) {
                curr.companySize = item.label
              }
            })
            financeStageArr.forEach((item) => {
              if (item.value === curr.financeStage) {
                curr.financeStage = item.label
              }
            })
          })
          self.list = res.result.data;
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
  },

  created () {
    let app = getApp()
  },

  onLoad(){
    // Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang='less' scoped>
.body {
  // font-family: 'Microsoft YaHei';
  #backToTop{
    width: 60rpx;
    height: 60rpx;
    background-color: #14c4bb;
    color: white;
    padding: 10rpx 0 18rpx 10rpx;
    right: 0;
    position: fixed; //固定按钮在屏幕上的位置
    bottom: 2.5%;
    text-align: center;
    z-index: 100;
    font-size: 12px;
    border-radius: 12px 0 0 12px;
  }
  .main-scroll-container {
    // margin-top: 140rpx;
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
    .no-data-tip {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
      color: #999;
      font-size: 16px;
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
