<template>
  <q-page>
    <q-tabs v-model="tab" class="text-h6">
      <q-tab name="detail">
        <router-link :to="{ name: 'orderDetail', params: { id: orderId } }">
          Order Detail
        </router-link>
      </q-tab>
    </q-tabs>
    <q-container>
      <q-card class="rounded-md shadow-md m-6 p-4" v-if="order">
        <q-card-section class="text-h6">Order Details</q-card-section>
        <q-card-section class="flex flex-wrap">
          <div class="w-full md:w-1/2 align-items-start">
            <q-item>
              <q-item-section>
                <q-item-label>Buyer Name:</q-item-label>
              </q-item-section>
              <q-item-section>{{ order.user.name }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Buyer Phone:</q-item-label>
              </q-item-section>
              <q-item-section>{{ order.user.telp }}</q-item-section>
            </q-item>
            <q-item v-if="order.user.alamat">
              <q-item-section>
                <q-item-label>Buyer Address:</q-item-label>
              </q-item-section>
              <q-item-section>{{ order.user.alamat }}</q-item-section>
            </q-item>
          </div>
          <div class="w-full md:w-1/2 align-items-end">
            <q-item>
              <q-item-section>
                <q-item-label>Vendor Name:</q-item-label>
              </q-item-section>
              <q-item-section>{{ order.vendor.name }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Vendor Phone:</q-item-label>
              </q-item-section>
              <q-item-section>{{ order.vendor.telp }}</q-item-section>
            </q-item>
            <q-item v-if="order.vendor.alamat">
              <q-item-section>
                <q-item-label>Vendor Address:</q-item-label>
              </q-item-section>
              <q-item-section>{{ order.vendor.alamat }}</q-item-section>
            </q-item>
          </div>
        </q-card-section>

        <q-card-section class="text-h6">Item Details</q-card-section>
        <q-card-section>
          <q-table
            class="shadow-md"
            flat
            bordered
            :rows="order.line_items"
            :columns="columns"
            row-key="id"
          />
        </q-card-section>

        <q-card-section class="text-h6 flex justify-end">
          <div>Total Price: {{ formatToRupiah(totalPrice) }}</div>
        </q-card-section>

        <q-card-section class="text-h6 flex justify-end">
          <q-btn
            v-if="order.status === 'selesai'"
            label="Kirim Invoice"
            color="primary"
            @click="sendInvoice"
          />
          <q-btn
            label="Konfirmasi Pengiriman"
            color="primary"
            @click="editOrder"
          >
            <q-tooltip anchor="bottom middle" self="top middle">
              Input Shipping Receipt
            </q-tooltip>
          </q-btn>
        </q-card-section>

        <!-- Display receipt number if available -->
        <q-card-section v-if="order.no_resi">
          <q-item>
            <q-item-section>
              <q-item-label>Receipt Number:</q-item-label>
            </q-item-section>
            <q-item-section>{{ order.no_resi }}</q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </q-container>

    <!-- Edit Order Dialog -->
    <q-dialog v-model="editDialog" persistent>
      <q-card>
        <q-card-section class="text-h6">Input Shipping Receipt</q-card-section>
        <q-card-section>
          <q-input
            v-model="resiNumber"
            outlined
            type="text"
            placeholder="Enter Receipt Number"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="primary" @click="cancelEdit" />
          <q-btn label="Save" color="primary" @click="confirmSaveEdit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      editDialog: false,
      resiNumber: "",
      totalPrice: 0,

      columns: [
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
          name: "product_price",
          label: "Product Price",
          align: "right",
          field: "product_price",
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

    editOrder() {
      this.resiNumber = this.order.no_resi || "";
      this.editDialog = true;
    },

    cancelEdit() {
      this.editDialog = false;
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
          this.editDialog = false;
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Receipt number updated successfully.",
          });
        } else {
          console.error(
            "Failed to update receipt number:",
            response.data.message
          );
          // Tambahkan kondisi jika no_resi sudah ada
          if (response.data.message && response.data.message.no_resi) {
            Swal.fire({
              icon: "warning",
              title: "Warning",
              text: `Receipt number already exists: ${this.order.no_resi}`,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to update receipt number.",
            });
          }
        }
      } catch (error) {
        console.error("Failed to update receipt number:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update receipt number.",
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

        const payload = {
          order_id: this.orderId,
        };

        const response = await axios.post(
          `${apiBaseUrl}vendor/invoice`,
          payload,
          config
        );

        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Invoice sent successfully.",
          });
          await this.fetchShipment(); // Memanggil fetchShipment setelah mengirim invoice
        } else {
          console.error(
            "Failed to send invoice:",
            response.data.message || "Unknown error."
          );
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
  },
};
</script>
