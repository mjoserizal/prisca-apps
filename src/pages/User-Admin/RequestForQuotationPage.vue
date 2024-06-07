<template>
  <div class="container-box">
    <h1 class="q-pa-md text-center font-bold text-lg">Request For Quotation</h1>
    <div class="q-pa-md" v-if="purchaseRequest">
      <div>
        <p style="text-align: center; font-weight: bold">
          {{ purchaseRequest.code }}
        </p>
        <p style="text-align: center; font-weight: bold">
          {{ purchaseRequest.description }}
        </p>
        <p style="text-align: center; font-weight: bold">
          <q-btn :color="purchaseRequest.status === 'draft' ? 'red' : 'primary'" flat dense
            :label="purchaseRequest.status" />
        </p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <!-- Tampilkan informasi dari setiap lineItem -->
    <div v-if="purchaseRequest && purchaseRequest.lineItems" class="q-pa-md">
      <q-table flat bordered ref="tableRef" :class="tableClass" tabindex="0" :rows="groupedLineItems"
        :columns="lineItemColumns" row-key="groupKey">
        <!-- Kolom actions untuk edit -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn v-if="purchaseRequest.status === 'approved'" round dense flat color="green" icon="send"
              @click="sendQuotationByVendor(props.row.name, props.row.groupKey)" />
          </q-td>
        </template>
      </q-table>
      <div class="row justify-start">
        <router-link to="/purchase-request-Admin">
          <q-btn flat color="primary">Back</q-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
const formatToRupiah = (totalPrice) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(totalPrice);
};

export default {
  name: "DetailQuotationPage",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      purchaseRequest: null,
      showEditButton: true,
      lineItemColumns: [
        {
          name: "vendor_name",
          required: true,
          label: "Vendor",
          align: "left",
          field: "vendor_name",
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
          name: "price",
          required: true,
          label: "Price",
          align: "center",
          field: "price",
          sortable: true,
          format: (val) => formatToRupiah(val),
        },
        // Kolom actions untuk edit
        {
          name: "actions",
          required: true,
          label: "Actions",
          align: "center",
          field: "actions",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    groupedLineItems() {
      // Mengelompokkan line items berdasarkan nama vendor
      const groups = {};
      if (this.purchaseRequest && this.purchaseRequest.lineItems) {
        this.purchaseRequest.lineItems.forEach((item) => {
          const groupKey = item.vendor_name;
          if (!groups[groupKey]) {
            groups[groupKey] = {
              groupKey: groupKey,
              vendor_name: item.vendor_name,
              quantity: item.quantity,
              price: item.price,
              actions: item.actions,
            };
          } else {
            groups[groupKey].quantity += item.quantity;
            groups[groupKey].price += item.price;
          }
        });
      }
      return Object.values(groups);
    },
  },
  mounted() {
    this.fetchPurchaseRequest();
  },
  methods: {
    fetchPurchaseRequest() {
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
          `${apiBaseUrl}buyer/purchaseRequest/${this.id}`,
          config
        )
        .then((response) => {
          this.purchaseRequest = response.data.purchaseRequest;
        })
        .catch((error) => {
          console.error("Error fetching purchase request:", error);
        });
    },

    sendQuotationByVendor(vendorName) {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        return;
      }

      const purchaseRequestId = this.$route.params.id; // Mengambil ID dari path URL

      // Filter line items berdasarkan nama vendor
      const lineItemsByVendor = this.purchaseRequest.lineItems.filter(
        (item) => item.vendor_name === vendorName
      );

      console.log("Line Items:", lineItemsByVendor);
      console.log("Vendor:", vendorName);
      console.log("Purchase Request ID:", purchaseRequestId); // Menampilkan ID pembelian

      // Menyiapkan data yang akan dikirim dalam permintaan
      const requestData = {
        purchase_request_id: purchaseRequestId, // Menggunakan ID pembelian dari path URL
        vendor_name: vendorName,
        line_items: lineItemsByVendor,
      };

      axios
        .post(
          `${apiBaseUrl}buyer/requestForQuotation`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Quotation request sent successfully:", response.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Quotation request sent successfully!",
          });
          // Tambahkan logika lainnya sesuai kebutuhan
        })
        .catch((error) => {
          console.error("Error sending quotation request:", error);
          // Tambahkan logika penanganan error lainnya sesuai kebutuhan
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to send quotation request. Please try again later.",
          });
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
