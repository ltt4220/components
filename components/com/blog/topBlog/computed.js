export default {
    computed: {
        changemsg() {
            var _this = this;
            var color = _this.settingData.hoverColor.value;
            var oldColor = _this.settingData.Familyfont.value.color;
            var boxBottom = _this.settingData.BoxMarginBottom.value;
            var contIndent = _this.settingData.ContTextIndent.value;
            var setLeft = this.settingData.BoxMarginLeft.value;
            return `<style> 
              .zm-component-blog-title{color:${oldColor};}
              .zm-component-blog-title:hover{color:${color};}
              .zm-component-blog-title-a{color:${oldColor};}
              .zm-component-blog-title-a:hover{color:${color};}
              .topPic>span .zm-component-blog-box{
                margin-left:${setLeft};
                margin-bottom:${boxBottom};
              } 
              span:last-Child .zm-component-blog-box{
                margin-bottom:0;
              }
              .zm-component-blog-word>p:first-child{
                text-indent:${contIndent};
              }
              .topPic>span:nth-child(odd) .zm-component-blog-box{margin-left:0px;}
              </style>`;
        },
        setData() {
            return {
                type: "tabs",
                props: [
                    {
                        title: "布局",
                        type: "level",
                        props: [
                            {
                                title: "常规布局",
                                type: "sets",
                                props: [
                                    {
                                        type: "/set/switch/ranksNum.vue",
                                        props: {
                                            attr: "ranksNum",
                                            minVal: 1,
                                            maxVal: 4,
                                            callback: this.ranksNum
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "行间距",
                                            attr: "BoxMarginBottom",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 50,
                                            value: this.settingData
                                                .BoxMarginBottom.value,
                                            decimalNum: 0,
                                            callback: this.BoxMarginBottom
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "列间距",
                                            attr: "BoxMarginLeft",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 50,
                                            value: this.settingData
                                                .BoxMarginLeft.value,
                                            decimalNum: 0,
                                            callback: this.BoxMarginLeft
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "背景颜色",
                                            attr: "BoxBackgroundColor",
                                            param: "color",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .BoxBackgroundColor.value,
                                            decimalNum: 0
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "左右留白",
                                            attr: "paddingLeftRight",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .paddingLeftRight.value,
                                            decimalNum: 0
                                        }
                                    }
                                ]
                            },
                            {
                                title: "图片",
                                type: "sets",
                                props: [
                                    {
                                        type: "/set/switch/pictrue.vue",
                                        props: {
                                            title: "图片框比例",
                                            attr: "pictureScale",
                                            value: this.settingData.pictureScale
                                                .row,
                                            callback: this.pictureHeight
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边框颜色",
                                            attr: "boxBorderColor",
                                            param: "color",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .boxBorderColor.value,
                                            decimalNum: 0
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边框线条宽度(px)",
                                            attr: "boxBorderWidth",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 5,
                                            value: this.settingData
                                                .boxBorderWidth.value,
                                            decimalNum: 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: "标题",
                        type: "sets",
                        props: [
                            {
                                type: "/set/setTextLayout.vue",
                                props: {
                                    title: "文字布局",
                                    style: {
                                        textAlign: this.settingData
                                            .controlRowAlign.value,
                                        callBack: this.controlRowAlign
                                    }
                                }
                            },
                            {
                                type: "/set/setFont/setFont.vue",
                                props: {
                                    title: "标题文字设置",
                                    attr: "Familyfont",
                                    style: {
                                        fontFamily: this.settingData.Familyfont
                                            .value.fontFamily,
                                        fontSize: this.settingData.Familyfont
                                            .value.fontSize,
                                        color: this.settingData.Familyfont.value
                                            .color,
                                        fontWeight: this.settingData.Familyfont
                                            .value.fontWeight,
                                        fontStyle: this.settingData.Familyfont
                                            .value.fontStyle,
                                        callBack1: this.TitfontFamily,
                                        callBack2: this.TitfontSize,
                                        callBack3: this.Titcolor,
                                        callBack4: this.TitfontWeight,
                                        callBack5: this.TitfontStyle
                                    }
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "光标悬浮文字颜色",
                                    attr: "hoverColor",
                                    param: "color",
                                    minVal: 0,
                                    maxVal: 100,
                                    value: this.settingData.hoverColor.value,
                                    decimalNum: 0
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "标题上部高度(px)",
                                    attr: "TitmarginTop",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 30,
                                    value: this.settingData.TitmarginTop.value,
                                    decimalNum: 0,
                                    callback: this.setListData
                                }
                            },
                            {
                                type: "/set/sliders.vue",
                                props: {
                                    title: "标题下部高度(px)",
                                    attr: "TitmarginBottom",
                                    param: "size",
                                    minVal: 0,
                                    maxVal: 30,
                                    value: this.settingData.TitmarginBottom
                                        .value,
                                    decimalNum: 0,
                                    callback: this.setListData
                                }
                            }
                        ]
                    },
                    {
                        title: "时间",
                        type: "sets",
                        props: [
                            {
                                type: "/set/switch/setWarp.vue",
                                props: {
                                    onOffBut: [
                                        {
                                            type: "/set/switch/switch.vue",
                                            props: {
                                                title: "显示博客发布时间",
                                                attr: "blogShow",
                                                value: this.settingData.blogShow
                                                    .value,
                                                callback: this.setListData
                                            }
                                        }
                                    ],
                                    sonType: [
                                        {
                                            type: "/set/switch/setTime.vue",
                                            props: {
                                                title: "时间样式",
                                                attr: "blogTime",
                                                value: this.settingData.blogTime
                                                    .value,
                                                callback: this.setListData
                                            }
                                        },
                                        {
                                            type: "/set/setFont/setFont.vue",
                                            props: {
                                                title: "时间文字设置",
                                                attr: "blogTimeFont",
                                                style: {
                                                    fontFamily: this.settingData
                                                        .blogTimeFont.value
                                                        .fontFamily,
                                                    fontSize: this.settingData
                                                        .blogTimeFont.value
                                                        .fontSize,
                                                    color: this.settingData
                                                        .blogTimeFont.value
                                                        .color,
                                                    fontWeight: this.settingData
                                                        .blogTimeFont.value
                                                        .fontWeight,
                                                    fontStyle: this.settingData
                                                        .blogTimeFont.value
                                                        .fontStyle,
                                                    callBack1: this
                                                        .TimefontFamily,
                                                    callBack2: this
                                                        .TimefontSize,
                                                    callBack3: this.Timecolor,
                                                    callBack4: this
                                                        .TimefontWeight,
                                                    callBack5: this
                                                        .TimefontStyle
                                                }
                                            }
                                        },
                                        {
                                            type: "/set/setTextLayout.vue",
                                            props: {
                                                title: "文字布局",
                                                style: {
                                                    textAlign: this.settingData
                                                        .blogTimeAlign.value,
                                                    callBack: this.blogTimeAlign
                                                }
                                            }
                                        },
                                        {
                                            type: "/set/sliders.vue",
                                            props: {
                                                title: "上部高度(px)",
                                                attr: "TitmarginTop",
                                                param: "size",
                                                minVal: 0,
                                                maxVal: 30,
                                                value: this.settingData
                                                    .blogTimeTop.value,
                                                decimalNum: 0,
                                                callback: this.setListData
                                            }
                                        },
                                        {
                                            type: "/set/sliders.vue",
                                            props: {
                                                title: "下部高度(px)",
                                                attr: "TitmarginBottom",
                                                param: "size",
                                                minVal: 0,
                                                maxVal: 30,
                                                value: this.settingData
                                                    .blogTimeBottom.value,
                                                decimalNum: 0,
                                                callback: this.setListData
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        title: "内容",
                        type: "level",
                        props: [
                            {
                                title: "内容设置",
                                type: "sets",
                                props: [
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "内容显示行数",
                                            attr: "lineHeightNum",
                                            param: "number",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .lineHeightNum.value,
                                            decimalNum: 0,
                                            callback: this.lineHeightNum
                                        }
                                    },
                                    {
                                        type: "/set/setFont/setFont.vue",
                                        props: {
                                            title: "内容文字设置",
                                            attr: "blogContFont",
                                            style: {
                                                fontFamily: this.settingData
                                                    .blogContFont.value
                                                    .fontFamily,
                                                fontSize: this.settingData
                                                    .blogContFont.value
                                                    .fontSize,
                                                color: this.settingData
                                                    .blogContFont.value.color,
                                                fontWeight: this.settingData
                                                    .blogContFont.value
                                                    .fontWeight,
                                                fontStyle: this.settingData
                                                    .blogContFont.value
                                                    .fontStyle,
                                                callBack1: this.ContfontFamily,
                                                callBack2: this.ContfontSize,
                                                callBack3: this.Contcolor,
                                                callBack4: this.ContfontWeight,
                                                callBack5: this.ContfontStyle
                                            }
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "首行上部高度(px)",
                                            attr: "ContmarginTop",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 30,
                                            value: this.settingData
                                                .ContmarginTop.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "首行文字缩进",
                                            attr: "ContTextIndent",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 50,
                                            value: this.settingData
                                                .ContTextIndent.value,
                                            decimalNum: 0,
                                            callback: this.ContTextIndent
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "内容行距(px)",
                                            attr: "ContLineHeight",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 30,
                                            value: this.settingData
                                                .ContLineHeight.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "尾行下部高度(px)",
                                            attr: "ContmarginBottom",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 30,
                                            value: this.settingData
                                                .ContmarginBottom.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    },
                                    {
                                        type: "/set/setTextLayout.vue",
                                        props: {
                                            title: "内容文字布局",
                                            style: {
                                                textAlign: this.settingData
                                                    .ContcontrolRowAlign.value,
                                                callBack: this
                                                    .ContcontrolRowAlign
                                            },
                                            height: 1
                                        }
                                    }
                                ]
                            },
                            {
                                title: "查看详情",
                                type: "sets",
                                props: [
                                    {
                                        type: "/set/switch/setWarp.vue",
                                        props: {
                                            onOffBut: [
                                                {
                                                    type:
                                                        "/set/switch/switch.vue",
                                                    props: {
                                                        title: "显示博客详情",
                                                        attr: "blogDetailsShow",
                                                        value: this.settingData
                                                            .blogDetailsShow
                                                            .value,
                                                        callback: this
                                                            .setListData
                                                    }
                                                }
                                            ],
                                            sonType: [
                                                {
                                                    type:
                                                        "/set/switch/detailsInput.vue",
                                                    props: {
                                                        title: "按钮文字",
                                                        attr: "blogDetails",
                                                        value: this.settingData
                                                            .blogDetails.value
                                                    }
                                                },
                                                {
                                                    type:
                                                        "/set/setFont/setFont.vue",
                                                    props: {
                                                        title: "内容文字设置",
                                                        attr: "detailsFont",
                                                        style: {
                                                            fontFamily: this
                                                                .settingData
                                                                .detailsFont
                                                                .value
                                                                .fontFamily,
                                                            fontSize: this
                                                                .settingData
                                                                .detailsFont
                                                                .value.fontSize,
                                                            color: this
                                                                .settingData
                                                                .detailsFont
                                                                .value.color,
                                                            fontWeight: this
                                                                .settingData
                                                                .detailsFont
                                                                .value
                                                                .fontWeight,
                                                            fontStyle: this
                                                                .settingData
                                                                .detailsFont
                                                                .value
                                                                .fontStyle,
                                                            callBack1: this
                                                                .detailsFamily,
                                                            callBack2: this
                                                                .detailsSize,
                                                            callBack3: this
                                                                .detailscolor,
                                                            callBack4: this
                                                                .detailsWeight,
                                                            callBack5: this
                                                                .detailsStyle
                                                        }
                                                    }
                                                },
                                                {
                                                    type: "/set/sliders.vue",
                                                    props: {
                                                        title: "按钮颜色",
                                                        attr:
                                                            "detailsBackColor",
                                                        param: "color",
                                                        minVal: 0,
                                                        maxVal: 100,
                                                        value: this.settingData
                                                            .detailsBackColor
                                                            .value,
                                                        decimalNum: 0
                                                    }
                                                },
                                                {
                                                    type: "/set/sliders.vue",
                                                    props: {
                                                        title: "按钮长度",
                                                        attr: "detailsWidth",
                                                        param: "size",
                                                        minVal: 40,
                                                        maxVal: 200,
                                                        value: this.settingData
                                                            .detailsWidth.value,
                                                        decimalNum: 0
                                                    }
                                                },
                                                {
                                                    type: "/set/sliders.vue",
                                                    props: {
                                                        title: "按钮高度",
                                                        attr: "detailsHeight",
                                                        param: "size",
                                                        minVal: 20,
                                                        maxVal: 40,
                                                        value: this.settingData
                                                            .detailsHeight
                                                            .value,
                                                        decimalNum: 0
                                                    }
                                                },
                                                {
                                                    type:
                                                        "/set/setTextLayout.vue",
                                                    props: {
                                                        title: "按钮位置",
                                                        style: {
                                                            textAlign: this
                                                                .settingData
                                                                .DiscontrolRowAlign
                                                                .value,
                                                            callBack: this
                                                                .DiscontrolRowAlign
                                                        },
                                                        height: 1
                                                    }
                                                },
                                                {
                                                    type: "/set/sliders.vue",
                                                    props: {
                                                        title:
                                                            "按钮上部高度(px)",
                                                        attr: "DismarginTop",
                                                        param: "size",
                                                        minVal: 0,
                                                        maxVal: 30,
                                                        value: this.settingData
                                                            .DismarginTop.value,
                                                        decimalNum: 0,
                                                        callback: this
                                                            .setListData
                                                    }
                                                },
                                                {
                                                    type: "/set/sliders.vue",
                                                    props: {
                                                        title:
                                                            "按钮下部高度(px)",
                                                        attr: "DismarginBottom",
                                                        param: "size",
                                                        minVal: 0,
                                                        maxVal: 30,
                                                        value: this.settingData
                                                            .DismarginBottom
                                                            .value,
                                                        decimalNum: 0,
                                                        callback: this
                                                            .setListData
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        },
        setList() {
            let _this = this;
            let arr = _this.lists.filter(item => {
                return item.isShowBlog;
            });

            if (arr.length > this.settingData.blogNum.value) {
                arr.length = this.settingData.blogNum.value;
            }
            return arr;
        }
    }
};
