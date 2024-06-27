<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1 full-height">
    <!-- Header -->
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <!-- Toolbar -->
      <q-toolbar>
        <!-- Toggle Left Drawer Button -->
        <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu" icon="menu" />

        <!-- Logo -->
        <q-img src="/images/prisca logo.png" style="margin-right: 8px; height: 50px; width: 50px" />

        <q-space />
        <!-- Account Button -->
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn flat round dense icon="account_circle" @click="toggleAccountDropdown">
            <q-menu auto-close>
              <q-list>
                <q-separator />
                <!-- Vendor Profile -->
                <q-item clickable @click="navigateToVendorProfile">
                  <q-item-section> Vendor Profile </q-item-section>
                </q-item>
                <q-separator />
                <!-- Logout Button -->
                <q-item clickable @click="confirmLogout">
                  <q-item-section> Logout </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="text-white full-height drawer-custom"
      style="background-color: #013a63" :width="220">
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <q-avatar size="125px" class="q-mb-md" style="width: 160px; height: 80px">
          <img src="/images/ISM.png" alt="Logo" fit="contain" class="absolute-center" />
        </q-avatar>
      </div>
      <!-- Sidebar Menu -->
      <q-list padding class="full-height">
        <!-- Menu Group -->
        <div>
          <h3 class="mb-4 ml-4 text-sm font-semibold text-white">MENU</h3>

          <q-item v-for="menuItem in menuItems" :key="menuItem.text" clickable v-ripple
            @click="navigateTo(menuItem.route)">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" color="white" />
            </q-item-section>
            <q-item-section>{{ menuItem.text }}</q-item-section>
          </q-item>
        </div>
        <!-- Menu Group -->
      </q-list>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container class="full-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";

// Define component name
defineComponent({
  name: "HeaderSidebarVendor",
});

const router = useRouter();

const leftDrawerOpen = ref(false);
let menuItems = [
  {
    icon: "fas fa-home",
    text: "Dashboard",
    route: router.resolve({ name: "listCatalogue" }).href,
  },
  {
    icon: "fas fa-box",
    text: "Product",
    route: router.resolve({ name: "product" }).href,
  },
  {
    icon: "fas fa-file-alt",
    text: "Quotation",
    route: router.resolve({ name: "quotation" }).href,
  },
  {
    icon: "fas fa-file-alt",
    text: "Order",
    route: router.resolve({ name: "order" }).href,
  },
  {
    icon: "fas fa-file-invoice",
    text: "Invoice",
    route: router.resolve({ name: "invoicePage" }).href,
  },
];

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const navigateToVendorProfile = () => {
  router.push({ name: "vendorProfile" });
};

const navigateTo = (route) => {
  router.push(route);
  leftDrawerOpen.value = true; // Close drawer after navigation
};

const confirmLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, logout!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      logout();
    }
  });
};

const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(`${process.env.VUE_APP_API_BASE_URL}logout`, {}, config);
    localStorage.removeItem("token");
    router.push({ name: "login" });

    Swal.fire({
      icon: "success",
      title: "Logged out",
      text: "You have been logged out successfully.",
    });
  } catch (error) {
    console.error("Logout failed:", error);
    Swal.fire({
      icon: "error",
      title: "Logout Failed",
      text: "An error occurred while logging out.",
    });
  }
};
</script>

<style lang="sass">
.full-height
  height: 100%
  display: flex
  flex-direction: column

.drawer-custom
  overflow: hidden


</style>
