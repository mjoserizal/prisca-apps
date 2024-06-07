<template>
  <div class="p-2.5 xl:p-5">
    <!-- Tabel untuk Divisi -->
    <div>
      <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
        <q-card-section class="cart-header">
          <div class="text-h6 text-grey-8">
            Division
            <router-link to="/add-divisi">
              <q-btn round dense flat color="primary" icon="add" />
            </router-link>
          </div>
          <div class="search-wrapper">
            <q-input outlined dense v-model="divisiFilter" placeholder="Search divisi..." class="search-input" />
          </div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-table flat bordered ref="divisiTableRef" :class="tableClass" tabindex="0" :rows="divisiList"
            :columns="divisiColumns" row-key="code" selection="multiple" v-model:selected="selectedDivisi"
            v-model:pagination="divisiPagination" :filter="divisiFilter" @focusin="activateNavigation"
            @focusout="() => (selectedDivisiRows = selectedDivisi)" @keydown="onKey" @update:selected="onSelected" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <!-- Tabel untuk Departemen -->
  <div class="p-2.5 xl:p-5">
    <div>
      <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
        <q-card-section class="cart-header">
          <div class="text-h6 text-grey-8">
            Department
            <router-link to="/add-departemen">
              <q-btn round dense flat color="primary" icon="add" />
            </router-link>
          </div>
          <div class="search-wrapper">
            <q-input outlined dense v-model="departemenFilter" placeholder="Search departemen..."
              class="search-input" />
          </div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-table flat bordered ref="departemenTableRef" :class="tableClass" tabindex="0"
            :rows="filteredDepartemenList" :columns="departemenColumns" row-key="code" selection="multiple"
            v-model:selected="selectedDepartemen" v-model:pagination="departemenPagination" :filter="departemenFilter"
            @focusin="activateNavigation" @focusout="() => (selectedDepartemenRows = selectedDepartemen)"
            @keydown="onKey" @update:selected="onSelected" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "PurchaseRequestPage",
  data() {
    return {
      divisiList: [],
      selectedDivisi: [],
      divisiColumns: [
        {
          name: "code",
          required: true,
          label: "Code",
          align: "left",
          field: "code",
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
          sortable: true,
        },
        // Tambahkan kolom lain jika diperlukan
      ],
      divisiPagination: {
        rowsPerPage: 10,
        options: [5, 10, 20],
      },
      divisiFilter: "",

      departemenList: [],
      selectedDepartemen: [],
      departemenColumns: [
        {
          name: "code",
          required: true,
          label: "Code",
          align: "left",
          field: "code",
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
          sortable: true,
        },
        // Tambahkan kolom lain jika diperlukan
      ],
      departemenPagination: {
        rowsPerPage: 10,
        options: [5, 10, 20],
      },
      departemenFilter: "",
    };
  },
  computed: {
    // Filtered departemenList based on divisi code
    filteredDepartemenList() {
      return this.departemenList.filter((departemen) => {
        return this.divisiList.some(
          (divisi) => divisi.code === departemen.divisi_code
        );
      });
    },
  },
  methods: {
    fetchDivisi() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get(`${apiBaseUrl}buyer/divisi`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.divisiList = response.data.divisi;
        })
        .catch((error) => {
          console.error("Error fetching divisi: ", error);
        });
    },
    fetchDepartemen() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get(`${apiBaseUrl}buyer/departemen`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.departemenList = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching departemen: ", error);
        });
    },

    // Metode lainnya
  },
  mounted() {
    this.fetchDivisi();
    this.fetchDepartemen();
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
