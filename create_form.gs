function createForm(){
 
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const values = ss.getSheetByName('平山シャトル予定表').getDataRange().getValues();
  const formTitle = values[0][1]; //タイトル
  const formDescription = values[1][1]; //概要
 
  const form = FormApp.create(formTitle);
  form.setDescription(formDescription);
  
}