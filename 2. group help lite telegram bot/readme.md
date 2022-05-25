# Group Help Lite Telegram Bot

## Demo

https://user-images.githubusercontent.com/82513502/170227856-af5f3ebd-b848-473b-8895-4cc03a1251f5.mp4


## ID Library
- [Lumpia.js](https://lumpia.js.org/docs/)
  Library untuk berinteraksi dengan api telegram
Legacy:
```bash
MUD_wfLskZT2D99lRXLh94vvg_do21SJR
```
New:
```bash
1Yo6vQRwjG5Gl9jeEF0g2tBTUa0XN5MyT4G_HeDpRr9DvabxhRcSdhPNj
```
- [Mini Database](https://github.com/azkadev/librarys/tree/main/apps-script/minidb)
 Library untuk menyimpan data raw (script / cache) no gui
Legacy: 
```bash
MBKIhRU7yJNQOuEHsA4X5dKOF4qn-QYEF
```
New:
```bash
1ZEbB3nhgmaGcTiG7c5QaeGSyNHVNiOUfRjh3d860k9L6wTxFzekkgvk-
```
- [Google Sheets](https://github.com/azkadev/librarys/tree/main/apps-script/gsheets)
  Library untuk menyimpan data di google sheets gui
Legacy
```bash
MIgz3_PHZHDfCyYqvXf4l3qOF4qn-QYEF
```
New:
```bash
18cr79yjSN-3kIN2qLq1yjaDwOGKAj89R3Y_aFAly-KxyOIUsSpNXb7l3
```


## Starter kits

```js
var gsheet = new azkadevgsheets.googlesheet("shet_id");
var db = new minidb.minidb();

var url_app = "url_web_App";
var dev_user_id = 5299353665;
var is_debug = true;
var token = 'token_bots';
var bot = new lumpia.init(token);
bot.options.log_id = dev_user_id;
function getRow(range_name, user_data, get_row_num = 0) {
    var result = gsheet.getRows(range_name, user_data, get_row_num);
    if (result) {
        var list_key = [
            "chat_id", "username", "type", "name", "admins"
        ];
        for (var key in result) {
            if (Object.hasOwnProperty.call(result, key)) {
                var element = result[key];
                if (element) {
                    if (list_key[Number(key)] ?? key) {
                        try {
                            result[list_key[Number(key)] ?? key] = JSON.parse(element);
                        } catch (e) {
                            result[list_key[Number(key)] ?? key] = element;
                        }
                        delete result[key];
                    }
                }
            }
        }
        return result;
    } else {
        return false;
    }
}

function saveRow(range_name, chat_id, new_data, name_row, get_row_num = 0) {
    return gsheet.saveRow(range_name, chat_id, get_row_num, new_data, String(range_name).replace(RegExp("!.*", "i"), "!") + String(name_row).toLocaleUpperCase());
}

function doPost(e) {
    bot.doPost(e);
}
function setWebhook() {
    url_app += `?token=${token}`;
    var getMe = bot.telegram.callApi("getMe");
    url_app += `&username=${getMe["result"]["username"]}`;
    var result = bot.telegram.setWebhook(url_app);
    Logger.log(result);
}

bot.cmd('ping', (ctx, next) => {
    var time_start = Date.now();
    var res = ctx.replyIt('..pong!');
    var time_stop = Date.now();
    var time_delta = (time_stop - time_start) / 1000; // mili detik
    var time = new Intl.NumberFormat('id').format(time_delta); // jadiin detik, sekaligus di format
    var msg_id = res.result.message_id;
    bot.telegram.editMessageText(ctx.chat.id, msg_id, null, `<b>Pong!</b> Proses <code>${time}</code> detik.`, { parse_mode: 'html' });
})

bot.on(['message', "callback_query", "inline_query"], function (ctx) {
    function request(method, parameters = false) {
        if (typeof parameters != "object") {
            parameters = {};
        }
        return ctx.telegram.callApi(method, parameters);
    }
    if (ctx["update"]) {
        if (ctx["update"]["inline_query"]) {
            var inline_query = update["inline_query"];
            var user_id = inline_query["from"]["id"];
            var chat_type = "";
            try {
                chat_type = String(inline_query["type"]).replace(RegExp("super", "i"), "");
            } catch (e) {
            }
            var text = inline_query["query"];
            try {

            } catch (e) {

            }
        }
        if (ctx["update"]["callback_query"]) {

            var cb = ctx["update"]["callback_query"];
            var cbm = cb["message"];
            var cbm_text = cbm["text"] ?? "";
            var cbm_caption = cbm["caption"] ?? "";
            var user_id = cb["from"]["id"];

            var msg_id = cbm["message_id"];
            // varible to get information chat
            var chat_id = cbm["chat"]["id"];
            var chat_type = String(cbm["chat"]["type"]).replace(RegExp("super", "i"), "");
            var chat_title = cbm["chat"]["title"] ?? "";
            var chat_first_name = cbm["chat"]["first_name"] ?? "";
            var chat_last_name = cbm["chat"]["last_name"] ?? "";
            var chat_full_name = `${chat_first_name} ${chat_last_name}`;
            var chat_username = (cbm["chat"]["username"]) ? `@${cbm["chat"]["username"]}` : "";

            // varible to get information sender in chat
            var from_id = cb["from"]["id"];
            var from_first_name = cb["from"]["first_name"];
            var from_last_name = cb["from"]["last_name"] ?? "";
            var from_full_name = `${from_first_name} ${from_first_name}`;
            var from_username = (cb["from"]["username"]) ? `@${cb["from"]["username"]}` : "";
            var from_language_code = cb["from"]["language_code"] ?? "id";
            var mention_from_markdown = `[${from_full_name}](tg://user?id=${user_id})`;
            var mention_from_html = `<a href='tg://user?id=${user_id}'>${from_full_name}</a>`;

            var text = cb["data"];
            var sub_data = text.replace(/(.*:|=.*)/ig, "");
            var sub_id = text.replace(/(.*=|\-.*)/ig, "");
            var sub_sub_data = text.replace(/(.*\-)/ig, "");
            try {

            } catch (e) {

            }

        }
        if (ctx["update"]["message"]) {
            var msg = ctx["update"]["message"];
            var text = msg["text"] ?? "";
            var caption = msg["caption"] ?? "";
            var msg_caption = msg["text"] ?? msg["caption"] ?? false;
            var msgr = msg["reply_to_message"] ?? false;
            var msg_id = msg["message_id"];
            var user_id = msg["from"]["id"];

            // varible to get information chat
            var chat_id = msg["chat"]["id"];
            var chat_type = String(msg["chat"]["type"]).replace(RegExp("super", "i"), "");
            var chat_title = msg["chat"]["title"] ?? "";
            var chat_first_name = msg["chat"]["first_name"] ?? "";
            var chat_last_name = msg["chat"]["last_name"] ?? "";
            var chat_full_name = `${chat_first_name} ${chat_last_name}`;
            var chat_username = (msg["chat"]["username"]) ? `@${msg["chat"]["username"]}` : "";
            var chat_name = (msg["chat"]["title"]) ? msg["chat"]["title"] : chat_full_name;
            // varible to get information sender in chat
            var from_id = msg["from"]["id"];
            var from_first_name = msg["from"]["first_name"];
            var from_last_name = msg["from"]["last_name"] ?? "";
            var from_full_name = `${from_first_name} ${from_first_name}`;
            var from_username = (msg["from"]["username"]) ? `@${msg["from"]["username"]}` : "";
            var from_language_code = msg["from"]["language_code"] ?? "id";
            var mention_from_markdown = `[${from_full_name}](tg://user?id=${user_id})`;
            var mention_from_html = `<a href='tg://user?id=${user_id}'>${from_full_name}</a>`;
            var get_data_sheet = false;
            var get_data_state = false;

            try {
                if (text == "/start") {
                    var parameter_message = {
                        "chat_id": chat_id,
                        "text": `Hai ${mention_from_html}, Perkenalkan saya adalah robot`,
                        "parse_mode": "html",
                        "reply_markup": {
                            "inline_keyboard": [
                                [
                                    {
                                        "text": "Add Me To Your Group",
                                        "url": `https://t.me/${ctx["update"]["username_bot"]??""}?startgroup=true`
                                    }
                                ]
                            ]
                        }
                    };
                    return request("sendMessage", parameter_message);
                }

                try {
                    get_data_state = db.getValue(chat_id, false);
                } catch (e) {

                }
                // AWAIT REPLY STATE 
                if (get_data_state && typeof get_data_state == "object" && get_data_state["chat_id"] == chat_id && get_data_state["user_id"] == user_id) {
                    if (get_data_state["settings"]) {
                        // hapus pesan message sebelumnya
                        if (get_data_state["message_id"]) {
                            try {
                                request("deleteMessage", {
                                    "chat_id": chat_id,
                                    "message_id": get_data_state["message_id"]
                                });
                            } catch (e) {

                            }
                        }

                        try {

                        } catch (e) {

                            // HAPUS STATE JIKA TIDAK ADA
                            db.delete(chat_id);
                            return request("sendMessage", {
                                "chat_id": chat_id,
                                "text": `State Erorr\n${e["message"]}`,
                                "parse_mode": "html"
                            });
                        }
                    }
                    // HAPUS STATE JIKA TIDAK ADA
                    db.delete(chat_id);
                    return request("sendMessage", {
                        "chat_id": chat_id,
                        "text": `Maaf state tidak ada di database tolong ulangin lagi ya!`,
                        "parse_mode": "html"
                    });
                }

                // MENGAMBIL DATA DARI DATABASE SHEETS
                try {
                    get_data_sheet = getRow(range_name, chat_id);
                } catch (e) {

                }

                if (get_data_sheet && typeof get_data_sheet == "object") {

                }

            } catch (e) {
                return request("sendMessage", {
                    "chat_id": chat_id,
                    "text": JSON.stringify(e, null, 2)
                });
            }
        }
    }
});

```
