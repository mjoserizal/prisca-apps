<template>
  <div class="w-full">
    <div class="p-6">
      <q-card class="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
        <q-card-section>
          <div class="text-h6 text-grey-8">Product List</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-pa-none">
          <q-table square class="no-shadow" :rows="filteredProducts" :columns="columns" row-key="id"
            :loading="loadingProducts">
            <template v-slot:top>
              <q-toolbar class="q-gutter-md" style="flex-wrap: wrap">
                <div class="row items-center q-gutter-md">
                  <q-btn label="Add Product" color="primary" class="q-mb-md" to="addproduct" exact />
                </div>

                <q-space />
                <div class="row items-center q-gutter-md">
                  <q-input outlined dense v-model="searchInput" placeholder="Search product..." class="search-input" />
                  <q-btn color="indigo" @click="openFilterPanel" class="filter-button">
                    <i class="fa-solid fa-arrow-down-wide-short" style="padding-right: 10px"></i>
                    Filter
                  </q-btn>
                </div>
              </q-toolbar>
            </template>

            <template v-slot:body-cell-price="props">
              <q-td :props="props">
                {{ formatToRupiah(props.row.price) }}
              </q-td>
            </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <span :class="{
            'text-green-500': props.row.status === 'active',
            'text-red-500': props.row.status === 'inactive',
          }">
                  <template v-if="props.row.status === 'active'">
                    <q-icon name="fiber_manual_record" class="q-mr-xs" style="
                        font-size: 8px;
                        vertical-align: middle;
                        color: green;
                      " />
                    Active
                  </template>
                  <template v-else>
                    <q-icon name="fiber_manual_record" class="q-mr-xs"
                      style="font-size: 8px; vertical-align: middle; color: red" />
                    Inactive
                  </template>
                </span>
              </q-td>
            </template>

            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <div class="flex justify-end">
                  <q-btn round dense flat color="primary" icon="edit" @click="editProduct(props.row)" />
                  <q-btn round dense flat color="danger" icon="delete" text-color="red"
                    @click="confirmDeleteProduct(props.row)" />
                </div>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
const router = useRouter();

const products = ref([]);
const originalProducts = ref([]);
const searchInput = ref("");
const minPriceFilter = ref(100000);
const maxPriceFilter = ref(2000000);
const defaultBrandValue = ref("");
const defaultCategoryValue = ref("");
const loadingProducts = ref(true);

const columns = [
  {
    name: "name",
    required: true,
    label: "Product Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "group",
    align: "center",
    label: "Product Group",
    field: "group",
    sortable: true,
  },
  {
    name: "price",
    align: "center",
    label: "Price",
    field: "price",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
  },
  {
    name: "action",
    label: "Action",
    align: "right",
    field: "action",
  },
];

onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found.");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${apiBaseUrl}vendor/product`, config);
    if (response.data.success) {
      products.value = response.data.products.map((product) => ({
        id: product.id,
        name: product.name,
        group: product.group,
        category: product.category,
        brand: product.brand,
        price: parseFloat(product.commercial_info.commercialInfo.price),
        status: product.status,
      }));
      originalProducts.value = products.value;
      loadingProducts.value = false;
    } else {
      loadingProducts.value = false;
      console.error("Failed to fetch products:", response.data.message);
    }
  } catch (error) {
    loadingProducts.value = false;
    console.error("Failed to fetch products:", error);
  }
});

const editProduct = (product) => {
  console.log("Edit product:", product);
  router.push({ name: "editProduct", params: { id: product.id } });
};

const confirmDeleteProduct = (product) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteProduct(product);
    }
  });
};

const deleteProduct = async (product) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found.");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${apiBaseUrl}vendor/product/${product.id}`,
      config
    );
    if (response.data.success) {
      products.value = products.value.filter((p) => p.id !== product.id);
      Swal.fire("Deleted!", "Your product has been deleted.", "success");
    } else {
      console.error("Failed to delete product:", response.data.message);
    }
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
};

const loading = ref(true);


const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
});

const formatToRupiah = (price) => {
  if (isNaN(price)) {
    return "Invalid Price";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const openFilterPanel = () => {
  const uniqueBrands = getUniqueBrands();
  const uniqueCategories = getUniqueCategories();
  let brandFilter = defaultBrandValue.value;
  let categoryFilter = defaultCategoryValue.value;

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
    `,
    showCancelButton: true,
    confirmButtonText: "Filter",
    cancelButtonText: "Reset",
    preConfirm: () => {
      const minPrice = parseInt(
        Swal.getPopup().querySelector("#minPriceFilter").value
      );
      const maxPrice = parseInt(
        Swal.getPopup().querySelector("#maxPriceFilter").value
      );
      brandFilter = Swal.getPopup().querySelector("#brandFilter").value;
      categoryFilter = Swal.getPopup().querySelector("#categoryFilter").value;
      return { minPrice, maxPrice, brandFilter, categoryFilter };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { minPrice, maxPrice, brandFilter, categoryFilter } = result.value;
      minPriceFilter.value = minPrice;
      maxPriceFilter.value = maxPrice;
      defaultBrandValue.value = brandFilter;
      defaultCategoryValue.value = categoryFilter;
      applyFilters();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Reset filters to default values
      minPriceFilter.value = 100000;
      maxPriceFilter.value = 2000000;
      defaultBrandValue.value = "";
      defaultCategoryValue.value = "";
      applyFilters();
    }
  });

  const minPriceInput = Swal.getPopup().querySelector("#minPriceFilter");
  const maxPriceInput = Swal.getPopup().querySelector("#maxPriceFilter");

  minPriceInput.addEventListener("input", updatePriceRangeValue);
  maxPriceInput.addEventListener("input", updatePriceRangeValue);
};

const applyFilters = () => {
  const filtered = originalProducts.value.filter((product) => {
    const priceInRange =
      product.price >= minPriceFilter.value &&
      product.price <= maxPriceFilter.value;
    const brandMatch =
      defaultBrandValue.value === "" ||
      product.brand === defaultBrandValue.value;
    const categoryMatch =
      defaultCategoryValue.value === "" ||
      product.category === defaultCategoryValue.value;
    return priceInRange && brandMatch && categoryMatch;
  });
  products.value = filtered;
};

const getUniqueBrands = () => {
  const brands = originalProducts.value.map((product) => product.brand);
  return Array.from(new Set(brands));
};

const getUniqueCategories = () => {
  const categories = originalProducts.value.map((product) => product.category);
  return Array.from(new Set(categories));
};

const updatePriceRangeValue = () => {
  const minPrice = parseInt(
    Swal.getPopup().querySelector("#minPriceFilter").value
  );
  const maxPrice = parseInt(
    Swal.getPopup().querySelector("#maxPriceFilter").value
  );
  const priceRangeValue = Swal.getPopup().querySelector("#priceRangeValue");
  priceRangeValue.textContent = `${formatToRupiah(minPrice)} - ${formatToRupiah(
    maxPrice
  )}`;
};
</script>
<script>
export default {
  name: "ListCatalogue",
};
</script>

<style>
.search-input {
  margin-bottom: 10px;
  max-width: 200px;
}

.filter-button {
  margin-bottom: 10px;
  white-space: nowrap;
}
</style>
