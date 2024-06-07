<template>
  <div class="container-box">
    <h1 class="q-pa-md text-center font-bold text-lg">
      Add User Request Approval PO
    </h1>
    <div class="q-pa-md">
      <p style="font-weight: bold; text-align: center">{{ code }}</p>
      <div v-for="(approval, index) in additionalApprovals" :key="index">
        <select v-model="selectedUser[index]"
          class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4">
          <option v-for="userApproval in userApprovals" :key="userApproval.id" :value="userApproval.id">
            {{ userApproval.name }}
          </option>
        </select>
      </div>
      <div>
        <q-btn @click="addUserApproval" class="mt-4" outline color="primary" icon="add" label="Tambah User Approval" />
      </div>
      <div style="display: flex; justify-content: space-between; width: 100%">
        <q-btn label="Back" class="mt-4" outline color="primary" to="/purchase-order-Admin" />

        <q-btn @click="submitApproval" label="Submit" class="mt-4" outline color="secondary" />
      </div>
    </div>
  </div>
  <div class="container-box">
    <q-table flat bordered ref="tableRef" :class="tableClass" tabindex="0" :rows="approvalOrders" :columns="columns"
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
  name: "requestApprovalOrder",
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const { code } = toRefs(props);

    const userApprovals = ref([]);
    const selectedUser = ref([]);
    const additionalApprovals = ref([]);
    const approvalOrders = ref([]);

    const fetchUserApprovals = () => {
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
        .get(`${apiBaseUrl}buyer/userApproval`, config)
        .then((response) => {
          userApprovals.value = response.data.userApproval;
        })
        .catch((error) => {
          console.error("Error fetching user approvals:", error);
        });
    };

    const addUserApproval = () => {
      // Ambil `user_id` yang belum ada di `approvalOrders`
      const uniqueUserIds = userApprovals.value
        .map((user) => user.id)
        .filter(
          (id) => !approvalOrders.value.some((req) => req.user_id === id)
        );

      // Jika ada `user_id` yang belum ada di `approvalOrders`, tambahkan ke `additionalApprovals`
      if (uniqueUserIds.length > 0) {
        const nextUserId = uniqueUserIds.shift(); // Ambil user_id berikutnya dari array
        additionalApprovals.value.push(null);
        selectedUser.value.push(nextUserId);
      }
    };

    const submitApproval = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      const userId = localStorage.getItem("userId");
      const uniqueRequests = new Set(); // Use a set to ensure uniqueness

      // Add data for user_id that is currently logged in if it's not already in approvalOrders
      if (!approvalOrders.value.some((req) => req.user_id === userId)) {
        uniqueRequests.add(
          JSON.stringify({
            user_id: userId,
            doc_code: code.value,
            approval_status: "approved",
          })
        );
      }

      // Add data for selectedUser if they're not already in approvalOrders
      selectedUser.value.forEach((id) => {
        if (id && !approvalOrders.value.some((req) => req.user_id === id)) {
          const request = {
            user_id: id,
            doc_code: code.value,
            approval_status: "pending",
          };
          uniqueRequests.add(JSON.stringify(request));
        }
      });

      const approvalOrder = Array.from(uniqueRequests).map(JSON.parse); // Convert set back to array of objects

      // If there are new requests to submit, proceed with the submission
      if (approvalOrder.length > 0) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .post(
            `${apiBaseUrl}buyer/approvalOrder`,
            { approvalOrder },
            config
          )
          .then((response) => {
            console.log("Approval request submitted successfully:");
            console.log("approvalOrder:", approvalOrder);
            console.log("Response:", response.data);
            Swal.fire(
              "Success!",
              "Approval request submitted successfully!",
              "success"
            ).then(() => {
              fetchapprovalOrders(); // Refresh the data in q-table
              clearAdditionalApprovals(); // Clear additional approvals dropdown
            });
          })
          .catch((error) => {
            console.error("Error submitting approval request:", error);
          });
      } else {
        // If there are no new requests to submit, show a message or handle accordingly
        console.log("No new requests to submit");
      }
    };

    const fetchapprovalOrders = () => {
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
          `${apiBaseUrl}buyer/approvalOrder/${code.value}`,
          config
        )
        .then((response) => {
          // Urutkan approvalOrders berdasarkan sequence
          approvalOrders.value = response.data.approvalOrders.sort((a, b) => a.sequence - b.sequence);
        })
        .catch((error) => {
          console.error("Error fetching approval requests:", error);
        });
    };

    const clearAdditionalApprovals = () => {
      additionalApprovals.value = [];
      selectedUser.value = [];
    };

    onMounted(() => {
      fetchUserApprovals();
      fetchapprovalOrders();
    });

    // Kolom untuk q-table
    const columns = [
      {
        name: "user_name",
        label: "User Name",
        field: "user_name",
        align: "left",
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
        name: "last_activity",
        label: "Last Activity",
        field: "last_activity",
        align: "left",
        sortable: true,
      },
      // Tambahkan kolom-kolom lain sesuai kebutuhan
    ];

    const pagination = ref({
      sortBy: "sequence", // Mengatur sortBy ke sequence agar tabel diurutkan berdasarkan sequence
      descending: false,
      page: 1,
      rowsPerPage: 10,
    });

    return {
      userApprovals,
      selectedUser,
      additionalApprovals,
      approvalOrders,
      fetchUserApprovals,
      addUserApproval,
      submitApproval,
      columns,
      pagination, // Include pagination ref
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
