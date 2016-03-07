window.onload = function() {

    var socket = io.connect('http://95.183.50.181:3000');
    var buyer_count = document.getElementById("buyer_count");
    var buyer_btc = document.getElementById("buyer_btc");
    var buyer_btc_2 = document.getElementById("buyer_btc_2");

    var buyer_percent = document.getElementById("buyer_percent");

    socket.on('message', function (data) {
        console.log(data);
        if(data.count) {
            if(buyer_count)
            buyer_count.innerHTML = data.count.toFixed(0).toString();
        }

        if(data.btc) {
            if(buyer_btc)
                buyer_btc.innerHTML = data.btc.toFixed(2).toString();       
            if(buyer_btc_2)
                buyer_btc_2.innerHTML = data.btc.toFixed(2).toString();
        }
        if(data.percent) {
            if(buyer_percent)
            buyer_percent.innerHTML = data.percent.toFixed(2).toString();
        }

    });
    window.setTimeout(function(){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "/misc/current_block.txt", false); // true for asynchronous
        xmlHttp.send(null);
        var xvar = 425920-parseInt(xmlHttp.responseText);
        blocks_left.innerHTML = xvar.toFixed(0).toString();
    }, 5000);
     var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "/misc/current_block.txt", false); // true for asynchronous
        xmlHttp.send(null);
        var xvar = 425920-parseInt(xmlHttp.responseText);
        blocks_left.innerHTML = xvar.toFixed(0).toString();

}
