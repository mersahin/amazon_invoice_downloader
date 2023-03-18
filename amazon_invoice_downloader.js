// document ready
const downloadInvoice = (id) => {
    axios.get(`https://www.amazon.de/gp/shared-cs/ajax/invoice/invoice.html?orderId=${id}&relatedRequestId=${ue_id}&isADriveSubscription=0&isBookingOrder=0`)
    .then(function (response) {
        let links =$(response.data).find("a[href$='invoice.pdf']")
        console.log(id, "found", links.length, "links");
        links.each(function(){
            // get href
            let link = $(this).attr("href");
            // download and save    
            GM_download(link, `${id}.pdf`);
        }); 
    });
}
$(function(){
    // tampermonkey clear console
    console.clear();
    // $('.order-card a:contains("Fatura")').each(function(){ this.click();})
    var text = document.querySelector(".your-orders-content-container__content").innerText
    var regex = /(\d{3}-\d{7}-\d{7})/g;
    let ids = text.match(regex);
    console.log(ids.length, " invoices found");

    ids.forEach((id, index) => {
        // download with delay
        setTimeout(() => {
            downloadInvoice(id);
        }, 1000 * index);
    });
});



