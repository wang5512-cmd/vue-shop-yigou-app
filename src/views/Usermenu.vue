<template>
    <div class="menu">
        <van-nav-bar left-text="设置" left-arrow @click-left="onClickLeft" />
        <ul>
            <router-link
                class="li"
                :to="{ name: 'Change', query: { name: 'avatar' } }"
            >
                <span>头像</span>
                <van-icon name="arrow" color="#333" />
            </router-link>
            <router-link
                class="li"
                :to="{ name: 'Change', query: { name: 'username' } }"
            >
                <span>用户名</span>
                <van-icon name="arrow" color="#333" />
            </router-link>
            <router-link
                class="li"
                :to="{ name: 'Change', query: { name: 'nickname' } }"
            >
                <span>昵称</span>
                <van-icon name="arrow" color="#333" />
            </router-link>
            <router-link class="li" :to="{ name: 'Address' }">
                <span>收货地址</span>
                <van-icon name="arrow" color="#333" />
            </router-link>
            <router-link class="li" :to="{}">
                <span>忘记密码</span>
                <van-icon name="arrow" color="#333" />
            </router-link>
            <router-link
                class="li"
                :to="{ name: 'Mm', query: { name: 'password' } }"
            >
                <span>修改密码</span>
                <van-icon name="arrow" color="#333" />
            </router-link>
            <router-link
                class="li"
                :to="{ name: 'Mm', query: { name: 'payPassword' } }"
            >
                <span>重置支付密码</span>
                <van-icon name="arrow" color="#333" />
            </router-link>
        </ul>
        <el-button
            type="info"
            plain
            class="loginout"
            @click="loginOut"
            style="width:80%;margin:auto;margin-bottom:20px"
            >退出登录</el-button
        >
    </div>
</template>

<script>
export default {
    name: "Menu",
    methods: {
        onClickLeft() {
            this.$router.push({ name: "User" });
        },
        loginOut() {
            localStorage.setItem("token", "");
            this.$router.push({ name: "Login" });
        },
    },
};
</script>

<style scoped>
.menu {
    display: flex;
    flex-direction: column;
}
.menu >>> .van-icon-arrow-left {
    color: #000;
}
.menu >>> .van-nav-bar__text {
    color: #000;
    font-size: 18px;
}
.menu ul {
    margin: 20px;
    flex: 1;
}
.menu ul .li {
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
}
.menu ul .li span {
    color: #333;
}
</style>
