<template>
    <div id="colCell">
        <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
        >
            <van-grid :border="false" :column-num="3" v-if="collectList != ''">
                <van-grid-item v-for="item in collectList[0]" :key="item._id">
                    <router-link
                        :to="{ name: 'Detils', query: { id: item._id } }"
                        ><van-image :src="item.coverImg"
                    /></router-link>
                </van-grid-item>
            </van-grid>
            <p v-else style="padding-top:50px;width:100%;text-align:center;color:#666">
                暂无收藏
            </p>
        </van-pull-refresh>
    </div>
</template>

<script>
import { Toast } from "vant";
import { getUser } from "../ser/user";
export default {
    data() {
        return {
            mes: {},
            isLoading: false,
            collectList: [],
        };
    },
    async created() {
        this.mes = await getUser();
        let res = JSON.parse(localStorage.getItem(this.mes.userName));
        console.log(res);
        this.collectList.push(res);
        console.log(this.collectList);
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                Toast("刷新成功");
                this.isLoading = false;
                let res = JSON.parse(localStorage.getItem(this.mes.userName));
                this.collectList = [];
                this.collectList.push(res);
            }, 1000);
        },
    },
};
</script>

<style scoped>
#colCell {
    height: 100%;
    overflow: auto;
}
#colCell .van-image {
    border-radius: 10px;
    border: 1px solid #ebebe7;
}
#colCell >>> .van-pull-refresh {
    height: 100%;
    overflow: auto;
}
</style>
