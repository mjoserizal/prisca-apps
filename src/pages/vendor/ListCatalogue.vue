<template>
  <div class="max-w-4xl mx-auto">
    <div class="p-4">
      <q-card class="no-shadow" bordered>
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
    format: (val) =>
      `<span class="${
        val === "Active" ? "text-green-500" : "text-red-500"
      }">${val}</span>`,
  },
];
</script>

<style scoped>
/* Tambahkan style scoped untuk mencegah dampak CSS ke elemen lain */
</style>
