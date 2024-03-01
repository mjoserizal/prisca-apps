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
<<<<<<< Updated upstream
              <div class="col text-h6 ellipsis">Login Prisca-Apps</div>
=======
              <q-img
                src="/public/images/prisca logo.png"
                style="width: 103px; height: 103px; margin: 0 auto"
              />
            </div>
          </q-card-section>
          <!-- <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Login to Prisca-Apps</div>
>>>>>>> Stashed changes
            </div>
          </q-card-section> -->
          <q-card-section>
            <q-form class="q-gutter-md">
<<<<<<< Updated upstream
              <q-input filled v-model="username" label="username" lazy-rules />
=======
              <q-input filled v-model="email" label="Email" lazy-rules />
>>>>>>> Stashed changes

              <!-- Input password dengan tombol mata -->
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
                  <span class="register-link" @click="goToRegisterBuyer"
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
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const showPassword = ref(false);

    const login = async () => {
      try {
        const response = await axios.post("https://dummyjson.com/auth/login", {
          username: username.value,
          password: password.value,
        });

        if (response.status === 200) {
          const token = response.data.token;
<<<<<<< Updated upstream
          const username = response.data.username;
          // Store the token in local storage
          localStorage.setItem("token", token);

          // Log the token to the console
          console.log("Token:", token);
          console.log("Username:", username);
          // Redirect to the dashboard
          router.push("/dashboard");
=======
          const userLevel = response.data.user.level;
          localStorage.setItem("token", token);
          localStorage.setItem("userLevel", userLevel);
          if (userLevel === "Departemen") {
            router.push("/dashboard-departemen");
          } else if (userLevel === "Divisi") {
            router.push("/dashboard-divisi");
          } else {
            router.push("/");
          }

          console.log("Token:", token);
          console.log("userLevel:", userLevel);
>>>>>>> Stashed changes
        } else {
          console.error("Error during login:", response.statusText);
          errorMessage.value = "Invalid email or password";
        }
      } catch (error) {
        console.error("Error during login:", error);
        errorMessage.value = "Invalid email or password";
      }
    };

<<<<<<< Updated upstream
=======
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    const goToRegisterBuyer = () => {
      router.push("/register-buyer"); // Mengarahkan pengguna ke halaman pendaftaran
    };
>>>>>>> Stashed changes
    return {
      username,
      password,
      login,
<<<<<<< Updated upstream
=======
      errorMessage,
      showPassword,
      togglePassword,
      goToRegisterBuyer,
>>>>>>> Stashed changes
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
  color: blue; /* Atur warna teks menjadi biru */
  cursor: pointer; /* Ganti kursor saat diarahkan ke tautan */
}
.custom-card {
  background-color: #f9f5f6; /* Ubah warna latar belakang sesuai kebutuhan */
}
</style>
