<template>
  <div>
    <v-card>
      <v-card-title>First Name:</v-card-title>
      <v-card-subtitle>{{ user.first_name }}</v-card-subtitle>
    </v-card>
    <v-card>
      <v-card-title>Last Name:</v-card-title>
      <v-card-subtitle>{{ user.last_name }}</v-card-subtitle>
    </v-card>
    <v-card>
      <v-card-title>Email:</v-card-title>
      <v-card-text>{{ user.email }}</v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Phone:</v-card-title>
      <v-card-text>Phone: {{ user.mobile }}</v-card-text>
    </v-card>
    <router-link :to="`/users/${user.id}/edit`">
      <v-btn color="primary">Edit</v-btn>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        user: {},
    };
  },
  async created() {
    try {
      const response = await axios.get(`/api/users/${this.$route.params.id}`);
      this.user = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
