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
              <div class="q-row">
                <div class="q-col-xs-6">
                  <q-input filled v-model="name" label="Name" lazy-rules />
                </div>
                <div class="q-col-xs-6">
                  <q-input filled v-model="email" label="Email" lazy-rules />
                </div>
              </div>
              <div class="q-row">
                <div class="q-col-xs-6">
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
                </div>
                <div class="q-col-xs-6">
                  <q-input
                    filled
                    v-model="password_confirmation"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password Confirmation"
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
                </div>
              </div>
              <div class="q-row">
                <div class="q-col-xs-6">
                  <q-input
                    filled
                    v-model="company_code"
                    label="Company Code"
                    lazy-rules
                  />
                </div>
                <div class="q-col-xs-6">
                  <q-input
                    filled
                    v-model="company_name"
                    label="Company Name"
                    lazy-rules
                  />
                </div>
              </div>
              <div class="q-row">
                <div class="q-col-xs-6">
                  <q-input
                    filled
                    v-model="divisi_code"
                    label="Divisi Code"
                    lazy-rules
                  />
                </div>
                <div class="q-col-xs-6">
                  <q-input
                    filled
                    v-model="divisi_name"
                    label="Divisi Name"
                    lazy-rules
                  />
                </div>
              </div>
              <div class="q-row">
                <div class="q-col-xs-6">
                  <q-input
                    filled
                    v-model="departemen_code"
                    label="Departemen Code"
                    lazy-rules
                  />
                </div>
                <div class="q-col-xs-6">
                  <q-input
                    filled
                    v-model="departemen_name"
                    label="Departemen Name"
                    lazy-rules
                  />
                </div>
              </div>
              <div class="q-row">
                <div class="q-col-xs-6">
                  <q-input filled v-model="telp" label="Telp" lazy-rules />
                </div>
                <div class="q-col-xs-6">
                  <q-select
                    filled
                    v-model="selectedApprovalLevel"
                    :options="
                      approvalLevels.map((level) => ({
                        label: level.name,
                        value: level.id,
                      }))
                    "
                    label="Approval Level"
                  />
                </div>
              </div>
              <div class="text-red-9" v-if="errorMessage">
                {{ errorMessage }}
              </div>

              <div class="text-center">
                <q-btn
                  label="Register"
                  @click="register"
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
import { defineComponent, ref, onMounted } from "vue";
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
    const company_code = ref("");
    const company_name = ref("");
    const divisi_code = ref("");
    const divisi_name = ref("");
    const departemen_code = ref("");
    const departemen_name = ref("");
    const errorMessage = ref("");
    const showPassword = ref(false);
    const approvalLevels = ref([]);
    const selectedApprovalLevel = ref([]); // Ganti approval_level_id dengan selectedApprovalLevel
    const role_id = ref("66ccdadd-ad42-449a-ab2d-2b8a3217e4a1");
    const fetchApprovalLevels = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.244:8000/api/show/approvalLevel"
        );
        approvalLevels.value = response.data.approvalLevels;
      } catch (error) {
        console.error("Error fetching approval levels:", error);
      }
    };

    onMounted(() => {
      fetchApprovalLevels();
    });

    const register = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.244:8000/api/register",
          {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
            telp: telp.value,
            company_code: company_code.value,
            company_name: company_name.value,
            divisi_code: divisi_code.value,
            divisi_name: divisi_name.value,
            departemen_code: departemen_code.value,
            departemen_name: departemen_name.value,
            approval_level_id: selectedApprovalLevel.value.value,
            role_id: role_id.value,
          }
        );

        if (response.data.success) {
          // Display success swal
          Swal.fire({
            icon: "success",
            title: "Registration successful",
            text: "You have been registered successfully!",
          }).then(() => {
            // Redirect to / after swal is closed
            router.push("/");
          });
        } else {
          // Display error swal
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

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const goToLogin = () => {
      router.push("/");
    };

    return {
      name,
      email,
      password,
      password_confirmation,
      telp,
      company_code,
      company_name,
      divisi_code,
      divisi_name,
      departemen_code,
      departemen_name,
      role_id,
      selectedApprovalLevel, // Mengganti approval_level_id menjadi selectedApprovalLevel
      errorMessage,
      showPassword,
      approvalLevels,
      register,
      togglePassword,
      goToLogin,
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

/* Flexbox styling */
.q-row {
  display: flex;
  justify-content: space-between;
}
.q-col-xs-6 {
  flex: 0 0 48%; /* Adjust width as needed */
}
.custom-card {
  background-color: #f8f6f4; /* Ubah warna latar belakang sesuai kebutuhan */
}
</style>
