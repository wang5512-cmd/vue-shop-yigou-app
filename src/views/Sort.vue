<template>
    <div>
        <div v-if="id == '0' || id == ''">
            <div class="show-list" style="margin-top: 10px">
                <h4>热门品牌</h4>
                <van-grid :border="false" :column-num="3" :gutter="10" center>
                    <van-grid-item>
                        <van-image
                            src="https://img30.360buyimg.com/popshop/jfs/t1/132808/6/8420/2045/5f486e43E8ff5f3a1/62b97e5188766c42.png"
                        />
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img30.360buyimg.com/popshop/jfs/t1/22465/2/10288/3283/5c860ac9E1bbb5da9/33ffbca794e7b965.jpg"
                        />
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img20.360buyimg.com/popshop/jfs/t1/116429/35/16248/2817/5f485fa4E326bdf8f/b7d19a346c4e45de.jpg"
                        />
                    </van-grid-item>

                    <van-grid-item>
                        <van-image
                            src="https://img30.360buyimg.com/popshop/jfs/t1/120134/3/14824/6275/5f83fb83Eb1876c57/49962d2ff873bdd0.png"
                        />
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img30.360buyimg.com/popshop/jfs/t1/137677/34/8124/2827/5f58a321E7ba86521/de7f4be688f1a831.jpg"
                        />
                    </van-grid-item>

                    <van-grid-item>
                        <van-image
                            src="https://img20.360buyimg.com/popshop/jfs/t1/14033/34/5735/3344/5c41d0f9Eb0710525/2e7c09aba0e52cc5.jpg"
                        />
                    </van-grid-item>

                    <van-grid-item>
                        <van-image
                            src="https://img20.360buyimg.com/popshop/jfs/t1/1035/26/11181/2858/5bce7321E51f2c59e/0c685f39d86436dd.jpg"
                        />
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img20.360buyimg.com/popshop/jfs/t2989/240/151377693/3895/30ad9044/574d36dbN262ef26d.jpg"
                        />
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img30.360buyimg.com/popshop/jfs/t1/1534/38/9873/3556/5bc93df2E73c40121/74dc92d16e483509.jpg"
                        />
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img30.360buyimg.com/popshop/jfs/t1/7730/1/1440/6292/5bce7447E8c0dc0cf/15668b30fabe0850.jpg"
                        />
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img20.360buyimg.com/popshop/jfs/t5734/66/8958452339/6938/b84b1828/59804402N1c4e5159.jpg"
                        />
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img30.360buyimg.com/popshop/jfs/t1/42555/24/11711/3073/5d53c164E7c86b7a5/db9725025cffb6c0.jpg"
                        />
                    </van-grid-item>

                    <van-grid-item>
                        <van-image
                            src="https://img20.360buyimg.com/popshop/jfs/t1/39319/25/14135/4558/5d53c0a2Ecd997022/0bd617ba98192ae2.jpg"
                        />
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img30.360buyimg.com/popshop/jfs/t1/39450/35/11890/1756/5d8b1ba9E5c839db8/735009863988f8b0.jpg"
                        />
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img20.360buyimg.com/popshop/jfs/t15940/280/518921/23466/40fc79d6/5a211ca7Nf8eb4275.jpg"
                        />
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="show-list">
                <h4>手机</h4>
                <van-grid :border="false" :column-num="3" :gutter="10" center>
                    <van-grid-item>
                        <van-image
                            src="https://m.360buyimg.com/babel/jfs/t1/98197/15/214/99252/5da97650Ef1b6b3a7/528cc8b3f9ade84b.jpg"
                        />
                        5G手机
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://m.360buyimg.com/babel/jfs/t1/77144/27/11322/75232/5d9081feEb7232528/a633fd1fe55b704b.jpg"
                        />
                        游戏手机
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://m.360buyimg.com/babel/jfs/t1/66991/40/8602/92821/5d6743d0Ed0eec544/f1b6954d52a2ff66.jpg"
                        />
                        长续航手机
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://m.360buyimg.com/babel/jfs/t1/40586/1/11155/200870/5d49255fEa7738b29/b3e5895230af9915.jpg"
                        />
                        全面屏手机
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://m.360buyimg.com/babel/jfs/t1/57784/26/5843/534057/5d39087fEb9cd66b7/d66c941633b410dd.jpg"
                        />
                        拍照手机
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img11.360buyimg.com/n7/jfs/t1/128970/3/10866/135531/5f45c4afE42831528/1e73b5a1bea40779.jpg"
                        />
                        老人手机
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="show-list">
                <h4>手机配件</h4>
                <van-grid :border="false" :column-num="3" :gutter="10" center>
                    <van-grid-item>
                        <van-image
                            src="https://m.360buyimg.com/babel/jfs/t1/60919/14/4930/119748/5d31967cE93031af5/606a103391ce5098.jpg"
                        />
                        充电器
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://m.360buyimg.com/babel/jfs/t1/11052/22/11375/113979/5c8876a8E0df1e82c/abf3dc36219153e3.jpg"
                        />
                        耳机
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://m.360buyimg.com/babel/jfs/t1/34364/37/9431/287142/5ccfe206E8868ec3f/698784aad3345c4b.jpg"
                        />
                        数据线
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://m.360buyimg.com/babel/jfs/t1/47429/38/5748/119548/5d350d75E1c3da006/a8388bf6a8535e03.jpg"
                        />
                        移动电源
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://m.360buyimg.com/babel/jfs/t1/52213/37/3063/122144/5d0e06b4Eefd218f1/4728f5bd76807cb5.jpg"
                        />
                        钢化膜
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://p3.ssl.qhimg.com/dr/400_400_80/t0150dacc22a2f82d56.webp"
                        />
                        手机支架
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://p0.ssl.qhimg.com/dr/400_400_80/t01b167e622effb8b09.webp"
                        />
                        蓝牙耳机
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://p4.ssl.qhimg.com/dr/400_400_80/t016134fc59bd1bdb2b.webp"
                        />
                        转接头
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img.alicdn.com/bao/uploaded/i2/3169616415/O1CN010ffQ4p1xG7Lbfxinq_!!3169616415.jpg"
                        />
                        手机壳
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="show-list">
                <h4>电脑配件</h4>
                <van-grid :border="false" :column-num="3" :gutter="10" center>
                    <van-grid-item>
                        <van-image
                            src="https://img13.360buyimg.com/n7/jfs/t1/111197/38/14696/285784/5f33a84cE9010f3b2/1d06d3d398883239.jpg"
                        />
                        拓展坞
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img10.360buyimg.com/n7/jfs/t1/92533/11/189/69180/5da862d3Ee30603ed/1a46189ad24c4604.jpg"
                        />
                        分线器
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img10.360buyimg.com/n2/jfs/t1/146135/25/12447/109523/5f9a8514E6ce1ea50/348500e503c48d84.jpg"
                        />
                        显示器支架
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img12.360buyimg.com/n7/jfs/t1/153469/25/3101/124817/5f900c7dE27906a40/f60c5a4eef3af2b6.jpg"
                        />
                        散热架
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img13.360buyimg.com/n2/jfs/t1/60617/17/14815/50371/5dc277eeE1b543f16/b9b4ea45c46c71ef.jpg"
                        />
                        充电器
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img14.360buyimg.com/n7/jfs/t1/115137/15/14914/136460/5f34f268E7ddbb23d/46dd7ceab0625a87.jpg"
                        />
                        保护膜
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img13.360buyimg.com/n2/jfs/t29353/303/435621837/140073/1dcce889/5bf28edaNd38f5722.jpg"
                        />
                        电池
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img11.360buyimg.com/n7/jfs/t1/114966/4/2288/121350/5ea15befE3453bb42/aa76dbfd6e4feee6.jpg"
                        />
                        电脑包
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img14.360buyimg.com/n7/jfs/t1/126320/15/16983/82132/5f9d659dE05866f32/274b4eadc78af6f7.jpg"
                        />
                        键盘
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="show-list">
                <h4>厨卫家电</h4>
                <van-grid :border="false" :column-num="3" :gutter="10" center>
                    <van-grid-item>
                        <van-image
                            src="https://img13.360buyimg.com/n7/jfs/t1/144612/36/8914/81284/5f6870b6Ea9abc5f1/450d0005e3239a4f.jpg"
                        />
                        热水器
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img12.360buyimg.com/n7/jfs/t1/127668/12/1886/173600/5ec12dfcE08618d1e/63e5e9500420c9b7.jpg"
                        />
                        洗碗机
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img11.360buyimg.com/babel/s320x320_jfs/t1/126600/16/16098/33271/5f91785dE3f85d28f/094c8a0790c8e2eb.jpg"
                        />
                        消毒柜
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img14.360buyimg.com/n7/jfs/t1/155036/14/3147/128691/5f914069E2843fb99/5ab128a170bb9dca.jpg"
                        />
                        电饭煲
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://img14.360buyimg.com/n7/jfs/t1/93232/3/15628/251953/5e723c47E54d3aff9/9d083eaea3409b83.jpg"
                        />
                        净水器
                    </van-grid-item>
                    <van-grid-item>
                        <van-image
                            src="https://p2.ssl.qhimg.com/dr/400_400_80/t01b833768f9e61d723.png"
                        />
                        炒菜机
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
        <div id="lei" v-else>
            <van-grid :border="false" :column-num="3" :gutter="10" center>
                <van-grid-item
                    v-for="item in p_list"
                    :key="item._id"
                    style="padding:0"
                >
                    <router-link
                        :to="{ name: 'Detils', query: { id: item._id } }"
                    >
                        <van-image
                            :src="item.coverImg"
                            width="76"
                            height="76"
                            gutter="0px"
                        />
                    </router-link>
                    <span class="itemname">{{ item.name }}</span>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
import { getProductAll } from "../ser/pro";
export default {
    data() {
        return {
            p_list: [],
            p_lists: [],
            id: "",
        };
    },
    async created() {
        let a = await getProductAll();
        console.log(a);
        this.p_lists = a.p;
    },

    watch: {
        $route(to) {
            // console.log(to);
            if (to.query.id != "0" && to.query.id != "") {
                this.id = to.query.id;
                this.p_list = this.p_lists.filter(
                    (v) => v.productCategory == to.query.id
                );
            } else {
                this.id = to.query.id;
            }
        },
    },
};
</script>

<style scoped>
.itemname {
    display: block;
    width: 76px;
    /* border: 1px solid red; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
