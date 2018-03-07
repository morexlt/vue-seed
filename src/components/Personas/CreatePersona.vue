<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Crear una Persona</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="nombre"
                label="Nombre"
                id="nombre"
                v-model="nombre"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="apellido"
                label="Apellido"
                id="apellido"
                v-model="apellido"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Create Meetup</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        nombre: '',
        apellido: '',
      };
    },
    computed: {
      formIsValid() {
        return this.nombre !== '' &&
          this.apellido !== '' &&
          this.imageUrl !== '' &&
          this.description !== '';
      },
    },
    methods: {
      onCreateMeetup() {
        if (!this.formIsValid) {
          return;
        }
        const meetupData = {
          nombre: this.nombre,
          apellido: this.apellido,
        };
        this.$store.dispatch('createPersona', meetupData);
        this.$router.push('/meetups');
      },
    },
  };
</script>
