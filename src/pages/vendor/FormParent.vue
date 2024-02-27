<template>
  <div>
    <FormChild />
    <div class="flex justify-end mt-4">
      <q-btn @click="submitAllForms">Submit All Forms</q-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";
import mitt from "mitt";
import axios from "axios";

const eventBus = mitt();

export default defineComponent({
  name: "FormParent",
  components: {
    FormChild: defineAsyncComponent(() =>
      import("src/components/addproductform/FormChild.vue")
    ),
  },
  setup() {
    const products = ref({
      name: "",
      group: "",
      category: "",
      brand: "",
      product_category_name: "",
      images: {
        "large-product-image": "",
        "product-image1": "",
        "product-image2": "",
        "product-image3": "",
      },
    });

    eventBus.on("input-updated", (data) => {
      console.log("Received data from child:", data);
      // Update data in parent component based on data from child component
      if (data.field === "images") {
        // Handle images object
        Object.keys(data.value).forEach((key) => {
          products.value.images[key] = data.value[key];
        });
      } else {
        products.value[data.field] = data.value;
      }
    });

    const submitAllForms = async () => {
      try {
        // Mengambil token dari local storage
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found.");
          return;
        }

        // Menambahkan token ke header Authorization
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        console.log("Data yang akan dikirim:", products.value);

        // Kirim data ke server dengan menggunakan token
        const response = await axios.post(
          "http://192.168.1.244:8000/api/vendor/addProduct2",
          products.value,
          config
        );
        console.log("Data berhasil dikirim:", response.data);
      } catch (error) {
        console.error("Gagal mengirim data:", error);
      }
    };

    return { products, submitAllForms };
  },
});
</script>
