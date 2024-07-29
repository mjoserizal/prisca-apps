<template>
  <div>Redirecting...</div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "GoogleLoginRedirect",
  setup() {
    const router = useRouter();

    // Function to extract a parameter from URL
    const extractParamFromUrl = (param) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    };

    const saveDataAndRedirect = () => {
      const token = extractParamFromUrl('token');
      const userRole = extractParamFromUrl('role.name');
      const userId = extractParamFromUrl('user_id');

      if (token && userRole && userId) {
        // Save token, userRole, and userId to local storage
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userId", userId);

        // Redirect to /dashboard-Admin
        router.push("/dashboard-Admin");
      } else {
        console.error("Token, role.name, or user_id not found in URL");
      }
    };

    saveDataAndRedirect();

    return {};
  },
};
</script>
