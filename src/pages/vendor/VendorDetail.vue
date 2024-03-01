<template>
  <div>
    <VendorProfile />
  </div>
</template>
<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  components: {
    VendorProfile: defineAsyncComponent(() =>
      import("src/components/vendor/VendorProfile.vue")
    ),
  },
});
</script>
