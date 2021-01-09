<template>
    <!-- top -->
    <div id="collect-box">
        <div>
            <van-nav-bar
                style="background: #fafafa"
                title="我的收藏"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            >
                <template #left>
                    <van-icon name="arrow-left" size="18" color="#333" />
                </template>
                <template #right>
                    <el-dropdown
                        trigger="click"
                        @click="handleClick"
                        @command="handleCommand"
                    >
                        <span class="el-dropdown-link">
                            <van-icon name="ellipsis" size="20" color="#333" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="Home"
                                >首页</el-dropdown-item
                            >
                            <el-dropdown-item command="Car"
                                >购物车</el-dropdown-item
                            >
                            <el-dropdown-item command="User"
                                >我的</el-dropdown-item
                            >
                            <el-dropdown-item command="History"
                                >足迹</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </van-nav-bar>
            <div class="collect-header">
                <div class="header-left">
                    <p class="active">宝贝</p>
                    <p>微淘</p>
                    <p>内容</p>
                    <p>清单</p>
                </div>
                <van-icon name="search" size="20" />
            </div>

            <div class="collect-option">
                <div class="option-left">
                    <p class="active">全部</p>
                    <p>有优惠</p>
                    <p>已买过</p>
                </div>
                <div class="option-right">
                    <van-dropdown-menu>
                        <van-dropdown-item
                            title="筛选"
                            ref="item"
                            style="color: #999; font-size: 13px"
                        >
                            <van-cell center title="包邮">
                                <template #right-icon>
                                    <van-switch
                                        v-model="switch1"
                                        size="24"
                                        active-color="#ee0a24"
                                    />
                                </template>
                            </van-cell>
                            <van-cell center title="团购">
                                <template #right-icon>
                                    <van-switch
                                        v-model="switch2"
                                        size="24"
                                        active-color="#ee0a24"
                                    />
                                </template>
                            </van-cell>
                            <div style="padding: 5px 16px">
                                <van-button
                                    type="danger"
                                    block
                                    round
                                    @click="onConfirm"
                                >
                                    确认
                                </van-button>
                            </div>
                        </van-dropdown-item>
                    </van-dropdown-menu>
                    <div>
                        <router-link to="/collect/colAcross">
                            <van-icon
                                name="apps-o"
                                size="18"
                                v-show="!isIconShow"
                                @click="isIconShow = !isIconShow"
                            />
                        </router-link>

                        <router-link to="/collect/colCell"
                            ><van-icon
                                name="orders-o"
                                size="18"
                                v-show="isIconShow"
                                @click="isIconShow = !isIconShow"
                        /></router-link>
                    </div>
                    <p class="collManage" @click="isShow = !isShow">
                        {{ isShow ? "管理" : "完成" }}
                    </p>
                </div>
            </div>
        </div>

        <!-- list -->
        <router-view class="collect-content"> </router-view>
    </div>
</template>

<script>
import { getUser } from "../ser/user";
export default {
    name: "Collect",
    data() {
        return {
            mes: {},
            collectList: [],
            switch1: false,
            switch2: false,
            isIconShow: true,
            isShow: true,
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
        onClickLeft() {
            this.$router.push({ name: "User" });
        },
        onClickRight() {},
        handleCommand(command) {
            this.$router.push({ name: command });
        },
        handleClick() {
            alert("button click");
        },
        onConfirm() {
            this.$refs.item.toggle();
        },
    },
};
</script>

<style scoped>
#collect-box {
    background: #fff;
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 999;
    display: flex;
    flex-direction: column;
}
#collect-box .van-nav-bar >>> .van-nav-bar__title {
    font-weight: 550;
    letter-spacing: 2px;
    font-size: 18px;
}
/* collect-header */
#collect-box .collect-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    line-height: 3;
    padding: 0 20px;
    background: #fafafa;
}
#collect-box .header-left {
    display: flex;
    justify-content: space-between;
    width: 60%;
}
#collect-box .active {
    color: #ff5000;
}
/* collect-option */
#collect-box .collect-option {
    font-size: 13px;
    color: #999;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}
#collect-box .option-left {
    display: flex;
    justify-content: space-between;
    width: 40%;
}
#collect-box .option-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
}
.collect-content {
    flex: 1;
    overflow: auto;
}
/deep/.van-dropdown-menu__bar {
    box-shadow: 0 0 0;
}
/deep/ .van-dropdown-menu__title {
    font-size: 13px;
    color: #999;
}
</style>
