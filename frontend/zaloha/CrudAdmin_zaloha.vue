<template>
  <v-layout row>
      <v-flex xs12>
      <div class="box box-primary">
        <div class="box-header with-border crud-header">
          <h4>{{ activeResource|capitalize }} list

          </h4>
        </div>
        <div class="box-body">
          <div v-if="activeForm">
            <v-text-field
                      id="testing"
                      name="input-1"
                      label="Label Text"
                    ></v-text-field>
<!--
            <el-form ref="form" :model="model" label-position="top">
              <template v-for="field in form">
                <el-form-item :key="field.name" :label="field.label || field.name">
                  <el-input v-if="field.type==='text'" v-model="model[field.name]"></el-input>
                  <el-input type="textarea" :rows="5" v-if="field.type==='editor'" v-model="model[field.name]"></el-input>
                </el-form-item>
              </template>
            </el-form>
          -->
<!--
            <b-form @submit="onSubmit" @reset="onReset" v-if="activeForm">
              <template v-for="field in form">

                <b-form-group id="field.label" :label="field.type==='hidden' ? '' : field.label || field.name" label-for="field.name" :key="field.label">
                  <input type="hidden" v-if="field.type==='hidden'" v-model="model[field.name]" />

                  <b-form-input v-if="field.type==='text'" type="text" v-model="model[field.name]" required placeholder="Enter title">
                  </b-form-input>

                  <b-form-textarea v-if="field.type==='textarea'" id="body" v-model="model[field.name]" :rows="5" required>
                  </b-form-textarea>

                  <b-form-select v-if="field.type==='relation'" v-model="model[field.name]" :options="getOptions(field.resourceTable, field.show)"
                  />

                  <b-form-checkbox-group v-if="field.type==='pivotRelation'" v-model="model[field.name]">
                    <b-form-checkbox :value="option.value" :key="option.id" v-for="option in getOptions(field.resourceTable, field.show)">{{ option.text }}</b-form-checkbox>
                  </b-form-checkbox-group>

                </b-form-group>
              </template>
              <b-button type="reset" variant="danger" class="float-right">Reset</b-button>
              <b-button type="submit" variant="primary" class="float-right">Submit</b-button>

            </b-form>
-->
          </div>

          <!--<v-data-table :headers="table" :items="activeResourceData">
        <template slot="items" slot-scope="props">
          <td :key="field.value" v-for="field in table">{{ props.item[field.value] }}</td>
        </template>
      </v-data-table>-->
          <el-button type="warning">Warning</el-button>

          <el-table v-if="!activeForm" :data="activeResourceData" stripe style="width: 100%">
            <el-table-column sortable :key="field.value" v-for="field in table" :prop="field.value" :label="field.text">
            </el-table-column>
            <el-table-column label="Edit/Delete">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editItem(scope.row)">
                  <icon name="edit" scale="0.7"></icon> Edit
                </el-button>
                <el-button size="mini" type="danger">
                  <icon name="trash" scale="0.7"></icon> Delete
                </el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </div>
    </v-flex>
  </v-layout>
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
      model: {},
      headers: [
        {
          text: "Id",
          value: "id"
        },
        {
          text: "Title",
          value: "title"
        }
      ]
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
      //this.buildTable();
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
      console.log("edit", item);
      this.model = item;
      this.buildForm(item);
      this.activeForm = true;
    },
    onSubmit(evt) {
      evt.preventDefault();
      console.log(this.model.content);
      this.saveResourceData(this.model);
      //this.fetchResourceData(this.resourceName);
      this.model = {};
      this.activeForm = false;
    },
    onReset() {
      this.activeForm = false;
    },
    buildTable() {
      this.table = [];
      for (let prop of this.resourceSettings.list) {
        this.table.push(prop.field);
      }
      this.table.push("actions");
    },
    makeTable() {
      this.table = [];
      for (let prop of this.resourceSettings.list) {
        this.table.push({
          text: prop.field,
          value: prop.field
        });
      }
      //this.table.push("actions");
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
        }
        field = {
          ...prop
        };

        if (prop.type == "relation" || prop.type == "pivotRelation") {
          this.fetchResourceData(prop.resourceTable);
        }

        this.form.push(field);
      }
    }
  }
};
</script>
<style>
.crud-header {
  padding: 0 0 0 10px !important;
}
</style>
