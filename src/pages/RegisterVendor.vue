<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Register Prisca-Apps</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="name" label="Name" lazy-rules />
              <q-input
                filled
                v-model="email"
                label="Email"
                lazy-rules
                :rules="emailRules"
              />
              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
              />
              <q-input
                type="password"
                filled
                v-model="passwordConfirmation"
                label="Password Confirmation"
                lazy-rules
                :rules="[
                  () =>
                    passwordConfirmation === password ||
                    'Passwords do not match',
                ]"
              />
              <q-input filled v-model="telp" label="Phone Number" lazy-rules />

              <div>
                <q-btn
                  label="Register"
                  @click="register"
                  type="button"
                  color="primary"
                  :loading="loading"
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
  name: "RegisterPage",

  setup() {
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");
    const telp = ref("");
    const loading = ref(false);

    const emailRules = [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Email must be valid",
    ];

    const register = async () => {
      try {
        loading.value = true;
        const response = await axios.post(
          "http://192.168.1.244:8000/api/register",
          {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirmation.value,
            telp: telp.value,
            role_id: "02f1171a-c20b-4873-837e-2e7b5d9418ea",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201 && response.data.success) {
          router.push("/login");
        } else {
          console.error(
            "Error during registration:",
            response.data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error(
          "Error during registration:",
          error.response ? error.response.data.message : "Unknown error"
        );
      } finally {
        loading.value = false;
      }
    };

    return {
      name,
      email,
      password,
      passwordConfirmation,
      telp,
      loading,
      emailRules,
      register,
    };
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
