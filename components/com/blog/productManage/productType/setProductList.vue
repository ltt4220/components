<template>
  <li :data-index="tarIndex" :style="styleBottom">
    <div class="zm-product-list" :style="styleObject" :data-id="prop.fId">
      <i class="iconfont icon-check" v-if="prop.isCheck" @click="addTarrger(prop)" :data-show="isShow"></i>
      <i class="iconfont icon--jianhao" v-else @click="addTarrger(prop)"></i>
      <span>{{prop.fName}}</span>
    </div>
    <ul>
      <productList v-if="prop.list.length != 0 && prop.list != null" v-for="(item,i) in prop.list" :key="i" :prop="item" :tarIndex="tarIndex-0+1"></productList>
    </ul>
  </li>
</template>
<script>
import productList from "./setProductList";
export default {
  name: "product-type",
  props: {
    prop: {},
    tarIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tarIndex: this.tarIndex,
      styleObject: {
        paddingLeft: this.tarIndex * 20 + "px"
      },
      styleBottom: {
        borderTop: "1px solid #d7d7d7"
      },
      checkNum: 0,
      isShow: false
    };
  },
  beforeCreate: function() {
    this.$options.components.productList = require("./setProductList.vue").default;
  },
  methods: {
    addTarrger(_prop) {
      let _this = this;
      var num = 0;
      this.isShow = !this.isShow;
      $(event.currentTarget).toggleClass(function() {
        if ($(this).is(".iconfont.icon--jianhao")) {
          $(this)
            .parent()
            .siblings()
            .toggle();
          $(this).removeClass();
          return "iconfont icon-iconfonticon02";
        } else if ($(this).is(".iconfont.icon-check")) {
          if (_this.isShow) {
            _this.checkData(_this, _prop.fId);
            _this.getProductData(_prop.fId, _this);
          } else {
            zmEditor.$store.commit("setNoProduct", false);
          }
          return "duigouBox";
        } else {
          $(this)
            .parent()
            .siblings()
            .toggle();
          $(this).removeClass();
          return "iconfont icon--jianhao";
        }
      });
    },
    getProductData(fid, that) {
      let url = zmEditor.$store.state.product.productUrl;
      let _this = this;
      let num = that.checkNum;
      // _this.$axios
      //   .post(url, "fCateId=" + fid + "&pageIndex=0&pageSize=20", {
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      //     }
      //   })
      _this.$axios({
          method: "post",
          url: url,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          responseType: "json",
          params: {
            fCateId: fid,
            pageIndex: 0,
            pageSize: 20
          }
        })
        .then(function(response) {
          var data = response.data.data;
          if (JSON.stringify(data) === "[]") {
            zmEditor.$store.commit("setNoProduct", true);
          } else {
            zmEditor.$store.commit("setNoProduct", false);
            if (num == 1) {
              zmEditor.$store.state.component.selectList[0].lists = data;
              zmEditor.$store.state.component.selectList[0].lists = Object.assign(
                [],
                zmEditor.$store.state.component.selectList[0].lists
              );
            } else {
              zmEditor.$store.state.component.selectList[0].lists = data.concat(
                zmEditor.$store.state.component.selectList[0].lists
              );
              var Data = zmEditor.$store.state.component.selectList[0].lists,
                arr = _this.grouping(Data, "id"),
                results = [];
              for (var i = 0; i < arr.length; i++) {
                results.push(arr[i][0]);
              }
              zmEditor.$store.state.component.selectList[0].lists = results;
              zmEditor.$store.state.component.selectList[0].lists = Object.assign(
                [],
                zmEditor.$store.state.component.selectList[0].lists
              );
            }
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    checkData(_this, _id) {
      //递归==将当前fid push到他的最外层父级current中
      if (_this.$parent.isStop) {
        _this.$parent.current.push(_id);
        this.checkNum = _this.$parent.current.length;
      } else {
        this.checkData(_this.$parent, _id);
      }
    },
    // isErr(_this) {
    //   if (_this.$parent.isStop) {
    //     _this.$parent.isNoProduct = true;
    //   } else {
    //     this.isErr(_this.$parent);
    //   }
    // },
    // noErr(_this) {
    //   if (_this.$parent.isStop) {
    //     _this.$parent.isNoProduct = false;
    //   } else {
    //     this.noErr(_this.$parent);
    //   }
    // }
    group(d, type) {
      var num = 0,
        typeCount = [],
        map = {};
      d.forEach(function(obj) {
        var value = map[String(obj[type])];
        if (value !== void 0) {
          typeCount[value].push(obj);
        } else {
          map[obj[type]] = num;
          typeCount[num] = [].concat([obj]);
          num++;
        }
      });
      return typeCount;
    },
    grouping(data) {
      let _this = this;
      var arg = [].slice.call(arguments, 1),
        arr = data;
      for (var i = 0, l = arg.length; i < l; i++) {
        var newArr = [];
        if (arr[0].constructor === Array) {
          arr.forEach(function(arrChild) {
            newArr = newArr.concat(_this.group(arrChild, arg[i]));
          });
        } else {
          newArr = _this.group(arr, arg[i]);
        }
        arr = newArr;
      }
      return arr;
    }
  },
  mounted() {
    //   console.log( this.zz,'11111111111111111',this.prop.isJianHao,this)
  }
};
</script>
