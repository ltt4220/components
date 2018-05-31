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
            let oDiv = _this.$el.querySelectorAll(".medialBoxOne");
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
                let oDiv = _this.$el.querySelectorAll(".medialBoxOne");
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
        blogNum(val) {
            this.getSettingData("blogNum", val);
            this.blogCheck();
            this.setListData();
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
        pictureWidth(row, col) {
            var val = [row, col];
            this.getSettingData("pictureWidth", val);
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
        settingHeight() {
            let _this = this;
            setTimeout(() => {
                _this.settingData["pictureHeight"].value =
                    _this.$el.getElementsByClassName(
                        "zm-component-blog-upcont"
                    )[0].clientHeight + "px";
            }, 0);
        },
        getSettingData(property, convert, subvalue) {
            //1.Change对象 2.转换格式值  3.对1的子对象change（子对象value值为obj======必须传第3个参数)
            let detailHeight = this.$el.getElementsByClassName(
                "zm-component-blog-upcont"
            )[0].clientHeight;
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
                        this.settingHeight();
                        this.setListData();
                        break;
                    case "pictureWidth":
                        this.settingData[property].value =
                            parseInt(detailHeight * convert[0] / convert[1]) +
                            "px";
                        this.settingData["pictureScale"].value =
                            convert[0] + ":" + convert[1];
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
