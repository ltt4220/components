<template>
    <div class="zm-edit-slider zm-edit-item zm-edit-vTimeBox">
        <div class="zm-edit-text">{{fTitle}}</div>
        <div class="zm-edit-components-img-proportion">
            <input v-bind:class="{'zm-edit-select':isSelect}" v-model="changSelect.name" @focus="addFocus" @input="addInput" @blur="addBlur" />
        </div>
    </div>
</template>
<style scoped>
.zm-edit-text {
  float: left;
  width: 65px;
  text-align: left;
  padding-right: 9px;
  height: 55px;
  line-height: 55px;
}
.zm-edit-components-img-proportion {
  display: inline-block;
  width: 180px;
  position: relative;
  height: 55px;
  line-height: 55px;
}
.zm-edit-components-img-proportion input {
  width: 100%;
  height: 30px;
  line-height: 25px;
  outline: none;
  float: left;
  padding-left: 14px;
  margin-top: 14px;
  border: 1px solid transparent;
  color: black;
  border-radius: 3px;
  font-size: 14px;
}
.zm-edit-components-img-proportion input:hover {
  background-color: #d6e7f7;
}
.zm-edit-components-img-proportion .zm-edit-select {
  border: 1px solid #3089d5;
  box-shadow: 0 0 5px #3089d5;
  background-color: white;
}
</style>
<script>
export default {
  name: "setTime",
  props: ["prop"],
  data() {
    return {
      fTitle: "查看详情",
      isSelect: false,
      changSelect: {
        name: "查看详情"
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
    this.changSelect.name = this.curSelectedCom.settingData[attr].value;
  },
  methods: {
    addInput() {
      let attr = this.prop.attr;
      this.changSelect.name = event.currentTarget.value;
      if (this.prop.callback) {
        this.prop.callback(this.changSelect.name); //当前选中组件要改变的设置项属性值;
      }
      this.curSelectedCom.settingData[attr].value = this.changSelect.name;
    },
    addFocus() {
      this.isSelect = true;
    },
    addBlur() {
      this.isSelect = false;
    }
  }
};
</script>


