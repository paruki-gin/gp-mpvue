<template>
  <!-- <div @click="clickHandle">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />
      <h1>666</h1>
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" :value="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>


    <div class="all">
        <div class="left">
        </div>
        <div class="right">
        </div>
    </div>
  </div> -->
  <div class="body">
    <scroll-view v-for="(item,index) in arr" :key="index" scroll-y="true" class="main-scroll-container">
      <div class="scroll-view-item">
        <div class="item-box">
          <div class="item-header">
            <span class="name">前端开发工程师</span>
            <span class="salary">10k-20k</span>
          </div>
          <div class="item-header-sm">
            <span class="area-year-edu">滨江区|3-5年|本科</span>
            <span class="date">04月06日</span>
          </div>
          <div class="item-label">
            <span>移动互联网</span>
            <span>html5</span>
          </div>
          <div class="item-footer">
            <div class="company-img-box">
              <img src="https://www.lgstatic.com/thumbnail_120x120/i/image3/M00/19/43/Cgq2xlp5AX-AL3-fAABe3g0jN-g364.png" alt="">
            </div>
            <div class="company-info">
              <p class="company-name">八东通科技</p>
              <p class="company-label">A轮 | 150-500人 | 移动互联网</p>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      arr: [
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'},
        {name: 'x'}
      ]
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang='less' scoped>
.body {
  .main-scroll-container {
    .scroll-view-item {
      background: #e0e0e0;
      padding: 10rpx 0;
      .item-box {
        background: #FFF;
        padding: 10rpx 20rpx;
        .item-header {
          .name {
            font-size: 16px;
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
          .area-year-edu {
            color: #666666;
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
            background: #e7e7e7;
            border-radius: 4rpx;
            color: #666666;
            font-size: 10px;
          }
        }
        .item-footer {
          padding: 10rpx 0;
          // height: 88rpx;
          .company-img-box {
            display: inline-block;
            img {
              width: 80rpx;
              height: 80rpx;
            }
          }
          .company-info {
            display: inline-block;
            margin-left: 20rpx;
            height: 80rpx;
            // padding: 10rpx 5rpx;
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
