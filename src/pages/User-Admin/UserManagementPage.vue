<template>
  <div class="p-2.5 xl:p-5">
    <div>
      <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
        <q-card-section class="cart-header">
          <div class="text-h6 text-grey-8">
            User Management
            <router-link to="/add-user">
              <q-btn round dense flat color="primary" icon="add" />
            </router-link>
          </div>

          <div class="search-wrapper">
            <q-input outlined dense v-model="filter" placeholder="Search user..." class="search-input" />
          </div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-table flat bordered ref="tableRef" :class="tableClass" tabindex="0" :rows="userApprovalList"
            :columns="columns" row-key="code" selection="multiple" v-model:selected="selected"
            v-model:pagination="pagination" :filter="filter" @focusin="activateNavigation"
            @focusout="() => (selectedRows = selected)" @keydown="onKey" @update:selected="onSelected">
            <!-- Slot untuk menyesuaikan tampilan sel di kolom "Status" -->
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-btn :color="props.row.status === 'draft' ? 'red' : 'primary'" flat dense :label="props.row.status" />
              </q-td>
            </template>
            <!-- Slot untuk aksi sel -->
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn round dense flat color="negative" icon="delete" @click="deleteUser(props.row.id)" />
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
import Swal from "sweetalert2";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "UserProfile",
  data() {
    return {
      step: 1,
      userApprovalList: [],
      selected: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "email",
          required: true,
          label: "Email",
          align: "left",
          field: "email",
          sortable: true,
        },
        {
          name: "company_name",
          required: true,
          label: "Company Name",
          align: "left",
          field: (row) => row.company.company_name,
          sortable: true,
        },
        {
          name: "divisi_name",
          required: true,
          label: "Divisi Name",
          align: "left",
          field: (row) => row.company.divisi_name,
          sortable: true,
        },
        {
          name: "departemen_name",
          required: true,
          label: "Departemen Name",
          align: "left",
          field: (row) => row.company.departemen_name,
          sortable: true,
        },
        // Kolom aksi
        {
          name: "actions",
          required: false,
          label: "Actions",
          align: "left",
          field: "actions", // Ubah field menjadi "actions"
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
    fetchUserApproval() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get(`${apiBaseUrl}buyer/userApproval`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.userApprovalList = response.data.userApproval;
        })
        .catch((error) => {
          console.error("Error fetching user approval: ", error);
        });
    },
    deleteUser(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .delete(
          `${apiBaseUrl}buyer/userApproval/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // Panggil fetchUserApproval kembali setelah penghapusan berhasil
          this.fetchUserApproval();
          // Tampilkan pesan sukses menggunakan Swal
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User has been deleted successfully!",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          console.error("Error deleting user: ", error);
          // Tampilkan pesan error menggunakan Swal
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete user. Please try again.",
            confirmButtonText: "OK",
          });
        });
    },
  },
  mounted() {
    this.fetchUserApproval();
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
