<template>
  <div class="p-2.5 xl:p-5">
    <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
      <q-card-section class="cart-header">
        <div class="text-h6 text-grey-8">
          Add Address
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input v-model="address" label="Address" outlined dense />
          <div class="q-mt-md action-buttons">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Cancel" type="reset" color="secondary" @click="onCancel" />
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
  name: "AddAddressPage",
  data() {
    return {
      address: "",
    };
  },
  methods: {
    onSubmit() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      axios
        .post(
          `${apiBaseUrl}buyer/address`,
          { address: this.address },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Address added successfully: ", response.data);
          this.$router.push("/Address-Management"); // Redirect to the address list page after successful submission
        })
        .catch((error) => {
          console.error("Error adding address: ", error);
        });
    },
    onCancel() {
      this.$router.push("/Address-Management"); // Redirect to the address list page on cancel
    },
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
