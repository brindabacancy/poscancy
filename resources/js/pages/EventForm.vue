<template>
  <div>
    <h2 v-if="isNewEvent">Add Event</h2>
    <h2 v-else>Edit Event</h2>
    <v-form @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="event.title" label="Title" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="event.start_date" label="Start Date"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="event.end_date" label="End Date"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea v-model="event.description" label="Description"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-switch v-model="event.comment_status" label="Comment Status"></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn type="submit" color="primary">{{ isNewEvent ? 'Add Event' : 'Update Event' }}</v-btn>
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
        event: {
            title: '',
            description: '',
            start_date: '',
            end_date: '',
            comment_status: false,
      },
    };
  },
  computed: {
    isNewEvent() {
      return !this.$route.path.includes('edit');
    },
  },
  async created() {
    if (!this.isNewEvent) {
      try {
        const response = await axios.get(`/api/events/${this.$route.params.id}`);
        this.event = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        if (this.isNewEvent) {
          await axios.post('/api/events', this.event);
        } else {
          await axios.put(`/api/events/${this.$route.params.id}`, this.event);
        }
        this.$router.push('/events');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
