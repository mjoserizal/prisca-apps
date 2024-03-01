<!-- Bagian kedua dengan input -->
<template>
  <form
    @submit.prevent="submitProduct"
    class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row m-2"
  >
    <div class="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
      <!-- Input Feature -->
      <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-600"
          >Nama Perusahaan:</label
        >
        <input
          type="text"
          id="name"
          name="name"
          v-model="detail.name"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Input Technical Spec -->
      <div class="mb-4">
        <label
          for="technical-spec"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Alamat Perusahaan:</label
        >
        <textarea
          id="alamat"
          name="alamat"
          v-model="detail.alamatPerusahaan"
          rows="5"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <!-- Input Satuan -->
      <!-- <div class="mb-4">
        <label for="satuan" class="block mb-2 text-sm font-medium text-gray-600"
          >Satuan:</label
        >
        <input
          type="text"
          id="satuan"
          name="satuan"
          v-model="detail.satuan"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div> -->
      <!-- Input Kondisi -->
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-600"
          >Condition:</label
        >
        <div class="flex items-center">
          <q-radio
            size="lg"
            v-model="detail.condition"
            val="new"
            class="mr-1"
            color="primary"
            unchecked-icon="radio_button_unchecked"
            checked-icon="radio_button_checked"
          />
          <label class="mr-4">New</label>
          <q-radio
            size="lg"
            v-model="detail.condition"
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
      <!-- Input Part Number -->
      <div class="mb-4">
        <label
          for="part-number"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Nomoer Telepon Perusahaan:</label
        >
        <input
          type="Number"
          id="part-number"
          name="part-number"
          v-model="detail.partNumber"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label
          for="part-number"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Email Perusahaan:</label
        >
        <input
          type="text"
          id="part-number"
          name="part-number"
          v-model="detail.partNumber"
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
  </form>
</template>
<script>
export default {
  name: "VendorDetail",
  data() {
    return {
      detail: {
        // Define your detail properties here
        alamatPerusahaan: "",
        name: "",
        satuan: "",
        condition: {
          new: false,
          used: false,
        },
        technicalSpec: "",
        partNumber: "",
        video: null,
      },
    };
  },
  methods: {
    onVideoChange(event) {
      // Update the video property when a new video is selected
      this.detail.video = event.target.files[0];
    },

    getData() {
      return {
        alamatPerusahaan: this.details.detail.alamatPerusahaan,
        technicalSpec: this.details.detail.technicalSpecification,
        names: this.details.detail.name,
        satuan: this.details.detail.satuan,
        partNumber: this.details.detail.partNumber,
        condition: this.details.detail.condition,
        video: thsi.details.detail.video,
      };
    },
  },
};
</script>

<style scoped>
form {
  padding: 1rem; /* Ubah sesuai kebutuhan */
  border-radius: 0.5rem; /* Ubah sesuai kebutuhan */
}
</style>
