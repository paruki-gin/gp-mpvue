<template>
  <div>
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
          <icon class="icon-search" type="search" size="14"></icon>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputShowed: false,
      inputVal: ""
    }
  },
  methods: {
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
      console.log(e);
      this.inputVal = e.mp.detail.value
    }
  }
}
</script>

<style>
.searchbar-result {
  margin-top: 0;
  font-size: 14px;
}
.searchbar-result:before {
  display: none;
}
</style>
