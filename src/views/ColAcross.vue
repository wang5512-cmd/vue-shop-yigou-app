<template>
  <div id="col">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <span v-if="collectList != ''">
        <li v-for="item in collectList[0]" :key="item._id">
          <van-swipe-cell>
            <router-link :to="{ name: 'Detils', query: { id: item._id } }">
              <van-card
                :price="item.price"
                desc="描述信息"
                :title="item.name"
                :thumb="item.coverImg"
              >
                <template #tags>
                  <van-tag plain type="danger">每200减25</van-tag>
                  <van-tag plain type="danger">跨店</van-tag>
                </template>
                <template #footer>
                  <van-button size="mini" round icon="like-o">推荐</van-button>
                  <van-button size="mini" round>找相似</van-button>
                </template>
              </van-card>
            </router-link>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="del(item._id)"
              />
            </template>
          </van-swipe-cell>
        </li>
      </span>
      <p
        v-else
        style="padding-top: 50px; width: 100%; text-align: center; color: #666"
      >
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
      collectList: [],
      isLoading: false,
      checked: true,
    };
  },
  async created() {
    this.mes = await getUser();
    let res = JSON.parse(localStorage.getItem(this.mes.userName));
    // console.log(res);
    this.collectList.push(res);
    // console.log(this.collectList);
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
    async del(id) {
      this.collectList[0] = this.collectList[0].filter((v) => v._id != id);
      localStorage.setItem(
        this.mes.userName,
        JSON.stringify(this.collectList[0])
      );
      this.mes = await getUser();
      let res = JSON.parse(localStorage.getItem(this.mes.userName));
      // console.log(res);
      this.collectList = [];
      this.collectList.push(res);
    },
  },
};
</script>

<style scoped>
/* list */
#col .van-card >>> .van-card__footer {
  display: flex;
  justify-content: flex-end;
}
#col .van-card__footer >>> .van-button__content {
  color: #999;
}
#col .van-card__price {
  color: #ff5000;
}
#col .van-card__price-currency {
  font-weight: 550;
  font-style: italic;
}
#col .van-image {
  border: 1px solid #ebebe7;
  border-radius: 10px;
}
/deep/.van-card__thumb {
  width: 120px;
}
.col {
  flex: 1;
  overflow: auto;
}
.van-pull-refresh {
  height: 100%;
  overflow: auto;
}
/* 删除按钮 */
.delete-button {
  height: 100%;
}
</style>
