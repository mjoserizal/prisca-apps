<template>
  <form
    @submit.prevent="submitProduct"
    class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row m-6"
  >
    <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
      <div class="mb-4">
        <label
          for="large-product-image"
          class="block mb-2 text-sm font-medium text-gray-600"
        >
          Large Product Image:
        </label>
        <div
          class="mt-2 flex justify-center rounded-lg border border-dashed shadow-md border-gray-300 px-6 py-10"
        >
          <div class="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mx-auto h-12 w-12 text-gray-400"
            >
              <path
                d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"
              />
              <line x1="16" x2="22" y1="5" y2="5" />
              <line x1="19" x2="19" y1="2" y2="8" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>

            <div class="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                for="large-product-image"
                class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload Large Image</span>
                <input
                  type="file"
                  id="large-product-image"
                  name="large-product-image"
                  @change="onLargeFileChange"
                  class="sr-only"
                />
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>
      <!-- Tiga kotak input gambar yang lebih kecil -->
      <div class="flex flex-wrap mb-2 -mx-2">
        <div class="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <div class="mb-4">
            <label
              for="product-image1"
              class="block mb-2 text-sm font-medium text-gray-600"
            >
              Upload Image 1:
            </label>
            <div
              class="mt-2 flex justify-center shadow-md rounded-lg border border-dashed border-gray-300 px-6 py-10"
            >
              <div class="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mx-auto h-12 w-12 text-gray-400"
                >
                  <path
                    d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"
                  />
                  <line x1="16" x2="22" y1="5" y2="5" />
                  <line x1="19" x2="19" y1="2" y2="8" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>

                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    for="product-image1"
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload Image 1</span>
                    <input
                      type="file"
                      id="product-image1"
                      name="product-image1"
                      @change="onFileChange"
                      class="sr-only"
                    />
                  </label>
                </div>
                <p class="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Repeat for Image 2 and Image 3 -->
        <div class="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <div class="mb-4">
            <label
              for="product-image2"
              class="block mb-2 text-sm font-medium text-gray-600"
            >
              Upload Image 2:
            </label>
            <div
              class="mt-2 flex justify-center rounded-lg border shadow-md border-dashed border-gray-300 px-6 py-10"
            >
              <div class="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mx-auto h-12 w-12 text-gray-400"
                >
                  <path
                    d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"
                  />
                  <line x1="16" x2="22" y1="5" y2="5" />
                  <line x1="19" x2="19" y1="2" y2="8" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>

                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    for="product-image2"
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload Image 2</span>
                    <input
                      type="file"
                      id="product-image2"
                      name="product-image2"
                      @change="onFileChange"
                      class="sr-only"
                    />
                  </label>
                </div>
                <p class="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <div class="mb-4">
            <label
              for="product-image3"
              class="block mb-2 text-sm font-medium text-gray-600"
            >
              Upload Image 3:
            </label>
            <div
              class="mt-2 flex justify-center rounded-lg shadow-md border border-dashed border-gray-300 px-6 py-10"
            >
              <div class="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mx-auto h-12 w-12 text-gray-400"
                >
                  <path
                    d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"
                  />
                  <line x1="16" x2="22" y1="5" y2="5" />
                  <line x1="19" x2="19" y1="2" y2="8" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>

                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    for="product-image3"
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload Image 3</span>
                    <input
                      type="file"
                      id="product-image3"
                      name="product-image3"
                      @change="onFileChange"
                      class="sr-only"
                    />
                  </label>
                </div>
                <p class="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
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
        name: "",
        group: "",
        category: "",
        brand: "",
        categoryName: "",
      },
    };
  },
  methods: {
    onLargeFileChange(event) {
      // Handle large image file change here
    },
    onFileChange(event) {
      // Handle image file change here
    },
    submitProduct() {
      // Submit product data here
    },
  },
};
</script>

<style>
form {
  padding: 2rem; /* Ubah sesuai kebutuhan */
  border-radius: 0.5rem; /* Ubah sesuai kebutuhan */
}
</style>
