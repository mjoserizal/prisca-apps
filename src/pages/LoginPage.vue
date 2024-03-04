<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
          class="custom-card"
        >
          <q-card-section>
            <div class="text-center q-pt-lg">
              <q-img
                src="/public/images/prisca logo.png"
                style="width: 103px; height: 103px; margin: 0 auto"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="email" label="Email" lazy-rules />
              <q-input
                filled
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                lazy-rules
              >
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="togglePassword"
                  />
                </template>
              </q-input>

              <div class="text-red-9" v-if="errorMessage">
                {{ errorMessage }}
              </div>

              <div class="text-center">
                <q-btn
                  label="Login"
                  @click="login"
                  type="button"
                  color="primary"
                  class="q-ma-xs q-ma-sm"
                  size="lg"
                  style="
                    width: 100%;
                    min-width: 200px;
                    max-width: 550px;
                    margin: auto;
                  "
                />
              </div>
              <div class="text-center">
                <p>
                  Register as
                  <span class="register-link" @click="goToRegisterVendor"
                    >Vendor</span
                  >
                  /
                  <span class="register-link" @click="goToRegisterBuyer"
                    >Buyer</span
                  >
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

export default defineComponent({
  name: "LoginPage",

  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const showPassword = ref(false);

    const login = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.244:8000/api/login",
          {
            email: email.value,
            password: password.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);

          console.log("Token:", token);
        } else {
          console.error("Error during login:", response.statusText);
          errorMessage.value = "Invalid email or password";
        }
      } catch (error) {
        console.error("Error during login:", error);
        errorMessage.value = "Invalid email or password";
      }
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const goToRegisterVendor = () => {
      router.push("/register-vendor");
    };

    const goToRegisterBuyer = () => {
      router.push("/register-buyer");
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
</style>
