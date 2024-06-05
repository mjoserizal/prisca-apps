<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-center flex">
      <q-avatar size="100px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="Avatar" />
      </q-avatar>
      <div class="q-pa-md row-items-center">
        <div class="text-h4">{{ vendorDetail.name }}</div>
        <div class="text-h6">{{ vendorDetail.email }}</div>
      </div>
    </div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Alamat</div>
        <div>{{ vendorDetail.master.alamat || "Alamat tidak tersedia" }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Telepon</div>
        <div>{{ vendorDetail.telp }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Website</div>
        <div>{{ vendorDetail.master.website }}</div>
      </q-card-section>

      <!-- Tambahkan bagian lainnya sesuai kebutuhan -->
    </q-card>
    <q-btn label="Edit Profile" @click="toggleEditProfile" class="q-mt-md" />
    <VendorProfile v-if="showEditProfile" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import axios from "axios";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "VendorProfilePage",
  components: {
    VendorProfile: defineAsyncComponent(() =>
      import("src/components/vendor/VendorProfileForm.vue")
    ),
  },
  data() {
    return {
      vendorDetail: {
        name: "",
        telp: "",
        master: {
          alamat: "",
        },
      },
      showEditProfile: false,
      token: localStorage.getItem("token") || "",
    };
  },
  methods: {
    async fetchVendorData() {
      try {
        const response = await axios.get(`${apiBaseUrl}vendor/profile`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.status === 200) {
          this.vendorDetail = response.data.user;
        } else {
          console.error("Failed to fetch vendor data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    },
    toggleEditProfile() {
      this.showEditProfile = !this.showEditProfile;
    },
  },
  mounted() {
    this.fetchVendorData();
  },
};
</script>

<style scoped>
/* Gaya khusus untuk halaman profil vendor */
.text-h4 {
  margin-left: 20px;
  font-weight: bold;
}
</style>
