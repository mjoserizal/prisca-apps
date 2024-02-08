<template>
  <div class="container-box">
    <q-table :rows="groupedCartItems" :columns="columns" row-key="id">
      <template #top-left>
        <div class="text-bold" style="font-size: 1.3em">Purchase</div>
      </template>
      <template #top-right>
        <q-input class="q-ml-md" dense outlined placeholder="Search">
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- Slot untuk elemen thead -->
      <template v-slot:thead>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
      </template>

      <!-- Slot untuk elemen tbody -->
      <template v-slot:tbody="{ rows }">
        <tbody>
          <tr v-for="(item, index) in rows" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <button @click="decreaseQuantity(item)">Kurangi</button>
            </td>
          </tr>
        </tbody>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: "PurchaseCartPage",
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    // Mengelompokkan item-item yang sama dan menghitung jumlahnya
    groupedCartItems() {
      const grouped = {};
      this.cartItems.forEach((item) => {
        if (!grouped[item.id]) {
          grouped[item.id] = { ...item, quantity: 0 };
        }
        grouped[item.id].quantity++;
      });
      return Object.values(grouped);
    },
  },
  mounted() {
    // Ambil detail produk dari local storage saat halaman dimuat
    this.cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  },
  methods: {
    // Mengurangi jumlah item dalam keranjang belanja
    decreaseQuantity(item) {
      const index = this.cartItems.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity--;
        } else {
          this.cartItems.splice(index, 1); // Hapus item jika quantity <= 1
        }
        // Simpan kembali ke local storage setelah mengubah jumlah item
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
      }
    },
    // Proses checkout
    checkout() {
      // Tambahkan logika checkout di sini
      console.log("Checkout process...");
    },
  },
};
</script>
<style>
.container-box {
  background-color: #f8f8ff;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px;
  border: 1px solid #ddd;
}
</style>
