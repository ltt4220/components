<template>
    <div class="zm-dialog-pageBox zm-dialog-News" :style="{height:isheight}">
        <newsProduct :prop="setName" v-if="setList"></newsProduct>
        <noNewsProduct :prop="setName" v-else></noNewsProduct>
        <productCheck v-if="setList"></productCheck>
        <productAdd v-else :prop="setName"></productAdd>
    </div>
</template>
<script>
import newsProduct from "./newsProduct";
import noNewsProduct from "./noNewsProduct";
import productCheck from "./setProductCheck";
import productAdd from "./setAddProduct";
export default {
  name: "product-news-panel",
  components: {
    newsProduct,
    noNewsProduct,
    productCheck,
    productAdd
  },
  data() {
    return {
      isheight: "628px",
      addName: "",
      isShowProduct: true
    };
  },
  computed: {
    setName() {
      zmEditor.$store.state.product.productUrl.indexOf("service") > -1
        ? (this.addName = "服务")
        : (this.addName = "产品");
      return this.addName;
    },
    setList(){
        let data = zmEditor.$store.state.product.productTypeData;
         if (JSON.stringify(data) === "[]") {
             this.isShowProduct = false;
        } else {
          zmEditor.$store.state.component.selectList[0].lists = data;
          zmEditor.$store.state.component.selectList[0].lists = Object.assign(
            [],
            zmEditor.$store.state.component.selectList[0].lists
          );
          this.isShowProduct = true;
        }
        return this.isShowProduct;
    }
  }
};
</script>

