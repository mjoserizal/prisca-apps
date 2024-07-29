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
              <q-input filled v-model="name" label="Name" lazy-rules />
              <q-input filled v-model="email" label="Email" lazy-rules />
              <q-input filled v-model="password" :type="showPassword ? 'text' : 'password'" label="Password" lazy-rules>
                <template v-slot:append>
                  <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="togglePassword" />
                </template>
              </q-input>
              <q-input filled v-model="passwordConfirmation" :type="showPassword ? 'text' : 'password'"
                label="Password Confirmation" lazy-rules>
                <template v-slot:append>
                  <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="togglePassword" />
                </template>
              </q-input>
              <q-input filled v-model="telp" label="Phone Number" lazy-rules />

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
              <div class="text-center">
                <q-btn @click="signUpWithGoogle" type="button" class="q-ma-xs q-ma-sm google-btn" size="lg" style="
                    width: 100%;
                    min-width: 200px;
                    max-width: 550px;
                    margin: auto;
                  ">
                  <img src="https://developers.google.com/identity/images/g-logo.png" class="google-icon" />
                  <span>Sign Up with Google</span>
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
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default defineComponent({
  name: "RegisterPage",

  setup() {
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");
    const telp = ref("");
    const errorMessage = ref("");
    const showPassword = ref(false);
    const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

    const register = async () => {
      try {
        const response = await axios.post(
          `${apiBaseUrl}vendorRegister`,
          {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirmation.value,
            telp: telp.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201 && response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Registration successful",
            text: "You have been registered successfully!",
          }).then(() => {
            router.push({ name: "login" });
          });
        } else {
          console.error(
            "Error during registration:",
            response.data.message || "Unknown error"
          );
          errorMessage.value = response.data.message || "Registration failed";
        }
      } catch (error) {
        console.error(
          "Error during registration:",
          error.response ? error.response.data.message : "Unknown error"
        );
        errorMessage.value = "Registration failed";
      }
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const goToLogin = () => {
      router.push({ name: "login" });
    };

    const signUpWithGoogle = () => {
      window.location.href = `${apiBaseUrl}auth/google/redirectVendor`;
    };

    return {
      name,
      email,
      password,
      passwordConfirmation,
      telp,
      errorMessage,
      showPassword,
      register,
      togglePassword,
      goToLogin,
      signUpWithGoogle,
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

.custom-card {
  background-color: #f9f5f6;
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid #ccc;
  color: #757575;
  font-weight: bold;
}

.google-btn:hover {
  background-color: #f1f1f1;
}

.google-icon {
  height: 18px;
  width: 18px;
  margin-right: 10px;
}
</style>
