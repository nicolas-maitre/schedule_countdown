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
var clockContainer = document.body.addElement("div", "clockContainer");
var clockCenter = clockContainer.addElement("div", "clockCenter");
//handles
var handles = {};
handles.hours = {elem: clockContainer.addElement("div", "clockHandleContainer hour")};
handles.hours.elem.addElement("div", "clockHandle");
handles.minutes = {elem: clockContainer.addElement("div", "clockHandleContainer min")};
handles.minutes.elem.addElement("div", "clockHandle");
handles.seconds = {elem: clockContainer.addElement("div", "clockHandleContainer sec")};
handles.seconds.elem.addElement("div", "clockHandle");
handles.dec = {elem: clockContainer.addElement("div", "clockHandleContainer dec")};
handles.dec.elem.addElement("div", "clockHandle");
/*var decHandle = clockContainer.addElement("div", "clockHandleContainer dec");
decHandle.addElement("div", "clockHandle");*/

againAndAngain();
function againAndAngain(){
    //date
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var milliseconds = currentDate.getMilliseconds();
    //numeric
    testDisplay.innerText = hours.fillGap() + " : " + minutes.fillGap() + " : " + seconds.fillGap() + " : " + milliseconds.fillGap(3);
    //handles
    handleRotate(handles.hours, (hours/24)*360);
    handleRotate(handles.minutes, (minutes/60)*360);
    handleRotate(handles.seconds, (seconds/60)*360);
    handleRotate(handles.dec, (milliseconds/1000)*360);
    //decHandle.style.transform = "rotate(" + (milliseconds/1000)*360 + "deg)";
    //callback
    requestAnimationFrame(againAndAngain);
}
function handleRotate(handle,deg){
    handle.elem.style.transform = "rotate(" + deg + "deg)";
}