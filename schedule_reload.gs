
var sheetname="平山シャトル予定表"
var MAIL_ADRESS=PropertiesService.getScriptProperties().getProperty('MAIL_ADRESS');
function scheduleReload() {
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
 //スプレッドシートの初期化
  var sheet = spreadsheet.getSheetByName(sheetname);//シートの取得
  var lastRow,lastCol
  lastRow = sheet.getLastRow()
  lastCol = sheet.getLastColumn()
  if(sheet.getLastRow()>0)
  sheet.getRange(1, 1, lastRow, lastCol).clearContent()//シートの初期化
  
  
  var myCal=CalendarApp.getCalendarById(MAIL_ADDRESS); //特定のIDのカレンダーを取得
  
  
  //対象月を指定
  var startDate=new Date(); //取得開始日
  startDate.setDate(startDate.getDate()-3);
  startDate.setMonth(startDate.getMonth()+1);
  var endDate=new Date();
  endDate.setMonth(endDate.getMonth()+2);　//取得終了日
 
  var myEvents=myCal.getEvents(startDate,endDate); //カレンダーのイベントを取得
 
  
    
    
}
