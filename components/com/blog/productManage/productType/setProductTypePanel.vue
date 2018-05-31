<template>
  <div>
    <productSelect></productSelect>
    <EasyScrollbar>
      <div class="zm-dialog-pageBox" :style="{height:isheight}">
        <ul class="zm-dialog-pageList">
          <productList v-for="(item,i) in setList" :key="i" :prop="item" tarIndex=1></productList>
        </ul>
        <div class="zm-product-err" v-if="setErr">
          <i class="iconfont icon-noProduct"></i>
          <p>实在抱歉！！<br/>当前选择的分类中没有{{setName}}文件！</p>
          <p>请添加{{setName}}！</p>
          <p class="iconfont icon-pointer"></p>
        </div>
      </div>
    </EasyScrollbar>
    <productAdd v-if="setErr" :prop="setName"></productAdd>
    <productCheck v-else></productCheck>
  </div>
</template>
<script>
import productList from "./setProductList";
import productSelect from "./setProductSelect";
import productCheck from "./setProductCheck";
import productAdd from "./setAddProduct";
export default {
  name: "set-product-type-panel",
  props: ["prop"],
  components: {
    productList,
    productSelect,
    productCheck,
    productAdd
  },
  data() {
    return {
      isStop: true,
      isheight: "524px",
      current: [],
      lists: [],
      addName: ""
    };
  },
  created() {
    let url = zmEditor.$store.state.product.productListUrl;
    let _this = this;
    _this.$axios
      .post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }
      )
      .then(function(response) {
        let result = response.data.data;
        _this.lists = result;
        console.log("数据OK!", result);
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    setList() {
      let _this = this;
      if (zmEditor.$store.state.product.productTypeData != null) {
        _this.lists = zmEditor.$store.state.product.productTypeData;
      }
      curData(_this.lists);
      function curData(_data) {
        _data.forEach(item => {
          if (
            (item.list == null && item.list == undefined) ||
            item.list.length == 0
          ) {
            item.isCheck = true;
          } else {
            curData(item.list);
          }
        });
      }
      return _this.lists;
    },
    setErr() {
      //添加产品显示页面状态及显示当前选择的分类中没有产品文件;
      return zmEditor.$store.state.product.isNoProduct;
    },
    setName(){
       zmEditor.$store.state.product.productUrl.indexOf("service") > -1
      ? (this.addName = "服务")
      : (this.addName = "产品");
      return this.addName;
    }
  }
};
</script>

