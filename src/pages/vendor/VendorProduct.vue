<template>
  <div class="container-box">
    <div class="q-pa-md q-gutter-md row items-center justify-between">
      <div>
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Catalogue" icon="" to="/" />
          <q-breadcrumbs-el label="Product" />
        </q-breadcrumbs>
      </div>

      <div class="row items-center q-gutter-md">
        <q-input
          outlined
          dense
          v-model="searchInput"
          placeholder="Search product..."
          class="search-input"
        />
        <q-btn color="indigo" @click="openFilterPanel" class="filter-button">
          <i
            class="fa-solid fa-arrow-down-wide-short"
            style="padding-right: 10px"
          ></i>
          Filter
        </q-btn>
      </div>
    </div>
    <q-page
      class="fit row wrap justify-center items-center content-start q-pa-md"
    >
      <q-col
        class="col-6 col-sm-4 col-md-3 col-lg-2 q-mb-md"
        style="padding: 6px"
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <q-card
          class="my-card"
          flat
          bordered
          style="height: 100%; margin-bottom: 16px; padding: 10px"
        >
          <img
            alt="produk"
            :src="`${product.thumbnail}`"
            style="height: 150px"
          />
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
            <!-- <router-link :to="{ name: 'edit', params: { id: product.id } }">
              <q-btn
                align="left"
                class="btn-fixed-width"
                color="primary"
                label="Edit"
                style="border-radius: 20px"
              />
            </router-link> -->
          </q-card-actions>
        </q-card>
      </q-col>
    </q-page>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const products = ref([]);
    const originalProducts = ref([]);
    const searchInput = ref("");
    const priceRangeValue = ref(500);
    const defaultBrandValue = ref("");

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
        originalProducts.value = response.data.products;
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    getProducts();

    const filteredProducts = computed(() => {
      return products.value.filter((product) =>
        product.title.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    });

    const getUniqueBrands = () => {
      const uniqueBrands = [
        ...new Set(originalProducts.value.map((product) => product.brand)),
      ];
      return uniqueBrands;
    };

    const openFilterPanel = () => {
      const uniqueBrands = getUniqueBrands();
      const currentBrandFilter = document.getElementById("brandFilter")
        ? document.getElementById("brandFilter").value
        : defaultBrandValue.value;

      Swal.fire({
        title: "Filter Options",
        html: `
      <label for="priceRange">Price Range: $<span id="priceRangeValue">${
        priceRangeValue.value
      }</span></label>
      <input type="range" id="priceRange" name="priceRange" min="0" max="2000" value="${
        priceRangeValue.value
      }">
      <br><br>
      <select id="brandFilter" name="brandFilter">
        <option value="">${
          currentBrandFilter ? "Show All Brands" : "Select Brand"
        }</option>
        ${uniqueBrands
          .map((brand) => `<option value="${brand}">${brand}</option>`)
          .join("")}
      </select>
    `,
        showCancelButton: true,
        confirmButtonText: "Apply Filters",
        didOpen: () => {
          const priceRangeInput = document.getElementById("priceRange");
          priceRangeInput.addEventListener("input", () => {
            priceRangeValue.value = priceRangeInput.value;
            document.getElementById("priceRangeValue").innerText =
              priceRangeValue.value;
          });

          const brandFilterInput = document.getElementById("brandFilter");
          brandFilterInput.value = currentBrandFilter;
          brandFilterInput.addEventListener("change", () => {
            brandFilterInput.value = brandFilterInput.value;
          });
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const minPrice = parseFloat(
            document.getElementById("priceRange").value
          );
          const maxPrice = minPrice + 99; // Set max price to 99 more than min price

          const brandFilter = document.getElementById("brandFilter").value;

          products.value = originalProducts.value.filter((product) => {
            const productPrice = parseFloat(product.price);
            const passPriceFilter =
              productPrice >= minPrice && productPrice <= maxPrice;
            const passBrandFilter =
              !brandFilter || product.brand === brandFilter;
            return passPriceFilter && passBrandFilter;
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          const brandFilterInput = document.getElementById("brandFilter");
          brandFilterInput.value = ""; // Reset brand filter
          searchInput.value = ""; // Reset search input
          products.value = originalProducts.value; // Reset products to original
        }
      });
    };

    return { products, searchInput, filteredProducts, openFilterPanel };
  },
});
</script>

<style scoped>
.container-box {
  background-color: #f8f8ff;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px;
  border: 1px solid #ddd;
}

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
