<template>
  <div class="p-2.5 xl:p-5">
    <form @submit.prevent="addDivisi" class="bg-white p-6 rounded-md shadow-md">
      <!-- Input Nama Divisi -->
      <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-600">Name Division :</label>
        <input type="text" id="name" name="name" v-model="divisiName"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
  name: "AddDivisiPage",
  data() {
    return {
      divisiName: "",
    };
  },
  methods: {
    addDivisi() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      const formData = {
        name: this.divisiName,
      };

      axios
        .post(`${apiBaseUrl}buyer/divisi`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Divisi added successfully: ", response.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Divisi berhasil ditambahkan!",
            confirmButtonText: "OK",
          }).then(() => {
            this.$router.push("/Divisi-Departemen-Management");
          });
        })
        .catch((error) => {
          console.error("Error adding divisi: ", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Terjadi kesalahan saat menambahkan divisi. Silakan coba lagi!",
            confirmButtonText: "OK",
          });
        });
    },
  },
};
</script>

<style scoped>
/* Gaya khusus untuk komponen ini */
</style>
