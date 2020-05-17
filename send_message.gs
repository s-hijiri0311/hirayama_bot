var CHANNEL_ACCESS_TOKEN=PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');

function doPost(e) {
  var event = JSON.parse(e.postData.contents).events[0];
  var replyToken= event.replyToken;

  if (typeof replyToken === 'undefined') {
    return; // エラー処理
  }
  var userId = event.source.userId;
  var nickname = getUserProfile(userId);

  if(event.type == 'follow') { 
    // ユーザーにbotがフォローされた場合に起きる処理
  }

  if(event.type == 'message') {
    var userMessage = event.message.text;
    // 今回は鸚鵡返しなので届いたメッセージをそのまま返します。
    var replyMessage = userMessage 

    // もし届いたユーザーからのメッセージによって他にやりたい処理
    // (ex: spread sheetへの記入など)がある場合は、ここに入れて下さい。

    var url = 'https://api.line.me/v2/bot/message/reply';

    UrlFetchApp.fetch(url, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': replyToken,
        'messages': [{
          'type': 'text',
          'text': replyMessage,
        }],
      }),
    });
    return ContentService.createTextOutput(
      JSON.stringify({'content': 'post ok'})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// profileを取得してくる関数
function getUserProfile(userId){ 
  var url = 'https://api.line.me/v2/bot/profile/' + userId;
  var userProfile = UrlFetchApp.fetch(url,{
    'headers': {
      'Authorization' :  'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
  })
  return JSON.parse(userProfile).displayName;
}
