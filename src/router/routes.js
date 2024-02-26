const routes = [
  {
    path: "/catalogue",
    name: "catalogue",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      { path: "", component: () => import("pages/Buyer/CataloguePage.vue") },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      { path: "", component: () => import("pages/Buyer/IndexPage.vue") },
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
        component: () => import("pages/Buyer/DetailPage.vue"),
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
      { path: "", component: () => import("pages/Buyer/PurchaseCartPage.vue") },
    ],
  },
  {
    path: "/purchase-request",
    name: "PurchaseRequestPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Buyer/PurchaseRequestPage.vue"),
      }, //, name: "PurchaseRequestPage", props: true, component: () => import("pages/PurchaseRequestPage.vue") },
    ],
  },
];

export default routes;
