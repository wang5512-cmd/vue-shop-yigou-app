import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { isLogin } from "../utils/tools";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },

    {
        path: "/detils",
        name: "Detils",
        component: () => import("../views/detils/Detils.vue"),
        children: [
            {
                path: "",
                name: "top",
                component: () => import("@/views/detils/top"),
            },
            {
                path: "",
                name: "card",
                component: () => import("@/views/detils/card"),
            },
        ],
    },
    {
        path: "/user",
        name: "User",
        component: () => import("../views/User.vue"),
        meta: {
            needLogin: true,
        },
    },
    {
        path: "/car",
        name: "Car",
        component: () => import("../views/Car.vue"),
        meta: {
            needLogin: true,
        },
    },
    {
        path: "/fire",
        name: "Fire",
        redirect: "/fire/sort",
        component: () => import("../views/Fire.vue"),
        children: [
            {
                path: "sort",
                name: "Sort",
                component: () => import("../views/Sort.vue"),
            },
        ],
    },
    {
        path: "/reg",
        name: "Reg",
        component: () => import("../views/Reg.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/change",
        name: "Change",
        component: () => import("../views/Change.vue"),
    },
    {
        path: "/mm",
        name: "Mm",
        component: () => import("../views/Mm.vue"),
    },
    {
        path: "/usermenu",
        name: "Usermenu",
        component: () => import("../views/Usermenu.vue"),
    },
    {
        path: "/address",
        name: "Address",
        component: () => import("../views/Address.vue"),
    },
    {
        path: "/addaddress",
        name: "Addaddress",
        component: () => import("../views/Addaddress.vue"),
    },
    {
        path: "/success",
        name: "Success",
        component: () => import("@/views/detils/Success.vue"),
    },
    {
        path: "/history",
        name: "History",
        component: () => import("../views/History.vue")
    },
    {
        path: "/list",
        name: "List",
        component: () => import("../views/List.vue")
    },
    {
        path: "/submitorder",
        name: "Submitorder",
        component: () => import("../views/Submitorder.vue"),
        children: [
            {
                path: 'subadress',
                name: 'SubAdress',
                component: () => import("@/views/detils/SubAdress.vue"),
            },
            // {
            //     path: 'subproduct',
            //     name: 'SubProduct',
            //     component: () => import("@/views/detils/SubProduct.vue"),
            // },
        ]
    },
    {
        path: "/search",
        name: "Search",
        component: () => import("../views/Search.vue"),
    },
    {
        path: "/collect",
        name: "Collect",
        redirect: '/collect/colAcross',
        component: () => import("../views/Collect.vue"),
        children: [{
            path: 'colAcross',
            name: 'ColAcross',
            component: () => import("../views/ColAcross.vue"),
        }, {
            path: 'colCell',
            name: 'ColCell',
            component: () => import("../views/ColCell.vue"),
        }]
    },
    {
        path: "/search",
        name: "Search",
        component: () => import("../views/Search.vue"),
    },
    {
        path: "/message",
        name: "Message",
        component: () => import("../views/message/Message.vue"),
    },
];

const router = new VueRouter({
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.meta.needLogin) {
        if (isLogin()) {
            next();
        } else {
            next({
                name: "Login",
            });
        }
    } else {
        next();
    }
});
export default router;
