import {
    DH_CHECK_P_NOT_SAFE_PRIME
} from "constants";

export default {
    methods: {
        pagechangeA(val) {
            // 页码改变event ， p 为新的 current
            this.current = parseInt(val);
            let _this = this;
            setTimeout(() => {
                _this.setLHeigth(this.settingData.proNum.value)
            }, 200);
        },
        pointCallBack(index) { //编辑框8个小点回调;
            if (index == 5) {
                let comHeight = this.$el.firstChild.firstChild.offsetHeight;
                let bot = parseInt(this.settingData.BoxMarginBottom.value);
                let hotPage = null;
                this.settingData.pageShow.value ? (hotPage = (25 + 58 + parseInt(this.settingData.pageMarginTop.value) + parseInt(this.settingData.pageMarginBottom.value))) - bot : hotPage = 0; //25==page内容高度;58==page上下边距;
                if (this.style.height > comHeight + hotPage) {
                    let col = this.settingData.ranksNum.colsVal;
                    this.settingData.ranksNum.rowsVal = Math.floor((this.style.height + bot - hotPage) / (bot + comHeight));
                    this.settingData.proNum.value = this.settingData.ranksNum.rowsVal * col;
                } else {
                    this.style.height = comHeight + hotPage
                }
            }
        },
        // setListData() {
        //     let _this = this;
        //     setTimeout(() => {
        //         _this.style.height = _this.$el.firstChild.clientHeight;
        //     }, 0);
        // },
        setListData() {
            setTimeout(() => {
                this.style.height = this.$el.firstChild.clientHeight;
            }, 200);
        },
        fullScreenShow(val, val2) {
            if (val) {
                this.style.width = zmEditor.$store.state.page.nowWinWidth;
            } else {
                this.style.width = this.settingData.initWidth;
            }
            this.setListData();
        },
        ranksNum(rows, cols) {
            this.settingData["ranksNum"].rowsVal = rows;
            this.settingData["ranksNum"].colsVal = cols;
            this.settingData["proNum"].value = parseInt(rows * cols);
            this.rearchData(rows, cols, "proNum");
            this.setListData();
        },
        rearchData(rows, cols, val) {
            let _left = parseInt(this.settingData.BoxMarginLeft.value); //BOX边距
            let _width = (
                (parseFloat(this.style.width) - (cols - 1) * _left) /
                cols
            ).toFixed(9);
            let proper = [
                this.settingData.pictureScale.row,
                this.settingData.pictureScale.col
            ];
            this.settingData["boxWidth"].value = _width + "px";
            this.settingData["pictureHeight"].value =
                parseFloat(_width / proper[0] * proper[1]) + "px";
        },
        BoxMarginBottom(val) {
            this.settingData["BoxMarginBottom"].value = val + "px";
            this.rearchData(
                this.settingData["ranksNum"].rowsVal,
                this.settingData["ranksNum"].colsVal
            );
            this.setListData();
        },
        BoxMarginLeft(val) {
            this.settingData["BoxMarginLeft"].value = val + "px";
            this.rearchData(
                this.settingData["ranksNum"].rowsVal,
                this.settingData["ranksNum"].colsVal
            );
            this.setListData();
        },
        getScrollbarWidth() { //获取右侧滚动条宽度
            var oP = document.createElement('p'),
                styles = {
                    width: '100px',
                    height: '100px',
                    overflowY: 'scroll',
                },
                i, scrollbarWidth;


            for (i in styles) {
                oP.style[i] = styles[i];
            }
            document.body.appendChild(oP);
            scrollbarWidth = oP.offsetWidth - oP.clientWidth;
            oP.remove();


            return scrollbarWidth;
        },
        pictureHeight(row, col) {
            var val = [row, col];
            this.getSettingData("pictureHeight", val);
            this.setListData();
        },
        pictureSize(val) {
            this.getSettingData("pictureSize", val, "text")
        },
        pictureHover(val, val2, _that) {
            this.getSettingData("pictureHover", val, "text", _that)
        },
        titleFontFamily(val) {
            this.getSettingData("titleFont", val, "fontFamily")
        },
        titleFontSize(val) {

            this.getSettingData("titleFont", val, "fontSize")
        },
        titleColor(val) {
            this.getSettingData("titleFont", val, "color")
        },
        titleFontWeight(val) {
            this.getSettingData("titleFont", val, "fontWeight")
        },
        titleFontStyle(val) {
            this.getSettingData("titleFont", val, "fontStyle")
        },
        titleDBHeight(val) {
            if (val == "单行文本") {
                this.settingData.titleDBHeight.num = 1;
                this.settingData.titleDBHeight.value.text = val;
                this.settingData.titleLineHeight.value = "1.1em";
                this.settingData.titleLineHeight.num = "1.1em";
            } else {
                this.settingData.titleDBHeight.num = 2;
                this.settingData.titleDBHeight.value.text = val;
                if (this.settingData.titleLineHeight.curr == "") {
                    this.settingData.titleLineHeight.value = "1.1em";
                } else {
                    this.settingData.titleLineHeight.value = this.settingData.titleLineHeight.curr;
                }
                this.settingData.titleLineHeight.num = parseFloat(this.settingData.titleLineHeight.value) * 2 + "em";
            }
            this.setListData();
        },
        titleLineHeight(val) {
            this.settingData.titleLineHeight.curr = val;
            if (this.settingData.titleDBHeight.value.text != "单行文本") {
                this.settingData.titleLineHeight.value = val + "em";
                this.settingData.titleLineHeight.num = parseFloat(val) * 2 + "em";
            } else {
                this.settingData.titleLineHeight.value = "1.1em";
                this.settingData.titleLineHeight.num = "1.1em";
            }
        },
        titleAlign(val) {
            this.getSettingData("titleAlign", val)
        },
        skuFontFamily(val) {
            this.getSettingData("skuFont", val, "fontFamily")
        },
        skuFontSize(val) {

            this.getSettingData("skuFont", val, "fontSize")
        },
        skuColor(val) {
            this.getSettingData("skuFont", val, "color")
        },
        skuFontWeight(val) {
            this.getSettingData("skuFont", val, "fontWeight")
        },
        skuFontStyle(val) {
            this.getSettingData("skuFont", val, "fontStyle")
        },
        skuAlign(val) {
            this.getSettingData("skuAlign", val)
        },
        priceFontFamily(val) {
            this.getSettingData("priceFont", val, "fontFamily")
        },
        priceFontSize(val) {
            this.getSettingData("priceFont", val, "fontSize")
        },
        priceColor(val) {
            this.getSettingData("priceFont", val, "color")
        },
        priceFontWeight(val) {
            this.getSettingData("priceFont", val, "fontWeight")
        },
        priceFontStyle(val) {
            this.getSettingData("priceFont", val, "fontStyle")
        },
        priceAlign(val) {
            this.getSettingData("priceAlign", val)
        },
        boxShadow(val) {
            this.getSettingData("boxShadow", val);
        },
        hShadow(val) {
            this.getSettingData("hShadow", val + "px");
        },
        vShadow(val) {
            this.getSettingData("vShadow", val + "px");
        },
        blurShadow(val) {
            this.getSettingData("blurShadow", val + "px");
        },
        colorShadow(val) {
            this.getSettingData("colorShadow", val.color);
        },
        getSettingData(property, convert, subvalue, _that) {
            //1.Change对象 2.转换格式值  3.对1的子对象change（子对象value值为obj======必须传第3个参数)
            let _type = property;
            if (
                typeof this.settingData[property].value === "string" ||
                typeof this.settingData[property].value === "boolean"
            ) {
                switch (_type) {
                    case "lineHeightNum":
                        let lineH = parseInt(
                            this.settingData["ContLineHeight"].value
                        );
                        this.settingData[property].num = convert * lineH + "px";
                        this.settingData[property].value = parseInt(convert);
                        this.setListData();
                        break;
                    case "pictureHeight":
                        let boxWidth =
                            parseFloat(this.settingData["boxWidth"].value)
                        this.settingData[property].value =
                            parseFloat(boxWidth / convert[0] * convert[1]) +
                            "px";
                        this.settingData["pictureScale"].value =
                            convert[0] + ":" + convert[1];
                        break;
                    case "boxShadow":
                        if (convert) {
                            convert =
                                this.settingData["hShadow"].value +
                                " " +
                                this.settingData["vShadow"].value +
                                " " +
                                this.settingData["blurShadow"].value +
                                " " +
                                this.settingData["colorShadow"].value;
                            this.settingData[property].num = convert;
                        } else {
                            convert = "none";
                            this.settingData[property].num = convert;
                        }
                        break;
                    case "hShadow":
                        this.settingData[property].value = convert;
                        this.settingData["boxShadow"].num =
                            convert +
                            " " +
                            this.settingData["vShadow"].value +
                            " " +
                            this.settingData["blurShadow"].value +
                            " " +
                            this.settingData["colorShadow"].value;
                        break;
                    case "vShadow":
                        this.settingData[property].value = convert;
                        this.settingData["boxShadow"].num =
                            this.settingData["hShadow"].value +
                            " " +
                            convert +
                            " " +
                            this.settingData["blurShadow"].value +
                            " " +
                            this.settingData["colorShadow"].value;
                        break;
                    case "blurShadow":
                        this.settingData[property].value = convert;
                        this.settingData["boxShadow"].num =
                            this.settingData["hShadow"].value +
                            " " +
                            this.settingData["vShadow"].value +
                            " " +
                            convert +
                            " " +
                            this.settingData["colorShadow"].value;
                        break;
                    case "colorShadow":
                    default:
                        this.settingData[property].value = convert;
                        break;
                }
            } else {
                switch (_type) {
                    case "pictureSize":
                        let cont = null;
                        convert == "填充" ? cont = "left top" : cont = "center";
                        this.settingData[property].value[subvalue] = convert;
                        this.settingData[property].num = cont;
                        break;
                    case "pictureHover":
                        this.settingData[property].num = "none";
                        switch (convert) {
                            case "放大":
                                this.settingData[property].value[subvalue] = convert;
                                this.settingData[property].num = "scale(1.1)";
                                this.settingData[property].filter = "none";
                                _that.$parent.$children[2].prop.isShowSet = true;
                                break;
                            case "左移":
                                this.settingData[property].value[subvalue] = convert;
                                this.settingData[property].num = "translateX(-5px)";
                                this.settingData[property].filter = "none";
                                _that.$parent.$children[2].prop.isShowSet = true;
                                break;
                            case "上移":
                                this.settingData[property].value[subvalue] = convert;
                                this.settingData[property].num = "translateY(-5px)";
                                this.settingData[property].filter = "none";
                                _that.$parent.$children[2].prop.isShowSet = true;
                                break;
                            case "虚化":
                                this.settingData[property].value[subvalue] = convert;
                                this.settingData[property].filter = "blur(2px)";
                                _that.$parent.$children[2].prop.isShowSet = true;
                                break;
                            case "覆盖颜色":
                                this.settingData[property].value[subvalue] = convert;
                                this.settingData[property].isShad = "visible";
                                _that.$parent.$children[2].prop.isShowSet = false;
                                break;
                            default:
                                this.settingData[property].num = "none";
                                this.settingData[property].value[subvalue] = convert;
                                this.settingData[property].filter = "none";
                                this.settingData[property].isShad = "hidden";
                                _that.$parent.$children[2].prop.isShowSet = true;
                                break;
                        }
                        break;
                    default:
                        this.settingData[property].value[subvalue] = convert;
                        break;
                }
            }
        }
    }
}
