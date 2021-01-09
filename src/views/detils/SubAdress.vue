<template>
    <div id="box">
        <router-link
            :to="{ name: 'Address', query: { n: this.$route.query.n } }"
        >
            <van-nav-bar>
                <template #left>
                    <van-icon name="location" size="28" />
                </template>

                <template #title>
                    <p>
                        <b>{{ username }}</b
                        ><i>{{ tel }}</i>
                    </p>
                    <span>{{ adress }}</span>
                </template>
                <template #right>
                    <van-icon name="arrow" size="18" />
                </template>
            </van-nav-bar>
        </router-link>
    </div>
</template>

<script>
import { getAddress } from "@/ser/user";
export default {
    data() {
        return {
            isShow: true,
            adress: "",
            username: "",
            tel: "",
        };
    },
    async created() {
        let a = await getAddress({
            per: 20,
            page: 1,
        });
        let b = a.addresses.filter((v) => v.isDefault == true);
        this.adress = b[0].regions + " " + b[0].address;
        this.username = b[0].receiver;
        this.tel = b[0].mobile;
        this.$eventBus.$emit("addres", b);
        // console.log(this.$route.query.n);
    },
    methods: {
        onClickRight() {
            this.$router.push({
                name: "Address",
                query: { n: this.$route.query.n },
            });
        },
    },
};
</script>

<style>
#box {
    margin-top: 75px;
}
#box .van-nav-bar {
    height: 130px;
    width: 95%;
    margin: 0 auto;
    background: white;
    border-radius: 10px;
}
#box .van-nav-bar__title {
    text-align: left;
}
#box .van-nav-bar__left {
    height: 50px;
    width: 30px;
    margin: auto 10px;
    background: #ff7500;
    border-radius: 50px;
    padding: 0 10px;
    text-align: center;
}
#box .van-nav-bar__left .van-icon {
    color: white;
}

#box .van-nav-bar__title b {
    font-size: 20px;
    font-weight: 500;
}
#box .van-nav-bar__title i {
    color: rgb(170, 169, 169);
    padding: 0 10px;
}
#box .van-nav-bar__title span {
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    display: block;
}
#top .van-nav-bar {
    background: rgb(241, 240, 240);
    height: 70px;
}
#top .van-nav-bar__left span {
    font-size: 20px;
    margin-left: 10px;
}
</style>
