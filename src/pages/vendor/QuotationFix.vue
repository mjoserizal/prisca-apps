<template>
  <q-page>
    <q-tabs v-model="tab" class="text-h6">
      <q-tab name="detail">
        <router-link
          :to="{ name: 'quotationDetail', params: { id: quotationId } }"
          >Quotation Detail</router-link
        >
      </q-tab>
      <q-tab name="fix">
        <router-link :to="{ name: 'quotationFix', params: { id: quotationId } }"
          >Quotation Fix</router-link
        >
      </q-tab>
    </q-tabs>
    <q-container>
      <q-card class="rounded-md shadow-md m-6 p-4" v-if="quotation">
        <q-card-section class="text-h6">Quotation Details</q-card-section>
        <q-card-section class="flex flex-wrap">
          <div class="w-full md:w-1/3">
            <q-item>
              <q-item-section>
                <q-item-label>Quotation ID:</q-item-label>
              </q-item-section>
              <q-item-section>{{ quotation.code }}</q-item-section>
            </q-item>
          </div>
          <div class="w-full md:w-1/3">
            <q-item>
              <q-item-section>
                <q-item-label>Company Name:</q-item-label>
              </q-item-section>
              <q-item-section>{{ quotation.company_name }}</q-item-section>
            </q-item>
          </div>
          <div class="w-full md:w-1/3">
            <q-item>
              <q-item-section>
                <q-item-label>Date:</q-item-label>
              </q-item-section>
              <q-item-section>{{ quotation.updated_at }}</q-item-section>
            </q-item>
          </div>
        </q-card-section>

        <q-card-section class="text-h6">Item Details</q-card-section>
        <q-card-section>
          <q-table
            class="shadow-md"
            flat
            bordered
            :rows="quotation.line_items"
            :columns="columns"
            row-key="id"
          />
        </q-card-section>

        <!-- Total Price Section -->
        <q-card-section class="text-h6 flex justify-end">
          <div>Total Price: {{ formatCurrency(totalPrice) }}</div>
        </q-card-section>

        <q-card-section class="text-h6 flex justify-end">
          <q-btn
            label="Send Quotation"
            color="primary"
            @click="sendQuotation"
          />
        </q-card-section>
      </q-card>
    </q-container>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import "dayjs/locale/id";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "QuotationFix",
  data() {
    return {
      tab: "fix",
      quotationId: null,
      quotation: null,
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
  computed: {
    totalPrice() {
      return this.quotation
        ? this.quotation.line_items.reduce((total, item) => {
            return total + item.amount;
          }, 0)
        : 0;
    },
  },
  async mounted() {
    this.quotationId = this.$route.params.id;
    await this.fetchQuotationFix();
  },
  methods: {
    async fetchQuotationFix() {
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
          `${apiBaseUrl}vendor/show/quotationFix/${this.quotationId}`,
          config
        );

        if (response.data.message === "Success") {
          this.quotation = response.data.quotation;
        } else {
          console.error(
            "Failed to fetch quotation detail:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Failed to fetch quotation detail:", error);
      }
    },

    sendQuotation() {
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

        axios
          .post(
            `${apiBaseUrl}vendor/send/quotation/${this.quotationId}/pdf`,
            null, // Tidak perlu payload
            config // Sertakan konfigurasi dengan header otorisasi
          )
          .then((response) => {
            // Handle success response
            console.log(response.data);
          })
          .catch((error) => {
            // Handle error response
            console.error("Failed to send quotation:", error);
          });
      } catch (error) {
        console.error("Failed to send quotation:", error);
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
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
