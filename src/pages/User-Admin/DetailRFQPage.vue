<template>
  <div class="p-2.5 xl:p-5">
    <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
      <q-card-section class="cart-header">
        <div class="text-h6 text-grey-8">
          Quotation Details
        </div>
        <q-btn color="primary" label="Request PO" @click="handleRequestPO" />
      </q-card-section>
      <q-card-section class="q-pa-none">
        <div v-if="quotation">
          <q-list bordered>
            <!-- Quotation Details -->
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
            <q-item>
              <q-item-section>
                <q-item-label>Harga Ongkir</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ formatCurrency(quotation.harga_ongkir) }}</q-item-label>
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
      <q-card-section class="q-pa-md">
        <!-- Chat Bubble Section -->
        <div v-if="messages.length" class="chat-bubble-container" ref="chatContainer">
          <div v-for="message in messages" :key="message.id"
            :class="['chat-bubble-wrapper', message.user.role === 'company' ? 'company-role' : 'user-role']">
            <div :class="['chat-bubble', message.user.role === 'company' ? 'chat-bubble-right' : 'chat-bubble-left']">
              <strong>{{ message.user.name }}:</strong>
              <div>{{ message.description }}</div>
            </div>
            <div
              :class="['text-caption', message.user.role === 'company' ? 'text-caption-right' : 'text-caption-left']">
              {{ formatDate(message.created_at) }}
            </div>
          </div>
        </div>
        <div class="chat-input-container">
          <q-input v-model="newMessage" label="Type your message..." @keyup.enter="sendMessage" class="chat-input" />
          <q-btn icon="send" color="primary" @click="sendMessage" class="send-button" />
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

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "DetailRFQPage",
  data() {
    return {
      quotation: null,
      messages: [], // Store chat messages
      newMessage: "", // New message input
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
        .get(`${apiBaseUrl}buyer/quotationFix/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data && response.data.quotation) {
            this.quotation = response.data.quotation;
            this.fetchMessages(); // Fetch messages for the quotation
          } else {
            console.error("Invalid quotation detail format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching quotation details: ", error);
        });
    },
    fetchMessages() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      const { id } = this.$route.params;
      axios
        .get(`${apiBaseUrl}buyer/negotiation/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data && response.data.negotiation && Array.isArray(response.data.negotiation.negotiation)) {
            this.messages = response.data.negotiation.negotiation;
            this.$nextTick(() => {
              this.scrollToBottom();
            });
          } else {
            console.error("Invalid messages format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching messages: ", error);
        });
    },
    sendMessage() {
      if (!this.newMessage.trim()) {
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      const { id } = this.$route.params;
      axios
        .post(
          `${apiBaseUrl}buyer/negotiation`,
          {
            request_for_qoutation_id: id,
            description: this.newMessage,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          this.messages.push({
            id: response.data.negotiation.id,
            description: this.newMessage,
            created_at: new Date().toISOString(), // Set current time
            user: {
              name: 'admin', // Message sender is "Admin"
              role: 'company', // Set the role to 'company' for admin messages
            },
          });
          this.newMessage = "";
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        })
        .catch((error) => {
          console.error("Error sending message: ", error);
        });
    },
    scrollToBottom() {
      const container = this.$refs.chatContainer;
      container.scrollTop = container.scrollHeight;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(value);
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString('id-ID');
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
          `${apiBaseUrl}buyer/purchaseOrder`,
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
.chat-bubble-container {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.chat-bubble-wrapper {
  display: flex;
  flex-direction: column;
}

.chat-bubble {
  border-radius: 15px;
  padding: 10px;
  margin: 5px;
  max-width: 70%;
  /* Adjust the max-width if needed */
  word-wrap: break-word;
  box-sizing: border-box;
  /* Ensure padding is included in the width */
}

.chat-bubble-left {
  background-color: #f1f0f0;
  align-self: flex-start;
}

.chat-bubble-right {
  background-color: #007bff;
  color: #fff;
  align-self: flex-end;
}

.text-caption {
  color: #6c757d;
  /* Gray color for timestamps */
  margin-top: 2px;
  /* Add some space between bubble and timestamp */
}

.text-caption-right {
  text-align: right;
}

.text-caption-left {
  text-align: left;
}

.q-input {
  margin-top: 10px;
  flex: 1;
}

.chat-input-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.send-button {
  margin-left: 10px;
}
</style>
