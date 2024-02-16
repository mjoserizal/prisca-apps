<template>
  <div>
    <AddNewProduct />
    <SpecificationDetails />
    <CommercialInfo />
    <OthersInfo />
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  components: {
    AddNewProduct: defineAsyncComponent(() =>
      import("src/components/addproductform/AddNewProduct.vue")
    ),
    SpecificationDetails: defineAsyncComponent(() =>
      import("src/components/addproductform/SpecificationDetails.vue")
    ),
    CommercialInfo: defineAsyncComponent(() =>
      import("src/components/addproductform/CommercialInfo.vue")
    ),
    OthersInfo: defineAsyncComponent(() =>
      import("src/components/addproductform/OthersInfo.vue")
    ),
  },
});
</script>

<style>
/* Add your custom styles here */
</style>
