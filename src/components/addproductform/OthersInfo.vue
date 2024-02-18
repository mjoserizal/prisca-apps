<template>
  <form
    @submit.prevent="submitOthersInfo"
    class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row m-6"
  >
    <!-- Bagian kiri -->
    <div class="flex-1 pr-4 mb-4 md:mb-0">
      <!-- Input Incoterm -->
      <div class="relative mb-6">
        <input
          type="text"
          id="incoterm"
          name="incoterm"
          v-model="othersInfo.incoterm"
          class="block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <label
          for="incoterm"
          class="absolute top-0 left-2 -mt-2 text-balance text-gray-600 bg-white px-1"
          >Incoterm</label
        >
      </div>
      <!-- Input Warranty -->
      <div class="relative mb-6">
        <input
          type="text"
          id="warranty"
          name="warranty"
          v-model="othersInfo.warranty"
          class="block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <label
          for="warranty"
          class="absolute top-0 left-2 -mt-2 text-balance text-gray-600 bg-white px-1"
          >Warranty</label
        >
      </div>
      <!-- Input Maintenance -->
      <div class="relative mb-6">
        <input
          type="text"
          id="maintenance"
          name="maintenance"
          v-model="othersInfo.maintenance"
          class="block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <label
          for="maintenance"
          class="absolute top-0 left-2 -mt-2 text-balance text-gray-600 bg-white px-1"
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
            v-model="othersInfo.makeActive"
            color="primary"
            label="Make Active in Catalogue"
            :before="false"
            label-position="left"
          />
        </div>
      </div>
    </div>

    <!-- Bagian kanan -->
    <div class="flex-1 pl-4">
      <!-- Input SKU -->
      <div class="relative mb-6">
        <input
          type="text"
          id="sku"
          name="sku"
          v-model="othersInfo.sku"
          class="block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <label
          for="sku"
          class="absolute top-0 left-2 -mt-2 text-balance text-gray-600 bg-white px-1"
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
            class="w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label
            for="tags"
            class="absolute top-0 left-2 -mt-2 text-balance text-gray-600 bg-white px-1"
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
</template>

<script>
export default {
  data() {
    return {
      othersInfo: {
        incoterm: "",
        warranty: "",
        maintenance: "",
        makeActive: false,
        sku: "",
      },
    };
  },
  methods: {
    submitOthersInfo() {
      // Simulate async request
      setTimeout(() => {
        console.log("Submitting others info:", this.othersInfo);
        // Reset the form after submission
        this.othersInfo = {
          incoterm: "",
          warranty: "",
          maintenance: "",
          makeActive: false,
          sku: "",
        };
      }, 500);
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
