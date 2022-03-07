import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

//enum Status possible
enum Status { success, error }

//class info response request
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

//function to update cookie
  void updateCookie(http.Response response) {
    String rawCookie = response.headers['set-cookie'].toString();
    int index = rawCookie.indexOf(';');
    headers['cookie'] =
        (index == -1) ? rawCookie : rawCookie.substring(0, index);
  }

//function to Get with url
  Future<Response> get(Uri url, {bool getCookies = false}) async {
    http.Response response;
    try {
      response = await http.get(url, headers: headers);
    } on SocketException {
      return Response(status: Status.error, message: "Unexpected error");
    }
    if (getCookies) {
      updateCookie(response);
    }
    return Response(status: Status.success, data: json.decode(response.body));
  }

  Future<Response> delete(Uri url, {bool getCookies = false}) async {
    http.Response response;
    try {
      response = await http.delete(url, headers: headers);
    } on SocketException {
      return Response(status: Status.error, message: "Unexpected error");
    }
    if (getCookies) {
      updateCookie(response);
    }
    print(response.body);
    return Response(status: Status.success, data: json.decode(response.body));
  }

//function to Post with url
  Future<Response> post(Uri url, dynamic body,
      {bool getCookies = false}) async {
    print("OK");
    print(body.toJson());
    http.Response response;
    headers["content-type"] = "application/json";
    try {
      response = await http.post(url,
          headers: headers, body: json.encode(body.toJson()));
      print("OK");
    } on Exception catch (e) {
      print("Unexpected error");
      return Response(status: Status.error, message: "Unexpected error");
    }
    if (response.statusCode >= 400) {
      print(json.decode(response.body)["message"]);
      return Response(
          status: Status.error, message: json.decode(response.body)["message"]);
    }
    if (getCookies) {
      updateCookie(response);
    }
    return Response(status: Status.success, data: json.decode(response.body));
  }
}
