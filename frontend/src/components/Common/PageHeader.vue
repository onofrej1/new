

<template>

<div>
    <div>
      <img src="./../../assets/images/header.jpg" width="100%" />
    </div>
        <b-navbar type="dark" variant="black" align-h="center" toggleable>
          <b-container style="padding:0px">
            <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_dropdown_collapse">
                <b-navbar-nav>
                    <b-nav-item href="#">Home</b-nav-item>
                    <b-nav-item href="#">Link</b-nav-item>
                    <!-- Navbar dropdowns -->
                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text="User" right>
                        <b-dropdown-item href="#">Account</b-dropdown-item>
                        <b-dropdown-item href="#">Settings</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
          </b-container>
        </b-navbar>

</div>

</template>

<script>

export default {
    name: 'PageHeader',
};

</script>
