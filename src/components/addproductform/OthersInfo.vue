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
          v-model="othersInfo.warranty"
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
          v-model="othersInfo.maintenance"
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
          class="absolute top-0 left-2 -mt-2 text-balance text-gray-800 bg-white px-1"
          >SKU</label
        >
      </div>

      <!-- Input Tags -->
      <div class="relative">
        <input
          type="text"
          v-model="tagInput"
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
            v-if="tagInput.trim()"
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
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";

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
      tagInput: "",
      tags: [],
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
        this.tags = [];
        this.tagInput = "";
      }, 500);
    },
    addTag() {
      const tag = this.tagInput.trim();
      if (tag && !this.tags.includes(tag)) {
        this.tags.push(tag);
        this.tagInput = "";
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
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
