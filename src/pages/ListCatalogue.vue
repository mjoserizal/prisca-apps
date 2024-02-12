<template>
  <div class="max-w-4xl mx-auto">
    <div class="p-4">
      <div class="bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold mb-4">Product List</h1>
        <div class="flex justify-between items-center mb-4">
          <div class="relative flex-grow mr-4">
            <input
              type="text"
              placeholder="Search..."
              class="w-1/2 border rounded-l-md p-2 pr-10"
            />
          </div>
          <button
            class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
            @click="advanceSearch"
          >
            Advance Search
          </button>
          <button
            class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            @click="addNewProduct"
          >
            + Add New Product
          </button>
        </div>
        <table class="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th class="border px-4 py-2">NAME</th>
              <th class="border px-4 py-2">PRODUCT GROUP</th>
              <th class="border px-4 py-2">PRICE</th>
              <th class="border px-4 py-2">STATUS</th>
              <th class="border px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.name">
              <td class="border px-4 py-2">{{ product.name }}</td>
              <td class="border px-4 py-2">{{ product.productGroup }}</td>
              <td class="border px-4 py-2">{{ product.price }}</td>
              <td class="border px-4 py-2">
                <span
                  :class="
                    product.status === 'Active'
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                  >{{ product.status }}</span
                >
              </td>
              <td class="border px-4 py-2">
                <button
                  class="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 mr-2"
                >
                  P
                </button>
                <button
                  class="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                >
                  ²
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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

const search = () => {
  // Tambahkan logika untuk search di sini
};

const advanceSearch = () => {
  // Tambahkan logika untuk Advance Search di sini
};

const addNewProduct = () => {
  // Tambahkan logika untuk menambah produk baru di sini
};
</script>

<style scoped>
/* Tambahkan style scoped untuk mencegah dampak CSS ke elemen lain */
</style>
