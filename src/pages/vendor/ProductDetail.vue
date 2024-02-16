<template>
  <q-page>
    <q-card>
      <q-carousel
        navigation
        navigation-position="top"
        navigation-color="white"
        navigation-type="dots"
        control-color="white"
        :height="carouselHeight"
      >
        <q-carousel-slide v-for="(image, index) in product.images" :key="index">
          <q-img
            :src="getImageUrl(image.image)"
            :alt="product.name"
            :loading="true"
            :error-src="errorImage"
            style="object-fit: contain"
          />
        </q-carousel-slide>
      </q-carousel>

      <q-card-section>
        <div class="text-h5">{{ product.name }}</div>
        <div class="text-subtitle1">{{ product.brand }}</div>
        <div>
          <q-rating
            v-model="product.rating"
            max="5"
            size="1.5em"
            color="yellow"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            readonly
            no-dimming
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Price: {{ product.amount }}</div>
      </q-card-section>
      <q-card-actions>
        <q-btn label="Add to Cart" color="primary" @click="addToCartHandler" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useCart } from "../../hooks/cart"; // Sesuaikan path yang sesuai

export default {
  name: "ProductDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { cart, addToCart } = useCart();

    // Contoh data produk, Anda dapat mengambil data ini dari sumber lain sesuai ID
    const product = ref({
      id: "009eac87-a37f-4bb7-8391-93d158ce8ca1",
      name: "paling baru",
      brand: "batu bara baru main",
      rating: 4,
      amount: "$50",
      images: [
        { id: "6c47c051-8840-4493-a25c-bb6a7e59de2c", image: "1707322968.png" },
      ],
    });

    const addToCartHandler = () => {
      addToCart(product.value);
    };

    // Fungsi untuk mendapatkan URL gambar
    const getImageUrl = (imageName) => {
      return `http://example.com/images/${imageName}`;
    };

    // Image untuk menampilkan jika ada kesalahan saat memuat gambar
    const errorImage = "http://example.com/error-image.png";

    // Ketinggian carousel
    const carouselHeight = "300px";

    return {
      product,
      addToCartHandler,
      getImageUrl,
      errorImage,
      carouselHeight,
    };
  },
};
</script>

<style scoped></style>
