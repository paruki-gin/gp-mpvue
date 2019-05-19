<template>
  <div class="body">
    <div class="main-scroll-container">
      <div v-if="list.length">
        <div class="scroll-view-item" v-for="(item,index) in list" :key="index" v-on:click="clickHandler(item.jobs._id)">
          <div class="item-box">
            <div class="item-header">
              <span class="name">{{item.jobs.name}}</span>
              <span class="salary">{{item.jobs.salary}}</span>
            </div>
            <div class="item-header-sm">
              <span class="area-year-edu">{{item.jobs.companyName}}</span>
              <span class="date">查看时间： {{item.timestamp}}</span>
            </div>
            <!-- <div class="item-label">
              <span v-for="(i,idx) in item.jobs.industryLables" :key="idx">{{i}}</span>
            </div> -->
            <!-- <div class="item-footer">
              <div class="company-img-box">
                <img :src="item.jobs.companyLogo">
              </div>
              <div class="company-info">
                <p class="company-name">{{item.jobs.companyName}}</p>
                <p class="company-label">{{item.jobs.financeStage}} | {{item.jobs.companySize}} | <span v-for="(i,idx) in item.jobs.industryField" :key="idx">{{i}} </span></p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div v-else>
        <div class="no-data-tip">暂无历史记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import {salaryArr, workYearArr, companySizeArr, financeStageArr} from '@/config/query';

export default {
  components: {
  },

  data () {
    return {
      pageNo: 1,
      list: []
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
    clickHandler(id, e) {
      var url = "../detail/main?id=" +id
      wx.navigateTo({url})
    },
    getList() {
      this.pageNo += 1;
      let pageNo = this.pageNo;
      // let pageSize = this.pageSize;
      this.$httpWX.post({
        url: '/wx/pageUserHistoryList',
        data: {
          pageNo: pageNo
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
              curr.timestamp = this.$timestamp(curr.timestamp)
              let currJob = curr.jobs;
              // currJob.formatTime = this.$timestamp(currJob.formatTime)
              salaryArr.forEach((item) => {
                if (item.value === currJob.salary) {
                  currJob.salary = item.label
                }
              })
              // workYearArr.forEach((item) => {
              //   if (item.value === currJob.workYear) {
              //     currJob.workYear = item.label
              //   }
              // })
              // companySizeArr.forEach((item) => {
              //   if (item.value === currJob.companySize) {
              //     currJob.companySize = item.label
              //   }
              // })
              // financeStageArr.forEach((item) => {
              //   if (item.value === currJob.financeStage) {
              //     currJob.financeStage = item.label
              //   }
              // })
            })
          }
          this.list = [...this.list, ...res.result.data]
        }
      })
    },
    refreshList() {
      this.$httpWX.post({
        url: '/wx/pageUserHistoryList',
        data: {
          pageNo: 1
        }
      }).then(res => {
        if (res.success) {
          res.result.data.forEach((curr, index, arr) => {
            curr.timestamp = this.$timestamp(curr.timestamp)
            let currJob = curr.jobs;
            // currJob.formatTime = this.$timestamp(currJob.formatTime)
            salaryArr.forEach((item) => {
              if (item.value === currJob.salary) {
                currJob.salary = item.label
              }
            })
            // workYearArr.forEach((item) => {
            //   if (item.value === currJob.workYear) {
            //     currJob.workYear = item.label
            //   }
            // })
            // companySizeArr.forEach((item) => {
            //   if (item.value === currJob.companySize) {
            //     currJob.companySize = item.label
            //   }
            // })
            // financeStageArr.forEach((item) => {
            //   if (item.value === currJob.financeStage) {
            //     currJob.financeStage = item.label
            //   }
            // })
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
    this.refreshList()
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
}
</style>
