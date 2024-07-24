<template>
  <div class="w-full">
    <div class="p-6">
      <q-card class="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
        <q-card-section>
          <div class="text-h6 text-grey-8">Quotation List</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-pa-none">
          <q-table square class="no-shadow" :rows="quotations" :columns="columns" row-key="id" :filter="filter"
            :loading="loading">
            <!-- Tombol Detail -->
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn icon="info" color="primary" size="sm" @click="viewQuotation(props.row)">
                  Detail
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
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

const router = useRouter();
const quotations = ref([]);
const filter = ref("");
const loading = ref(true);

const columns = [
  {
    name: "code",
    required: true,
    label: "Quotation Code",
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
    label: "Date",
    align: "center",
    field: "date",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    align: "right",
    slot: "action", // Menambahkan properti slot untuk tombol detail
  },
];

const viewQuotation = (quotation) => {
  console.log("View quotation detail:", quotation);
  router.push({ name: "quotationDetail", params: { id: quotation.id } });
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
    const response = await axios.get(`${apiBaseUrl}vendor/quotation`, config);
    if (response.data.message === "Success") {
      if (Array.isArray(response.data.quotation)) {
        quotations.value = response.data.quotation.map((q) => ({
          id: q.id,
          code: q.code,
          company_name: q.company_name,
          date: dayjs(q.created_at, "DD-MM-YYYY").format("DD MMM YYYY"),
          created_at: q.created_at,
        })).sort((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at)));
      } else {
        const q = response.data.quotation;
        quotations.value = [
          {
            id: q.id,
            code: q.code,
            company_name: q.company_name,
            date: dayjs(q.created_at, "DD-MM-YYYY").format("DD MMM YYYY"),
            created_at: q.created_at,
          },
        ];
      }
      loading.value = false;
    } else {
      console.error("Failed to fetch quotations:", response.data.message);
    }

  } catch (error) {
    loading.value = false;
    console.error("Failed to fetch quotations:", error);
  }
});
</script>

<script>
export default {
  name: "QuotationPage",
};
</script>

<style scoped>
.q-table tbody tr:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
</style>
