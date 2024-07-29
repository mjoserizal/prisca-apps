const routes = [
  //Landing Page
  {
    path: "/",
    component: () => import("pages/LandingPage.vue"),
    name: "landingPage",
  },
  //Login
  {
    path: "/login",
    component: () => import("pages/Auth/LoginPage.vue"),
    name: "login",
  },
  {
    path: "/auth/google/redirect",
    name: "GoogleCallback",
    component: () => import("pages/Auth/GoogleLoginRedirect.vue"), // The new view for handling Google OAuth callback
  },
  //Register-buyer
  {
    path: "/register-buyer",
    component: () => import("pages/Auth/RegisterBuyerPage.vue"),
    name: "register-buyer",
  },
  //Register-vendor
  {
    path: "/register-vendor",
    component: () => import("src/pages/Auth/RegisterVendor.vue"),
    name: "register-vendor",
  },

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
  {
    path: "/purchase-order-Admin",
    name: "PurchaseOrderAdminPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/PurchaseOrderPage.vue"),
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
  //Address
  {
    path: "/Address-Management",
    name: "AddressAdminPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/AddressPage.vue"),
      },
    ],
  },
  {
    path: "/Add-Address-Management",
    name: "AddAddressAdminPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/AddAddressPage.vue"),
      },
    ],
  },
  {
    path: "/Edit-Address/:id",
    name: "EditAddressAdminPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/EditAddressPage.vue"),
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
    path: "/detailPO/:id",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/DetailPurchaseOrderPage.vue"),
        name: "detailPO",
        props: true,
      },
    ],
  },
  //Detail Quotation
  {
    path: "/RequestForQuotation/:id",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/RequestForQuotationPage.vue"),
        name: "RequestForQuotation",
        props: true,
      },
    ],
  },
  //Detail Quotation
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
    path: "/:code/RequestApprovalOrder",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/User-Admin/RequestApprovalPurchaseOrderPage.vue"),
        name: "requestApprovalOrder",
        props: true,
      },
    ],
  },
  {
    path: "/detailPRUserApproval/:doc_code",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/User-Approval/DetailPRUserApprovalPage.vue"),
        name: "detailPRUserApproval",
        props: true,
      },
    ],
  },
  {
    path: "/detailPOUserApproval/:doc_code",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/User-Approval/DetailPOUserApprovalPage.vue"),
        name: "detailPOUserApproval",
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
  {
    path: "/purchase-order-approval",
    name: "PurchaseOrderUserApprovalPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/User-Approval/PurchaseRequestOrderPage.vue"),
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
  {
    path: "/Order-Admin",
    name: "OrderPage",
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/OrderPage.vue"),
      },
    ],
  },
  {
    path: "/detail-order/:id", // Define the route path with a parameter for the order ID
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/DetailOrderPage.vue"),
        name: "detailOrder", // Set a unique name for the route
        props: true, // Pass route params as props to the component
      },
    ],
  },
  {
    path: "/detail-invoice/:id", // Define the route path with a parameter for the order ID
    component: () => import("components/HeaderSidebar.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/User-Admin/DetailInvoicePage.vue"),
        name: "detailInvoice", // Set a unique name for the route
        props: true, // Pass route params as props to the component
      },
    ],
  },

  //Vendor
  {
    path: "/vendor",
    component: () => import("components/HeaderSidebarVendor.vue"),
    name: "HeaderSidebarVendorPage",
    children: [
      {
        // Vendor Profile
        path: "vendorprofile",
        component: () => import("pages/Vendor/VendorProfile.vue"),
        name: "vendorProfile",
      },
      // Catalogue
      {
        path: "listcatalogue",
        component: () => import("src/pages/Vendor/ListCatalogue.vue"),
        name: "listCatalogue",
      },
      //Add Product
      {
        path: "addproduct",
        component: () => import("src/pages/Vendor/AddProduct.vue"),
        name: "addProduct",
      },
      //Edit Product
      {
        path: "editproduct/:id",
        component: () => import("pages/Vendor/EditProduct.vue"),
        name: "editProduct",
        props: true,
      },
      {
        path: "quodetail/:id",
        component: () => import("pages/Vendor/QuotationDetail.vue"),
        name: "quotationDetail",
        props: true,
      },
      {
        path: "quofix/:id",
        component: () => import("pages/Vendor/QuotationFix.vue"),
        name: "quotationFix",
        props: true,
      },
      {
        path: "quotation",
        component: () => import("pages/Vendor/QuotationPage.vue"),
        name: "quotation",
      },
      {
        path: "order",
        component: () => import("pages/Vendor/OrderPage.vue"),
        name: "order",
      },
      {
        path: "orderdetail/:id",
        component: () => import("src/pages/Vendor/OrderDetail.vue"),
        name: "orderDetail",
        props: true,
      },

      {
        path: "product",
        component: () => import("src/pages/Vendor/ProductCatalogues.vue"),
        name: "product",
      },
      {
        path: "invoice",
        component: () => import("src/pages/Vendor/InvoicePage.vue"),
        name: "invoicePage",
        props: true,
      },
      {
        path: "invoice/:id",
        component: () => import("src/pages/Vendor/InvoiceDetail.vue"),
        name: "invoiceDetail",
        props: true,
      },
      {
        path: "product/:id",
        component: () => import("src/pages/Vendor/ProductDetail.vue"),
        name: "product-detail",
        props: true,
      },
    ],
  },
];

export default routes;
