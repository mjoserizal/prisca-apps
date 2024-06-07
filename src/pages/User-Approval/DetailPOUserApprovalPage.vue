<template>
  <div class="p-2.5 xl:p-5">
    <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
      <q-card-section class="cart-header">
        <div class="text-h6 text-grey-8">
          Purchase Order Approval Details
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <div v-if="approvalDetails">
          <q-list bordered>
            <q-item>
              <q-item-section>
                <q-item-label>Document Code</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ approvalDetails.purchaseOrders.code }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div class="q-pa-md text-right">
            <q-btn color="green" label="Accept" @click="handleApproval('accept')" class="q-mr-sm" />
            <q-btn color="red" label="Reject" @click="handleApproval('reject')" />
          </div>

          <q-separator class="q-my-md" />

          <div class="q-pa-md">
            <div class="text-h6">Line Items</div>
            <q-table v-if="approvalDetails.purchaseOrders.line_items" :rows="approvalDetails.purchaseOrders.line_items"
              :columns="lineItemColumns" row-key="id">
              <template v-slot:body-cell-price="props">
                <q-td :props="props">
                  {{ formatCurrency(props.row.price) }}
                </q-td>
              </template>
            </q-table>
          </div>

          <q-separator class="q-my-md" />

          <div class="q-pa-md">
            <div class="text-h6">Approval Orders</div>
            <q-table :rows="approvalDetails.approvalOrders" :columns="approvalOrderColumns" row-key="id">
              <template v-slot:body-cell-approval_status="props">
                <q-td :props="props">
                  <q-btn :color="props.row.approval_status === 'approved'
          ? 'green'
          : props.row.approval_status === 'draft'
            ? 'blue'
            : 'red'
          " flat dense :label="props.row.approval_status" />
                </q-td>
              </template>
              <template v-slot:body-cell-divisi_name="props">
                <q-td :props="props">
                  {{ props.row.company_detail.divisi_name }}
                </q-td>
              </template>
              <template v-slot:body-cell-departemen_name="props">
                <q-td :props="props">
                  {{ props.row.company_detail.departemen_name }}
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
        <div v-else>
          <q-spinner color="primary" />
        </div>
      </q-card-section>
      <q-card-section align="right">
        <router-link to="/purchase-Order-approval">
          <q-btn flat color="deep-orange">Back</q-btn>
        </router-link>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "DetailPOUserApprovalPage",
  props: {
    doc_code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      approvalDetails: null,
      lineItemColumns: [
        { name: 'vendor_name', label: 'Vendor Name', field: 'vendor_name', align: 'left' },
        { name: 'product_name', label: 'Product Name', field: 'name', align: 'left' },
        { name: 'quantity', label: 'Quantity', field: 'quantity', align: 'right' },
        { name: 'price', label: 'Price', field: 'price', align: 'right' },
      ],
      approvalOrderColumns: [
        { name: 'user_name', label: 'User Name', field: 'user_name', align: 'left' },
        { name: 'approval_status', label: 'Status', field: 'approval_status', align: 'left' },
        { name: 'last_activity', label: 'Last Activity', field: 'last_activity', align: 'left' },
        { name: 'divisi_name', label: 'Division', field: row => row.company_detail.divisi_name, align: 'left' },
        { name: 'departemen_name', label: 'Department', field: row => row.company_detail.departemen_name, align: 'left' },
      ],
    };
  },
  methods: {
    fetchApprovalDetails() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get(`${apiBaseUrl}userApproval/approvalOrder/${this.doc_code}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data) {
            this.approvalDetails = response.data;
          } else {
            console.error("Invalid approval detail format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching approval details: ", error);
        });
    },
    handleApproval(action) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      const url = action === 'accept'
        ? `${apiBaseUrl}userApproval/approvalOrder/${this.doc_code}/accept`
        : `${apiBaseUrl}userApproval/approvalOrder/${this.doc_code}/reject`;

      axios
        .post(url, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          Swal.fire("Success", `Order ${action}ed successfully`, "success").then(() => {
            this.$router.push("/purchase-order-approval");
          });
        })
        .catch((error) => {
          console.error(`Error ${action}ing Order:`, error);
          Swal.fire("Error", `Failed to ${action} Order`, "error");
        });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
      }).format(value);
    }
  },
  mounted() {
    this.fetchApprovalDetails();
  }

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

.custom-stepper {
  background-color: #f9f9f9;
  border: none;
  box-shadow: none;
  padding: 0;
}

.cart-header {
  display: flex;
  justify-content: space-between;
}
</style>
