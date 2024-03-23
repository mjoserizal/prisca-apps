const routes = [
  {
    path: "/",
    component: () => import("components/HeaderSidebarVendor.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("pages/IndexPage.vue"),
        name: "dashboard",
      },

      {
        path: "/vendordetail",
        component: () => import("pages/vendor/VendorDetail.vue"),
        name: "vendorDetail",
      },
      {
        path: "/vendor-profile",
        component: () => import("pages/vendor/VendorProfile.vue"),
        name: "vendorProfile",
      },
      {
        path: "/editproduct/:id",
        component: () => import("pages/vendor/EditProduct.vue"),
        name: "editProduct",
        props: true,
      },
      {
        path: "/quodetail/:id",
        component: () => import("pages/vendor/QuotationDetail.vue"),
        name: "quotationDetail",
        props: true,
      },
      {
        path: "/quofix/:id",
        component: () => import("pages/vendor/QuotationFix.vue"),
        name: "quotationFix",
        props: true,
      },

      {
        path: "/catalogue",
        component: () => import("pages/CataloguePage.vue"),
        name: "catalogue",
      },
      {
        path: "/quotation",
        component: () => import("pages/vendor/QuotationPage.vue"),
        name: "quotation",
      },
      {
        path: "/product",
        component: () => import("src/pages/vendor/ProductCatalogues.vue"),
        name: "product",
      },
      {
        path: "/addproduct",
        component: () => import("src/pages/vendor/AddProduct.vue"),
        name: "addProduct",
      },
      {
        path: "/addinfo",
        component: () => import("src/pages/vendor/AddInfo.vue"),
        name: "addInfo",
      },
      {
        path: "/input",
        component: () => import("src/pages/vendor/FormParent.vue"),
        name: "inpt",
      },

      {
        path: "/listcatalogue",
        component: () => import("src/pages/vendor/ListCatalogue.vue"),
        name: "listCatalogue",
      },
      {
        path: "/product/:id",
        component: () => import("src/pages/vendor/ProductDetail.vue"),
        name: "product-detail",
      },
      {
        path: "/detail/:id",
        component: () => import("pages/vendor/ProductDetail.vue"),
        name: "detail",
        props: true,
      },
      {
        path: "/purchase-cart",
        component: () => import("pages/PurchaseCartPage.vue"),
        name: "PurchaseCartPage",
      },
    ],
  },
  { path: "/login", component: () => import("src/pages/auth/LoginPage.vue") },
  {
    path: "/register-vendor",
    component: () => import("src/pages/auth/RegisterVendor.vue"),
  },
];

export default routes;
