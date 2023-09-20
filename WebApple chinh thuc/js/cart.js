const cartTable = document.querySelector('.cart-table')
const cartTableBody = document.querySelector('.cart-table tbody')
const updatePrice = document.querySelector(".update-price-btn")
const totalAllPriceText = document.querySelector(".total-price")

function showCart() {
    let arrKey = []
    
    Object.keys(localStorage).forEach((element) => {
        if(window.localStorage.getItem(element) === "cart") {
            arrKey.push(element)
        }
    })
    arrKey.forEach((arrKeyElement, index) => {
        let key = arrKeyElement.split(",")     // Chia mang thanh 2 phan tu bang dau "," ==> [key[0]. key[1]] = [id sp, size]
        let item = itemList[key[0]]
        let name = item.name
        let price = item.price
        let photo = item.photo
        let orderQuantity = 1

        // Tao cac o hien thi thong tin san pham
        // Tao o du lieu chua hinh san pham
        const imgBox = document.createElement("td")
        imgBox.innerHTML = `<img src='${photo}' class='round-figure product-cart-img'>`

        // Ten san pham
        const nameCell = document.createElement("td")
        nameCell.textContent = `${name} (size: ${key[1]})`
        nameCell.setAttribute("colspan", 2)

        // Gia tien san pham
        const priceCell = document.createElement("td")
        priceCell.innerHTML = price + "$"

        // So luong
        const orderQuantityCell = document.createElement("td")
        orderQuantityCell.innerHTML = `
                                        <div class="quantity md-quantity">
                                            <button onclick="this.parentNode.querySelector('.quantity-input').stepDown()" class="quantity-btn minus"></button>
                                            <input class="quantity-input" min="1" name="quantity" value="1" type="number">
                                            <button onclick="this.parentNode.querySelector('.quantity-input').stepUp()" class="quantity-btn plus"></button>
                                        </div>
                                    `
        
        // Tong gia tien san pham khi nhan voi so luong
        const totalPriceCell = document.createElement("td")
        let totalPrice = orderQuantity*price
        totalPriceCell.innerHTML = totalPrice + "$"
        

        // Tao nut xoa
        const delBtn = document.createElement("a")
        delBtn.style.padding = "5px"
        delBtn.style.backgroundColor = "#dd3333"
        delBtn.style.color = "#fff"
        delBtn.style.cursor = "pointer"
        delBtn.setAttribute("data-code", key[0])
        delBtn.innerHTML = '<i class="fa fa-trash"></i>'
        delBtn.onclick = function () {
            removeCart(`${this.dataset.code},${key[1]}`)
        }

        const delCell = document.createElement("td")
        delCell.appendChild(delBtn)

        // Them tat ca cac cell vao 1 hang
        const newRow = document.createElement("tr")
        newRow.appendChild(imgBox)
        newRow.appendChild(nameCell)
        newRow.appendChild(priceCell)
        newRow.appendChild(orderQuantityCell)
        newRow.appendChild(totalPriceCell)
        newRow.appendChild(delCell)

        // Them hang moi vao bang
        cartTableBody.appendChild(newRow)
        
        // Cap nhat lai tong gia tien khi bam nut cap nhat
        updatePrice.addEventListener("click", () => {
            // Lay so luong
            orderQuantity = document.querySelectorAll(".quantity-input")[index].value
            // Cap nhat tong tien cua san pham
            totalPriceCell.textContent = orderQuantity*price + "$"
            // Dat bien tam de cong tong tien cua tung san pham
            let temp = 0
            document.querySelectorAll(".quantity-input").forEach((element) => {
                // Truy cap vao cot <td>Gia Tien</td> cua tung san pham, lay gia tri cua no, xoa ky tu "$" di va chuyen no thanh dang "Number"
                let priceElement = parseInt(element.parentNode.parentNode.previousSibling.textContent.slice(0, this.length-1))
                temp += element.value*priceElement
            })
            // Cap nhat tong tat ca cac san pham
            totalAllPriceText.textContent = temp + "$"
        })
    })
}


function removeCart(code) {
    if(typeof window.localStorage[code] !== "undefined") {
        // Xoa san pham khoi localStorage
        window.localStorage.removeItem(code);
        // Xoa noi dung cua phan than cua bang (<tbody>)
        cartTable.getElementsByTagName('tbody')[0].innerHTML=""
        // Hien thi lai noi dung chi tiet cua don hang
        showCart();
    }
}




window.onload = showCart()
window.onstorage = () => {
    showCart();
}
