<template>
  <div class="container-box">
    <h1 class="q-pa-md text-center font-bold text-lg">
      Create Purchase Request
    </h1>
    <div class="q-pa-md">
      <q-stepper
        v-model="step"
        header-nav
        ref="stepper"
        animated
        class="custom-stepper"
        without-border
        flat
      >
        <q-step
          :name="1"
          title="Step 1"
          caption="Main Data Form"
          icon="settings"
          :done="step > 1"
        ></q-step>

        <q-step
          :name="2"
          title="Step 2"
          caption="PR Item"
          icon="create_new_folder"
          :done="step > 2"
        ></q-step>
      </q-stepper>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "PurchaseRequestPage",
  data() {
    return {
      step: 1,
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

.custom-stepper {
  background-color: #f9f9f9; /* Warna latar belakang */
  border: none; /* Menghapus border */
  box-shadow: none; /* Menghapus shadow */
  padding: 0; /* Menghapus padding */
}
</style>
