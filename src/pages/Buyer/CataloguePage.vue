<template>
  <div style="padding-top: 20px">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Catalogue" icon="" to="/" />

      <q-breadcrumbs-el label="Product" />
    </q-breadcrumbs>
  </div>
  <q-page
    class="fit row wrap justify-center items-center content-start q-pa-md"
  >
    <q-col
      class="col-6 col-sm-4 col-md-3 col-lg-2 q-mb-md"
      style="padding: 6px"
      v-for="product in products"
      :key="product.id"
    >
      <q-card
        class="my-card"
        flat
        bordered
        style="height: 100%; margin-bottom: 16px; padding: 10px"
      >
        <img alt="produk" :src="`${product.thumbnail}`" style="height: 150px" />
        <q-card-section style="height: calc(100% - 150px)">
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ product.title }}</div>
          </div>
          <q-rating v-model="product.rating" :max="5" size="32px" />
          <div class="text-subtitle1 q-mt-sm text-ellipsis overflow-hidden">
            {{ product.description }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          $ {{ product.price }}
        </q-card-section>
        <q-card-section class="q-pt-none">
          Brand: {{ product.brand }}
        </q-card-section>
        <q-separator />
        <q-card-actions class="justify-between">
          <router-link :to="{ name: 'detail', params: { id: product.id } }">
            <q-btn
              align="left"
              class="btn-fixed-width"
              color="primary"
              label="Detail"
              style="border-radius: 20px"
            />
          </router-link>
        </q-card-actions>
      </q-card>
    </q-col>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const products = ref([]);
    const stars = ref(0);

    const getProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "https://dummyjson.com/products",
          config
        );
        products.value = response.data.products;
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    getProducts();

    return { products, stars };
  },
});
</script>

<style scoped>
.my-card {
  height: 100%;
}
.my-card .q-img {
  height: 150px;
}
.my-card .q-card-section {
  height: calc(100% - 150px);
}
.text-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
