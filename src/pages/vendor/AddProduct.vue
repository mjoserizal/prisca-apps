<template>
  <div>
    <BasicInformation ref="basicInfo" />
    <SpecificationDetails ref="specInfo" />
    <CommercialInfo ref="commercialInfo" />
    <OthersInfo ref="othersInfo" />
    <button class="btn-primary" @click="submitProduct">Submit</button>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  components: {
    BasicInformation: defineAsyncComponent(() =>
      import("src/components/addproductform/BasicInformation.vue")
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

  setup() {
    const basicInfo = ref(null);
    const specInfo = ref(null);
    const commercialInfo = ref(null);
    const othersInfo = ref(null);

    const submitProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found.");
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        const formData = new FormData();

        // Get data from each form component
        const basicInfoData = basicInfo.value ? basicInfo.value.getData() : {};
        const specInfoData = specInfo.value ? specInfo.value.getData() : {};
        const commercialInfoData = commercialInfo.value
          ? commercialInfo.value.getData()
          : {};
        const othersInfoData = othersInfo.value
          ? othersInfo.value.getData()
          : {};

        // Merge data into one FormData object
        Object.entries(basicInfoData).forEach(([key, value]) =>
          formData.append(key, value)
        );
        Object.entries(specInfoData).forEach(([key, value]) =>
          formData.append(key, value)
        );
        Object.entries(commercialInfoData).forEach(([key, value]) =>
          formData.append(key, value)
        );
        Object.entries(othersInfoData).forEach(([key, value]) =>
          formData.append(key, value)
        );

        const response = await axios.post(
          "http://192.168.1.244:8000/api/vendor/product",
          formData,
          config
        );
        console.log(response.data);
        // Reset form data

        alert("Product added successfully!");
      } catch (error) {
        console.error("Failed to add product:", error);
        alert("Failed to add product. Please try again.");
      }
    };

    return {
      basicInfo,
      specInfo,
      commercialInfo,
      othersInfo,
      submitProduct,
    };
  },
});
</script>

<style></style>
