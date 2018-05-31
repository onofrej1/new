<template>
  <el-row>
    <el-col :span="activeForm ? 16 : 24" :offset="activeForm ? 4 : 0">
      <div class="box box-primary">
        <div class="box-header with-border crud-header">
          <h3 class="box-title">{{ activeResource|capitalize }}
          </h3>
        </div>
        <div class="box-body">
          <div v-if="activeForm">
            <el-form ref="form" :model="model" label-position="right">
              <template v-for="field in form">
                <el-form-item :key="field.name">
                  <template slot="label">
                    <strong v-if="field.name != 'id'">{{ field.label || field.name }}</strong>
                  </template>
                  <el-input v-if="field.type==='text'" v-model="model[field.name]"></el-input>
                  <el-input type="textarea" :rows="5" v-if="field.type==='editor'" v-model="model[field.name]"></el-input>

                  <el-select class="block" v-if="field.type==='relation'" v-model="model[field.name]">
                    <el-option v-for="option in getOptions(field.resourceTable, field.show)" :key="option.value" :label="option.text" :value="option.value">
                    </el-option>
                  </el-select>

                  <el-checkbox-group v-if="field.type==='pivotRelation'" v-model="model[field.name]">
                    <el-checkbox :key="option.value" :label="option.value" v-for="option in getOptions(field.resourceTable, field.show)">
                      {{ option.text }}
                    </el-checkbox>
                  </el-checkbox-group>

                </el-form-item>
              </template>
              <div class="float-right">
                <el-button type="primary" icon="el-icon-success" @click="onSubmit">
                  Save
                </el-button>
                <el-button type="danger" icon="el-icon-error">Cancel</el-button>
              </div>
            </el-form>

          </div>

          <el-table v-if="!activeForm" :data="activeResourceData" stripe style="width: 100%">
            <el-table-column sortable :key="field.value" v-for="field in table" :prop="field.value" :label="field.text">
            </el-table-column>
            <el-table-column label="Edit/Delete">
              <template slot-scope="scope">
                <el-button size="mini" type="secondary" @click="editItem(scope.row)">
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
    </el-col>
  </el-row>
</template>

<script>
  import axios from "axios";
  import CrudModels from "./../CrudModels";
  import Editor from "@tinymce/tinymce-vue";

  import {
    mapState,
    mapActions,
    mapGetters
  } from "vuex";

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
      activeResourceData: function () {
        return this.resourceData[this.activeResource];
      },
      resourceSettings: function () {
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
      getOptions: function (resourceName, field) {
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
      createItem: function () {
        this.model = {};
        this.buildForm(null);
        this.activeForm = true;
      },
      editItem: function (item) {
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
        this.table = [];
        for (let prop of this.resourceSettings.list) {
          this.table.push({
            text: prop.field,
            value: prop.field
          });
        }
      },
      buildForm(row) {
        this.form = [{
          name: "id",
          type: "hidden"
        }];
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
  .crud-headerxx {
    padding: 0 0 0 10px !important;
    margin: 0px;
  }

</style>
