<template>
  <div class="zm-dialog-check">
    <a href="http://zuma.com/product/getProductCategory" v-if="prop=='添加产品'"><button class="zm-dialog-check-button">添加{{title}}</button></a>
    <a href="http://zuma.com/zmService/toAddSysServiceCategory" v-else><button class="zm-dialog-check-button">添加{{title}}</button></a>
  </div>
</template>
<script>
export default {
  name: "set-product-check",
  props:["prop"],
  data() {
    return {
      title:this.prop
    };
  }
};
</script>

