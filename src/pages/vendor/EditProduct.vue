<template>
  <div class="w-full">
    <div class="p-4">
      <div class="shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 bg-white sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Edit Product
          </h3>
          <div class="mt-2 max-w-xl text-sm text-gray-500">
            Fill in the details below to edit the product.
          </div>

          <div class="mt-5">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Product Name</label
            >
            <input
              type="text"
              id="name"
              v-model="editedProduct.title"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="mt-5">
            <label
              for="description"
              class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              id="description"
              v-model="editedProduct.description"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            ></textarea>
          </div>

          <div class="mt-5">
            <label for="price" class="block text-sm font-medium text-gray-700"
              >Price</label
            >
            <input
              type="text"
              id="price"
              v-model="editedProduct.price"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="mt-5">
            <label for="brand" class="block text-sm font-medium text-gray-700"
              >Brand</label
            >
            <input
              type="text"
              id="brand"
              v-model="editedProduct.brand"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div class="mt-5">
            <button
              @click="saveChanges"
              class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const editedProduct = ref({
  id: "",
  title: "",
  description: "",
  price: "",
  brand: "",
});

const route = useRoute();

onMounted(async () => {
  const productId = route.params.id;
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/${productId}`
    );
    const productData = response.data;
    editedProduct.value = {
      id: productData.id,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      brand: productData.brand,
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
});

const saveChanges = () => {
  console.log("Saving changes:", editedProduct.value);
};
</script>

<style scoped>
/* Tambahkan style scoped untuk mencegah dampak CSS ke elemen lain */
</style>
