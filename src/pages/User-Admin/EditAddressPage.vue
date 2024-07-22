<template>
  <div class="p-2.5 xl:p-5">
    <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
      <q-card-section class="cart-header">
        <div class="text-h6 text-grey-8">
          Edit Address
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input v-model="address" label="Address" outlined dense />
          <div class="q-mt-md action-buttons">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Cancel" color="secondary" @click="onCancel" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "EditAddressPage",
  data() {
    return {
      address: "",
    };
  },
  methods: {
    fetchAddress() {
      const id = this.$route.params.id;
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .get(`${apiBaseUrl}buyer/address/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.address = response.data.address;
        })
        .catch((error) => {
          console.error("Error fetching address: ", error);
        });
    },
    onSubmit() {
      const id = this.$route.params.id;
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .put(
          `${apiBaseUrl}buyer/address/${id}`,
          { address: this.address },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Address updated successfully: ", response.data);
          this.$router.push("/Address-Management"); // Redirect to the address list page after successful update
        })
        .catch((error) => {
          console.error("Error updating address: ", error);
        });
    },
    onCancel() {
      this.$router.push("/Address-Management"); // Redirect to the address list page on cancel
    },
  },
  mounted() {
    this.fetchAddress();
  },
};
</script>

<style scoped>
.cart-header {
  display: flex;
  justify-content: space-between;
}

.action-buttons {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 20px;
}
</style>
