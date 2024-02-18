<template>
  <div class="w-full">
    <div class="p-4">
      <q-card
        class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
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
            row-key="name"
            :filter="filter"
          >
            <template v-slot:top-right>
              <div class="flex items-center">
                <q-input
                  v-model="filter"
                  filled
                  borderless
                  dense
                  debounce="300"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-btn
                  v-if="!show_filter"
                  icon="filter_list"
                  class="q-ml-sm"
                  @click="show_filter = !show_filter"
                  flat
                />
                <q-btn
                  icon="settings"
                  class="q-ml-sm"
                  flat
                  @click="openAdvanceSearch"
                >
                  Advance Search
                </q-btn>
              </div>
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
                <q-btn
                  round
                  dense
                  flat
                  color="primary"
                  icon="edit"
                  @click="editProduct(props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
    <!-- Popup untuk Advance Search -->
    <q-dialog v-model="show_advance_search" persistent>
      <q-card style="width: 600px">
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
            <div class="col">
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
          <q-slider
            filled
            label="Price Range"
            v-model="priceRange"
            :min="0"
            :max="2000"
            step="10"
          ></q-slider>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn label="Search" type="submit" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const products = ref([
  {
    name: "DELL 391-2299",
    productGroup: "Electronics",
    price: "IDR 50.000.000",
    status: "Active",
  },
  {
    name: "Macbook Pro 13",
    productGroup: "Electronics",
    price: "IDR 50.000.000",
    status: "Active",
  },
  {
    name: "ASUS Vivobook",
    productGroup: "Electronics",
    price: "IDR 50.000.000",
    status: "Inactive",
  },
  {
    name: "ASUS Vivobook",
    productGroup: "Electronics",
    price: "IDR 50.000.000",
    status: "Inactive",
  },
  {
    name: "ASUS Vivobook",
    productGroup: "Electronics",
    price: "IDR 50.000.000",
    status: "Inactive",
  },
  {
    name: "ASUS Vivobook",
    productGroup: "Electronics",
    price: "IDR 50.000.000",
    status: "Inactive",
  },
]);

const filter = ref("");
const show_filter = ref(false);
const show_advance_search = ref(false);
const priceRange = ref(500);
const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

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
    name: "productGroup",
    align: "center",
    label: "Product Group",
    field: "productGroup",
    sortable: true,
  },
  { name: "price", label: "Price", field: "price", sortable: true },
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

const editProduct = (product) => {
  console.log("Edit product:", product);
};

const openAdvanceSearch = () => {
  show_advance_search.value = true;
};

const onSubmitAdvanceSearch = () => {
  // Handle advance search submission
  console.log("Advance search submitted");
};
</script>

<style scoped>
/* Tambahkan style scoped untuk mencegah dampak CSS ke elemen lain */
</style>
