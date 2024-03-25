function toggleHover(element) {
    element.classList.toggle("active");
}



var tabs = document.querySelectorAll(".image-more");
tabs.forEach(function(tab) {
    tab.addEventListener("click", function(event) {
        event.preventDefault();
        var targetImage = event.target.getAttribute('src');
        displayImage(targetImage);
    });
});

function displayImage(imageSrc) {
    var displayDiv = document.getElementById('display-image-overlay');
    var displayedImage = document.getElementById('displayed-image');
    displayedImage.setAttribute('src', imageSrc);
    displayDiv.style.display = 'flex'; // Hiển thị phần hiển thị ảnh
}


document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('display-image-overlay').style.display = 'none'; // Ẩn phần overlay khi nhấp vào nút Đóng
});


if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Create Cart
function ready(){
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i= 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    var quantityInputs =document.getElementsByClassName("cart-quantity")
    for (var i= 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    var addCart =document.getElementsByClassName("add-cart");
    for (var i= 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked(){
    alert("Đơn đặt hàng của bạn đã được đặt.");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}


//Xóa Cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentNode.remove();
    updatetotal();
}

//Thay đổi số lượng
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

//Add to cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.closest('.card');
    var title = shopProducts.querySelector(".cart-product-title").innerText;
    var price = shopProducts.querySelector(".cart-price").innerText;
    var cartImg = shopProducts.querySelector(".card-img").src;
    addProductToCart(title, price, cartImg);
    updatetotal();
}

function addProductToCart(title, price, cartImgSrc){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.querySelector(".cart-content");
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i= 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText === title) {
            alert("Bạn đã thêm sản phẩm này vào giỏ hàng rồi.");
            return;
        }
    }

    var cartBoxContent = `
        <img src="${cartImgSrc}" class="cart-img" alt="${title}">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input class="cart-quantity" type="number" value="1" min="1">
        </div>
        <i class="bi bi-trash-fill cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
    cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
}


//Cập nhật total
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i= 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("đ", "").replace(/\./g, ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    var formattedTotal = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementsByClassName("total-price")[0].innerText = formattedTotal;
}

// Ngăn chặn hành vi mặc định khi click vào liên kết
var addToCartLinks = document.querySelectorAll('#add-to-cart-link');
    addToCartLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
        });
    });



// Hiden Cart//
var cartIcon = document.getElementById("cart-icon");
var cartMain = document.querySelector(".cart-main");
var closeButton = document.getElementById("close-cart");

// Biến cờ để theo dõi trạng thái của giỏ hàng
var isOpen = false;

// Thêm sự kiện click cho biểu tượng giỏ hàng
cartIcon.addEventListener("click", function() {
    // Nếu giỏ hàng đang mở, đóng nó lại
    if (isOpen) {
        cartMain.classList.remove("active");
        isOpen = false;
    } else {
        // Nếu giỏ hàng đang đóng, mở nó lên
        cartMain.classList.add("active");
        isOpen = true;
    }
});

// Thêm sự kiện click cho nút đóng
closeButton.addEventListener("click", function() {
    cartMain.classList.remove("active");
    isOpen = false; // Đặt lại trạng thái thành đã đóng
});

