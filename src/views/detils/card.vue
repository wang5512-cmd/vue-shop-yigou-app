<template>
    <div class="box">
        <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
        >
            <van-card
                :num="pro.quantity"
                :price="pro.price"
                :origin-price="pro.price + Math.ceil(Math.random() * 132)"
                :title="pro.name"
            >
                <template #thumb>
                    <span id="bb">
                        <van-swipe :loop="false">
                            <van-swipe-item
                                ><img :src="pro.coverImg" style="width: 100%"
                            /></van-swipe-item>
                            <van-swipe-item
                                ><img :src="pro.coverImg" style="width: 100%"
                            /></van-swipe-item>
                            <van-swipe-item
                                ><img :src="pro.coverImg" style="width: 100%"
                            /></van-swipe-item>
                        </van-swipe>
                        <div class="timer">
                            <span>双十一促销</span>
                            <van-count-down
                                class="t"
                                millisecond
                                :time="time"
                                format="HH:mm:ss:SS"
                            />
                        </div>
                    </span>
                </template>
                <template #tags>
                    <van-tag plain type="danger">促销</van-tag>
                    <van-tag plain type="danger">热卖</van-tag>
                </template>
            </van-card>

            <div id="com">
                <!-- 优惠券单元格 -->
                <van-coupon-cell
                    :coupons="coupons"
                    :chosen-coupon="chosenCoupon"
                    @click="showList = true"
                />
                <!-- 优惠券列表 -->
                <van-popup
                    v-model="showList"
                    round
                    position="bottom"
                    style="height: 60%; padding-top: 4px"
                >
                    <van-coupon-list
                        :coupons="coupons"
                        :chosen-coupon="chosenCoupon"
                        @change="onChange"
                    />
                </van-popup>

                <van-nav-bar>
                    <template #left>
                        <b>保障</b
                        ><span
                            >店铺预售，付款后15天内发货<br />假一赔四 ·
                            退货运费险 · 极速退款</span
                        >
                    </template>
                    <template #right>
                        <van-icon name="arrow" size="14" />
                    </template>
                </van-nav-bar>
                <van-nav-bar>
                    <template #left>
                        <b>参数</b><span>生产日期 品牌...</span>
                    </template>
                    <template #right>
                        <van-icon name="arrow" size="14" />
                    </template>
                </van-nav-bar>
                <van-nav-bar>
                    <template #left> 宝贝评价(0) </template>
                    <template #right>
                        <span>查看全部</span><van-icon name="arrow" size="14" />
                    </template>
                </van-nav-bar>
                <van-nav-bar>
                    <template #left> 问大家(0) </template>
                    <template #right>
                        <span>查看全部</span><van-icon name="arrow" size="14" />
                    </template>
                </van-nav-bar>
            </div>
            <div v-html="pro.content" id="procontent"></div>
        </van-pull-refresh>

        <van-goods-action>
            <van-goods-action-icon
                icon="chat-o"
                text="客服"
                color="#07c160"
                :to="{ name: 'Message' }"
            />
            <van-goods-action-icon
                icon="cart-o"
                text="购物车"
                :to="{ name: 'Car' }"
            />
            <van-goods-action-icon
                icon="star"
                text="收藏"
                :color="isclick ? '#dc3023' : ''"
                @click="shoucang(pro)"
            />
            <van-goods-action-button
                type="warning"
                @click="show = !show"
                text="加入购物车"
            />
            <van-goods-action-button
                type="danger"
                text="立即购买"
                @click="show = !show"
            />
        </van-goods-action>
        <van-sku
            v-model="show"
            :sku="sku"
            :goods="goods"
            :goods-id="pro._id"
            :quota="quota"
            :hide-stock="sku.hide_stock"
            :custom-stepper-config="customStepperConfig"
            @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked"
        >
            <template #sku-header-price="props">
                <div class="van-sku__goods-name">
                    <span class="van-sku__name-symbol">{{ pro.name }}</span>
                </div>
                <div class="van-sku__goods-price">
                    <span class="van-sku__price-symbol">￥</span
                    ><span class="van-sku__price-num">{{ props.price }}</span>
                </div>
            </template>
        </van-sku>
    </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import { serveUrl } from "../../utils/req";
import { initSku } from "../../utils/tools";
import { getUser } from "@/ser/user.js";
import { add } from "../../ser/cart";
export default {
    data() {
        return {
            pro: {},
            show: false,
            sku: {},
            goods: {},
            isclick: false,
            showList: false,
            quota: 5, //限购数量
            quta_used: 0, //已买数量
            time: 100000000, //倒计时时间
            proCollect: [], //收藏的商品
            chosenCoupon: -1,
            customStepperConfig: {
                quotaText: "每次限购5件",
                handleOverLimit: (data) => {
                    const { action, quota } = data;
                    if (action === "minus") {
                        Toast("至少选择一件商品");
                    } else if (action === "plus") {
                        Toast(`单次限购${quota}件`);
                    } else {
                        Toast("仓库存货不够了");
                    }
                },
            },
            mes: {},
            isLoading: false,
        };
    },
    async created() {
        this.loadPro();
        this.coupons = this.$store.state.couponList;
        this.chosenCoupon = this.$store.state.defaultCoupon;
        if (localStorage.getItem("token")) {
            this.mes = await getUser();
        }
        if (localStorage.getItem(this.mes.userName)) {
            let res = JSON.parse(
                localStorage.getItem(this.mes.userName)
            ).filter((v) => v._id == this.pro._id);
            if (res.length > 0) {
                this.isclick = true;
            } else {
                this.isclick = false;
            }
        }
        if (localStorage.getItem(this.mes.userName + "his")) {
            let res_his = JSON.parse(
                localStorage.getItem(this.mes.userName + "his")
            );
            res_his.push(this.pro);
            localStorage.setItem(
                this.mes.userName + "his",
                JSON.stringify(res_his)
            );
        } else {
            let res_hist = [];
            res_hist.push(this.pro);
            localStorage.setItem(
                this.mes.userName + "his",
                JSON.stringify(res_hist)
            );
        }
        this.$eventBus.$on("maodian", (id) => {
            console.log(id);
            let miao = document.querySelector("#" + id);
            if (miao) {
                miao.scrollIntoView();
            }
        });
    },
    watch: {
        $route(to, from) {
            this.loadPro();
            console.log(to, from);
        },
    },
    mounted() {},
    methods: {
        async loadPro() {
            if (this.$route.query.id) {
                let p = await axios.get(
                    serveUrl + "/api/v1/products/" + this.$route.query.id
                );
                this.pro = p.data;
                this.goods = { picture: this.pro.coverImg };
                this.sku = initSku(this.pro);
                this.$eventBus.$emit("proid", this.pro._id);
            }
        },
        shoucang(pro) {
            this.isclick = !this.isclick;
            if (this.isclick) {
                if (localStorage.getItem(this.mes.userName)) {
                    this.proCollect = JSON.parse(
                        localStorage.getItem(this.mes.userName)
                    );
                    this.proCollect.push(pro);
                    localStorage.setItem(
                        this.mes.userName,
                        JSON.stringify(this.proCollect)
                    );
                } else {
                    this.proCollect.push(pro);
                    localStorage.setItem(
                        this.mes.userName,
                        JSON.stringify(this.proCollect)
                    );
                }

                Toast({
                    message: "收藏成功",
                    position: "bottom",
                });
            } else {
                var arr = JSON.parse(localStorage.getItem(this.mes.userName));
                arr = arr.filter((v) => v._id != pro._id);
                localStorage.setItem(this.mes.userName, JSON.stringify(arr));

                Toast({
                    message: "取消收藏成功",
                    position: "bottom",
                });
            }
        },
        onChange(index) {
            this.showList = false;
            this.chosenCoupon = index;
        },
        async onAddCartClicked(content) {
            console.log(content);
            let a = await add(this.$route.query.id, content.selectedNum);
            // console.log(a);
            this.show = !this.show;
            if (a.code == "success") {
                Toast({
                    message: "加入购物车成功",
                    position: "bottom",
                });
            } else {
                Toast({
                    message: "加入购物车失败",
                    position: "bottom",
                });
            }
        },
        onBuyClicked(content) {
            let n = [];
            this.pro.quantity = content.selectedNum;
            n.push({
                product: this.pro,
                quantity: this.pro.quantity,
                checked: true,
            });
            this.$router.push({
                name: "Submitorder",
                query: { n: n },
            });
        },
        onRefresh() {
            setTimeout(() => {
                Toast("刷新成功");
                this.isLoading = false;
                this.loadPro();
                // console.log(this.pro);
            }, 1000);
        },
    },
};
</script>

<style lang="css" scoped src="@/assets/css/detils.css"></style>
<style scoped>
/deep/ .van-coupon-list__list {
    height: auto !important;
}
.box {
    margin-top: -46px;
}
.van-pull-refresh {
    height: 100%;
    overflow: auto;
}
/deep/ .van-swipe__indicators {
    bottom: 42px;
}
/deep/ .van-swipe__indicator {
    background-color: gray;
    opacity: 0.5;
}
/deep/ .van-swipe__indicator--active {
    background-color: red;
}

#procontent >>> img {
    width: 100%;
}
</style>
