<template>
  <div class="p-2.5 xl:p-5">
    <form @submit.prevent="updateUserData" class="bg-white p-6 rounded-md shadow-md">
      <!-- Input Nama Perusahaan -->
      <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-600">Name:</label>
        <input type="text" id="name" name="name" v-model="userProfile.name"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Input Nomor Telepon Perusahaan -->
      <div class="mb-4">
        <label for="telp" class="block mb-2 text-sm font-medium text-gray-600">Number Phone:</label>
        <input type="text" id="telp" name="telp" v-model="userProfile.telp"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Input Email Perusahaan -->
      <div class="mb-4">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-600">Email:</label>
        <input type="text" id="email" name="email" v-model="userProfile.email"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- Input Alamat Perusahaan -->
      <div class="mb-4">
        <label for="address" class="block mb-2 text-sm font-medium text-gray-600">Address:</label>
        <select id="address" v-model="selectedAddress"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option v-for="address in addressList" :key="address.id" :value="address.address">
            {{ address.address }}
          </option>
        </select>
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
      </div>

      <div class="mt-4">
        <button type="submit"
          class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-250 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "UserProfile",
  data() {
    return {
      userProfile: {
        name: "",
        telp: "",
        email: "",
        company: {
          address: "", // Existing address
        },
      },
      addressList: [], // List of addresses
      selectedAddress: "", // Selected address
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
    this.fetchAddresses(); // Fetch addresses when component mounts
  },
  methods: {
    fetchProfile() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get(`${apiBaseUrl}buyer/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.userProfile = response.data.user;
          this.selectedDivisi = response.data.user.company.divisi_code;
          this.selectedDepartemen = response.data.user.company.departemen_code;
          this.selectedAddress = response.data.user.company.address; // Set the selected address
        })
        .catch((error) => {
          console.error("Error fetching profile: ", error);
          if (error.response && error.response.status === 401) {
            this.$router.push("/"); // Redirect to home if unauthorized
          }
        });
    },
    fetchAddresses() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get(`${apiBaseUrl}buyer/address`, { // Adjust the endpoint if necessary
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.addressList = response.data; // Set the list of addresses
        })
        .catch((error) => {
          console.error("Error fetching addresses: ", error);
        });
    },

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
        address: this.selectedAddress, // Use selected address
        company_code: this.userProfile.company.company_code,
        company_name: this.userProfile.company.company_name,
        divisi_code: this.selectedDivisi,
        departemen_code: this.selectedDepartemen,
      };

      axios
        .post(`${apiBaseUrl}buyer/profile`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("User data updated successfully: ", response.data);
          // Update the user profile with the response data
          this.userProfile = response.data.user;
          this.selectedDivisi = response.data.user.company.divisi_code;
          this.selectedDepartemen = response.data.user.company.departemen_code;

          // Show success alert
          Swal.fire({
            title: 'Success',
            text: 'Profile updated successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Redirect to UserProfile
            const router = useRouter();
            router.push("/UserProfile");
          });
        })
        .catch((error) => {
          console.error("Error updating user data: ", error);
        });
    },
  },
};
</script>
