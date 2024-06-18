<template>
  <q-page>
    <div class="container-box">
      <h1 class="q-pa-md text-center font-bold text-lg">
        Orders Detail
      </h1>
    </div>
    <q-container>
      <q-card class="rounded-md shadow-md m-6 p-4" v-if="order">
        <q-card-section>
          <div class="invoice-header">
            <div>
              <q-img src="/public/images/prisca logo.png" style="margin-right: 8px; height: 100px; width: 100px" />
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
          <div>Total Price: {{ formatToRupiah(totalPrice) }}</div>
        </q-card-section>

        <q-card-section class="text-h6 flex justify-end">
          <q-btn v-if="order.status === 'selesai'" label="Buat Invoice" color="primary" class="q-mr-sm"
            @click="sendInvoice" />
          <q-btn label="Konfirmasi Pengiriman" color="primary" @click="editOrder">
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
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "OrderDetail",
  data() {
    return {
      orderId: null,
      order: null,
      resiNumber: "",
      totalPrice: 0,
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
    };
  },
  async mounted() {
    this.orderId = this.$route.params.id;
    await this.fetchOrderDetail();
    await this.fetchShipment();
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
        (total, item) => total + item.amount,
        0
      );
    },

    formatToRupiah(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },

    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("id-ID", options);
    },

    editOrder() {
      this.resiNumber = this.order.no_resi || "";
      Swal.fire({
        title: "Input Shipping Receipt",
        input: "text",
        inputValue: this.resiNumber,
        showCancelButton: true,
        confirmButtonText: "Save",
        preConfirm: (resiNumber) => {
          if (!resiNumber) {
            Swal.showValidationMessage("Please enter a receipt number");
          }
          return resiNumber;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.resiNumber = result.value;
          this.confirmSaveEdit();
        }
      });
    },

    async confirmSaveEdit() {
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
          no_resi: this.resiNumber,
          order_id: this.orderId,
        };

        const response = await axios.post(
          `${apiBaseUrl}vendor/shipment`,
          payload,
          config
        );

        if (response.data.success) {
          this.order.no_resi = this.resiNumber;
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Shipping receipt updated successfully.",
          });
        } else {
          console.error("Failed to update shipping receipt:", response.data.message);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update shipping receipt.",
          });
        }
      } catch (error) {
        console.error("Failed to update shipping receipt:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update shipping receipt.",
        });
      }
    },

    async sendInvoice() {
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

        const response = await axios.post(
          `${apiBaseUrl}vendor/invoice/${this.orderId}`,
          {},
          config
        );

        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Invoice sent successfully.",
          });
        } else {
          console.error("Failed to send invoice:", response.data.message);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to send invoice.",
          });
        }
      } catch (error) {
        console.error("Failed to send invoice:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to send invoice.",
        });
      }
    },

    viewProof() {
      if (this.order.bukti) {
        Swal.fire({
          title: "Proof of Receipt",
          imageUrl: this.order.bukti,
          imageAlt: "Proof of Receipt",
          showCloseButton: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Proof of receipt not found.",
        });
      }
    },
  },
};
</script>

<style scoped>
.container-box {
  background-color: #f5f5f5;
  padding: 10px;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.info-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.info-block {
  flex: 1;
  padding-right: 20px;
}

.custom-hr {
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.q-btn+.q-btn {
  margin-left: 10px;
}
</style>
