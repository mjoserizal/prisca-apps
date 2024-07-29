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
            <q-form class="q-gutter-md">
              <!-- Input fields -->
              <div class="q-row">
                <div class="q-col-xs-6">
                  <q-input filled v-model="name" label="Name" lazy-rules
                    :rules="[val => !!val || 'Name is required']" />
                </div>
                <div class="q-col-xs-6">
                  <q-input filled v-model="email" label="Email" lazy-rules
                    :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Email must be valid']" />
                </div>
              </div>
              <div class="q-row">
                <div class="q-col-xs-6">
                  <q-input filled v-model="password" :type="showPassword ? 'text' : 'password'" label="Password"
                    lazy-rules :rules="[val => !!val || 'Password is required']">
                    <template v-slot:append>
                      <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="togglePassword" />
                    </template>
                  </q-input>
                </div>
                <div class="q-col-xs-6">
                  <q-input filled v-model="password_confirmation" :type="showConfirmPassword ? 'text' : 'password'"
                    label="Password Confirmation" lazy-rules :rules="passwordConfirmationRules">
                    <template v-slot:append>
                      <q-icon :name="showConfirmPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="toggleConfirmPassword" />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="q-row">
                <div class="q-col-xs-6">
                  <q-input filled v-model="telp" label="Telp" lazy-rules
                    :rules="[val => !!val || 'Telephone number is required']" />
                </div>
                <div class="q-col-xs-6">
                  <q-input filled v-model="company_name" label="Company Name" lazy-rules
                    :rules="[val => !!val || 'Company name is required']" />
                </div>
              </div>
              <div class="text-red-9" v-if="errorMessage">
                {{ errorMessage }}
              </div>

              <div class="text-center">
                <q-btn label="Register" @click="register" type="button" color="primary" class="q-ma-xs q-ma-sm"
                  size="lg" style="
                    width: 100%;
                    min-width: 200px;
                    max-width: 550px;
                    margin: auto;
                  " />
              </div>
              <div class="text-center q-mt-md">
                <q-btn @click="handleGoogleLogin" type="button" class="google-btn q-ma-xs q-ma-sm" size="lg" style="
                    width: 100%;
                    min-width: 200px;
                    max-width: 550px;
                    margin: auto;
                    background-color: white;
                    color: black;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
                  ">
                  <q-img src="/images/google.png" style="width: 24px; height: 24px; margin-right: 8px;" />
                  Login or Signup with Google
                </q-btn>
              </div>
              <div class="text-center">
                <p>
                  <span class="register-link" @click="goToLogin">Login</span>
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
import { defineComponent, ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default defineComponent({
  name: "LoginPage",

  setup() {
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const password_confirmation = ref("");
    const telp = ref("");
    const company_name = ref("");
    const errorMessage = ref("");
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

    const passwordConfirmationRules = computed(() => [
      val => !!val || 'Password confirmation is required',
      val => val === password.value || 'Passwords do not match'
    ]);

    const register = async () => {
      if (!name.value || !email.value || !password.value || !password_confirmation.value || !telp.value || !company_name.value) {
        errorMessage.value = "All fields are required";
        return;
      }

      if (!/.+@.+\..+/.test(email.value)) {
        errorMessage.value = "Email must be valid";
        return;
      }

      if (password.value !== password_confirmation.value) {
        errorMessage.value = "Passwords do not match";
        return;
      }

      try {
        const response = await axios.post(
          `${apiBaseUrl}userRegister`,
          {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
            telp: telp.value,
            company_name: company_name.value,
          }
        );

        if (response.data.success) {
          router.push("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration failed",
            text: response.data.message || "Unknown error occurred.",
          });
          errorMessage.value = response.data.message || "Registration failed";
        }
      } catch (error) {
        console.error("Error during registration:", error);
        errorMessage.value = "Registration failed";
      }
    };

    const goToLogin = () => {
      router.push({ name: "login" });
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    const handleGoogleLogin = () => {
      window.location.href = `${apiBaseUrl}auth/google/redirectCompany`;
    };
    const toggleConfirmPassword = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
    };

    return {
      name,
      email,
      password,
      password_confirmation,
      telp,
      company_name,
      errorMessage,
      register,
      goToLogin,
      showPassword,
      showConfirmPassword,
      togglePassword,
      toggleConfirmPassword,
      passwordConfirmationRules,
      handleGoogleLogin
    };
  },
});
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

.q-row {
  display: flex;
  justify-content: space-between;
}

.q-col-xs-6 {
  flex: 0 0 48%;
}

.custom-card {
  background-color: #f8f6f4;
}
</style>
