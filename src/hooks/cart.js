import { reactive, readonly, toRefs } from "vue";

// Inisialisasi keranjang belanja
const cart = reactive({
  items: [],
});

// Fungsi untuk menambahkan produk ke keranjang
const addToCart = (product) => {
  const existingProduct = cart.items.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.items.push({ ...product, quantity: 1 });
  }
};

// Fungsi untuk menghapus produk dari keranjang
const removeFromCart = (productId) => {
  cart.items = cart.items.filter((item) => item.id !== productId);
};

// Fungsi untuk mendapatkan total jumlah produk dalam keranjang
const getTotalItems = () => {
  return cart.items.reduce((total, item) => total + item.quantity, 0);
};

// Fungsi untuk mendapatkan total harga produk dalam keranjang
const getTotalPrice = () => {
  return cart.items.reduce((total, item) => total + item.amount * item.quantity, 0);
};

export const useCart = () => {
  return {
    ...toRefs(cart),
    addToCart,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
  };
};
