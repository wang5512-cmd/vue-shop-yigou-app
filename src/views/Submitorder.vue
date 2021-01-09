<template>
  <div class="subbox">
    <div id="top" @click="onClickLeft">
      <van-nav-bar>
        <template #left>
          <van-icon name="arrow-left" size="28" color="black" /><span
            >确认订单</span
          >
        </template>
      </van-nav-bar>
    </div>
    <div style="width: 100%">
      <subadress></subadress>
      <div id="subproduct">
        <div class="sbuprobox" v-for="item in prolist" :key="item.product._id">
          <van-card
            :num="item.product.quantity"
            :price="item.product.price"
            desc="发货时间：店铺预售，付款后15天内"
            :title="item.product.name"
            :thumb="item.product.coverImg"
          >
            <template #tags>
              <van-tag
                type="danger"
                color="rgb(248, 220, 224)"
                text-color="#f35336"
                >七天无理由退换</van-tag
              >
            </template>
          </van-card>
          <div class="step">
            <p>购买数量</p>
            <p>
              <button
                class="sub"
                @click="subCart(item)"
                v-show="item.quantity <= 1 ? false : true"
              >
                一
              </button>
              <button
                class="sub"
                style="background-color: rgb(240, 240, 240)"
                v-show="item.quantity <= 1 ? true : false"
              >
                一
              </button>
              <input type="number" v-model="item.quantity" class="count" />
              <button class="add" @click="addCart(item)">十</button>
            </p>
          </div>
          <div class="subproduct_list">
            <van-nav-bar>
              <template #left> <span>配送方式</span><i>普通配送</i> </template>
              <template #right>
                <span>快递 免邮</span>
                <van-icon name="arrow" size="16" color="#999" />
              </template>
            </van-nav-bar>
          </div>
          <div class="subproduct_list">
            <van-nav-bar>
              <template #left>
                <span><van-icon name="question-o" color="#999" />运费险</span
                ><i>卖家赠送，退换货可赔</i>
              </template>
              <template #right>
                <van-icon name="arrow" size="16" color="#999" />
              </template>
            </van-nav-bar>
          </div>
          <div class="subproduct_list">
            <van-nav-bar>
              <template #left> <span>开具发票</span></template>
              <template #right>
                <span>本次不开具发票</span>
                <van-icon name="arrow" size="16" color="#999" />
              </template>
            </van-nav-bar>
          </div>
          <div class="subproduct_list">
            <van-nav-bar>
              <template #left>
                <span>订单备注</span
                ><i
                  ><input type="text" placeholder="选填，请和商家协商一致"
                /></i>
              </template>
            </van-nav-bar>
          </div>
        </div>
        <!-- </van-pull-refresh> -->
        <van-submit-bar
          :price="pricecount * 100"
          button-text="提交订单"
          @submit="pay"
          class="subbottom"
        >
        </van-submit-bar>
        <transition name="van-slide-up">
          <div id="paymentcode" v-show="showPaymentCode">
            <van-password-input
              :value="password"
              info="密码为 6 位数字"
              :error-info="errorInfo"
              :focused="showKeyboard"
            />
            <van-number-keyboard
              v-model="password"
              :show="showKeyboard"
              @blur="hidden"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import subadress from "@/views/detils/SubAdress.vue";
// import subproduct from "@/views/detils/SubProduct.vue";
import { add } from "@/ser/cart";
import { subOrder } from "@/ser/orders";
import { getUser } from "@/ser/user";
import { getAddress } from "@/ser/user";
import { delCars } from "@/ser/cart";
import { Notify } from "vant";
// import { Toast } from "vant";

export default {
  name: "Submitorder",
  data() {
    return {
      prolist: [],
      value: 1,
      isShow: true,
      password: "",
      errorInfo: "",
      showKeyboard: true,
      showPaymentCode: false,
      mes: {},
      address_user: {},
      orderDetails: [],
    };
  },

  components: {
    subadress,
    // subproduct,
  },
  async created() {
    this.prolist = this.$route.query.n;
    // console.log(this.$route.query.n);
    // console.log(this.prolist);
    let i = 0;
    while (i < this.prolist.length) {
      this.orderDetails.push({
        quantity: this.prolist[i].quantity,
        product: this.prolist[i].product._id,
        price: this.prolist[i].product.price,
      });
      i++;
    }
    // console.log(this.orderDetails);
    this.mes = await getUser();
    console.log(this.mes);
    this.$eventBus.$on("addres", (b) => {
      // console.log(b[0]);
      this.address_user = b[0];
    });
  },
  watch: {
    async password(value) {
      // console.log(this.mes);
      if (value.length == 6) {
        this.errorInfo = "正在支付...";
        let a = await subOrder({
          receiver: this.address_user.receiver,
          mobile: this.address_user.mobile,
          regions: this.address_user.regions,
          address: this.address_user.address,
          orderDetails: this.orderDetails,
          payPassword: value,
        });
        // console.log(a);

        if (!a) {
          this.errorInfo = "正在支付...";
        } else if (a.code == "success") {
          let arr = [];
          this.prolist.forEach((v) => arr.push(v._id));
          await delCars(arr);
          setTimeout(() => {
            this.errorInfo = "支付成功";
            this.$router.push({ name: "Success" });
          }, 2000);
        } else if (a.code == "0") {
          this.errorInfo = "支付密码错误";
        } else {
          this.errorInfo = "支付失败";
        }
      } else if (value.length != 6) {
        this.errorInfo = "支付密码需要六位";
      }
    },
  },
  computed: {
    pricecount() {
      return this.prolist.reduce(
        (pre, cur) => pre + cur.quantity * cur.product.price,
        0
      );
    },
  },
  methods: {
    onClickLeft() {
      history.go(-1);
    },
    async subCart(item) {
      await add(item.product._id, -1);
      item.quantity--;
    },
    async addCart(item) {
      await add(item.product._id, 1);
      item.quantity++;
    },
    async pay() {
      let a = await getAddress({
        per: 40,
        page: 1,
      });
      let b = a.addresses.filter((v) => v.isDefault == true);
      if (b.length > 0) {
        this.showPaymentCode = true;
      } else {
        Notify({
          type: "danger",
          message: "请选择收货地址",
        });
      }
    },
    hidden() {
      this.showPaymentCode = false;
      this.password = "";
    },
  },
};
</script>

<style scoped>
.subbox {
  background-color: rgb(241, 240, 240);
}
#top {
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
}
#top .van-nav-bar {
  background: white;
}
#subproduct .van-tag--danger {
  letter-spacing: 2px;
  font-size: 10px;
  transform: scale(0.9);
  padding: 1px 4px;
  color: rgb(248, 220, 224);
  margin: 6px 0;
}
#subproduct .sbuprobox {
  width: calc(95% - 20px);
  margin: 5px auto;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 5px;
  background: white;
}
#subproduct .van-card {
  background: white;
}
#subproduct .van-card__thumb {
  border: 1px solid rgb(233, 233, 233);
  border-radius: 10px;
  margin-right: 15px;
}
#subproduct .van-card__title {
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 15px;
}
#subproduct .step {
  width: 90%;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
}
#subproduct p:nth-of-type(1) {
  margin-left: 30px;
  font-weight: 500;
}
#subproduct .sub,
.add {
  padding: 0 5px;
  border: 0;
  color: #999;
  background: white;
  border: 1px solid rgb(240, 240, 240);
}
#subproduct .sub {
  border-radius: 5px 0 0 5px;
}
#subproduct .add {
  border-radius: 0 5px 5px 0;
}
#subproduct .count {
  width: 30px;
  text-align: center;
  border: 0;
  padding: 1px 0;
  border: 1px solid rgb(240, 240, 240);
}
#subproduct .subproduct_list {
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
}
#subproduct .subproduct_list .van-nav-bar__left span {
  margin-left: 30px;
  margin-right: 20px;
  font-weight: 500;
  font-size: 15px;
  min-width: 70px;
  text-align-last: left;
  display: flex;
  align-items: center;
}
#subproduct .subproduct_list .van-nav-bar__left i {
  color: #999;
  font-style: normal;
}
#subproduct .subproduct_list .van-nav-bar__left i input {
  border: 0;
  width: 100%;
}
#subproduct .subproduct_list .van-nav-bar__right .van-icon {
  margin-left: 10px;
}
#subproduct .subproduct_list .van-nav-bar__left .van-icon {
  margin-right: 2px;
}
.van-submit-bar {
  bottom: 0;
}
.subbotom {
  position: fixed;
}
</style>
<style>
#paymentcode {
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 48%;
  background: #f2f3f5;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 1px 1px 2px rgb(198, 198, 250);
}
#paymentcode .sbuprobox {
  height: 100%;
}
#paymentcode .van-password-input {
  width: 100%;
  margin: 10px auto;
}
#paymentcode .van-number-keyboard {
  width: 100%;
}
</style>
