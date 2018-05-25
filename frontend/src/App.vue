<template>
  <admin-layout v-if="this.$route.meta.adminLayout" :models="models" >
    <template slot="content-header">

    </template>
    <template slot="content">
      <router-view></router-view>
    </template>
  </admin-layout>
  <div v-else>
    <page-header></page-header>
    <router-view></router-view>
    <page-footer></page-footer>
  </div>
</template>
<script>
import AdminLayout from "./components/Adminlte/Layout";
import CrudModels from "./CrudModels";
import PageHeader from "./components/Common/PageHeader";
import PageFooter from "./components/Common/PageFooter";

export default {
  name: "app",
  components: {
    AdminLayout,
    PageHeader,
    PageFooter
  },
  mounted: function() {},
  data() {
    return {
      models: CrudModels,
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>
<style>
.xxx table thead tr th {
  background-color: #3c8dbc !important;
}

.xxx table thead tr {
  height: 40px !important;
}

.table th,
.table td {
  vertical-align: middle;
}

ul.sidebar-menu li a {
  color: white !important;
  text-decoration: none;
}

li:hover {
  cursor: pointer;
}

.box-stripe {
  -moz-box-shadow: 3px 3px 5px 6px #ccc;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 3px 3px 5px 6px #ccc;
  padding: 30px;
  padding-top: 15px;
  margin-bottom: 30px;
}

.box-stripe-heading {
  color: #fff;
  background-color: #222;
  border-color: #4cae4c;
  font-weight: bold;
  font-size: 1.2em;
  height: 40px;
  margin: 0 -30px 20px -30px;
  padding: 10px 15px 35px 10px;
}

h1.box-heading {
  font-size: 18px;
}

.media-left {
  margin: 10px;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.adminBgColor {
  color: white;
  background-color: #3c8dbc;
}

.el-form--label-top .el-form-item__label {
  padding: 2px;
}

.el-form-item__label {
  margin-left: 2px;
  line-height: 20px;
}
</style>
