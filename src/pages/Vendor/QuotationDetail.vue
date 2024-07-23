<template>
  <q-page>
    <q-tabs v-model="tab" class="text-h6">
      <q-tab name="detail">
        <router-link :to="{ name: 'quotationDetail', params: { id: quotationId } }">
          Quotation Detail
        </router-link>
      </q-tab>
      <q-tab name="fix" @click="handleQuotationFixClick">
        Quotation Fix
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
              <q-item-section>{{ quotation.created_at }}</q-item-section>
            </q-item>
          </div>
        </q-card-section>

        <q-card-section class="text-h6">Item Details</q-card-section>
        <q-card-section>
          <q-table class="shadow-md" flat bordered :rows="quotation.line_items" :columns="columns" row-key="id" />
        </q-card-section>

        <q-card-section class="text-h6 flex justify-end">
          <div>Total Price: {{ formatToRupiah(totalPrice) }}</div>
        </q-card-section>

        <q-card-section class="text-h6 flex justify-end">
          <q-btn v-if="!quotationFixExists || (quotationFix && quotationFix.line_items.length === 0)"
            label="Edit Quotation" color="primary" @click="editQuotation">
            <q-tooltip anchor="bottom middle" self="top middle">
              Edit Product Price for Line Items
            </q-tooltip>
          </q-btn>
        </q-card-section>
      </q-card>

      <q-card class="rounded-md shadow-md m-6 p-4">
        <q-card-section class="text-h6">Chat</q-card-section>
        <q-card-section v-if="negotiation && negotiation.length > 0" class="chat-container">
          <div v-for="chat in negotiation" :key="chat.id"
            :class="['chat-message', chat.user.role === 'vendor' ? 'vendor-message' : 'company-message']">
            <div class="message-header">
              <span>{{ chat.user.name }} ({{ chat.user.role }}):</span>
              <span>{{ formatDate(chat.created_at) }}</span>
            </div>
            <div class="message-content">
              {{ chat.description }}
            </div>
          </div>
        </q-card-section>
        <q-card-section v-else>
          No chat history.
        </q-card-section>
        <q-card-section class="chat-input-section">
          <q-input v-model="newMessage" label="Type your message" @keyup.enter="sendMessage" />
          <q-btn label="Send" color="primary" @click="sendMessage" class="mt-2" />
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
  name: "QuotationDetail",
  data() {
    return {
      tab: 'detail',
      quotationId: null,
      quotation: null,
      quotationFix: null,
      quotationFixExists: false,
      editedProductPrices: [],
      totalPrice: 0,
      newMessage: "",
      negotiation: [],

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
    await this.fetchQuotationDetail();
    await this.checkQuotationFixExists();
    await this.fetchNegotiation();
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
          `${apiBaseUrl}vendor/quotation/${this.quotationId}`,
          config
        );

        if (response.data.message === "Success") {
          this.quotation = response.data.quotation;
          this.calculateTotalPrice();
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

    async checkQuotationFixExists() {
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
          this.quotationFixExists = true;
          this.quotationFix = response.data.quotation;
        } else {
          this.quotationFixExists = false;
          console.error(
            "Failed to check quotation fix existence:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Failed to check quotation fix existence:", error);
      }
    },

    calculateTotalPrice() {
      this.totalPrice = this.quotation.line_items.reduce(
        (acc, item) => acc + item.amount,
        0
      );
    },

    formatToRupiah(value) {
      return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    },

    async handleQuotationFixClick() {
      await this.checkQuotationFixExists();
      if (this.quotationFix && this.quotationFix.line_items.length === 0) {
        Swal.fire({
          title: "Info",
          text: "No fixed quotation available. Please edit the quotation.",
          icon: "info",
          confirmButtonText: "OK",
        });
      } else {
        this.$router.push({ name: 'quotationFix', params: { id: this.quotationId } });
      }
    },

    async editQuotation() {
      const { value: formValues } = await Swal.fire({
        title: "Edit Product Prices",
        html: this.quotation.line_items
          .map(
            (item, index) => `
              <div class="swal2-form-group">
                <label for="swal-input${index}">${item.product_name}</label>
                <input id="swal-input${index}" class="swal2-input" type="number" value="${item.product_price}">
              </div>
            `
          )
          .join(""),
        focusConfirm: false,
        preConfirm: () => {
          return this.quotation.line_items.map((item, index) => {
            const input = document.getElementById(`swal-input${index}`);
            return input ? input.value : item.product_price;
          });
        },
      });

      if (formValues) {
        this.editedProductPrices = formValues;
        this.saveEdit();
      }
    },

    saveEdit() {
      if (
        this.editedProductPrices.some(
          (price) => price === undefined || price === ""
        )
      ) {
        Swal.fire({
          title: "Error",
          text: "All prices must be filled out.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      this.quotation.line_items.forEach((item, index) => {
        item.product_price = this.editedProductPrices[index];
        item.amount = item.product_price * item.quantity;
      });

      this.calculateTotalPrice();

      Swal.fire({
        title: "Success",
        text: "Quotation updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      this.$forceUpdate();
    },

    async fetchNegotiation() {
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
          `${apiBaseUrl}vendor/negotiation/${this.quotationId}`,
          config
        );

        if (response.status === 200) {
          this.negotiation = response.data.negotiation.negotiation;
        } else {
          console.error("Failed to fetch negotiation:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch negotiation:", error);
      }
    },

    async sendMessage() {
      if (!this.newMessage.trim()) return;

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
          `${apiBaseUrl}vendor/negotiation`,
          {
            request_for_qoutation_id: this.quotationId,
            description: this.newMessage,
          },
          config
        );

        if (response.status === 201) {
          this.newMessage = "";
          await this.fetchNegotiation();
        } else {
          console.error(
            "Failed to send message:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },

    formatDate(date) {
      return dayjs(date).format("DD MMM YYYY HH:mm");
    },
  },
};
</script>

<style scoped>
.chat-container {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.chat-message {
  margin-bottom: 16px;
}

.vendor-message {
  background-color: #e0f7fa;
  padding: 10px;
  border-radius: 8px;
  align-self: flex-end;
}

.company-message {
  background-color: #ffecb3;
  padding: 10px;
  border-radius: 8px;
  align-self: flex-start;
}

.message-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.message-content {
  margin-top: 8px;
}

.chat-input-section {
  display: flex;
  flex-direction: column;
}

.chat-input-section .q-input {
  margin-bottom: 8px;
}
</style>
