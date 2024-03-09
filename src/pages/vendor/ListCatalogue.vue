<template>
  <div class="w-full">
    <div class="p-6">
      <q-card
        class="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg"
        bordered
      >
        <q-card-section>
          <div class="text-h6 text-grey-8">Product List</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-pa-none">
          <q-table
            square
            class="no-shadow"
            :rows="products"
            :columns="columns"
            row-key="id"
            :filter="filter"
          >
            <template v-slot:top>
              <q-toolbar class="q-gutter-md" style="flex-wrap: wrap">
                <q-btn
                  label="Add Product"
                  color="primary"
                  class="q-mb-md"
                  to="/addinfo"
                  exact
                />

                <q-space />

                <q-input
                  v-model="filter"
                  filled
                  borderless
                  dense
                  debounce="300"
                  placeholder="Search"
                  class="q-mb-md"
                  style="flex-grow: 1; max-width: 200px"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>

                <q-btn
                  icon="settings"
                  flat
                  @click="openAdvanceSearch"
                  class="q-mb-md"
                >
                  Advance Search
                </q-btn>
              </q-toolbar>
            </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <span
                  :class="{
                    'text-green-500': props.row.status === 'Active',
                    'text-red-500': props.row.status === 'Inactive',
                  }"
                  >{{ props.row.status }}</span
                >
              </q-td>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <div class="flex justify-end">
                  <q-btn
                    round
                    dense
                    flat
                    color="primary"
                    icon="edit"
                    @click="editProduct(props.row)"
                  />
                  <q-btn
                    round
                    dense
                    flat
                    color="danger"
                    icon="delete"
                    @click="deleteProduct(props.row)"
                  />
                </div>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
    <!-- Popup untuk Advance Search -->
    <q-dialog v-model="show_advance_search" persistent>
      <q-card style="width: 600px">
        <q-form @submit="onSubmitAdvanceSearch">
          <q-card-section class="row items-center justify-between">
            <q-space />
            <q-btn
              icon="close"
              flat
              round
              dense
              v-close-popup
              class="text-grey-8"
            />
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <div class="row">
              <div class="col pr-4">
                <q-select
                  filled
                  label="Product Group"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                ></q-select>
              </div>
              <div class="col pr-4">
                <q-select
                  filled
                  label="Category"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                ></q-select>
              </div>
              <div class="col">
                <q-select
                  filled
                  emit-value
                  map-options
                  label="Status"
                  :options="statusOptions"
                ></q-select>
              </div>
            </div>
            <q-input filled label="Min Price" type="number"></q-input>
            <q-input filled label="Max Price" type="number"></q-input>
            <q-range
              class="pr-4"
              filled
              label="Price Range"
              v-model="priceRange"
              :min="0"
              :max="2000"
              step="10"
            ></q-range>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn label="Search" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const products = ref([]);
const filter = ref("");
const show_filter = ref(false);
const show_advance_search = ref(false);
const priceRange = ref(500);
const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const searchParams = ref({
  productGroup: "",
  category: "",
  status: "",
  minPrice: null,
  maxPrice: null,
});

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
    format: (val, row) => {
      return [
        {
          icon: "edit",
          label: "Edit",
          color: "primary",
          size: "sm",
          onClick: () => editProduct(row),
        },
        {
          icon: "delete",
          label: "Delete",
          color: "negative",
          size: "sm",
          onClick: () => deleteProduct(row),
        },
      ];
    },
  },
];

const editProduct = (product) => {
  console.log("Edit product:", product);
  router.push({ name: "editProduct", params: { id: product.id } });
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
      `http://192.168.1.25:8000/api/vendor/deleteProduct/${product.id}`,
      config
    );
    if (response.data.success) {
      // Hapus produk dari daftar setelah berhasil dihapus
      products.value = products.value.filter((p) => p.id !== product.id);
      console.log("Product deleted successfully:", product);
    } else {
      console.error("Failed to delete product:", response.data.message);
    }
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
};

const openAdvanceSearch = () => {
  show_advance_search.value = true;
};

const onSubmitAdvanceSearch = async () => {
  // Handle advance search submission
  show_advance_search.value = false; // Close the advance search dialog
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
    const response = await axios.get(
      "http://192.168.1.25:8000/api/vendor/show/productByUserId",
      {
        ...config,
        params: searchParams.value, // Pass search parameters as query parameters
      }
    );
    if (response.data.success) {
      products.value = response.data.products.map((product) => ({
        id: product.id,
        name: product.name,
        group: product.group,
        category: product.category,
        brand: product.brand,
        price: product.commercial_info.commercialInfo.price,
        status: product.status,
      }));
    } else {
      console.error("Failed to fetch products:", response.data.message);
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

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
    const response = await axios.get(
      "http://192.168.1.25:8000/api/vendor/show/productByUserId",
      config
    );
    if (response.data.success) {
      products.value = response.data.products.map((product) => ({
        id: product.id,
        name: product.name,
        group: product.group,
        category: product.category,
        brand: product.brand,
        price: product.commercial_info.commercialInfo.price,
        status: product.status,
      }));
    } else {
      console.error("Failed to fetch products:", response.data.message);
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});
</script>

<script>
export default {
  name: "ListCatalogue",
};
</script>
<style scoped>
.q-table tbody tr:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
</style>
