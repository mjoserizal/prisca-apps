<template>
  <q-page>
    <q-tabs v-model="tab" class="text-h6">
      <q-tab name="detail">
        <router-link :to="{ name: 'quotationDetail', params: { id: quotationId } }">
          Quotation Detail
        </router-link>
      </q-tab>
      <q-tab name="fix">
        <router-link :to="{ name: 'quotationFix', params: { id: quotationId } }">
          Quotation Fix
        </router-link>
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
          <q-table class="shadow-md" flat bordered :rows="quotation.line_items" :columns="columns" row-key="id" />
        </q-card-section>

        <!-- Total Price Section -->
        <q-card-section class="text-h6 flex justify-end">
          <div>Harga Ongkir: {{ formatCurrency(quotation.harga_ongkir) }}</div>
        </q-card-section>
        <q-card-section class="text-h6 flex justify-end">
          <div>Total Price: {{ formatCurrency(quotation.total_price) }}</div>
        </q-card-section>


        <q-card-section class="text-h6 flex justify-end" v-if="!pdfExists">
          <q-btn label="Send Quotation" color="primary" @click="sendQuotation" />
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
import Swal from "sweetalert2";

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

    pdfExists() {
      return this.quotation && this.quotation.pdf && this.quotation.pdf.includes("quotation_QUO-");
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
          `${apiBaseUrl}vendor/quotationFix/${this.quotationId}`,
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

        Swal.fire({
          title: "Confirmation",
          text: "Are you sure you want to send the quotation?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .post(
                `${apiBaseUrl}vendor/quotation/${this.quotationId}/pdf`,
                null,
                config
              )
              .then((response) => {
                console.log(response.data);
                if (
                  response.data.message ===
                  "Quotation PDF berhasil dibuat dan dikirim ke pembeli."
                ) {
                  Swal.fire({
                    title: "Success",
                    text: "Quotation PDF has been sent successfully!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                  }).then(() => {
                    this.$router.push({
                      name: "quotation",
                    });
                  });
                } else {
                  console.error(
                    "Failed to send quotation:",
                    response.data.message
                  );
                }
              })
              .catch((error) => {
                console.error("Failed to send quotation:", error);
              });
          }
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
