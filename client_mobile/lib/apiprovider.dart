import 'dart:convert';
import 'package:http/http.dart' as http;

class Session {
  static final Session _session = Session._internal();

  factory Session() {
    return _session;
  }
  Session._internal();

  Map<String, String> headers = {};

  Future<Map> get(Uri url) async {
    http.Response response = await http.get(url, headers: headers);
    updateCookie(response);
    return json.decode(response.body);
  }

  Future<Map> post(Uri url, dynamic data) async {
    http.Response response = await http.post(url, body: data, headers: headers);
    updateCookie(response);
    return json.decode(response.body);
  }

  void updateCookie(http.Response response) {
    String rawCookie = response.headers['set-cookie'].toString();
    int index = rawCookie.indexOf(';');
    headers['cookie'] =
        (index == -1) ? rawCookie : rawCookie.substring(0, index);
  }
}
