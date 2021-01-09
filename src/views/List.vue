<template>
    <div class="boxlist">
        <van-nav-bar
            left-text="返回"
            title="历史订单"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
        >
            <div class="hisorder">
                <van-tabs
                    v-model="active"
                    style="font-size:14px;height:100%; overflow: auto;"
                >
                    <van-tab title="全部">
                        <p
                            style="text-align:center;width:100%;margin-top:50px;color:#666"
                            v-show="orderLists.length > 0 ? false : true"
                        >
                            暂无订单
                        </p>
                        <ul id="ul">
                            <li v-for="item in orderLists" :key="item._id">
                                <van-card
                                    :num="item.quanity"
                                    style="width:95%;margin:5px auto;padding:5px"
                                    :price="item.product.price"
                                    :title="item.product.name"
                                    :thumb="item.product.coverImg"
                                >
                                    <template #tags>
                                        <van-tag plain type="danger"
                                            >标签</van-tag
                                        >
                                        <van-tag plain type="danger"
                                            >标签</van-tag
                                        >
                                    </template>
                                    <template #footer>
                                        <van-button
                                            size="mini"
                                            style="border:1px solid #666;color:#666;width:80px;height:28px;border-radius: 14px;text-align:center"
                                            @click="delorder(item)"
                                            >删除订单</van-button
                                        >
                                        <van-button
                                            size="mini"
                                            style="border:1px solid #666;color:#666;width:80px;height:28px;border-radius: 14px;text-align:center"
                                            >评价</van-button
                                        >
                                    </template>
                                </van-card>
                            </li>
                        </ul>
                    </van-tab>

                    <van-tab title="待付款">内容 2</van-tab>
                    <van-tab title="待发货">内容 3</van-tab>
                    <van-tab title="待收货">内容 4</van-tab>
                    <van-tab title="待评价">内容 4</van-tab>
                </van-tabs>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import { Toast } from "vant";
import { getOrders, delOrder, getOrderDetil } from "../ser/orders";
export default {
    data() {
        return {
            active: 0,
            orderList: [],
            orderLists: [],
            isLoading: false,
        };
    },
    watch: {
        $route(to) {
            // console.log(to);
            if (to.query) {
                this.get();
            }
        },
    },
    created() {
        this.get();
        // console.log(this.orderLists);
    },
    methods: {
        async get() {
            let a = await getOrders({ per: 100, page: 1 });
            // console.log(a);
            this.orderList = a.orders;
            // console.log(this.orderList);
            let i = 0;
            this.orderLists = [];
            while (i < this.orderList.length) {
                let o = await getOrderDetil(this.orderList[i]._id);
                this.orderLists.push(...o.details);
                // console.log(this.orderLists);
                i++;
            }
        },
        onClickLeft() {
            history.go(-1);
        },
        async delorder(item) {
            let d = await delOrder(item.order);
            // console.log(d);
            await getOrders({ per: 100, page: 1 });
            if (d) {
                this.get();
                Toast("删除成功");
            }
            // console.log(item)
        },
        onRefresh() {
            setTimeout(() => {
                Toast("刷新成功");
                this.isLoading = false;
                this.get();
            }, 1000);
        },
    },
};
</script>

<style scoped>
.van-pull-refresh {
    height: 100%;
    overflow: auto;
}
.hisorder >>> .van-tabs__content {
    height: 100%;
    overflow: auto;
}

.boxlist >>> .van-icon-arrow-left {
    color: #000;
}
.boxlist >>> .van-nav-bar__text,
.boxlist >>> .van-nav-bar__title {
    color: #000;
    font-size: 18px;
}
.boxlist >>> .van-multi-ellipsis--l2 {
    height: 23px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
body,
html {
    width: 100%;
    height: 100%;

    /* background-color: #eb8282; */
}
.van-card__title,
.van-card__desc,
.van-tag--plain,
.data-v-20863650 {
    display: block;
    font-size: 14px;
    margin-left: 15px;
    line-height: 20px;
}
.van-tag--plain {
    display: inline;
    font-size: 12px;
}
.boxlist {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.hisorder {
    flex: 1;
    overflow: auto;
}
</style>
