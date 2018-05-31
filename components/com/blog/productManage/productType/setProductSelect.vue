<template>
    <div class="zm-dialog-sortord zm-dialog-productType" @mouseleave="addSelHidden">
        <span class="zm-dialog-Icon-title">排序方式</span>
        <div class="zm-dialog-Icon" @click="addSelClass()" v-bind:class="{'zmicon_hover':isHover}">
            <span class="number">{{RandomSN}}</span>
            <i class="iconfont icon-sanjiao-copy icon_triangle"></i>
        </div>
        <ul class="zm-dialog-random" v-show="isShow" @mouseleave="addSelHidden">
            <li data-type="random" @click="addSortRandom">随机展示</li>
            <li data-type="time" @click="addSortDesc">按发布时间排序</li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "set-product-select",
  props: ["prop"],
  data() {
    return {
      isShow: false,
      isHover: false,
      RandomSN: "按发布时间排序"
    };
  },
  methods: {
    addSelClass() {
      let _this = this;
      _this.isShow = !_this.isShow;
      _this.isHover = !_this.isHover;
    },
    addSelHidden() {
      let _this = this;
      _this.isShow = false;
      _this.isHover = false;
    },
    addSelClick() {
      let _this = this;
      let current = event.currentTarget;
      _this.isShow = !_this.isShow;
      _this.isHover = !_this.isHover;
      _this.RandomSN = current.innerText;
    },
    addSortRandom() {
      let _this = this;
      let lists = zmEditor.$store.state.component.selectList[0].lists;
      _this.addSelClick();
      for (var i = 0, len = lists.length; i < len; i++) {
        var rand = parseInt(Math.random() * len);
        var temp = lists[rand];
        lists[rand] = lists[i];
        lists[i] = temp;
      }
      zmEditor.$store.state.component.selectList[0].lists = lists;
      zmEditor.$store.state.component.selectList[0].lists = Object.assign(
        [],
        zmEditor.$store.state.component.selectList[0].lists
      );
    },
    addSortDesc() {
      let _this = this;
      let lists = zmEditor.$store.state.component.selectList[0].lists;
      _this.addSelClick();
      lists.sort(_this.sortBy("time", false));
      zmEditor.$store.state.component.selectList[0].lists = lists;
      zmEditor.$store.state.component.selectList[0].lists = Object.assign(
        [],
        zmEditor.$store.state.component.selectList[0].lists
      );
    },
    sortBy(attr, rev) {
      //attr 排序的属性 如number属性
      //rev true表示升序排列，false降序排序
      //第二个参数没有传递 默认升序排列
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }
      return function(a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      };
    }
  }
};
</script>
