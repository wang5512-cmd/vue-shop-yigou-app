<template>
    <div class="his">
        <van-nav-bar
            left-text="返回"
            title="足迹"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
        >
            <div>
                <ul>
                    <li v-for="item in result" :key="item._id">
                        <router-link
                            :to="{ name: 'Detils', query: { id: item._id } }"
                        >
                            <img :src="item.coverImg" alt=""
                        /></router-link>
                        <span class="histproname">{{ item.name }}</span>
                        <p>￥{{ item.price }}</p>
                    </li>
                </ul>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getUser } from "../ser/user";
import { Toast } from "vant";

export default {
    data() {
        return {
            historyList: [],
            mes: {},
            isLoading: false,
            result: [],
        };
    },
    watch: {
        $route(to) {
            // console.log(to);
            if (to.query) {
                this.get();
            }
        },
    },
    created() {
        this.get();
    },
    methods: {
        onClickLeft() {
            history.go(-1);
        },
        async get() {
            this.mes = await getUser();
            if (localStorage.getItem(this.mes.userName + "his")) {
                this.historyList = JSON.parse(
                    localStorage.getItem(this.mes.userName + "his")
                ).filter((v) => v.name != "");
                var obj = {};
                this.result = [];
                for (var i = 0; i < this.historyList.length; i++) {
                    if (!obj[this.historyList[i].name]) {
                        if (this.historyList[i].name) {
                            this.result.push(this.historyList[i]);
                            obj[this.historyList[i].name] = true;
                        }
                    }
                }
                console.log(this.result);
            }
        },
        onRefresh() {
            setTimeout(() => {
                Toast("刷新成功");
                this.isLoading = false;
                this.get();
            }, 1000);
        },
    },
};
</script>

<style scoped>
.his >>> .van-icon-arrow-left {
    color: #000;
}
.his >>> .van-nav-bar__text,
.his >>> .van-nav-bar__title {
    color: #000;
    font-size: 18px;
}
.his {
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
}
.van-pull-refresh {
    height: 100%;
    overflow: auto;
}
body,
html,
ul {
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
}
ul {
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    flex: 1;
    overflow: auto;
}

img {
    width: 100%;
    height: 115px;
}

li {
    list-style: none;
    width: 30%;
    margin: 10px 0 0;
    margin-left: 10px;
    background-color: white;
    height: 170px;
}
.histproname {
    display: block;
    width: 90%;
    margin: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
}
p {
    color: red;
    line-height: 35px;
    text-align: center;
    font-size: 12px;
}
</style>
