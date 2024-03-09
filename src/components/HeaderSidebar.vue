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

        <!-- Cart Button -->
        <!-- Cart Button -->
        <q-btn
          v-if="userLevel !== 'Divisi' && userLevel !== 'company'"
          flat
          dense
          round
          icon="fa-solid fa-bag-shopping"
          aria-label="Cart"
          class="q-ml-xs"
          @click="$router.push(getPurchaseCartRoute())"
        >
          <q-badge
            color="deep-orange"
            text-color="white"
            floating
            v-if="totalCartItems > 0"
          >
            {{ totalCartItems }}
          </q-badge>
        </q-btn>

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
      :model-value="leftDrawerOpen"
      @update:model-value="updateLeftDrawerOpen"
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
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
// import { EventBus } from "src/router/EventBus";
export default {
  name: "HeaderSidebar",
  setup() {
    const router = useRouter();
    const leftDrawerOpen = ref(false);
    const userLevel = localStorage.getItem("userLevel");
    const userRole = localStorage.getItem("userRole");

    let menuItems = [];
    if (userLevel === "Departemen") {
      menuItems = [
        {
          icon: "fas fa-home",
          text: "Dashboard Vendor",
          route: "/listcatalogue",
        },
        {
          icon: "fas fa-shopping-cart",
          text: "Purchase Cart Admin",
          route: "/purchase-cart-Admin",
        },
        {
          icon: "fas fa-file-invoice",
          text: "Purchase Request Admin",
          route: "/purchase-request-Admin",
        },
        // {
        //   icon: "fas fa-user",
        //   text: "User Management",
        //   route: "/user-management",
        // },
      ];
    } else if (userLevel === "Divisi") {
      menuItems = [
        // {
        //   icon: "fas fa-home",
        //   text: "Dashboard Divisi",
        //   route: "/dashboard-divisi",
        // },
        // {
        //   icon: "fas fa-shopping-cart",
        //   text: "Purchase Cart Divisi",
        //   route: "/purchase-cart-divisi",
        // },
        {
          icon: "fas fa-file-invoice",
          text: "Purchase Request Divisi",
          route: "/purchase-request-divisi",
        },
      ];
    } else if (userLevel === "company") {
      menuItems = [
        {
          icon: "fas fa-home",
          text: "Dashboard Admin",
          route: "/dashboard-Admin",
        },
        {
          icon: "fas fa-shopping-cart",
          text: "Purchase Cart Admin",
          route: "/purchase-cart-Admin",
        },
        {
          icon: "fas fa-file-invoice",
          text: "Purchase Request Admin",
          route: "/purchase-request-Admin",
        },
        {
          icon: "fas fa-user",
          text: "User Management",
          route: "/user-management",
        },
        {
          icon: "fas fa-people-group",
          text: "Divisi Departemen Management",
          route: "/Divisi-Departemen-Management",
        },
      ];
    }
    // Add menu for vendor role
    if (userRole === "vendor") {
      menuItems.push(
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
        }
      );
    }

    const cartItems = ref([]);

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const logout = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("token");

          axios
            .post(
              "http://192.168.1.25:8000/api/logout",
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("token");
              router.push("/");
            })
            .catch((error) => {
              console.error("Error logging out:", error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            });
        }
      });
    };
    const navigateToUserProfile = () => {
      router.push("/UserProfile");
    };
    // Fetch cart items from the server
    const fetchCartItems = () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("http://192.168.1.25:8000/api/buyer/show/cart", config)
        .then((response) => {
          cartItems.value = response.data.cart || [];
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    };

    // Calculate total cart items
    const totalCartItems = ref(0);
    watch(cartItems, (newCartItems, oldCartItems) => {
      totalCartItems.value = newCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    });

    // Initial fetch of cart items
    onMounted(fetchCartItems);

    // Listen for the "cartItemChanged" event from EventBus
    // EventBus.on("cartItemChanged", () => {
    //   fetchCartItems(); // Refresh cart items after a change
    // });

    // Method to determine the correct purchase cart route based on the user's level
    const getPurchaseCartRoute = () => {
      if (userLevel === "Departemen") {
        return "/purchase-cart-departemen";
      } else if (userLevel === "Divisi") {
        return "/purchase-cart-divisi";
      } else if (userLevel === "company") {
        return "/purchase-cart-admin";
      }
    };
    let accountText = "Account";

    if (userLevel === "Departemen") {
      accountText = "Departemen";
    } else if (userLevel === "Divisi") {
      accountText = "Divisi";
    } else if (userLevel === "company") {
      accountText = "company";
    }
    return {
      leftDrawerOpen,
      menuItems,
      cartItems,
      totalCartItems,
      toggleLeftDrawer,
      logout,
      getPurchaseCartRoute,
      accountText,
      navigateToUserProfile,
    };
  },
};
</script>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0, 0, 0, .24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
