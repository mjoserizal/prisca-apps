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
              <div class="col text-h6 ellipsis">Login Prisca-Apps</div>
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
          "http://192.168.1.23:8000/api/login",
          {
            email: email.value,
            password: password.value,
          }
        );

        // Check if response is successful (status code 200)
        if (response.status === 200) {
          // Assuming the token is returned in the response
          const token = response.data.token;

          // Store the token in local storage
          localStorage.setItem("token", token);

          // Log the token to the console
          console.log("Token:", token);

          // Redirect to the dashboard
          router.push("/dashboard");
        } else {
          console.error("Error during login:", response.statusText);
          // Handle login error, show message, etc.
        }
      } catch (error) {
        console.error("Error during login:", error);
        // Handle login error, show message, etc.
      }
    };

    return {
      email,
      password,
      login,
    };
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
