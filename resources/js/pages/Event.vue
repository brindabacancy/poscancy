<template>
  <div>
    <v-card>
      <v-card-title>Title:</v-card-title>
      <v-card-subtitle>{{ event.title }}</v-card-subtitle>
    </v-card>
    <v-card>
      <v-card-title>Description:</v-card-title>
      <v-card-subtitle>{{ event.description }}</v-card-subtitle>
    </v-card>
    <v-card>
      <v-card-title>Start Date:</v-card-title>
      <v-card-text>{{ event.start_date }}</v-card-text>
    </v-card>
    <v-card>
      <v-card-title>End Date:</v-card-title>
      <v-card-text>{{ event.end_date }}</v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Comment Status:</v-card-title>
      <v-card-text>Phone: {{ event.comment_status }}</v-card-text>
    </v-card>
    <router-link :to="`/events/${event.id}/edit`">
      <v-btn color="primary">Edit</v-btn>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      event: {},
    };
  },
  async created() {
    try {
      const response = await axios.get(`/api/events/${this.$route.params.id}`);
      this.event = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
