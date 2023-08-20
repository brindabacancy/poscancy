<template>
  <div>
    <router-link to="/events/create" class="nav-link btn btn-primary">Add Event</router-link>
    <v-container>
      <table class="table" width="100%">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Comment status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <td>{{ event.id }}</td>
            <td>{{ event.title }}</td>
            <td>{{ event.start_date }}</td>
            <td>{{ event.end_date }}</td>
            <td>{{ event.comment_status }}</td>
            <td>
              <v-row gap="3">
                <router-link :to="`/events/${event.id}`">
                  <v-btn color="primary">View</v-btn>
                </router-link>
                <router-link :to="`/events/${event.id}/edit`">
                  <v-btn color="primary">Edit</v-btn>
                </router-link>
                <v-btn @click="deleteEvent(event.id)" color="error">Delete</v-btn>
              </v-row>
            </td>
          </tr>
        </tbody>
      </table>
    </v-container>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
// import { VDataTable } from 'vuetify/labs/VDataTable'

export default {
  components: {
    // VDataTable,
  },
  setup() {
    const events  = ref([]);
    const headers = [
      { text: '#', value: 'id' },
      { text: 'Title', value: 'title' },
      { text: 'Start Date', value: 'start_date' },
      { text: 'End Date', value: 'end_date' },
      { text: 'Comment Status', value: 'comment_status' },
      { text: 'Actions', value: 'actions' },
    ];

    const deleteEvent = async (id) => {
      try {
        await axios.delete(`/api/events/${id}`);
        events.value = events.value.filter(event => event.id !== id);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      try {
        const response = await axios.get('/api/events');
        events.value = response.data;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      events,
      headers,
      deleteEvent
    };
  },
};
</script>
