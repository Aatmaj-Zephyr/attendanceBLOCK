let html5QrcodeScanner ;

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    window.alert(decodedText);
    window.sessionStorage.setItem("Result", ""+decodedText);
 
    //stop scanning
    
    window.location.href="./qr.html"
    

  }
  
  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }
  
  document.getElementById("scanButton").addEventListener("click", function () {

    // Ensure that html5QrcodeScanner is initialized before calling render
    if (html5QrcodeScanner) {
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }
    else{
        console.log("Error htmlqrcodeScanner is not initialized");
    }
  });
  


  window.onload = function() { //default running
    
     html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 15, qrbox: {width: 400, height: 400} , facingmode:"environment"},
        /* verbose= */ false
      );
    
  }

