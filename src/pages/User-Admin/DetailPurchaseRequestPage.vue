<template>
  <div class="container-box">
    <h1 class="q-pa-md text-center font-bold text-lg">
      Detail Purchase Request
    </h1>
    <div class="q-pa-md" v-if="purchaseRequest">
      <div>
        <p style="text-align: center; font-weight: bold">
          {{ purchaseRequest.code }}
        </p>
        <p style="text-align: center; font-weight: bold">
          {{ purchaseRequest.description }}
        </p>
        <p style="text-align: center; font-weight: bold">
          <q-btn :color="purchaseRequest.status === 'draft' ? 'red' : 'primary'" flat dense
            :label="purchaseRequest.status" />
        </p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div v-if="purchaseRequest && purchaseRequest.lineItems" class="q-pa-md">
      <q-table flat bordered ref="tableRef" :class="tableClass" tabindex="0" :rows="purchaseRequest.lineItems"
        :columns="lineItemColumns" row-key="id">
        <template v-if="showEditButton" v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn round dense flat color="negative" icon="edit" @click="editQuantity(props.row)" />
          </q-td>
        </template>
      </q-table>
      <div class="row justify-start">
        <router-link to="/purchase-request-Admin">
          <q-btn flat color="primary">Back</q-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
const formatToRupiah = (totalPrice) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(totalPrice);
};

export default {
  name: "DetailPurchaseRequestPage",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      purchaseRequest: null,
      showEditButton: true,
      lineItemColumns: [
        {
          name: "name",
          required: true,
          label: "Product Name",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "quantity",
          required: true,
          label: "Quantity",
          align: "center",
          field: "quantity",
          sortable: true,
        },
        {
          name: "price",
          required: true,
          label: "Price",
          align: "center",
          field: "price",
          sortable: true,
          format: (val) => formatToRupiah(val),
        },
        {
          name: "actions",
          required: true,
          label: "Actions",
          align: "center",
          field: "actions",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.fetchPurchaseRequest();
  },
  methods: {
    fetchPurchaseRequest() {
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
        .get(
          `${apiBaseUrl}buyer/purchaseRequest/${this.id}`,
          config
        )
        .then((response) => {
          this.purchaseRequest = response.data.purchaseRequest;
          this.updateEditButtonStatus();
        })
        .catch((error) => {
          console.error("Error fetching purchase request:", error);
        });
    },
    updateEditButtonStatus() {
      this.showEditButton =
        this.purchaseRequest && this.purchaseRequest.status !== "approved";
    },
    editQuantity(lineItem) {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        return;
      }
      Swal.fire({
        title: "Edit Quantity",
        input: "number",
        inputValue: lineItem.quantity,
        inputAttributes: {
          step: 1,
          min: 1,
        },
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: (newQuantity) => {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          return axios
            .post(
              `${apiBaseUrl}buyer/updateLineItem/${lineItem.id}`,
              { quantity: newQuantity },
              config
            )
            .then(() => {
              this.fetchPurchaseRequest();
            })
            .catch((error) => {
              console.error("Error updating quantity:", error);
              Swal.showValidationMessage(
                `Request failed: ${error.response.data.message}`
              );
            });
        },
      });
    },
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
</style>
