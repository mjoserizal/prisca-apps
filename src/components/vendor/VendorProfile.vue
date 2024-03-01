<template>
  <form @submit.prevent="updateVendorData">
    <div class="bg-white p-6 rounded-md shadow-md flex flex-col md:flex-row">
      <!-- Input Feature -->
      <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-600"
          >Nama Perusahaan:</label
        >
        <input
          type="text"
          id="name"
          name="name"
          v-model="vendorDetail.name"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Input Technical Spec -->
      <div class="mb-4">
        <label for="alamat" class="block mb-2 text-sm font-medium text-gray-600"
          >Alamat Perusahaan:</label
        >
        <textarea
          id="alamat"
          name="alamat"
          v-model="vendorDetail.master.alamat"
          rows="4"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <!-- Input Part Number -->
      <div class="mb-4">
        <label for="telp" class="block mb-2 text-sm font-medium text-gray-600"
          >Nomor Telepon Perusahaan:</label
        >
        <input
          type="text"
          id="telp"
          name="telp"
          v-model="vendorDetail.telp"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-600"
          >Email Perusahaan:</label
        >
        <input
          type="text"
          id="email"
          name="email"
          v-model="vendorDetail.email"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div class="mb-4">
        <label
          for="website"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Website Perusahaan:</label
        >
        <input
          type="text"
          id="website"
          name="website"
          v-model="vendorDetail.master.website"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
    <div
      class="bg-white mt-6 mb-6 p-6 rounded-md shadow-md flex flex-col md:flex-row"
    >
      <!-- Input Bidang Usaha -->
      <div class="mb-4">
        <label
          for="bidang_usaha"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Bidang Usaha:</label
        >
        <input
          type="text"
          id="bidang_usaha"
          name="bidang_usaha"
          v-model="vendorDetail.master.bidang_usaha"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Input Tahun Berdiri -->
      <div class="mb-4">
        <label
          for="tanggal_berdiri"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Tahun Berdiri:</label
        >
        <input
          type="date"
          id="tanggal_berdiri"
          name="tanggal_berdiri"
          v-model="vendorDetail.master.tanggal_berdiri"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Input NPWP -->
      <div class="mb-4">
        <label for="npwp" class="block mb-2 text-sm font-medium text-gray-600"
          >NPWP:</label
        >
        <input
          type="text"
          id="npwp"
          name="npwp"
          v-model="vendorDetail.master.npwp"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="npwp" class="block mb-2 text-sm font-medium text-gray-600"
          >SIUP:</label
        >
        <input
          type="text"
          id="siup"
          name="siup"
          v-model="vendorDetail.master.siup"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Input SIUP -->
      <!-- <div class="mb-4">
        <label for="siup" class="block mb-2 text-sm font-medium text-gray-600"
          >SIUP:</label
        >
        <input
          type="file"
          id="siup"
          name="siup"
          accept=".pdf,.doc,.docx"
          @change="onFileChange"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div> -->
    </div>
    <button
      type="submit"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Update
    </button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "VendorDetail",
  data() {
    return {
      vendorDetail: {
        name: "",
        telp: "",
        email: "",
        master: {
          alamat: "",
          website: "",
          bidang_usaha: "",
          tanggal_berdiri: "",
          npwp: "",
          siup: null,
        },
      },
      token: localStorage.getItem("token"), // Mengambil token dari local storage
    };
  },

  methods: {
    async fetchVendorData() {
      try {
        const response = await axios.get(
          "http://192.168.1.244:8000/api/vendor/show/profile",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (response.status === 200) {
          this.vendorDetail = response.data.user;
        } else {
          console.error("Failed to fetch vendor data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    },

    async updateVendorData() {
      try {
        const requestData = {
          name: this.vendorDetail.name,
          telp: this.vendorDetail.telp,
          email: this.vendorDetail.email,
          vendor_alamat: this.vendorDetail.master.alamat,
          vendor_website: this.vendorDetail.master.website,
          vendor_bidang_usaha: this.vendorDetail.master.bidang_usaha,
          vendor_tanggal_berdiri: this.vendorDetail.master.tanggal_berdiri,
          vendor_npwp: this.vendorDetail.master.npwp,
          siup: this.vendorDetail.master.siup,
        };

        const response = await axios.put(
          "http://192.168.1.244:8000/api/vendor/update/profile",
          requestData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Vendor data updated successfully");
        } else {
          console.error("Failed to update vendor data:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating vendor data:", error);
      }
    },
  },

  mounted() {
    // Memanggil fetchVendorData saat komponen dimount
    this.fetchVendorData();
  },
};
</script>

<style scoped>
form {
  padding-top: 1rem; /* Ubah sesuai kebutuhan */
  border-radius: 1rem; /* Ubah sesuai kebutuhan */
}
</style>
