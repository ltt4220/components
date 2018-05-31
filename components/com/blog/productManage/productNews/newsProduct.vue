<template>
    <div class="zm-product-newErr">
          <span class="iconfont icon-fcstubiao25"></span>
          <p class="zm-new-product">优先显示最新发布的{{setName}}！！无需指定{{setName}}！</p>
        </div>
</template>
<script>
export default {
    name:"no-news-product",
    props:["prop"],
    computed:{
        setName(){
            return this.prop;
        }
    }
}
</script>

