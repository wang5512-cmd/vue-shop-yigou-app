<template>
    <div class="det">
        <top></top>
        <div class="detcard">
            <card></card>
            <div class="share">
                <van-share-sheet
                    v-model="showShare"
                    title="立即分享给好友"
                    :options="options"
                    @select="onSelect"
                />
            </div>
        </div>
    </div>
</template>

<script>
import top from "@/views/detils/top";
import card from "@/views/detils/card";
import { Toast } from "vant";
// import { serveUrl } from "../../utils/req";
import { Dialog } from "vant";
export default {
    name: "Detils",
    components: {
        top,
        card,
    },
    data() {
        return {
            showShare: false,
            options: [
                { name: "微信", icon: "wechat" },
                { name: "微博", icon: "weibo" },
                { name: "复制链接", icon: "link" },
                { name: "分享海报", icon: "poster" },
                { name: "二维码", icon: "qrcode" },
            ],
        };
    },
    async created() {
        this.$eventBus.$on("share", this.share);
    },
    methods: {
        onSelect(option) {
            if (option.name) {
                Dialog.confirm({
                    title: "分享链接",
                    message: location.href,
                })
                    .then(() => {
                        // on confirm
                        const input = document.createElement("input");
                        document.body.appendChild(input);
                        input.setAttribute("readonly", "readonly");
                        input.setAttribute("value", location.href);
                        input.select();
                        if (document.execCommand("copy")) {
                            document.execCommand("copy");
                            Toast("复制成功");
                        }
                        document.body.removeChild(input);
                    })
                    .catch(() => {
                        // on cancel
                    });
            }
            this.showShare = false;
        },
        share() {
            this.showShare = true;
        },
    },
};
</script>
<style scoped>
.det {
    display: flex;
    flex-direction: column;
}
.detcard {
    flex: 1;
    overflow: auto;
}
</style>
