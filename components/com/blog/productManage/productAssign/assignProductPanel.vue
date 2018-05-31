<template>
    <div class="zm-dialog-pageBox zm-dialog-News" :style="{height:isheight}">
        <setProductSol></setProductSol>
        <noNewsProduct :prop="setName" style="display:none"></noNewsProduct>
        <productAdd></productAdd>
    </div>
</template>
<script>
import noNewsProduct from "./noNewsProduct";
import productAdd from "./setAddProduct";
import setProductSol from "./setProductSol"
export default {
  name: "assign-product-panel",
  components: {
    noNewsProduct,
    productAdd,
    setProductSol
  },
  data() {
    return {
      isheight: "628px",
      addName: ""
    };
  },
  computed: {
    setName() {
      zmEditor.$store.state.product.productUrl.indexOf("service") > -1
        ? (this.addName = "服务")
        : (this.addName = "产品");
      return this.addName;
    },
    setList() {
      let data = zmEditor.$store.state.product.assignData;
       if (JSON.stringify(data) === "[]") {
           this.isShowProduct = true;
      } else {
      this.isShowProduct = false;
      }
      return this.isShowProduct;
    }
  }
};
</script>

