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
</script>

<style scoped>
/* Tambahkan style scoped untuk mencegah dampak CSS ke elemen lain */
</style>
