import { get } from "../utils/req";

export function loadPro(page) {
    return get("/api/v1/products?page=" + page);
}
export function loadProDet(id) {
    return get("/api/v1/products/" + id);
}
export function getProduct_categories() {
    return get("/api/v1/products/p_c/all");
}
export function getProductAll() {
    return get("/api/v1/products/p/all");
}

