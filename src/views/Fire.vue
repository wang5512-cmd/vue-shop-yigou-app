<template>
    <div class="home">
        <div class="top">
            <van-icon name="scan" color="#fff" size="30" />
            <van-search
                placeholder="请输入搜索关键词"
                input-align="left"
                shape="round"
                background="#ff5000"
                @focus="toSearch"
                right-icon="photo-o"
            />
            <van-icon name="chat-o" color="#fff" size="30" />
        </div>
        <div class="content">
            <div class="fix-box">
                <van-sidebar v-model="activeKey">
                    <router-link :to="{ name: 'Sort', query: { id: '0' } }"
                        ><van-sidebar-item title="推荐分类"
                    /></router-link>
                    <router-link
                        :to="{ name: 'Sort', query: { id: item._id } }"
                        v-for="item in product_categories"
                        :key="item._id"
                    >
                        <van-sidebar-item :title="item.name"
                    /></router-link>
                    <van-sidebar-item title="电脑办公" class="sidebarcolor" />
                    <van-sidebar-item title="家电" class="sidebarcolor" />
                    <van-sidebar-item title="数码" class="sidebarcolor" />
                    <van-sidebar-item title="运动" class="sidebarcolor" />
                    <van-sidebar-item title="女装" class="sidebarcolor" />
                    <van-sidebar-item title="男装" class="sidebarcolor" />
                    <van-sidebar-item title="箱包" class="sidebarcolor" />
                    <van-sidebar-item title="美妆" class="sidebarcolor" />
                    <van-sidebar-item title="购超市" class="sidebarcolor" />
                    <van-sidebar-item title="奢侈品" class="sidebarcolor" />
                    <van-sidebar-item title="鞋靴" class="sidebarcolor" />
                    <van-sidebar-item title="个人清洁" class="sidebarcolor" />
                    <van-sidebar-item title="钟表珠宝" class="sidebarcolor" />
                </van-sidebar>
            </div>
            <div class="classify-content">
                <van-swipe
                    class="my-swipe"
                    :autoplay="3000"
                    indicator-color="white"
                >
                    <van-swipe-item v-for="item in banners" :key="item">
                        <img :src="item" alt="" v-lazy="item" />
                    </van-swipe-item>
                </van-swipe>
                <keep-alive exclude="Sort">
                    <router-view class="show-classify"> </router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { Sidebar, SidebarItem } from "vant";
import { Swipe, SwipeItem, Lazyload } from "vant";
import { getProduct_categories } from "../ser/pro";

Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);

export default {
    name: "Home",
    data() {
        return {
            activeKey: 0,
            banners: [
                "http://img13.360buyimg.com/pop/s1180x940_jfs/t1/140705/33/12882/71278/5f9d1fe3E14c9f04f/4e0ad07789adc734.jpg.webp",
                "http://img20.360buyimg.com/pop/s1180x940_jfs/t1/131905/14/13147/34796/5f8effa2E996ba3db/57b345fbdb215784.jpg.webp",
                "http://img10.360buyimg.com/pop/s1180x940_jfs/t1/153566/17/2033/45621/5f83f033E03817643/e88e13e1000ac60a.jpg.webp",
                "http://imgcps.jd.com/ling4/3290993/5a2m55Sf55So5oi35LiT5Lqr/6aKG5Yi4NDnlh48yMA/p-5bd8253082acdd181d02f9fa/aa1dadd2/cr/s/q.jpg",
            ],
            product_categories: [],
        };
    },
    async created() {
        let b = await getProduct_categories();
        console.log(b.a);
        this.product_categories = b.a;
    },
    methods: {
        toSearch() {
            this.$router.push({ name: "Search" });
        },
    },
};
</script>

<style>
.home {
    display: flex;
    flex-direction: column;
}
.top {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ff5000;
}
.content {
    background: #f7f8fa;
    display: flex;
}

.fix-box {
    width: 100px;
    height: 100%;
    overflow-y: scroll;
}
.van-sidebar {
    width: 100px;
}
.classify-content {
    flex: 1;
    overflow: auto;
    background: white;
    padding: 10px 0;
}

.my-swipe .van-swipe-item {
    text-align: center;
}
.my-swipe .van-swipe-item img {
    width: 100%;
    height: 150px;
    border-radius: 10px;
}
.show-list {
    margin-bottom: 10px;
    font-size: 14px;
}
h4 {
    font-size: 16px;
}
.sidebarcolor {
    color: #999;
}
</style>
