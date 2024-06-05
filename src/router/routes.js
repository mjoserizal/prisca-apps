const routes = [
  {
    path: "/vendor",
    component: () => import("components/HeaderSidebarVendor.vue"),
    name: "HeaderSidebarVendor",
    children: [
      {
        path: "dashboard",
        component: () => import("pages/IndexPage.vue"),
        name: "dashboard",
      },

      {
        path: "vendorprofile",
        component: () => import("pages/vendor/VendorProfile.vue"),
        name: "vendorProfile",
      },
      {
        path: "editproduct/:id",
        component: () => import("pages/vendor/EditProduct.vue"),
        name: "editProduct",
        props: true,
      },
      {
        path: "quodetail/:id",
        component: () => import("pages/vendor/QuotationDetail.vue"),
        name: "quotationDetail",
        props: true,
      },
      {
        path: "quofix/:id",
        component: () => import("pages/vendor/QuotationFix.vue"),
        name: "quotationFix",
        props: true,
      },

      {
        path: "catalogue",
        component: () => import("pages/CataloguePage.vue"),
        name: "catalogue",
      },
      {
        path: "quotation",
        component: () => import("pages/vendor/QuotationPage.vue"),
        name: "quotation",
      },
      {
        path: "order",
        component: () => import("pages/vendor/OrderPage.vue"),
        name: "order",
      },
      {
        path: "orderdetail/:id",
        component: () => import("src/pages/vendor/OrderDetail.vue"),
        name: "orderDetail",
      },

      {
        path: "product",
        component: () => import("src/pages/vendor/ProductCatalogues.vue"),
        name: "product",
      },
      {
        path: "addproduct",
        component: () => import("src/pages/vendor/AddProduct.vue"),
        name: "addProduct",
      },
      {
        path: "addinfo",
        component: () => import("src/pages/vendor/AddInfo.vue"),
        name: "addInfo",
      },

      {
        path: "listcatalogue",
        component: () => import("src/pages/vendor/ListCatalogue.vue"),
        name: "listCatalogue",
      },

      {
        path: "invoice/:id",
        component: () => import("src/pages/vendor/InvoicePage.vue"),
        name: "invoicePage",
      },
      {
        path: "product/:id",
        component: () => import("src/pages/vendor/ProductDetail.vue"),
        name: "product-detail",
      },
      {
        path: "detail/:id",
        component: () => import("pages/vendor/ProductDetail.vue"),
        name: "detail",
        props: true,
      },
    ],
  },
  { path: "/login", component: () => import("src/pages/auth/LoginPage.vue") },
  {
    path: "/register-vendor",
    component: () => import("src/pages/auth/RegisterVendor.vue"),
    name: "register-vendor",
  },
];

export default routes;
