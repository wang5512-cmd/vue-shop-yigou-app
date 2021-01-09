<template>
    <div class="search">
        <div>
            <div class="search-top">
                <van-icon
                    name="arrow-left"
                    size="20"
                    color="#999"
                    @click="tolast"
                />
                <div class="searbox">
                    <van-search
                        v-model.trim="searchValue"
                        autofocus="true"
                        show-action
                        shape="round"
                        placeholder="请输入搜索关键词"
                        @search="onSearch"
                    >
                        <template #action>
                            <div>
                                <van-button
                                    round
                                    type="info"
                                    size="small"
                                    color="#f79131"
                                    @click="onSearch"
                                    >搜索</van-button
                                >
                            </div>
                        </template>
                    </van-search>
                </div>
            </div>
            <router-view class="search-content"> </router-view>
        </div>
        <div class="search_history">
            <div class="title_delete">
                <h4>搜索结果</h4>
                <div v-if="old_lists.length > 0">
                    <van-card
                        v-for="(item, i) in old_lists"
                        :key="item._id"
                        :price="item.price"
                        :desc="item.name"
                        :title="item.name"
                        :thumb="item.coverImg"
                        :origin-price="
                            Math.random() * i > 0.5 * i
                                ? parseInt(item.price * 1.2)
                                : ''
                        "
                        @click="todel(item)"
                    >
                        <template #tags v-if="Math.random() * i > 0.5 * i">
                            <van-tag plain type="danger">活动中</van-tag>
                            <van-tag plain type="danger">热卖</van-tag>
                        </template>
                    </van-card>
                    <van-loading v-show="isload" />
                </div>
                <div
                    v-else
                    style="margin-top:80px;text-align: center;width:100%;color:#666"
                >
                    暂无搜索结果
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Vue from "vue";
import { getProductAll } from "../ser/pro";
import { Toast } from "vant";

export default {
    name: "Search",
    data() {
        return {
            searchValue: "",
            isShow: true,
            s_lists: [],
            old_lists: [],
            isload: false,
        };
    },
    async created() {
        let a = await getProductAll();
        // console.log(a);
        this.s_lists = a.p;
    },
    methods: {
        tolast() {
            history.go(-1);
        },
        iconHide() {
            this.isShow = false;
        },
        onSearch() {
            this.isload = !this.isload;
            if (this.searchValue) {
                let time = Math.random() * 2000;
                Toast.loading({
                    duration: time,
                    message: "加载中...",
                    forbidClick: true,
                });

                setTimeout(() => {
                    this.old_lists = this.s_lists.filter(
                        (v) => v.name.indexOf(this.searchValue) > -1
                    );
                }, time);
            }
            this.isload = !this.isload;
        },
        todel(item) {
            this.$router.push({ name: "Detils", query: { id: item._id } });
        },
    },
};
</script>

<style>
.searbox {
    width: 80%;
    /* border: 1px solid red; */
}
.search {
    display: flex;
    flex-direction: column;
}
.search-top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
}
.van-cell {
    font-size: 16px;
}
.title_delete h4 {
    margin: 10px;
}
.search_history {
    flex: 1;
    overflow: auto;
}
.van-card__price span {
    color: red;
}
</style>
