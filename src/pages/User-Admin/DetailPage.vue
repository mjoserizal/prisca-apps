<template>
  <q-card class="my-card">
    <q-card-section class="product-details-section">
      <!-- Q-Carousel for product images -->
      <q-carousel v-if="product.images && product.images.length > 1" animated v-model="slide" arrows navigation infinite
        class="carousel-container">
        <q-carousel-slide v-for="(image, index) in product.images" :key="image.id" :name="index"
          :img-src="image.url_image" class="carousel-image" />
      </q-carousel>

      <!-- Display a single image if there's only one -->
      <img v-else-if="product.images && product.images.length === 1" :src="product.images[0].url_image"
        alt="Product Image" class="single-image" style="margin: 10px" />

      <!-- Product description -->
      <div class="product-description">
        <div class="text-h6" style="font-weight: bolder">
          {{ product.name }}
        </div>
        <br />
        <div class="text-subtitle2" style="font-weight: bold; font-size: 42px">
          {{ productPrice }}
        </div>
        <br />
        <div class="text-subtitle2" style="margin-bottom: 10px">
          Brand : {{ product.brand }}
        </div>
        <div class="text-subtitle2">Category : {{ product.category }}</div>
        <div class="text-subtitle2">
          Stock: {{ productStock }}
        </div>
        <div class="text-subtitle2">
          Product Specifications : {{ productSpecification }}
        </div>
        <div class="text-subtitle2">
          Min Purchase : {{ minPurchase }} Pcs
        </div>
        <div class="text-subtitle2">
          SKU : {{ sku }}
        </div>
        <div class="text-subtitle2">
          Warranty : {{ warranty }} Months
        </div>
        <div class="row justify-end">
          <q-btn outline rounded @click="addToCart" color="deep-orange" icon="add_shopping_cart"
            style="border-radius: 6px" label="add to cart" />
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <!-- q-tabs for tab menu -->
      <q-tabs v-model="selectedTab" align="justify">
        <q-tab name="productSpecification">Product Specification</q-tab>
        <q-tab name="other">Other</q-tab>
      </q-tabs>

      <!-- q-tab-panels for tab content -->
      <q-tab-panels v-model="selectedTab">
        <!-- Panel for Product Specification -->
        <q-tab-panel name="productSpecification">
          <div class="product-description">
            <div v-if="product.detail && product.detail.productSpecification">
              <div class="text-subtitle2">
                Technical Specification:
                <span style="font-weight: normal">{{ product.detail.technicalSpecification }}</span>
              </div>
              <div class="text-subtitle2">
                Feature:
                <span style="font-weight: normal">{{ product.detail.feature }}</span>
              </div>
            </div>
            <div v-else>N/A</div>
          </div>
        </q-tab-panel>

        <!-- Panel for Other -->
        <q-tab-panel name="other">
          <div class="product-description">
            <div v-if="product.other">
              <div class="text-subtitle2">
                Incomterm:
                <span style="font-weight: normal">{{ product.other.incomterm }}</span>
              </div>
              <div class="text-subtitle2">
                Tags:
                <span style="font-weight: normal">{{ product.other.tags }}</span>
              </div>
              <div class="text-subtitle2">Video:</div>
              <!-- Add video if manipulatedVideoUrl is not empty -->
              <video controls :src="manipulatedVideoUrl" class="product-video" v-if="manipulatedVideoUrl"
                style="margin: 0 auto; max-width: 100%; max-height: 250px"></video>
              <div v-else>No video available</div>
            </div>
            <div v-else>N/A</div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>

    <q-card-actions class="q-gutter-md justify-between">
      <div class="row justify-start">
        <router-link to="/dashboard-Admin">
          <q-btn flat color="deep-orange">Back</q-btn>
        </router-link>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { EventBus } from "src/router/EventBus";
import Swal from "sweetalert2";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

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
    const slide = ref(1);
    const stock = ref(0); // Add stock variable
    const manipulatedVideoUrl = ref(""); // Add manipulatedVideoUrl variable

    const vuexStore = useStore();
    const router = useRouter();

    const getProductDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/");
          return;
        }
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(`${apiBaseUrl}buyer/product/${props.id}`, config);

        product.value = data.product;
        stock.value = data.product.commercial_info.commercialInfo.stock;
        manipulatedVideoUrl.value = data.product.detail.video.replace(/\\/g, "/");
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    const addToCart = async () => {
      try {
        const { value: quantity } = await Swal.fire({
          title: "Add to Cart",
          input: "number",
          inputLabel: "Quantity",
          inputAttributes: {
            min: 1,
            step: 1,
          },
          showCancelButton: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value || value <= 0) {
              return "Please enter a valid amount!";
            } else if (parseInt(value) > stock.value) {
              // Check if quantity exceeds stock
              return `The amount should not exceed the stock (${stock.value}).`;
            }
          },
        });

        if (quantity) {
          // Send data to server
          const token = localStorage.getItem("token");

          const config = {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          const data = {
            product_id: product.value.id,
            quantity: parseInt(quantity),
          };

          const response = await axios.post(`${apiBaseUrl}buyer/cart`, data, config);

          // Handle response from server
          console.log("Response:", response.data);
          Swal.fire("Success!", `Added ${quantity} to cart.`, "success");
          EventBus.emit("cartItemChanged");
        }
      } catch (error) {
        console.error("Error adding to cart: ", error);
        Swal.fire("Oops...", "There was an error adding to the cart.", "error");
      }
    };

    const formatPrice = (price) => {
      // Format price to Indonesian Rupiah
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
    };

    onMounted(() => {
      getProductDetails();
    });

    const selectedTab = ref("productSpecification");

    return {
      product,
      slide,
      addToCart,
      formatPrice,
      selectedTab,
      manipulatedVideoUrl,
      productPrice: computed(() => product.value.commercial_info?.commercialInfo?.price ? formatPrice(product.value.commercial_info.commercialInfo.price) : "N/A"),
      productStock: computed(() => product.value.commercial_info?.commercialInfo?.stock ?? "N/A"),
      productSpecification: computed(() => product.value.detail?.productSpecification ?? "N/A"),
      minPurchase: computed(() => product.value.commercial_info?.purchaseQty?.min ?? "N/A"),
      sku: computed(() => product.value.detail?.sku ?? "N/A"),
      warranty: computed(() => product.value.commercial_info?.commercialInfo?.warranty ?? "N/A"),
    };
  },
});
</script>

<style scoped>
.my-card {
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
}

.carousel-container {
  max-height: 400px;
  margin-bottom: 10px;
}

.carousel-image {
  object-fit: cover;
}

.single-image {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 400px;
}

.product-description {
  padding: 20px;
}

.product-video {
  margin: 10px auto;
  max-width: 100%;
  max-height: 400px;
}
</style>
