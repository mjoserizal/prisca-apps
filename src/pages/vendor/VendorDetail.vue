<template>
  <VendorProfile />
</template>
<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  components: {
    VendorProfile: defineAsyncComponent(() =>
      import("src/components/vendor/VendorProfileForm.vue")
    ),
  },
});
</script>
