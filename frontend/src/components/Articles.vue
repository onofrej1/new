

<template>

<sidebar-layout>
    <template slot="content-header">
        Page
    </template>
    <template slot="content">
        <div v-for="article in articles" :key="article.id">
        <b-media>
            <b-img thumbnail slot="aside" blank blank-color="#ccc" :src="'./../assets/images/'+article.id+'.jpg'" width="120" alt="placeholder" />
            <h5 class="mt-0">{{ article.title }}</h5>
            <p>{{ article.content|striphtml|truncate(300) }}>
              <router-link :to="{name: 'article', params: {id: article.id}}">
                <b-button variant="default" :size="sm">Viac</b-button>
              </router-link>
            </p>
        </b-media>
        </div>
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
    name: 'Articles',
    components: {
        SidebarLayout,
    },
    computed: {
        ...mapState(["resourceData"]),
            articles: function() {
                return this.resourceData.article;
            }
    },
    created() {
        this.fetchResourceData("article");
    },
    methods: {
        ...mapActions(["fetchResourceData"]),
    }
};

</script>
