<template>
  <div class="zm-dialog-check zm-dialog-NewCheck">
    <a href="javascript:;">
      <button class="zm-dialog-check-button">{{setName}}</button>
    </a>
  </div>
</template>
<script>
export default {
  name: "set-product-check",
  props: ["prop"],
  computed: {
    setName() {
      return zmEditor.$store.state.product.labelName;
    }
  }
};
</script>

