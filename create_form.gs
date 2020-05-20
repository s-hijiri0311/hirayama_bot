function createForm(){
 
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const dataValues = ss.getSheetByName('予定日').getDataRange().getValues();
  dataValues.shift()
  const values = ss.getSheetByName('予定表').getDataRange().getValues();
  const formTitle = values[0][0]; //タイトル
  const formDescription = values[1][0]; //概要
 
  const form = FormApp.create(formTitle);
  
  const id = PropertiesService.getScriptProperties().getProperty('FOLDER_ID');//スクリプトプロパティにFOLDER_ID
  const formFile = DriveApp.getFileById(form.getId());//フォルダの指定
  DriveApp.getFolderById(id).addFile(formFile);//ファイルの追加
  //DriveApp.getRootFolder().removeFile(formFile);//ファイルの削除
  
  form.setDescription(formDescription);
  form.addTextItem().setTitle('氏名').setRequired(true);
  
  const validationEmail = FormApp.createTextValidation().requireTextIsEmail().build();
  form.addTextItem().setTitle('メールアドレス').setRequired(true).setValidation(validationEmail);
  
    
    var dateArray=generateArray(values,1);
    for(var i=0;i<dateArray.length;i++)
    dateArray[i] = Utilities.formatDate(dateArray[i], "JST","MM'/'dd'('E')'")//これを追加
    
    //選択式質問の作成
    var gridItem = form.addGridItem();
        gridItem.setTitle('参加可能日は？')
        gridItem.setRows(dateArray) // 予定日
        gridItem.setColumns(['参加', '遅刻', '不参加','保留']); // 選択項目
        var gridValidation = FormApp.createGridValidation()
}