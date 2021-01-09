<template>
    <div class="address">
        <van-nav-bar left-text="设置" left-arrow @click-left="onClickLeft" />
        <div class="main">
            <div class="mainbody">
                <router-link
                    style="color:#333"
                    v-show="this.$route.query.n ? true : false"
                    :to="{
                        name: 'Submitorder',
                        query: { n: this.$route.query.n },
                    }"
                    >返回订单</router-link
                >
                <p
                    style="color:#666;margin-top:150px"
                    v-show="addressList.length > 0 ? false : true"
                >
                    暂无收货地址
                </p>
                <van-address-list
                    v-model="chosenAddressId"
                    :list="list"
                    default-tag-text="默认"
                    @edit="onEdit"
                    @add="onAdd"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { getAddress } from "../ser/user";

export default {
    data() {
        return {
            addressList: [],
            chosenAddressId: "0",
            list: [],
        };
    },
    created() {
        this.get();
        this.$eventBus.$on("getaddress", this.get);
        // console.log(this.$route)
    },

    methods: {
        onClickLeft() {
            if (this.$route.query.n) {
                this.$router.push({
                    name: "Usermenu",
                });
            } else {
                this.$router.push({ name: "Usermenu" });
            }
        },
        async get() {
            let a = await getAddress({
                per: 20,
                page: 1,
            });
            this.addressList = a.addresses;
            let i = 0;
            this.list = [];
            while (i < this.addressList.length) {
                this.list.push({
                    id: this.addressList[i]._id,
                    name: this.addressList[i].receiver,
                    tel: this.addressList[i].mobile,
                    address:
                        this.addressList[i].regions +
                        " " +
                        this.addressList[i].address,
                    isDefault: this.addressList[i].isDefault,
                });
                i++;
            }
            // console.log(this.list);
            this.list.sort(function(m, n) {
                return n["isDefault"] - m["isDefault"];
            });
        },
        onEdit(item) {
            // console.log(item);
            this.$eventBus.$emit("huixianaddress");
            this.$router.push({
                name: "Addaddress",
                query: { id: item.id, n: this.$route.query.n },
            });
        },
        onAdd() {
            this.$eventBus.$emit("addaddress");
            if (this.$route.query.n) {
                this.$router.push({
                    name: "Addaddress",
                    query: { n: this.$route.query.n },
                });
            } else {
                this.$router.push({ name: "Addaddress" });
            }
        },
    },
};
</script>

<style scoped>
.address {
    display: flex;
    flex-direction: column;
    background: #f2f2f2;
}
.address >>> .van-icon-arrow-left {
    color: #000;
}
.address >>> .van-nav-bar__text {
    color: #000;
    font-size: 18px;
}
.address >>> .van-radio__icon {
    display: none;
}
.address >>> .van-address-item__name {
    font-size: 21px;
}
.address >>> .van-address-list {
    width: 100%;
}
.address >>> .van-address-item {
    min-height: 55px;
}
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    overflow: auto;
    padding: 10px;
}
.mainbody {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
