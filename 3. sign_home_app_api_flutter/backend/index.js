// Require the framework and instantiate it
var app = require("fastify").fastify({ logger: true })
var port = process.env.PORT || 3000 || 8080 || 9000;
var host = process.env.HOST || '0.0.0.0';
var list_method = [
    "signin", "signup", "request"
];
var json_data_state = [];
function generateUuid(count = 25) {
    var text = "abcdefghijklmnopqrstuvwxyz1234567890-_";
    var result_text = "";
    while (true) {
        if (result_text.length == count) {
            return result_text;
        } else {
            var get_text = text[Math.floor(Math.random() * text.length)];
            var list_bool = [true, false];
            var random_case = list_bool[Math.floor(Math.random() * list_bool.length)];
            result_text += (random_case) ? String(get_text).toLocaleUpperCase() : get_text;
        }
    }
}
// Declare a route
app.get('/', async (request, reply) => {
    return { hello: 'world' }
})


app.post("/:method", async function (req, res) {
    var { method } = req.params;
    var body = req.body;
    var headers = req.headers;
    var json_respons = {
        "status_bool": true,
        "status_code": 200,
        "result": {}
    };
    if (!list_method.includes(String(method).toLocaleLowerCase())) {
        json_respons["status_code"] = 400;
        json_respons["status_bool"] = false;
        json_respons["message"] = `Method: ${method} Tidak ada di api tolong gunakan api yang ada ya!`;
        return res.code(json_respons["status_code"]).send(json_respons);
    }
    if (!body || typeof body != "object") {
        json_respons["status_code"] = 400;
        json_respons["status_bool"] = false;
        json_respons["message"] = `Tolong tambahkan body json ya!`;
        return res.code(json_respons["status_code"]).send(json_respons);
    }

    if (RegExp("^(signup|signin)$", "i").exec(method)) {
        if (!body["username"]) {
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Tolong tambahkan key username ya!`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }
        if (!body["password"]) {
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Tolong tambahkan key password ya!`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }

        if (typeof body["username"] != "string" || typeof body["password"] != "string") {
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Pastikan format password dan username dalam bentuk string ya`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }
        if (String(body["username"]).length < 5 || String(body["username"]).length > 20) {
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Format username salah tolong isi username min 5 maks 20`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }
        if (String(body["password"]).length < 5 || String(body["password"]).length > 20) {
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Format username salah tolong isi username min 5 maks 20`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }
        if (!RegExp("^[a-z]+$", "i").exec(body["username"])) {
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Format username salah tolong ulangin lagi ya!`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }
        if (RegExp("^signup$", "i").exec(method)) {
            var is_found = false;
            for (var index = 0; index < json_data_state.length; index++) {
                var element = json_data_state[index];
                if (element && typeof element == "object" && element["username"] && element["password"]) {
                    if (RegExp(`^${element["username"]}$`, "i").exec(body["username"])) {
                        is_found = true;
                    }
                }
            }
            if (is_found) {
                json_respons["status_code"] = 400;
                json_respons["status_bool"] = false;
                json_respons["message"] = `Maaf username ini sudah di ambil ${body["username"]}`;
                return res.code(json_respons["status_code"]).send(json_respons);
            } else {
                json_data_state.push({
                    "username": body["username"],
                    "password": body["password"],
                    "devices": []
                });
                json_respons["status_code"] = 200;
                json_respons["status_bool"] = true;
                json_respons["result"]["status"] = `Akun anda berhasil di buat! silahkan login ya`;
                return res.code(json_respons["status_code"]).send(json_respons);
            }
        }
        if (RegExp("^signin$", "i").exec(method)) {
            for (var index = 0; index < json_data_state.length; index++) {
                var element = json_data_state[index];
                if (element && typeof element == "object" && element["username"] && element["password"]) {
                    if (RegExp(`^${element["username"]}$`, "i").exec(body["username"])) {
                        if (body["password"] == element["password"]) {
                            if (typeof element["devices"] != "object") {
                                element["devices"] = [];
                            }
                            var new_device_token = `${String(element["username"]).toLocaleLowerCase()}:${generateUuid(25)}`
                            try {
                                element["devices"].push(new_device_token);
                            } catch (e) {
                                element["devices"] = [new_device_token];
                            }
                            json_respons["result"]["token"] = new_device_token;
                            return res.code(json_respons["status_code"]).send(json_respons);
                        } else {
                            json_respons["status_code"] = 400;
                            json_respons["status_bool"] = false;
                            json_respons["message"] = `Maaf sandi salah!`;
                            return res.code(json_respons["status_code"]).send(json_respons);
                        }
                    }
                }
            }
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Maaf tidak ada account dengan username ${body["username"]} di server kami`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }
    }
    if (RegExp("^request$", "i").exec(method)) {
        if (!headers["token"] || typeof headers["token"] != "string") {
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Tolong masukan token di headers ya!`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }
        var get_token = String(headers["token"]);
        if (get_token.split(":").length != 2) {
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Maaf format token salah!`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }
        var get_username = get_token.split(":")[0];
        if (String(get_username).length < 5 || String(get_username).length > 20) {
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Format username salah tolong isi username min 5 maks 20`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }
        if (!body["id_api"] || typeof body["id_api"] != "string") {
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Tolong masukan id api ya!`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }

        var list_api_methods = [
            "getMe"
        ];
        var is_found_account = false;
        for (var index = 0; index < json_data_state.length; index++) {
            var element = json_data_state[index];
            if (element && typeof element == "object" && element["username"] && element["password"]) {
                if (RegExp(`^${element["username"]}$`, "i").exec(get_username)) {
                    if (typeof element["devices"] != "object") {
                        element["devices"] = [];
                    }
                    if (!element["devices"].includes(get_token)) {
                        json_respons["status_code"] = 400;
                        json_respons["status_bool"] = false;
                        json_respons["message"] = `Maaf token tidak  di temukan di device manapun`;
                        json_respons["action"] = {
                            "type": "setPage",
                            "page": "signin"
                        };
                        return res.code(json_respons["status_code"]).send(json_respons);
                    }
                    is_found_account = true;
                    if (RegExp(`^(${list_api_methods.join("|")})$`, "i").exec(body["id_api"])) {

                        if (RegExp(`^(getMe)$`, "i").exec(body["id_api"])) {
                            var result = element;
                            json_respons["result"] = result;
                            return res.code(json_respons["status_code"]).send(json_respons);
                        }

                    } else {
                        json_respons["status_code"] = 400;
                        json_respons["status_bool"] = false;
                        json_respons["message"] = `Maaf Method ${body['id_api']} Tidak ada di server kami!`;
                        return res.code(json_respons["status_code"]).send(json_respons);

                    }
                }
            }
        }
        if (!is_found_account) {
            json_respons["status_code"] = 400;
            json_respons["status_bool"] = false;
            json_respons["message"] = `Maaf tidak ada account dengan username ${get_username} di server kami`;
            return res.code(json_respons["status_code"]).send(json_respons);
        }

    }
    json_respons["result"]["methods"] = method;
    json_respons["result"]["body"] = body;
    return res.code(json_respons["status_code"]).send(json_respons);
});


// Run the server!
const start = async () => {
    try {
        app.listen({ "port": port, "host": host });
        console.log(`Server run on port: http://localhost:${port}`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start();