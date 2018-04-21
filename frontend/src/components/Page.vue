<template>
<sidebar-layout>
  <template slot="content-header">
        Page
    </template>
  <template slot="content">
       <div v-html="page.body"></div>
    </template>
  <template slot="sidebar-header">
        Aktuality
    </template>
</sidebar-layout>
</template>

<script>
import {
  mapState,
  mapActions
}
from "vuex";
import SidebarLayout from './Common/SidebarLayout';

export default {
  name: 'Page',
  components: {
    SidebarLayout,
  },
  computed: {
    ...mapState(["resourceData"]),
    page: function() {
      if (!this.resourceData.page) {
        return {};
      }
      let id = this.$route.params.id;

      return this.resourceData.page.find(page => page.id == id);
    }
  },
  created() {
    this.fetchResourceData("page");
  },
  methods: {
    ...mapActions(["fetchResourceData"]),
  }
};
</script>
