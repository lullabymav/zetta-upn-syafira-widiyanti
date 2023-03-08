function calculate(){
    const title =  document.getElementById("title").value
    const price = document.getElementById("price").value;
    const discount = document.getElementById("discount").value;
    const tax = 10;
    let bool = price >= 0 && discount >= 0 && discount <= 100 ? true : false;
    if (bool){
        purchase(title, price, discount, tax);
    } 
}

function purchase(title, price, discount, tax){
    let discountAmount = price * (discount/100);
    let afterDiscount = price - discountAmount;
    let afterTax = afterDiscount + (afterDiscount * (tax/100));
    document.getElementById("result").innerHTML = 
    `Book Title: ${title} <br/> 
    Percentage of Discount: ${discount}% <br>
    Amount of Discount: Rp${discountAmount} <br>
    Price After Discount: Rp${afterDiscount} <br>
    Amount of Tax: ${tax}% <br>
    Price after Tax: Rp${afterTax}`
}