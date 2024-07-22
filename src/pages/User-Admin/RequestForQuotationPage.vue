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
              @click="sendQuotationByVendor(props.row.vendor_name)" />
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
      addressOptions: [], // Options for address dropdown
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
              address: "", // Placeholder for address
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
    this.fetchAddresses(); // Fetch addresses on mount
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
        .get(`${apiBaseUrl}buyer/purchaseRequest/${this.id}`, config)
        .then((response) => {
          this.purchaseRequest = response.data.purchaseRequest;
        })
        .catch((error) => {
          console.error("Error fetching purchase request:", error);
        });
    },

    async fetchAddresses() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        return;
      }

      try {
        const response = await axios.get(`${apiBaseUrl}buyer/address`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Log the entire response for inspection
        console.log("API Response:", response.data);

        // Check if the response data is an array of addresses
        if (Array.isArray(response.data)) {
          // If response.data is an array, use it directly
          this.addressOptions = response.data.map((address) => ({
            label: address.address,
            value: address.address,
          }));
        } else if (Array.isArray(response.data.addresses)) {
          // If response.data has addresses field, use it
          this.addressOptions = response.data.addresses.map((address) => ({
            label: address.address,
            value: address.address,
          }));
        } else {
          // Log if data does not match the expected format
          console.error("Unexpected address data format:", response.data);
          throw new Error("Unexpected address data format.");
        }

        // Log the address options
        console.log("Address Options:", this.addressOptions);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    },

    async sendQuotationByVendor(vendorName) {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        return;
      }

      const purchaseRequestId = this.$route.params.id; // Get ID from URL

      try {
        // Show SweetAlert2 prompt
        const { value: selectedAddress } = await Swal.fire({
          title: 'Select Address',
          input: 'select',
          inputOptions: this.addressOptions.reduce((acc, option) => {
            acc[option.value] = option.label;
            return acc;
          }, {}),
          inputPlaceholder: 'Select an address',
          showCancelButton: true,
          confirmButtonText: 'Send Quotation',
          cancelButtonText: 'Cancel',
        });

        if (selectedAddress) {
          // Ensure selectedAddress is a string
          const requestData = {
            purchase_request_id: purchaseRequestId,
            vendor_name: vendorName,
            company_address: String(selectedAddress), // Convert to string
            line_items: this.purchaseRequest.lineItems.filter(
              (item) => item.vendor_name === vendorName
            ),
          };

          await axios.post(
            `${apiBaseUrl}buyer/requestForQuotation`,
            requestData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          Swal.fire("Success", "Quotation request sent successfully!", "success");
        } else {
          Swal.fire("Cancelled", "Quotation request not sent.", "info");
        }
      } catch (error) {
        console.error("Error sending quotation request:", error);
        Swal.fire("Error", "Failed to send quotation request. Please try again later.", "error");
      }
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
