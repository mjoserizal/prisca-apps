const routes = [
  {
    path: "/",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("pages/IndexPage.vue"),
        name: "dashboard",
      },
      {
        path: "/vendorproduct",
        component: () => import("pages/vendor/VendorProduct.vue"),
        name: "vendorProduct",
      },
      {
        path: "/vendordetail",
        component: () => import("pages/vendor/VendorDetail.vue"),
        name: "vendorDetail",
      },
      {
        path: "/editproduct/:id",
        component: () => import("pages/vendor/EditProduct.vue"),
        name: "editProduct",
        props: true,
      },

      {
        path: "/catalogue",
        component: () => import("pages/CataloguePage.vue"),
        name: "catalogue",
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
        component: () => import("pages/DetailPage.vue"),
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
  { path: "/login", component: () => import("pages/LoginPage.vue") },
];

export default routes;
