
  
  //CHANNEL_ACCESS_TOKENを設定
//LINE developerで登録をした、自分のCHANNEL_ACCESS_TOKENを入れて下さい
var CHANNEL_ACCESS_TOKEN =PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
var line_endpoint = 'https://api.line.me/v2/bot/message/reply';

//ポストで送られてくるので、ポストデータ取得
//JSONをパースする
function replyFunction(e) {
  var json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  var reply_token= json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }

  //送られたLINEメッセージを取得
  var user_message = json.events[0].message.text;  

  //返信する内容を作成
  var reply_messages;
  if ('かっこいい' == user_message) {
    //かっこいいと入力された際
    reply_messages = ['「' + user_message + '」ですね？\n' + '「' + user_message + '」はこちらになります。\n' + 'https://hogehoge.com',];

  } else if ('かわいい' == user_message) {
    //かわいいと入力された際
    reply_messages = ['「' + user_message + '」ですね？\n' + '「' + user_message + '」はこちらになります。\n' + 'https://hogehoge.com',];

  } else if ('普通' == user_message) {
    //普通と入力された際
    reply_messages = ['「' + user_message + '」ですね？\n' + '「' + user_message + '」はこちらになります。\n' + 'https://hogehoge.com',];

  } else {
    //かっこいい、かわいい、普通が入力されたときの処理
    reply_messages = ['「かっこいい」、「かわいい」、「普通」で入力してくださいね！'];
  }

  // メッセージを返信
  var messages = reply_messages.map(function (v) {
    return {'type': 'text', 'text': v};    
  });    
  UrlFetchApp.fetch(line_endpoint, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': messages,
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
  
