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
              <q-item-section>{{ quotation.updatet_at }}</q-item-section>
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

        <q-card-section class="text-h6 flex justify-end">
          <q-btn
            label="Edit Quotation"
            color="primary"
            @click="editQuotation"
          />
        </q-card-section>
      </q-card>
    </q-container>

    <!-- Edit Quotation Dialog -->
    <q-dialog v-model="editDialog" persistent>
      <q-card>
        <q-card-section class="text-h6">Edit Product Prices</q-card-section>
        <q-card-section>
          <q-list>
            <q-item v-for="(item, index) in quotation.line_items" :key="index">
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-input
                  v-model="editedProductPrices[index]"
                  outlined
                  type="number"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="primary" @click="cancelEdit" />
          <q-btn label="Save" color="primary" @click="saveEdit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      quotationId: null,
      quotation: null,
      // New data properties for the dialog
      editDialog: false,
      editedProductPrices: [],

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
