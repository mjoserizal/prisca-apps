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
            <img
              v-if="products.images['large-product-image']"
              :src="products.images['large-product-image']"
              alt="Preview"
              class="h-auto w-auto object-cover mb-4"
            />
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
                  @update:model-value="
                    (val) => onImageChange('large-product-image', val)
                  "
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
                <img
                  v-if="products.images['product-image1']"
                  :src="products.images['product-image1']"
                  alt="Preview"
                  class="h-auto w-auto object-cover mb-4"
                />
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
                      @update:model-value="
                        (val) => onImageChange('product-image1', val)
                      "
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
                <img
                  v-if="products.images['product-image2']"
                  :src="products.images['product-image2']"
                  alt="Preview"
                  class="h-auto w-auto object-cover mb-4"
                />
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
                      @update:model-value="
                        (val) => onImageChange('product-image2', val)
                      "
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
                <img
                  v-if="products.images['product-image3']"
                  :src="products.images['product-image3']"
                  alt="Preview"
                  class="h-auto w-auto object-cover mb-4"
                />
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
                      @update:model-value="
                        (val) => onImageChange('product-image3', val)
                      "
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
          v-model="products.name"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div class="mb-4">
        <label
          for="product-group"
          class="block mb-2 text-sm font-medium text-gray-600"
        >
          Product Group:
        </label>
        <select
          id="product-group"
          name="product-group"
          v-model="products.group"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Group</option>
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.name }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label
          for="product-category"
          class="block mb-2 text-sm font-medium text-gray-600"
        >
          Product Category:
        </label>
        <select
          id="product-category"
          name="product-category"
          v-model="products.category"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
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
          v-model="products.brand"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          v-model="products.product_category_name"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div class="flex justify-end mt-4">
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "FormBasic",
  data() {
    return {
      products: {
        name: "",
        group: "",
        category: "",
        brand: "",
        product_category_name: "",
        images: {
          "large-product-image": "",
          "product-image1": "",
          "product-image2": "",
          "product-image3": "",
        },
      },
      groups: [],
      categories: [],
    };
  },
  created() {
    this.fetchDropdownData();
  },
  methods: {
    async fetchDropdownData() {
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
          "http://192.168.1.244:8000/api/vendor/show/drop",
          config
        );
        console.log(response.data);
        this.groups = response.data.data.groups;
        this.categories = response.data.data.categories;
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    },

    onImageChange(field, event) {
      const file = event.target.files[0];
      if (!file) return;

      // Simpan nama file saja
      this.products.images[field] = file.name;
      console.log(`${field}:`, file.name); // Tambahkan console log di sini
    },

    async submitProduct() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found.");
          return;
        }

        const formData = new FormData();
        formData.append("name", this.products.name);
        formData.append("group_id", this.products.group);
        formData.append("category_id", this.products.category);
        formData.append("brand", this.products.brand);
        formData.append(
          "product_category_name",
          this.products.product_category_name
        );

        // Tambahkan file ke FormData
        for (let key in this.products.images) {
          const file = document.querySelector(`input[name=${key}]`).files[0];
          if (file) {
            formData.append("image[]", file);
            console.log(`${key}:`, file.name); // Tambahkan console log di sini
          }
        }

        console.log("Data to be sent:");
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axios.post(
          "http://192.168.1.244:8000/api/vendor/addProduct2",
          formData,
          config
        );
        console.log("Response:", response.data);
        // Reset form after successful submission if needed
        this.products = {
          name: "",
          group: "",
          category: "",
          brand: "",
          product_category_name: "",
          images: {
            "large-product-image": "",
            "product-image1": "",
            "product-image2": "",
            "product-image3": "",
          },
        };
      } catch (error) {
        console.error("Failed to submit product:", error);
      }
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
