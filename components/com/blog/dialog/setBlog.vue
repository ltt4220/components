<template>
  <div class="zm-blog-content">
    <blogSelect @sortList="sortListA($event)" :prop="compositeData" ref="blogSelect"></blogSelect>
    <div class="zm-dialog-pageBox">
      <EasyScrollbar>
        <ul class="zm-dialog-pageList">
          <!-- unselectable="on" onselectstart="return false;" style="user-select:none;"  -->
          <li v-for="(ite,i) in setBlogList" :key="i" class="zm-dialog-pageList-one sliderDragLi clearFloat" :data-fid="ite.fId" :data-show="true" :data-time="ite.fCreateTime" :data-title="ite.fInitName" v-bind:class="{'onlay':i===isOnlay,'onlayclick':i===isOnlayClick,'wrong':i===isWrong}" @click.self.prevent="addClick(ite,i)" v-dragging="{ item: ite, list: lists, group: 'ite'}" @mouseenter="addMouseEnter(i)" @mouseleave="addMouseLeave(i)">
            <span class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber">{{i+1}}</span>
            <div class="zm-dialog-Title">
              <input class="zm-dialog-pageList-title" v-model="ite.fTitle" @keyup.enter="addEnter(ite,i)" @focus="inputFocus(ite,i)" @input.stop.prevent="addInput(ite,i)" @blur="addblur(ite,i)" v-bind:class="{ 'onFocus': i===isOnFocus,'onError' : i===isonError}" @dragstart="addblur(ite,i)" @dragenter="dragenter(ite)">
              <i class="zm-boxShow" v-show="ite.isInputShow" @dblclick.stop.prevent="addAbClick(ite,i)"></i>
            </div>
            <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-eyeOn': ite.isIconEyeOn}" @click.self.prevent="addHidShow(i)"></span>
            <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-eyeOff':ite.isIconEyeOn==false?ite.isIconEyeOff:(i==isKey) && ite.isEyeOff}" @click.self.prevent="addIconEyeOff(i)"></span>
            <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-cha2':ite.isIconCha}" @click.self.prevent="addIconCha(i)"></span>
            <span class="zm-dialog-setting iconfont" v-bind:class="{'icon-duigou1':ite.isIconDuigou1}" @click.stop="addDuiGou(ite,i)"></span>
            <span class="zm-dialog-setting iconfont" v-bind:class="{'icon-solidsettingicon':ite.iconShezhi2}" @click.self.prevent="addSetting(ite,i)"></span>
            <p class="zm-dialog-nameError iconfont icon-jinzhitishi" v-if="i===isJiZhi" :title="errorTitle"></p>
            <p class="zm-dialog-renameError" v-if="i===isDubeName">{{errorTitle}}</p>
            <p class="zm-dialog-nameErrorText" v-if="i===isNameOver">{{errorTitle}}</p>
          </li>
        </ul>
      </EasyScrollbar>
      <div class="zm-dialog-carousel-pageSetBox" @mouseenter="pageSetEnter()" @mouseleave="pageSetLeave()" v-show="isSelect" :style="{top:top}">
        <div @click.stop.prevent="addReName()">重命名</div>
        <div @click.stop.prevent="addReMove()">移除</div>
      </div>
    </div>
    <blogCheck @checkList="checkListA($event)" :prop="compositeData"></blogCheck>
  </div>
</template>
<style scoped lang="less" src="./blog.less">
</style>
<script>
import setBlogSelect from "./setBlogSelect.vue";
import setBlogCheck from "./setBlogCheck.vue";
import drag from "./drag.vue";
import publice from "./public.js";
export default {
  name: "set-blog",
  props: ["prop"],
  components: {
    blogSelect: setBlogSelect,
    blogCheck: setBlogCheck
  },
  data() {
    return {
      isOnlayClick: "",
      isOnlay: "",
      isWrong: "",
      isOnFocus: "",
      isonError: "",
      isKey: 0,
      lists: [],
      isSelect: false,
      top: "0px",
      num: 0,
      isJiZhi: "",
      isDubeName: "",
      isNameOver: "",
      errorTitle: "※ 请填写不超过25个汉字或50个字符!",
      current: null,
      public: publice,
      initData: "",
      ratio: [],
      isSavefTilte: false
    };
  },
  mounted() {
    this.$dragging.$on("dragend", value => {
      event.stopPropagation();
      zmEditor.$store.state.component.selectList[0].lists = this.lists;
      zmEditor.$store.state.component.selectList[0].lists = Object.assign(
        [],
        zmEditor.$store.state.component.selectList[0].lists
      );
    });
  },
  computed: {
    setBlogList() {
      let _this = this;
      let oldData = zmEditor.$store.state.component.selectList[0].lists; //blog组件数据;
      let selectData = _this.current; //7-1选择后及组件默认数据;
      _this.lists = selectData || oldData; //渲染数据;
      if (_this.current) {
        _this.lists = _this.current;
      }

      _this.lists.forEach((element, index) => {
        if (
          element.hasOwnProperty("isIconEyeOn") ||
          element.hasOwnProperty("iconShezhi2") ||
          element.hasOwnProperty("isIconCha") ||
          element.hasOwnProperty("isIconDuigou1") ||
          element.hasOwnProperty("isEyeOff") ||
          element.hasOwnProperty("isIconEyeOff")
        ) {
          return;
        } else {
          element.isIconEyeOn = true;
          element.iconShezhi2 = true;
          element.isIconCha = false;
          element.isIconDuigou1 = false;
          element.isEyeOff = false;
          element.isIconEyeOff = true;
          element.fInitName = element.fTitle;
          element.isShowBlog = true;
          element.isInputShow = true;
        }
      });
      return _this.lists;
    },
    compositeData() {
      return {
        lists: this.lists,
        public: this.public
      };
    }
  },
  methods: {
    sortListA(sortRandom) {//排序过后数据更新;
      let _this = this;
      _this.lists = sortRandom;
      zmEditor.$store.state.component.selectList[0].lists = sortRandom;
      zmEditor.$store.state.component.selectList[0].lists = Object.assign(
        [],
        zmEditor.$store.state.component.selectList[0].lists
      );
    },
    checkListA(currentData) {//选择过后数据更新;
      let _this = this;
      _this.lists = currentData;
      _this.current = currentData;
      zmEditor.$store.state.component.selectList[0].lists = currentData;
      zmEditor.$store.state.component.selectList[0].lists = Object.assign(
        [],
        zmEditor.$store.state.component.selectList[0].lists
      );
    },
    addClick(ite, i) {//li点击事件添加class;
      let _this = this;
      _this.isOnlayClick = i;
    },
    addMouseEnter(i) {//li鼠标移入事件添加class;
      let _this = this;
      _this.isOnlay = i;
    },
    addMouseLeave(i) {//li鼠标移出事件添加class并将右侧小弹出框隐藏;
      let _this = this;
      _this.isOnlay = -1;
      setTimeout(() => {
        if (!_this.a) {
          _this.isSelect = false;
        }
      }, 200);
    },
    dragenter(ite) {
      ite.fTitle = ite.fInitName;
      event.stopPropagation();//阻止input托拽enter;
      return false;//阻止input托拽默认事件;
    },
    addblur(ite, i) {//标题设置;图标初始化;
      let _this = this;
      ite.isInputShow = true;
      setTimeout(() => {
        if (_this.isSavefTilte) {
          //修改fTitle成功;
          _this.addListinit(i); //list图标数据类初始化;
          _this.isWrong = -1;
          _this.isOnFocus = -1;
          _this.isOnlayClick = -1;
          _this.num = i;
          _this.isJiZhi = false;
          _this.isDubeName = false;
          _this.isNameOver = false;
          _this.isonError = -1;
          _this.isOnFocus = -1;
        } else {
          //修改fTitle不成功；
          ite.fTitle = _this.initData;
          _this.addListinit(i); //list图标数据类初始化;
          _this.isWrong = -1;
          _this.isOnFocus = -1;
          _this.isOnlayClick = -1;
          _this.num = i;
          _this.isJiZhi = false;
          _this.isDubeName = false;
          _this.isNameOver = false;
          _this.isonError = -1;
          _this.isOnFocus = -1;
        }
      }, 200);
      _this.clearSelections(); //取消选中状态;
      // _this.$refs.blogSelect.addSelHidden(); //调用子级排序列表方法;
      event.stopPropagation();//阻止input托拽开始;
      return false;//阻止input托拽默认事件;
    },
    inputFocus(ite, index) {
      let _this = this;
      this.initData = ite.fTitle;
      this.ratio = [];
      this.lists.forEach(item => {
        this.ratio.push(JSON.parse(JSON.stringify(item.fTitle)));
      });
      this.ratio.splice(index, 1);
      let targName = event.currentTarget;
      targName.select();
      _this.addListSet(index); //list图标数据设置;
      _this.isOnlayClick = -1;
      _this.isWrong = index;
      _this.isOnFocus = index;
    },
    addEnter(ite, index) {
      let _this = this;
      let targName = event.currentTarget;
      _this.isSavefTilte = true;
      _this.addChangeName(ite, index); //重命名设置;
      targName.blur();
    },
    addInput(ite, index) {
      let title = ite.fTitle;
      let cc = this.judgeTitle(title, index);
    },
    addAbClick(ite, index) {
      let _this = this;
      let targName = event.currentTarget.previousElementSibling;
      targName.focus();
      ite.isInputShow = false;
      _this.isOnlayClick = -1;
    },
    addReNameAxios(ite, i) {
      let _this = this;
      let url = "http://local.zuma.com/blog/webbuilder-api/shopBlog/updateTitle";
      let fid = ite.fId;
      let fname = ite.fTitle;
      _this.$axios
        .get(
          url,
          {
            params: {
              fId: fid,
              fBlogTitle: fname
            }
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            }
          }
        )
        .then(function(response) {
          let result = response.data.result;
          if (0 == result) {
            console.log("数据异常!");
          } else {
            console.log("数据OK!");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addChangeName(ite, index) {
      let _this = this;
      let isShow = this.judgeTitle(ite.fTitle, index);
      if (isShow) {
        _this.initData = ite.fTitle;
        _this.addReNameAxios(ite, index); //重命名tilte;
      } else {
        ite.fTitle = this.initData;
        _this.isNameOver = false;
        _this.isJiZhi = false;
        _this.isDubeName = false;
        _this.isonError = -1;
      }
    },
    judgeTitle(fTitle, index) {
      let _this = this;
      let namelen = _this.fileGetLength(fTitle); //字符长度计算;
      var tempKey = this.ratio.some(item => {
        return fTitle == item;
      });
      if (tempKey) {
        _this.isDubeName = index;
        _this.isJiZhi = index;
        _this.isonError = index;
        _this.isOnFocus = -1;
        _this.errorTitle = "※禁止重名！";
        return false;
      } else {
        if (namelen > 50) {
          _this.isNameOver = index;
          _this.isJiZhi = index;
          _this.isonError = index;
          _this.isOnFocus = -1;
          return false;
        } else {
          _this.isNameOver = false;
          _this.isJiZhi = false;
          _this.isDubeName = false;
          _this.isonError = -1;
          _this.isOnFocus = index;
          return true;
        }
      }
    },
    fileGetLength(v) {
      let len = 0;
      for (let i = 0; i < v.length; i++) {
        let a = v.charAt(i);
        len = a.match(/[^\x00-\xff]/gi) != null ? len + 2 : len + 1;
      }
      return len;
    },
    clearSelections() {
      if (window.getSelection) {
        // 获取选中
        var selection = window.getSelection();
        // 清除选中
        selection.removeAllRanges();
      } else if (document.selection && document.selection.empty) {
        // 兼容 IE8 以下，但 IE9+ 以上同样可用
        document.selection.empty();
        // 或使用 clear() 方法
        // document.selection.clear();
      }
    },
    addDuiGou(ite, index) {
      let _this = this;
      _this.isSavefTilte = true;
      _this.addChangeName(ite, index); //重命名设置;
    },
    addSetting(ite, index) {
      let _this = this;
      _this.num = index;
      _this.top = index * 41 + "px";
      _this.isOnlayClick = index;
      for (let i = 0; i < _this.lists.length; i++) {
        if (i == index) {
          if (_this.isSelect) {
            _this.isSelect = !_this.isSelect;
          } else {
            _this.isSelect = !_this.isSelect;
          }
        }
      }
    },
    addIconCha(index) {
      let _this = this;
      _this.isSelect = false;
      _this.num = index;
      _this.isWrong = -1;
      _this.isOnFocus = -1;
      _this.isOnlayClick = -1;
      _this.addListinit(index); //list图标数据类初始化;
      _this.clearSelections(); //取消选中状态;
    },
    addIconEyeOff(index) {
      let _this = this;
      _this.isSelect = false;
      _this.num = index;
      _this.isOnlayClick = -1;
      zmEditor.$store.state.component.selectList[0].lists[
        index
      ].isShowBlog = true;
      _this.addEyeInit(index);
    },
    addHidShow(index) {
      let _this = this;
      _this.isSelect = false;
      _this.num = index;
      zmEditor.$store.state.component.selectList[0].lists[
        index
      ].isShowBlog = false;
      _this.addEyeInit(index);
    },
    addReMove() {
      let _this = this;
      this.lists.splice(_this.num, 1);//移除列表数据;
      zmEditor.$store.state.component.selectList[0].lists.splice(_this.num, 1); //移除list 数据;
      this.isSelect = false; //小弹出框隐藏;
    },
    addReName() {
      let _this = this;
      let parClass =
        event.currentTarget.parentElement.previousElementSibling.children[0]
          .firstChild.firstChild.children[_this.num];
      let targName = parClass.children[1].firstChild;
      targName.focus();
      targName.select();
      _this.addListSet(_this.num); //list图标数据设置;
      _this.isOnlayClick = -1;
      _this.isWrong = _this.num;
      _this.isOnFocus = _this.num;
    },
    pageSetEnter() {
      this.a = true;
    },
    pageSetLeave() {
      this.a = false;
      this.isSelect = false;
    },
    addEyeInit(index) {
      let _this = this;
      for (let i = 0; i < _this.lists.length; i++) {
        _this.lists[index].iconShezhi2 = true;
        _this.lists[index].isIconCha = false;
        _this.lists[index].isIconDuigou1 = false;
        _this.lists[index].isIconEyeOff = true;
        if (i == index) {
          _this.lists[i].isIconEyeOn = !_this.lists[i].isIconEyeOn;
          _this.isKey = index;
          _this.lists[i].isEyeOff = !_this.lists[i].isEyeOff;
        }
      }
      _this.lists = Object.assign([], _this.lists);
    },
    addListinit(num) {
      let _this = this;
      for (let i = 0; i < _this.lists.length; i++) {
        _this.lists[num].isIconEyeOn = true;
        _this.lists[num].iconShezhi2 = true;
        _this.lists[num].isIconCha = false;
        _this.lists[num].isIconDuigou1 = false;
        _this.lists[num].isEyeOff = false;
        _this.lists[num].isIconEyeOff = true;
        _this.lists[num].isInputShow = true;
      }
      _this.lists = Object.assign([], _this.lists);
    },
    addListSet(num) {
      let _this = this;
      for (let i = 0; i < _this.lists.length; i++) {
        _this.lists[num].isIconEyeOn = false;
        _this.lists[num].iconShezhi2 = false;
        _this.lists[num].isIconCha = true;
        _this.lists[num].isIconDuigou1 = true;
        _this.lists[num].isEyeOff = false;
        _this.lists[num].isIconEyeOff = false;
        _this.lists[num].isInputShow = false;
      }
      _this.lists = Object.assign([], _this.lists);
    }
  }
};
</script>

