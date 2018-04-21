

<template>

<div>
    <div>
        <img src="./../../assets/images/header.jpg" width="100%" />
    </div>
    xxx
    <b-navbar type="dark" variant="black" toggleable>
        <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_dropdown_collapse">
            <b-navbar-nav>
                <b-nav-item href="#">Home</b-nav-item>
                <b-nav-item href="#">Link</b-nav-item>
                <!-- Navbar dropdowns -->
                <b-nav-item-dropdown text="User" right>
                    <b-dropdown-item href="#">Account</b-dropdown-item>
                    <b-dropdown-item href="#">Settings</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>

</div>

</template>

<script>

export default {
    name: 'PageHeader',
    created() {
        this.fetchResourceData("menuItem");
        console.log('created');
        this.getMenuItems();
    },
    computed: {
        ...mapState(["resourceData"]),
    },
    methods: {
        ...mapActions(["fetchResourceData"]),
        getMenuItems: function() {
            console.log('xxx');
            //let menuItems = resourceData.menuItem.filter(i => !i.parent_id);
            /*for (let i in menuItems) {
                let menuItem = menuItems[i];
                let items = data.filter(i => i.parent_id === menuItem.id)
                    .map(item => this.createMenuItem(item));
                //this.menuTree.push(this.createMenuItem(menuItem, items));
            }
            console.log(menuItems);*/
        }
    }
};

</script>
