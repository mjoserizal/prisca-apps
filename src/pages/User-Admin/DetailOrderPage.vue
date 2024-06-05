<template>
  <div class="container-box">
    <div class="invoice-header q-pa-md">
      <div class="invoice-header-content">
        <div class="invoice-header-left">
          <h2 style="font-weight: bold;">Order</h2>
          <p>Receipt Order: {{ order.so_code }}</p>
          <p>Sender: {{ order.vendor.name }}</p>
          <p>Address: {{ order.vendor.alamat }}</p>
          <p>Phone: {{ order.vendor.telp }}</p>
        </div>
        <div class="invoice-header-right">
          <p>Order Date: {{ formatDate(order.tanggal_order) }}</p>
          <p>Status: {{ order.status }}</p>
          <p>Recipient: {{ order.user.name }}</p>
          <p>Address: {{ order.user.alamat }}</p>
          <p>Phone: {{ order.user.telp }}</p>
        </div>
      </div>
    </div>

    <div class="invoice-body">
      <div class="header">
        <div class="row items-center">
          <div class="col-2 text-center">Item</div>
          <div class="col-5 text-center">Discount</div>
          <div class="col-1 text-center">Quantity</div>
          <div class="col-2 text-center">Price</div>
          <div class="col-2 text-center">Total</div>
        </div>
      </div>

      <div class="row items-center" v-for="(item, index) in order.line_items" :key="index">
        <div class="col-2 text-center">{{ item.name }}</div>
        <div class="col-5 text-center">{{ item.discount === null ? '0%' : item.discount }}</div>
        <div class="col-1 text-center">{{ item.quantity }}</div>
        <div class="col-2 text-center">{{ formatCurrency(item.price) }}</div>
        <div class="col-2 text-center">{{ formatCurrency(item.amount) }}</div>
      </div>
    </div>

    <!-- New Shipment Section -->
    <div class="shipment-details">
      <h3>Shipment</h3>
      <p><strong>Tracking Number:</strong> {{ shipment.no_resi }}</p>
    </div>

    <div class="invoice-footer q-pa-md">
      <div class="row justify-end">
        <div class="col-auto">
          <p><strong>Total Paid:</strong> {{ formatCurrency(order.total) }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="back-button" style="margin: 20px; float: left;">
    <q-btn @click="$router.push('/Order-Admin')" class="q-mb-md" label="Back" color="primary" />
  </div>
  <div class="order-received-button" style="margin: 20px; float: right;">
    <q-btn @click="orderReceived" class="q-mb-md" label="Order Received" color="primary" />
  </div>

</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "DetailOrderPage",
  data() {
    return {
      order: {
        user: {},
        vendor: {},
        line_items: [],
        total: 0,
      },
      shipment: {
        no_resi: "",
      },
    };
  },
  methods: {
    fetchOrderDetails() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        return;
      }

      const orderId = this.$route.params.id;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`http://127.0.0.1:8000/api/buyer/order/${orderId}`, config)
        .then((response) => {
          if (response.data && response.data.success && response.data.orders) {
            this.order = response.data.orders;
            // Calculate the total amount
            this.order.total = this.order.line_items.reduce((total, item) => {
              return total + item.amount;
            }, 0);
          } else {
            console.error("Invalid order data format:", response.data);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.$router.push("/");
          } else {
            console.error("Error fetching order details:", error);
            Swal.fire("Error", "Failed to fetch order details. Please try again later.", "error");
          }
        });
    },
    fetchShipmentDetails() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        return;
      }

      const orderId = this.$route.params.id;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.get(`http://127.0.0.1:8000/api/buyer/shipment/${orderId}`, config)
        .then((response) => {
          if (response.data && response.data.success && response.data.order) {
            this.shipment = response.data.order;
          } else {
            console.error("Invalid shipment data format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching shipment details:", error);
          Swal.fire("Error", "Failed to fetch shipment details. Please try again later.", "error");
        });
    },
    orderReceived() {
      Swal.fire({
        title: 'Order Received',
        text: 'Please upload an image to confirm the order has been received:',
        input: 'file',
        inputAttributes: {
          accept: 'image/*',
          'aria-label': 'Upload your order received image'
        },
        confirmButtonText: 'Submit',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: (file) => {
          const formData = new FormData();
          formData.append('bukti', file); // Ganti 'image' dengan kunci yang benar

          const token = localStorage.getItem('token');
          if (!token) {
            return Promise.reject('Access token not found in localStorage');
          }

          const orderId = this.$route.params.id;
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          };

          return axios.post(`http://127.0.0.1:8000/api/buyer/shipment/${orderId}`, formData, config)
            .then((response) => {
              if (response.data.success) {
                Swal.fire('Order Received!', 'Your order has been successfully received.', 'success');
              } else {
                return Promise.reject('Failed to receive order. Please try again later.');
              }
            })
            .catch((error) => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
    },

    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  mounted() {
    this.fetchOrderDetails();
    this.fetchShipmentDetails();
  },
};
</script>


<style scoped>
.container-box {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px;
  border: 1px solid #ddd;
}

.invoice-header {
  background-color: #f9f9f9;
  border-bottom: 2px solid #ddd;
}

.invoice-header-content {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.invoice-header-left {
  flex: 1;
}

.invoice-header-right {
  flex: 1;
  text-align: right;
}

.invoice-body {
  padding: 20px;
}

.invoice-body .header {
  background-color: #f0f0f0;
  font-weight: bold;
  padding: 10px 0;
  margin-bottom: 10px;
}

.shipment-details {
  padding: 20px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
  margin-top: 20px;
}

.invoice-footer {
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
}
</style>
