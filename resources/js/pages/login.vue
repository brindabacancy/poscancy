<script>
import { ref } from 'vue';
import { useTheme } from 'vuetify'
import logo from '@images/logo.svg?raw'
import { useRouter } from 'vue-router';
import axios from 'axios'

export default {
  name: 'Login',
  setup() {
    const vuetifyTheme = useTheme()
    const router = useRouter(); 
    
    const isPasswordVisible = ref(false)

    const email = ref('');
    const password = ref('');
    const message = ref('');

    const submitForm = async () => {
      const credentials = {
        email: email.value,
        password: password.value,
      };

      try {
        const response = await fetch('/api/login', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify(credentials),
                          });
        const data = await response.json();
        console.log("data",data);
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
        message.value = 'Success!'; 
      } catch (error) {
        console.error(error);
        message.value = 'An error occurred';
      }
    };

    return {
      email,
      password,
      message,
      submitForm,
      isPasswordVisible,
      logo
    };
  },
};
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Poscancy
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Welcome to Poscancy! 👋🏻
        </h5>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="submitForm">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="email"
                autofocus
                placeholder="test@email.com"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Login
              </VBtn>
            </VCol>

            
          </VRow>
        </VForm>
      </VCardText>

    </VCard>

   
  </div>
</template>

<!-- <script>
import axios from 'axios';
import { ref } from 'vue'; // Import ref from Vue 3

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const message = ref('');

    const submitForm = async () => {
      const credentials = {
        email: email.value,
        password: password.value,
      };

      try {
        const response = await fetch('/api/login'); 
        const data = await response.json();
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
        message.value = 'Success!'; 
      } catch (error) {
        console.error(error);
        message.value = 'An error occurred';
      }
    };

    return {
      email,
      password,
      message,
      submitForm,
    };
  },
};
</script> -->

<style lang="scss">
@use "@core-scss/pages/page-auth.scss";
</style>
