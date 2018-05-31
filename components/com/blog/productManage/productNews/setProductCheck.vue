<template>
  <div class="zm-dialog-check zm-dialog-NewCheck">
    <button class="zm-dialog-check-button">{{setName}}</button>
  </div>
</template>
<script>
export default {
  name: "set-product-check",
  computed:{
    setName(){
      return  zmEditor.$store.state.product.labelName;
    }
  }
};
</script>

