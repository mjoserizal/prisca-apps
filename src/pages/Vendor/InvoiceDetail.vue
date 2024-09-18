<template>
  <q-page>
    <div class="container-box">
      <h1 class="q-pa-md text-center font-bold text-lg">Invoice Detail</h1>
    </div>
    <q-container>
      <q-card class="rounded-md shadow-md m-6 p-4" v-if="invoice">
        <!-- Invoice Header -->
        <q-card-section>
          <div class="invoice-header">
            <div>
              <q-img src="/images/prisca logo.png" style="margin-right: 8px; height: 100px; width: 100px" />
            </div>
            <div>
              <div class="text-right">
                <div class="text-h5">Invoice</div>
                <div>
                  <strong>No Invoice</strong>: {{ invoice.payment.no_invoice }}
                </div>
                <div>
                  <strong>Due Date</strong>: {{ invoice.payment.batas_bayar }}
                </div>
                <div>
                  <strong>Status</strong>: {{ invoice.payment.status }}
                </div>
                <div>
                  <strong>Bank</strong>: {{ invoice.vendor.bank }}
                </div>
                <div>
                  <strong>No Rekening</strong>: {{ invoice.vendor.no_rek }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <!-- Company and Buyer Info -->
        <q-card-section>
          <div class="info-section">
            <div class="info-block">
              <div class="text-h6">Company Info</div>
              <hr class="custom-hr" />
              <div>{{ invoice.vendor.name }}</div>
              <div>Telp: {{ invoice.vendor.telp }}</div>
              <div>{{ invoice.vendor.alamat }}</div>
            </div>

            <div class="info-block">
              <div class="text-h6">Buyer Info</div>
              <hr class="custom-hr" />
              <div>{{ invoice.buyer.name }}</div>
              <div>Telp: {{ invoice.buyer.telp }}</div>
              <div>{{ invoice.buyer.alamat }}</div>
            </div>
          </div>
        </q-card-section>

        <!-- Item Details -->
        <q-card-section class="text-h6">Item Details</q-card-section>
        <q-card-section>
          <q-table class="shadow-md" flat bordered :rows="invoice.line_items" :columns="columns" row-key="id">
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
          <div>Harga Ongkir: {{ formatToRupiah(invoice.vendor.harga_ongkir) }}</div>
        </q-card-section>
        <!-- Total Price -->
        <q-card-section class="text-h6 flex justify-end">
          <div>Total Price: {{ formatToRupiah(invoice.payment.total_bayar) }}</div>
        </q-card-section>

        <!-- Actions -->
        <q-card-section class="flex justify-end">
          <q-btn v-if="invoice.pdf_url" label="Download Invoice" color="primary" class="q-mr-sm"
            @click="downloadInvoice" />
          <q-btn label="Send Invoice PDF" color="primary" @click="sendInvoicePdf" />
        </q-card-section>

        <!-- Proof of Payment -->
        <q-card-section v-if="isProofAvailable" class="flex justify-end">
          <q-btn label="View Proof" color="primary" @click="viewProof" />
        </q-card-section>

        <!-- Mark as Success -->
        <q-card-section v-if="isProofAvailable" class="flex justify-end">
          <q-btn label="Mark as Success" color="positive" @click="markAsSuccess" />
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
        { name: "name", label: "Product Name", align: "left", field: "name", sortable: true },
        { name: "quantity", label: "Quantity", align: "center", field: "quantity", sortable: true },
        { name: "price", label: "Price", align: "right", field: "price", sortable: true },
        { name: "amount", label: "Total Price", align: "right", field: "amount", sortable: true },
      ],
    };
  },
  computed: {
    isProofAvailable() {
      const defaultProofUrl = "http://prisca-backend.3mewj5.easypanel.host/images";
      return this.invoice && this.invoice.payment.bukti && this.invoice.payment.bukti !== defaultProofUrl;
    },
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

        const config = { headers: { Authorization: `Bearer ${token}` } };

        const invoiceResponse = await axios.get(`${apiBaseUrl}vendor/invoice/${this.orderId}`, config);

        if (invoiceResponse.data.success) {
          this.invoice = invoiceResponse.data.data;
          this.calculateTotalPrice();
        } else {
          console.error("Failed to fetch invoice detail:", invoiceResponse.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch invoice detail:", error);
      }
    },
    calculateTotalPrice() {
      this.totalPrice = this.invoice.line_items.reduce((total, item) => total + item.amount, 0);
    },
    formatToRupiah(value) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);
    },
    async downloadInvoice() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found.");
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` }, responseType: "blob" };

        const response = await axios.get(this.invoice.pdf_url, config);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice_${this.invoice.payment.no_invoice}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Failed to download invoice:", error);
        Swal.fire({ icon: "error", title: "Error", text: "Failed to download invoice" });
      }
    },
    async markAsSuccess() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found.");
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };

        const response = await axios.post(`${apiBaseUrl}vendor/invoice/${this.orderId}/success`, {}, config);

        if (response.data.success) {
          Swal.fire({ icon: "success", title: "Success", text: "Invoice status updated successfully." });
          this.fetchInvoiceDetail();
        } else {
          console.error("Failed to update invoice status:", response.data.message);
          Swal.fire({ icon: "error", title: "Error", text: "Failed to update invoice status." });
        }
      } catch (error) {
        console.error("Failed to update invoice status:", error);
        Swal.fire({ icon: "error", title: "Error", text: "Failed to update invoice status." });
      }
    },
    async sendInvoicePdf() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found.");
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };

        const response = await axios.post(`${apiBaseUrl}vendor/invoice/${this.orderId}/pdf`, {}, config);

        if (response.data.message) {
          Swal.fire({ icon: "success", title: "Success", text: response.data.message });
        } else {
          console.error("Failed to send invoice PDF:", response.data.message);
          Swal.fire({ icon: "error", title: "Error", text: "Failed to send invoice PDF." });
        }
      } catch (error) {
        console.error("Failed to send invoice PDF:", error);
        Swal.fire({ icon: "error", title: "Error", text: "Failed to send invoice PDF." });
      }
    },
    viewProof() {
      Swal.fire({
        title: "Proof of Payment",
        imageUrl: this.invoice.payment.bukti,
        imageAlt: "Proof of Payment",
      });
    },
  },
};
</script>

<style scoped>
.container-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-section {
  display: flex;
  justify-content: space-between;
}

.info-block {
  width: 48%;
}

.custom-hr {
  border: none;
  border-top: 2px solid #000;
  margin: 0.5rem 0;
}
</style>
