<template>
    <div class="change">
        <van-nav-bar left-text="设置" left-arrow @click-left="onClickLeft" />
        <div class="main">
            <div class="topchange">
                <div class="avatar" v-if="this.$route.query.name == 'avatar'">
                    <van-uploader
                        :after-read="afterRead"
                        v-model="fileList"
                        multiple
                        :max-count="1"
                        accept="image/*"
                        :deletable="true"
                        :preview-full-image="true"
                        class="tupian"
                        :max-size="3000 * 1024"
                        @oversize="onOversize"
                    />
                </div>
                <div
                    class="changecon"
                    v-else-if="this.$route.query.name == 'username'"
                >
                    <label for="">
                        <input
                            type="search"
                            v-model="mes.userName"
                            disabled
                            style="color:#999;text-align:center;border:0;width:100%;height:40px;font-size:25px"
                        />
                    </label>
                    <p style="color:#666">暂不支持修改用户名</p>
                </div>
                <div
                    class="changecon"
                    v-else-if="this.$route.query.name == 'nickname'"
                >
                    <label for="">昵称</label>
                    <input
                        type="search"
                        v-model="txt"
                        class="input"
                        placeholder="设置你的昵称"
                    />
                </div>
            </div>
            <div class="main" v-if="this.$route.query.name != 'username'">
                <div>
                    <van-button class="btn" round type="primary" @click="save"
                        >保存修改</van-button
                    >
                    <van-button class="btn" round type="info" @click="back"
                        >取消修改</van-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUser, uploadPic, updateUser } from "../ser/user";
import { serveUrl } from "../utils/req";
import { Toast } from "vant";

export default {
    name: "User",
    data() {
        return {
            mes: {},
            fileList: [],
            isShow: false,
            txt: "",
            avt: "",
        };
    },
    created() {
        this.get();
    },
    computed: {
        createTime() {
            return this.mes.createdAt.substring(0, 10);
        },
    },
    methods: {
        onClickLeft() {
            history.go(-1);
        },
        async get() {
            this.mes = await getUser();
            this.img = serveUrl;
            let url = this.img + this.mes.avatar;
            if (this.mes.avatar) {
                this.fileList = [{ url }];
            }
            this.txt = this.mes.nickName;
            this.avt = this.mes.avatar;
            // console.log(this.mes);
        },
        async afterRead(file) {
            file.status = "uploading";
            file.message = "上传中...";
            var formData = new FormData();
            formData.append("file", file.file);
            await uploadPic(formData).then((res) => {
                console.log(res.info);
                if (res.info) {
                    this.avt = res.info;
                    file.status = "succed";
                    file.message = "上传成功";
                } else {
                    file.status = "failed";
                    file.message = "上传失败";
                }
            });
        },
        onOversize(file) {
            console.log(file);
            Toast("文件大小不能超过 3M");
        },
        async save() {
            Toast.allowMultiple();
            Toast.loading({
                message: "保存中...",
                forbidClick: true,
            });
            console.log(this.avt);
            let a = await updateUser({ nickName: this.txt, avatar: this.avt });
            console.log(a);
            this.$eventBus.$emit("saved");
            setTimeout(() => {
                if (a.code=='success') {
                    Toast("保存成功");
                    setTimeout(() => {
                        this.$router.push({ name: "User" });
                    }, 500);
                } else {
                    Toast("保存失败");
                }
            }, 2200);
        },
        back() {
            history.go(-1);
        },
    },
};
</script>
<style scoped>
.change {
    display: flex;
    flex-direction: column;
    background: #f2f2f2;
}
.change >>> .van-icon-arrow-left {
    color: #000;
}
.change >>> .van-nav-bar__text {
    color: #000;
    font-size: 18px;
}
.main {
    flex: 1;
    overflow: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.avatar {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
    margin-top: 10px;
}
.changecon {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 50px auto 0;
}
.changecon input {
    height: 35px;
    width: 120%;
    margin: 15px 5px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 17px;
    text-align: center;
}
.changecon label {
    line-height: 45px;
}
.changecon label:first-child {
    justify-content: center;
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
