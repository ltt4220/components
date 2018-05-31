<template>
  <div class="zm-edit-slider zm-edit-item" @mouseleave="addleave">
    <div class="zm-edit-text">{{fTitle}}</div>
    <div class="zm-edit-components-img-proportion">
      <span v-bind:class="{'zm-edit-select':isSelect}" @click="addClick">{{changSelect.row}}:{{changSelect.col}}
        <i class="iconfont icon-sanjiao-copy"></i>
      </span>
    </div>
    <div class="zm-edit-Vtime" v-show="isShow" @mouseleave="addleave">
      <EasyScrollbar>
        <ul :style="{height:isheight}">
          <li v-for="(ite,index) in dataType" :key="index" @click="addSelectChang(ite)">{{ite.row}}:{{ite.col}}</li>
        </ul>
        </EasyScrollbar>
    </div>
  </div>
</template>
<style scoped>
.zm-edit-item {
  display: table;
  vertical-align: middle;
  position: relative;
}
.zm-edit-text {
  width: 80px;
  text-align: left;
  padding-right: 9px;
  display: inline-block;
  vertical-align: middle;
}
.zm-edit-components-img-proportion {
  display: inline-block;
  width: 166px;
  height: 55px;
  line-height: 55px;
  vertical-align: middle;
}
.zm-edit-components-img-proportion span {
  width: 100%;
  height: 30px;
  line-height: 25px;
  float: left;
  padding-left: 14px;
  margin-top: 14px;
  border: 1px solid #d7d7d7;
  color: black;
  border-radius: 3px;
  font-size: 14px;
}
.zm-edit-components-img-proportion span.icon-shenglvehao {
  font-size: 20px;
}
.zm-edit-components-img-proportion span i {
  color: #d7d7d7;
  font-size: 18px;
  float: right;
  margin-right: 2px;
}
.zm-edit-components-img-proportion .zm-edit-select {
  border: none;
  box-shadow: 0 0 5px #3089d5;
  color: #3089d5;
  font-size: 14px;
}
.zm-edit-components-img-proportion .zm-edit-select i {
  color: #3089d5;
  margin-top: 2px;
}
.zm-edit-Vtime {
  /* display: none; */
  position: absolute;
  top: 50px;
  left: 80px;
  z-index: 1000;
  width: 166px;
  background: #fff;
  color: #363636;
  box-shadow: 0 0 5px #3089d5;
  border-radius: 3px;
}
.zm-edit-Vtime ul {
  height: 120px;
}
.zm-edit-Vtime li {
  height: 30px;
  line-height: 30px;
  padding: 0 16px 0 14px;
  color: #3089d5;
  font-size: 14px;
}
.zm-edit-Vtime li.icon-shenglvehao {
  font-size: 20px;
  padding-left: 10px;
}
.zm-edit-Vtime li:hover {
  background-color: #d6e7f7;
}
</style>
<script>
export default {
  name: "pictrue",
  props: ["prop"],
  data() {
    return {
      fTitle: "图片框宽高比例",
      isSelect: false,
      isShow: false,
      isheight: "120px",
      dataType: [
        {
          row: 16,
          col: 9
        },
        {
          row: 3,
          col: 2
        },
        {
          row: 4,
          col: 3
        },
        {
          row: 1,
          col: 1
        }
      ],
      changSelect: {
        row: 16,
        col: 9
      }
    };
  },
  computed: {
    curSelectedCom() {
      return this.$store.state.component.selectList[0]; //当前选中的组件
    }
  },
  created() {
    let attr = this.prop.attr;
    this.fTitle = this.prop.title;
    if (this.prop.label) {
      this.dataType = this.prop.label;
      this.isheight = parseInt(this.dataType.length) * 30 + "px";
    }
    this.changSelect.row = this.curSelectedCom.settingData[attr].row;
    this.changSelect.col = this.curSelectedCom.settingData[attr].col;
  },
  methods: {
    addClick() {
      this.isSelect = !this.isSelect;
      this.isShow = !this.isShow;
    },
    addSelectChang(ite) {
      let attr = this.prop.attr;
      if (this.prop.callback) {
        this.prop.callback(ite.row, ite.col); //当前选中组件要改变的设置项属性值;
      }
      this.isSelect = false;
      this.isShow = false;
      this.changSelect.row = ite.row;
      this.changSelect.col = ite.col;
      this.curSelectedCom.settingData[attr].row = this.changSelect.row;
      this.curSelectedCom.settingData[attr].col = this.changSelect.col;
    },
     addleave(){
      this.isSelect = false;
      this.isShow = false;
    }
  }
};
</script>


