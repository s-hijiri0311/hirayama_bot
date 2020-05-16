
var sheetname="平山シャトル予定表"
var gmail="hirayamashuttle@gmail.com"

function scheduleReload() {
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
 //スプレッドシートの初期化
  var sheet = spreadsheet.getSheetByName(sheetname);//シートの取得
  var lastRow,lastCol
  lastRow = sheet.getLastRow()
  lastCol = sheet.getLastColumn()
  if(sheet.getLastRow()>0)
  sheet.getRange(1, 1, lastRow, lastCol).clearContent()//シートの初期化
  
  
  
  
}
