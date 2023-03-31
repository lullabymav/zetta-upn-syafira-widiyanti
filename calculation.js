function calculate(){
    const title =  document.getElementById("title").value
    const price = document.getElementById("price").value;
    const discount = document.getElementById("discount").value;
    const qty = document.getElementById("qty").value
    const term = document.getElementById("credit").value
    const interest = document.getElementById("interest").value
    const buy = purchase(title, price, discount, qty, term, interest);

    if(buy.status === "true") {
        let purchased = buy.data;
        document.getElementById("result").innerHTML = `
            <p>${buy.message}</p>
            <p>Book Title: ${purchased.title}</p>
            <p>Price: ${purchased.price}</p>
            <p>Discount Amount: ${purchased.discountAmount}</p>
            <p>Price After Discount: ${purchased.afterDiscount}</p>
            <p>Tax: ${purchased.tax}%</p>
            <p>Price After Tax: ${purchased.afterTax}</p>
            <p>Total: ${purchased.totalPrice}</p>
            <p>Total After Interest: ${purchased.totalFinal}</p>
            <p>Credit Due:</p>
            <ul>
                ${purchased.creditDue.map(credit => `<li>Month ${credit.term}: ${credit.credit}</li>`).join('')}
            </ul>
        `;
        document.getElementById("stock-left").innerHTML = `
            <p>Stock Left: ${purchased.stockLeft}</p>
        `
    } else {
        document.getElementById("result").innerHTML = `
            <p>${buy.message}</p>
        `;
    }
}

function purchase(title, price, discount, qty, term, interest){
    const tax = 10;
    const stock = 100;

    let isDiscount = discount > 0 ? true : false;
    let discountAmount = 0;
    let afterDiscount = 0;
    let afterTax = 0;
    let totalPrice = 0
    let stockLeft = stock - qty;
        
    if(isDiscount){
        discountAmount = price * (discount/100);
        afterDiscount = price - discountAmount;
    }else{
        afterDiscount = price;
    }
    
    afterTax = afterDiscount + (afterDiscount * (tax/100));

    for(let i = 0; i < qty; i++){
        if(stockLeft > 0){
            totalPrice += afterTax
        }else{
            return {
                status : "false",
                message : "Out of stock"
            }
        }
    }

    totalFinal = (totalPrice*(1+(interest/100))**term).toFixed(2)
    creditPerMonth = (totalFinal/term).toFixed(2)

    const creditDue = Array.from({length: term}, (v, i) => ({
        term : i+1,
        credit : creditPerMonth
    }))

    return {
        status : "true",
        message : "Purchased Succesfully",
        data : {
            title : title,
            price : price,
            discountAmount : discountAmount,
            afterDiscount : afterDiscount,
            tax : tax,
            afterTax : afterTax,
            stock : stock,
            stockLeft : stockLeft,
            totalPrice : totalPrice,
            totalFinal : totalFinal,
            creditDue : creditDue
        }
    }
}