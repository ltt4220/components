<template>
  <div :id="id" :uid="uid" class="zm-component-main" :style="{position: 'absolute', width: style.width+'px',height: style.height+'px',left: style.left+'px',top: style.top+'px',zIndex: style.zIndex}" @mousedown.stop.left="other($event),mousedown($event)" @contextmenu.stop.prevent="ther($event),openMenu($event)">
    <div class="zm-component-blog-content topPic" data-type="words" :data-num="settingData.blogNum.value">
      <span v-for="(item,i) in setList" :key="i">
        <div class="zm-component-blog-box" :data-sortid="item.fId" :data-show="true" :data-time="item.fCreateTime" :data-title="item.fTitle" :style="{backgroundColor:settingData.BoxBackgroundColor.value,paddingLeft:settingData.paddingLeftRight.value,paddingRight:settingData.paddingLeftRight.value,width:settingData.boxWidth.value}">
          <div class="zm-component-blog-mediaBox medialBoxOne" :style="{padding:settingData.pictureLRPadding.value,height:settingData.pictureHeight.value}">
            <div class="zm-component-blog-bgImg" :style="{borderColor:settingData.boxBorderColor.value,borderWidth:settingData.boxBorderWidth.value,display:item.imgDis,backgroundImage:'url('+item.bgUrl+')'}">
            </div>
            <div class="zm-component-blog-bgVideo" :style="{display:item.videoDis,borderColor:settingData.boxBorderColor.value,borderWidth:settingData.boxBorderWidth.value}">
              <span class="zm-component-videoControls">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                  <g>
                    <g class="st0">
                      <path class="st1" d="M50,99.5C22.7,99.5,0.5,77.3,0.5,50S22.7,0.5,50,0.5S99.5,22.7,99.5,50S77.3,99.5,50,99.5z" />
                      <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                    </g>
                    <g>
                      <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                    </g>
                  </g>
                  <g class="st2">
                    <path class="st1" d="M71.2,52c1.9-1.1,1.9-2.9,0-3.9l-31-17.6c-1.9-1.1-3.5-0.2-3.5,2v35c0,2.2,1.6,3.1,3.5,2L71.2,52z" />
                  </g>
                </svg>
              </span>
              <video :poster="item.bgUrl" :src="item.source"></video>
            </div>
          </div>
          <div class="zm-component-blog-detail">
            <div class="zm-component-blog-upcont">
              <div class="zm-component-blog-title" :style="{marginTop:settingData.TitmarginTop.value,marginBottom:settingData.TitmarginBottom.value,textAlign:settingData.controlRowAlign.value,fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize}">
                <a class="zm-component-blog-title-a" target="_blank" :href="item.Detail" :style="{fontFamily:settingData.Familyfont.value.fontFamily,fontStyle:settingData.Familyfont.value.fontStyle,fontWeight:settingData.Familyfont.value.fontWeight,fontSize:settingData.Familyfont.value.fontSize}">
                  {{item.fTitle}}
                </a>
              </div>
              <div class="zm-component-blog-date" :style="{fontFamily:settingData.blogTimeFont.value.fontFamily,fontSize:settingData.blogTimeFont.value.fontSize,color:settingData.blogTimeFont.value.color,fontWeight:settingData.blogTimeFont.value.fontWeight,fontStyle:settingData.blogTimeFont.value.fontStyle,textAlign:settingData.blogTimeAlign.value,marginTop:settingData.blogTimeTop.value,marginBottom:settingData.blogTimeBottom.value,display:settingData.blogShow.num}">{{item.fCreateTime}}
              </div>
              <div class="zm-component-blog-mediaBox mediaBoxTwo" :style="{display:settingData.pictureShow.value,height:settingData.pictureHeight.value}">
                <a class="zm-component-blog-bgImg" :data-show="item.ahref" :style="{borderColor:settingData.boxBorderColor.value,borderWidth:settingData.boxBorderWidth.value,display:item.imgDis,backgroundImage:'url('+item.bgUrl+')'}">
                </a>
                <a class="zm-component-blog-bgVideo" :style="{display:item.videoDis,borderColor:settingData.boxBorderColor.value,borderWidth:settingData.boxBorderWidth.value}">
                  <span class="zm-component-videoControls" :style="{width:settingData.playWidth.value,height:settingData.playWidth.value}">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                      <g>
                        <g class="st0">
                          <path class="st1" d="M50,99.5C22.7,99.5,0.5,77.3,0.5,50S22.7,0.5,50,0.5S99.5,22.7,99.5,50S77.3,99.5,50,99.5z" />
                          <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                        </g>
                        <g>
                          <path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z" />
                        </g>
                      </g>
                      <g class="st2">
                        <path class="st1" d="M71.2,52c1.9-1.1,1.9-2.9,0-3.9l-31-17.6c-1.9-1.1-3.5-0.2-3.5,2v35c0,2.2,1.6,3.1,3.5,2L71.2,52z" />
                      </g>

                    </svg>
                  </span>
                  <video :poster="item.bgUrl" :src="item.source" loop></video>
                </a>
              </div>
              <div class="zm-component-blog-word" v-html="item.fContentText" :style="{height:settingData.lineHeightNum.num,fontFamily:settingData.blogContFont.value.fontFamily,fontSize:settingData.blogContFont.value.fontSize,color:settingData.blogContFont.value.color,fontWeight:settingData.blogContFont.value.fontWeight,fontStyle:settingData.blogContFont.value.fontStyle,marginTop:settingData.ContmarginTop.value,lineHeight:settingData.ContLineHeight.value,marginBottom:settingData.ContmarginBottom.value,textAlign:settingData.ContcontrolRowAlign.value,lineClamp:settingData.lineHeightNum.value,boxOrient: 'vertical'}">
              </div>
              <div class="zm-component-blog-viewMore" :style="{display:settingData.blogDetailsShow.num,textAlign:settingData.DiscontrolRowAlign.value,marginTop:settingData.DismarginTop.value,marginBottom:settingData.DismarginBottom.value}">
                <a class="zm-component-details" target="_blank" :href="item.Detail" :style="{width:settingData.detailsWidth.value,height:settingData.detailsHeight.value,lineHeight:settingData.detailsHeight.value,backgroundColor:settingData.detailsBackColor.value,fontFamily:settingData.detailsFont.value.fontFamily,fontSize:settingData.detailsFont.value.fontSize,color:settingData.detailsFont.value.color,fontWeight:settingData.detailsFont.value.fontWeight,fontStyle:settingData.detailsFont.value.fontStyle}">
                  {{settingData.blogDetails.value}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
    <span v-html="changemsg"></span>
  </div>
</template>

<style scoped>
@import "../../../style/component-blog/components.Blog.PC.Edit.css";
</style>

<script>
import callBack from "./topBlog/callBackFunction.js";
import computed from "./topBlog/computed.js";
import publice from "./dialog/public.js";
export default {
  name: "com-picture-top-blog",
  mixins: [callBack, computed], //callBack----设置项回调;computd----设置项;
  data() {
    return {
      type: "blog",
      style: {
        width: 940,
        height: 966,
        left: 0,
        top: 0,
        zIndex: 0,
        rotate: 0
      },
      pattern: [0, 1, 0, 1, 0, 1, 0, 1],
      isShowRotateBtn: false,
      buttonList: [
        {
          type: "set",
          title: "设置",
          icon: "icon-shezhi1",
          paneTitle: "博客设置"
        },
        {
          type: "manage",
          title: "博客管理",
          icon: "icon-blogger",
          callback: () => {
            zmEditor.$store.commit("changePaneData", {
              key: "paneType",
              value: true
            }); //打开弹窗;
            zmEditor.$store.commit("changePaneData", {
              key: "paneTitle",
              value: "博客管理"
            }); //弹窗标题;
            zmEditor.$store.commit("changePaneData", {
              key: "paneIcon",
              value: "icon-blogger"
            }); //弹窗图标;
            zmEditor.$store.commit("changePaneData", {
              key: "paneMode",
              value: "/com/blog/dialog/setBlog.vue"
            }); //弹窗内容应加载的组件路径;
          }
        },
        { type: "style", title: "样式切换", icon: "icon-style" },
        { type: "del", title: "删除", icon: "icon-delete" }
      ],
      settingData: {
        blogNum: {
          value: 4,
          id: "blog1-1",
          valName: "blogNum"
        },
        ranksNum: {
          rowsVal: 2,
          colsVal: 2
        },
        pictureShow: {
          value: "block"
        },
        BoxMarginBottom: {
          value: "10px",
          id: "blog1-2",
          valName: "BoxMarginBottom"
        },
        BoxMarginLeft: {
          value: "10px",
          id: "blog1-3",
          valName: "BoxMarginLeft"
        },
        BoxBackgroundColor: {
          value: "rgba(242,242,242,1)",
          id: "blog1-4",
          valName: "BoxBackgroundColor"
        },
        paddingLeftRight: {
          value: "20px",
          id: "blog1-5",
          valName: "paddingLeftRight"
        },
        pictureScale: {
          row: 16,
          col: 9
        },
        boxBorderWidth: {
          value: "0px",
          id: "blog1-6-3",
          valName: "boxBorderWidth"
        },
         boxBorderColor: {
          value: "rgba(0,0,0,1)",
          id: "blog1-6-2",
          valName: "boxBorderColor"
        },
        pictureLRPadding: {
          value: "0px",
          id: "blog1-6-4",
          valName: "pictureLRPadding"
        },
        pictureWidth: {
          value: "339px",
          id: "blog1-6-5",
          valName: "pictureWidth"
        },
        pictureHeight: {
          value: "239.0625px",
          id: "blog1-6-6",
          valName: "pictureHeight"
        },
        boxWidth: {
          value: "465px",
          id: "blog1-7",
          valName: "boxWidth"
        },
        playWidth: {
          value: "100px",
          id: "blog1-8",
          valName: "playWidth"
        },
        controlRowAlign: {
          value: "left",
          id: "blog2-1",
          valName: "controlRowAlign"
        },
        Familyfont: {
          value: {
            fontFamily: "微软雅黑",
            fontSize: "18px",
            color: "rgba(0,0,0,1)",
            fontWeight: "600",
            fontStyle: "normal"
          },
          opacity: "1",
          id: "blog2-2",
          valName: "Familyfont"
        },
        hoverColor: {
          value: "rgba(22,122,11,1)",
          id: "blog2-3",
          valName: "hoverColor"
        },
        TitmarginTop: {
          value: "0px",
          id: "blog2-4",
          valName: "TitmarginTop"
        },
        TitmarginBottom: {
          value: "0px",
          id: "blog2-5",
          valName: "TitmarginBottom"
        },
        blogShow: {
          value: true,
          num: "block",
          id: "blog3-1",
          valName: "blogShow"
        },
        blogTime: {
          value: "2018-1-26",
          id: "blog3-1-1",
          valName: "blogTime"
        },
        blogTimeFont: {
          value: {
            fontFamily: "微软雅黑",
            fontSize: "14px",
            color: "rgba(0,0,0,1)",
            fontWeight: "normal",
            fontStyle: "normal"
          },
          id: "blog3-1-2",
          valName: "blogTimeFont"
        },
        blogTimeAlign: {
          value: "left",
          id: "blog3-1-3",
          valName: "blogTimeAlign"
        },
        blogTimeTop: {
          value: "10px",
          id: "blog3-1-4",
          valName: "blogTimeTop"
        },
        blogTimeBottom: {
          value: "10px",
          id: "blog3-1-5",
          valName: "blogTimeBottom"
        },
        lineHeightNum: {
          value: "5px",
          num: "100px",
          id: "blog4-1",
          valName: "lineHeightNum"
        },
        blogContFont: {
          value: {
            fontFamily: "微软雅黑",
            fontSize: "14px",
            color: "rgba(0,0,0,1)",
            fontWeight: "normal",
            fontStyle: "normal"
          },
          id: "blog4-2",
          valName: "blogContFont"
        },
        ContmarginTop: {
          value: "0px",
          id: "blog4-3",
          valName: "ContmarginTop"
        },
        ContTextIndent: {
          value: "0px",
          id: "blog4-4",
          valName: "ContTextIndent"
        },
        ContLineHeight: {
          value: "20px",
          id: "blog4-5",
          valName: "ContLineHeight"
        },
        ContmarginBottom: {
          value: "0px",
          id: "blog4-6",
          valName: "ContmarginBottom"
        },
        ContcontrolRowAlign: {
          value: "left",
          id: "blog4-7",
          valName: "ContcontrolRowAlign"
        },
        blogDetailsShow: {
          value: true,
          num: "block",
          id: "blog5-1",
          valName: "blogDetailsShow"
        },
        blogDetails: {
          value: "正在阅读",
          id: "blog5-1-1",
          valName: "blogDetails"
        },
        detailsWidth: {
          value: "100px"
        },
        detailsHeight: {
          value: "24px"
        },
        DiscontrolRowAlign: {
          value: "left",
          id: "blog5-1-2",
          valName: "DiscontrolRowAlign"
        },
        detailsFont: {
          value: {
            fontFamily: "微软雅黑",
            fontSize: "14px",
            color: "rgba(255,255,255,1)",
            fontWeight: "normal",
            fontStyle: "normal"
          },
          id: "blog4-2",
          valName: "blogContFont"
        },
        detailsBackColor: {
          value: "#95C8E7"
        },
        DismarginTop: {
          value: "10px",
          id: "blog5-1-5",
          valName: "DismarginTop"
        },
        DismarginBottom: {
          value: "0px",
          id: "blog5-1-6",
          valName: "DismarginBottom"
        }
      },
      items: [], //后台所有数据;
      lists: [], //后台前10条数据及选择数据;
      public: publice
    };
  },
  beforeCreate() {
    var _this = this;
    var url = "http://local.zuma.com/blog/webbuilder-api/shopBlog/queryByPage";
    var data = {};
    this.$axios
      .get(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }
      )
      .then(function(response) {
        let result = response.data.result;
        if (0 == result) {
          this.menulist = response.data.item.menulist;
        } else if (11 == result || 9 == result) {
          this.$router.push("/login");
        } else {
          var data = response.data.data;
          data.forEach(item => {
            const paten = /style\s*=\s*["'][^"']+["']/g;
            const re = /class\s*=\s*["'][^"']+["']/g;
            var date = new Date(item.fCreateTime)
              .toLocaleString()
              .replace(/:d{1,2}$/, " ");
            item.fContentText = item.fContentText
              .replace(paten, "")
              .replace(re, "")
              .replace(/<\/?cite[^>]*>/g, "")
              .replace(/<p\s?><\/p>/g, "")
              .replace(/<p\s?><br\s*\/?><\/p>/g, "");
            item.fCreateTime = date;
            item.isShowBlog = true;
            if (item.fvideo.length > 0) {
              item.bgUrl = item.fvideo[0][1];
              item.source = item.fvideo[0][0];
              item.imgDis = "none";
              item.videoDis = "block";
              item.ahref = "false";
            } else {
              if (item.fImg.length > 0) {
                item.bgUrl = item.fImg[0];
                item.imgDis = "block";
                item.videoDis = "none";
                item.ahref = "false";
              } else {
                item.bgUrl =
                  "http://image.zuma.com/upload/921612987460787975.png";
                item.imgDis = "block";
                item.videoDis = "none";
                item.ahref = "true";
              }
            }
          });
          _this.items = data;
          _this.lists = _this.items.slice(0, 10);
        }
      })
      .catch(function(response) {
        // 这里是处理错误的回调
        console.log(response);
      });
  },
  watch: {
    style: {
      handler(val, oldval) {
        try {
          this.rearchData(
            this.settingData["ranksNum"].rowsVal,
            this.settingData["ranksNum"].colsVal,
            ""
          );
           this.setListData();
        } catch (err) {
          console.log("忽略！");
        }
      },
      deep: true //对象内部的属性监听，也叫深度监听
    }
  },
  mounted() {
    this.blogCheck();
  }
};
</script>
