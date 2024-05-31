const routes = [
  //User-admin
  // PurchaseCart
  {
    path: "/purchase-cart-Admin",
    name: "PurchaseCartAdminPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/PurchaseCartPage.vue"),
      },
    ],
  },
  //Dashboard
  {
    path: "/dashboard-Admin",
    name: "DashboardAdmin",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/IndexPage.vue"),
      },
    ],
  },
  //Purchase-Request
  {
    path: "/purchase-request-Admin",
    name: "PurchaseRequestAdminPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/PurchaseRequestPage.vue"),
      },
    ],
  },
  //User-Management
  {
    path: "/user-management",
    name: "UserManagementAdminPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/UserManagementPage.vue"),
      },
    ],
  },
  //Divisi-Departemen-Management
  {
    path: "/Divisi-Departemen-Management",
    name: "DivisiCompanyManagementAdminPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/User-Admin/DivisiDepartemenManagementPage.vue"),
      },
    ],
  },
  //Add User
  {
    path: "/add-user",
    name: "AddUserAdminPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/AddUserPage.vue"),
      },
    ],
  },
  //Add-Divisi
  {
    path: "/add-divisi",
    name: "AddDivisiAdminPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/AddDivisiPage.vue"),
      },
    ],
  },
  //Add-Departemen
  {
    path: "/add-departemen",
    name: "AddDepartemenAdminPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/AddDepartemenPage.vue"),
      },
    ],
  },
  //Detail-Product
  {
    path: "/detail-Admin/:id",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/DetailPage.vue"),
        name: "detail",
        props: true,
      },
    ],
  },
  //Detail PR
  {
    path: "/detailPR/:id",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/User-Admin/DetailPurchaseRequestPage.vue"),
        name: "detailPR",
        props: true,
      },
    ],
  },
  {
    path: "/detailQuotation/:id",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/DetailQuotationPage.vue"),
        name: "detailQuotation",
        props: true,
      },
    ],
  },
  {
    path: "/detailRFQ/:id",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/DetailRFQPage.vue"),
        name: "detailRFQ",
        props: true,
      },
    ],
  },
  {
    path: "/:code/RequestApproval",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/RequestApprovalPage.vue"),
        name: "requestApproval",
        props: true,
      },
    ],
  },
  //Edit-Profile
  {
    path: "/UserProfile",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/ProfileUserPage.vue"),
        name: "ProfileUser",
      },
    ],
  },
  //User-Approval
  {
    path: "/purchase-request-approval",
    name: "PurchaseRequestUserApprovalPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/User-Approval/PurchaseRequestApprovalPage.vue"),
      },
    ],
  },
  //Quotation
  {
    path: "/Quotation-Admin",
    name: "QuotationPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/QuotationPage.vue"),
      },
    ],
  },
  //Login
  {
    path: "/",
    component: () => import("pages/LoginPage.vue"),
  },
  //Register-buyer
  {
    path: "/register-buyer",
    component: () => import("pages/RegisterBuyerPage.vue"),
  },
];

export default routes;
