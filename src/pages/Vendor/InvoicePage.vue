<template>
  <div class="w-full">
    <div class="p-6">
      <q-card class="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
        <q-card-section>
          <div class="text-h6 text-grey-8">Invoice Order List</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-pa-none">
          <q-table square class="no-shadow" :rows="orders" :columns="columns" row-key="id" :filter="filter"
            :loading="loading">
            <!-- Tombol Action -->
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn class="q-mr-lg" v-if="props.row.invoice_created === 1" icon="send" color="primary" size="sm"
                  @click="viewInvoice(props.row)">
                  Lihat Invoice
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import "dayjs/locale/id";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

const router = useRouter();
const orders = ref([]);
const filter = ref("");
const loading = ref(true);

const columns = [
  {
    name: "code",
    required: true,
    label: "Order Code",
    align: "left",
    field: (row) => row.code,
    sortable: true,
  },
  {
    name: "company_name",
    label: "Company Name",
    align: "center",
    field: "company_name",
    sortable: true,
  },
  {
    name: "date",
    label: "Tanggal Order",
    align: "center",
    field: (row) => {
      return dayjs(row.waktu_order, "YYYY-MM-DD HH:mm:ss")
        .locale("id")
        .format("DD MMMM YYYY");
    },
    sortable: true,
  },
  {
    name: "status",
    label: "Status Order",
    field: "status",
  },
  {
    name: "action",
    label: "Action",
    align: "right",
    slot: "action",
  },
];

const viewInvoice = (order) => {
  console.log("View invoice:", order);
  router.push({ name: "invoiceDetail", params: { id: order.id } });
};

const sortOrdersByDate = (orders) => {
  return orders.sort((a, b) => new Date(b.waktu_order) - new Date(a.waktu_order));
};

onMounted(async () => {
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
    const response = await axios.get(`${apiBaseUrl}vendor/order`, config);
    if (response.data.success) {
      if (Array.isArray(response.data.orders)) {
        orders.value = sortOrdersByDate(response.data.orders.map((o) => ({
          id: o.id,
          code: o.code,
          company_name: o.company_name,
          status: o.status,
          waktu_order: o.waktu_order,
          invoice_created: o.invoice_created,
        })));
      } else {
        const o = response.data.orders;
        orders.value = sortOrdersByDate([
          {
            id: o.id,
            code: o.code,
            company_name: o.company_name,
            status: o.status,
            waktu_order: o.waktu_order,
            invoice_created: o.invoice_created,
          },
        ]);
      }
      loading.value = false;
    } else {
      console.error("Failed to fetch orders:", response.data.message);
    }
  } catch (error) {
    loading.value = false;
    console.error("Failed to fetch orders:", error);
  }
});
</script>

<script>
export default {
  name: "InvoicePage",
};
</script>

<style scoped>
.q-table tbody tr:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
</style>
