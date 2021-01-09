import { post, get, del } from "../utils/req";

export function add(product, num = 1) {
    return post("/api/v1/shop_carts", {
        product,
        quantity: num,
    });
}
export function getCar() {
    return get("/api/v1/shop_carts");
}

export function delCar(id) {
    return del("/api/v1/shop_carts/" + id);
}
export function delCars(ids) {
    return post("/api/v1/shop_carts/delmany", { ids });
}
