<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <!-- Header -->
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <!-- Toolbar -->
      <q-toolbar>
        <!-- Toggle Left Drawer Button -->
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <!-- Logo -->
        <q-img
          src="/public/images/prisca logo.png"
          style="margin-right: 8px; height: 50px; width: 50px"
        />

        <q-space />
        <q-btn
          flat
          dense
          round
          @click="toggleDarkMode"
          aria-label="Toggle Dark Mode"
          icon="dark_mode"
        />
        <!-- Account Button -->
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            flat
            round
            dense
            icon="account_circle"
            @click="toggleAccountDropdown"
          >
            <q-menu auto-close>
              <q-list>
                <q-item clickable @click="handleAccountClick">
                  <q-item-section avatar>
                    <q-avatar>
                      <img
                        alt="Avatar"
                        src="https://cdn.quasar.dev/img/boy-avatar.png"
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section @click="navigateToUserProfile">
                    <q-item-label>{{ accountText }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <!-- Vendor Profile -->
                <q-item clickable @click="navigateToVendorProfile">
                  <q-item-section> Vendor Profile </q-item-section>
                </q-item>
                <q-separator />
                <!-- Logout Button -->
                <q-item clickable @click="logout">
                  <q-item-section> Logout </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="text-white"
      style="background-color: #013a63"
      :width="220"
    >
      <!-- Sidebar Header -->
      <div
        class="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5"
      >
        <q-avatar
          size="125px"
          class="q-mb-md"
          style="width: 160px; height: 80px"
        >
          <img
            src="/public/images/ISM.png"
            alt="Logo"
            fit="contain"
            class="absolute-center"
          />
        </q-avatar>
      </div>
      <!-- Sidebar Menu -->
      <q-list padding class="justify-content: center">
        <!-- Menu Group -->
        <div>
          <h3 class="mb-4 ml-4 text-sm font-semibold text-white">MENU</h3>

          <q-item
            v-for="menuItem in menuItems"
            :key="menuItem.text"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" color="white" />
            </q-item-section>
            <router-link :to="menuItem.route" class="text-white">
              <q-item-section>{{ menuItem.text }}</q-item-section>
            </router-link>
          </q-item>
        </div>
        <!-- Menu Group -->

        <!-- Others Group -->
        <div></div>
      </q-list>
      <!-- Sidebar Menu -->
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HeaderSidebarVendor",
  setup() {
    const leftDrawerOpen = ref(false);
    let menuItems = [
      {
        icon: "fas fa-list",
        text: "Catalogue List",
        route: "/listcatalogue",
      },
      {
        icon: "fas fa-box",
        text: "Product",
        route: "/product",
      },
      {
        icon: "fas fa-user",
        text: "Vendor Profile",
        route: "/vendordetail",
      },
      {
        icon: "fas fa-file-alt",
        text: "Quotation",
        route: "/quotation",
      },
    ];

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      leftDrawerOpen,
      menuItems,
      toggleLeftDrawer,
    };
  },
};
</script>

<style lang="sass">
/* Your styles here */
</style>
