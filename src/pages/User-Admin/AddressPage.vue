<template>
  <div class="p-2.5 xl:p-5">
    <!-- Tabel untuk Alamat -->
    <div>
      <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
        <q-card-section class="cart-header">
          <div class="text-h6 text-grey-8">
            Addresses
            <router-link to="/Add-Address-Management">
              <q-btn round dense flat color="primary" icon="add" />
            </router-link>
          </div>
          <div class="search-wrapper">
            <q-input outlined dense v-model="addressFilter" placeholder="Search address..." class="search-input" />
          </div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-table flat bordered ref="addressTableRef" :class="tableClass" tabindex="0" :rows="filteredAddressList"
            :columns="addressColumns" row-key="id" selection="multiple" v-model:selected="selectedAddress"
            v-model:pagination="addressPagination" :filter="addressFilter" @focusin="activateNavigation"
            @focusout="() => (selectedAddressRows = selectedAddress)" @keydown="onKey" @update:selected="onSelected">
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn dense flat icon="edit" @click="editAddress(props.row.id)" color="primary" />
                <q-btn dense flat icon="delete" @click="deleteAddress(props.row.id)" color="red" />
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
  name: "AddressPage",
  data() {
    return {
      addressList: [],
      selectedAddress: [],
      addressColumns: [
        {
          name: "address",
          required: true,
          label: "Address",
          align: "left",
          field: "address",
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          align: "center",
        },
      ],
      addressPagination: {
        rowsPerPage: 10,
        options: [5, 10, 20],
      },
      addressFilter: "",
    };
  },
  computed: {
    // Filtered address list based on search input
    filteredAddressList() {
      return this.addressList.filter((address) => {
        return address.address.toLowerCase().includes(this.addressFilter.toLowerCase());
      });
    },
  },
  methods: {
    fetchAddresses() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get(`${apiBaseUrl}buyer/address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.addressList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching addresses: ", error);
        });
    },
    deleteAddress(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .delete(`${apiBaseUrl}buyer/address/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.addressList = this.addressList.filter((address) => address.id !== id);
        })
        .catch((error) => {
          console.error("Error deleting address: ", error);
        });
    },
    editAddress(id) {
      this.$router.push({ path: `/edit-address/${id}` }); // Navigate to the edit page with the address ID as a parameter
    },
    // Add other methods if necessary
  },
  mounted() {
    this.fetchAddresses();
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

.q-btn {
  margin-right: 5px;
}
</style>
