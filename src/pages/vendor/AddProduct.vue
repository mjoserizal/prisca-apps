<template>
  <form @submit.prevent="submitProduct">
    <BasicInformation ref="basicInfo" />
    <SpecificationDetails ref="specInfo" />
    <CommercialInfo ref="commercialInfo" />
    <OthersInfo ref="othersInfo" />
    <button
      type="submit"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Submit
    </button>
  </form>
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

  name: "addProductForm",
  data() {
    return {
      products: {
        name: "",
        group: "",
        category: "",
        brand: "",
        product_category_name: "",
        staus: "",
        images: {
          "large-product-image": "",
          "product-image1": "",
          "product-image2": "",
          "product-image3": "",
        },
        detail: {
          productSpecification: "",
          technicalSpecification: "",
          feature: "",
          partNumber: "",
          satuan: "",
          video: "",
          condition: "",
        },
        commercial_info: {
          commercialInfo: {
            grosirToggle: false,
            enablecontract: false,
            preOrder: false,
            price: "",
            currency_id: "",
            etalase_id: "",
            payment_terms: "",
            discount: "",
            price_exp: "",
            stock: "",
            pre_order: "",
            contract: "",
            purchase_q_t_y: {
              min: "",
              max: "",
            },
            grosir: {
              qty: "",
              price: "",
            },
          },
        },
        other: {
          incomterm: "",
          warranty: "",
          maintenance: "",
          sku: "",
          tags: "",
          makeActive: false,
        },
      },

      groups: [],
      categories: [],
      etalases: [],
      currencies: [],
      previewImages: {
        "large-product-image": "",
        "product-image1": "",
        "product-image2": "",
        "product-image3": "",
      },
    };
  },

  created() {
    this.fetchDropdownData();
  },
  methods: {
    async fetchDropdownData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found.");
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://192.168.1.45:8000/api/vendor/show/drop",
          config
        );
        console.log(response.data);
        this.groups = response.data.data.groups;
        this.categories = response.data.data.categories;
        this.etalases = response.data.data.etalases;
        this.currencies = response.data.data.currencies;
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    },

    onImageChange(field, event) {
      const file = event.target.files[0];
      if (!file) return;

      // Simpan nama file saja
      this.products.images[field] = file.name;
      console.log(`${field}:`, file.name); // Tambahkan console log di sini

      // Buat file reader
      const reader = new FileReader();

      // Ketika file selesai dibaca, set URL data sebagai preview gambar
      reader.onload = (e) => {
        this.previewImages[field] = e.target.result;
      };

      // Baca file sebagai URL data
      reader.readAsDataURL(file);
    },

    onVideoChange(event) {
      const videoFile = event.target.files[0];
      if (videoFile) {
        this.products.detail.video = videoFile.name;
        console.log("Video:", videoFile.name); // Tambahkan console log di sini
      }
    },

    async submitProduct() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found.");
          return;
        }

        const formData = new FormData();
        formData.append("name", this.products.name);
        formData.append("group_id", this.products.group);
        formData.append("category_id", this.products.category);
        formData.append("brand", this.products.brand);
        formData.append(
          "product_category_name",
          this.products.product_category_name
        );
        formData.append(
          "productSpecification",
          this.products.detail.productSpecification
        );
        formData.append(
          "technicalSpecification",
          this.products.detail.technicalSpecification
        );
        formData.append("feature", this.products.detail.feature);
        formData.append("partNumber", this.products.detail.partNumber);
        formData.append("satuan", this.products.detail.satuan);
        formData.append("condition", this.products.detail.condition);
        formData.append(
          "price",
          this.products.commercial_info.commercialInfo.price
        );
        formData.append(
          "currency_id",
          this.products.commercial_info.commercialInfo.currency_id
        );
        formData.append(
          "etalase_id",
          this.products.commercial_info.commercialInfo.etalase_id
        );
        formData.append(
          "payment_terms",
          this.products.commercial_info.commercialInfo.payment_terms
        );
        formData.append(
          "discount",
          this.products.commercial_info.commercialInfo.discount
        );
        formData.append(
          "price_exp",
          this.products.commercial_info.commercialInfo.price_exp
        );
        formData.append(
          "stock",
          this.products.commercial_info.commercialInfo.stock
        );
        formData.append(
          "pre_order",
          this.products.commercial_info.commercialInfo.pre_order
        );
        formData.append(
          "contract",
          this.products.commercial_info.commercialInfo.enablecontract
            ? "yes"
            : "no"
        );
        formData.append(
          "min",
          this.products.commercial_info.commercialInfo.purchase_q_t_y.min
        );
        formData.append(
          "max",
          this.products.commercial_info.commercialInfo.purchase_q_t_y.max
        );
        formData.append(
          "qty",
          this.products.commercial_info.commercialInfo.grosir.qty
        );
        formData.append(
          "grosir_price",
          this.products.commercial_info.commercialInfo.grosir.price
        );

        formData.append("incomterm", this.products.other.incomterm);
        formData.append("warranty", this.products.other.warranty);
        formData.append("maintenance", this.products.other.maintenance);
        formData.append("sku", this.products.other.sku);
        formData.append("tags", this.products.other.tags);
        formData.append(
          "status",
          this.products.other.makeActive ? "active" : "inactive"
        );

        // formData.append("tags", this.products.other.tags.join(", ")); // Menggunakan join untuk menggabungkan array tags menjadi string
        // formData.append("makeActive", this.products.other.makeActive);

        // Tambahkan file gambar ke FormData
        for (let key in this.products.images) {
          const file = document.querySelector(`input[name=${key}]`).files[0];
          if (file) {
            formData.append("image[]", file);
            console.log(`${key}:`, file.name); // Tambahkan console log di sini
          }
        }

        // Tambahkan file video ke FormData
        const videoFile = document.querySelector("input[name=video]").files[0];
        if (videoFile) {
          formData.append("video", videoFile);
          console.log("Video:", videoFile.name); // Tambahkan console log di sini
        }
        // Tambahkan console log untuk menampilkan data yang akan disubmit
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          "http://192.168.1.45:8000/api/vendor/addProduct",
          formData,
          config
        );
        console.log("Product submitted successfully:", response.data);
      } catch (error) {
        console.error("Failed to submit product:", error);
      }
    },
  },
});
</script>

<style>
form {
  padding: 2rem;
  border-radius: 1rem;
}
</style>
