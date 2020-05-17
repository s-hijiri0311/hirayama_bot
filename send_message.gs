var ACCESS_TOKEN=PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
var GROUP_ID=PropertiesService.getScriptProperties().getProperty('MEMO_ID');

function sendLINE(){
var CHANNEL_ACCESS_TOKEN = ACCESS_TOKEN;
  var url = 'https://api.line.me/v2/bot/message/push';
  var toID = GROUP_ID;//上で取得したグループID
  
  var body = 'グループにメッセージ';
 
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': toID,
      'messages':[{
        'type': 'text',
        'text': body ,
      }]
     })
   })
}
