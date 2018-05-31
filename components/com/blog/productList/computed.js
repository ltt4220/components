export default {
    computed: {
        setLists() {
            let _this = this;
            let arr = [];
            cutData(_this.lists)

            function cutData(_data) {
                _data.forEach(item => {
                    if (item.childItem != null && item.childItem != undefined && item.childItem != 0) {
                        cutData(item.childItem)
                    } else {
                        try {
                            arr.push(item);
                        } catch (err) {
                            console.log(arr)
                        }
                    }
                })
            }
            this.total = arr.length;
            this.display = parseInt(this.settingData.proNum.value);
            let [page, cur, proNum, lists] = [arr, this.current, this.display, []];
            let start = (cur - 1) * proNum;
            let end = start + proNum;
            let maxCur = Math.ceil(this.total / proNum);
            if (cur == maxCur) {
                end = this.total;
            } else if (cur > maxCur) {
                start = (maxCur - 1) * proNum;
                end = start + proNum;
            }
            page.forEach((item, i) => {
                if (i >= start && i < end) {
                    lists.push(item)
                }
            })
            return lists;

        },
        productStyle() {
            let boxColor = this.settingData.boxBorderColor.value;
            let boxHoverColor = this.settingData.boxBorderHoverColor.value;
            let boxWidth = this.settingData.boxBorderWidth.value;
            let boxHoverWidth = this.settingData.boxBorderHoverWidth.value;
            let imgColor = this.settingData.pictureBackHover.value;
            let imgChange = this.settingData.pictureHover.num;
            let imgFilter = this.settingData.pictureHover.filter;
            let pictureSize = this.settingData.pictureSize.num;
            let isShad = this.settingData.pictureHover.isShad;
            let left = this.settingData.BoxMarginLeft.value; //BOX边距;
            let bottom = this.settingData.BoxMarginBottom.value; //BOX行距;
            let col = parseInt(this.settingData.ranksNum.colsVal);
            let colBot = parseInt(this.settingData.ranksNum.colsVal) + 1;
            return `
            <style>
                .zm-product-box{
                    border-width:${boxWidth};
                    border-color:${boxColor}; 
                }
                .zm-product-box:hover{
                    border-width:${boxHoverWidth};
                    border-color:${boxHoverColor};
                }
                .zm-product-main .zm-product-content .zm-product-box{
                    margin-left:${left};
                }
                .zm-product-main .zm-product-content .zm-product-box:nth-child(${col}n+1){
                    margin-left:0px;
                }
                .zm-product-main .zm-product-content .zm-product-box:nth-child(n+${colBot}){
                    margin-top:${bottom};
                }
                .zm-product-main .zm-product-content .zm-product-box .zm-product-imgBox .zm-product-news:after{
                    content: "";
                    display: inline-block;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 0px;
                    border-top: 44px solid rgb(255,92,1);
                    border-left: 18px solid rgb(255,92,1);
                    border-right: 18px solid rgb(255,92,1);
                    border-bottom: 11px solid transparent;
                    z-index: -1;
                }
                .zm-product-main .zm-product-content .zm-product-box .zm-product-imgBox .zm-product-img{
                    z-index: 0;
                    background-position:${pictureSize};
                    transform:none;
                    transition: all 0.25s;
                }
                .zm-product-main .zm-product-content .zm-product-box .zm-product-imgBox .zm-product-img:hover{
                    transform: ${imgChange};
                    filter:${imgFilter};
                    z-index: 20;
                    transition: all 1s;
                }
                .zm-product-main .zm-product-content .zm-product-box .zm-product-imgBox .zm-product-img:after{
                    content: "";
                    visibility: hidden;
                    width:100%;
                    height:100%;
                    position:absolute;
                    top:0;
                    left:0;
                    border:1px solid transparent;
                    background-color:transparent;
                }
                .zm-product-main .zm-product-content .zm-product-box .zm-product-imgBox .zm-product-img:hover:after{
                    visibility: ${isShad};
                    background-color: ${imgColor};
                    transition: all 1s;
                }
            </style>`
        },
        setData() {
            return {
                type: "tabs",
                props: [{
                        title: "布局",
                        type: "level",
                        props: [{
                                title: "列表布局",
                                type: "sets",
                                props: [{
                                        type: "/set/switch/switch.vue",
                                        props: {
                                            title: "全屏宽度",
                                            attr: "fullScreenShow",
                                            value: this.settingData
                                                .fullScreenShow
                                                .value,
                                            callback: this
                                                .fullScreenShow
                                        }
                                    },
                                    {
                                        type: "/set/switch/ranksNum.vue",
                                        props: {
                                            attr: "ranksNum",
                                            minVal: 1,
                                            maxVal: 12,
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
                                            maxVal: 30,
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
                                            maxVal: 30,
                                            value: this.settingData
                                                .BoxMarginLeft.value,
                                            decimalNum: 0,
                                            callback: this.BoxMarginLeft
                                        }
                                    },
                                    {
                                        type: "/set/switch/pictrue.vue",
                                        props: {
                                            title: "图片宽高比例",
                                            attr: "pictureScale",
                                            value: this.settingData.pictureScale
                                                .row,
                                            callback: this.pictureHeight
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "商品背景颜色",
                                            attr: "BoxBackgroundColor",
                                            param: "color",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .BoxBackgroundColor.value,
                                            decimalNum: 0
                                        }
                                    }
                                ]
                            },
                            {
                                title: "边框设置",
                                type: "sets",
                                props: [{
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边框宽度(px)",
                                            attr: "boxBorderWidth",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 5,
                                            value: this.settingData
                                                .boxBorderWidth.value,
                                            decimalNum: 0,
                                            callback: this.setListData()
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
                                            title: "边框宽度悬浮效果",
                                            attr: "boxBorderHoverWidth",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 5,
                                            value: this.settingData
                                                .boxBorderHoverWidth.value,
                                            decimalNum: 0,
                                            callback: this.setListData()
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边框颜色悬浮效果",
                                            attr: "boxBorderHoverColor",
                                            param: "color",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .boxBorderHoverColor.value,
                                            decimalNum: 0
                                        }
                                    }
                                ]
                            },
                            {
                                title: "图片设置",
                                type: "sets",
                                props: [{
                                        type: "/set/switch/setDetails.vue",
                                        props: {
                                            title: "图片框比例",
                                            attr: "pictureSize",
                                            label: [{
                                                    name: "填充",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "自适应",
                                                    type: "iconfont"
                                                }
                                            ],
                                            callback: this.pictureSize
                                        }
                                    },
                                    {
                                        type: "/set/switch/setDetails.vue",
                                        props: {
                                            title: "图片悬浮效果",
                                            attr: "pictureHover",
                                            label: [{
                                                    name: "无效果",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "放大",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "左移",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "上移",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "虚化",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "覆盖颜色",
                                                    type: "iconfont"
                                                }
                                            ],
                                            callback: this.pictureHover
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "光标悬浮遮罩颜色",
                                            attr: "pictureBackHover",
                                            param: "color",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .pictureBackHover.value,
                                            decimalNum: 0,
                                            isShowSet: true //默认隐藏该设置项;
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边距缩进(px)",
                                            attr: "picturePadding",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .picturePadding.value,
                                            decimalNum: 0
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边框颜色",
                                            attr: "pictureColor",
                                            param: "color",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .pictureColor.value,
                                            decimalNum: 0
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边框宽度(px)",
                                            attr: "pictureWidth",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 5,
                                            value: this.settingData
                                                .pictureWidth.value,
                                            decimalNum: 0
                                        }
                                    }
                                ]
                            },
                            {
                                title: "分页控件",
                                type: "sets",
                                props: [{
                                    type: "/set/switch/setWarp.vue",
                                    props: {
                                        onOffBut: [{
                                            type: "/set/switch/switch.vue",
                                            props: {
                                                title: "显示分页控件",
                                                attr: "pageShow",
                                                value: this.settingData
                                                    .pageShow
                                                    .value,
                                                callback: this
                                                    .setListData
                                            }
                                        }],
                                        sonType: [{
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "上部高度(px)",
                                                    attr: "pageMarginTop",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 100,
                                                    value: this.settingData
                                                        .pageMarginTop.value,
                                                    decimalNum: 0,
                                                    callback: this
                                                        .setListData
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "下部高度(px)",
                                                    attr: "pageMarginBottom",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 100,
                                                    value: this.settingData
                                                        .pageMarginBottom
                                                        .value,
                                                    decimalNum: 0,
                                                    callback: this
                                                        .setListData
                                                }
                                            }
                                        ]
                                    }
                                }]
                            }
                        ]
                    },
                    {
                        title: "文字",
                        type: "level",
                        props: [{
                                title: "商品名称",
                                type: "sets",
                                props: [{
                                        type: "/set/setFont/setFont.vue",
                                        props: {
                                            title: "文字设置",
                                            attr: "titleFont",
                                            style: {
                                                fontFamily: this.settingData
                                                    .titleFont.value
                                                    .fontFamily,
                                                fontSize: this.settingData
                                                    .titleFont.value
                                                    .fontSize,
                                                color: this.settingData
                                                    .titleFont.value.color,
                                                fontWeight: this.settingData
                                                    .titleFont.value
                                                    .fontWeight,
                                                fontStyle: this.settingData
                                                    .titleFont.value
                                                    .fontStyle,
                                                callBack1: this.titleFontFamily,
                                                callBack2: this.titleFontSize,
                                                callBack3: this.titleColor,
                                                callBack4: this.titleFontWeight,
                                                callBack5: this.titleFontStyle
                                            }
                                        }
                                    },
                                    {
                                        type: "/set/switch/setDetails.vue",
                                        props: {
                                            title: "文本行数",
                                            attr: "titleDBHeight",
                                            label: [{
                                                    name: "单行文本",
                                                    type: "iconfont"
                                                },
                                                {
                                                    name: "两行文本",
                                                    type: "iconfont"
                                                }
                                            ],
                                            callback: this.titleDBHeight
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "上部高度(px)",
                                            attr: "titleMarginTop",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .titleMarginTop.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "行高(倍)",
                                            attr: "titleLineHeight",
                                            param: "number",
                                            minVal: 0.1,
                                            maxVal: 2,
                                            value: this.settingData
                                                .titleLineHeight.value,
                                            decimalNum: 1,
                                            callback: this.titleLineHeight
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "下部高度(px)",
                                            attr: "titleMarginBottom",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .titleMarginBottom.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    },
                                    {
                                        type: "/set/setTextLayout.vue",
                                        props: {
                                            title: "文字布局",
                                            style: {
                                                textAlign: this.settingData
                                                    .titleAlign.value,
                                                callBack: this
                                                    .titleAlign
                                            },

                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "边距缩进",
                                            attr: "titlePaddingLRight",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 20,
                                            value: this.settingData
                                                .titlePaddingLRight.value,
                                            decimalNum: 0,
                                            callback: this.setListData
                                        }
                                    }
                                ]
                            },
                            {
                                title: "SKU",
                                type: "sets",
                                props: [{
                                    type: "/set/switch/setWarp.vue",
                                    props: {
                                        onOffBut: [{
                                            type: "/set/switch/switch.vue",
                                            props: {
                                                title: "显示SKU",
                                                attr: "skuShow",
                                                value: this.settingData
                                                    .skuShow
                                                    .value
                                            }
                                        }],
                                        sonType: [{
                                                type: "/set/setFont/setFont.vue",
                                                props: {
                                                    title: "文字设置",
                                                    attr: "skuFont",
                                                    style: {
                                                        fontFamily: this.settingData
                                                            .skuFont.value
                                                            .fontFamily,
                                                        fontSize: this.settingData
                                                            .skuFont.value
                                                            .fontSize,
                                                        color: this.settingData
                                                            .skuFont.value.color,
                                                        fontWeight: this.settingData
                                                            .skuFont.value
                                                            .fontWeight,
                                                        fontStyle: this.settingData
                                                            .skuFont.value
                                                            .fontStyle,
                                                        callBack1: this.skuFontFamily,
                                                        callBack2: this.skuFontSize,
                                                        callBack3: this.skuColor,
                                                        callBack4: this.skuFontWeight,
                                                        callBack5: this.skuFontStyle
                                                    }
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "上部高度(px)",
                                                    attr: "skuMarginTop",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 20,
                                                    value: this.settingData
                                                        .skuMarginTop.value,
                                                    decimalNum: 0
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "下部高度(px)",
                                                    attr: "skuMarginBottom",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 20,
                                                    value: this.settingData
                                                        .skuMarginBottom.value,
                                                    decimalNum: 0
                                                }
                                            },
                                            {
                                                type: "/set/setTextLayout.vue",
                                                props: {
                                                    title: "文字布局",
                                                    style: {
                                                        textAlign: this.settingData
                                                            .skuAlign.value,
                                                        callBack: this
                                                            .skuAlign
                                                    }
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "边距缩进",
                                                    attr: "skuPaddingLRight",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 20,
                                                    value: this.settingData
                                                        .skuPaddingLRight.value,
                                                    decimalNum: 0
                                                }
                                            }
                                        ]
                                    }
                                }]
                            },
                            {
                                title: "零售价格",
                                type: "sets",
                                props: [{
                                    type: "/set/switch/setWarp.vue",
                                    props: {
                                        onOffBut: [{
                                            type: "/set/switch/switch.vue",
                                            props: {
                                                title: "显示零售价格",
                                                attr: "priceShow",
                                                value: this.settingData
                                                    .priceShow
                                                    .value
                                            }
                                        }],
                                        sonType: [{
                                                type: "/set/setFont/setFont.vue",
                                                props: {
                                                    title: "文字设置",
                                                    attr: "priceFont",
                                                    style: {
                                                        fontFamily: this.settingData
                                                            .priceFont.value
                                                            .fontFamily,
                                                        fontSize: this.settingData
                                                            .priceFont.value
                                                            .fontSize,
                                                        color: this.settingData
                                                            .priceFont.value.color,
                                                        fontWeight: this.settingData
                                                            .priceFont.value
                                                            .fontWeight,
                                                        fontStyle: this.settingData
                                                            .priceFont.value
                                                            .fontStyle,
                                                        callBack1: this.priceFontFamily,
                                                        callBack2: this.priceFontSize,
                                                        callBack3: this.priceColor,
                                                        callBack4: this.priceFontWeight,
                                                        callBack5: this.priceFontStyle
                                                    }
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "上部高度(px)",
                                                    attr: "priceMarginTop",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 20,
                                                    value: this.settingData
                                                        .priceMarginTop.value,
                                                    decimalNum: 0
                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "下部高度(px)",
                                                    attr: "priceMarginBottom",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 20,
                                                    value: this.settingData
                                                        .priceMarginBottom.value,
                                                    decimalNum: 0
                                                }
                                            },
                                            {
                                                type: "/set/setTextLayout.vue",
                                                props: {
                                                    title: "文字布局",
                                                    style: {
                                                        textAlign: this.settingData
                                                            .priceAlign.value,
                                                        callBack: this
                                                            .priceAlign
                                                    },

                                                }
                                            },
                                            {
                                                type: "/set/sliders.vue",
                                                props: {
                                                    title: "边距缩进",
                                                    attr: "pricePaddingLRight",
                                                    param: "size",
                                                    minVal: 0,
                                                    maxVal: 20,
                                                    value: this.settingData
                                                        .pricePaddingLRight.value,
                                                    decimalNum: 0,
                                                    callback: this.setListData
                                                }
                                            }
                                        ]
                                    }
                                }]
                            }
                        ]
                    },
                    {
                        title: "阴影",
                        type: "sets",
                        props: [{
                            type: "/set/switch/setWarp.vue",
                            props: {
                                onOffBut: [{
                                    type: "/set/switch/switch.vue",
                                    props: {
                                        title: "阴影",
                                        attr: "boxShadow",
                                        value: this.settingData
                                            .boxShadow
                                            .value,
                                        callback: this
                                            .boxShadow
                                    }
                                }],
                                sonType: [{
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "x轴偏移",
                                            attr: "hShadow",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 50,
                                            value: this.settingData
                                                .hShadow.value,
                                            decimalNum: 0,
                                            callback: this.hShadow
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "Y轴偏移",
                                            attr: "vShadow",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 50,
                                            value: this.settingData
                                                .vShadow.value,
                                            decimalNum: 0,
                                            callback: this.vShadow
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "模糊",
                                            attr: "blurShadow",
                                            param: "size",
                                            minVal: 0,
                                            maxVal: 30,
                                            value: this.settingData
                                                .blurShadow.value,
                                            decimalNum: 0,
                                            callback: this
                                                .blurShadow
                                        }
                                    },
                                    {
                                        type: "/set/sliders.vue",
                                        props: {
                                            title: "阴影颜色",
                                            attr: "colorShadow",
                                            param: "color",
                                            minVal: 0,
                                            maxVal: 100,
                                            value: this.settingData
                                                .colorShadow.value,
                                            decimalNum: 0,
                                            callback: this
                                                .colorShadow
                                        }
                                    }
                                ]
                            }
                        }]
                    }
                ]
            };
        }
    }
}
