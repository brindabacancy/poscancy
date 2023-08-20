<template>
  <div>
  <router-link to="/users/create" class="nav-link btn btn-primary">Add User</router-link>
    <!-- <v-data-table :headers="headers" :items="users" item-key="id">
      <template #item.actions="{ item }">
        <div class="row gap-3">
          <router-link :to="`/users/${item.id}`" class="col">
            <v-btn color="primary" class="white--text">View</v-btn>
          </router-link>
          <router-link :to="`/users/${item.id}/edit`" class="col">
            <v-btn color="success" class="white--text">Edit</v-btn>
          </router-link>
          <v-btn @click="deleteUser(item.id)" color="error" class="white--text">Delete</v-btn>
        </div>
      </template>
    </v-data-table> -->
    <v-container>
    <table class="table" width="100%">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.mobile }}</td>
          <td>
            <v-row gap="3">
              <router-link :to="`/users/${user.id}`">
                <v-btn color="primary">View</v-btn>
              </router-link>
              <router-link :to="`/users/${user.id}/edit`">
                <v-btn color="primary">Edit</v-btn>
              </router-link>
              <v-btn @click="deleteUser(user.id)" color="error">Delete</v-btn>
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
import { VDataTable } from 'vuetify/labs/VDataTable'

export default {
  components: {
    VDataTable,
  },
  setup() {
    const users = ref([]);
    const headers = [
      { text: '#', value: 'id' },
      { text: 'First Name', value: 'first_name' },
      { text: 'Last Name', value: 'last_name' },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'mobile' },
      { text: 'Actions', value: 'actions' },
    ];

    const deleteUser = async (id) => {
      try {
        await axios.delete(`/api/users/${id}`);
        users.value = users.value.filter(user => user.id !== id);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      try {
        const response = await axios.get('/api/users');
        users.value = response.data;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      users,
      headers,
      deleteUser
    };
  },
};
</script>
