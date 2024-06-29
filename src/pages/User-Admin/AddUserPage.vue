<template>
  <div class="p-2.5 xl:p-5">
    <form @submit.prevent="createUserData" class="bg-white p-6 rounded-md shadow-md">
      <!-- Input Nama Perusahaan -->
      <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-600">Name:</label>
        <input type="text" id="name" name="name" v-model="createUser.name"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <p v-if="errors.name" class="text-red-600 text-sm">{{ errors.name }}</p>
      </div>

      <!-- Input Email Perusahaan -->
      <div class="mb-4">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-600">Email:</label>
        <input type="text" id="email" name="email" v-model="createUser.email"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <p v-if="errors.email" class="text-red-600 text-sm">{{ errors.email }}</p>
      </div>

      <!-- Input Password -->
      <div class="mb-4">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-600">Password:</label>
        <input type="password" id="password" name="password" v-model="createUser.password"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <p v-if="errors.password" class="text-red-600 text-sm">{{ errors.password }}</p>
      </div>

      <!-- Input Password Confirmation -->
      <div class="mb-4">
        <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-600">Password
          Confirmation:</label>
        <input type="password" id="password_confirmation" name="password_confirmation"
          v-model="createUser.password_confirmation"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <p v-if="errors.password_confirmation" class="text-red-600 text-sm">{{ errors.password_confirmation }}</p>
      </div>

      <!-- Input Divisi -->
      <div class="mb-4">
        <label for="divisi" class="block mb-2 text-sm font-medium text-gray-600">Division:</label>
        <select id="divisi" v-model="selectedDivisi"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option v-for="divisi in divisiList" :key="divisi.code" :value="divisi.code">
            {{ divisi.name }}
          </option>
        </select>
        <p v-if="errors.divisi" class="text-red-600 text-sm">{{ errors.divisi }}</p>
      </div>

      <!-- Input Departemen -->
      <div class="mb-4">
        <label for="departemen" class="block mb-2 text-sm font-medium text-gray-600">Department:</label>
        <select id="departemen" v-model="selectedDepartemen"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option v-for="departemen in departemenList" :key="departemen.code" :value="departemen.code">
            {{ departemen.name }}
          </option>
        </select>
        <p v-if="errors.departemen" class="text-red-600 text-sm">{{ errors.departemen }}</p>
      </div>

      <div class="mt-4">
        <button type="submit"
          class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-250 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add User
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
  name: "createUser",
  data() {
    return {
      createUser: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        divisi_code: "",
        departemen_code: "",
      },
      divisiList: [],
      selectedDivisi: "",
      departemenList: [],
      selectedDepartemen: "",
      showPassword: false,
      showPasswordConfirmation: false,
      errors: {},
    };
  },
  mounted() {
    this.fetchDivisi();
    this.fetchDepartemen();
  },
  methods: {
    fetchDivisi() {
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
        .get(`${apiBaseUrl}buyer/departemen`, {
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
    validateForm() {
      this.errors = {};

      if (!this.createUser.name) {
        this.errors.name = "Name is required";
      }

      if (!this.createUser.email) {
        this.errors.email = "Email is required";
      } else if (!/.+@.+\..+/.test(this.createUser.email)) {
        this.errors.email = "Email must be valid";
      }

      if (!this.createUser.password) {
        this.errors.password = "Password is required";
      }

      if (!this.createUser.password_confirmation) {
        this.errors.password_confirmation = "Password confirmation is required";
      } else if (this.createUser.password !== this.createUser.password_confirmation) {
        this.errors.password_confirmation = "Passwords do not match";
      }

      if (!this.selectedDivisi) {
        this.errors.divisi = "Division is required";
      }

      if (!this.selectedDepartemen) {
        this.errors.departemen = "Department is required";
      }

      return Object.keys(this.errors).length === 0;
    },
    createUserData() {
      if (!this.validateForm()) {
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      const userData = {
        name: this.createUser.name,
        email: this.createUser.email,
        password: this.createUser.password,
        password_confirmation: this.createUser.password_confirmation,
        divisi_code: this.selectedDivisi,
        departemen_code: this.selectedDepartemen,
      };

      axios
        .post(`${apiBaseUrl}buyer/userApproval`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("User data created successfully: ", response.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User berhasil ditambahkan!",
            confirmButtonText: "OK",
          }).then(() => {
            this.$router.push("/user-management");
          });
        })
        .catch((error) => {
          console.error("Error creating user data: ", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to create user.",
          });
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
