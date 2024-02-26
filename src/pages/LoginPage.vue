<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <!-- <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="src/assets/prisca logo.png" />
            </q-avatar> -->
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <q-img
                src="/public/images/prisca logo.png"
                style="width: 103px; height: 103px; margin: 0 auto"
              />
            </div>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Login to Prisca-Apps</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="email" label="email" lazy-rules />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn
                  label="Login"
                  @click="login"
                  type="button"
                  color="primary"
                />
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

    const login = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.244:8000/api/login",
          {
            email: email.value,
            password: password.value,
          }
        );

        // Check if response is successful (status code 200)
        if (response.status === 200) {
          // Assuming the token is returned in the response
          const token = response.data.token;
          const userRole = response.data.user.role.name;

          // Store the token in local storage
          localStorage.setItem("token", token);

          // Redirect based on user role
          if (userRole === "company") {
            router.push("/dashboard");
          } else {
            // Redirect to a different route based on other roles or handle accordingly
            router.push("/other-route");
          }

          // Log the token to the console
          console.log("Token:", token);
          console.log("User Role:", userRole);
        } else {
          console.error("Error during login:", response.statusText);
          // Handle login error, show message, etc.
        }
      } catch (error) {
        console.error("Error during login:", error);
        // Handle login error, show message, etc.
      }
    };

    const logout = () => {
      axios
        .post("http://192.168.1.244:8000/api/logout")
        .then((response) => {
          // Handle response jika diperlukan
          console.log("Logout successful");
          // Clear localStorage atau melakukan operasi lain setelah logout
          localStorage.clear();
          // Redirect ke halaman login atau halaman lainnya setelah logout
          router.push("/login");
        })
        .catch((error) => {
          // Handle error jika diperlukan
          console.error("Logout failed:", error);
        });
    };

    return {
      email,
      password,
      login,
      logout,
    };
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
