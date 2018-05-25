<template>
  <Row>
    <Col :span="activeForm ? 16 : 24" :push="activeForm ? 4 : 0">
    <div class="box box-primary">
      <div class="box-header with-border crud-headerx">
        <strong>{{ activeResource|capitalize }} list</strong>
        <Button  @click="createItem()">
          <Icon type="plus"></Icon>
          Add new
        </Button>
      </div>
      <div class="box-body">

        <div v-if="activeForm">
          <Form :model="model" label-position="top" v-if="activeForm">

            <template v-for="field in form" v-if="field.name != 'id'">
              <input type="hidden" :key="field.name" v-model="model.id" v-if="field.name == 'id'" />
              <FormItem :key="field.name" :label="field.label || field.name">

                <Input v-if="field.type==='text'" size="large" v-model="model[field.name]"></Input>
                <Input v-if="field.type==='textarea'" type="textarea" v-model="model[field.name]" :autosize="{minRows: 4,maxRows: 7}"></Input>
                <DatePicker type="datetime" v-if="field.type==='datepicker'" style="width:100%" format="yyyy-MM-dd HH:mm" v-model="model[field.name]"></DatePicker>
                <Select v-model="model[field.name]" v-if="field.type==='relation'">
                  <Option v-for="item in getOptions(field.resourceTable, field.show)" :value="item.value" :key="item.value">{{ item.text }}</Option>
                </Select>
                <textarea v-model="model[field.name]" class="editor" v-if="field.type==='editor'"></textarea>
                <CheckboxGroup v-if="field.type==='pivotRelation'" v-model="model[field.name]">
                  <Checkbox :key="item.label" v-for="item in getOptions(field.resourceTable, field.show)" :label="item.value" v-if="field.type==='pivotRelation'">
                    {{ item.text }}
                  </Checkbox>
                </CheckboxGroup>

              </FormItem>
            </template>
            <FormItem>
              <Button type="primary" size="large" @click="onSubmit(model)">
                <Icon type="ios-checkmark" size="16"></Icon> Save
              </Button>
              <Button type="secondary" size="large" @click="onReset()">
                <Icon type="ios-close-outline" size="16"></Icon> Cancel
              </Button>
            </FormItem>
          </Form>

        </div>

        <Table stripe :columns="table" :data="activeResourceData" v-if="!activeForm"></Table>

      </div>
    </div>
    </Col>
  </Row>
</template>

<script>
import axios from "axios";
import CrudModels from "./../CrudModels";

//import Editor from "@tinymce/tinymce-vue";

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
    //editor: Editor
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
      this.buildTable();
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

      ClassicEditor.create(document.querySelector(".editor"));
    },
    onSubmit(evt) {
      //evt.preventDefault();
      console.log(this.model.content);
      this.saveResourceData(this.model);
      this.fetchResourceData(this.resourceName);
      this.model = {};
      this.activeForm = false;
    },
    onReset() {
      this.activeForm = false;
    },

    buildTable() {
      let that = this;
      this.table = [];
      var actions = {
        title: "Name",
        key: "name",
        render: (h, params) => {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "secondary",
                  icon: "compose"
                },
                style: "margin-right: 5px",
                on: {
                  click: () => {
                    that.editItem(params.row);
                  }
                }
              },
              "Edit"
            ),
            h(
              "Button",
              {
                props: {
                  type: "error",
                  icon: "trash-b"
                },
                on: {
                  click: () => {
                    that.editItem(params.row);
                  }
                }
              },
              "Delete"
            )
          ]);
        }
      };

      for (let prop of this.resourceSettings.list) {
        let row = {
          title: prop.label || prop.field,
          key: prop.field
        };
        if (prop.render) {
          row.render = (h, params) => {
            return h("div", prop.render(params));
          };
        }
        if (prop.renderHtml) {
          row.render = prop.renderHtml;
        }
        this.table.push(row);
      }
      this.table.push(actions);
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
