<template>
  <form @submit.prevent="updateProduct">
    <!-- Basic Information -->
    <div class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row">
      <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
        <div class="mb-4">
          <label for="preview-large-product-image" class="block mb-2 text-sm font-medium text-gray-600">
            Upload Product Image:
          </label>
          <div class="mt-2 flex justify-center rounded-lg border border-dashed shadow-md border-gray-300 px-6 py-10">
            <div class="text-center">
              <img v-if="editedProduct.images['preview-large-product-image']"
                :src="editedProduct.images['preview-large-product-image']" alt="Large Product Image"
                class="h-auto w-auto object-cover mb-4" />
              <i class="fa-regular fa-image mx-auto text-4xl text-gray-400 hover:text-indigo-500"></i>

              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="preview-large-product-image"
                  class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload Image</span>
                  <input type="file" id="preview-large-product-image" name="preview-large-product-image"
                    @change="onImageChange('preview-large-product-image', $event)" class="sr-only" />
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
              <label for="preview-product-image1" class="block mb-2 text-sm font-medium text-gray-600">
                Upload Product Image :
              </label>
              <div
                class="mt-2 flex justify-center shadow-md rounded-lg border border-dashed border-gray-300 px-6 py-10">
                <div class="text-center">
                  <img v-if="editedProduct.images['preview-product-image1']"
                    :src="editedProduct.images['preview-product-image1']" alt="Product Image 1"
                    class="h-auto w-auto object-cover mb-4" />
                  <i class="fa-regular fa-image mx-auto text-4xl text-gray-400 hover:text-indigo-500"></i>
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label for="preview-product-image1"
                      class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload Image </span>
                      <input type="file" id="preview-product-image1" name="preview-product-image1"
                        @change="onImageChange('preview-product-image1', $event)" class="sr-only" />
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
              <label for="preview-product-image2" class="block mb-2 text-sm font-medium text-gray-600">
                Upload Product Image:
              </label>
              <div
                class="mt-2 flex justify-center rounded-lg border shadow-md border-dashed border-gray-300 px-6 py-10">
                <div class="text-center">
                  <img v-if="editedProduct.images['preview-product-image2']"
                    :src="editedProduct.images['preview-product-image2']" alt="Product Image 2"
                    class="h-auto w-auto object-cover mb-4" />
                  <i class="fa-regular fa-image mx-auto text-4xl text-gray-400 hover:text-indigo-500"></i>

                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label for="preview-product-image2"
                      class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload Image</span>
                      <input type="file" id="preview-product-image2" name="preview-product-image2"
                        @change="onImageChange('preview-product-image2', $event)" class="sr-only" />
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
              <label for="preview-product-image3" class="block mb-2 text-sm font-medium text-gray-600">
                Upload Product Image:
              </label>
              <div
                class="mt-2 flex justify-center rounded-lg shadow-md border border-dashed border-gray-300 px-6 py-10">
                <div class="text-center">
                  <img v-if="editedProduct.images['preview-product-image3']"
                    :src="editedProduct.images['preview-product-image3']" alt="Product Image 3"
                    class="h-auto w-auto object-cover mb-4" />
                  <i class="fa-regular fa-image mx-auto text-4xl text-gray-400 hover:text-indigo-500"></i>
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label for="preview-product-image3"
                      class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload Image</span>
                      <input type="file" id="preview-product-image3" name="preview-product-image3"
                        @change="onImageChange('preview-product-image3', $event)" class="sr-only" />
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
          <label for="product-name" class="block mb-2 text-sm font-medium text-gray-600">Product Name:</label>
          <input type="text" id="product-name" name="product-name" v-model="editedProduct.name"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div class="mb-4">
          <label for="product-group" class="block mb-2 text-sm font-medium text-gray-600">
            Product Group:
          </label>
          <select id="product-group" name="product-group" v-model="editedProduct.group"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select Group</option>
            <option v-for="group in groups" :key="group.id" :value="group.id"
              :selected="group.id === editedProduct.group">
              {{ group.name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="product-category" class="block mb-2 text-sm font-medium text-gray-600">
            Product Category:
          </label>
          <select id="product-category" name="product-category" v-model="editedProduct.category"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select Category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Brand -->
        <div class="mb-4">
          <label for="brand" class="block mb-2 text-sm font-medium text-gray-600">Brand:</label>
          <input type="text" id="brand" name="brand" v-model="editedProduct.brand"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <!-- Product Category Name -->
        <div class="mb-4">
          <label for="product-category-name" class="block mb-2 text-sm font-medium text-gray-600">Product Category
            Name:</label>
          <input type="text" id="product-category-name" name="product-category-name"
            v-model="editedProduct.product_category_name"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      </div>
    </div>
    <!-- Specification Detail -->
    <div class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row mt-6">
      <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
        <!-- Input Product Specification -->
        <div class="mb-4" style="max-height: 200px; overflow-y: auto">
          <label for="product-specification" class="block mb-2 text-sm font-medium text-gray-600">Product
            Specification:</label>
          <textarea id="product-specification" name="product-specification"
            v-model="editedProduct.detail.productSpecification" rows="5"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>

        <!-- Input Feature -->
        <div class="mb-4">
          <label for="feature" class="block mb-2 text-sm font-medium text-gray-600">Feature:</label>
          <input type="text" id="feature" name="feature" v-model="editedProduct.detail.feature"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <!-- Input Satuan -->
        <div class="mb-4">
          <label for="satuan" class="block mb-2 text-sm font-medium text-gray-600">Satuan:</label>
          <input type="text" id="satuan" name="satuan" v-model="editedProduct.detail.satuan"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <!-- Input Kondisi -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">Condition:</label>
          <div class="flex items-center">
            <q-radio size="lg" v-model="editedProduct.detail.condition" val="new" class="mr-1" color="primary"
              unchecked-icon="radio_button_unchecked" checked-icon="radio_button_checked" />
            <label class="mr-4">New</label>
            <q-radio size="lg" v-model="editedProduct.detail.condition" val="used" class="mr-1" color="primary"
              unchecked-icon="radio_button_unchecked" checked-icon="radio_button_checked" />
            <label>Used</label>
          </div>
        </div>
      </div>
      <div class="flex-1 pl-0 md:pl-4">
        <!-- Input Technical Spec -->
        <div class="mb-4">
          <label for="technical-spec" class="block mb-2 text-sm font-medium text-gray-600">Technical Spec:</label>
          <textarea id="technical-spec" name="technical-spec" v-model="editedProduct.detail.technicalSpecification"
            rows="5"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <!-- Input Part Number -->
        <div class="mb-4">
          <label for="part-number" class="block mb-2 text-sm font-medium text-gray-600">Part Number:</label>
          <input type="text" id="part-number" name="part-number" v-model="editedProduct.detail.partNumber"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <!-- Input Video -->
        <div class="mb-4">
          <label for="video" class="block mb-2 text-sm font-medium text-gray-600">Video:</label>
          <input type="file" id="video" name="video" accept="video/*" @change="onVideoChange"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      </div>
    </div>
    <!-- Commercial Information -->
    <div class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row mt-6">
      <!-- Bagian kiri -->
      <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
        <!-- Input Price -->
        <div class="mb-4">
          <label for="price" class="block mb-2 text-sm font-medium text-gray-600">Price:</label>
          <input type="text" id="price" name="price" v-model="editedProduct.commercial_info.commercialInfo.price"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <!-- Input Discount -->
        <div class="mb-4">
          <label for="discount" class="block mb-2 text-sm font-medium text-gray-600">Discount:</label>
          <input type="text" id="discount" name="discount"
            v-model="editedProduct.commercial_info.commercialInfo.discount"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <!-- Input Price Expiration Date -->
        <div class="mb-4">
          <label for="price-expiration-date" class="block mb-2 text-sm font-medium text-gray-600">Price Expiration
            Date:</label>
          <input type="date" id="price-expiration-date" name="price-expiration-date"
            v-model="editedProduct.commercial_info.commercialInfo.price_exp"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <!-- Input Etalase (Dropdown) -->
        <div class="mb-4">
          <label for="etalase" class="block mb-2 text-sm font-medium text-gray-600">Etalase:</label>
          <select id="etalase" name="etalase" v-model="editedProduct.commercial_info.commercialInfo.etalase_id"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="" disabled selected>
              {{ editedProduct.commercial_info.commercialInfo.etalase }}
            </option>
            <option v-for="etalase in etalases" :key="etalase.id" :value="etalase.id">
              {{ etalase.name }}
            </option>
          </select>
        </div>
        <!-- Input Grosir -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">Grosir:</label>
          <div class="relative inline-block mr-2 align-middle select-none transition duration-200 ease-in">
            <q-toggle v-model="editedProduct.commercial_info.commercialInfo.grosirToggle
    " color="primary" label="Grosir" :before="false" />
          </div>
        </div>
        <div v-if="editedProduct.commercial_info.commercialInfo.grosirToggle" class="mb-4 flex">
          <div class="flex-1 mr-2">
            <label for="grosir-qty" class="block mb-2 text-sm font-medium text-gray-600">Qty:</label>
            <input type="number" id="grosir-qty" name="grosir-qty" v-model="editedProduct.commercial_info.grosir.qty"
              min="0"
              class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div class="flex-1 ml-2">
            <label for="grosir-price" class="block mb-2 text-sm font-medium text-gray-600">Price:</label>
            <input type="text" id="grosir-price" name="grosir-price"
              v-model="editedProduct.commercial_info.grosir.price"
              class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>

        <!-- Input Pre-order -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">Pre-order:</label>
          <div class="relative inline-block mr-2 align-middle select-none transition duration-200 ease-in">
            <q-toggle v-model="editedProduct.commercial_info.commercialInfo.preOrder" color="primary" :before="false"
              label="Pre-Order" />
          </div>
        </div>
        <!-- Input Pre-order Days -->
        <div v-if="editedProduct.commercial_info.commercialInfo.preOrder" class="mb-4">
          <label for="pre-order-days" class="block mb-2 text-sm font-medium text-gray-600">Pre-order Days:</label>
          <input type="number" id="pre-order-days" name="pre-order-days"
            v-model="editedProduct.commercial_info.commercialInfo.pre_order" min="0"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
      </div>

      <!-- Bagian kanan -->
      <div class="flex-1 pl-0 md:pl-4">
        <!-- Input Currency (Dropdown) -->
        <div class="mb-4">
          <label for="currency" class="block mb-2 text-sm font-medium text-gray-600">Currency:</label>
          <select id="currency" name="currency" v-model="editedProduct.commercial_info.commercialInfo.currency_id"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select Currency</option>
            <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
              {{ currency.name }} ({{ currency.symbol }})
            </option>
          </select>
        </div>

        <!-- Input Payment Terms -->
        <div class="mb-4">
          <label for="payment-terms" class="block mb-2 text-sm font-medium text-gray-600">Payment Terms:</label>
          <input type="text" id="payment-terms" name="payment-terms"
            v-model="editedProduct.commercial_info.commercialInfo.payment_terms"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <!-- Input Purchase Quantity -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">Purchase Quantity:</label>
          <!-- Bagian kiri untuk Minimum Purchase Quantity -->
          <div class="flex justify-between">
            <div class="w-1/2 pr-2">
              <label for="min-purchase-quantity" class="block mb-2 text-sm font-medium text-gray-600">Minimum:</label>
              <input type="number" id="min-purchase-quantity" name="min-purchase-quantity"
                v-model="editedProduct.commercial_info.purchaseQty.min"
                class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <!-- Bagian kanan untuk Maximum Purchase Quantity -->
            <div class="w-1/2 pl-2">
              <label for="max-purchase-quantity" class="block mb-2 text-sm font-medium text-gray-600">Maximum:</label>
              <input type="number" id="max-purchase-quantity" name="max-purchase-quantity"
                v-model="editedProduct.commercial_info.purchaseQty.max"
                class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
        </div>

        <!-- Input Stock -->
        <div class="mb-4">
          <label for="stock" class="block mb-2 text-sm font-medium text-gray-600">Stock:</label>
          <input type="number" id="stock" name="stock" v-model="editedProduct.commercial_info.commercialInfo.stock"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <!-- Input Berat -->
        <div class="mb-4">
          <label for="berat" class="block mb-2 text-sm font-medium text-gray-600">Product Weight:</label>
          <input type="number" id="berat" name="berat" v-model="editedProduct.commercial_info.commercialInfo.berat"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <!-- Input contract -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-600">contract:</label>
          <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <q-toggle v-model="editedProduct.commercial_info.commercialInfo.enablecontract
    " color="primary" label="Contract" :before="false" label-position="left" />
          </div>
        </div>
      </div>
    </div>

    <!-- Others Information -->
    <div class="bg-white p-6 rounded-md shadow-md mt-6 flex flex-col md:flex-row">
      <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
        <!-- Bagian kiri -->
        <div>
          <!-- Input Incoterm -->
          <div class="relative mb-4">
            <label for="incoterm" class="block mb-2 text-sm font-medium text-gray-600">Incoterm</label>
            <input type="text" id="incoterm" name="incoterm" v-model="editedProduct.other.incomterm"
              class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <!-- Input Warranty -->
          <div class="relative mb-4">
            <label for="warranty" class="block mb-2 text-sm font-medium text-gray-600">Warranty</label>
            <input type="number" id="warranty" name="warranty" v-model="editedProduct.other.warranty"
              class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <!-- Input Maintenance -->
          <div class="relative mb-4">
            <label for="maintenance" class="block mb-2 text-sm font-medium text-gray-600">Maintenance</label>
            <input type="number" id="maintenance" name="maintenance" v-model="editedProduct.other.maintenance"
              class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <!-- Input Make Active in Catalogue (Switch) -->
          <div class="flex items-center mb-4">
            <label class="mr-2 text-sm font-medium text-gray-600">Make Active in Catalogue</label>
            <div class="relative inline-block mr-2 align-middle select-none transition duration-200 ease-in">
              <q-toggle v-model="editedProduct.other.makeActive" color="primary" label="Make Active in Catalogue"
                :before="false" label-position="left" :value="editedProduct.other.makeActive ? 'true' : undefined" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 pl-0 md:pl-4">
        <!-- Bagian kanan -->
        <div>
          <!-- Input SKU -->
          <div class="relative mb-4">
            <label for="sku" class="block mb-2 text-sm font-medium text-gray-600">SKU</label>
            <input type="text" id="sku" name="sku" v-model="editedProduct.other.sku"
              class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <!-- Input Tags -->
          <div class="relative mb-4">
            <label for="tags" class="block mb-2 text-sm font-medium text-gray-600">Tags</label>
            <input type="text" id="tags" name="tags" v-model="editedProduct.other.tags"
              class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <button type="submit"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click.prevent="validateForm">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { Notify } from "quasar";
import axios from "axios";
import Swal from "sweetalert2"; // Pastikan Anda telah mengimpor SweetAlert

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL; // Mengambil base URL dari environment variable

export default {
  name: "EditProduct",
  data() {
    return {
      productId: this.$route.params.id,
      editedProduct: {
        name: "",
        group: "",
        category: "",
        brand: "",
        product_category_name: "",
        status: "",
        images: {
          "preview-large-product-image": "",
          "preview-product-image1": "",
          "preview-product-image2": "",
          "preview-product-image3": "",
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
            grosirToggle: "",
            enablecontract: "",
            preOrder: "",
            price: "",
            currency_id: "",
            etalase_id: "",
            payment_terms: "",
            discount: "",
            price_exp: "",
            stock: "",
            berat: "",
            pre_order: "",
            contract: "",
          },
          purchaseQty: {
            min: "",
            max: "",
          },
          grosir: {
            qty: "",
            price: "",
          },
        },
        other: {
          incomterm: "",
          warranty: "",
          maintenance: "",
          sku: "",
          tags: "",
          makeActive: "",
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

  created() {
    this.fetchProduct();
    this.fetchDropdownData();
  },

  methods: {
    async fetchProduct() {
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
          `${apiBaseUrl}vendor/product/${this.productId}`,
          config
        );

        if (response.data.success) {
          const product = response.data.product || {};
          if (Array.isArray(product.images)) {
            this.editedProduct = {
              ...product,
              images: {
                "preview-large-product-image": product.images[0]?.url_image || "",
                "preview-product-image1": product.images[1]?.url_image || "",
                "preview-product-image2": product.images[2]?.url_image || "",
                "preview-product-image3": product.images[3]?.url_image || "",
              },
            };
          } else {
            console.error("Product images is not an array:", product.images);
            this.editedProduct = { ...product, images: {} };
          }
        } else {
          console.error("Failed to fetch product:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
    ,

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
        const response = await axios.get(`${apiBaseUrl}vendor/drop`, config);
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

      // Simpan file langsung ke editedProduct.images
      this.editedProduct.images[field] = file;

      // Buat file reader
      const reader = new FileReader();

      // Ketika file selesai dibaca, tidak perlu melakukan apa pun karena Anda sudah menyimpan file ke editedProduct.images
      reader.onload = (e) => { };

      // Baca file sebagai URL data
      reader.readAsDataURL(file);
    },

    onVideoChange(event) {
      const videoFile = event.target.files[0];
      if (videoFile) {
        this.editedProduct.detail.video = videoFile.name;
        console.log("Video:", videoFile.name);
      }
    },

    validateForm() {
      let isValid = true;

      // Validasi nama produk, grup, dan kategori
      if (
        !this.editedProduct.group ||
        !this.editedProduct.category ||
        !this.editedProduct.commercial_info.commercialInfo.currency_id ||
        !this.editedProduct.commercial_info.commercialInfo.etalase_id
      ) {
        let errorMessage = "";

        if (!this.editedProduct.group) {
          errorMessage += "Grup produk harus diisi. ";
        }

        if (!this.editedProduct.category) {
          errorMessage += "Kategori produk harus diisi. ";
        }
        if (!this.editedProduct.commercial_info.commercialInfo.currency_id) {
          errorMessage += "Currency produk harus diisi. ";
        }
        if (!this.editedProduct.commercial_info.commercialInfo.etalase_id) {
          errorMessage += "Etalase produk harus diisi. ";
        }

        this.$q.notify({
          type: "warning",
          position: "top",
          message: errorMessage,
        });

        isValid = false;
      }
      if (isValid) {
        // Jika formulir valid, kirim formulir
        this.updateProduct();
      }
      return isValid;
    },

    async updateProduct() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found.");
          return;
        }

        const formData = new FormData();

        // Add image files to FormData
        for (let key in this.editedProduct.images) {
          const file = document.querySelector(`input[name=${key}]`).files[0];
          if (file) {
            formData.append("image[]", file);
            console.log(`${key}:`, file.name);
          }
        }

        // Add video file to FormData
        const videoFile = document.querySelector("input[name=video]").files[0];
        if (videoFile) {
          formData.append("video", videoFile);
          console.log("Video:", videoFile.name);
        }

        // Add other data to FormData
        formData.append("name", this.editedProduct.name);
        formData.append("group_id", this.editedProduct.group);
        formData.append("category_id", this.editedProduct.category);
        formData.append("brand", this.editedProduct.brand);
        formData.append("product_category_name", this.editedProduct.product_category_name);
        formData.append("status", this.editedProduct.other.makeActive ? "active" : "inactive");
        formData.append("productSpecification", this.editedProduct.detail.productSpecification);
        formData.append("technicalSpecification", this.editedProduct.detail.technicalSpecification);
        formData.append("feature", this.editedProduct.detail.feature);
        formData.append("partNumber", this.editedProduct.detail.partNumber);
        formData.append("satuan", this.editedProduct.detail.satuan);
        formData.append("condition", this.editedProduct.detail.condition);
        formData.append("price", this.editedProduct.commercial_info.commercialInfo.price);
        formData.append("currency_id", this.editedProduct.commercial_info.commercialInfo.currency_id);
        formData.append("etalase_id", this.editedProduct.commercial_info.commercialInfo.etalase_id);
        formData.append("payment_terms", this.editedProduct.commercial_info.commercialInfo.payment_terms);
        formData.append("discount", this.editedProduct.commercial_info.commercialInfo.discount);
        formData.append("price_exp", this.editedProduct.commercial_info.commercialInfo.price_exp);
        formData.append("stock", this.editedProduct.commercial_info.commercialInfo.stock);
        formData.append("berat", this.editedProduct.commercial_info.commercialInfo.berat);

        formData.append("pre_order", this.editedProduct.commercial_info.commercialInfo.pre_order);
        formData.append("contract", this.editedProduct.commercial_info.commercialInfo.contract ? "yes" : "no");
        formData.append("min", this.editedProduct.commercial_info.purchaseQty.min);
        formData.append("max", this.editedProduct.commercial_info.purchaseQty.max);
        formData.append("qty", this.editedProduct.commercial_info.grosir.qty);
        formData.append("grosir_price", this.editedProduct.commercial_info.grosir.price);
        formData.append("incomterm", this.editedProduct.other.incomterm);
        formData.append("warranty", this.editedProduct.other.warranty);
        formData.append("maintenance", this.editedProduct.other.maintenance);
        formData.append("sku", this.editedProduct.other.sku);
        formData.append("tags", this.editedProduct.other.tags);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axios.post(
          `${apiBaseUrl}vendor/product/${this.productId}`,
          formData,
          config
        );

        if (response.data.success) {
          console.log("Product updated successfully.");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Product has been added successfully!",
            confirmButtonText: "OK",
          });
        } else {
          console.error("Failed to update product:", response.data.message);
          Notify.create({
            type: "negative",
            message: `Failed to update product: ${response.data.message}`,
          });
        }
      } catch (error) {
        console.error("Failed to update product:", error);
        Notify.create({
          type: "negative",
          message: `Error: ${error.response ? error.response.data.message : error.message}`,
        });
      }
    },
  },
};
</script>

<style>
form {
  padding: 1.5rem;
  /* Ubah sesuai kebutuhan */
  border-radius: 0.5rem;
  /* Ubah sesuai kebutuhan */
}
</style>
