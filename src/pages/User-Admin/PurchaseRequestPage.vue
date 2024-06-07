<template>
  <div>
    <div class="container-box">
      <h1 class="q-pa-md text-center font-bold text-lg">
        Create Purchase Request
      </h1>
      <div class="q-pa-md">
        <q-stepper v-model="step" header-nav ref="stepper" animated class="custom-stepper" without-border flat>
          <q-step :name="1" title="Step 1" caption="Create PR" icon="settings" :done="step > 1"></q-step>
          <q-step :name="2" title="Step 2" caption="PR Item" icon="create_new_folder" :done="step > 2"></q-step>
        </q-stepper>
      </div>
    </div>

    <div class="container-box">
      <q-table flat bordered ref="tableRef" :class="tableClass" tabindex="0" :rows="aggregatePurchaseRequests"
        :columns="columns" row-key="code" selection="multiple" v-model:selected="selected"
        v-model:pagination="pagination" :filter="filter" @focusin="activateNavigation"
        @focusout="() => (selectedRows = selected)" @keydown="onKey" @update:selected="onSelected">
        <!-- Slot untuk menyesuaikan tampilan sel di kolom "Status" -->
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-btn :color="props.row.status === 'approved'
          ? 'green'
          : props.row.status === 'draft'
            ? 'blue'
            : 'red'
          " flat dense :label="props.row.status" />
          </q-td>
        </template>
        <!-- Slot untuk aksi sel -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <router-link :to="{
          name: 'detailPR',
          params: { id: props.row.id },
        }">
              <q-btn round dense flat color="grey" icon="visibility" />
            </router-link>

            <router-link :to="{
          name: 'requestApproval',
          params: { code: props.row.code },
        }">
              <q-btn round dense flat color="blue" icon="add" />
            </router-link>
            <router-link v-if="props.row.status === 'approved'" :to="{
          name: 'RequestForQuotation',
          params: { id: props.row.id },
        }">
              <q-btn round dense flat color="grey" icon="more_vert" />
            </router-link>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
export default {
  name: "PurchaseRequestPage",
  data() {
    return {
      step: 1,
      purchaseRequests: [],
      selected: [],
      columns: [
        {
          name: "code",
          required: true,
          label: "Code",
          align: "left",
          field: "code",
          sortable: true,
        },
        {
          name: "description",
          required: true,
          label: "Description",
          align: "left",
          field: "description",
          sortable: true,
        },
        //
        {
          name: "status",
          required: true,
          label: "Status",
          align: "center",
          field: "status",
          sortable: true,
        },
        {
          name: "actions",
          required: true,
          label: "Actions",
          align: "center",
          field: "actions",
          sortable: true,
        },
      ],

      pagination: {
        rowsPerPage: 10,
        options: [5, 10, 20],
      },
      filter: "",
    };
  },
  computed: {
    aggregatePurchaseRequests() {
      const aggregated = {};
      this.purchaseRequests.forEach((request) => {
        if (!aggregated[request.code]) {
          aggregated[request.code] = {
            code: request.code,
            description: request.description,
            quantity: request.quantity,
            price: request.price,
            status: request.status,
            id: request.id, // Menambahkan id
          };
        } else {
          aggregated[request.code].quantity += request.quantity;
          aggregated[request.code].price += request.price;
        }
      });
      return Object.values(aggregated);
    },
  },
  methods: {
    fetchPurchaseRequests() {
      const token = localStorage.getItem("token");
      if (!token) {
        // Jika tidak ada token, redirect the user ke halaman utama
        this.$router.push("/");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`${apiBaseUrl}buyer/purchaseRequest`, config)
        .then((response) => {
          if (response.data && Array.isArray(response.data.purchaseRequests)) {
            if (response.data.purchaseRequests.length > 0) {
              this.step = 2;
            } else {
              this.step = 1;
            }
            this.purchaseRequests = response.data.purchaseRequests.flatMap(
              (purchaseRequest) => {
                return {
                  ...purchaseRequest,
                  id: purchaseRequest.id, // Menggunakan ID dari purchaseRequest
                  line_items: purchaseRequest.line_items.map((lineItem) => {
                    return {
                      ...lineItem,
                      code: purchaseRequest.code, // Menambahkan code dari purchaseRequest ke lineItem
                    };
                  }),
                };
              }
            );
          } else {
            console.error(
              "Invalid purchase requests data format:",
              response.data
            );
            this.step = 1;
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 251) {
            this.$router.push("/"); // Redirect ke halaman utama jika tidak diotorisasi
          } else {
            console.error("Error fetching purchase requests:", error);
          }
        });
    },
    sendQuotation(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        // Jika tidak ada token, redirect the user ke halaman utama
        this.$router.push("/");
        return;
      }

      // Menyiapkan data yang akan dikirim dalam permintaan
      const requestData = {
        purchase_request_id: id, // ID purchase request disimpan dalam bidang purchase_request_id
      };

      axios
        .post(
          `${apiBaseUrl}buyer/requestForQuotation`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          Swal.fire(
            "Success",
            "Quotation has been sent successfully!",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error sending quotation:", error);
          Swal.fire(
            "Error",
            "Failed to send quotation. Please try again later.",
            "error"
          );
        });
    },
  },
  mounted() {
    this.fetchPurchaseRequests();
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
</style>
