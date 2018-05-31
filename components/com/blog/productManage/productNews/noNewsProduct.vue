<template>
    <div class="zm-product-err zm-product-noErr">
          <i class="iconfont icon-noProduct"></i>
          <p>未检测到您发布过<br/>{{setName}}！！</p>
          <p>请选择添加{{setName}}！</p>
          <p class="iconfont icon-pointer"></p>
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

