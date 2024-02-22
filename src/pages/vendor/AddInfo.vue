<template>
  <div>
    <FormBasic />
  </div>
</template>
<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  components: {
    FormBasic: defineAsyncComponent(() =>
      import("src/components/addproductform/FormBasic.vue")
    ),
  },
});
</script>
