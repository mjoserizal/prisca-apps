<template>
  <div>
    <addProductForm />
  </div>
</template>
<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  components: {
    addProductForm: defineAsyncComponent(() =>
      import("src/components/addproductform/addProductForm.vue")
    ),
  },
});
</script>
