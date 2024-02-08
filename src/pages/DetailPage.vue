<template>
  <q-card
    class="my-card"
    style="
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin: 20px;
    "
  >
    <q-card-section>
      <q-row>
        <q-col class="col-auto" style="margin-right: 20px">
          <q-carousel
            animated
            v-model="slide"
            arrows
            navigation
            infinite
            style="border-radius: 6px"
          >
            <template
              v-if="
                Array.isArray(product.thumbnail) && product.thumbnail.length > 1
              "
            >
              <q-carousel-slide :name="1 + 1" :img-src="product.thumbnail[1]" />
            </template>
            <q-carousel-slide v-else :name="1" :img-src="product.thumbnail" />
          </q-carousel>
        </q-col>
        <q-col>
          <div class="text-h6" style="margin-bottom: 10px">
            {{ product.title }}
          </div>
          <div class="text-subtitle2" style="margin-bottom: 10px">
            Colours: Smoke Blue with red accents
          </div>
          <div class="q-row">
            <q-col class="col-6 text-subtitle2">Rating:</q-col>
            <q-col class="col-6 text-subtitle2">{{ product.rating }}</q-col>
          </div>
          <div class="q-row">
            <q-col class="col-6 text-subtitle2">Brand:</q-col>
            <q-col class="col-6 text-subtitle2">{{ product.brand }}</q-col>
          </div>
          <div class="q-row">
            <q-col class="col-6 text-subtitle2">Category:</q-col>
            <q-col class="col-6 text-subtitle2">{{ product.category }}</q-col>
          </div>
        </q-col>
      </q-row>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-body">{{ product.description }}</div>
    </q-card-section>

    <q-separator />

    <q-expansion-item label="Shipping and returns" icon="local_shipping">
      <q-card>
        <q-card-section>
          <div class="text-body">
            You will be responsible for paying for your own shipping costs for
            returning your item. Shipping costs are nonrefundable.
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item label="Contact us" icon="contact_mail">
      <q-card>
        <q-card-section>
          <div class="text-body">
            If you have any questions on how to return your item to us, contact
            us.
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-card-actions class="justify-end">
      <router-link :to="{ name: 'detail', params: { id: product.id } }">
        <q-btn @click="addToCart" color="deep-orange" style="border-radius: 6px"
          >Tambahkan ke Keranjang</q-btn
        >
      </router-link>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import "@fortawesome/fontawesome-free";
import { useStore } from "vuex";
import store from "src/router/store";
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
    const slide = ref(1); // Change slide reference initialization
    const vuexStore = useStore(store);
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
    const addToCart = () => {
      store.dispatch("addToCart");
    };
    onMounted(() => {
      getProductDetails();
    });

    return { product, slide, addToCart }; // Return slide reference
  },
});
</script>

<style></style>
