<template>
  <q-card class="my-card">
    <q-card-section class="product-details-section">
      <!-- Q-Carousel untuk gambar produk -->
      <q-carousel v-if="product.images && product.images.length > 1" animated v-model="slide" arrows navigation infinite
        class="carousel-container">
        <q-carousel-slide v-for="(image, index) in product.images" :key="index" :name="index" :img-src="image.url_image"
          class="carousel-image" />
      </q-carousel>

      <!-- Tampilkan gambar tunggal jika hanya ada satu gambar -->
      <img v-else-if="product.images && product.images.length === 1" :src="product.images[0].url_image || ''"
        alt="Product Image" class="single-image" style="margin: 10px" />

      <!-- Deskripsi produk -->
      <div class="product-description">
        <div class="text-h6" style="font-weight: bolder">
          {{ product.name }}
        </div>
        <br />
        <div class="text-subtitle2" style="font-weight: bold; font-size: 42px">
          {{
        product.commercial_info && product.commercial_info.commercialInfo
          ? formatPrice(product.commercial_info.commercialInfo.price)
          : "N/A"
      }}
        </div>
        <br />
        <div class="text-subtitle2" style="margin-bottom: 10px">
          Brand : {{ product.brand }}
        </div>
        <div class="text-subtitle2">Category : {{ product.category }}</div>
        <div class="text-subtitle2">
          Stok:
          {{
        product.commercial_info && product.commercial_info.commercialInfo
          ? product.commercial_info.commercialInfo.stock
          : "N/A"
      }}
        </div>
        <div class="text-subtitle2">
          Produk Spesifikasi :
          {{
          product.detail && product.detail.productSpecification
            ? product.detail.productSpecification
            : "N/A"
        }}
        </div>
        <div class="text-subtitle2">
          Min Purchase :
          {{
          product.commercial_info && product.commercial_info.purchaseQty
            ? product.commercial_info.purchaseQty.min
            : "N/A"
        }}
          Pcs
        </div>
        <div class="text-subtitle2">
          SKU :
          {{ product.other && product.other.sku ? product.other.sku : "N/A" }}
        </div>
        <div class="text-subtitle2">
          Warranty :
          {{
        product.other && product.other.warranty
          ? product.other.warranty
          : "N/A"
      }}
          Months
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <!-- q-tabs untuk menu tab -->
      <q-tabs v-model="selectedTab" align="justify">
        <q-tab name="productSpecification">Product Specification</q-tab>
        <q-tab name="other">Other</q-tab>
      </q-tabs>

      <!-- q-tab-panels untuk konten tab -->
      <q-tab-panels v-model="selectedTab">
        <!-- Panel untuk Product Specification -->
        <q-tab-panel name="productSpecification">
          <div class="product-description">
            <div v-if="product.detail && product.detail.productSpecification">
              <div class="text-subtitle2">
                Technical Specification:
                <span style="font-weight: normal">{{
        product.detail.technicalSpecification
      }}</span>
              </div>
              <div class="text-subtitle2">
                Feature:
                <span style="font-weight: normal">{{
          product.detail.feature
        }}</span>
              </div>
            </div>
            <div v-else>N/A</div>
          </div>
        </q-tab-panel>

        <!-- Panel untuk Other -->
        <q-tab-panel name="other">
          <div class="product-description">
            <div v-if="product.detail && product.detail.productSpecification">
              <div class="text-subtitle2">
                Incomterm:
                <span style="font-weight: normal">{{
        product.other.incomterm
      }}</span>
              </div>
              <div class="text-subtitle2">
                Tags:
                <span style="font-weight: normal">{{
          product.other.tags
        }}</span>
              </div>
              <div class="text-subtitle2">Video:</div>
              <!-- Tambahkan video jika manipulatedVideoUrl tidak kosong -->
              <video controls :src="manipulatedVideoUrl" class="product-video" v-if="manipulatedVideoUrl"
                style="margin: 0 auto; max-width: 100%; max-height: 400px"></video>
              <div v-else>No video available</div>
            </div>
            <div v-else>N/A</div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>

    <q-card-actions class="q-gutter-md justify-between">
      <div class="row justify-start">
        <router-link to="/product">
          <q-btn flat color="deep-orange" class="m-4">Kembali</q-btn>
        </router-link>
      </div>
      <div class="row justify-end m-4">
        <q-btn @click="editProduct(product)" color="deep-orange" label="Edit" style="border-radius: 6px" />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import "@fortawesome/fontawesome-free";
import { useStore } from "vuex";
import store from "src/router/store";
import { useRouter } from "vue-router";
// import { EventBus } from "src/router/EventBus";
import Swal from "sweetalert2";

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
    const stock = ref(0); // Tambahkan variabel stock
    const manipulatedVideoUrl = ref(""); // Tambahkan variabel manipulatedVideoUrl

    const vuexStore = useStore(store);
    const router = useRouter();
    const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

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

        const response = await axios.get(
          `${apiBaseUrl}vendor/product/${props.id}`,
          config
        );

        product.value = response.data.product;
        stock.value =
          response.data.product.commercial_info.commercialInfo.stock;
        manipulatedVideoUrl.value = response.data.product.detail.video.replace(
          /\\/g,
          "/"
        );
        // Manipulasi URL video
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    const editProduct = (product) => {
      console.log("Edit product:", product);
      router.push({ name: "editProduct", params: { id: product.id } });
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
              // Periksa apakah jumlah melebihi stok
              return `The amount should not exceed the stock (${stock.value}).`;
            }
          },
        });

        if (quantity) {
          // Kirim data ke server
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

          const response = await axios.post(
            `${apiBaseUrl}buyer/addToCart`,
            data,
            config
          );

          // Handle response dari server
          console.log("Response:", response.data);
          Swal.fire(
            "Berhasil!",
            `Ditambahkan ${quantity} ke keranjang.`,
            "success"
          );
          EventBus.emit("cartItemChanged");
        }
      } catch (error) {
        console.error("Error adding to cart: ", error);
        Swal.fire(
          "Oops...",
          "Ada kesalahan saat menambahkan ke keranjang.",
          "error"
        );
      }
    };

    const formatPrice = (price) => {
      // Mengubah harga menjadi format Rupiah
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
      editProduct,
    };
  },
});
</script>

<style scoped>
.my-card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1.5rem;
}

.product-details-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* Ubah menjadi grid dengan dua kolom */
  gap: 20px;
  /* Tambahkan jarak antar elemen */
}

.product-description {
  padding: 20px;
}

.carousel-container,
.single-image {
  width: 100%;
  /* Mengisi lebar container dengan lebar maksimum */
  height: auto;
  /* Mengatur tinggi agar proporsional */
}

.carousel-image {
  object-fit: cover;
  /* Untuk memastikan gambar diisi secara proporsional */
  width: 100%;
  /* Menetapkan lebar gambar */
  height: 200px;
  /* Menetapkan tinggi gambar */
}

/* Atur tata letak responsif menggunakan media queries */
@media screen and (max-width: 768px) {
  .product-details-section {
    grid-template-columns: 1fr;
    /* Ubah menjadi satu kolom pada perangkat seluler */
  }

  .carousel-container,
  .single-image {
    width: 100%;
    /* Mengisi lebar container dengan lebar maksimum */
    height: auto;
    /* Mengatur tinggi agar proporsional */
  }

  .carousel-image {
    height: 150px;
    /* Ubah tinggi gambar untuk perangkat seluler */
  }
}
</style>
