<template>
  <!-- Others Information -->
  <div class="bg-white p-6 rounded-md shadow-md mt-6 flex flex-col md:flex-row">
    <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
      <!-- Bagian kiri -->
      <div>
        <!-- Input Incoterm -->
        <div class="relative mb-4">
          <label
            for="incoterm"
            class="block mb-2 text-sm font-medium text-gray-600"
            >Incoterm</label
          >
          <input
            type="text"
            id="incoterm"
            name="incoterm"
            v-model="products.other.incomterm"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <!-- Input Warranty -->
        <div class="relative mb-4">
          <label
            for="warranty"
            class="block mb-2 text-sm font-medium text-gray-600"
            >Warranty</label
          >
          <input
            type="number"
            id="warranty"
            name="warranty"
            v-model="products.other.warranty"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <!-- Input Maintenance -->
        <div class="relative mb-4">
          <label
            for="maintenance"
            class="block mb-2 text-sm font-medium text-gray-600"
            >Maintenance</label
          >
          <input
            type="number"
            id="maintenance"
            name="maintenance"
            v-model="products.other.maintenance"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <!-- Input Make Active in Catalogue (Switch) -->
        <div class="flex items-center mb-4">
          <label class="mr-2 text-sm font-medium text-gray-600"
            >Make Active in Catalogue</label
          >
          <div
            class="relative inline-block mr-2 align-middle select-none transition duration-200 ease-in"
          >
            <q-toggle
              v-model="products.other.makeActive"
              color="primary"
              label="Make Active in Catalogue"
              :before="false"
              label-position="left"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 pl-0 md:pl-4">
      <!-- Bagian kanan -->
      <div>
        <!-- Input SKU -->
        <div class="relative mb-4">
          <label for="sku" class="block mb-2 text-sm font-medium text-gray-600"
            >SKU</label
          >
          <input
            type="text"
            id="sku"
            name="sku"
            v-model="products.other.sku"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <!-- Input Tags -->
        <div class="relative mb-4">
          <label for="tags" class="block mb-2 text-sm font-medium text-gray-600"
            >Tags</label
          >
          <input
            type="text"
            id="tags"
            name="tags"
            v-model="products.other.tags"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OthersInfo",
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
