<template>
  <div>
    <div class="container-box">
      <h1 class="q-pa-md text-center font-bold text-lg">
        Purchase Orders
      </h1>
    </div>

    <div class="container-box">
      <q-table flat bordered ref="tableRef" :class="tableClass" tabindex="0" :rows="purchaseOrders" :columns="columns"
        row-key="id" selection="multiple" v-model:selected="selected" v-model:pagination="pagination" :filter="filter"
        @focusin="activateNavigation" @focusout="() => (selectedRows = selected)" @keydown="onKey"
        @update:selected="onSelected">
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
        name: 'detailPO',
        params: { id: props.row.id },
      }">
              <q-btn round dense flat color="grey" icon="visibility" />
            </router-link>

            <router-link :to="{
        name: 'requestApprovalOrder',
        params: { code: props.row.code },
      }">
              <q-btn round dense flat color="blue" icon="add" />
            </router-link>

            <q-btn v-if="props.row.status === 'approved'" round dense flat color="green" icon="send"
              @click="handleSend(props.row.id)" />
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
  name: "PurchaseOrderPage",
  data() {
    return {
      purchaseOrders: [], // Ubah nama dari purchaseOrder ke purchaseOrders
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
  methods: {
    fetchPurchaseOrders() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`${apiBaseUrl}buyer/purchaseOrder`, config)
        .then((response) => {
          if (response.data && Array.isArray(response.data.purchaseOrders)) {
            this.purchaseOrders = response.data.purchaseOrders;
          } else {
            console.error("Invalid purchase orders data format:", response.data);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.$router.push("/");
          } else {
            console.error("Error fetching purchase orders:", error);
          }
        });
    },
    handleSend(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .post(
          `${apiBaseUrl}buyer/order`,
          { purchase_order_id: id },
          config
        )
        .then((response) => {
          Swal.fire(
            'Success',
            `Purchase Order with ID: ${id} has been sent successfully!`,
            'success'
          );
          this.fetchPurchaseOrders(); // Refresh the table data
        })
        .catch((error) => {
          console.error("Error sending Purchase Order: ", error);
          Swal.fire(
            'Error',
            'Failed to send Purchase Order. Please try again later.',
            'error'
          );
        });
    }
  },
  mounted() {
    this.fetchPurchaseOrders();
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
