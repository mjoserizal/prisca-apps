<template>
  <div class="p-2.5 xl:p-5">
    <form
      @submit.prevent="updateUserData"
      class="bg-white p-6 rounded-md shadow-md"
    >
      <!-- Input Nama Perusahaan -->
      <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-600"
          >Nama:</label
        >
        <input
          type="text"
          id="name"
          name="name"
          v-model="userProfile.name"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Input Nomor Telepon Perusahaan -->
      <div class="mb-4">
        <label for="telp" class="block mb-2 text-sm font-medium text-gray-600"
          >Nomor Telepon :</label
        >
        <input
          type="text"
          id="telp"
          name="telp"
          v-model="userProfile.telp"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Input Email Perusahaan -->
      <div class="mb-4">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-600"
          >Email:</label
        >
        <input
          type="text"
          id="email"
          name="email"
          v-model="userProfile.email"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label
          for="address"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Alamat:</label
        >
        <input
          type="text"
          id="address"
          name="address"
          v-model="userProfile.company.address"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Input Divisi -->
      <div class="mb-4">
        <label for="divisi" class="block mb-2 text-sm font-medium text-gray-600"
          >Divisi:</label
        >
        <select
          id="divisi"
          v-model="selectedDivisi"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option
            v-for="divisi in divisiList"
            :key="divisi.code"
            :value="divisi.code"
          >
            {{ divisi.name }}
          </option>
        </select>
      </div>

      <!-- Input Departemen -->
      <div class="mb-4">
        <label
          for="departemen"
          class="block mb-2 text-sm font-medium text-gray-600"
          >Departemen:</label
        >
        <select
          id="departemen"
          v-model="selectedDepartemen"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option
            v-for="departemen in departemenList"
            :key="departemen.code"
            :value="departemen.code"
          >
            {{ departemen.name }}
          </option>
        </select>
      </div>

      <div class="mt-4">
        <button
          type="submit"
          class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-250 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "UserProfile",
  data() {
    return {
      userProfile: {
        name: "",
        telp: "",
        email: "",
        company_code: "",
        company_name: "",
        divisi_code: "",
        departemen_code: "",
        company: {
          address: "",
        },
      },
      divisiList: [],
      selectedDivisi: "",
      departemenList: [],
      selectedDepartemen: "",
    };
  },
  mounted() {
    this.fetchProfile();
    this.fetchDivisi();
    this.fetchDepartemen();
  },
  methods: {
    fetchProfile() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get("http://192.168.18.43:8000/api/buyer/show/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.userProfile = response.data.user;
        })
        .catch((error) => {
          console.error("Error fetching profile: ", error);
          if (error.response && error.response.status === 401) {
            this.$router.push("/"); // Redirect to home if unauthorized
          }
        });
    },
    fetchDivisi() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get("http://192.168.18.43:8000/api/buyer/show/divisi", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.divisiList = response.data.divisi;
        })
        .catch((error) => {
          console.error("Error fetching divisi: ", error);
        });
    },
    fetchDepartemen() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get("http://192.168.18.43:8000/api/buyer/show/departemen", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.departemenList = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching departemen: ", error);
        });
    },
    updateUserData() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      const userData = {
        name: this.userProfile.name,
        email: this.userProfile.email,
        telp: this.userProfile.telp,
        address: this.userProfile.address,
        company_code: this.userProfile.company_code,
        company_name: this.userProfile.company_name,
        divisi_code: this.selectedDivisi,
        departemen_code: this.selectedDepartemen,
      };

      axios
        .post("http://192.168.18.43:8000/api/buyer/update/profile", userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("User data updated successfully: ", response.data);
        })
        .catch((error) => {
          console.error("Error updating user data: ", error);
        });
    },
  },
};
</script>

<style scoped>
form {
  padding: 2rem;
  border-radius: 1rem;
}
</style>
