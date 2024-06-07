<template>
  <div class="p-2.5 xl:p-5">
    <!-- Tabel untuk Quotation -->
    <div>
      <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
        <q-card-section class="cart-header">
          <div class="text-h6 text-grey-8">
            Quotation
          </div>
          <div class="search-wrapper">
            <q-input outlined dense v-model="quotationFilter" placeholder="Search quotation..." class="search-input" />
          </div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-table flat bordered ref="quotationTableRef" :class="tableClass" tabindex="0" :rows="quotationList"
            :columns="quotationColumns" row-key="code" selection="multiple" v-model:selected="selectedQuotation"
            v-model:pagination="quotationPagination" :filter="quotationFilter" @focusin="activateNavigation"
            @focusout="() => (selectedQuotationRows = selectedQuotation)" @keydown="onKey"
            @update:selected="onSelected">
            <!-- Slot untuk aksi sel -->
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <router-link :to="{
              name: 'detailRFQ',
              params: { id: props.row.id },
            }">
                  <q-btn round dense flat color="grey" icon="visibility" />
                </router-link>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
export default {
  name: "QuotationPage",
  data() {
    return {
      quotationList: [],
      selectedQuotation: [],
      quotationColumns: [
        {
          name: "code",
          required: true,
          label: "Code",
          align: "left",
          field: "code",
          sortable: true,
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
      quotationPagination: {
        rowsPerPage: 10,
        options: [5, 10, 20],
      },
      quotationFilter: "",
    };
  },
  methods: {
    fetchQuotations() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get(`${apiBaseUrl}buyer/quotationFix`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data && response.data.quotation) {
            this.quotationList = response.data.quotation.map((quotation) => ({
              ...quotation,
              code: quotation.code,
              id: quotation.id,
            }));
          } else {
            console.error("Invalid quotation data format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching quotations: ", error);
        });
    },
    activateNavigation() {
      // Implement the method if needed
    },
    onKey() {
      // Implement the method if needed
    },
    onSelected() {
      // Implement the method if needed
    },
  },
  mounted() {
    this.fetchQuotations();
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

.cart-header {
  display: flex;
  justify-content: space-between;
}
</style>
