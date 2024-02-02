<template>
  <q-page class="fit row wrap justify-start items-start content-start q-pa-sm">
    <q-col
      class="col-2"
      v-for="product in products"
      :key="product.id"
      :xs="12"
      :sm="6"
      :md="4"
      :lg="3"
    >
      <q-card class="my-card" flat bordered style="height: 100%">
        <img
          alt="produk"
          :src="`data:image/jpeg;base64,${product.base64_image}`"
          style="height: 150px"
        />

        <q-card-section style="height: calc(100% - 150px)">
          <q-btn
            fab
            color="primary"
            icon="place"
            sm
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ product.title }}</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />

          <div class="text-subtitle1 q-mt-sm text-ellipsis overflow-hidden">
            {{ product.description }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          $ {{ product.price }}
        </q-card-section>
        <q-card-section class="q-pt-none">
          Author : {{ product.author.name }}
        </q-card-section>

        <q-separator />

        <q-card-actions class="justify-between">
          <router-link :to="{ name: 'detail', params: { id: product.id } }">
            <q-btn flat color="primary">Detail</q-btn>
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
          "http://192.168.1.23:8000/api/allProduct",
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

<style>
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
