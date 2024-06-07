<template>
  <q-page>
    <q-container>
      <q-card class="rounded-md shadow-md m-6 p-4" v-if="invoice">
        <q-card-section class="text-h6">Invoice Details</q-card-section>
        <q-card-section class="flex flex-wrap">
          <div class="w-full md:w-1/2 align-items-start">
            <q-item>
              <q-item-section>
                <q-item-label>Invoice Number:</q-item-label>
              </q-item-section>
              <q-item-section>{{ invoice.payment.no_invoice }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Payment Status:</q-item-label>
              </q-item-section>
              <q-item-section>{{ invoice.payment.status }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Total Payment:</q-item-label>
              </q-item-section>
              <q-item-section>{{
                formatToRupiah(invoice.payment.total_bayar)
              }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Due Date:</q-item-label>
              </q-item-section>
              <q-item-section>{{ invoice.payment.batas_bayar }}</q-item-section>
            </q-item>
          </div>
          <div class="w-full md:w-1/2 align-items-end">
            <q-item>
              <q-item-section>
                <q-item-label>Buyer Name:</q-item-label>
              </q-item-section>
              <q-item-section>{{ invoice.buyer.name }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Buyer Phone:</q-item-label>
              </q-item-section>
              <q-item-section>{{ invoice.buyer.telp }}</q-item-section>
            </q-item>
            <q-item v-if="invoice.buyer.alamat">
              <q-item-section>
                <q-item-label>Buyer Address:</q-item-label>
              </q-item-section>
              <q-item-section>{{ invoice.buyer.alamat }}</q-item-section>
            </q-item>
          </div>
        </q-card-section>

        <q-card-section class="text-h6">Item Details</q-card-section>
        <q-card-section>
          <q-table
            class="shadow-md"
            flat
            bordered
            :rows="invoice.line_items"
            :columns="columns"
            row-key="id"
          />
        </q-card-section>

        <q-card-section class="text-h6 flex justify-end">
          <div>Total Price: {{ formatToRupiah(totalPrice) }}</div>
        </q-card-section>

        <q-card-section v-if="invoice.pdf_url">
          <q-btn
            label="Download Invoice"
            color="primary"
            @click="downloadInvoice"
          />
        </q-card-section>

        <q-card-section v-if="invoice.payment.bukti">
          <q-btn
            label="Mark as Success"
            color="positive"
            @click="markAsSuccess"
          />
        </q-card-section>

        <q-card-section>
          <q-btn
            label="Send Invoice PDF"
            color="primary"
            @click="sendInvoicePdf"
          />
        </q-card-section>
      </q-card>
    </q-container>
  </q-page>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "InvoiceDetail",
  data() {
    return {
      orderId: null,
      invoice: null,
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
          label: "Price",
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
    await this.fetchInvoiceDetail();
  },
  methods: {
    async fetchInvoiceDetail() {
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

        const invoiceResponse = await axios.get(
          `${apiBaseUrl}vendor/invoice/${this.orderId}`,
          config
        );

        if (invoiceResponse.data.success) {
          this.invoice = invoiceResponse.data.data;
          this.calculateTotalPrice();
        } else {
          console.error(
            "Failed to fetch invoice detail:",
            invoiceResponse.data.message
          );
        }
      } catch (error) {
        console.error("Failed to fetch invoice detail:", error);
      }
    },

    calculateTotalPrice() {
      this.totalPrice = this.invoice.line_items.reduce(
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

    async downloadInvoice() {
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
          responseType: "blob",
        };

        const response = await axios.get(this.invoice.pdf_url, config);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `invoice_${this.invoice.payment.no_invoice}.pdf`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Failed to download invoice:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to download invoice",
        });
      }
    },

    async markAsSuccess() {
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
          `${apiBaseUrl}vendor/invoice/${this.orderId}/success`,
          {},
          config
        );

        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Invoice status updated successfully.",
          });
          this.fetchInvoiceDetail();
        } else {
          console.error(
            "Failed to update invoice status:",
            response.data.message
          );
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update invoice status.",
          });
        }
      } catch (error) {
        console.error("Failed to update invoice status:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update invoice status.",
        });
      }
    },

    async sendInvoicePdf() {
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
          `${apiBaseUrl}vendor/invoice/${this.orderId}/pdf`,
          {},
          config
        );

        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Invoice PDF sent successfully.",
          });
        } else {
          console.error("Failed to send invoice PDF:", response.data.message);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to send invoice PDF.",
          });
        }
      } catch (error) {
        console.error("Failed to send invoice PDF:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to send invoice PDF.",
        });
      }
    },
  },
};
</script>

<style>
.q-card-section {
  padding: 2rem;
  margin: 2rem;
}
.q-item-label {
  font-weight: bold;
}
</style>
