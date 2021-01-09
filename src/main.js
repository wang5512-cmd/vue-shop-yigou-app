import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vant from "vant";
import "vant/lib/index.css";
import { NavBar } from "vant";
import { Dialog } from "vant";
import { Area } from "vant";
import { Tab, Tabs } from "vant";
import { serveUrl } from "../src/utils/req";
import { SubmitBar } from "vant";
import { Card } from "vant";
import { Search } from "vant";
Vue.use(Search);
Vue.use(Card);
Vue.use(SubmitBar);

Vue.use(Vant);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Dialog);
Vue.use(Area);
Vue.use(NavBar);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false;

const $eventBus = new Vue();
Vue.prototype.$eventBus = $eventBus;

Vue.filter("dalImg", (str) => {
    if (str) {
        if (str.startsWith("http")) {
            return str;
        } else {
            return serveUrl + str;
        }
    } else {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIAeNy2BOTy9ROoPOYfWNMfqamfVeoUzGImA&usqp=CAU";
    }
});

const store = new Vuex.Store({
    state: {
        couponList: [
            {
                available: 1,
                condition: "满一百元优惠10元",
                reason: "",
                value: 1000,
                name: "商家满减",
                startAt: 1489104000,
                endAt: 1514592000,
                valueDesc: "100",
                unitDesc: "元",
                id: 1,
            },
            {
                available: 2,
                condition: "无使用门槛\n最多优惠30元",
                reason: "",
                value: 900,
                name: "双十一特惠",
                startAt: 1489104000,
                endAt: 1514592000,
                valueDesc: "30",
                unitDesc: "元",
                id: 2,
            },
        ],
        defaultCoupon: -1,
    },
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
