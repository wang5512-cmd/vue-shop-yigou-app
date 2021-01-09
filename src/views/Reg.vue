<template>
    <div class="reg">
        <div><img src="../assets/logo.png" alt="购" /></div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="用户名"
                placeholder="用户名"
                :rules="[{ required: true }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                placeholder="密码"
                :rules="[{ required: true }]"
            />
            <van-field
                v-model="repwd"
                type="password"
                name="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true }]"
            />
            <div style="margin: 20px 0">
                <van-button
                    round
                    block
                    color="linear-gradient(to right,#ff9000,#ff5000)"
                    native-type="submit"
                >
                    同意并注册
                </van-button>
            </div>
            <p class="reg-agreement">
                选择注册时表示您已阅读并同意以下协议
                <a href="#">购平台<br />服务协议</a>、
                <a href="#">隐私权政策</a>、
                <a href="#">法律声明</a>
            </p>
            <div class="login">
                <router-link :to="{ name: 'Login' }"
                    >已有账号？前往登录！</router-link
                >
            </div>
        </van-form>
    </div>
</template>

<script>
import { reg } from "../ser/user";
import { Notify } from "vant";
export default {
    data() {
        return {
            username: "",
            password: "",
            repwd: "",
        };
    },
    methods: {
        async onSubmit() {
            if (this.password == this.repwd) {
                let res = await reg({
                    userName: this.username,
                    password: this.password,
                });
                if (res.code == "success") {
                    this.username = "";
                    this.password = "";
                    this.$router.push({
                        name: "Login",
                    });
                } else {
                    Notify({
                        type: "danger",
                        message: res.message,
                    });
                }
            } else {
                Notify({
                    type: "warning",
                    message: "两次密码不一致",
                });
            }
        },
    },
};
</script>

<style scoped>
.reg {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    padding-top: 50px;
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background: white;
    z-index: 999;
}
.reg img {
    width: 100px;
    height: 100px;
}
.login a {
    float: right;
    font-size: 14px;
    line-height: 40px;
    color: #555;
}
.van-cell {
    border-bottom: 1px solid #ff5000;
    margin: 10px 0 0;
}
.reg-agreement {
    color: #999;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
}
.reg-agreement a {
    color: #ff5000;
    text-decoration: none;
}
</style>
