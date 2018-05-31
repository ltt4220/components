<template>
    <div class="zm-edit-slider zm-edit-item zm-edit-goodsList-colsRows">
        <div class="zm-edit-goodsList-rowsBox">
            <span>行数：</span>
            <div>
                <input type="text" v-model="rowsInputVal" @change="rowsInputChange" @keyup.enter="rowsEnter">
                <p>
                    <i @click="rowsBoxUp">
                        <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 367.23 246.78">
                            <path d="M364.54,16.39C360.45,8.19,352.25,0,340,0H24.58C12.29,0,0,12.29,0,28.67,0,41,6.32,47.34,11.61,53.71L163.84,237.57c8.19,12.29,28.67,12.29,36.86,0L360.45,49.15C368.64,41,368.64,28.67,364.54,16.39Z"></path>
                        </svg>
                    </i>
                    <em @click="rowsBoxDown">
                        <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 367.23 246.78">
                            <path d="M364.54,16.39C360.45,8.19,352.25,0,340,0H24.58C12.29,0,0,12.29,0,28.67,0,41,6.32,47.34,11.61,53.71L163.84,237.57c8.19,12.29,28.67,12.29,36.86,0L360.45,49.15C368.64,41,368.64,28.67,364.54,16.39Z"></path>
                        </svg>
                    </em>
                </p>
            </div>
        </div>
        <div class="zm-edit-goodsList-colsBox">
            <span>列数：</span>
            <div>
                <input type="text" v-model="colsInputVal" @change="colsInputChange" @keyup.enter="colsEnter">
                <p>
                    <i @click="colsBoxUp">
                        <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 367.23 246.78">
                            <path d="M364.54,16.39C360.45,8.19,352.25,0,340,0H24.58C12.29,0,0,12.29,0,28.67,0,41,6.32,47.34,11.61,53.71L163.84,237.57c8.19,12.29,28.67,12.29,36.86,0L360.45,49.15C368.64,41,368.64,28.67,364.54,16.39Z"></path>
                        </svg>
                    </i>
                    <em @click="colsBoxDown">
                        <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 367.23 246.78">
                            <path d="M364.54,16.39C360.45,8.19,352.25,0,340,0H24.58C12.29,0,0,12.29,0,28.67,0,41,6.32,47.34,11.61,53.71L163.84,237.57c8.19,12.29,28.67,12.29,36.86,0L360.45,49.15C368.64,41,368.64,28.67,364.54,16.39Z"></path>
                        </svg>
                    </em>
                </p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.zm-edit-goodsList-colsRows {
  padding: 14px 0;
}
.zm-edit-goodsList-colsRows > div {
  float: left;
  width: 50%;
}
.zm-edit-goodsList-colsRows > div > span {
  float: left;
  line-height: 26px;
  width: 43px;
}
.zm-edit-goodsList-colsRows > div > div {
  float: left;
}
.zm-edit-goodsList-colsRows > div > div input {
  width: 36px;
  height: 26px;
  text-align: center;
  line-height: 24px;
  border: 1px solid #d7d7d7;
  outline: none;
  cursor: pointer;
  float: left;
}
.zm-edit-goodsList-colsRows > div input:hover {
  background-color: #d6e7f7;
  border: 1px solid #3089d5;
}
.zm-edit-goodsList-colsRows > div > div p {
  float: left;
}
.zm-edit-goodsList-colsRows > div > div p i {
  transform: rotate(180deg);
}
.zm-edit-goodsList-colsRows > div > div p i,
.zm-edit-goodsList-colsRows > div > div p em {
  cursor: pointer;
  display: block;
  width: 20px;
  height: 13px;
  line-height: 4px;
  border: 1px solid #d7d7d7;
  padding: 2px 4px;
  background: -webkit-linear-gradient(#f2f2f2, #fff);
  background: -o-linear-gradient(#f2f2f2, #fff);
  background: -moz-linear-gradient(#f2f2f2, #fff);
  background: linear-gradient(#f2f2f2, #fff);
}
.zm-edit-goodsList-colsRows > div > div p i svg,
.zm-edit-goodsList-colsRows > div > div p em svg {
  fill: #d7d7d7;
}
.zm-edit-goodsList-colsRows > div i:hover,
.zm-edit-goodsList-colsRows > div em:hover {
  border: 1px solid #3089d5;
}
.zm-edit-goodsList-colsRows > div i:hover svg,
.zm-edit-goodsList-colsRows > div em:hover svg {
  fill: #3089d5;
}
</style>
<script>
export default {
  name: "ranksNum",
  props: ["prop"],
  data() {
    return {
      rowsInputVal: 2,
      colsInputVal: 2,
      maxVal: 10,
      minVal: 1
    };
  },
  computed: {
    curSelectedCom() {
      return this.$store.state.component.selectList[0]; //当前选中的组件
    }
  },
  created() {
    let attr = this.prop.attr;
    this.maxVal = this.prop.maxVal;
    this.minVal = this.prop.minVal;
    this.rowsInputVal = this.curSelectedCom.settingData[attr].rowsVal;
    this.colsInputVal = this.curSelectedCom.settingData[attr].colsVal;
  },
  methods: {
    rowsBoxUp() {
      this.rowsInputVal++;
      if (this.rowsInputVal > this.maxVal) {
        this.rowsInputVal = this.maxVal;
      }
      if (this.prop.callback) {
        this.prop.callback(this.rowsInputVal, this.colsInputVal);
      }
    },
    settingInput() {
      let attr = this.prop.attr;
      this.curSelectedCom.settingData[attr].rowsVal = this.rowsInputVal;
      this.curSelectedCom.settingData[attr].colsVal = this.colsInputVal;
    },
    rowsBoxDown() {
      this.rowsInputVal--;
      if (this.rowsInputVal < this.minVal) {
        this.rowsInputVal = this.minVal;
        this.settingInput();
      }
      if (this.prop.callback) {
        this.prop.callback(this.rowsInputVal, this.colsInputVal);
      }
    },
    rowsInputChange() {
      event.stopPropagation();
      this.rowsInputVal = event.currentTarget.value;
      if (event.currentTarget.value > this.maxVal) {
        this.rowsInputVal = this.maxVal;
        this.settingInput();
      }
      if (event.currentTarget.value < this.minVal) {
        this.rowsInputVal = this.minVal;
        this.settingInput();
      }
      if (this.prop.callback) {
        this.prop.callback(this.rowsInputVal, this.colsInputVal);
      }
    },
    rowsEnter() {
      this.rowsInputVal = event.currentTarget.value;
      this.settingInput();
      event.currentTarget.blur();
      if (this.prop.callback) {
        this.prop.callback(this.rowsInputVal, this.colsInputVal);
      }
    },
    colsBoxUp() {
      this.colsInputVal++;
      if (this.colsInputVal > this.maxVal) {
        this.colsInputVal = this.maxVal;
        this.settingInput();
      }
      if (this.prop.callback) {
        this.prop.callback(this.rowsInputVal, this.colsInputVal);
      }
    },
    colsBoxDown() {
      this.colsInputVal--;
      if (this.colsInputVal < this.minVal) {
        this.colsInputVal = this.minVal;
        this.settingInput();
      }
      if (this.prop.callback) {
        this.prop.callback(this.rowsInputVal, this.colsInputVal);
      }
    },
    colsInputChange() {
      event.stopPropagation();
      this.colsInputVal = event.currentTarget.value;
      if (event.currentTarget.value > this.maxVal) {
        this.colsInputVal = this.maxVal;
        this.settingInput();
      }
      if (event.currentTarget.value < this.minVal) {
        this.colsInputVal = this.minVal;
        this.settingInput();
      }
      if (this.prop.callback) {
        this.prop.callback(this.rowsInputVal, this.colsInputVal);
      }
    },
    colsEnter() {
      this.colsInputVal = event.currentTarget.value;
      this.settingInput();
      event.currentTarget.blur();
      if (this.prop.callback) {
        this.prop.callback(this.rowsInputVal, this.colsInputVal);
      }
    }
  }
};
</script>
