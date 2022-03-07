import 'package:flutter/material.dart';
import 'package:client_mobile/User/types.dart';
import 'package:client_mobile/apiprovider.dart';
import 'package:shared_preferences/shared_preferences.dart';

var session = Session();
var uriProfile = Uri.parse('http://pantharea.fun:8080/user/profile/');
var uriGetAreas = Uri.parse('http://pantharea.fun:8080/user/areas/');
var uriDeleteArea = Uri.parse('http://pantharea.fun:8080/areas/delete/');
var uriDeleteAccount = Uri.parse('http://pantharea.fun:8080/user/');

final Future<SharedPreferences> _storage = SharedPreferences.getInstance();

Future<Profile> getProfile() async {
  Response res = await session.get(uriProfile);

  if (res.status == Status.success) {
    Profile profile = Profile(
        username: res.data["username"],
        image: AssetImage("web/png" + res.data["image"]));
    return profile;
  } else {
    Profile profile = defaultProfile();
    return profile;
  }
}

Profile defaultProfile() {
  Profile profile = Profile(
      username: "Undefined", image: const AssetImage("web/png/newbie.png"));
  return profile;
}

Future<List<Area>> getAreas() async {
  Response res = await session.get(uriGetAreas);
  List<Area> areas = [];

  if (res.status == Status.success) {
    try {
      res.data["error"];
      return [];
    } catch (e) {}
    for (var elem in res.data) {
      Area toPush = Area(
          id: elem["id"],
          action: elem["action"]["name"],
          logoa: AssetImage("web/png" + elem["action"]["service"]["logo"]),
          reaction: elem["reaction"]["name"],
          logorea: AssetImage("web/png" + elem["reaction"]["service"]["logo"]));
      areas.add(toPush);
    }
  } else {
    return [];
  }
  return areas;
}

void deleteArea(int id) async {
  DeleteRequest body = DeleteRequest(id);
  Response res = await session.post(uriDeleteArea, body);
}

void deleteAccount(BuildContext context) async {
  final storage = await _storage;
  Response res = await session.delete(uriDeleteAccount);
  storage.setBool("logged", false);
  Navigator.popUntil(context, ModalRoute.withName("/"));
}
