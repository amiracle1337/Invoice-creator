import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let orderData = []

document.addEventListener("click", function(e){
    if (e.target.id === "create-invoice")
    sendBillData()
    if (e.target.id === "send-invoice"){
        confirmInvoice()
    }
    if (e.target.dataset.eliminate){
        removeItem(e.target.dataset.eliminate)
        console.log(e.target.dataset.eliminate)
    }
})

function sendBillData() {
    const billDescription = document.getElementById("bill-description")
    const billAmount = document.getElementById("bill-amount")

    if (billDescription.value !== "" || billAmount.value !== ""){
        orderData.push({
            billDesc: billDescription.value,
            billPrice: Number(billAmount.value),
            uuid: uuidv4()
        })
        getBillData()
        render()
        billDescription.value = ""
        billAmount.value = ""

    }
} 

function getBillData(){

    let orderTotals = 0

    let billContainer = `
        <div id="feed-header">
            <p>Item</p>
            <p>TOTAL</p>
        </div>
    ` 
    orderData.forEach(function(item){
        billContainer += `
        <div id="feed-container">
            <div id="remove-container">
                <p id="remove-measure">${item.billDesc}</p>
                <button id="remove-btn" data-eliminate="${item.uuid}">x</button>
            </div>
            <p>$${item.billPrice.toLocaleString()}</p>
        </div>
        `
        orderTotals += item.billPrice
    })
    billContainer += `
        <div id="border"></div>
        <div id="total-container">
            <div id="total-section-one">
                <p id="notes">NOTES</p>
                <p id="notes-p">We accept cash, credit card, or paypal</p>
            </div>
            <div id="total-section-two">
                <p id="p-amount">TOTAL AMOUNT</p>
                <p id="total-usd">$${orderTotals.toLocaleString()}</p>
            </div>
        </div>
        <button id="send-invoice">SEND INVOICE</button>
    `
    return billContainer
    
}   

function confirmInvoice(){
    orderData = []
    render()
}

function removeItem(item){
    const itemIndex = orderData.findIndex(product => product.uuid == item)
    if (itemIndex !== -1){
        orderData.splice(itemIndex, 1)
    }
    render()
}

function render(){
    document.querySelector(".bill-holder").innerHTML = getBillData()
}
