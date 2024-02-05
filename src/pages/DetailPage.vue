<template>
  <q-page class="fit row wrap justify-start items-start content-start q-pa-sm">
    <q-col class="col-12" v-if="product.title">
      <q-card class="my-card" flat bordered style="height: 100%">
        <img alt="produk" :src="product.thumbnail" style="height: 300px" />

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ product.title }}</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              250 ft
            </div>
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
          Author: {{ product.brand }}
        </q-card-section>

        <q-separator />

        <!-- <q-card-actions class="justify-between">
          <router-link :to="{ name: 'index' }">
            <q-btn flat color="primary">Back to List</q-btn>
          </router-link>
        </q-card-actions> -->
      </q-card>
    </q-col>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  name: "DetailPage",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const product = ref({});
    const stars = ref(0);

    const getProductDetails = async () => {
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
          `https://dummyjson.com/products/${props.id}`,
          config
        );
        product.value = response.data;
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    onMounted(() => {
      getProductDetails();
    });

    return { product, stars };
  },
});
</script>

<style></style>
