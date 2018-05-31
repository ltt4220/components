export default {
    methods: {
        pagechangeA: function(p) {
            // 页码改变event ， p 为新的 current
            this.current = parseInt(p);
            let _this = this;
            setTimeout(() => {
                _this.setLHeigth(this.settingData.blogNum.value)
            }, 200);
          },
        setLHeigth(val) {
            var _this = this;
            console.log( this,'111111111111111111')
            console.log( this.$el,'22222222222222222')
            console.log( this,_this.$el.getElementsByClassName(
                "zm-component-blog-word"
              ))
            let farth = _this.$el.getElementsByClassName(
                "zm-component-blog-word"
              );
              for (let i = 0; i < farth.length; i++) {
                var lineNum = _this.settingData.lineHeightNum.value,
                  rowsNum = 0,
                  allHeight = 0,
                  lineHeight = parseInt(_this.settingData.ContLineHeight.value);
                for (let j = 0; j < farth[i].children.length; j++) {
                  if (rowsNum < lineNum) {
                    let re = /<img|<video/gi;
                    if (re.test(farth[i].children[j].innerHTML)) {
                      rowsNum++;
                      allHeight += farth[i].children[j].clientHeight;
                    } else {
                      rowsNum += farth[i].children[j].clientHeight / lineHeight;
                      allHeight += farth[i].children[j].clientHeight;
                      if (rowsNum > lineNum) {
                        allHeight -= (rowsNum - lineNum) * lineHeight;
                      }
                    }
                  }
                }
                // _this.settingData.lineHeightNum.num = allHeight + "px";
                farth[i].style.height =allHeight + "px";
                setTimeout(() => {
                  _this.style.height = _this.$el.firstChild.clientHeight;
                }, 100);
              }
        },
        setListData() {
            let _this = this;
            setTimeout(() => {
                _this.style.height = _this.$el.firstChild.clientHeight;
            }, 0);
        },
        rearchData() {
            let _width = parseFloat(this.style.width).toFixed(9);
            let imgWidth =
                _width -
                parseFloat(this.settingData["paddingLeftRight"].value) * 2;
            this.settingData["playWidth"].value =
                parseFloat(imgWidth / 6) + "px";
        },
        BoxMarginBottom(val) {
            this.getSettingData("BoxMarginBottom", val + "px");
        },
        controlRowAlign(val) {
            this.getSettingData("controlRowAlign", val);
        },
        TitfontFamily(val) {
            this.getSettingData("Familyfont", val, "fontFamily");
        },
        TitfontSize(val) {
            this.getSettingData("Familyfont", val, "fontSize");
        },
        Titcolor(val) {
            this.getSettingData("Familyfont", val, "color");
        },
        TitfontWeight(val) {
            this.getSettingData("Familyfont", val, "fontWeight");
        },
        TitfontStyle(val) {
            this.getSettingData("Familyfont", val, "fontStyle");
        },
        TimefontFamily(val) {
            this.getSettingData("blogTimeFont", val, "fontFamily");
        },
        TimefontSize(val) {
            this.getSettingData("blogTimeFont", val, "fontSize");
        },
        Timecolor(val) {
            this.getSettingData("blogTimeFont", val, "color");
        },
        TimefontWeight(val) {
            this.getSettingData("blogTimeFont", val, "fontWeight");
        },
        TimefontStyle(val) {
            this.getSettingData("blogTimeFont", val, "fontStyle");
        },
        blogTimeAlign(val) {
            this.getSettingData("blogTimeAlign", val);
        },
        lineHeightNum(val) {
            this.getSettingData("lineHeightNum", val);
        },
        ContfontFamily(val) {
            this.getSettingData("blogContFont", val, "fontFamily");
        },
        ContfontSize(val) {
            this.getSettingData("blogContFont", val + "px", "fontSize");
        },
        Contcolor(val) {
            this.getSettingData("blogContFont", val, "color");
        },
        ContfontWeight(val) {
            this.getSettingData("blogContFont", val, "fontWeight");
        },
        ContfontStyle(val) {
            this.getSettingData("blogContFont", val, "fontStyle");
        },
        ContTextIndent(val) {
            this.getSettingData("ContTextIndent", val + "px");
        },
        ContcontrolRowAlign(val) {
            this.getSettingData("ContcontrolRowAlign", val);
        },
        DiscontrolRowAlign(val) {
            this.getSettingData("DiscontrolRowAlign", val);
        },
        pictureShadow(val) {
            this.getSettingData("pictureShadow", val);
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
        getSettingData(property, convert, subvalue) {
            //1.Change对象 2.转换格式值  3.对1的子对象change（子对象value值为obj======必须传第3个参数);
            let _this = this;
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
                        this.settingData[property].val = convert;
                        // this.settingData[property].num = convert * lineH + "px";
                        setTimeout(_this.setLHeigth, 100);
                        break;
                    case "pictureShadow":
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
                        this.settingData["pictureShadow"].num =
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
                        this.settingData["pictureShadow"].num =
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
                        this.settingData["pictureShadow"].num =
                            this.settingData["hShadow"].value +
                            " " +
                            this.settingData["vShadow"].value +
                            " " +
                            convert +
                            " " +
                            this.settingData["colorShadow"].value;
                        break;
                    case "colorShadow":
                        this.settingData[property].value = convert;
                        this.settingData["pictureShadow"].num =
                            this.settingData["hShadow"].value +
                            " " +
                            this.settingData["vShadow"].value +
                            " " +
                            this.settingData["blurShadow"].value +
                            " " +
                            convert;
                        break;
                    default:
                        this.settingData[property].value = convert;
                        break;
                }
            } else {
                this.settingData[property].value[subvalue] = convert;
            }
        }
    }
};
