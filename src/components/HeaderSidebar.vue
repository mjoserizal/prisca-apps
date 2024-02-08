<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon :name="fabYoutube" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            Prisca Apps
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <q-space />
        <q-btn
          flat
          dense
          round
          icon="fa-solid fa-bag-shopping"
          aria-label="Cart"
          class="q-ml-xs"
        >
          <q-badge
            color="deep-orange"
            text-color="white"
            floating
            v-if="cartItemCount > 0"
          >
            {{ cartItemCount }}
          </q-badge>
        </q-btn>

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
                    <!-- <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar> -->
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Account</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="logout">
                  <q-item-section> Logout </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :model-value="leftDrawerOpen"
      @update:model-value="updateLeftDrawerOpen"
      show-if-above
      bordered
      class="bg-blue-grey-9 text-white"
      :width="220"
    >
      <!-- SIDEBAR HEADER -->
      <div
        class="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5"
      >
        <q-avatar
          size="140px"
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
            <q-item-section>
              <q-item-label class="text-white">{{
                menuItem.text
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <!-- Menu Group -->

        <!-- Others Group -->
        <div></div>
      </q-list>
      <!-- Sidebar Menu -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import store from "app/src/router/store";
export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const vuexStore = useStore(store);
    const cartItemCount = computed(() => store.state.cartItemCount);
    const updateLeftDrawerOpen = (value) => {
      leftDrawerOpen.value = value;
    };

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const menuItems = [
      { icon: "fas fa-home", text: "Catalogue" },
      { icon: "fas fa-shopping-cart", text: "Purchase Cart" },
      { icon: "fas fa-file-invoice", text: "Purchase Request" },
      // Add more menu items as needed
    ];

    return {
      leftDrawerOpen,
      updateLeftDrawerOpen,
      search,
      toggleLeftDrawer,
      menuItems,
      cartItemCount,
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
