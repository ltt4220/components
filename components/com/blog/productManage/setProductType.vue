<template>
  <div class="zm-dialog-sortord" @mouseleave="addSelHidden">
    <span class="zm-dialog-Icon-title">商品类型</span>
    <div class="zm-dialog-Icon" @click="addSelClass()" v-bind:class="{'zmicon_hover':isHover}">
      <span class="number">{{RandomSN}}</span>
      <i class="iconfont icon-sanjiao-copy icon_triangle"></i>
    </div>
    <ul class="zm-dialog-random" v-show="isShow" @mouseleave="addSelHidden">
      <li @click="assignProduct">指定产品</li>
      <li @click="productCategory">产品类目</li>
      <li @click="issueProduct">最新发布的产品</li>
      <li @click="assignServe">指定服务</li>
      <li @click="serveCategory">服务类目</li>
      <li @click="issueServe">最新发布的服务</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "set-product-select",
  props: ["prop"],
  data() {
    return {
      isShow: false,
      isHover: false,
      RandomSN: this.prop
    };
  },
  methods: {
    addSelClass() {
      let _this = this;
      _this.isShow = !_this.isShow;
      _this.isHover = !_this.isHover;
    },
    addSelHidden() {
      let _this = this;
      _this.isShow = false;
      _this.isHover = false;
    },
    addSelClick() {
      let _this = this;
      let current = event.currentTarget;
      _this.isShow = !_this.isShow;
      _this.isHover = !_this.isHover;
      _this.RandomSN = current.innerText;
      _this.$emit("setName", _this.RandomSN);
    },
    assignProduct() {
      let _this = this;
      _this.addSelClick();
      zmEditor.$store.commit("setLabel", "管理产品");
      zmEditor.$store.commit("setNoProduct", false);
      zmEditor.$store.commit("setUrl", {
        key: "productUrl",
        value:
          "http://local.zuma.com/product/webbuilder-api/product/getProductList"
      });
    },
    productCategory() {
      let _this = this;
      _this.addSelClick();
      zmEditor.$store.commit("setLabel", "管理产品");
      zmEditor.$store.commit("setUrl", {
        key: "productListUrl",
        value:
          "http://local.zuma.com/product/webbuilder-api/productCategory/getProductCategoryList"
      });
      zmEditor.$store.commit("setUrl", {
        key: "productUrl",
        value:
          "http://local.zuma.com/product/webbuilder-api/product/getProductList"
      });
      _this.productAxiosPost();
      zmEditor.$store.commit("setNoProduct", false);
    },
    issueProduct() {
      let _this = this;
      _this.addSelClick();
      zmEditor.$store.commit("setLabel", "管理产品");
      zmEditor.$store.commit("setNoProduct", false);
      zmEditor.$store.commit("setUrl", {
        key: "productUrl",
        value:
          "http://local.zuma.com/product/webbuilder-api/product/getProductList"
      });
      _this.productAxios();
    },
    assignServe() {
      let _this = this;
      _this.addSelClick();
      zmEditor.$store.commit("setLabel", "管理服务");
      zmEditor.$store.commit("setNoProduct", false);
      zmEditor.$store.commit("setUrl", {
        key: "productUrl",
        value:
          "http://local.zuma.com/service/webbuilder-api/serviceNote/getNewServiceList"
      });
    },
    serveCategory() {
      let _this = this;
      _this.addSelClick();
      zmEditor.$store.commit("setLabel", "管理服务");
      zmEditor.$store.commit("setUrl", {
        key: "productListUrl",
        value:
          "http://local.zuma.com/service/webbuilder-api/shopserviceCategory/getServiceCategoryList"
      });
      zmEditor.$store.commit("setUrl", {
        key: "productUrl",
        value:
          "http://local.zuma.com/service/webbuilder-api/serviceNote/getNewServiceList"
      });
      _this.productAxiosPost();
      zmEditor.$store.commit("setNoProduct", false);
    },
    issueServe() {
      let _this = this;
      _this.addSelClick();
      zmEditor.$store.commit("setLabel", "管理服务");
      zmEditor.$store.commit("setNoProduct", false);
      zmEditor.$store.commit("setUrl", {
        key: "productUrl",
        value:
          "http://local.zuma.com/service/webbuilder-api/serviceNote/getNewServiceList"
      });
      _this.productAxios();
    },
    productAxiosPost() {
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
          zmEditor.$store.commit("setProductType", result); //设置类目数据;
          console.log("数据OK!", result);
        })
        .catch(error => {
          console.log(error);
        });
    },
    productAxios() {
      let url = zmEditor.$store.state.product.productUrl;
      let _this = this;
      _this.$axios
        .post(
          url,
          {},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(function(response) {
          let result = response.data.data;
          zmEditor.$store.commit("setProductType", result); //设置最新数据;
          console.log("数据OK!", result);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
