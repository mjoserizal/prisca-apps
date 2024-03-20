<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-center">
      <q-avatar size="100px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="Avatar" />
      </q-avatar>
      <div class="text-h4">{{ vendorName }}</div>
    </div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Alamat</div>
        <div>{{ vendorAddress }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Telepon</div>
        <div>{{ vendorPhone }}</div>
      </q-card-section>
      <!-- Tambahkan bagian lainnya sesuai kebutuhan -->
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vendorName: "Nama Vendor",
      vendorAddress: "Alamat Vendor",
      vendorPhone: "Telepon Vendor",
      // Tambahkan data lainnya sesuai kebutuhan
    };
  },
};
</script>

<style scoped>
/* Gaya khusus untuk halaman profil vendor */
.text-h4 {
  margin-left: 20px;
  font-weight: bold;
}
</style>
