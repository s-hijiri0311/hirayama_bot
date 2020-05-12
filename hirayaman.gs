//アクセストークン,グループID
var CHANNEL_ACCESS_TOKEN = 'nUFtElHvSPJILjqOA+1Y6bQhCW0QgCMx/GFCoFxeDz/LkIALZ8AIM/BXNqtEOrh/bG2zRI9WlWrQZviRJ9/+B3oUILR13z63MsxaK+hx09L3qTOgL6PWvtbwrnXQWsw1/Sj4rrY4ph7s+tGmcmnATgdB04t89/1O/w1cDnyilFU='; 
//テスト用ID
//var USER_ID = 'C91dfc3d6e98e1fc8f31a88c2398895af';
//平山のグループID
var USER_ID = 'Ce9d615203a109a345741349a6ed41ad1';
/* 指定月のカレンダーからイベントを取得する */
function getCalendar1() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
 //スプレッドシートの初期化
  var sheet = spreadsheet.getSheetByName('Sheet2');
  var lastRow,lastCol
  lastRow = sheet.getLastRow()
  lastCol = sheet.getLastColumn()
  if(sheet.getLastRow()>0)
  sheet.getRange(1, 1, lastRow, lastCol).clearContent()
  
  
  var mySheet=spreadsheet.getSheetByName('Sheet2'); //シートを取得
  var no=1; //No
 
  var myCal=CalendarApp.getCalendarById('hirayamashuttle@gmail.com'); //特定のIDのカレンダーを取得
 
  //対象月を指定
  var startDate=new Date(); //取得開始日
  startDate.setDate(startDate.getDate()-3);
  startDate.setMonth(startDate.getMonth()+1);
  var endDate=new Date();
  endDate.setMonth(endDate.getMonth()+2);　//取得終了日
 
  var myEvents=myCal.getEvents(startDate,endDate); //カレンダーのイベントを取得
 
  /* イベントの数だけ繰り返してシートに記録 */
  for each(var evt in myEvents){
    if(!evt.getTitle().match(/誕生日/)){
    mySheet.appendRow(
      [
        no, //No
        evt.getTitle(), //イベントタイトル
        evt.getStartTime(), //イベントの開始時刻
        evt.getEndTime(), //イベントの終了時刻
      ]
    );
    no++;
  }
        }
     //スプレッドシートの読み込み
       
 
  var lastRow = mySheet.getLastRow();
  var token = PropertiesService.getScriptProperties().getProperty('CW_TOKEN');
   
  for(var i = 0; i <= lastRow; i++) {
        if(i==0){
        var body = ''
      body += 'こんにちは！ヒラヤマンです！' + '\n' + (startDate.getMonth()+1) +'月の予定をお伝えします！'+'\n\n'; //meigen
      }

    else if(!sheet.getRange(i, 5).getValue()){ 
 
      var values = sheet.getRange(i, 2, 1, 1).getValues(); 
      var targetDate1 = sheet.getRange(i,3).getValue();  
    var dateString1 = Utilities.formatDate(targetDate1,"JST","MM/dd(E) HH:mm");
        var targetDate2 = sheet.getRange(i,4).getValue();  
    var dateString2 = Utilities.formatDate(targetDate2,"JST","MM/dd(E) HH:mm");
      
      body += values[0][0] + '\n'; //meigen
      body += '開始:' + dateString1 + '\n'; //person
      body += '終了:' + dateString2 + '\n\n'; //info
     
     
      sheet.getRange(i, 5).setValue(true);


    
  }
}
 

//linebot
 
body += '予定表の記入はこちらからお願いします！！'+'\n'+'https://docs.google.com/spreadsheets/d/1snQCaGM91ay8xGo7Ky5ZoyNDxdhekWHLecIiDzETqi0/edit?usp=sharing'


   
  var postData = {
    "to": USER_ID,
    "messages": [{
      "type": "text",
      "text": body,
    }]
  };

  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };

  var options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  var response = UrlFetchApp.fetch(url, options);
}

  

        




