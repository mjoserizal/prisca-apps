const routes = [
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
];

export default routes;
