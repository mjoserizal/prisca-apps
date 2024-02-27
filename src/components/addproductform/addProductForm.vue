<template>
  <form @submit.prevent="submitProduct">
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
          <label
            for="brand"
            class="block mb-2 text-sm font-medium text-gray-600"
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

    <div
      class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row mt-6"
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
          <label
            for="satuan"
            class="block mb-2 text-sm font-medium text-gray-600"
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
          <label
            for="video"
            class="block mb-2 text-sm font-medium text-gray-600"
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

    <div
      class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row mt-6"
    >
      <!-- Bagian kiri -->
      <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
        <!-- Input Price -->
        <div class="mb-4">
          <label
            for="price"
            class="block mb-2 text-sm font-medium text-gray-600"
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
        <div
          v-if="products.commercial_info.commercialInfo.preOrder"
          class="mb-4"
        >
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
          <label
            for="stock"
            class="block mb-2 text-sm font-medium text-gray-600"
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

    <div
      class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row mt-6"
    >
      <!-- Bagian kiri -->
      <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
        <!-- Input Incoterm -->
        <div class="relative mb-6">
          <input
            type="text"
            id="incoterm"
            name="incoterm"
            v-model="products.other.incomterm"
            class="block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label
            for="incoterm"
            class="absolute top-0 left-2 -mt-2 text-balance text-gray-800 bg-white px-1"
            >Incoterm</label
          >
        </div>
        <!-- Input Warranty -->
        <div class="relative mb-6">
          <input
            type="text"
            id="warranty"
            name="warranty"
            v-model="products.other.warranty"
            class="block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label
            for="warranty"
            class="absolute top-0 left-2 -mt-2 text-balance text-gray-800 bg-white px-1"
            >Warranty</label
          >
        </div>
        <!-- Input Maintenance -->
        <div class="relative mb-6">
          <input
            type="text"
            id="maintenance"
            name="maintenance"
            v-model="products.other.maintenance"
            class="block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label
            for="maintenance"
            class="absolute top-0 left-2 -mt-2 text-balance text-gray-800 bg-white px-1"
            >Maintenance</label
          >
        </div>
        <!-- Input Make Active in Catalogue (Switch) -->
        <div class="flex items-center mb-6">
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

      <!-- Bagian kanan -->
      <div class="flex-1 pl-0 md:pl-4">
        <!-- Input SKU -->
        <div class="relative mb-6">
          <input
            type="text"
            id="sku"
            name="sku"
            v-model="products.other.sku"
            class="block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label
            for="sku"
            class="absolute top-0 left-2 -mt-2 text-balance text-gray-800 bg-white px-1"
            >SKU</label
          >
        </div>

        <!-- Input Tags -->
        <div class="relative mb-6">
          <input
            type="text"
            id="tags"
            name="tags"
            v-model="products.other.tags"
            class="block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label
            for="sku"
            class="absolute top-0 left-2 -mt-2 text-balance text-gray-800 bg-white px-1"
            >Tags</label
          >
        </div>
        <!-- <div class="relative">
          <input
            type="text"
            v-model="tags"
            @keyup.enter="addTag"
            class="w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label
            for="tags"
            class="absolute top-0 left-2 -mt-2 text-balance text-gray-800 bg-white px-1"
          >
            Tags:
          </label>

          <div class="mt-2">
            <q-btn
              v-if="tags.trim()"
              @click="addTag"
              class="absolute top-1/3 right-2 px-3 py-1 bg-indigo-500 text-white rounded-md focus:outline-none hover:bg-indigo-600"
              label="Add"
            />
            <div class="mt-2">
              <q-chip
                v-for="(tag, index) in tags"
                :key="index"
                removable
                @remove="removeTag(index)"
                color="primary"
                text-color="white"
              >
                {{ tag }}
              </q-chip>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <button
        type="submit"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "addProductForm",
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
        this.etalases = response.data.data.etalases;
        this.currencies = response.data.data.currencies;
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

    onVideoChange(event) {
      const videoFile = event.target.files[0];
      if (videoFile) {
        this.products.detail.video = videoFile.name;
        console.log("Video:", videoFile.name); // Tambahkan console log di sini
      }
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
        formData.append(
          "productSpecification",
          this.products.detail.productSpecification
        );
        formData.append(
          "technicalSpecification",
          this.products.detail.technicalSpecification
        );
        formData.append("feature", this.products.detail.feature);
        formData.append("partNumber", this.products.detail.partNumber);
        formData.append("satuan", this.products.detail.satuan);
        formData.append("condition", this.products.detail.condition);
        formData.append(
          "price",
          this.products.commercial_info.commercialInfo.price
        );
        formData.append(
          "currency_id",
          this.products.commercial_info.commercialInfo.currency_id
        );
        formData.append(
          "etalase_id",
          this.products.commercial_info.commercialInfo.etalase_id
        );
        formData.append(
          "payment_terms",
          this.products.commercial_info.commercialInfo.payment_terms
        );
        formData.append(
          "discount",
          this.products.commercial_info.commercialInfo.discount
        );
        formData.append(
          "price_exp",
          this.products.commercial_info.commercialInfo.price_exp
        );
        formData.append(
          "stock",
          this.products.commercial_info.commercialInfo.stock
        );
        formData.append(
          "pre_order",
          this.products.commercial_info.commercialInfo.pre_order
        );
        formData.append(
          "contract",
          this.products.commercial_info.commercialInfo.enablecontract
            ? "yes"
            : "no"
        );
        formData.append(
          "min",
          this.products.commercial_info.commercialInfo.purchase_q_t_y.min
        );
        formData.append(
          "max",
          this.products.commercial_info.commercialInfo.purchase_q_t_y.max
        );
        formData.append(
          "qty",
          this.products.commercial_info.commercialInfo.grosir.qty
        );
        formData.append(
          "grosir_price",
          this.products.commercial_info.commercialInfo.grosir.price
        );

        formData.append("incomterm", this.products.other.incomterm);
        formData.append("warranty", this.products.other.warranty);
        formData.append("maintenance", this.products.other.maintenance);
        formData.append("sku", this.products.other.sku);
        formData.append("tags", this.products.other.tags);

        // formData.append("tags", this.products.other.tags.join(", ")); // Menggunakan join untuk menggabungkan array tags menjadi string
        // formData.append("makeActive", this.products.other.makeActive);

        // Tambahkan file gambar ke FormData
        for (let key in this.products.images) {
          const file = document.querySelector(`input[name=${key}]`).files[0];
          if (file) {
            formData.append("image[]", file);
            console.log(`${key}:`, file.name); // Tambahkan console log di sini
          }
        }

        // Tambahkan file video ke FormData
        const videoFile = document.querySelector("input[name=video]").files[0];
        if (videoFile) {
          formData.append("video", videoFile);
          console.log("Video:", videoFile.name); // Tambahkan console log di sini
        }
        // Tambahkan console log untuk menampilkan data yang akan disubmit
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          "http://192.168.1.244:8000/api/vendor/addProduct",
          formData,
          config
        );
        console.log("Product submitted successfully:", response.data);
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
