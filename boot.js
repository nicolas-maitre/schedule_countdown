//methods
Element.prototype.addElement = function(type = "div", className = ""){
    var elem = document.createElement(type);
    elem.setAttribute("class", className);
    this.appendChild(elem);
    return elem;
}

String.prototype.fillGap = function(minLength = 2, char = "0"){
    var str = this + "";
    if(str.length >= minLength){
        return str;
    }
    var pre = char;
    for(var ind = 0; ind < minLength - str.length - 1; ind++){
        pre+=char;
    }
    return pre + str;
}
Number.prototype.fillGap = String.prototype.fillGap;

"salut".fillGap(2);

//BOOT
//build
var testDisplay = document.body.addElement("div", "saucisse");
document.body.addElement("div", "saucisseSeparator");
var testDisplayMin = document.body.addElement("div", "saucisseMin");
document.body.addElement("div", "saucisseSeparator");
var testDisplaySec = document.body.addElement("div", "saucisseSec");
document.body.addElement("div", "saucisseSeparator");
var testDisplayDec = document.body.addElement("div", "saucisseDec");
document.body.addElement();
var clockContainer = document.body.addElement("div", "clockContainer");
var clockCenter = clockContainer.addElement("div", "clockCenter");
var clockTopLine = clockContainer.addElement("div", "clockLine");
var fpsCounter = document.body.addElement("div", "fpsCounter");
//handles
var handles = {};
handles.hours = {elem: clockContainer.addElement("div", "clockHandleContainer hour"), turns: 0, lastDeg:0};
handles.hours.elem.addElement("div", "clockHandle");
handles.minutes = {elem: clockContainer.addElement("div", "clockHandleContainer min"), turns: 0, lastDeg:0};
handles.minutes.handleElem = handles.minutes.elem.addElement("div", "clockHandle");
handles.seconds = {elem: clockContainer.addElement("div", "clockHandleContainer sec"), turns: 0, lastDeg:0};
handles.seconds.elem.addElement("div", "clockHandle");
handles.dec = {elem: clockContainer.addElement("div", "clockHandleContainer dec"), turns: 0, lastDeg:0};
handles.dec.handleElem = handles.dec.elem.addElement("div", "clockHandle");
/*var decHandle = clockContainer.addElement("div", "clockHandleContainer dec");
decHandle.addElement("div", "clockHandle");*/

fetch('http://intranet.cpnv.ch/classes/SI-T1a/horaire?fullcalendar=true&start=1569189600&end=1569708000').then(function(res){
    console.log(res);
    return res.text();
}).then(function(json){
    console.log(json);
});

againAndAngain();
var frameCount = 0;
function againAndAngain(newFrameCount){
    //date
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var milliseconds = currentDate.getMilliseconds();
    //numeric
    testDisplay.innerText = hours.fillGap();
    testDisplayMin.innerText = minutes.fillGap();
    testDisplaySec.innerText = seconds.fillGap();
    testDisplayDec.innerText = milliseconds.fillGap(3);
    //handles
    handleRotate(handles.hours, (hours/24)*360);
    handleRotate(handles.minutes, (minutes/60)*360);
    handleRotate(handles.seconds, (seconds/60)*360);
    handleRotate(handles.dec, (milliseconds/1000)*360, true);
    //decHandle.style.transform = "rotate(" + (milliseconds/1000)*360 + "deg)";

    //shitty colors
    var multicolorstring = "rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")";
    handles.dec.handleElem.style["border-color"] = multicolorstring;
    testDisplayDec.style["color"] = multicolorstring;

    //dynamic colors
    var minColor = "rgb(0," + (255 - (seconds/60*255)) + ", 0)";
    testDisplayMin.style.color = minColor;
    handles.minutes.handleElem.style["border-color"] = minColor;

    var frameTime = newFrameCount - frameCount;
    frameCount = newFrameCount;
    var fps = Math.floor(1000/frameTime);
    fpsCounter.innerText = fps + " fps";
    //callback
    requestAnimationFrame(againAndAngain);
}
function handleRotate(handle,deg,disableCheck=false){
    if(handle.lastDeg > deg && !disableCheck){
        handle.turns++;
    }
    handle.lastDeg = deg;
    handle.elem.style.transform = "rotate(" + (handle.turns*360 + deg) + "deg)";
}