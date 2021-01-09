<template>
    <div class="boxcar">
        <div>
            <!-- header -->
            <van-nav-bar
                title="购物车"
                color="#333"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            >
                <template #left>
                    <van-icon name="arrow-left" size="18" color="#333" />
                </template>

                <template #right>
                    <el-dropdown
                        trigger="click"
                        @click="handleClick"
                        @command="handleCommand"
                    >
                        <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon-more"></i>
                        </span>

                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="Home"
                                >首页</el-dropdown-item
                            >
                            <el-dropdown-item command="Search"
                                >分类搜索</el-dropdown-item
                            >
                            <el-dropdown-item command="Car"
                                >购物车</el-dropdown-item
                            >
                            <el-dropdown-item command="User"
                                >我的</el-dropdown-item
                            >
                            <el-dropdown-item command="History"
                                >浏览记录</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </van-nav-bar>

            <div class="address">
                <div id="address">
                    <i class="el-icon-location-information"></i>
                    <span>{{ adress }}</span>
                </div>

                <button class="editCart" @click="isShow = !isShow">
                    {{ isShow ? "编辑" : "完成" }}
                </button>
            </div>

            <!-- main -->
        </div>
        <div class="car">
            <van-swipe-cell
                class="li"
                v-for="item in carList"
                :key="item._id"
                v-show="carList.length > 0 ? true : false"
            >
                <div class="desc">
                    <div class="left">
                        <input
                            type="checkbox"
                            name=""
                            v-model="item.checked"
                            class="check"
                        />
                        <div class="img-wrap">
                            <router-link
                                :to="{
                                    name: 'Detils',
                                    query: { id: item.product._id },
                                }"
                                ><img :src="item.product.coverImg" alt=""
                            /></router-link>
                        </div>
                    </div>
                    <div class="right">
                        <router-link
                            :to="{
                                name: 'Detils',
                                query: { id: item.product._id },
                            }"
                            ><h3>{{ item.product.name }}</h3></router-link
                        >
                        <p>商品规格</p>
                        <br />
                        <span>￥</span><span>{{ item.product.price }}</span>
                        <div class="num">
                            <button
                                class="sub"
                                @click="subCart(item)"
                                v-show="item.quantity <= 1 ? false : true"
                            >
                                -
                            </button>
                            <button
                                class="sub"
                                style="opacity: 0; font-size: 22px; font-weight: 550"
                                v-show="item.quantity <= 1 ? true : false"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                v-model="item.quantity"
                                class="count"
                            />
                            <button class="add" @click="addCart(item)">
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <template #right>
                    <van-button
                        square
                        text="删除"
                        type="danger"
                        class="delete-button"
                        @click="delBtn(item._id)"
                    />
                </template>
            </van-swipe-cell>
            <van-empty
                :image="imgbj"
                description="购物车里还空空如也"
                v-show="carList.length > 0 ? false : true"
            />
        </div>

        <!-- </van-pull-refresh> -->
        <van-submit-bar
            :price="pricecount * 100"
            :class="isShow ? 'sub' : 'sub white'"
            :button-text="isShow ? '提交订单' : '删除'"
            @submit="delCarts"
            class="sub"
        >
            <label for="" v-show="carList.length > 0 ? true : false"
                ><input type="checkbox" v-model="checkAll" />全选</label
            >
        </van-submit-bar>
    </div>
</template>

<script>
import { delCar, getCar, add, delCars } from "../ser/cart";
// import { Toast } from "vant";
import { Notify } from "vant";
import { Dialog } from "vant";
import { getAddress } from "../ser/user";

export default {
    name: "Car",
    data() {
        return {
            isShow: true,
            carList: [],
            count: 0,
            isLoading: false,
            adress: "",
            imgbj: require("../assets/img/bj.png"),
            userid: "",
        };
    },
    async created() {
        this.carList = await getCar();
        let a = await getAddress({
            per: 20,
            page: 1,
        });
        let b = a.addresses.filter((v) => v.isDefault == true);
        this.adress = b[0].regions + " " + b[0].address;
        console.log(this.carList);
        // console.log(a);
        this.userid = b[0].user;
    },
    computed: {
        checkAll: {
            set(v) {
                this.carList.forEach((e) => {
                    e.checked = v;
                });
                // console.log(this.carList);
            },
            get() {
                return (
                    this.carList.length ==
                    this.carList.filter((v) => v.checked).length
                );
            },
        },
        pricecount() {
            return this.carList
                .filter((v) => v.checked)
                .reduce(
                    (pre, cur) => pre + cur.quantity * cur.product.price,
                    0
                );
        },
    },
    methods: {
        handleCommand(command) {
            this.$router.push({ name: command, query: { id: this.userid } });
        },
        handleClick() {
            alert("button click");
        },
        delBtn(v) {
            Dialog.confirm({
                title: (
                    <van-icon name="warning-o" size="60px" color="#ff2d51" />
                ),
                message: "确认删除此商品吗？",
            })
                .then(() => {
                    this.delbtn(v);
                })
                .catch(() => {});
        },

        async delbtn(id) {
            await delCar(id);
            Notify({
                type: "success",
                message: "删除成功",
            });

            let a = await getCar();
            this.carList = a;
            let n = a.reduce((pre, cur) => pre + cur.quantity, 0);
            // console.log(this.carList);
            this.$eventBus.$emit("navNum", n);
        },

        async delCarts() {
            if (!this.isShow) {
                Dialog.confirm({
                    title: (
                        <van-icon
                            name="warning-o"
                            size="60px"
                            color="#ff2d51"
                        />
                    ),
                    message: "确认删除已选择的商品吗？",
                })
                    .then(() => {
                        this.sc();
                    })
                    .catch(() => {});
            } else {
                let n = this.carList.filter((v) => v.checked);
                // console.log(n);
                if (n.length > 0) {
                    this.$router.push({
                        name: "Submitorder",
                        query: { n },
                    });
                }
            }
        },
        async sc() {
            let n = this.carList.filter((v) => v.checked);
            console.log(n);
            let arr = [];
            n.forEach((v) => arr.push(v._id));
            // console.log(arr);
            let s = await delCars(arr);
            console.log(s);
            this.carList = await getCar();
            this.isShow = !this.isShow;
        },

        // onRefresh() {
        //     setTimeout(() => {
        //         Toast("刷新成功");
        //         this.isLoading = false;
        //     }, 1000);
        // },

        async subCart(item) {
            await add(item.product._id, -1);
            let a = await getCar();
            this.carList = a;
            let n = a.reduce((pre, cur) => pre + cur.quantity, 0);
            this.$eventBus.$emit("navNum", n);
        },
        async addCart(item) {
            let b = await add(item.product._id, 1);
            console.log(b);
            this.carList = await getCar();

            let n = this.carList.reduce((pre, cur) => pre + cur.quantity, 0);
            // console.log(this.carList);
            this.$eventBus.$emit("navNum", n);
        },
        onClickLeft() {
            history.go(-1);
        },
        onClickRight() {},
    },
};
</script>
<style scoped>
#address {
    width: 240px;
    min-height: 50px;
    float: left;
    padding: 0 10px;
    border-bottom: 1px solid #ebedf0;
}
#address i {
    line-height: 50px;
}
.white >>> .van-submit-bar__text,
.white >>> .van-submit-bar__price {
    color: white;
}
#address span {
    display: inline-block;
    font-size: 14px;
}
.boxcar {
    display: flex;
    flex-direction: column;
}
.car {
    clear: both;
    flex: 1;
    overflow: auto;
}
.edit-btn {
    border: none;
    background: none;
    float: right;
    font-size: 14px;
    height: 50px;
    width: 80px;
}
.address {
    width: 100%;
    background: tomato;
}
.delete-button {
    height: 100%;
}
.car >>> img {
    width: 100%;
    height: 93%;
}
.li {
    margin: 10px;
}

.desc {
    width: 100%;
    min-height: 125px;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
}

.title {
    overflow: hidden;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.left {
    width: 150px;
}
.right {
    flex: 1;
    padding: 0 3px;
}
.right a {
    color: #333;
}
.desc h3 {
    font-weight: 500;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    margin: 0;
    -webkit-box-orient: vertical;
}

.desc p {
    font-size: 14px;
    line-height: 20px;
    margin: 5px 0;
    display: inline-block;
    background-color: #f2f2f2;
}

.main {
    height: 400px;
    position: relative;
    padding: 10px 0 1px;
    border-radius: 8px;
    background: #fff;
    color: #262626;
    margin-top: 0.6rem;
}

.title {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 0;
    margin-bottom: 10px;
    box-sizing: border-box;
    font-weight: 700;
    margin-right: 10px;
    width: 100%;
    color: #333;
}

.title span,
input {
    vertical-align: middle;
}

.check {
    position: absolute;
    top: 55px;
}

.img-wrap {
    position: absolute;
    left: 35px;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 2px solid red;
    box-shadow: 0 0.2rem 0.6rem 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.3rem;
}

.img-wrap img {
    width: 100px;
}

.desc span {
    color: red;
    line-height: 26px;
}

.desc span:nth-of-type(1) {
    font-size: 13px;
}

.desc span:nth-of-type(2) {
    font-weight: 600;
}

.num button {
    border: none;
    color: 333;
    background-color: rgba(0, 0, 0, 0);
    font-size: 16px;
    padding: 0;
    margin: 0 5px;
    font-weight: 600;
}

.num button:nth-of-type(1) {
    font-size: 22px;
    font-weight: 550;
}

.desc input {
    border: none;
    width: 30px;
    text-align: center;
    color: #262626;
    background-color: #f2f2f2;
}

.num {
    width: 100%;
    text-align: right;
}
</style>
<style>
.van-submit-bar {
    bottom: 50px;
}
.sub {
    position: static;
}
</style>
<style scoped>
.editCart {
    background: rgba(0, 0, 0, 0);
    font-size: 14px;
    color: #333;
    line-height: 50px;
    position: absolute;
    right: 15px;
    border: none;
}
</style>
