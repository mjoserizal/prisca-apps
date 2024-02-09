/* __placeholder__ */
export default (await import("vue")).defineComponent({
  data() {
    return {
      product: {
        image: null,
        name: "",
        group: "",
        category: "",
        brand: "",
        categoryName: "",
      },
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      // handle the file
    },
    submitProduct() {
      // handle form submission
    },
  },
});
