export function isLogin() {
    if (localStorage.getItem("token")) {
        return true;
    }
    return false;
}
export function setToken(v) {
    return localStorage.setItem("token", v);
}
export function getToken() {
    return localStorage.getItem("token");
}

export function initSku(pro) {
    return {
        tree: [
            {
                k: "颜色",
                k_s: "s1",
                v: [
                    {
                        id: "1",
                        name: "红色",
                        imgUrl: pro.coverImg,
                        previewImgUrl: pro.coverImg,
                    },
                    {
                        id: "2",
                        name: "蓝色",
                        imgUrl: pro.coverImg,
                        previewImgUrl: pro.coverImg,
                    },
                ],
                largeImageMode: true, //  是否展示大图模式
            },
            {
                k: "尺寸",
                k_s: "s2",
                v: [
                    {
                        id: "1",
                        name: "大",
                    },
                    {
                        id: "2",
                        name: "小",
                    },
                ],
            },
        ],
        list: [
            {
                id: 2259, // skuId
                s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
                price: pro.price * 100, // 价格（单位分）
                stock_num: pro.quantity, // 当前 sku 组合对应的库存
            },
            {
                id: 2260, // skuId
                s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "2", // 规格类目 k_s 为 s2 的对应规格值 id
                price: pro.price * 100, // 价格（单位分）
                stock_num: pro.quantity, // 当前 sku 组合对应的库存
            },
            {
                id: 2261, // skuId
                s1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
                price: pro.price * 100, // 价格（单位分）
                stock_num: pro.quantity, // 当前 sku 组合对应的库存
            },
            {
                id: 2262, // skuId
                s1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "2", // 规格类目 k_s 为 s2 的对应规格值 id
                price: pro.price * 100, // 价格（单位分）
                stock_num: pro.quantity, // 当前 sku 组合对应的库存
            },
        ],
        price: pro.price, // 默认价格（单位元）
        stock_num: pro.quantity, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
            {
                multiple: "1", // 留言类型为 text 时，是否多行文本。'1' 表示多行
                name: "备注", // 留言名称
                type: "text", // 留言类型
                required: "0", // 是否必填 '1' 表示必填
                placeholder: "请填写备注（请提前联系客服）", // 可选值，占位文本
            },
            {
                name: "电话", // 留言名称
                type: "tel", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                required: "0", // 是否必填 '1' 表示必填
                placeholder: "请填写您的联系电话", // 可选值，占位文本
            },
        ],
    };
}


