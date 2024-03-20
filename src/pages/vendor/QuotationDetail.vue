<template>
  <q-page>
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
              <q-item-section>{{ quotation.created_at }}</q-item-section>
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
      </q-card>
    </q-container>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "QuotationDetail",
  data() {
    return {
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
          name: "totalPrice",
          label: "Total Price",
          align: "right",
          field: (row) => row.quantity * row.product_price,
          sortable: true,
        },
      ],
    };
  },
  async mounted() {
    this.quotationId = this.$route.params.id;
    await this.fetchQuotationDetail();
  },
  methods: {
    async fetchQuotationDetail() {
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
          `${apiBaseUrl}vendor/show/quotation/${this.$route.params.id}`,
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
