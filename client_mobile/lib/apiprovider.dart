import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

enum Status { success, error }

class Response {
  Status status;
  String? message;
  Map<String, dynamic>? data;

  Response({required this.status, this.data, this.message});
}

class Session {
  static final Session _session = Session._internal();

  factory Session() {
    return _session;
  }
  Session._internal();

  Map<String, String> headers = {};

  void updateCookie(http.Response response) {
    String rawCookie = response.headers['set-cookie'].toString();
    int index = rawCookie.indexOf(';');
    headers['cookie'] =
        (index == -1) ? rawCookie : rawCookie.substring(0, index);
  }

  Future<Response> get(Uri url) async {
    http.Response response;
    try {
      response = await http.get(url, headers: headers);
    } on SocketException {
      return Response(status: Status.error, message: "Unexpected error");
    }
    return Response(status: Status.success, data: json.decode(response.body));
  }

  Future<Response> post(Uri url, dynamic body) async {
    http.Response response;
    print(body.toJson());
    try {
      response = await http.post(url, headers: headers, body: body.toJson());
    } on Exception {
      return Response(status: Status.error, message: "Unexpected error");
    }
    return Response(status: Status.success, data: json.decode(response.body));
  }

  Future<Map> getWithCookies(Uri url) async {
    http.Response response = await http.get(url, headers: headers);
    updateCookie(response);
    return json.decode(response.body);
  }

  Future<Map> postWithCookies(Uri url, dynamic data) async {
    http.Response response = await http.post(url, body: data, headers: headers);
    updateCookie(response);
    return json.decode(response.body);
  }
}
