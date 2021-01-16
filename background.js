//extra option trigger
var option = false;

//Kanji helper
function isKanji(c){
  const punt = /\p{P}/gu;
  //const numbers = /\p{Nd}/gu; //range of numbers in unicode, not useful now
  const Kanji = /[\u4E00-\u9FFF\u3400-\u4DBF]/gu;
  const space = /\p{Z}/gu;
  if(Kanji.test(c)){
    return 1;
  } else if(punt.test(c)){
    return 2;
  } else if(space.test(c)){
    return 3;
  }
  return 0;
}

//Actual word counter logics
function ccounter(info){
  var selected = info.selectionText;
  console.log(`Currently selecting: ${selected}`);
  var counter = 0;
  var pcounter = 0;
  var ctest;
  var i;
  var ncu = false;
  for(i = 0; i < selected.length; i++){
    ctest = isKanji(selected.charAt(i));
    if(ctest == 1){
      counter++;
      ncu = false;
    } else if(ctest == 2){
      pcounter++;
      ncu = false;
    } else if(ctest == 3){
      ncu = false;
    } else if(ncu == false && option == true){
      ncu = true;
      counter++;
    }
  }
  if(option == true){
    alert(`字數：${counter}\n標點符號：${pcounter}`);
  } else {
    alert(`中文字數：${counter}\n標點符號：${pcounter}`);
  }
}

//Creating menu item
function setupCC(){
  chrome.contextMenus.create({
    id: "CCounterididk",
    title: "字數計算",
    contexts:["selection"]
  });
  return;
}

chrome.runtime.onInstalled.addListener(setupCC);

//managing onClicked event
chrome.contextMenus.onClicked.addListener(function (info, tab){
  if (info.menuItemId == "CCounterididk") {
      ccounter(info);
    }
});

//managing option trigger messages
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message == 87){
      option = !option;
      sendResponse(option);
    }
});
