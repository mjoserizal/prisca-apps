<template>
  <q-page class="q-pa-sm">
    <div>
      <q-card style="border-radius: 10px; no-shadow; bg-transparent">
        <q-card-section class="q-pa-sm">
          <q-input
            rounded
            v-model="search"
            outlined
            placeholder="Search Product"
          >
            <template v-slot:append>
              <q-icon v-if="search === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="search = ''"
              />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-col-gutter-sm">
      <div
        class="col-md-4 col-lg-4 col-sm-12 col-xs-12"
        v-for="item in filteredData"
        :key="item.id"
      >
        <card-product :data="item"></card-product>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import { ref, computed } from "vue";
import { useCart } from "../../hooks/cart";

export default defineComponent({
  name: "ProductCatalogues",
  components: {
    CardProduct: defineAsyncComponent(() =>
      import("components/cards/CardProduct.vue")
    ),
  },
  setup() {
    const search = ref("");
    const { cart } = useCart();
    const products = ref([]);

    // Fetch data from API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage

        if (!token) {
          // Redirect to login page or handle unauthorized access if token is not present
          return;
        }

        const response = await fetch(
          "http://192.168.1.29:8000/api/allProduct",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in request headers
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        products.value = data.products;
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Fetch data when component is mounted

    const filteredData = computed(() => {
      return products.value.filter((item) => {
        return item.name.toLowerCase().includes(search.value.toLowerCase());
      });
    });

    return {
      search,
      filteredData,
      cart,
    };
  },
});
</script>

<style scoped>
.my-card {
  height: 100%;
}
</style>
