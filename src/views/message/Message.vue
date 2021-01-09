<template>
  <div id="message">
    <div class="mestop">
      <van-nav-bar>
        <template #title> 客服静静为您服务 </template>
        <template #left>
          <van-icon name="arrow-left" size="20px" color="black"></van-icon>
          <router-link :to="{ name: 'Home' }"><span>返回</span></router-link>
        </template>
      </van-nav-bar>
    </div>
    <div class="chatting">
      <div
        v-for="msg in mes"
        :key="msg.img"
        class="mesbox1"
        :class="msg.iswho == '商家' ? 'mesbox2' : 'mesbox1'"
      >
        <div class="msg" :class="msg.iswho == '商家' ? 'left' : 'right'">
          <div class="message" :class="msg.iswho == '商家' ? 'mesll' : 'mesrr'">
            {{ msg.l }}
          </div>
          <div :class="msg.iswho == '商家' ? 'll' : 'rr'">
            <img class="img" :src="msg.iswho == '商家' ? from1 : from2" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-dropdown-menu direction="up">
        <van-dropdown-item
          v-model="value1"
          :options="option1"
          @change="change(value1)"
        />
      </van-dropdown-menu>
      <van-field
        v-model="value"
        placeholder="请输入内容"
        input-align="left"
        autofocus="true"
        @keyup.enter="sendMsg"
      />
      <button @click="sendMsg()" class="send">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      from: "自己",
      from1: require("../../assets/img/2.jpg"),
      from2: require("../../assets/img/1.jpg"),
      mes: [
        {
          l: "亲，您好，有什么问题吗",
          img: this.from1,
          iswho: "商家",
        },
        {
          l: "请问多久可以发货",
          img: this.from2,
          iswho: "自己",
        },
      ],
      value1: 0,
      option1: [
        { text: "自己", value: 0 },
        { text: "商家", value: 1 },
      ],
    };
  },
  methods: {
    sendMsg() {
      if (this.value) {
        if (this.from == "自己") {
          this.mes.push({
            l: this.value,
            img: this.from2,
            iswho: "自己",
          });
        } else {
          this.mes.push({
            img: this.from1,
            l: this.value,
            iswho: "商家",
          });
        }

        this.value = "";
      }
    },
    change(v) {
      if (v == 0) {
        console.log(v);
        this.from = "自己";
      } else {
        this.from = "商家";
      }
    },
  },
};
</script>

<style scoped>
#message .ll {
  position: absolute;
  left: 0;
}
#message .rr {
  position: absolute;
  right: 0;
}
#message .mesll {
  margin-left: 50px;
}
#message .mesrr {
  margin-right: 50px;
}
#message .message {
  background: white;
  padding: 15px 10px;
  border-radius: 5px;
}
#message {
  background: url("../../assets/img/2.jpg") center/cover;
  display: flex;
  flex-direction: column;
}
#message .mestop {
  position: fixed;
  width: 100%;
  height: 80px;
}
#message .van-nav-bar {
  background-color: rgb(238, 236, 236);
}
#message .van-nav-bar__left span {
  color: #000;
  font-size: 18px;
  margin-left: 3px;
}

#message .chatting {
  margin-top: 45px;
  flex: 1;
  background: rgba(0, 128, 0, 0.253);
}

#message .bottom {
  height: 40px;
  background: rgba(0, 124, 128, 0.63);
  display: flex;
  justify-content: center;
  align-items: center;
}
#message .bottom .van-cell {
  flex: 1;
  height: 95%;
  line-height: 2.5;
  padding: 0 10px;
}
#message .bottom button {
  width: 15%;
  height: 95%;
  box-sizing: content-box;
  font-size: 18px;
  border: 0;
  border-left: 1px solid #ddd;
  background: white;
}
#message .left {
  justify-content: flex-start;
}
#message .right {
  justify-content: flex-end;
}
#message .mesbox1 {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

#message .mesbox2 {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

#message .msg {
  border-radius: 5px;
  height: 50px;
  padding: 10px 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  position: relative;
}

#message .img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
#message /deep/ .van-dropdown-menu__bar {
  width: 80px;
  height: 38px;
}
</style>