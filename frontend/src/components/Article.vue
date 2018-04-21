

<template>

<sidebar-layout>
    <template slot="content-header">
        Page
    </template>
    <template slot="content">
        <h3>{{ article.title }}</h3>
        <p>
          <p v-html="article.content">
        </p>
    </template>
    <template slot="sidebar-header">
        Aktuality
    </template>
</sidebar-layout>

</template>

<script>

import {
    mapState, mapActions
}
from "vuex";
import SidebarLayout from './Common/SidebarLayout';

export default {
    name: 'Article',
    components: {
        SidebarLayout,
    },
    computed: {
        ...mapState(["resourceData"]),
            article: function() {
                if (!this.resourceData.article) {
                   return {};
                }
                let id = this.$route.params.id;
                return this.resourceData.article.find(article => article.id == id);
            }
    },
    created() {
      this.resourceData.article || this.fetchResourceData("article");
    },
    methods: {
        ...mapActions(["fetchResourceData"]),
    }
};

</script>
