<template>
  <div class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">
      <header class="main-header">
        <a href="/" class="logo">
          <span class="logo-mini">logo</span>
          <span class="logo-lg">BK Furca</span>
        </a>
        <nav class="navbar navbar-expand navbar-light navbar-custom">
        </nav>
      </header>
      <aside class="main-sidebar">
        <section class="sidebar">
          <ul class="sidebar-menu tree" data-widget="tree">
            <li class="header">Menu</li>
            <li v-for="modelName in modelNames">
                <router-link :to="'/crud/'+modelName"><icon name="list"></icon> {{ modelName }}</router-link>
            </li>
          </ul>
        </section>
      </aside>
      <div class="content-wrapper">
        <section class="content-header">
          <slot name="header"></slot>
        </section>
        <section class="content">
          <slot name="content"></slot>
        </section>
      </div>
      <footer class="main-footer">
        <div class="pull-right hidden-xs">
          <b>Version</b> 2.4.0
        </div>
        <strong>
            Copyright &copy; 2014-2016
            <a href="https://adminlte.io">Almsaeed Studio</a>.
        </strong> All rights reserved.
      </footer>
    </div>
  </div>
</template>
<script>
  import "./../../assets/adminlte/css/AdminLTE.css";
  import "./../../assets/adminlte/css/skins/_all-skins.css";
  import {
      mapState, mapActions, mapGetters
  }
  from "vuex";

  export default {
    name: 'layout',
    props: ['models'],
    data() {
      return {
      };
    },
    computed: {
      modelNames: function() {
        return  Object.keys(this.models);
      },
      ...mapState([])
    },
    methods: {
        ...mapActions([]),
    }
  };

</script>
<style>
 

</style>
