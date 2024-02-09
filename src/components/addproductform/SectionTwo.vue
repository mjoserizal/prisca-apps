<!-- Bagian kedua dengan input -->
<template>
  <form
    @submit.prevent="submitProduct"
    class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row m-6"
  >
    <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
      <!-- Input Product Specification -->
      <div class="mb-4" style="max-height: 200px; overflow-y: auto">
        <label
          for="product-specification"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Product Specification:</label
        >
        <textarea
          id="product-specification"
          name="product-specification"
          v-model="product.productSpecification"
          rows="5"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <!-- Input Feature -->
      <div class="mb-4">
        <label
          for="feature"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Feature:</label
        >
        <input
          type="text"
          id="feature"
          name="feature"
          v-model="product.feature"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Input Satuan -->
      <div class="mb-4">
        <label for="satuan" class="block mb-2 text-sm font-medium text-gray-600"
          >Satuan:</label
        >
        <input
          type="text"
          id="satuan"
          name="satuan"
          v-model="product.satuan"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Input Kondisi -->
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-600"
          >Condition:</label
        >
        <div class="flex items-center">
          <input
            type="checkbox"
            id="condition-new"
            name="condition-new"
            v-model="product.condition.new"
            class="mr-1"
          />
          <label for="condition-new" class="mr-4">New</label>
          <input
            type="checkbox"
            id="condition-used"
            name="condition-used"
            v-model="product.condition.used"
            class="mr-1"
          />
          <label for="condition-used">Used</label>
        </div>
      </div>
    </div>
    <div class="flex-1 pl-0 md:pl-4">
      <!-- Input Technical Spec -->
      <div class="mb-4">
        <label
          for="technical-spec"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Technical Spec:</label
        >
        <textarea
          id="technical-spec"
          name="technical-spec"
          v-model="product.technicalSpec"
          rows="5"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <!-- Input Part Number -->
      <div class="mb-4">
        <label
          for="part-number"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Part Number:</label
        >
        <input
          type="text"
          id="part-number"
          name="part-number"
          v-model="product.partNumber"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Input Video -->
      <div class="mb-4">
        <label for="video" class="block mb-2 text-sm font-medium text-gray-600"
          >Video:</label
        >
        <input
          type="file"
          id="video"
          name="video"
          accept="video/*"
          @change="onVideoChange"
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
        productSpecification: "",
        feature: "",
        satuan: "",
        condition: {
          new: false,
          used: false,
        },
        technicalSpec: "",
        partNumber: "",
        video: "",
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
  border-radius: 0.5rem; /* Ubah sesuai kebutuhan */
}
</style>
