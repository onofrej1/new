<template>
      <v-container fluid>
        <v-layout row>
          <v-flex v-if="activeForm" offset-md3 md6>
       
            <v-toolbar>
              <v-toolbar-title>{{ modelName }}</v-toolbar-title>
            </v-toolbar>


            <v-form v-model="valid">
              <template v-for="field in form">
                <v-text-field :key="field.name" v-if="field.type==='text'" v-model="model[field.name]" :rules="nameRules" :counter="10" label="Name"
                  required></v-text-field>
              </template>

              <v-btn color="primary" @click="submit">
                Save
              </v-btn>
              <v-btn @click="clear">Cancel</v-btn>
            </v-form>
          </v-flex>
          <v-flex v-if="!activeForm">

        <v-data-table d-block  :headers="table" :items="activeResourceData" hide-actions class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-right" :key="field.value" v-for="field in table">{{ props.item[field.value] }}</td>
            <td class="text-xs-right">
              <v-btn small color="primary" @click="editItem(props.item)">Edit</v-btn>
              <v-btn small color="error">Delete</v-btn>
            </td>
          </template>
        </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import axios from "axios";
import CrudModels from "./../CrudModels";
import Editor from "@tinymce/tinymce-vue";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "admin",
  data() {
    return {
      activeForm: false,
      models: CrudModels,
      table: [],
      form: [],
      model: {}
    };
  },
  components: {
    editor: Editor
  },
  computed: {
    ...mapState(["activeResource", "resourceData"]),
    activeResourceData: function() {
      return this.resourceData[this.activeResource];
    },
    resourceSettings: function() {
      return this.models[this.activeResource];
    }
  },
  watch: {
    $route(to, from) {
      let resource = this.$route.params.resource;
      this.activeForm = false;
      this.setActiveResource(resource);
      this.makeTable();
      this.fetchResourceData(resource);
    }
  },
  methods: {
    ...mapActions([
      "setActiveResource",
      "fetchResourceData",
      "saveResourceData"
    ]),
    getOptions: function(resourceName, field) {
      let resource = this.resourceData[resourceName];
      let options =
        resource &&
        resource.map(data => {
          return {
            value: data.id,
            text: data[field]
          };
        });
      return options;
    },
    createItem: function() {
      this.model = {};
      this.buildForm(null);
      this.activeForm = true;
    },
    editItem: function(item) {
      this.model = item;
      this.buildForm(item);
      this.activeForm = true;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.saveResourceData(this.model);
      this.fetchResourceData(this.resourceName);
      this.model = {};
      this.activeForm = false;
    },
    onReset() {
      this.activeForm = false;
    },
    makeTable() {
      this.table = [
        {
          text: "id",
          value: "id",
          aligh: "right"
        }
      ];
      for (let prop of this.resourceSettings.list) {
        this.table.push({
          text: prop.field,
          value: prop.field,
          align: "right"
        });
      }
    },
    buildForm(row) {
      this.form = [
        {
          name: "id",
          type: "hidden"
        }
      ];
      let field;

      for (let prop of this.resourceSettings.form) {
        let name = prop.name;
        if (row) {
          let value =
            row[name] instanceof Array ? row[name].map(v => v.id) : row[name];
          row[name] = value;
          console.log(value);
        }
        field = {
          ...prop
        };

        if (prop.type == "relation" || prop.type == "pivotRelation") {
          this.fetchResourceData(prop.resourceTable);
        }

        this.form.push(field);
      }
      //console.log(this.form);
    }
  }
};
</script>

<style>
</style>
