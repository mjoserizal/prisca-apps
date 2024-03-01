<!-- Bagian kedua dengan input -->
<template>
  <div class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row mt-6">
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
          v-model="products.detail.productSpecification"
          rows="5"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          v-model="products.detail.feature"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          v-model="products.detail.satuan"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Input Kondisi -->
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-600"
          >Condition:</label
        >
        <div class="flex items-center">
          <q-radio
            size="lg"
            v-model="products.detail.condition"
            val="new"
            class="mr-1"
            color="primary"
            unchecked-icon="radio_button_unchecked"
            checked-icon="radio_button_checked"
          />
          <label class="mr-4">New</label>
          <q-radio
            size="lg"
            v-model="products.detail.condition"
            val="used"
            class="mr-1"
            color="primary"
            unchecked-icon="radio_button_unchecked"
            checked-icon="radio_button_checked"
          />
          <label>Used</label>
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
          v-model="products.detail.technicalSpecification"
          rows="5"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          v-model="products.detail.partNumber"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  </div>
</template>
<script></script>

<style scoped>
form {
  padding: 2rem; /* Ubah sesuai kebutuhan */
  border-radius: 0.5rem; /* Ubah sesuai kebutuhan */
}
</style>
