<template>
  <form
    @submit.prevent="submitProduct"
    class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row m-6"
  >
    <!-- Bagian kiri dengan input gambar -->
    <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
      <div class="mb-4">
        <label
          for="large-product-image"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Large Product Image:</label
        >
        <div class="mb-2">
          <input
            type="file"
            id="large-product-image"
            name="large-product-image"
            @change="onLargeFileChange"
            class="hidden"
          />
          <label
            for="large-product-image"
            class="block w-full h-32 bg-gray-200 border border-gray-300 rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-300"
          >
            Upload Large Image
          </label>
        </div>
      </div>
      <!-- Tiga kotak input gambar yang lebih kecil -->
      <div class="flex flex-wrap mb-2 -mx-2">
        <div class="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <input
            type="file"
            id="product-image1"
            name="product-image1"
            @change="onFileChange"
            class="hidden"
          />
          <label
            for="product-image1"
            class="block w-full h-24 bg-gray-200 border border-gray-300 rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-300"
          >
            Upload Image 1
          </label>
        </div>
        <div class="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <input
            type="file"
            id="product-image2"
            name="product-image2"
            @change="onFileChange"
            class="hidden"
          />
          <label
            for="product-image2"
            class="block w-full h-24 bg-gray-200 border border-gray-300 rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-300"
          >
            Upload Image 2
          </label>
        </div>
        <div class="w-full md:w-1/3 px-2">
          <input
            type="file"
            id="product-image3"
            name="product-image3"
            @change="onFileChange"
            class="hidden"
          />
          <label
            for="product-image3"
            class="block w-full h-24 bg-gray-200 border border-gray-300 rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-300"
          >
            Upload Image 3
          </label>
        </div>
      </div>
    </div>

    <!-- Bagian kanan dengan input dropdown -->
    <div class="flex-1 pl-0 md:pl-4">
      <div class="mb-4">
        <label
          for="product-name"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Product Name:</label
        >
        <input
          type="text"
          id="product-name"
          name="product-name"
          v-model="product.name"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div class="mb-4">
        <label
          for="product-group"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Product Group:</label
        >
        <select
          id="product-group"
          name="product-group"
          v-model="product.group"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Group</option>
          <option value="Group 1">Group 1</option>
          <option value="Group 2">Group 2</option>
          <option value="Group 3">Group 3</option>
        </select>
      </div>

      <div class="mb-4">
        <label
          for="product-category"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Product Category:</label
        >
        <select
          id="product-category"
          name="product-category"
          v-model="product.category"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Category</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </select>
      </div>

      <!-- Brand -->
      <div class="mb-4">
        <label for="brand" class="block mb-2 text-sm font-medium text-gray-600"
          >Brand:</label
        >
        <input
          type="text"
          id="brand"
          name="brand"
          v-model="product.brand"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Product Category Name -->
      <div class="mb-4">
        <label
          for="product-category-name"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Product Category Name:</label
        >
        <input
          type="text"
          id="product-category-name"
          name="product-category-name"
          v-model="product.categoryName"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      product: {
        image: null,
        name: "",
        group: "",
        category: "",
        brand: "",
        categoryName: "",
      },
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      // handle the file
    },
    onLargeFileChange(e) {
      const file = e.target.files[0];
      // handle the file
    },
    submitProduct() {
      // handle form submission
    },
  },
};
</script>

<style scoped>
form {
  padding: 2rem; /* Ubah sesuai kebutuhan */
  margin: 0 auto; /* Pusatkan form secara horizontal */
  border-radius: 0.5rem; /* Ubah sesuai kebutuhan */
}
</style>
