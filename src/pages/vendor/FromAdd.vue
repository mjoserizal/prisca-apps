<template>
  <div>
    <!-- Bagian pertama dengan input gambar -->
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
            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10"
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
                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10"
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
                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10"
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
                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10"
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
          <label
            for="brand"
            class="block mb-2 text-sm font-medium text-gray-600"
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
          <label
            for="satuan"
            class="block mb-2 text-sm font-medium text-gray-600"
            >Satuan:</label
          >
          <select
            id="satuan"
            name="satuan"
            v-model="product.satuan"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Pilih Satuan</option>
            <option value="kg">Kg</option>
            <option value="gram">Gram</option>
            <option value="pcs">Pcs</option>
            <option value="box">Box</option>
          </select>
        </div>

        <!-- Input Kondisi -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600"
            >Condition:</label
          >
          <div class="flex items-center">
            <input
              type="radio"
              id="condition-new"
              name="condition"
              value="new"
              v-model="product.condition"
              class="mr-1"
            />
            <label for="condition-new" class="mr-4">New</label>
            <input
              type="radio"
              id="condition-used"
              name="condition"
              value="used"
              v-model="product.condition"
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
          <label
            for="video"
            class="block mb-2 text-sm font-medium text-gray-600"
          >
            Video:
          </label>
          <div class="relative">
            <input
              type="file"
              id="video"
              name="video"
              accept="video/*"
              @change="onVideoChange"
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pl-3 pr-10 py-2"
            />
            <button
              class="absolute inset-y-0 right-0 flex items-center px-4 text-sm text-white bg-indigo-500 rounded-r-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Upload
            </button>
          </div>
          <div class="mt-1 text-sm text-gray-500" id="video_help">
            Please upload a video file. Supported formats: MP4, AVI, MKV, etc.
          </div>
        </div>
      </div>
    </form>

    <form
      @submit.prevent="submitCommercialInfo"
      class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row m-6"
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
            v-model="commercialInfo.price"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            v-model="commercialInfo.discount"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            v-model="commercialInfo.priceExpirationDate"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            v-model="commercialInfo.etalase"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Etalase</option>
            <!-- Daftar opsi etalase -->
          </select>
        </div>
        <!-- Input Grosir -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600"
            >Grosir:</label
          >
          <div
            class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
          >
            <input
              type="checkbox"
              id="grosir-toggle"
              name="grosir-toggle"
              v-model="commercialInfo.grosirToggle"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="grosir-toggle"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <label for="grosir-toggle" class="text-xs text-gray-600">On</label>
        </div>
        <div v-if="commercialInfo.grosirToggle" class="mb-4 flex">
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
              v-model="commercialInfo.grosirQty"
              min="0"
              class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              v-model="commercialInfo.grosirPrice"
              class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <!-- Input Pre-order -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600"
            >Pre-order:</label
          >
          <div
            class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
          >
            <input
              type="checkbox"
              id="pre-order"
              name="pre-order"
              v-model="commercialInfo.preOrder"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="pre-order"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <label for="pre-order" class="text-xs text-gray-600">On</label>
        </div>
        <!-- Input Pre-order Days -->
        <div v-if="commercialInfo.preOrder" class="mb-4">
          <label
            for="pre-order-days"
            class="block mb-2 text-sm font-medium text-gray-600"
            >Pre-order Days:</label
          >
          <input
            type="number"
            id="pre-order-days"
            name="pre-order-days"
            v-model="commercialInfo.preOrderDays"
            min="0"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            v-model="commercialInfo.currency"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Currency</option>
            <!-- Daftar opsi currency -->
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
            v-model="commercialInfo.paymentTerms"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                v-model="commercialInfo.minPurchaseQuantity"
                min="0"
                max="100"
                class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                v-model="commercialInfo.maxPurchaseQuantity"
                min="0"
                max="100"
                class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            v-model="commercialInfo.stock"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <input
              type="checkbox"
              id="contract-toggle"
              name="contract-toggle"
              v-model="commercialInfo.enablecontract"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="contract-toggle"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <label for="contract-toggle" class="text-xs text-gray-600">On</label>
        </div>
      </div>
    </form>

    <form
      @submit.prevent="submitOthersInfo"
      class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row m-6"
    >
      <!-- Bagian kiri -->
      <div class="flex-1 pr-4 mb-4 md:mb-0">
        <!-- Input Incoterm -->
        <div class="relative mb-4">
          <input
            type="text"
            id="incoterm"
            name="incoterm"
            v-model="othersInfo.incoterm"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label
            for="incoterm"
            class="absolute top-0 left-2 -mt-2 text-xs text-gray-600 bg-white px-1"
            >Incoterm</label
          >
        </div>
        <!-- Input Warranty -->
        <div class="relative mb-4">
          <input
            type="text"
            id="warranty"
            name="warranty"
            v-model="othersInfo.warranty"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label
            for="warranty"
            class="absolute top-0 left-2 -mt-2 text-xs text-gray-600 bg-white px-1"
            >Warranty</label
          >
        </div>
        <!-- Input Maintenance -->
        <div class="relative mb-4">
          <input
            type="text"
            id="maintenance"
            name="maintenance"
            v-model="othersInfo.maintenance"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label
            for="maintenance"
            class="absolute top-0 left-2 -mt-2 text-xs text-gray-600 bg-white px-1"
            >Maintenance</label
          >
        </div>
        <!-- Input Make Active in Catalogue (Switch) -->
        <div class="flex items-center mb-4">
          <label class="mr-2 text-sm font-medium text-gray-600"
            >Make Active in Catalogue</label
          >
          <div
            class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
          >
            <input
              type="checkbox"
              id="make-active"
              name="make-active"
              v-model="othersInfo.makeActive"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="make-active"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <label for="make-active" class="text-xs text-gray-600">Active</label>
        </div>
      </div>

      <!-- Bagian kanan -->
      <div class="flex-1 pl-4">
        <!-- Input SKU -->
        <div class="relative mb-4">
          <input
            type="text"
            id="sku"
            name="sku"
            v-model="othersInfo.sku"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label
            for="sku"
            class="absolute top-0 left-2 -mt-2 text-xs text-gray-600 bg-white px-1"
            >SKU</label
          >
        </div>

        <!-- Input Tags -->
        <!-- <div class="relative">
          <input
            type="text"
            v-model="tagInput"
            @keyup.enter="addTag"
            placeholder="Add a tag"
            class="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label
            for="tags"
            class="absolute top-0 left-2 -mt-2 text-xs text-gray-600 bg-white px-1"
          >
            Tags:
          </label>

          <div class="mt-2">
            <span
              v-for="(tag, index) in tags"
              :key="index"
              class="inline-flex items-center px-3 py-1 mr-2 mb-2 bg-gray-200 rounded-full"
            >
              {{ tag }}
              <button
                @click="removeTag(index)"
                class="ml-1 text-gray-500 focus:outline-none hover:text-gray-700"
              >
                <svg
                  class="w-3 h-3 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2H3V3zm14 5v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8h14zm-4 3a1 1 0 0 0 0 2h-2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm-4 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H9z"
                  />
                </svg>
              </button>
            </span>
          </div>

          <button
            v-if="tagInput.trim()"
            @click="addTag"
            class="absolute top-0 right-2 -mt-2 px-3 py-1 bg-indigo-500 text-white rounded-md focus:outline-none hover:bg-indigo-600"
          >
            Add
          </button>
        </div> -->
      </div>
    </form>
  </div>
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
      commercialInfo: {
        price: "",
        discount: "",
        priceExpirationDate: "",
        etalase: "",
        grosirToggle: false,
        grosirQty: 0,
        grosirPrice: "",
        currency: "",
        paymentTerms: "",
        minPurchaseQuantity: "",
        maxPurchaseQuantity: "",
        purchaseQuantity: "",
        stock: "",
        preOrder: false,
        preOrderDays: 0,
        contract: false,
      },
      othersInfo: {
        incoterm: "",
        warranty: "",
        maintenance: "",
        makeActive: false,
        sku: "",
        tagInput: "",
        tags: [],
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
    addTag() {
      const tag = this.tagInput.trim();
      if (tag) {
        this.tags.push(tag);
        this.tagInput = "";
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    submitProduct() {
      // handle form submission
    },
    submitCommercialInfo() {
      // Lakukan sesuatu dengan data komersial yang diisi
      console.log(this.commercialInfo);
    },
    submitOthersInfo() {
      // Handle form submission
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
