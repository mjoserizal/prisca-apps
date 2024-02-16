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
        name: "addproduct",
      },
      {
        path: "/form",
        component: () => import("src/pages/vendor/FormAdd.vue"),
        name: "form",
      },
      {
        path: "/listcatalogue",
        component: () => import("src/pages/vendor/ListCatalogue.vue"),
        name: "listcatalogue",
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
  { path: "/", component: () => import("pages/LoginPage.vue") },
];

export default routes;
