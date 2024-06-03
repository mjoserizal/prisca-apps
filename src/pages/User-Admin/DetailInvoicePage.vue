<template>
  <div class="container-box">
    <div class="payment-header q-pa-md">
      <div class="payment-header-content">
        <div class="payment-header-left">
          <h2 style="font-weight: bold;">payment</h2>
          <p>payment Number: {{ payment.no_payment }}</p>
          <p>Sender: {{ vendor.name }}</p>
          <p>Address: {{ vendor.alamat }}</p>
          <p>Phone: {{ vendor.telp }}</p>
          <p>Bank: {{ vendor.bank }}</p>
          <p>Account Number: {{ vendor.no_rek }}</p>
        </div>
        <div class="payment-header-right">
          <p>payment Date: {{ formatDate(payment.created_at) }}</p>
          <p>Status: {{ payment.status }}</p>
          <p>Recipient: {{ buyer.name }}</p>
          <p>Address: {{ buyer.alamat }}</p>
          <p>Phone: {{ buyer.telp }}</p>
        </div>
      </div>
    </div>

    <div class="payment-body">
      <div class="header">
        <div class="row items-center">
          <div class="col-2 text-center">Item</div>
          <div class="col-5 text-center">Discount</div>
          <div class="col-1 text-center">Quantity</div>
          <div class="col-2 text-center">Price</div>
          <div class="col-2 text-center">Total</div>
        </div>
      </div>

      <div class="row items-center" v-for="(item, index) in lineItems" :key="index">
        <div class="col-2 text-center">{{ item.name }}</div>
        <div class="col-5 text-center">{{ item.discount === null ? '0%' : item.discount }}</div>
        <div class="col-1 text-center">{{ item.quantity }}</div>
        <div class="col-2 text-center">{{ formatCurrency(item.price) }}</div>
        <div class="col-2 text-center">{{ formatCurrency(item.amount) }}</div>
      </div>
    </div>

    <div class="payment-footer q-pa-md">
      <div class="row justify-end">
        <div class="col-auto">
          <p><strong>Total Amount:</strong> {{ formatCurrency(payment.total_bayar) }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="navigation-buttons" style="display: flex; justify-content: space-between; margin: 20px;">
    <q-btn @click="$router.push('/order-Admin')" class="q-mb-md" label="Back" color="primary" />
    <q-btn v-if="payment.status === 'pending'" @click="paymentReceived" class="q-mb-md" label="Payment Received"
      color="primary" />
    <q-btn v-if="payment.status === 'success'" :href="payment.pdf_url" class="q-mb-md" label="Download Invoice"
      color="primary" target="_blank" />
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "DetailpaymentPage",
  data() {
    return {
      payment: {
        no_payment: "",
        status: "",
        total_bayar: 0,
        created_at: "",
      },
      buyer: {
        name: "",
        alamat: "",
        telp: "",
      },
      vendor: {
        name: "",
        alamat: "",
        telp: "",
        bank: "",
        no_rek: "",
      },
      lineItems: [],
    };
  },
  methods: {
    fetchpaymentDetails() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        return;
      }

      const paymentId = this.$route.params.id;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`http://192.168.16.70:8000/api/buyer/payment/${paymentId}`, config)
        .then((response) => {
          if (response.data && response.data.success) {
            this.payment = response.data.data.payment;
            this.buyer = response.data.data.buyer;
            this.vendor = response.data.data.vendor;
            this.lineItems = response.data.data.line_items;
          } else {
            console.error("Invalid payment data format:", response.data);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.$router.push("/");
          } else {
            console.error("Error fetching payment details:", error);
            Swal.fire("Error", "Failed to fetch payment details. Please try again later.", "error");
          }
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
    paymentReceived() {
      const paymentId = this.$route.params.id;
      Swal.fire({
        title: "Upload Receipt",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-label": "Upload your receipt",
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: (file) => {
          if (!file) {
            Swal.showValidationMessage("Please select an image file");
            return;
          }
          const formData = new FormData();
          formData.append("bukti", file);

          return axios.post(`http://192.168.16.70:8000/api/buyer/payment/${paymentId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then(response => {
              if (!response.data.success) {
                throw new Error(response.data.message || "Failed to upload receipt");
              }
              return response.data;
            })
            .catch(error => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Success", "Receipt uploaded successfully", "success");
          this.fetchPaymentDetails(); // Refresh payment details
        }
      });
    },
  },
  mounted() {
    this.fetchpaymentDetails();
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

.payment-header {
  background-color: #f9f9f9;
  border-bottom: 2px solid #ddd;
}

.payment-header-content {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.payment-header-left {
  flex: 1;
}

.payment-header-right {
  flex: 1;
  text-align: right;
}

.payment-body {
  padding: 20px;
}

.payment-body .header {
  background-color: #f0f0f0;
  font-weight: bold;
  padding: 10px 0;
  margin-bottom: 10px;
}

.payment-footer {
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
  padding: 20px;
}

.navigation-buttons {
  margin: 20px;
}
</style>
