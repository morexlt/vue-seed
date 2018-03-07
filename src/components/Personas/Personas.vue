<template>
  <v-container>
    <v-card>
      <v-card-title>
        Personas
        <v-spacer></v-spacer>
        <v-text-field
          color="error"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Nombre" v-model="editedItem.nombre"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Apellido" v-model="editedItem.apellido"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="personas"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.nombre }}</td>
          <td>{{ props.item.apellido }}</td>
          <td>
            <v-btn color="warning" @click="editItem(props.item)">Editar</v-btn>
            <v-btn color="error" @click="deleteItem(props.item)">Eliminar</v-btn>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
  </v-card>
  </v-container>
  
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        search: '',
        headers: [
          {
            text: 'Nombre',
            align: 'left',
            value: 'nombre',
          },
          {
            text: 'Apellido',
            value: 'apellido',
            align: 'left',
          },
          {
            text: 'Acciones',
            value: '',
            align: 'left',
          },
        ],
        items: [
        ],
        editedIndex: -1,
        editedItem: {
          nombre: '',
          apellido: '',
        },
        defaultItem: {
          nombre: '',
          apellido: '',
        },
      };
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
      },
      personas() {
        return this.$store.getters.loadedPersonas;
      },
    },

    watch: {
      dialog(val) {
        if (!val) {
          this.close();
        }
      },
    },

    created() {
      this.initialize();
    },

    methods: {
      initialize() {
        this.$store.dispatch('loadPersonas');
      },

      editItem(item) {
        this.editedIndex = this.items.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        const index = this.items.indexOf(item);
        if (confirm('Are you sure you want to delete this item?')) {
          this.items.splice(index, 1);
        }
      },

      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }, 300);
      },

      save() {
        console.log(this.editedItem);
        console.log(this.editedIndex);
        if (this.editedIndex > -1) {
          // console.log(this.editedItem);
          // this.$store.dispatch('createPersona', this.editedItem);
        } else {
          this.$store.dispatch('createPersona', this.editedItem);
        }
        this.close();
      },
    },


  };
</script>
