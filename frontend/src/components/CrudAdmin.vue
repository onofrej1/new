

<template>

<div class="box box-primary">
    <div class="box-header with-border"></div>
    <div class="box-body">
        <div v-if="activeForm">

            <b-form @submit="onSubmit" @reset="onReset" v-if="activeForm">
                <template v-for="field in form">

                    <b-form-group id="field.label" :label="field.label || field.name" label-for="field.name" :key="field.label">

                        <b-form-input id="title" v-if="field.type==='text'" type="text" v-model="model[field.name]" required placeholder="Enter title">
                        </b-form-input>

                        <b-form-textarea v-if="field.type==='textarea'" id="body" v-model="model[field.name]" :rows="5" required>
                        </b-form-textarea>

                        <b-form-select v-if="field.type==='relation'" v-model="model[field.name]" :options="getOptions(field.resourceTable, field.show)" />

                        <b-form-checkbox-group v-if="field.type==='pivotRelation'" v-model="model[field.name]">
                            <b-form-checkbox :value="option.value" :key="option.id" v-for="option in getOptions(field.resourceTable, field.show)">{{ option.text }}</b-form-checkbox>
                        </b-form-checkbox-group>

                    </b-form-group>
                    </b-form-group>
                </template>
                <b-button type="reset" variant="danger" class="float-right">Reset</b-button>
                <b-button type="submit" variant="primary" class="float-right">Submit</b-button>

            </b-form>

        </div>

        <b-table striped hover :items="activeResourceData" :fields="this.table" v-if="!activeForm">
            <template slot="actions" slot-scope="data">
                <b-button :size="'sm'" :variant="'primary'" @click="editItem(data.item)">
                    <icon name="edit"></icon> Edit
                </b-button>
                <b-button :size="'sm'" :variant="'danger'" @click="editItem(data.item)">
                    <icon name="trash"></icon> Delete
                </b-button>
            </template>

        </b-table>
    </div>
</div>

</template>

<script>

import axios from "axios";
import CrudModels from "./../CrudModels";
import {
    mapState, mapActions, mapGetters
}
from "vuex";

export default {
    name: "admin",
    data() {
        return {
            activeForm: false,
            models: CrudModels,
            table: [],
            form: [],
            model: {},
        };
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
    created() {
        this.setActiveResource("menuItem");
        this.buildTable();
        this.fetchResourceData("menuItem");
    },
    methods: {
        ...mapActions(["setActiveResource", "fetchResourceData", "saveResourceData"]),
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
            editItem: function(item) {
                this.model = item;
                this.buildForm(item);
                this.activeForm = true;
            },
            onSubmit(evt) {
                evt.preventDefault();
                console.log(this.model);
                this.saveResourceData(this.model);
            },
            onReset() {
              this.activeForm = false;
            },
            buildTable() {
              this.table = [];
              for (let prop of this.resourceSettings.list) {
                this.table.push(prop.field);
              }
              this.table.push('actions');
            },
            buildForm(row) {
                this.form = [{
                    name: "id",
                    type: "hidden"
                }];
                let field;

                for (let prop of this.resourceSettings.form) {
                    let name = prop.name;
                    let value =
                        row[name] instanceof Array ? row[name].map(v => v.id) : row[name];
                    row[name] = value;
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
