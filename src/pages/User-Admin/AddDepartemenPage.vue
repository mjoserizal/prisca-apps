<template>
  <div class="p-2.5 xl:p-5">
    <form @submit.prevent="addDepartemen" class="bg-white p-6 rounded-md shadow-md">
      <!-- Input Nama Divisi -->
      <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-600">Name Department:</label>
        <input type="text" id="name" name="name" v-model="departemenName"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Dropdown Divisi -->
      <div class="mb-4">
        <label for="divisi" class="block mb-2 text-sm font-medium text-gray-600">Division:</label>
        <select v-model="selectedDivisi" id="divisi" name="divisi"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option v-for="divisi in divisiList" :key="divisi.code" :value="divisi">
            {{ divisi.name }}
          </option>
        </select>
      </div>

      <div class="mt-4">
        <button type="submit"
          class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-250 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "AddDepartemenPage",
  data() {
    return {
      departemenName: "",
      selectedDivisi: null,
      divisiList: [], // Menyimpan daftar divisi
    };
  },
  mounted() {
    this.fetchDivisiList(); // Panggil method fetchDivisiList saat komponen dimuat
  },
  methods: {
    addDepartemen() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      const formData = {
        name: this.departemenName,
        divisi_code: this.selectedDivisi.code, // Pastikan divisi_code dikirimkan
      };

      axios
        .post(`${apiBaseUrl}buyer/departemen`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Departemen added successfully: ", response.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Departemen berhasil ditambahkan!",
            confirmButtonText: "OK",
          }).then(() => {
            // Alihkan pengguna ke /Divisi-Departemen-Management setelah menekan OK
            this.$router.push("/Divisi-Departemen-Management");
          });
        })
        .catch((error) => {
          console.error("Error adding Departemen: ", error);
          // Tangani kesalahan saat menambahkan divisi
          // Contoh: tampilkan pesan kesalahan kepada pengguna
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Terjadi kesalahan saat menambahkan divisi. Silakan coba lagi!",
            confirmButtonText: "OK",
          });
        });
    },
    fetchDivisiList() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get(`${apiBaseUrl}buyer/divisi`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.divisiList = response.data.divisi; // Simpan data divisi ke divisiList
        })
        .catch((error) => {
          console.error("Error fetching Divisi list: ", error);
        });
    },
  },
};
</script>

<style scoped>
/* Gaya khusus untuk komponen ini */
</style>
