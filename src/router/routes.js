const routes = [
  {
    path: "/catalogue",
    name: "catalogue",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      { path: "", component: () => import("pages/CataloguePage.vue") },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("components/HeaderSidebar.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/product",
    name: "product",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      { path: "", component: () => import("pages/ProductCatalogues.vue") },
    ],
  },
  {
    path: "/addproduct",
    name: "addproduct",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("components/addproductform/SectionOne.vue"),
      },
    ],
  },

  {
    path: "/product/:id",
    name: "product-detail",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      { path: "", component: () => import("pages/ProductDetail.vue") },
    ],
  },
  {
    path: "/",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/detail/:id",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/DetailPage.vue"),
        name: "detail",
        props: true,
      },
    ],
  },
  {
    path: "/purchase-cart",
    name: "PurchaseCartPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      { path: "", component: () => import("pages/PurchaseCartPage.vue") },
    ],
  },
];

export default routes;
