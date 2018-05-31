<template>
  <div class="zm-product-content">
    <setProductType :prop="defauletName" @setName="addSetName($event)"></setProductType>
    <setPorductTypePanel :prop="setName" v-if="defauletName=='产品类目' || defauletName=='服务类目'"></setPorductTypePanel>
    <setProductNewsPanel v-else-if="defauletName=='最新发布的服务' || defauletName =='最新发布的产品'"></setProductNewsPanel>
    <setProductAssign v-else-if="defauletName=='指定服务' || defauletName =='指定产品'"></setProductAssign>
  </div>
</template>
<style scoped lang="less" src="./productManage.less">
</style>
<script>
import setProductType from "./setProductType";
import setPorductTypePanel from "./productType/setProductTypePanel";
import setProductNewsPanel from "./productNews/productNewsPanel";
import setProductAssign from "./productAssign/assignProductPanel";
export default {
  name: "product-manage",
  components: {
    setProductType,
    setPorductTypePanel,
    setProductNewsPanel,
    setProductAssign
  },
  data() {
    return {
      isSilder: "",
      isPanel: true, //切换面板;
      defauletName: "产品类目"
    };
  },
  methods: {
    addSetName(name) {
      this.defauletName = name;
    }
  },
  computed: {
    setName() {
      return this.label;
    }
  }
};
</script>

