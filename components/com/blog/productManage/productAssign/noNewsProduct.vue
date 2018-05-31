<template>
    <div class="zm-product-err zm-product-noErr zm-product-assign">
          <p>您目前没有选择{{setName}}！！</p>
          <p>请选择添加{{setName}}！</p>
          <p class="iconfont icon-pointer"></p>
        </div>
</template>
<script>
export default {
    name:"no-news-product",
    computed: {
    setName() {
      return zmEditor.$store.state.product.labelName;
    }
  }
}
</script>

