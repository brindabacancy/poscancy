<template>
  <div>
    <h2 v-if="isNewUser">Add User</h2>
    <h2 v-else>Edit User</h2>
    <v-form @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="user.first_name" label="First Name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="user.last_name" label="Last Name" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="user.email" label="Email" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="user.mobile" type="number" label="Phone Number" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="user.password" label="Password" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea v-model="user.address" label="Address" required></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn type="submit" color="primary">{{ isNewUser ? 'Add User' : 'Update User' }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        user: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            mobile: null,
            address: null,
      },
    };
  },
  computed: {
    isNewUser() {
      return !this.$route.path.includes('edit');
    },
  },
  async created() {
    if (!this.isNewUser) {
      try {
        const response = await axios.get(`/api/users/${this.$route.params.id}`);
        this.user = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        if (this.isNewUser) {
          await axios.post('/api/users', this.user);
        } else {
          await axios.put(`/api/users/${this.$route.params.id}`, this.user);
        }
        this.$router.push('/users');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
