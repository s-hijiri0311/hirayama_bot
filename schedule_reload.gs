
var sheetname="予定表"
var MAIL_ADDRESS=PropertiesService.getScriptProperties().getProperty('MAIL_ADDRESS');

function scheduleClear() {

var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
 //スプレッドシートの初期化
  var sheet = spreadsheet.getSheetByName(sheetname);//シートの取得
  var lastRow,lastCol
  lastRow = sheet.getLastRow()
  lastCol = sheet.getLastColumn()
  if(sheet.getLastRow()>0)
  sheet.getRange(1, 1, lastRow, lastCol).clearContent()//シートの初期化


}
function scheduleReload() {

  scheduleClear();
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetname);//シートの取得
  var lastRow,lastCol
  lastRow = sheet.getLastRow()
  lastCol = sheet.getLastColumn()
  
  
  var myCal=CalendarApp.getCalendarById(MAIL_ADDRESS); //特定のIDのカレンダーを取得
  
  
  //対象月を指定
  var startDate=new Date(); //取得開始日
  var endDate=new Date();
  endDate.setMonth(endDate.getMonth()+1);　//取得終了日
 
  var myEvents=myCal.getEvents(startDate,endDate); //カレンダーのイベントを取得

 
  sheet.appendRow([endDate.getMonth()+1+"月予定"]);
  sheet.appendRow(["予定を入力してください"]);
  for(var i in myEvents){
  sheet.appendRow([myEvents[i].getTitle(),myEvents[i].getStartTime()]);
  }  
    
}
