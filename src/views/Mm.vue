<template>
    <div class="mm">
        <van-nav-bar left-text="设置" left-arrow @click-left="onClickLeft" />
        <div class="maincon" v-if="this.$route.query.name == 'password'">
            <div class="topmm">
                <div class="changecon">
                    <label for="">旧密码</label>
                    <input
                        type="password"
                        v-model="old"
                        placeholder="请输入旧密码"
                    />
                    <label for="">新密码</label
                    ><input
                        type="password"
                        v-model="pwd"
                        placeholder="请输入密码"
                    />
                    <label for="">确认密码</label>
                    <input
                        type="password"
                        v-model="repwd"
                        placeholder="请再次输入密码"
                    />
                </div>
            </div>
            <div class="main">
                <div>
                    <van-button class="btn" round type="primary" @click="saveMm"
                        >保存修改</van-button
                    >
                    <van-button class="btn" round type="info" @click="back"
                        >取消修改</van-button
                    >
                </div>
            </div>
        </div>
        <div class="maincon" v-else>
            <div class="topmm">
                <div class="fu">
                    <label for="">支付密码</label>
                    <el-input
                        placeholder="请输入支付密码"
                        v-model="paypwd"
                        show-password
                        minlength="6"
                        maxlength="6"
                        show-word-limit
                    ></el-input>

                    <label for="">确认支付密码</label>
                    <el-input
                        placeholder="请确认支付密码"
                        v-model="repaypwd"
                        show-password
                        minlength="6"
                        maxlength="6"
                        show-word-limit
                    ></el-input>
                </div>
            </div>
            <div class="main">
                <div>
                    <van-button
                        class="btn"
                        round
                        type="primary"
                        @click="savePayMm"
                        >保存</van-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUser, updateUserPassword, updatePayPassword } from "../ser/user";
import { serveUrl } from "../utils/req";
import { Toast } from "vant";
import { Notify } from "vant";

export default {
    name: "User",
    data() {
        return {
            mes: {},
            fileList: [],
            old: "",
            pwd: "",
            repwd: "",
            paypwd: "",
            repaypwd: "",
        };
    },
    created() {
        this.get();
    },

    methods: {
        async get() {
            this.mes = await getUser();
            let img = serveUrl;
            let url = img + this.mes.avatar;
            if (this.mes.avatar) {
                this.fileList = [{ url }];
            }
            console.log(this.mes);
        },
        async saveMm() {
            if (this.old) {
                if (this.pwd === this.repwd) {
                    Toast.allowMultiple();
                    Toast.loading({
                        message: "保存中...",
                        forbidClick: true,
                    });
                    let a = await updateUserPassword({
                        oldPassword: this.old,
                        password: this.pwd,
                    });
                    console.log(a);
                    setTimeout(() => {
                        if (a.code == "success") {
                            Toast("保存成功");
                            setTimeout(() => {
                                this.$router.push({ name: "User" });
                            }, 500);
                        } else if (a.code == "error") {
                            Toast(a.message);
                        }
                    }, 2200);
                } else {
                    Notify({
                        type: "warning",
                        message: "请检查新密码",
                    });
                }
            } else {
                Notify({
                    type: "warning",
                    message: "请输入旧密码",
                });
            }
        },
        async savePayMm() {
            if (
                this.paypwd != "" &&
                this.paypwd == this.repaypwd &&
                this.paypwd.length == 6
            ) {
                let pay = await updatePayPassword({ payPassword: this.paypwd });
                console.log(pay);
                setTimeout(() => {
                    if (pay.code == "success") {
                        Toast("保存成功");
                        setTimeout(() => {
                            this.$router.push({ name: "User" });
                        }, 1000);
                    } else {
                        Toast("保存失败");
                    }
                }, 1000);
            } else {
                Notify({
                    type: "warning",
                    message: "请检查支付密码",
                });
            }
        },
        back() {
            this.$router.push({ name: "Change" });
        },
        onClickLeft() {
            history.go(-1);
        },
    },
};
</script>
<style scoped>
.mm {
    display: flex;
    flex-direction: column;
    background: #f2f2f2;
}
.mm >>> .van-icon-arrow-left {
    color: #000;
}
.mm >>> .van-nav-bar__text {
    color: #000;
    font-size: 18px;
}
.maincon {
    flex: 1;
    overflow: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.changecon,
.fu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: auto;
}
.changecon input {
    height: 35px;
    width: 120%;
    margin: 5px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 17px;
    text-align: center;
}
.changecon label,
.fu label {
    line-height: 45px;
}
.fu input {
    height: 35px;
    width: 120%;
    margin: 5px;
    font-size: 15px;
    border: 1px solid #ccc;
    text-align: center;
}
.btn {
    margin: 10px;
}
</style>
<style>
.tupian,
.van-uploader__wrapper,
.van-uploader__input,
.van-uploader__upload,
.van-uploader__preview-image,
.van-uploader__file,
.van-uploader__preview {
    width: 158px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
}
.van-uploader__preview-delete {
    top: 20px;
    right: 20px;
    border-radius: 50%;
    /* transform: rotate(180deg); */
}
.van-uploader__wrapper--disabled {
    opacity: 1;
}
</style>
