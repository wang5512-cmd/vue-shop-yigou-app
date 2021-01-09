<template>
    <div id="top">
        <van-nav-bar @click-left="onClickLeft">
            <template #left>
                <van-icon name="arrow-left" size="23" />
            </template>
            <template #title>
                <van-tabs v-model="active" @click="onClick">
                    <van-tab title="宝贝"></van-tab>
                    <van-tab title="评价"></van-tab>
                    <van-tab title="详情"></van-tab>
                    <van-tab title="推荐"></van-tab>
                </van-tabs>
            </template>
            <template #right>
                <i
                    class="el-icon-share"
                    style="font-size:23px;margin-right:10px"
                    @click="share"
                ></i>

                <van-icon name="more-o" size="23" />
            </template>
        </van-nav-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            proid: "",
        };
    },
    created() {
        this.$eventBus.$on("proid", (a) => {
            this.proid = a;
        });
    },
    methods: {
        onClickLeft() {
            history.go(-1);
        },
        share() {
            this.$eventBus.$emit("share");
        },
        onClick(name, title) {
            if (title == "详情") {
                this.$eventBus.$emit("maodian", "procontent");
            } else if (title == "宝贝") {
                this.$eventBus.$emit("maodian", "bb");
            }
        },
    },
};
</script>

<style lang="css" scoped src="@/assets/css/detils.css"></style>
<style scoped>
#top {
    height: 46px;
}
</style>
