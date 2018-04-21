

<template>

<div>
    <div>
        <img src="./../../assets/images/header.jpg" width="100%" />
    </div>
    {{ menuTree }}
    <b-navbar type="dark" variant="black" align-h="center" toggleable>
        <b-container style="padding:0px">
            <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_dropdown_collapse">
                <b-navbar-nav>
                    <template v-for="item in menuTree">
                        <b-nav-item v-if="!item.items" :href="item.link ? item.link : item.externalLink">
                          {{ item.label }}
                        </b-nav-item>

                        <b-nav-item-dropdown v-if="item.items" :text="item.label" right>
                            <template v-for="subItem in item.items">
                                <b-dropdown-item href="#">
                                    <router-link v-if="subItem.link" class="nav-linkx" :to="subItem.link">{{ subItem.label }}</router-link>
                                    <b-nav-item :href="subItem.externalLink" v-if="subItem.externalLink">{{ subItem.label }}</b-nav-item>
                                </b-dropdown-item>
                            </template>
                        </b-nav-item-dropdown>
                    </template>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>

</div>

</template>

<script>

import {
    mapState, mapActions, mapGetters
}
from "vuex";

export default {
    name: 'PageHeader',
    data() {
        return {
            menuTree: [],
        }
    },
    created() {
        this.fetchResourceData("menuItem").then(data => {
          this.getMenuItems();
        });
    },
    computed: {
        ...mapState(["resourceData"])
    },
    methods: {
        ...mapActions(["fetchResourceData"]),
            getMenuItems: function() {
                let menuItems = this.resourceData.menuItem;
                let topMenuItems = menuItems.filter(i => !i.parent_id);
                for (let i in topMenuItems) {
                    let menuItem = topMenuItems[i];
                    let items = menuItems.filter(i => i.parent_id === menuItem.id)
                        .map(item => this.createMenuItem(item));
                    this.menuTree.push(this.createMenuItem(menuItem, items));
                }
            },
            createMenuItem: function(menuItem, subItems = []) {
                let item;
                item = {
                    label: menuItem.title,
                };
                if (subItems.length > 0) {
                    item.items = subItems;
                }
                if (menuItem.page_id) {
                    item.link = "/page/" + menuItem.page_id;
                } else if (menuItem.link) {
                    let isExternalLink = /^https?:\/\//.test(menuItem.link);
                    if (isExternalLink) {
                        item.externalLink = menuItem.link;
                    } else {
                        item.link = menuItem.link;
                    }
                }

                return item;
            }
    }
};

</script>
