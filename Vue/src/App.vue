<template>
  <v-app>
    <div class="app">
      <div class="nav">
        <v-toolbar app dense color="blue darken-2">
        <v-toolbar-title style="width: 100px">CLINIOS</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <router-link to="/"><v-btn text>Home</v-btn></router-link>
        <router-link to="/patients"><v-btn text>Patients</v-btn></router-link>
        <router-link to="/users"><v-btn text>Users</v-btn></router-link>
        </v-toolbar>
      </div>
      <v-content>
        <v-container fluid>
        <v-alert type="success" v-if="type">
          Data saved.
        </v-alert>
        </v-container>
        <v-container class="fill-height" fluid>          
          <router-view 
            @showAlert='showAlertHandler'
          />
        </v-container>
      </v-content>
      <v-footer app>
        <small>&copy; Clinios</small>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    type: false
  }),
  methods: {
    showAlertHandler (message) {
      this.type = true;
      setTimeout(() =>{
        this.type = false;
      }, 1000)
    }
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: rgb(116, 114, 114);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: darkblue;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: lightblue;
  text-decoration: none;
}
</style>
