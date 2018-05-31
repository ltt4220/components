<template>
  <div class="zm-dialog-check">
    <button class="zm-dialog-check-button" @click.stop="checkBlog()">选择博客</button>
  </div>
</template>
<script>
export default {
  name: "set-blog-check",
  props: ["prop"],
  data() {
    return {};
  },
  methods: {
    checkBlog() {
      let _this = this;
      _this.prop.public.choiceModules({
        nowLength: this.prop.lists.length,
        totalLenght: 50,
        multiple: true,
        warningText: "最多选择50条博客，请您及时移除过期博客。",
        modules: "blog",
        callBack: _this.blogpict
      }); //7-1选择博客数据;
    },
    blogpict(data) {
      var fathList = this.prop.lists,
        Data = data.concat(fathList),
        arr = this.prop.public.grouping(Data, "fId"),
        results = [],
        currentData = [];
      for (var i = 0; i < arr.length; i++) {
        results.push(arr[i][0]);
      }
      var filterResult = fathList.some(ite => {
        return ite.isTime;
      });
      if (filterResult) {
        results.forEach(item => {
          var date = new Date(item.fCreateTime)
            .toLocaleString()
            .replace(/:d{1,2}$/, " ");
          item.fCreateTime = date;
          item.isShowBlog = true;
          item.isTime = true;
          item.sapnBlock = "none";
          item.imgDis = "none";
          item.videoDis = "none";
          if (item.fvideo.length > 0) {
            item.bgUrlv = item.fvideo[0][1];
            item.source = item.fvideo[0][0];
            item.sapnBlock = "block";
            item.videoDis = "block";
          }
          if (item.fImg.length > 0) {
            item.bgUrl = item.fImg[0];
            item.imgDis = "block";
          }
        });
      } else {
        results.forEach(item => {
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
              item.bgUrl ="http://image.zuma.com/upload/921612987460787975.png";
              item.imgDis = "block";
              item.videoDis = "none";
              item.ahref = "true";
            }
          }
        });
      }
      this.$emit("checkList", results);
    }
  }
};
</script>

