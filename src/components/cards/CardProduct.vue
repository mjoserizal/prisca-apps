<template>
  <q-card class="no-shadow" bordered>
    <q-img :src="getImageUrl()" height="220px">
      <q-chip
        v-if="data && data.group === 'Clothing'"
        color="green"
        label="Clothing"
      ></q-chip>
    </q-img>

    <q-card-section>
      <q-btn
        fab
        color="teal-7"
        icon="fas fa-cart-plus"
        padding="sm"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
        @click="addToCartHandler"
      />
    </q-card-section>

    <q-card-section>
      <div class="text-h6">
        {{ data && data.name }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        {{ data && data.brand }}
      </div>
      <div>
        <q-rating
          v-model="rating"
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
      <div class="col-12">
        <span class="text-h6">{{ data && data.category }}</span>
        <span class="text-h6 float-right">
          <router-link
            :to="{ name: 'product-detail', params: { id: data && data.id } }"
          >
            <q-btn
              label="See Details"
              rounded
              color="secondary"
              outline
            ></q-btn>
          </router-link>
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import { useCart } from "../../hooks/cart"; // Sesuaikan path yang sesuai

export default defineComponent({
  name: "CardProduct",

  props: ["data"],

  setup(props) {
    const { addToCart } = useCart();

    const addToCartHandler = () => {
      addToCart(props.data);
    };

    const getImageUrl = () => {
      if (
        props.data &&
        props.data.images &&
        props.data.images.length > 0 &&
        props.data.images[0].base64_image
      ) {
        return `data:image/png;base64, ${props.data.images[0].base64_image}`;
      } else {
        return ""; // Atau gunakan URL default jika gambar tidak ada
      }
    };

    return {
      addToCartHandler,
      getImageUrl,
    };
  },
});
</script>

<style scoped></style>
