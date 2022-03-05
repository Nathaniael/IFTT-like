import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

enum Status { success, error }

class Response {
  Status status;
  String? message;
  dynamic data;

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
    updateCookie(response);
    return Response(status: Status.success, data: json.decode(response.body));
  }

  Future<Response> post(Uri url, dynamic body) async {
    http.Response response;
    try {
      response = await http.post(url, headers: headers, body: body.toJson());
    } on Exception {
      return Response(status: Status.error, message: "Unexpected error");
    }
    if (response.statusCode >= 400) {
      return Response(
          status: Status.error, message: json.decode(response.body)["message"]);
    }
    updateCookie(response);
    return Response(status: Status.success, data: json.decode(response.body));
  }
}
