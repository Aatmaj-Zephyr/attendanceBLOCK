window.onload = function(){
    let id=16010121110
    QRText = window.sessionStorage.getItem("Result");

    const codes = QRText.split(';');

    const facultyName = codes[0].trim();
    var Attendance = codes[1].trim();
    const timeStamp = codes[2].trim(); //not used for now

    
    
    Attendance = convertBase(""+Attendance,64,11) + "a" + id;  // a is seperator
    Attendance = convertBase(Attendance,11,64);
   

    setInterval(function(){
    var currentTime = Date.now();
    var newText = facultyName + ";" + Attendance + ";" + currentTime;
    document.getElementById("qrcode").innerHTML=""; //clear QR code


    var qrcode = new QRCode("qrcode",  {text:""+newText,width:512,height:512,correctLevel :QRCode.CorrectLevel.H});	

    },2000);//refresh every 2 seconds

}

function convertBase(str, fromBase, toBase) {

    const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/";

    const add = (x, y, base) => {
        let z = [];
        const n = Math.max(x.length, y.length);
        let carry = 0;
        let i = 0;
        while (i < n || carry) {
            const xi = i < x.length ? x[i] : 0;
            const yi = i < y.length ? y[i] : 0;
            const zi = carry + xi + yi;
            z.push(zi % base);
            carry = Math.floor(zi / base);
            i++;
        }
        return z;
    }

    const multiplyByNumber = (num, x, base) => {
        if (num < 0) return null;
        if (num == 0) return [];

        let result = [];
        let power = x;
        while (true) {
            num & 1 && (result = add(result, power, base));
            num = num >> 1;
            if (num === 0) break;
            power = add(power, power, base);
        }

        return result;
    }

    const parseToDigitsArray = (str, base) => {
        const digits = str.split('');
        let arr = [];
        for (let i = digits.length - 1; i >= 0; i--) {
            const n = DIGITS.indexOf(digits[i])
            if (n == -1) return null;
            arr.push(n);
        }
        return arr;
    }

    const digits = parseToDigitsArray(str, fromBase);
    if (digits === null) return null;

    let outArray = [];
    let power = [1];
    for (let i = 0; i < digits.length; i++) {
        digits[i] && (outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase));
        power = multiplyByNumber(fromBase, power, toBase);
    }

    let out = '';
    for (let i = outArray.length - 1; i >= 0; i--)
        out += DIGITS[outArray[i]];

    return out;
}
