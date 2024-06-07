<template>
  <div class="container-box">
    <h1 class="q-pa-md text-center font-bold text-lg">
      Detail Purchase Order
    </h1>
    <div class="q-pa-md" v-if="purchaseOrder">
      <div>
        <p style="text-align: center; font-weight: bold">
          {{ purchaseOrder.code }}
        </p>
        <p style="text-align: center; font-weight: bold">
          {{ purchaseOrder.description }}
        </p>
        <p style="text-align: center; font-weight: bold">
          <q-btn :color="purchaseOrder.status === 'draft' ? 'red' : 'primary'" flat dense
            :label="purchaseOrder.status" />
        </p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <!-- Tampilkan informasi dari setiap lineItem -->
    <div v-if="purchaseOrder && purchaseOrder.line_items" class="q-pa-md">
      <q-table flat bordered ref="tableRef" :class="tableClass" tabindex="0" :rows="purchaseOrder.line_items"
        :columns="lineItemColumns" row-key="id">
        <!-- Kolom actions untuk edit -->

      </q-table>
      <div class="row justify-start">
        <router-link to="/purchase-Order-Admin">
          <q-btn flat color="primary">Back</q-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
const formatToRupiah = (totalPrice) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(totalPrice);
};

export default {
  name: "DetailPurchaseOrderPage",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      purchaseOrder: null,
      showEditButton: true,
      lineItemColumns: [
        {
          name: "name",
          required: true,
          label: "Product Name",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "quantity",
          required: true,
          label: "Quantity",
          align: "center",
          field: "quantity",
          sortable: true,
        },
        {
          name: "discount",
          required: true,
          label: "Discount",
          align: "center",
          field: "discount",
          sortable: true,
          format: (val) => (val === null ? "No Discount" : `${val}%`),
        },
        {
          name: "price",
          required: true,
          label: "Price",
          align: "center",
          field: "price",
          sortable: true,
          format: (val) => formatToRupiah(val),
        },
      ],
    };
  },
  mounted() {
    this.fetchPurchaseOrder();
  },
  methods: {
    fetchPurchaseOrder() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(
          `${apiBaseUrl}buyer/purchaseOrder/${this.id}`,
          config
        )
        .then((response) => {
          this.purchaseOrder = response.data.purchaseOrder;
        })
        .catch((error) => {
          console.error("Error fetching purchase Order:", error);
        });
    },
  },
};
</script>

<style scoped>
.container-box {
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px;
  border: 1px solid #ddd;
}
</style>
