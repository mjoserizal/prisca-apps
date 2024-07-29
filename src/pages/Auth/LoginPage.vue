<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }" class="custom-card">
          <q-card-section>
            <div class="text-center q-pt-lg">
              <q-img src="/images/prisca logo.png" style="width: 103px; height: 103px; margin: 0 auto" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @keyup.enter="loginIfValid" class="q-gutter-md">
              <q-input filled v-model="email" label="Email" lazy-rules />
              <q-input filled v-model="password" :type="showPassword ? 'text' : 'password'" label="Password" lazy-rules>
                <template v-slot:append>
                  <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="togglePassword" />
                </template>
              </q-input>
              <div class="text-red-9" v-if="errorMessage">
                {{ errorMessage }}
              </div>
              <div class="text-center">
                <q-btn label="Login" @click="login" type="button" color="primary" class="q-ma-xs q-ma-sm" size="lg"
                  style="
                    width: 100%;
                    min-width: 200px;
                    max-width: 550px;
                    margin: auto;
                  " />
              </div>
              <div class="text-center">
                <p>
                  Register as
                  <span class="register-link" @click="goToRegisterVendor">Vendor</span>
                  /
                  <span class="register-link" @click="goToRegisterBuyer">Buyer</span>
                </p>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const showPassword = ref(false);
    const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

    const login = async () => {
      try {
        const response = await axios.post(`${apiBaseUrl}login`, {
          email: email.value,
          password: password.value,
        });

        if (response.status === 200) {
          const token = response.data.token;
          const userRole = response.data.user.role.name;
          const userId = response.data.user.id;

          localStorage.setItem("token", token);
          localStorage.setItem("userRole", userRole);
          localStorage.setItem("userId", userId);

          if (userRole === "Departemen") {
            router.push("/dashboard-Admin");
          } else if (userRole === "user_approval") {
            router.push("/purchase-request-approval");
          } else if (userRole === "company") {
            router.push("/dashboard-Admin");
          } else if (userRole === "vendor") {
            router.push({ name: "listCatalogue" });
          }
        } else {
          console.error("Error during login:", response.statusText);
          errorMessage.value = "Invalid email or password";
        }
      } catch (error) {
        console.error("Error during login:", error);
        errorMessage.value = "Invalid email or password";
      }
    };

    const loginIfValid = () => {
      if (email.value && password.value) {
        login();
      }
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleGoogleLogin = () => {
      window.location.href = `${apiBaseUrl}auth/google/redirectCompany`;
    };

    const goToRegisterBuyer = () => {
      router.push("/register-buyer");
    };

    const goToRegisterVendor = () => {
      router.push({ name: "register-vendor" });
    };

    return {
      email,
      password,
      errorMessage,
      showPassword,
      login,
      togglePassword,
      goToRegisterBuyer,
      goToRegisterVendor,
      loginIfValid,
    };
  },
};
</script>


<style>
.bg-image {
  background-image: linear-gradient(135deg, #365486 0%, #365486 100%);
}

.text-red-9 {
  color: red;
}

.register-link {
  color: blue;
  cursor: pointer;
}

.custom-card {
  background-color: #f9f5f6;
}
</style>
