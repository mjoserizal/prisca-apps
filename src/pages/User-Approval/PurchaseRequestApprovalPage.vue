<template>
  <div class="container-box">
    <h1 class="q-pa-md text-center font-bold text-lg">
      Purchase Request Approval
    </h1>
  </div>
  <div class="container-box">
    <q-table flat bordered ref="tableRef" :class="tableClass" tabindex="0" :rows="approvalRequests" :columns="columns"
      row-key="id" selection="multiple" v-model:selected="selected" :pagination="pagination" :filter="filter"
      @focusin="activateNavigation" @focusout="() => (selectedRows = selected)" @keydown="onKey"
      @update:selected="onSelected">
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-btn :color="props.row.approval_status === 'approved'
      ? 'green'
      : props.row.approval_status === 'pending'
        ? 'blue'
        : 'red'
      " flat dense :label="props.row.approval_status" />
        </q-td>
      </template>
      <!-- Tambahkan slot untuk kolom "Actions" -->
      <!-- Tambahkan slot untuk kolom "Actions" -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <router-link :to="{
      name: 'detailPRUserApproval',
      params: { doc_code: props.row.doc_code },
    }">
            <q-btn round dense flat color="grey" icon="visibility" />
          </router-link>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted, toRefs } from "vue";
import Swal from "sweetalert2";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "PurchaseRequestApprovalPage",
  setup() {
    const router = useRouter();

    const approvalRequests = ref([]);

    const fetchApprovalRequests = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(
          `${apiBaseUrl}userApproval/approvalRequest`,
          config
        )
        .then((response) => {
          if (response.data && response.data.approvalRequests) {
            approvalRequests.value = response.data.approvalRequests;
          }
        })
        .catch((error) => {
          console.error("Error fetching approval requests:", error);
        });
    };

    onMounted(() => {
      fetchApprovalRequests();
    });

    // Kolom untuk q-table
    const columns = [
      {
        name: "user_name",
        label: "Name",
        field: "user_name",
        align: "left",
        sortable: true,
      },
      {
        name: "doc_code",
        label: "PR Code",
        field: "doc_code",
        align: "left",
        sortable: true,
      },
      {
        name: "status",
        label: "Status",
        field: "approval_status",
        align: "center",
        sortable: true,
      },
      {
        name: "time",
        label: "Time",
        field: "last_activity",
        align: "left",
        sortable: true,
      },
      // Kolom untuk actions
      {
        name: "actions",
        label: "Actions",
        field: "actions",
        align: "center",
      },
    ];

    const pagination = ref({
      sortBy: "user_name",
      descending: false,
      page: 1,
      rowsPerPage: 10,
    });

    // Fungsi untuk menangani klik tombol Approved/Rejected
    const handleApprovalApproved = (docCode, status) => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const payload = { status };

      axios
        .post(
          `${apiBaseUrl}userApproval/approvalRequest/${docCode}/accept`,
          payload,
          config
        )
        .then((response) => {
          Swal.fire("Success", "Status updated successfully", "success");
          fetchApprovalRequests(); // Refresh tabel setelah sukses
        })
        .catch((error) => {
          console.error("Error updating status:", error);
          Swal.fire("Error", "Failed to update status", "error");
          // Tidak perlu memanggil fetchApprovalRequests() di sini
        });
    };

    const handleApprovalRejected = (docCode, status) => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const payload = { status };

      axios
        .post(
          `${apiBaseUrl}userApproval/approvalRequest/${docCode}/reject`,
          payload,
          config
        )
        .then((response) => {
          Swal.fire("Success", "Status updated successfully", "success");
          fetchApprovalRequests(); // Refresh tabel setelah sukses
        })
        .catch((error) => {
          console.error("Error updating status:", error);
          Swal.fire("Error", "Failed to update status", "error");
          // Tidak perlu memanggil fetchApprovalRequests() di sini
        });
    };

    return {
      approvalRequests,
      columns,
      pagination,
      handleApprovalApproved,
      handleApprovalRejected,
    };
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
