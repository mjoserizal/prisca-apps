<template>
  <q-page>
    <q-page-container>
      <div class="q-pa-md q-gutter-sm">
        <q-banner rounded :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <template v-slot:avatar>
            <img
              alt="produk"
              :src="`data:image/jpeg;base64,${product.base64_image}`"
              style="height: 150px"
            />
          </template>
          <div class="q-mb-md" v-if="product.name">
            <q-card>
              <q-card-section>
                <q-card-title class="text-h6">Title : </q-card-title>
                <q-card-text>{{ product.name }}</q-card-text>
              </q-card-section>
            </q-card>
          </div>
          <div class="q-mb-md" v-if="product.price">
            <q-card>
              <q-card-section>
                <q-card-title class="text-h6">Price : </q-card-title>
                <q-card-text>$ {{ product.price }}</q-card-text>
              </q-card-section>
            </q-card>
          </div>
          <div class="q-mb-md" v-if="product.description">
            <q-card>
              <q-card-section>
                <q-card-title class="text-h6">Description : </q-card-title>
                <q-card-text>{{ product.description }}</q-card-text>
              </q-card-section>
            </q-card>
          </div>
        </q-banner>
      </div>
    </q-page-container>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "DetailPage",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const product = ref({});

    const fetchProductDetails = async () => {
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
          `http://192.168.1.23:8000/api/product/${props.id}`,
          config
        );
        product.value = response.data.product;
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    onMounted(() => {
      fetchProductDetails();
    });

    return { product };
  },
};
</script>

<style></style>
