window.onload = function(){
    let id=16010121110
    decodedText = window.sessionStorage.getItem("Result");
    var qrcode = new QRCode("qrcode",  {text:decodedText+""+id,width:512,height:512,correctLevel :QRCode.CorrectLevel.H});	

}