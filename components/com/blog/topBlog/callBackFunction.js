export default {
    methods: {
        checkBlogPicture() {
            let _this = this;
            _this.public.choiceModules({
                multiple: false, //单选;
                modules: "picture",
                callBack: _this.blogpict
            }); //7-1选择博客数据;
        },
        blogpict(data) {
            let _this = this;
            let bgUrl = data[0].fPath;
            let oDiv = _this.$el.querySelectorAll(".mediaBoxTwo");
            for (let i = 0; i < oDiv.length; i++) {
                let aImgA = oDiv[i].querySelector(".zm-component-blog-bgImg");
                if (
                    aImgA.getAttribute("data-show") == "true" &&
                    aImgA.getAttribute("data-imgBox") == "true"
                ) {
                    aImgA.style.backgroundImage = "url(" + bgUrl + ")";
                    aImgA.setAttribute("data-imgBox", "false");
                }
            }
        },
        blogCheck() {
            let _this = this;
            setTimeout(() => {
                let oDiv = _this.$el.querySelectorAll(".mediaBoxTwo");
                for (let i = 0; i < oDiv.length; i++) {
                    let aImgA = oDiv[i].querySelector(
                        ".zm-component-blog-bgImg"
                    );
                    aImgA.setAttribute("data-imgBox", "false");
                    if (aImgA.getAttribute("data-show") == "true") {
                        aImgA.onclick = function() {
                            aImgA.setAttribute("data-imgBox", "true");
                            _this.checkBlogPicture();
                        };
                    }
                }
            }, 200);
        },
        setListData() {
            let _this = this;
            setTimeout(() => {
                _this.style.height = _this.$el.firstChild.clientHeight;
            }, 0);
        },
        ranksNum(rows, cols) {
            this.settingData["ranksNum"].rowsVal = rows;
            this.settingData["ranksNum"].colsVal = cols;
            this.settingData["blogNum"].value = parseInt(rows * cols);
            this.rearchData(rows, cols, "blogNum");
            this.blogCheck();
            this.setListData();
        },
        rearchData(rows, cols, val) {
            let _left = parseInt(this.settingData.BoxMarginLeft.value); //BOX边距
            let _width = (
                (parseFloat(this.style.width) - (cols - 1) * _left) /
                cols
            ).toFixed(9);
            let imgWidth =
                _width -
                parseFloat(this.settingData["paddingLeftRight"].value) * 2;
            let proper = [
                this.settingData.pictureScale.row,
                this.settingData.pictureScale.col
            ];
            this.settingData["boxWidth"].value = _width + "px";
            this.settingData["playWidth"].value =
                parseFloat(imgWidth / 4.25) + "px";
            this.settingData["pictureHeight"].value =
                parseFloat(imgWidth / proper[0] * proper[1]) + "px";
            this.pictureCount(rows, cols, val);
        },
        pictureCount(rows, cols, val) {
            let arr = [];
            let left = this.settingData.BoxMarginLeft.value; //BOX边距;
            let bottom = this.settingData.BoxMarginBottom.value; //BOX行距;
            var boxNum = this.$el.getElementsByClassName("topPic")[0].children;
            for (let i = rows; i <= rows; i++) {
                for (let k = cols; k <= cols; k++) {
                    let sault = rows * cols - k;
                    arr.push(sault);
                    for (let j = 1; j < sault / cols; j++) {
                        let result = sault - cols * j;
                        arr.push(result);
                    }
                }
            }
            if (val == "blogNum") {
                for (let i = 0; i < boxNum.length; i++) {
                    setTimeout(() => {
                        this.$el.getElementsByClassName("topPic")[0].children[
                            i
                        ].children[0].style.marginLeft = left;
                        this.$el.getElementsByClassName("topPic")[0].children[
                                i
                            ].children[0].style.display =
                            "inline-block";
                    }, 0);
                }
                setTimeout(() => {
                    this.$el.getElementsByClassName(
                            "topPic"
                        )[0].children[0].children[0].style.marginLeft =
                        "0px";
                    try {
                        arr.reverse().forEach(index => {
                            this.$el.getElementsByClassName(
                                    "topPic"
                                )[0].children[index].children[0].style.marginLeft =
                                "0px";
                        });
                    } catch (err) {}
                }, 0);
                this.settingBottom();
            } else {
                for (let i = 0; i < boxNum.length; i++) {
                    this.$el.getElementsByClassName("topPic")[0].children[
                        i
                    ].children[0].style.marginLeft = left;
                    this.$el.getElementsByClassName("topPic")[0].children[
                            i
                        ].children[0].style.display =
                        "inline-block";
                }
                try {
                    arr.reverse().forEach(index => {
                        this.$el.getElementsByClassName("topPic")[0].children[
                                index
                            ].children[0].style.marginLeft =
                            "0px";
                    });
                } catch (err) {}
                this.$el.getElementsByClassName(
                        "topPic"
                    )[0].children[0].children[0].style.marginLeft =
                    "0px";
                this.settingBottom();
            }
        },
        settingBottom() {
            setTimeout(() => {
                var bottom = this.settingData["BoxMarginBottom"].value;
                var boxNum = this.$el.getElementsByClassName("topPic")[0]
                    .children;
                for (let i = 0; i < boxNum.length; i++) {
                    boxNum[i].children[0].style.marginBottom = bottom;
                }
                let count = boxNum.length;
                let num = count - this.settingData["ranksNum"].colsVal;
                for (let l = num; l < count; l++) {
                    boxNum[l].children[0].style.marginBottom = "0px";
                }
            }, 0);
        },
        BoxMarginBottom(val) {
            this.settingData["BoxMarginBottom"].value = val + "px";
            this.rearchData(
                this.settingData["ranksNum"].rowsVal,
                this.settingData["ranksNum"].colsVal,
                "BoxMarginBottom"
            );
        },
        BoxMarginLeft(val) {
            this.settingData["BoxMarginLeft"].value = val + "px";
            this.rearchData(
                this.settingData["ranksNum"].rowsVal,
                this.settingData["ranksNum"].colsVal,
                "BoxMarginLeft"
            );
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
        detailsFamily(val) {
            this.getSettingData("detailsFont", val, "fontFamily");
        },
        detailsSize(val) {
            this.getSettingData("detailsFont", val + "px", "fontSize");
        },
        detailscolor(val) {
            this.getSettingData("detailsFont", val, "color");
        },
        detailsWeight(val) {
            this.getSettingData("detailsFont", val, "fontWeight");
        },
        detailsStyle(val) {
            this.getSettingData("detailsFont", val, "fontStyle");
        },
        DiscontrolRowAlign(val) {
            this.getSettingData("DiscontrolRowAlign", val);
        },
        pictureHeight(row, col) {
            var val = [row, col];
            this.getSettingData("pictureHeight", val);
        },
        getSettingData(property, convert, subvalue) {
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
                            parseFloat(this.settingData["boxWidth"].value) -
                            parseFloat(
                                this.settingData["paddingLeftRight"].value
                            ) *
                            2;
                        this.settingData[property].value =
                            parseFloat(boxWidth / convert[0] * convert[1]) +
                            "px";
                        this.settingData["pictureScale"].value =
                            convert[0] + ":" + convert[1];
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
