function createForm(){
 
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const values = ss.getSheetByName('平山シャトル予定表').getDataRange().getValues();
  const formTitle = values[0][1]; //タイトル
  const formDescription = values[1][1]; //概要
 
  const form = FormApp.create(formTitle);
  const id = PropertiesService.getScriptProperties().getProperty('FOLDER_ID');//スクリプトプロパティにFOLDER_ID
  const formFile = DriveApp.getFileById(form.getId());//フォルダの指定
  DriveApp.getFolderById(id).addFile(formFile);//ファイルの追加
  //DriveApp.getRootFolder().removeFile(formFile);//ファイルの削除
  form.setDescription(formDescription);
  
}