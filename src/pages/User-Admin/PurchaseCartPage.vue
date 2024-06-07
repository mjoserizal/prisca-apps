<template>
  <div class="p-2.5 xl:p-5">
    <div>
      <q-card class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" bordered>
        <q-card-section class="cart-header">
          <div class="text-h6 text-grey-8">Cart List</div>
          <div class="search-wrapper">
            <q-input outlined dense v-model="searchInput" placeholder="Search product..." class="search-input" />
          </div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-table flat bordered ref="tableRef" :class="tableClass" tabindex="0" :rows="filteredProducts"
            :columns="columns" row-key="name" selection="multiple" v-model:selected="selected"
            v-model:pagination="pagination" :filter="filter" @focusin="activateNavigation"
            @focusout="() => (selectedRows = selected)" @keydown="onKey" @update:selected="onSelected">
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <span :class="{
              'text-green-500': props.row.status === 'Active',
              'text-red-500': props.row.status === 'Inactive',
            }">{{ props.row.status }}</span>
              </q-td>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn round dense flat color="primary" icon="edit" @click="editQuantity(props.row)" />
                <q-btn round dense flat color="negative" icon="delete" @click="deleteCartItem(props.row.id)" />
              </q-td>
            </template>
            <template v-slot:body-cell-totalPrice="props">
              <q-td :props="props">
                <span>{{ formatToRupiah(props.row.totalPrice) }}</span>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="p-2.5 xl:p-5 flex justify-end">
    <div class="cart-totals">
      <h1 class="totals-title">Cart Totals</h1>
      <div class="sub-total">
        <span class="label">Sub Total Quantity:</span>
        <span class="value">{{ selectedTotalQuantity }}</span>
      </div>
      <div class="sub-total">
        <span class="label">Sub Total Price:</span>
        <span class="value">{{ formatToRupiah(selectedTotalPrice) }}</span>
      </div>
      <button class="checkout-btn" @click="proceedToPR">Proceed to PR</button>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { EventBus } from "src/router/EventBus";
import Swal from "sweetalert2";
import axios from "axios";
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;
export default {
  name: "PurchaseCartPage",

  setup() {
    const searchInput = ref("");
    const cartItems = ref([]);
    const rows = computed(() => cartItems.value);
    const sortBy = ref("name");
    const sortDesc = ref(false);
    const selected = ref([]);
    const selectedRows = ref([]);
    const columns = [
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: "name",
        sortable: true,
      },
      {
        name: "vendor",
        required: true,
        label: "Vendor",
        align: "left",
        field: "vendor",
        sortable: true,
      },
      {
        name: "quantity",
        required: true,
        label: "Quantity",
        align: "center",
        field: "quantity",
        sortable: true,
      },
      {
        name: "price",
        required: true,
        label: "Price",
        align: "center",
        field: "price",
        sortable: true,
        format: (val) => formatToRupiah(val),
      },
      {
        name: "totalPrice",
        required: true,
        label: "Total Price",
        align: "center",
        field: "total_price",
        sortable: true,
      },
      {
        name: "action",
        required: true,
        label: "Action",
        align: "center",
        field: "action",
      },
    ];

    const filteredProducts = computed(() => {
      return cartItems.value.filter((item) =>
        item.name.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    });

    const loadCartItems = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Jika tidak ada token, arahkan pengguna ke halaman beranda
        router.push("/");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`${apiBaseUrl}buyer/cart`, config)
        .then((response) => {
          if (response.data.cart && Array.isArray(response.data.cart)) {
            cartItems.value = response.data.cart.map((item) => ({
              ...item,
              totalPrice: item.quantity * item.price,
            }));
          } else {
            console.error("Invalid cart data format:", response.data.cart);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 251) {
            router.push("/"); // Redirect to home if unauthorized
          } else {
            console.error("Error fetching cart items:", error);
          }
        });
    };

    const deleteCartItem = (itemId) => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Jika tidak ada token, arahkan pengguna ke halaman beranda
        router.push("/");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete(
          `${apiBaseUrl}buyer/cart/${itemId}`,
          config
        )
        .then(() => {
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
          loadCartItems(); // Refresh cart items after successful deletion
          EventBus.emit("cartItemChanged");
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
          Swal.fire("Error", "Failed to delete item.", "error");
        });
    };

    const editQuantity = (item) => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Jika tidak ada token, arahkan pengguna ke halaman beranda
        router.push("/");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const index = cartItems.value.findIndex((i) => i.id === item.id);

      if (index !== -1) {
        Swal.fire({
          title: `Edit Quantity for ${item.name}`,
          input: "number",
          inputAttributes: {
            autocapitalize: "off",
            min: 1,
            max: item.stock, // Menambahkan max untuk membatasi jumlah ke stok yang tersedia
          },
          showCancelButton: true,
          confirmButtonText: "Confirm",
          showLoaderOnConfirm: true,
          preConfirm: (quantity) => {
            const parsedQuantity = parseInt(quantity);
            if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
              Swal.showValidationMessage(`Invalid quantity`);
              return;
            }
            return parsedQuantity;
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isConfirmed) {
            const newQuantity = result.value;
            axios
              .put(
                `${apiBaseUrl}buyer/cart/${item.id}`,
                { quantity: newQuantity },
                config
              )
              .then(() => {
                cartItems.value[index].quantity = newQuantity;
                loadCartItems(); // Refresh cart items after successful update
                EventBus.emit("cartItemChanged");
              })
              .catch((error) => {
                console.error("Error updating quantity:", error);
              });
          }
        });
      }
    };

    const calculateTotalQuantity = () => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    };

    const calculateTotalPrice = () => {
      return cartItems.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };
    const selectedTotalQuantity = computed(() => {
      return selected.value.reduce((total, item) => total + item.quantity, 0);
    });
    const selectedTotalPrice = computed(() => {
      return selected.value.reduce((total, item) => total + item.totalPrice, 0);
    });
    let lastPurchaseRequestNumber =
      localStorage.getItem("lastPurchaseRequestNumber") || 0;
    const proceedToPR = () => {
      // Mendapatkan token dari localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        // Jika tidak ada token, arahkan pengguna ke halaman beranda
        router.push("/");
        return;
      }
      const timestamp = Date.now();

      // Persiapkan deskripsi PR menggunakan timestamp saat ini
      const description = `PR${timestamp}`;

      // Membuat array untuk menyimpan data yang akan dikirim ke API
      const requestData = {
        description: description,
        lineItems: selectedRows.value.map((row) => ({
          id: row.id,
          product_id: row.product_id,
          name: row.name,
          price: row.totalPrice,
          quantity: row.quantity,
        })),
      };

      // Konfigurasi untuk request Axios
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Menggunakan token dari localStorage
        },
      };

      // Kirim request ke API dengan requestData
      axios
        .post(
          `${apiBaseUrl}buyer/purchaseRequest`,
          requestData,
          config
        )
        .then((response) => {
          // Tangani respon dari API di sini jika diperlukan
          console.log("Response from API:", response.data);

          // Memperbarui data cartItems setelah berhasil membuat PR
          loadCartItems();

          // Memperbarui total kuantitas dan total harga tanpa merefresh halaman
          selectedTotalQuantity.value = calculateTotalQuantity();
          selectedTotalPrice.value = calculateTotalPrice();

          // Atur ulang nilai selected menjadi array kosong untuk mengosongkan item yang dipilih
          selected.value = [];

          // Emit event 'cartItemChanged'
          EventBus.emit("cartItemChanged");

          // Tampilkan sweet alert success
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Purchase Request has been created successfully!",
          });
        })
        .catch((error) => {
          // Tangani error jika terjadi
          console.error("Error:", error);
        });
    };

    const formatToRupiah = (totalPrice) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(totalPrice);
    };

    const onSelected = (newSelected) => {
      selectedRows.value = newSelected;
    };

    onMounted(loadCartItems); // Load cart items when the component is mounted

    // Emit total quantity to EventBus when it changes
    EventBus.emit("cartItemChanged", calculateTotalQuantity.value);

    return {
      searchInput,
      filteredProducts,
      deleteCartItem,
      editQuantity,
      calculateTotalQuantity,
      calculateTotalPrice,
      proceedToPR,
      formatToRupiah,
      rows,
      columns,
      sortBy,
      sortDesc,
      selected,
      selectedRows,
      selectedTotalQuantity,
      selectedTotalPrice,
      onSelected,
    };
  },
};
</script>

<style>
.checkout-btn {
  display: block;
  margin: 0 auto;
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: #45a049;
}

.cart-totals {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 500px;
}

.totals-title {
  text-align: center;
  font-size: 1.5em;
}

.sub-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
}

.search-wrapper {
  margin-left: auto;
}
</style>
