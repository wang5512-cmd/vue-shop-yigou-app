<template>
    <div id="bzd">
        <van-nav-bar left-text="设置" left-arrow @click-left="onClickLeft" />
        <div class="addaddress">
            <div class="addaddressbox">
                <van-address-edit
                    :area-list="areaList"
                    :show-postal="false"
                    :show-delete="this.$route.query.id ? true : false"
                    show-set-default
                    :address-info="addressInfo"
                    :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onSave"
                    @delete="onDelete"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "../assets/js/area";
import {
    addAddress,
    getOneaddress,
    delOneaddress,
    editOneaddress,
    getAddress,
} from "../ser/user";
export default {
    data() {
        return {
            areaList,
            searchResult: [],
            addressInfo: {
                name: "",
                tel: "",
                province: "",
                city: "",
                county: "",
                addressDetail: "",
                isDefault: "",
            },
        };
    },
    async created() {
        // console.log(this.areaList);
        console.log(this.$route);
        if (this.$route.query.id) {
            let a = await getOneaddress(this.$route.query.id);
            this.addressInfo.name = a.receiver;
            this.addressInfo.tel = a.mobile;
            this.addressInfo.province = a.regions.split("-")[0];
            this.addressInfo.city = a.regions.split("-")[1];
            this.addressInfo.county = a.regions.split("-")[2];
            this.addressInfo.areaCode = a.areaCode;
            this.addressInfo.addressDetail = a.address;
            this.addressInfo.isDefault = a.isDefault;
            console.log(this.addressInfo);
        } else {
            this.addressInfo = {};
        }
    },

    methods: {
        onClickLeft() {
            if (this.$route.query.n) {
                this.$router.push({
                    name: "Address",
                    query: { n: this.$route.query.n },
                });
            } else {
                this.$router.push({ name: "Address" });
            }
            this.$destroy();
        },
        async onSave(content) {
            // console.log(content);
            // console.log(content.isDefault);
            if (
                content.name &&
                content.tel &&
                content.province &&
                content.addressDetail
            ) {
                let params = {
                    receiver: content.name,
                    mobile: content.tel,
                    regions:
                        content.province +
                        "-" +
                        content.city +
                        "-" +
                        content.county,
                    address: content.addressDetail,
                    isDefault: content.isDefault,
                    areaCode: content.areaCode,
                };
                if (!this.$route.query.id) {
                    if (content.isDefault) {
                        let a = await getAddress({
                            per: 20,
                            page: 1,
                        });
                        let addresses = a.addresses;
                        let i = 0;
                        while (i < addresses.length) {
                            addresses[i].isDefault = false;
                            await editOneaddress(
                                addresses[i]._id,
                                addresses[i]
                            );
                            i++;
                        }
                    }
                    let a = await addAddress(params);
                    if (a.code == "success") {
                        Toast("保存成功");
                        this.$eventBus.$emit("getaddress");
                        setTimeout(() => {
                            if (this.$route.query.n) {
                                this.$router.push({
                                    name: "Address",
                                    query: { n: this.$route.query.n },
                                });
                            } else {
                                this.$router.push({ name: "Address" });
                            }
                        }, 1000);
                        this.$destroy();
                    } else {
                        Toast("保存失败");
                    }
                } else {
                    console.log(this.$route.query.id, params);
                    let a = await editOneaddress(this.$route.query.id, params);
                    if (content.isDefault) {
                        if (content.isDefault) {
                            let b = await getAddress({
                                per: 20,
                                page: 1,
                            });
                            console.log(b);
                            let addresses = b.addresses.filter(
                                (v) => v._id != this.$route.query.id
                            );
                            let i = 0;
                            while (i < addresses.length) {
                                addresses[i].isDefault = false;
                                await editOneaddress(
                                    addresses[i]._id,
                                    addresses[i]
                                );
                                i++;
                            }
                        }
                    }
                    if (a) {
                        Toast("修改成功");
                        this.$eventBus.$emit("getaddress");
                        setTimeout(() => {
                            this.$router.push({
                                name: "Address",
                                query: { n: this.$route.query.n },
                            });
                        }, 1000);
                        this.$destroy();
                    } else {
                        Toast("修改失败");
                    }
                }
            }
        },
        async onDelete() {
            if (this.$route.query.id) {
                let a = await delOneaddress(this.$route.query.id);
                if (a) {
                    Toast("删除成功");
                    this.$eventBus.$emit("getaddress");
                    setTimeout(() => {
                        if (this.$route.query.n) {
                            this.$router.push({
                                name: "Address",
                                query: { n: this.$route.query.n },
                            });
                        } else {
                            this.$router.push({ name: "Address" });
                        }
                    }, 1000);
                } else {
                    Toast("删除失败");
                }
            }
        },
    },
};
</script>

<style scoped>
.addaddressbox {
    width: 100%;
    /* border: 1px solid red; */
}
#bzd {
    display: flex;
    flex-direction: column;
}
#bzd >>> .van-icon-arrow-left {
    color: #000;
}
#bzd >>> .van-nav-bar__text {
    color: #000;
    font-size: 18px;
}
.addaddress >>> .van-address-edit {
    /* width: 100%; */
    /* border: 1px solid #000; */
    /* margin: auto; */
}
</style>
