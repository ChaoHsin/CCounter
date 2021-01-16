//var current_state = chrome.runtime.getBackgroundPage().window.option;
var current_state;

chrome.runtime.getBackgroundPage(function (backgroundPage) {
    current_state = backgroundPage.option; // Displays "mooh".
});

//Switching extra function on and off
var button = document.getElementById('ccoption');
button.onclick = function message() {
    chrome.runtime.sendMessage(87);
    current_state = !current_state;
    if(current_state==true){
      alert("額外功能開啟");
      button.innerHTML = "開";
    } else {
      alert("額外功能關閉");
      button.innerHTML = "關";
    }
}

//check button text when loading page
window.onload = function varload(){
  if(current_state==true){
    button.innerHTML = "開";
  } else {
    button.innerHTML = "關";
  }
}
