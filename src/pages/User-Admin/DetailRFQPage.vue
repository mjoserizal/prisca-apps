<template>
  <div class="p-2.5 xl:p-5">
    <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
      <q-card-section class="cart-header">
        <div class="text-h6 text-grey-8">
          Quotation Details
        </div>
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
                <q-item-label>{{ quotation.total_price }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="quotation.pdf">
              <q-item-section>
                <q-item-label>Quotation Document</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-btn :href="quotation.pdf" target="_blank" label="View Document" color="primary" flat />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div v-else>
          <q-spinner color="primary" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

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
        .get(`http://192.168.3.11:8000/api/buyer/quotationFix/${id}`, {
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
}
</style>
