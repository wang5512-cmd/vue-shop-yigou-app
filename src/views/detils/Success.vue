<template>
    <div class="suBigbox">
        <div class="successbox">
            <div id="sutop">
                <van-icon
                    name="arrow-left"
                    size="18"
                    color="white"
                    @click="comeBack"
                />

                <el-dropdown trigger="click" @command="handleCommand">
                    <van-icon name="ellipsis" size="18" color="white" />

                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="Home">首页</el-dropdown-item>
                        <el-dropdown-item command="Search"
                            >分类搜索</el-dropdown-item
                        >
                        <el-dropdown-item command="Car"
                            >购物车</el-dropdown-item
                        >
                        <el-dropdown-item command="User">我的</el-dropdown-item>
                        <el-dropdown-item command="History"
                            >浏览记录</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="success">
                <div style="padding:10px">
                    <van-icon name="checked" size="35" />
                    <span>支付成功</span>
                </div>
                <router-link :to="{ name: 'Home' }"
                    ><button>返回首页</button></router-link
                >
                <router-link :to="{ name: 'List', query: { id: '1' } }"
                    ><button>查看订单</button></router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import { loadPro } from "../../ser/pro";
export default {
    name: "Success",
    data() {
        return {
            list: [],
            show: false,
        };
    },
    methods: {
        handleCommand(command) {
            this.$router.push({ name: command });
        },
        comeBack() {
            this.$router.push({ name: "Car" });
        },
        async loadList() {
            let pro = await loadPro(this.page);
            this.loading = false;
            this.list.push(...pro.products);
            if (this.page > pro.pages) {
                this.finished = true;
            }
        },
        loaddata() {
            this.loadList();
            this.page += 1;
        },
    },
};
</script>

<style scoped>
.successbox {
    background: linear-gradient(to right, #fd9026, #ff5101);
    font-size: 20px;
    width: 100%;
    height: 250px;
}
.successbox >>> .van-hairline--bottom {
    background: rgba(0, 0, 0, 0);
}
.success {
    width: 100%;
    padding-top: 20px;
    height: 180px;
    color: white;
    text-align: center;
}
.success div {
    display: flex;
    /* background: chartreuse; */
    justify-content: center;
    align-items: center;
}
#sutop {
    /* width: 100%; */
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 14px;
}
.success button {
    font-size: 18px;
    border: 1px solid white;
    line-height: 36px;
    border-radius: 18px;
    width: 120px;
    margin: 10px;
    background: rgba(0, 0, 0, 0);
}
a {
    color: white;
}
.success div {
    font-weight: 700;
    font-size: 30px;
}
</style>
