<template>
  <div>
    <h2>Patients</h2>
    <br />
    <v-form ref="form">
      <v-text-field
        v-model="patient.firstname"
        required
        label="First Name"
        outlined
        placeholder=" "
        autofocus
      ></v-text-field>
      <v-text-field v-model="patient.lastname" required label="Last Name" outlined placeholder=" "></v-text-field>
      <v-text-field v-model="patient.phone" required label="Phone" outlined placeholder=" "></v-text-field>
      <v-btn @click="reset">Reset</v-btn>&nbsp;
      <v-btn type="submit" @click="submit">Submit</v-btn>
    </v-form>
    <!--Result-->
    <br />
    <v-data-table :headers="headers" :items="patients" :items-per-page="5" class="elevation-1"></v-data-table>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import Service from "../services/PostsService";

export default {
  validations: {
    firstname: { required },
    lasname: { required },
    phone: { required }
  },
  data: function() {
    return {
      headers: [
        {
          text: "firstname",
          align: "left",
          sortable: false,
          value: "firstname"
        },
        { text: "lastname", value: "lastname" },
        { text: "phone", value: "phone" },
        { text: "city", value: "city" },
        { text: "state", value: "state" }
      ],
      patients: [
        {
          firstname: "",
          lastname: "",
          phone: "",
          city: "",
          state: ""
        }
      ],
      patient: {
        firstname: "",
        lastname: "",
        phone: "",
        city: "",
        state: ""
      }
    };
  },
  computed: {
    // getPatients() {
    //   return this.patients;
    // }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    submit(event) {
      event.preventDefault();
      const data = {
        patient: this.patient
      };

      Service.searchPatients(data).then(results =>{
        this.patients = results.data;
        // this.fetch();
      });
    },
    fetch() {
      Service.getPatients().then(results => {
        this.patients = results.data;
      });
    }
  }
};
</script>
