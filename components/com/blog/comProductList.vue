<template>
  <div class="zm-product-main" :id="id" :uid="uid" :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex}" @mousedown.stop.left="other($event),mousedown($event)" @contextmenu.stop.prevent="ther($event),openMenu($event)">
    <div class="zm-product-content" :data-num="settingData.proNum.value">
      <div class="zm-product-box" v-for="(item,index) in setLists" :key="index" :data-sortid="item.id" :style="{width:settingData.boxWidth.value,boxShadow:settingData.boxShadow.num,backgroundColor:settingData.BoxBackgroundColor.value}">
        <div class="zm-product-imgBox" :style="{paddingLeft:settingData.picturePadding.value,paddingRight:settingData.picturePadding.value,paddingTop:settingData.picturePadding.value,borderColor:settingData.pictureColor.value,borderWidth:settingData.pictureWidth.value,height:settingData.pictureHeight.value}">
          <a class="zm-product-img" :style="{backgroundImage:'url('+item.mainImage+')',backgroundPosition:settingData.pictureSize.num}"></a>
          <span class="zm-product-news" v-if="settingData.isNewTabe.value">
            <i>{{item.fLabel}}</i>
            </sapn>
        </div>
        <a class="zm-product-title" :style="{marginTop:settingData.titleMarginTop.value,marginBottom:settingData.titleMarginBottom.value,textAlign:settingData.titleAlign.value,paddingLeft:settingData.titlePaddingLRight.value,paddingRight:settingData.titlePaddingLRight.value,fontFamily:settingData.titleFont.value.fontFamily,fontStyle:settingData.titleFont.value.fontStyle,fontWeight:settingData.titleFont.value.fontWeight,fontSize:settingData.titleFont.value.fontSize,color:settingData.titleFont.value.color,lineHeight:settingData.titleLineHeight.value,height:settingData.titleLineHeight.num,lineClamp:settingData.titleDBHeight.num,boxOrient:'vertical'}">{{item.name}}</a>
        <div class="zm-product-sku" :style="{display:settingData.skuShow.num,marginTop:settingData.skuMarginTop.value,marginBottom:settingData.skuMarginBottom.value,textAlign:settingData.skuAlign.value,paddingLeft:settingData.skuPaddingLRight.value,paddingRight:settingData.skuPaddingLRight.value,fontFamily:settingData.skuFont.value.fontFamily,fontStyle:settingData.skuFont.value.fontStyle,fontWeight:settingData.skuFont.value.fontWeight,fontSize:settingData.skuFont.value.fontSize,color:settingData.skuFont.value.color}">{{item.productSku}}</div>
        <div class="zm-product-price" :style="{display:settingData.priceShow.num,marginTop:settingData.priceMarginTop.value,marginBottom:settingData.priceMarginBottom.value,textAlign:settingData.priceAlign.value,paddingLeft:settingData.pricePaddingLRight.value,paddingRight:settingData.pricePaddingLRight.value,fontFamily:settingData.priceFont.value.fontFamily,fontStyle:settingData.priceFont.value.fontStyle,fontWeight:settingData.priceFont.value.fontWeight,fontSize:settingData.priceFont.value.fontSize,color:settingData.priceFont.value.color}">{{item.priceStr}}
        </div>
      </div>
      <div :is="pageUrl" v-if="settingData.pageShow.value" :total="total" :current.sync="current" :display="display" @pagechange="pagechangeA($event)" :style="{paddingTop:settingData.pageMarginTop.value,paddingBottom:settingData.pageMarginBottom.value}"></div>
    </div>
    <span v-html="productStyle"></span>
  </div>
</template>
<style scoped>
@import "../../../style/component-blog/productList.css";
</style>
<script>
import callBack from "./productList/callBackFunction.js";
import computed from "./productList/computed.js";
export default {
  name: "com-product-list",
  mixins: [computed, callBack], //callBack----设置项回调;computd----设置项;
  data() {
    return {
      style: {
        width: 918,
        height: 659,
        left: 0,
        top: 0,
        zIndex: 0,
        rotate: 0
      },
      pattern: [0, 1, 0, 1, 0, 1, 0, 1],
      isShowRotateBtn: false,
      buttonList: [
        {
          type: "manage",
          title: "产品管理",
          icon: "icon-gouwuche",
          callback: () => {
            zmEditor.$store.commit("changePaneData", {
              key: "paneType",
              value: true
            }); //打开弹窗;
            zmEditor.$store.commit("changePaneData", {
              key: "paneTitle",
              value: "商品管理"
            }); //弹窗标题;
            zmEditor.$store.commit("changePaneData", {
              key: "paneIcon",
              value: "icon-gouwuche"
            }); //弹窗图标;
            zmEditor.$store.commit("changePaneData", {
              key: "paneMode",
              value: "/com/blog/productManage/productManage.vue"
            }); //弹窗内容应加载的组件路径;
          }
        },
        {
          type: "set",
          title: "设置",
          icon: "icon-shezhi1",
          paneTitle: "产品设置"
        },
        { type: "style", title: "样式切换", icon: "icon-style" },
        { type: "del", title: "删除", icon: "icon-delete" }
      ],
      items: [], //后台所有数据;
      lists: [],
      pageUrl: "",
      total: 81, // 记录总条数
      display: 1, // 每页显示条数
      current: 1, // 当前第n页 ， 也可以 watch current 的变化
      showPage: null, // 跳转到某页
      settingData: {
        initWidth: null,
        initHeight: null,
        fullScreenShow: {
          value: false,
          num: 0
        },
        proNum: {
          value: 8
        },
        ranksNum: {
          rowsVal: 4,
          colsVal: 4
        },
        boxWidth: {
          value: "218px"
        },
        BoxMarginBottom: {
          value: "10px"
        },
        BoxMarginLeft: {
          value: "10px"
        },
        pictureScale: {
          row: 16,
          col: 9
        },
        BoxBackgroundColor: {
          value: "rgba(255,255,255,1)"
        },
        boxBorderWidth: {
          value: "1px"
        },
        boxBorderColor: {
          value: "rgba(215,215,215,1)"
        },
        boxBorderHoverWidth: {
          value: "1px"
        },
        boxBorderHoverColor: {
          value: "rgba(0,255,255,1)"
        },
        pictureSize: {
          value: {
            iconClass: "",
            text: "自适应"
          },
          num: "center center"
        },
        pictureHover: {
          value: {
            iconClass: "",
            text: "放大"
          },
          num: "scale(1.1)",
          filter: 0,
          isShad: "hidden"
        },
        pictureBackHover: {
          value: "rgba(255,102,0,0.3)"
        },
        picturePadding: {
          value: "10px"
        },
        pictureColor: {
          value: "rgba(0,0,0,0)"
        },
        pictureWidth: {
          value: "1px"
        },
        pictureHeight: {
          value: "200px"
        },
        pageShow: {
          value: false
        },
        pageMarginTop: {
          value: "20px"
        },
        pageMarginBottom: {
          value: "20px"
        },
        isNewTabe: {
          value: false
        },
        titleFont: {
          value: {
            fontFamily: "微软雅黑",
            fontSize: "14px",
            color: "rgba(0,0,0,1)",
            fontWeight: "normal",
            fontStyle: "normal"
          }
        },
        titleDBHeight: {
          value: {
            text: "单行文本",
            iconClass: ""
          },
          num: 1
        },
        titleMarginTop: {
          value: "10px"
        },
        titleLineHeight: {
          value: "1.1em",
          num: "1.1em",
          curr:""
        },
        titleMarginBottom: {
          value: "10px"
        },
        titleAlign: {
          value: "left"
        },
        titlePaddingLRight: {
          value: "10px"
        },
        skuShow: {
          value: true,
          num: "block"
        },
        skuFont: {
          value: {
            fontFamily: "微软雅黑",
            fontSize: "14px",
            color: "rgba(0,0,0,1)",
            fontWeight: "normal",
            fontStyle: "normal"
          }
        },
        skuMarginTop: {
          value: "10px"
        },
        skuMarginBottom: {
          value: "10px"
        },
        skuAlign: {
          value: "left"
        },
        skuPaddingLRight: {
          value: "10px"
        },
        priceShow: {
          value: true,
          num: "block"
        },
        priceFont: {
          value: {
            fontFamily: "微软雅黑",
            fontSize: "16px",
            color: "rgba(48,136,212,1)",
            fontWeight: "600",
            fontStyle: "normal"
          }
        },
        priceMarginTop: {
          value: "10px"
        },
        priceMarginBottom: {
          value: "10px"
        },
        priceAlign: {
          value: "left"
        },
        pricePaddingLRight: {
          value: "10px"
        },
        boxShadow: {
          value: true,
          num: "0 0 5px rgba(246,246,246,1)"
        },
        hShadow: {
          value: "0px"
        },
        vShadow: {
          value: "0px"
        },
        blurShadow: {
          value: "5px"
        },
        colorShadow: {
          value: "rgba(0,0,0,0.2)"
        }
      } //后台前10条数据及选择数据;
    };
  },
  beforeCreate() {
    let _this = this;
    let url =
      "http://local.zuma.com/product/webbuilder-api/product/getProductList";
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
        var data = response.data.data;
        _this.items = data;
        _this.lists = _this.items.splice(0, 8);
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  watch: {
    style: {
      handler(val, oldval) {
        try {
          this.rearchData(
            this.settingData["ranksNum"].rowsVal,
            this.settingData["ranksNum"].colsVal
          );
          this.style.width == zmEditor.$store.state.page.nowWinWidth
            ? ""
            : (this.settingData.initWidth = this.style.width);
        } catch (err) {
          console.log("忽略！", err);
        }
      },
      deep: true //对象内部的属性监听，也叫深度监听
    }
  },
  created() {
    let file = "/set/switch/pagination.vue";
    const component = () => import("../../../components" + file);
    this.pageUrl = component;
  },
  mounted() {
    let getHeight = setInterval(() => {
      this.style.height = this.$el.firstChild.clientHeight;
      this.rearchData(
        this.settingData["ranksNum"].rowsVal,
        this.settingData["ranksNum"].colsVal
      );
      if (this.style.height != 0) {
        clearInterval(getHeight);
      }
    }, 20);
  }
};
</script>
