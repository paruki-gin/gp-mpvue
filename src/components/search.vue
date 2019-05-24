<template>
  <div class="index-tar-container">
    <div class="location">
      <picker
        mode="region"
        @change="bindRegionChange"
        :value="region"
        :custom-item="customItem"
        class="region-picker"
      >
        <div class="picker">
          <img src="../../static/images/coordinates.png" alt="">
          <span v-if="region[2] && region[2] !== '全部'">{{region[2]}}</span>
          <span v-else-if="region[1] && region[1] !== '全部'">{{region[1]}}</span>
          <span v-else-if="region[1] && region[1] !== '全部'">{{region[0]}}</span>
          <span v-else>全部</span>
        </div>
      </picker>
    </div>
    <div class="search-bar">
      <div class="search-bar-form">
        <div class="search-bar-box">
          <icon class="icon-search" type="search" size="14"></icon>
          <input type="text" class="search-bar-input" placeholder="搜索" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
          <div class="icon-clear" v-if="inputVal.length > 0" @click="clearInput">
            <icon type="clear" size="14"></icon>
          </div>
        </div>
        <label class="search-bar-label" :hidden="inputShowed" @click="showInput">
          <icon class="icon-search-label" type="search" size="14"></icon>
          <div class="search-bar-text">搜索</div>
        </label>
      </div>
      <div class="search-bar-cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
    </div>
    <!-- <div class="cells searchbar-result" v-if="inputVal.length > 0">
      <navigator url="" class="cell" hover-class="cell_active">
        <div class="cell__bd">
          <div>实时搜索文本</div>
        </div>
      </navigator>
    </div> -->
    <div class="picker-group">
      <!-- <picker
        mode="date"
        :value="date"
        start="2015-09-01"
        class="picker-item"
        @change="dateChange">
          <span class="picker">
            当前选择: {{date}}
          </span>
      </picker> -->
      <picker
        @click="bindSalaryClick"
        @cancel="bindSalaryCancel"
        @change="salaryChange"
        :value="index" :range="salaryArr" :range-key="'label'" class="picker-item">
        <div class="picker">
          <span v-show="currSalary.value !== '-1'" class="picker-label-active">{{currSalary.label}}</span>
          <span v-show="currSalary.value === '-1'" :class="isSalaryPickerOpen ? 'picker-label-active' : 'picker-label'">月薪
            <span class="picker-arrow">{{isSalaryPickerOpen ? '▲' : '▼'}}</span>
          </span>
        </div>
      </picker>
      <picker
        @click="bindWorkYearClick"
        @cancel="bindWorkYearCancel"
        @change="workYearChange"
        :value="index" :range="workYearArr" :range-key="'label'" class="picker-item">
        <div class="picker">
          <span v-show="currWorkYear.value !== '-1'" class="picker-label-active">{{currWorkYear.label}}</span>
          <span v-show="currWorkYear.value === '-1'" :class="isWorkYearPickerOpen ? 'picker-label-active' : 'picker-label'">经验
            <span class="picker-arrow">{{isWorkYearPickerOpen ? '▲' : '▼'}}</span>
          </span>
        </div>
      </picker>
      <picker
        @click="bindCompanySizeClick"
        @cancel="bindCompanySizeCancel"
        @change="companySizeChange"
        :value="index" :range="companySizeArr" :range-key="'label'" class="picker-item">
        <div class="picker">
          <span v-show="currCompanySize.value !== '-1'" class="picker-label-active">{{currCompanySize.label}}</span>
          <span v-show="currCompanySize.value === '-1'" :class="isCompanySizePickerOpen ? 'picker-label-active' : 'picker-label'">公司规模
            <span class="picker-arrow">{{isCompanySizePickerOpen ? '▲' : '▼'}}</span>
          </span>
        </div>
      </picker>
      <picker
        @click="bindFinanceStageClick"
        @cancel="bindFinanceStageCancel"
        @change="financeStageChange"
        :value="index" :range="financeStageArr" :range-key="'label'" class="picker-item">
        <div class="picker">
          <span v-show="currFinanceStage.value !== '-1'" class="picker-label-active">{{currFinanceStage.label}}</span>
          <span v-show="currFinanceStage.value === '-1'" :class="isFinanceStagPickerOpen ? 'picker-label-active' : 'picker-label'">融资
            <span class="picker-arrow">{{isFinanceStagPickerOpen ? '▲' : '▼'}}</span>
          </span>
        </div>
      </picker>
      <div @click="bindClearQuery" class="undo-btn">
        <img class="undo-btn" src="../../static/images/undo.png">
      </div>
    </div>
  </div>
</template>

<script>
import {debounce} from '@/utils/index';
import {salaryArr, workYearArr, companySizeArr, financeStageArr} from '@/config/query';
export default {
  data() {
    return {
      inputShowed: false,
      inputVal: '',
      // date: '',
      currSalary: {
        label: '不限',
        value: '-1'
      },
      isSalaryPickerOpen: false,
      currWorkYear: {
        label: '不限',
        value: '-1'
      },
      isWorkYearPickerOpen: false,
      currCompanySize: {
        label: '不限',
        value: '-1'
      },
      isCompanySizePickerOpen: false,
      currFinanceStage: {
        label: '不限',
        value: '-1'
      },
      isFinanceStagPickerOpen: false,
      customItem: '全部',
      region: ['', '', ''],
      salaryArr: salaryArr,
      workYearArr: workYearArr,
      companySizeArr: companySizeArr,
      financeStageArr: financeStageArr
    }
  },
  // watch: {
  //   changePage: function(e) {

  //   }
  // },
  methods: {
    // dateChange: function (e) {
    //   console.log(e.mp.detail.value)
    //   this.date = e.mp.detail.value
    // },
    getGeo () {
      let self = this;
      let ak = 'bngYWdoBrDGyZ3WLVoRbxlWv6o1ZncSU';
      let url = `http://api.map.baidu.com/geocoder/v2/`;
      wx.getLocation({
        type: 'wgs84',
        success: geo => {
          console.log('geo', geo);
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
                self.region.splice(0, 1, res.data.result.addressComponent.province)
                self.region.splice(1, 1, res.data.result.addressComponent.city)
                self.region.splice(2, 1, res.data.result.addressComponent.district)
              } else {
                this.region = ['','','']
              }
            }
          })
        },
        fail: err => {
          console.log('fail', err)
        }
      })
    },

    bindRegionChange(e) {
      console.log(e.mp.detail.value)
      if (e.mp.detail.value[0] === '全部' && e.mp.detail.value[1] === '全部' &&e.mp.detail.value[2] === '全部') {
        this.region = ' ';
      } else if (e.mp.detail.value[1] === '全部') {
        wx.showToast({
          title: '请选择城市或地区',
          icon: 'none',
          duration: 500,
          mask:true
        })
      } else {
        this.region = e.mp.detail.value
      }
    },

    bindClearQuery(e) {
      this.currSalary = {
        label: '不限',
        value: '-1'
      };
      this.currCompanySize = {
        label: '不限',
        value: '-1'
      };
      this.currWorkYear = {
        label: '不限',
        value: '-1'
      };
      this.currFinanceStage = {
        label: '不限',
        value: '-1'
      };
    },

    salaryChange: function (e) {
      let index = e.mp.detail.value;
      this.currSalary = this.salaryArr[index];
      this.isSalaryPickerOpen = false;
    },
    bindSalaryClick: function (e) {
      this.isSalaryPickerOpen = true;
    },
    bindSalaryCancel: function (e) {
      this.isSalaryPickerOpen = false;
    },

    workYearChange: function (e) {
      let index = e.mp.detail.value;
      this.currWorkYear = this.workYearArr[index];
      this.isWorkYearPickerOpen = false;
    },
    bindWorkYearClick: function (e) {
      this.isWorkYearPickerOpen = true;
    },
    bindWorkYearCancel: function (e) {
      this.isWorkYearPickerOpen = false;
    },

    companySizeChange: function (e) {
      let index = e.mp.detail.value;
      this.currCompanySize = this.companySizeArr[index];
      this.isCompanySizePickerOpen = false;
    },
    bindCompanySizeClick: function (e) {
      this.isCompanySizePickerOpen = true;
    },
    bindCompanySizeCancel: function (e) {
      this.isCompanySizePickerOpen = false;
    },

    financeStageChange: function (e) {
      let index = e.mp.detail.value;
      this.currFinanceStage = this.financeStageArr[index];
      this.isFinanceStagPickerOpen = false;
    },
    bindFinanceStageClick: function (e) {
      this.isFinanceStagPickerOpen = true;
    },
    bindFinanceStageCancel: function (e) {
      this.isFinanceStagPickerOpen = false;
    },

    showInput() {
      this.inputShowed = true;
    },
    hideInput() {
      this.inputVal = '';
      this.inputShowed = false
    },
    clearInput() {
      this.inputVal = '';
    },
    inputTyping(e) {
      // console.log(e.mp.detail.value);
      this.inputVal = e.mp.detail.value
    },
    queryChange() {
      const self = this;
      this.$emit('queryChange', this.region, this.inputVal, this.currSalary, this.currWorkYear, this.currCompanySize, this.currFinanceStage);
    }
  },

  mounted () {
    this.getGeo();
    this.$watch('region', debounce((val) => {
      val && this.queryChange();
    }, 200))
    this.$watch('inputVal', function() {
      this.queryChange();
    })
    this.$watch('currSalary', function() {
      this.queryChange();
    })
    this.$watch('currWorkYear', function() {
      this.queryChange();
    })
    this.$watch('currCompanySize', function() {
      this.queryChange();
    })
    this.$watch('currFinanceStage', function() {
      this.queryChange();
    })
  }
}
</script>

<style lang='less' scoped >
.index-tar-container {
  position: relative;
  width: 100vw;
  // top: 0;
  z-index: 99;
  border-bottom: 2rpx solid #d7d6dc;
  .location {
    position: absolute;
    top: 30rpx;
    padding: 0 20rpx;
    .region-picker {
      font-size: 14px;
      height: 44rpx;
      line-height: 44rpx;
      vertical-align: middle;
      .picker {
        img {
          width: 40rpx;
          height: 40rpx;
        }
        span {
          position: relative;
          bottom: 10rpx;
        }
      }
    }
  }
  .search-bar {
    padding: 20rpx 14rpx 10rpx 160rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    background-color: #ffffff;
    z-index: 98;
    height: 90rpx;
    // border-bottom: 1rpx solid #d7d6dc;
    .search-bar-form {
      position: relative;
      -webkit-box-flex: 1;
      -webkit-flex: auto;
      flex: auto;
      border-radius: 40rpx;
      background: rgb(243, 243, 243);
      border: 2rpx solid rgb(243, 243, 243);
      .search-bar-box {
        position: relative;
        padding-left: 30rpx;
        padding-right: 30rpx;
        width: 100%;
        box-sizing: border-box;
        z-index: 1;
        .icon-search {
          position: absolute;
          left: 28rpx;
          top: 16rpx;
        }
        .search-bar-input {
          // display: inline-block;
          height: 28rpx;
          line-height: 28px;
          font-size: 14px;
          padding-left: 38rpx;
          padding-top: 6rpx;
        }
        .icon-clear {
          position: absolute;
          top: 10rpx;
          right: 0;
          padding: 8rpx 20rpx 8rpx;
          font-size: 0;
        }
      }
    }

    .search-bar-label {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      border-radius: 40rpx;
      text-align: center;
      color: #9b9b9b;
      background: #fff;
      line-height: 28px;
      .icon-search-label {
        margin-right: 8rpx;
        font-size: inherit;
      }
      .search-bar-text {
        display: inline-block;
        font-size: 14px;
        position:relative;
        top:-2rpx;
      }
    }
    .search-bar-cancel-btn {
      font-size: 16px;
      margin-left: 10rpx;
      line-height: 28px;
      color: #14c4bb;
      white-space: nowrap;
    }
  }
  /* .searchbar-result {
    margin-top: 0;
    font-size: 14px;
  }
  .searchbar-result:before {
    display: none;
  } */
  .picker-group {
    width: 100vw;
    height: 40rpx;
    line-height: 40rpx;
    background: #ffffff;
    padding: 10rpx;
    display: flex;
    justify-content: space-around;
    .picker-item {
      display: inline-block;
      width: 140rpx;
      font-size: 12px;
      text-align: center;
      .picker-label-active {
        color: #14c4bb;
      }
      .picker-arrow {
        font-size: 10px;
        color: #999;
      }
    }
    .undo-btn {
      img {
        position: relative;
        right: 10rpx;
        width: 30rpx;
        height: 30rpx;
      }
    }
  }
}

</style>
