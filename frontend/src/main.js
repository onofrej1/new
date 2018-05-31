import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import Icon from "vue-awesome/components/Icon";

import "vuetify/dist/vuetify.min.css";
import "vue-awesome/icons";

var VueTruncate = require("vue-truncate-filter");

Vue.filter("striphtml", function(value) {
    var div = document.createElement("div");
    div.innerHTML = value;
    var text = div.textContent || div.innerText || "";
    return text;
});

Vue.filter("capitalize", function(value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.use(VueTruncate);
Vue.component("icon", Icon);
Vue.use(Vuetify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    store,
    router,
    components: {
        App
    },
    template: "<App/>"
});