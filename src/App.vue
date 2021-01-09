<template>
    <div id="app">
        <keep-alive
            exclude="User,History,Car,card,Detils,Submitorder,List,Collect,ColCel,ColAcross,Search"
        >
            <router-view class="content"></router-view>
        </keep-alive>

        <div>
            <van-tabbar
                route
                v-model="active"
                border
                :fixed="false"
                active-color="#ff2d51"
            >
                <van-tabbar-item icon="home-o" :to="{ name: 'Home' }"
                    >首页</van-tabbar-item
                >
                <van-tabbar-item
                    icon="apps-o"
                    :to="{ name: 'Sort', query: { id: 0 } }"
                    >商品分类</van-tabbar-item
                >
                <van-tabbar-item icon="shopping-cart-o" :to="{ name: 'Car' }"
                    >购物车</van-tabbar-item
                >
                <van-tabbar-item icon="user-o" :to="{ name: 'User' }"
                    >我的</van-tabbar-item
                >
            </van-tabbar>
        </div>
    </div>
</template>

<script>
import { isLogin } from "./utils/tools";
import { getCar } from "../src/ser/cart";
import { status } from "../src/utils/req";
export default {
    data() {
        return {
            active: 0,
            num: 0,
        };
    },
    created() {
        if (isLogin()) {
            // console.log(isLogin());
            if (status == 200) {
                this.getNum();
            }
            this.$eventBus.$on("addnum", this.addnum);
        }
    },
    updated() {
        this.$eventBus.$on("navNum", (a) => {
            this.num = a;
            // console.log(a);
        });
        if (status == 200) {
            this.getNum();
        }
    },
    methods: {
        addnum() {
            this.num++;
        },
        async getNum() {
            let n = await getCar();
            this.num = n.reduce((pre, cur) => pre + cur.quantity, 0);
        },
    },
};
</script>
<style>
* {
    padding: 0;
    margin: 0;
}
body,
html,
#app {
    height: 100%;
    width: 100%;
}
li {
    list-style: none;
}
#app {
    display: flex;
    flex-direction: column;
}
.content {
    flex: 1;
    overflow: auto;
}
.van-list__finished-text,
.van-loading,
.van-list__loading,
.van-loading__text {
    display: block;
    width: 100%;
}
</style>
