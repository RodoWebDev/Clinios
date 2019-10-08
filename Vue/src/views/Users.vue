<template>
<div>
  <h2>Users</h2><br>

  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="lastname"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title><!--Users--></v-toolbar-title>
        <!--<v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>-->
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.firstname" label="Firstname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lastname" label="Lastname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.comment" label="Comment"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select v-model="editedItem.status" :items="status" label="Status"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select v-model="editedItem.admin" :items="admin" label="Admin"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select v-model="editedItem.appointments" :items="admin" label="Appointments"></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn text icon color="blue lighten-1">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
      mdi-pencil
      </v-icon>
      </v-btn>
      <v-btn text icon color="red lighten-1">
      <v-icon
        small
        @click="deleteItem(item)"
      >
      mdi-delete
      </v-icon>
      </v-btn>
    </template>
    <!--
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
    -->
  </v-data-table>
  </div>
</template>

<script>
import {
    mdiAccount,
    mdiPencil,
    mdiShareVariant,
    mdiDelete,
  } from '@mdi/js'
import { required } from "vuelidate/lib/validators";
import Service from "../services/PostsService";
  export default {
    data: () => ({
      icons: {
        mdiAccount,
        mdiPencil,
        mdiShareVariant,
        mdiDelete,
      },
      dialog: false,
      headers: [
        {
          text: 'Firstname',
          align: 'left',
          sortable: false,
          value: 'firstname',
        },
        { text: 'Lastname', value: 'lastname' },
        { text: 'Email', value: 'email' },
        { text: 'Title', value: 'title' },
        { text: 'Phone', value: 'phone' },
        { text: 'Comment', value: 'comment' },
        { text: 'Status', value: 'status' },
        { text: 'Appointments', value: 'appointments' },
        { text: 'Schedule', value: 'schedule' },
        { text: 'Admin', value: 'admin' },
        { text: 'Created', value: 'created' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      status: [
        {text:"Active", value:"Active"},
        {text:"Inactive", value:"Inactive"}
      ],
      admin: [
        {text:"Yes", value:"Yes"},
        {text:"No", value:"No"}
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        firstname: '',
        lastname: '',
        email: '',
        title: '',
        phone: '',
        comment: '',
        status: '',
        admin: '',
        appointments: '',
      },
      defaultItem: {
        firstname: '',
        lastname: '',
        email: '',
        title: '',
        phone: '',
        comment: '',
        status: '',
        admin: '',
        appointments: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      initialize () {
        this.users = [];
      },
      getUsers() {
        console.log('getUsers...')
        Service.getUsers()
          .then((results) => {
            this.users = results.data;
          })
      },

      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        confirm('Are you sure you want to delete this item?') && this.users.splice(index, 1)
        const data = {
          editedItem: this.editedItem
        };
        Service.deleteUser(data)
          .then(() => {
            this.getUsers();
          })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        const data = {
          editedItem: this.editedItem
        };
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)          
          // console.log(data)
          Service.updateUser(data)
            .then(() => {
              this.getUsers();
              this.$emit('showAlert');
            })
        } else {
          this.users.push(this.editedItem)
          Service.insertUser(data)
            .then(() => {
              this.getUsers();
            })
        }
        this.close()
      },
    },
  }
</script>
