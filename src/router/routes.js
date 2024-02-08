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
    children: [{ path: "", component: () => import("pages/PurchasePage.vue") }],
  },
];

export default routes;
