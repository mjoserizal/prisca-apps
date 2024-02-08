// store.js
import { createStore } from "vuex";

const store = createStore({
  state: {
    cartItemCount: 0,
  },
  mutations: {
    incrementCartItemCount(state) {
      state.cartItemCount++;
    },
    // Anda dapat menambahkan mutasi lain untuk mengurangi jumlah atau melakukan operasi lainnya
  },
  actions: {
    addToCart({ commit }) {
      commit("incrementCartItemCount");
    },
  },
  getters: {
    // getters jika diperlukan
  },
});

export default store;
