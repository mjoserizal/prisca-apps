<template>
  <div class="container-box">
    <div class="container-box-1">
      <div class="q-pa-md q-gutter-md row items-center justify-between">
        <div>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Catalogue" icon="" to="/"/>
            <q-breadcrumbs-el label="Product"/>
          </q-breadcrumbs>
        </div>

        <div class="row items-center q-gutter-md">
          <q-input outlined dense v-model="searchInput" placeholder="Search product..." class="search-input"/>
          <q-btn color="indigo" @click="openFilterPanel" class="filter-button">
            <i class="fa-solid fa-arrow-down-wide-short" style="padding-right: 10px"></i>
            Filter
          </q-btn>
        </div>
      </div>
      <q-page class="fit row wrap justify-start items-start content-start q-pa-md">
        <q-col class="col-6 col-sm-4 col-md-3 col-lg-2 q-mb-md" style="padding: 6px" v-for="product in filteredProducts"
               :key="product.id">
          <q-card class="my-card" flat bordered>
            <q-img v-if="product.images && product.images.length > 0"
                   :src="product.images[0].url_image"/>

            <q-card-section>
              <div class="col text-h6 ellipsis" style="color: #013a63; font-weight: normal">
                {{ product.name }}
              </div>
              <div class="text-h7 q-mt-sm q-mb-xs" style="font-weight: bold">
                {{ formatToRupiah(product.price) }}
              </div>
              <div class="text-caption text-grey">
                Brand - {{ product.brand }}
              </div>
              <div class="text-caption text-grey">
                Vendor - {{ product.vendor_name }}
              </div>
            </q-card-section>

            <q-card-actions>
              <router-link :to="{ name: 'detail', params: { id: product.id } }">
                <q-btn flat color="primary" label="Detail"/>
              </router-link>
              <q-btn flat color="secondary" label="Compare" @click="addToCompare(product)"/>

              <q-space/>
            </q-card-actions>
          </q-card>
        </q-col>
      </q-page>
    </div>
  </div>
</template>


<script>
import {defineComponent, ref, computed} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {useRouter} from "vue-router";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
export default defineComponent({
  name: "IndexPage",

  setup() {
    const router = useRouter();
    const products = ref([]);
    const originalProducts = ref([]);
    const searchInput = ref("");
    const minPriceFilter = ref(100000); // Minimum price filter
    const maxPriceFilter = ref(2000000); // Maximum price filter
    const defaultBrandValue = ref("");
    const defaultCategoryValue = ref("");
    const defaultVendorValue = ref("");
    const comparedProducts = ref([]);

    const formatToRupiah = (price) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
    };

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
          `${apiBaseUrl}buyer/product`,
          config
        );

        response.data.products.forEach((product) => {
          product.price = parseFloat(product.price);
        });

        products.value = response.data.products;
        originalProducts.value = response.data.products;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push("/"); // Redirect to home if unauthorized
        } else {
          console.log("Error fetching data: ", error);
        }
      }
    };

    getProducts();

    const filteredProducts = computed(() => {
      return products.value.filter((product) =>
        product.name.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    });

    const openFilterPanel = () => {
      const uniqueBrands = getUniqueBrands();
      const uniqueCategories = getUniqueCategories();
      const uniqueVendors = getUniqueVendors();
      let brandFilter = defaultBrandValue.value;
      let categoryFilter = defaultCategoryValue.value;
      let vendorFilter = defaultVendorValue.value;

      Swal.fire({
        title: "Filter Options",
        html: `
  <label for="priceRange">Price Range: <span id="priceRangeValue">${formatToRupiah(
          minPriceFilter.value
        )} - ${formatToRupiah(maxPriceFilter.value)}</span></label>
  <br><br>
  <input type="number" id="minPriceFilter" name="minPriceFilter" min="100000" max="2000000" value="${minPriceFilter.value
        }">
  <input type="number" id="maxPriceFilter" name="maxPriceFilter" min="100000" max="2000000" value="${maxPriceFilter.value
        }">
  <br><br>
  <select id="brandFilter" name="brandFilter">
    <option value="">${brandFilter ? "Show All Brands" : "Select Brand"
        }</option>
    ${uniqueBrands
          .map((brand) => `<option value="${brand}">${brand}</option>`)
          .join("")}
  </select>
  <br><br>
  <select id="categoryFilter" name="categoryFilter">
    <option value="">${categoryFilter ? "Show All Categories" : "Select Category"
        }</option>
    ${uniqueCategories
          .map((category) => `<option value="${category}">${category}</option>`)
          .join("")}
  </select>
  <select id="vendorFilter" name="vendorFilter">
    <option value="">${vendorFilter ? "Show All Vendors" : "Select Vendor"
        }</option>
    ${uniqueVendors
          .map(
            (vendor_name) =>
              `<option value="${vendor_name}">${vendor_name}</option>`
          )
          .join("")}
  </select>
`,
        showCancelButton: true,
        confirmButtonText: "Apply Filters",
        didOpen: () => {
          const minPriceFilterInput = document.getElementById("minPriceFilter");
          minPriceFilterInput.addEventListener("input", () => {
            minPriceFilter.value = minPriceFilterInput.value;
            updatePriceRangeValue();
          });

          const maxPriceFilterInput = document.getElementById("maxPriceFilter");
          maxPriceFilterInput.addEventListener("input", () => {
            maxPriceFilter.value = maxPriceFilterInput.value;
            updatePriceRangeValue();
          });

          const brandFilterInput = document.getElementById("brandFilter");
          brandFilterInput.value = brandFilter;
          brandFilterInput.addEventListener("change", () => {
            brandFilter = brandFilterInput.value;
          });

          const categoryFilterInput = document.getElementById("categoryFilter");
          categoryFilterInput.value = categoryFilter;
          categoryFilterInput.addEventListener("change", () => {
            categoryFilter = categoryFilterInput.value;
          });

          const vendorFilterInput = document.getElementById("vendorFilter");
          vendorFilterInput.value = vendorFilter;
          vendorFilterInput.addEventListener("change", () => {
            vendorFilter = vendorFilterInput.value;
          });
        },
      }).then((result) => {
        if (result.isConfirmed) {
          applyFilters(brandFilter, categoryFilter, vendorFilter);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          resetFilters();
        }
      });
    };

    const applyFilters = (brandFilter, categoryFilter, vendorFilter) => {
      if (parseFloat(minPriceFilter.value) > parseFloat(maxPriceFilter.value)) {
        const temp = minPriceFilter.value;
        minPriceFilter.value = maxPriceFilter.value;
        maxPriceFilter.value = temp;
      }

      products.value = originalProducts.value.filter((product) => {
        const productPrice = parseFloat(product.price);
        const passPriceFilter =
          productPrice >= parseFloat(minPriceFilter.value) &&
          productPrice <= parseFloat(maxPriceFilter.value);
        const passBrandFilter = !brandFilter || product.brand === brandFilter;
        const passCategoryFilter =
          !categoryFilter || product.category === categoryFilter;
        const passVendorFilter =
          !vendorFilter || product.vendor_name === vendorFilter;
        return (
          passPriceFilter &&
          passBrandFilter &&
          passCategoryFilter &&
          passVendorFilter
        );
      });
    };

    const resetFilters = () => {
      const brandFilterInput = document.getElementById("brandFilter");
      brandFilterInput.value = "";

      const categoryFilterInput = document.getElementById("categoryFilter");
      categoryFilterInput.value = "";

      const vendorFilterInput = document.getElementById("vendorFilter");
      vendorFilterInput.value = "";

      searchInput.value = "";
      products.value = originalProducts.value;
    };

    const updatePriceRangeValue = () => {
      document.getElementById("priceRangeValue").innerText =
        formatToRupiah(minPriceFilter.value) +
        " - " +
        formatToRupiah(maxPriceFilter.value);
    };

    const getUniqueBrands = () => {
      const uniqueBrands = [
        ...new Set(originalProducts.value.map((product) => product.brand)),
      ];
      return uniqueBrands;
    };

    const getUniqueVendors = () => {
      const uniqueVendors = [
        ...new Set(
          originalProducts.value.map((product) => product.vendor_name)
        ),
      ];
      return uniqueVendors;
    };

    const getUniqueCategories = () => {
      const uniqueCategories = [
        ...new Set(originalProducts.value.map((product) => product.category)),
      ];
      return uniqueCategories;
    };

    const addToCompare = (product) => {
      if (comparedProducts.value.length < 2) {
        comparedProducts.value.push(product);
        if (comparedProducts.value.length === 2) {
          Swal.fire({
            title: "Compare Products",
            html: `
        <p>You have selected 2 products for comparison:</p>
        <ul>
          <li>${comparedProducts.value[0].name}</li>
          <li>${comparedProducts.value[1].name}</li>
        </ul>
      `,
            icon: "info",
            confirmButtonText: "Compare",
            showCancelButton: true,
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Comparison Result",
                html: `
                <div class="comparison-details" style="display: flex; flex-direction: row;">
                <div class="product" style="padding: 10px;">
                  <img src="data:image/png;base64,${comparedProducts.value[0].images[0].base64_image}" alt="${comparedProducts.value[0].name}" class="product-thumbnail" style="width: 250px; height: 200px;">
                  <div class="product-details">
                    <p class="product-title">${comparedProducts.value[0].name}</p>
                    <p class="product-price">Price: Rp.${comparedProducts.value[0].price}</p>
                    <p class="product-rating">Brand: ${comparedProducts.value[0].brand}</p>
                  </div>
                </div>
                <div class="product" style="padding: 10px;">
                  <img src="data:image/png;base64,${comparedProducts.value[1].images[0].base64_image}" alt="${comparedProducts.value[1].name}" class="product-thumbnail" style="width: 250px; height: 200px;">
                  <div class="product-details">
                    <p class="product-title">${comparedProducts.value[1].name}</p>
                    <p class="product-price">Price: Rp.${comparedProducts.value[1].price}</p>
                    <p class="product-rating">Brand: ${comparedProducts.value[1].brand}</p>
                  </div>
                </div>
              </div>
          `,
                icon: "info",
                confirmButtonText: "OK",
                showCloseButton: true,
                customClass: {
                  container: "comparison-container",
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  comparedProducts.value = [];
                }
              });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              comparedProducts.value = [];
            }
          });
        }
      } else {
        Swal.fire("Error", "You can only compare up to 2 products", "error");
      }
    };

    return {
      products,
      searchInput,
      filteredProducts,
      openFilterPanel,
      addToCompare,
      formatToRupiah,
      minPriceFilter,
      maxPriceFilter,
    };
  },
});
</script>

<style scoped>
.container-box {
  border-radius: 8px;
  overflow: hidden;
}

.container-box-1 {
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
