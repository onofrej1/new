<template>
  <div class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">
      <header class="main-header">
        <a href="/" class="logo">
          <span class="logo-mini">logo</span>
          <span class="logo-lg"></span>
        </a>
        <nav class="navbar navbar-expand navbar-light navbar-custom">
        </nav>
      </header>
      <aside class="main-sidebar">
        <section class="sidebar">
          <ul class="sidebar-menu tree" data-widget="tree">
            <li class="header">Menu</li>
            <li class="" v-for="modelName in modelNames">
              <a href="">
                <icon name="list"></icon>
                <span>{{ modelName }}</span>
                </a>
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
     {{ modelNames }}
  </div>
</template>
<script>
  import "./../../assets/adminlte/css/AdminLTE.css";
  import "./../../assets/adminlte/css/skins/_all-skins.css";

  export default {
    name: 'layout',
    props: ['models'],
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        
      };
    },
    computed: {
      modelNames: function() {
        return  Object.keys(this.models);
      }
    }
  };

</script>
<style scoped>


</style>
