<template>
  <div class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row mt-6">
    <!-- Bagian kiri -->
    <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
      <!-- Input Price -->
      <div class="mb-4">
        <label for="price" class="block mb-2 text-sm font-medium text-gray-600"
          >Price:</label
        >
        <input
          type="text"
          id="price"
          name="price"
          v-model="products.commercial_info.commercialInfo.price"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Input Discount -->
      <div class="mb-4">
        <label
          for="discount"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Discount:</label
        >
        <input
          type="text"
          id="discount"
          name="discount"
          v-model="products.commercial_info.commercialInfo.discount"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Input Price Expiration Date -->
      <div class="mb-4">
        <label
          for="price-expiration-date"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Price Expiration Date:</label
        >
        <input
          type="date"
          id="price-expiration-date"
          name="price-expiration-date"
          v-model="products.commercial_info.commercialInfo.price_exp"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Input Etalase (Dropdown) -->
      <div class="mb-4">
        <label
          for="etalase"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Etalase:</label
        >
        <select
          id="etalase"
          name="etalase"
          v-model="products.commercial_info.commercialInfo.etalase_id"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Etalase</option>
          <option
            v-for="etalase in etalases"
            :key="etalase.id"
            :value="etalase.id"
          >
            {{ etalase.name }}
          </option>
        </select>
      </div>
      <!-- Input Grosir -->
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-600"
          >Grosir:</label
        >
        <div
          class="relative inline-block mr-2 align-middle select-none transition duration-200 ease-in"
        >
          <q-toggle
            v-model="products.commercial_info.commercialInfo.grosirToggle"
            color="primary"
            label="Grosir"
            :before="false"
          />
        </div>
      </div>
      <div
        v-if="products.commercial_info.commercialInfo.grosirToggle"
        class="mb-4 flex"
      >
        <div class="flex-1 mr-2">
          <label
            for="grosir-qty"
            class="block mb-2 text-sm font-medium text-gray-600"
            >Qty:</label
          >
          <input
            type="number"
            id="grosir-qty"
            name="grosir-qty"
            v-model="products.commercial_info.commercialInfo.grosir.qty"
            min="0"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="flex-1 ml-2">
          <label
            for="grosir-price"
            class="block mb-2 text-sm font-medium text-gray-600"
            >Price:</label
          >
          <input
            type="text"
            id="grosir-price"
            name="grosir-price"
            v-model="products.commercial_info.commercialInfo.grosir.price"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <!-- Input Pre-order -->
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-600"
          >Pre-order:</label
        >
        <div
          class="relative inline-block mr-2 align-middle select-none transition duration-200 ease-in"
        >
          <q-toggle
            v-model="products.commercial_info.commercialInfo.preOrder"
            color="primary"
            :before="false"
            label="Pre-Order"
          />
        </div>
      </div>
      <!-- Input Pre-order Days -->
      <div v-if="products.commercial_info.commercialInfo.preOrder" class="mb-4">
        <label
          for="pre-order-days"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Pre-order Days:</label
        >
        <input
          type="number"
          id="pre-order-days"
          name="pre-order-days"
          v-model="products.commercial_info.commercialInfo.pre_order"
          min="0"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    <!-- Bagian kanan -->
    <div class="flex-1 pl-0 md:pl-4">
      <!-- Input Currency (Dropdown) -->
      <div class="mb-4">
        <label
          for="currency"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Currency:</label
        >
        <select
          id="currency"
          name="currency"
          v-model="products.commercial_info.commercialInfo.currency_id"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Currency</option>
          <option
            v-for="currency in currencies"
            :key="currency.id"
            :value="currency.id"
          >
            {{ currency.name }} ( {{ currency.symbol }})
          </option>
        </select>
      </div>
      <!-- Input Payment Terms -->
      <div class="mb-4">
        <label
          for="payment-terms"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Payment Terms:</label
        >
        <input
          type="text"
          id="payment-terms"
          name="payment-terms"
          v-model="products.commercial_info.commercialInfo.payment_terms"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Input Purchase Quantity -->
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-600"
          >Purchase Quantity:</label
        >
        <!-- Bagian kiri untuk Minimum Purchase Quantity -->
        <div class="flex justify-between">
          <div class="w-1/2 pr-2">
            <label
              for="min-purchase-quantity"
              class="block mb-2 text-sm font-medium text-gray-600"
              >Minimum:</label
            >
            <input
              placeholder="0"
              type="number"
              id="min-purchase-quantity"
              name="min-purchase-quantity"
              v-model="
                products.commercial_info.commercialInfo.purchase_q_t_y.min
              "
              class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <!-- Bagian kanan untuk Maximum Purchase Quantity -->
          <div class="w-1/2 pl-2">
            <label
              for="max-purchase-quantity"
              class="block mb-2 text-sm font-medium text-gray-600"
              >Maximum:</label
            >
            <input
              placeholder="0"
              type="number"
              id="max-purchase-quantity"
              name="max-purchase-quantity"
              v-model="
                products.commercial_info.commercialInfo.purchase_q_t_y.max
              "
              class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <!-- Input Stock -->
      <div class="mb-4">
        <label for="stock" class="block mb-2 text-sm font-medium text-gray-600"
          >Stock:</label
        >
        <input
          type="number"
          id="stock"
          name="stock"
          v-model="products.commercial_info.commercialInfo.stock"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Input contract -->
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-600"
          >contract:</label
        >
        <div
          class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
        >
          <q-toggle
            v-model="products.commercial_info.commercialInfo.enablecontract"
            color="primary"
            label="Contract"
            :before="false"
            label-position="left"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>

<style>
form {
  padding: 2rem; /* Ubah sesuai kebutuhan */
  border-radius: 0.5rem; /* Ubah sesuai kebutuhan */
}
</style>
