function createForm(){
 
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const dataValues = ss.getSheetByName('予定日').getDataRange().getValues();
  dataValues.shift()
  const values = ss.getSheetByName('平山シャトル予定表').getDataRange().getValues();
  const formTitle = values[0][1]; //タイトル
  const formDescription = values[1][1]; //概要
 
  const form = FormApp.create(formTitle);
  
  const id = PropertiesService.getScriptProperties().getProperty('FOLDER_ID');//スクリプトプロパティにFOLDER_ID
  const formFile = DriveApp.getFileById(form.getId());//フォルダの指定
  DriveApp.getFolderById(id).addFile(formFile);//ファイルの追加
  //DriveApp.getRootFolder().removeFile(formFile);//ファイルの削除
  
  form.setDescription(formDescription);
  form.addTextItem().setTitle('氏名').setRequired(true);
  
  const validationEmail = FormApp.createTextValidation().requireTextIsEmail().build();
  form.addTextItem().setTitle('メールアドレス').setRequired(true).setValidation(validationEmail);
  
  
  /*
    form.addMultipleChoiceItem()//ラジオボタン
    .setTitle('5/1')
    .setChoiceValues(['参加', '遅刻','不参加'])
    .setRequired(true);
    
    form.addMultipleChoiceItem()
    .setTitle('5/8')
    .setChoiceValues(['参加', '遅刻','不参加'])
    .setRequired(true);
    
    form.addMultipleChoiceItem()
    .setTitle('5/15')
    .setChoiceValues(['参加', '遅刻','不参加'])
    .setRequired(true);
    
    form.addMultipleChoiceItem()
    .setTitle('5/22')
    .setChoiceValues(['参加', '遅刻','不参加'])
    .setRequired(true);
    
    
    form.addCheckboxItem()//チェックボックス
    .setTitle('参加可能な日付は？')
    .setChoiceValues(generateArray(dataValues,1))
    .showOtherOption(true)
    .setRequired(true);
    
    
    form.addListItem()//プルダウンリスト
    .setTitle('参加可能日は？')
    .setChoiceValues(generateArray(dataValues,1))
    .setRequired(true);
    
    */
    var dateArray=generateArray(dataValues,2);
    for(var i=0;i<dateArray.length;i++)
    dateArray[i] = Utilities.formatDate(dateArray[i], "JST","MM'/'dd'('E')'")//これを追加
    
    
    
    var gridItem = form.addGridItem();
        gridItem.setTitle('参加可能日は？')
        gridItem.setRows(dateArray) // 予定日
        gridItem.setColumns(['参加', '遅刻', '不参加','保留']); // 選択項目
        var gridValidation = FormApp.createGridValidation()
    
    
}