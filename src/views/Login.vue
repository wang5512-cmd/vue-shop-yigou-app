<template>
    <div class="login">
        <div class="logo"><img src="../assets/logo.png" alt="购" /></div>
        <van-form @submit="onSubmit">
            <!-- 密码登录 -->
            <div class="input-wrap" v-show="!isShow">
                <el-input
                    placeholder="请输入用户名"
                    v-model="username"
                    clearable
                    validate-event
                ></el-input>
            </div>
            <div class="input-wrap" v-show="!isShow">
                <el-input
                    placeholder="请输入登录密码"
                    v-model="password"
                    clearable
                    show-password
                    validate-event
                ></el-input>
            </div>
            <!-- 短信验证码登录 -->
            <div class="input-wrap" v-show="isShow">
                <el-input
                    placeholder="请输入手机号码"
                    v-model="username"
                    clearable
                    validate-event
                ></el-input>
            </div>
            <div class="input-wrap" v-show="isShow">
                <el-input
                    placeholder="请输入验证码"
                    v-model="password"
                    clearable
                    show-password
                    validate-event
                ></el-input>
            </div>
            <div style="margin: 16px 0 25px; overflow: hidden">
                <div class="sms">
                    <a @click="isShow = !isShow" v-show="!isShow"
                        >短信验证码登录</a
                    >
                </div>
                <div class="reg" v-show="!isShow">
                    <router-link :to="{ name: 'Reg' }">免费注册</router-link>
                </div>
                <div class="sms-Reg" v-show="isShow">
                    <router-link :to="{ name: 'Reg' }">免费注册</router-link>
                </div>
            </div>
            <div>
                <van-button
                    round
                    block
                    color="linear-gradient(to right,#ff9000,#ff5000)"
                >
                    登录
                </van-button>
            </div>
        </van-form>
        <van-button
            round
            block
            color="#ff5000"
            plain
            style="margin: 20px 0;width:239px"
            v-show="isShow" 
            @click="isShow = !isShow"
        >
            账户密码登录
        </van-button>
    </div>
</template>

<script>
import { login } from "../ser/user";
import { Notify } from "vant";
import { setToken } from "../utils/tools";
export default {
    data() {
        return {
            username: "",
            password: "",
            isShow: false,
        };
    },
    created() {},
    methods: {
        async onSubmit() {
            localStorage.setItem("token", "");
            let res = await login({
                userName: this.username,
                password: this.password,
            });
            if (res.code == "success") {
                // console.log(res.token);
                setToken(res.token);
                this.$router.push({
                    name: "User",
                });
                this.username = "";
                this.password = "";
            } else {
                console.log(res);
                Notify({
                    type: "danger",
                    message: res.message,
                });
            }
        },
    },
};
</script>

<style scoped>
.login {
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background: white;
    z-index: 999;
}
.login img {
    width: 80px;
    height: 80px;
}
.input-wrap {
    border-bottom: 1px solid #ff5000;
    margin: 20px 0 0;
}
/deep/ .el-input__inner {
    border: 0;
    border-radius: 0;
    font-size: 16px;
    color: #333;
}
.login a {
    font-size: 14px;
    color: #555;
}
.reg a {
    float: right;
}
.sms a {
    float: left;
}
.sms-Reg a {
    float: left;
}
</style>
