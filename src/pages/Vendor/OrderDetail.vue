<template>
  <q-page>
    <div class="container-box">
      <h1 class="q-pa-md text-center font-bold text-lg">
        Order Detail
      </h1>
    </div>
    <q-container>
      <q-card class="rounded-md shadow-md m-6 p-4" v-if="order">
        <q-card-section>
          <div class="invoice-header">
            <div>
              <q-img src="/images/prisca logo.png" style="margin-right: 8px; height: 100px; width: 100px" />
            </div>
            <div>
              <div class="text-right">
                <div class="text-h5">Purchase Order</div>
                <div>
                  <strong>Referensi</strong>: {{ order.po_code }}
                </div>
                <div>
                  <strong>Tanggal</strong>: {{ formatDate(order.tanggal_order) }}
                </div>
                <div>
                  <strong>Status</strong>: {{ order.status }}
                </div>
                <div v-if="order.no_resi">
                  <strong>No Resi</strong>: {{ order.no_resi }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="info-section">
            <div class="info-block">
              <div class="text-h6">Info Perusahaan</div>
              <hr class="custom-hr" />
              <div>{{ order.vendor.name }}</div>
              <div>Telp: {{ order.vendor.telp }}</div>
              <div>{{ order.vendor.alamat }}</div>
            </div>

            <div class="info-block">
              <div class="text-h6">Order Ke</div>
              <hr class="custom-hr" />
              <div>{{ order.user.name }}</div>
              <div>{{ order.user.alamat }}</div>
              <div>Telp: {{ order.user.telp }}</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="text-h6">Item Details</q-card-section>
        <q-card-section>
          <q-table class="shadow-md" flat bordered :rows="order.line_items" :columns="columns" row-key="id">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props"
                  :class="col.align === 'right' ? 'text-right' : ''">
                  {{ col.value }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>

        <q-card-section class="text-h6 flex justify-end">
          <div>Harga Ongkir: {{ formatToRupiah(order.harga_ongkir) }}</div>
        </q-card-section>
        <q-card-section class="text-h6 flex justify-end">
          <div>Total Price: {{ formatToRupiah(totalPrice) }}</div>
        </q-card-section>

        <q-card-section class="text-h6 flex justify-end">
          <q-btn v-if="order.status === 'selesai'" label="Buat Invoice" color="primary" class="q-mr-sm"
            @click="sendInvoice" />
          <q-btn label="Konfirmasi Pengiriman" color="primary" class="q-mr-sm" @click="editOrder">
            <q-tooltip anchor="bottom middle" self="top middle">
              Input Shipping Receipt
            </q-tooltip>
          </q-btn>
          <q-btn v-if="order.status === 'selesai' && order.bukti" label="Lihat Bukti Barang" color="secondary"
            @click="viewProof">
            <q-tooltip anchor="bottom middle" self="top middle">
              View Proof of Shipment
            </q-tooltip>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-container>
    <q-container>
      <q-card class="rounded-md shadow-md m-6 p-4">

        <!-- Returned Items Section -->
        <q-card-section v-if="returns.length > 0" class="text-h6">Returned Items</q-card-section>
        <q-card-section v-if="returns.length > 0">
          <q-table class="shadow-md" flat bordered :rows="returns" :columns="returnColumns" row-key="id">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props"
                  :class="col.align === 'right' ? 'text-right' : ''">
                  <template v-if="col.name === 'actions'">
                    <q-btn label="Approve" color="positive" class="q-mr-sm"
                      @click="updateReturnStatus(props.row.product_id, 'approved')" />
                    <q-btn label="Reject" color="negative"
                      @click="updateReturnStatus(props.row.product_id, 'rejected')" />
                  </template>
                  <template v-else>
                    {{ col.value }}
                  </template>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <!-- No Return Data Section -->
        <q-card-section v-if="returns.length === 0" class="text-h6">Returned Items</q-card-section>
        <q-card-section v-if="returns.length === 0" class="text-body2 text-center text-grey-7">
          Tidak ada data pengembalian.
        </q-card-section>

        <!-- Tombol Send Approved Returns -->
        <q-card-section class="text-h6 flex justify-end">
          <div class="q-pa-md">
            <q-btn label="Send Approved Returns" color="primary" @click="sendApprovedReturns" />
          </div>
        </q-card-section>
      </q-card>
    </q-container>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "OrderDetail",
  data() {
    return {
      orderId: null,
      order: null,
      resiNumber: "",
      totalPrice: 0,
      returns: [],
      columns: [
        {
          name: "name",
          label: "Product Name",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "quantity",
          label: "Quantity",
          align: "center",
          field: "quantity",
          sortable: true,
        },
        {
          name: "price",
          label: "Product Price",
          align: "right",
          field: "price",
          sortable: true,
        },
        {
          name: "amount",
          label: "Total Price",
          align: "right",
          field: "amount",
          sortable: true,
        },
      ],
      returnColumns: [
        {
          name: "product_name",
          label: "Product Name",
          align: "left",
          field: "product_name",
          sortable: true,
        },
        {
          name: "quantity",
          label: "Quantity",
          align: "center",
          field: "quantity",
          sortable: true,
        },
        {
          name: "reason",
          label: "Reason",
          align: "left",
          field: "reason",
          sortable: true,
        },
        {
          name: "status",
          label: "Status",
          align: "center",
          field: "status",
          sortable: true,
        },
        {
          name: 'created_at',
          label: 'Created At',
          align: 'right', field: row => this.formatDate(row.created_at),
          sortable: true
        },

        {
          name: "actions",
          label: "Actions",
          align: "center",
          field: "actions",
        },
      ],


    };
  },
  async mounted() {
    this.orderId = this.$route.params.id;
    await this.fetchOrderDetail();
    await this.fetchShipment();
    await this.fetchReturns();
  },
  methods: {
    async fetchOrderDetail() {
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

        const response = await axios.get(
          `${apiBaseUrl}vendor/order/${this.orderId}`,
          config
        );

        if (response.data.success) {
          this.order = response.data.orders;
          this.calculateTotalPrice();
        } else {
          console.error("Failed to fetch order detail:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch order detail:", error);
      }
    },

    async fetchShipment() {
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

        const response = await axios.get(
          `${apiBaseUrl}vendor/shipment/${this.orderId}`,
          config
        );

        if (response.data.success) {
          this.order.no_resi = response.data.shipment.no_resi;
          this.order.bukti = response.data.shipment.bukti;
        } else {
          console.error("Failed to fetch shipment:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch shipment:", error);
      }
    },

    calculateTotalPrice() {
      this.totalPrice = this.order.line_items.reduce(
        (sum, item) => sum + item.amount,
        0
      ) + this.order.harga_ongkir;
    },

    formatToRupiah(value) {
      const formattedValue = value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formattedValue;
    },

    formatDate(date) {
      const formattedDate = dayjs(date).format('DD MMM YYYY, HH:mm');
      return formattedDate;
    },

    editOrder() {
      Swal.fire({
        title: "Enter Tracking Number",
        input: "text",
        inputPlaceholder: "Tracking Number",
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        preConfirm: (resiNumber) => {
          if (!resiNumber) {
            Swal.showValidationMessage("Please enter the tracking number.");
          } else {
            this.resiNumber = resiNumber;
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.sendShipment();
        }
      });
    },

    async sendShipment() {
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

        const data = {
          order_id: this.orderId,
          no_resi: this.resiNumber,
        };

        const response = await axios.post(
          `${apiBaseUrl}vendor/shipment`,
          data,
          config
        );

        if (response.data.success) {
          Swal.fire("Success", "Shipment tracking number updated.", "success");
          this.fetchShipment();
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      } catch (error) {
        console.error("Failed to send shipment:", error);
        Swal.fire("Error", "Failed to send shipment.", "error");
      }
    },

    sendInvoice() {
      Swal.fire({
        title: "Confirm",
        text: "Are you sure you want to generate an invoice?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, generate it!",
        cancelButtonText: "No, cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.sendInvoiceRequest();
        }
      });
    },

    async sendInvoiceRequest() {
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

        const payload = {
          order_id: this.orderId,
        };

        const response = await axios.post(
          `${apiBaseUrl}vendor/invoice`,
          payload,
          config
        );

        if (response.data.success) {
          Swal.fire("Generated!", "Your invoice has been generated.", "success");
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      } catch (error) {
        console.error("Failed to send invoice:", error);
        Swal.fire("Error", "Failed to send invoice.", "error");
      }
    },


    viewProof() {
      Swal.fire({
        title: "Proof of Shipment",
        html: `<img src="${this.order.bukti}" alt="Proof of Shipment" class="w-full" />`,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Close",
      });
    },

    async fetchReturns() {
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

        const response = await axios.get(
          `${apiBaseUrl}vendor/pengembalian/${this.orderId}`,
          config
        );

        if (response.data.message === "Returns retrieved successfully") {
          this.returns = response.data.pengembalians;
        } else if (response.data.message === "No returns found for this order ID") {
          this.returns = [];
        } else {
          console.error("Failed to fetch returns:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch returns:", error);
      }
    },

    async updateReturnStatus(productId, status) {
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

        const data = {
          statuses: [
            {
              product_id: productId,
              status: status,
            },
          ],
        };

        const response = await axios.post(
          `${apiBaseUrl}vendor/pengembalian/${this.orderId}`,
          data,
          config
        );

        if (response.status === 200) {
          Swal.fire("Success", `Return status updated to ${status}.`, "success");
          await this.fetchReturns();
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      } catch (error) {
        console.error("Failed to update return status:", error);
        Swal.fire("Error", "Failed to update return status.", "error");
      }
    },

    async sendApprovedReturns() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found.");
          return;
        }

        const approvedReturns = this.returns.filter(item => item.status === 'approved');
        if (approvedReturns.length === 0) {
          Swal.fire("Warning", "No approved returns to send.", "warning");
          return;
        }

        const replacements = approvedReturns.map(item => ({
          product_id: item.product_id,
        }));

        const payload = {
          order_id: this.orderId,
          replacements,
        };

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.post(
          `${apiBaseUrl}vendor/pengembalian`,
          payload,
          config
        );

        if (response.status === 200) {
          Swal.fire("Success", "Approved returns sent successfully.", "success");
          await this.fetchReturns();
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      } catch (error) {
        console.error("Failed to send approved returns:", error);
        Swal.fire("Error", "Failed to send approved returns.", "error");
      }
    },
  },
};
</script>

<style>
.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-section {
  display: flex;
  justify-content: space-between;
}

.info-block {
  flex: 1;
}

.custom-hr {
  border: none;
  height: 1px;
  background-color: #ddd;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
