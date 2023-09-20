// Ham xu ly dat hang
function addCart(code, event) {
    // tim phan tu select
    let size = event.querySelector(".prod-add")
    // Cho user addCart lại neu khong chon size truoc
    if(size.value === "Thêm Vào") {
        toastr.error('Xin chọn kích cỡ sản phẩm trước khi thêm vào giỏ hàng!', 'Lỗi')
        return
    }
    // Kiem tra su ton tai cua ma san pham trong localStorage
    else if(typeof localStorage[code + "," + size.value] == "undefined") {
        window.localStorage.setItem([code, size.value], "cart")  // [ten san pham, size giay]
        toastr.success('Sản phẩm đã được thêm vào giỏ hàng!', 'Thành Công')
    }
    else {
        toastr.error('Bạn đã thêm sản phẩm này vào giỏ hàng!', 'Lỗi')
    }
}