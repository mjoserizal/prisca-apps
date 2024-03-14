<template>
  <!-- Basic Information -->
  <div class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row">
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
              v-if="previewImages['large-product-image']"
              :src="previewImages['large-product-image']"
              alt="Preview"
              class="h-auto w-auto object-cover mb-4"
            />
            <i
              class="fa-regular fa-image mx-auto text-4xl text-gray-400 hover:text-indigo-500"
            ></i>

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
                  @change="onImageChange('large-product-image', $event)"
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
                  v-if="previewImages['product-image1']"
                  :src="previewImages['product-image1']"
                  alt="Preview"
                  class="h-auto w-auto object-cover mb-4"
                />
                <i
                  class="fa-regular fa-image mx-auto text-4xl text-gray-400 hover:text-indigo-500"
                ></i>
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
                      @change="onImageChange('product-image1', $event)"
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
                  v-if="previewImages['product-image2']"
                  :src="previewImages['product-image2']"
                  alt="Preview"
                  class="h-auto w-auto object-cover mb-4"
                />
                <i
                  class="fa-regular fa-image mx-auto text-4xl text-gray-400 hover:text-indigo-500"
                ></i>

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
                      @change="onImageChange('product-image2', $event)"
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
                  v-if="previewImages['product-image3']"
                  :src="previewImages['product-image3']"
                  alt="Preview"
                  class="h-auto w-auto object-cover mb-4"
                />
                <i
                  class="fa-regular fa-image mx-auto text-4xl text-gray-400 hover:text-indigo-500"
                ></i>

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
                      @change="onImageChange('product-image3', $event)"
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
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicInformation",
  data() {
    return {
      products: {
        name: "",
        group: "",
        category: "",
        brand: "",
        product_category_name: "",
        staus: "",
        images: {
          "large-product-image": "",
          "product-image1": "",
          "product-image2": "",
          "product-image3": "",
        },
        detail: {
          productSpecification: "",
          technicalSpecification: "",
          feature: "",
          partNumber: "",
          satuan: "",
          video: "",
          condition: "",
        },
        commercial_info: {
          commercialInfo: {
            grosirToggle: false,
            enablecontract: false,
            preOrder: false,
            price: "",
            currency_id: "",
            etalase_id: "",
            payment_terms: "",
            discount: "",
            price_exp: "",
            stock: "",
            pre_order: "",
            contract: "",
            purchase_q_t_y: {
              min: "",
              max: "",
            },
            grosir: {
              qty: "",
              price: "",
            },
          },
        },
        other: {
          incomterm: "",
          warranty: "",
          maintenance: "",
          sku: "",
          tags: "",
          makeActive: false,
        },
      },

      groups: [],
      categories: [],
      etalases: [],
      currencies: [],
      previewImages: {
        "large-product-image": "",
        "product-image1": "",
        "product-image2": "",
        "product-image3": "",
      },
    };
  },
};
</script>

<style>
form {
  padding: 2rem; /* Ubah sesuai kebutuhan */
  border-radius: 0.5rem; /* Ubah sesuai kebutuhan */
}
</style>
