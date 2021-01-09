<template>
    <div class="home">
        <div class="top">
            <van-icon name="scan" color="#fff" size="30" />
            <van-search
                placeholder="请输入搜索关键词"
                input-align="left"
                shape="round"
                background="#ff5000"
                right-icon="photo-o"
                @focus="toSearch"
            />
            <van-icon name="chat-o" color="#fff" size="30" />
        </div>

        <div class="prolist">
            <van-pull-refresh
                v-model="isLoading"
                success-text="刷新成功"
                @refresh="onRefresh"
            >
                <van-swipe
                    class="my-swipe"
                    :autoplay="3000"
                    indicator-color="white"
                >
                    <van-swipe-item v-for="item in banners" :key="item">
                        <img :src="item" alt="" />
                    </van-swipe-item>
                </van-swipe>
                <div class="show-list">
                    <van-grid :column-num="4" :border="false">
                        <van-grid-item
                            icon="new"
                            text="购新品"
                            color="#fc322c"
                        />
                        <van-grid-item icon="hot" text="今日爆款" />
                        <van-grid-item icon="bill" text="省钱月卡" />
                        <van-grid-item icon="shopping-cart" text="购超市" />
                        <van-grid-item icon="underway" text="限时秒杀" />
                        <van-grid-item icon="graphic" text="充值中心" />
                        <van-grid-item icon="award" text="购国际" />
                        <van-grid-item icon="youzan-shield" text="购吃货" />
                    </van-grid>
                </div>
                <van-notice-bar
                    scrollable
                    mode="closeable"
                    left-icon="volume-o"
                    text="双十一乐翻天,购物休闲两不误！ 每逢佳节倍拼命，我们都是为了亲！购回家，会更佳！"
                />
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    @load="loaddata"
                    class="ul"
                >
                    <li v-for="item in list" :key="item._id">
                        <router-link
                            :to="{ name: 'Detils', query: { id: item._id } }"
                            ><img :src="item.coverImg" alt="" />
                            <p class="pro-name">{{ item.name }}</p>
                            <div class="pro-footer">
                                <span class="pro-price">
                                    <i>￥</i>
                                    <span>{{ item.price }}</span>
                                </span>
                                <span class="pay-number"
                                    >{{
                                        Math.ceil(Math.random() * 1323)
                                    }}人付款</span
                                >
                            </div>
                        </router-link>
                    </li>
                </van-list>
                <router-view></router-view>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";
import { loadPro } from "../ser/pro";

export default {
    name: "Home",
    data() {
        return {
            list: [],
            banners: [
                "http://m.360buyimg.com/mobilecms/s700x280_jfs/t1/130125/40/13185/111043/5f92a2e2Ee7b1f55b/c194ec33a9be25b1.jpg!q70.jpg.dpg",
                "http://m.360buyimg.com/mobilecms/s700x280_jfs/t1/133689/40/7607/88452/5f3e6b21E697ee11d/c908920349d17a57.jpg!cr_1125x445_0_171!q70.jpg.dpg",
                "http://m.360buyimg.com/mobilecms/s700x280_jfs/t1/138236/20/11705/71121/5f90f33fE25338962/8241daa9ee86c798.jpg!q70.jpg.dpg",
                "http://imgcps.jd.com/ling4/10022467781048/54mb5LuU5b6I5b-Z/56m_5LiK54mb5LuUIOWllOi1tOWei-eUtw/p-5d91a4f642dd5b7c7d52cbcf/7572610d/cr/s1125x690/q70.jpg",
            ],
            page: 1,
            loading: false,
            finished: false,
            error: false,
            count: 0,
            isLoading: false,
        };
    },
    methods: {
        async loadList() {
            let pro = await loadPro(this.page);
            this.loading = false;
            this.list.push(...pro.products);
            // console.log(pro);
            if (this.page > pro.pages) {
                this.finished = true;
            }
        },
        loaddata() {
            this.loadList();
            this.page += 1;
            // console.log(this.page);
            // console.log(this.list);
        },
        onRefresh() {
            console.log(this.list);
            setTimeout(() => {
                Toast("刷新成功");
                this.isLoading = false;
                this.count++;
                this.page = 1;
                this.list = [];
                this.loadList();

                this.page = 2;
            }, 1000);
            setTimeout(() => {
                this.list.sort(() => Math.random() - 0.5);
            }, 1088);
        },
        toSearch() {
            this.$router.push({ name: "Search" });
        },
    },
};
</script>

<style scoped>
.van-pull-refresh {
    height: 100%;
    overflow: auto;
}
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
.prolist {
    height: 100%;
    flex: 1;
    overflow: auto;
}
.prolist img {
    width: 30%;
}
/* 轮播 */
.my-swipe .van-swipe-item {
    text-align: center;
}
.my-swipe .van-swipe-item img {
    width: 100%;
}
/* 商品 */
.ul {
    display: flex;
    flex-wrap: wrap;
    background: #f7f8fa;
    /*  自动换行 */
}
.ul li {
    width: calc(50% - 10px * 2);
    margin: 10px;
    background: white;
    border-radius: 10px;
}
.ul li a {
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #000;
}
.ul li img {
    width: 100%;
    border-radius: 10px;
}
.pro-name {
    font-size: 15px;
    margin: 10px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.pro-footer {
    padding: 10px;
}
.pro-price {
    color: red;
}
.pay-number {
    font-size: 14px;
    color: #999;
    padding: 0 10px;
}
.pro-price span {
    font-size: 22px;
}
.show-list >>> i {
    font-size: 32px;
}
/* 图标 */
.show-list >>> .van-grid-item:nth-child(1) {
    color: #f79131;
}
.show-list >>> .van-grid-item:nth-child(2) {
    color: #f7481c;
}
.show-list >>> .van-grid-item:nth-child(3) {
    color: #ff1100;
}
.show-list >>> .van-grid-item:nth-child(4) {
    color: #3ee41d;
}
.show-list >>> .van-grid-item:nth-child(5) {
    color: #f5e55b;
}
.show-list >>> .van-grid-item:nth-child(6) {
    color: #40b3fe;
}
.show-list >>> .van-grid-item:nth-child(7) {
    color: #d14967;
}
.show-list >>> .van-grid-item:nth-child(8) {
    color: #b720e9;
}
.show-list >>> span {
    font-size: 13px;
}
</style>
