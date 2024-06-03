<template>
  <div class="p-2.5 xl:p-5">
    <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
      <q-card-section class="cart-header">
        <div class="text-h6 text-grey-8">
          Quotation Details
        </div>
        <!-- Tambahkan tombol 'Request PO' di pojok kanan atas -->
        <q-btn color="primary" label="Request PO" @click="handleRequestPO" />
      </q-card-section>
      <q-card-section class="q-pa-none">
        <div v-if="quotation">
          <q-list bordered>
            <q-item>
              <q-item-section>
                <q-item-label>Code</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ quotation.code }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Company Name</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ quotation.company_name }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Updated At</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ quotation.updated_at }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Total Price</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ formatCurrency(quotation.total_price) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="quotation.pdf">
              <q-item-section>
                <q-item-label>Quotation Document</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-btn :href="quotation.pdf" target="_blank" icon="description" label="Download Document"
                    color="primary" outline />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div v-else>
          <q-spinner color="primary" />
        </div>
      </q-card-section>
      <q-card-actions class="justify-start">
        <router-link to="/Quotation-Admin">
          <q-btn flat color="deep-orange" icon="arrow_back">Kembali</q-btn>
        </router-link>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "DetailRFQPage",
  data() {
    return {
      quotation: null,
    };
  },
  methods: {
    fetchQuotationDetails() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      const { id } = this.$route.params;
      axios
        .get(`http://192.168.16.70:8000/api/buyer/quotationFix/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data && response.data.quotation) {
            this.quotation = response.data.quotation;
          } else {
            console.error("Invalid quotation detail format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching quotation details: ", error);
        });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(value);
    },
    handleRequestPO() {
      Swal.fire({
        title: 'Request PO',
        input: 'textarea',
        inputLabel: 'Description',
        inputPlaceholder: 'Enter your description here...',
        inputAttributes: {
          'aria-label': 'Enter your description here'
        },
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          const description = result.value;
          this.submitRequestPO(description);
        }
      });
    },
    submitRequestPO(description) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      const { id } = this.$route.params;
      axios
        .post(
          "http://192.168.16.70:8000/api/buyer/purchaseOrder",
          { request_for_qoutations_id: id, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          Swal.fire(
            'Success',
            'Purchase Order has been requested successfully!',
            'success'
          );
        })
        .catch((error) => {
          console.error("Error requesting Purchase Order: ", error);
          Swal.fire(
            'Error',
            'Failed to request Purchase Order. Please try again later.',
            'error'
          );
        });
    },
  },
  mounted() {
    this.fetchQuotationDetails();
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

.custom-stepper {
  background-color: #f9f9f9;
  border: none;
  box-shadow: none;
  padding: 0;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
