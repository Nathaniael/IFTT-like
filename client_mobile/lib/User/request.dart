import 'package:flutter/material.dart';
import 'package:client_mobile/User/types.dart';
import 'package:client_mobile/apiprovider.dart';

var session = Session();
var uriProfile = Uri.parse('http://pantharea.fun:8080/user/profile/');
var uriGetAreas = Uri.parse('http://pantharea.fun:8080/user/areas/');
var uriDeleteArea = Uri.parse('http://pantharea.fun:8080/areas/delete/');

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
  Profile profile = Profile(username: "Undefined", image: const AssetImage(""));
  return profile;
}

//create List area
List<Area> listarea = [
  Area(
    id: 0,
    action: 'Je suis une belle action sexyyyyyyyyyyyyyyyyyyyyy',
    logoa: const AssetImage('web/png/kilian.png'),
    reaction: 'Moi je peux flex parce que je suis une belle reaction',
    logorea: const AssetImage('web/png/emile.png'),
  ),
];

Future<List<Area>> getAreas() async {
  Response res = await session.get(uriGetAreas);
  List<Area> areas = [];

  print("get");
  if (res.status == Status.success) {
    print(res.data);
    print("\n\n\n\n\n");
    try {
      res.data["error"];
      print("ERROR " + res.data["error"].toString());
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
    print("ERROR UNEXPECTED " + res.message.toString());
    return [];
  }
  print("FINISH");
  return areas;
}

void deleteArea(int id) async {
  DeleteRequest body = DeleteRequest(id);
  Response res = await session.post(uriDeleteArea, body);

  print(res.data);
  print(res.message);
}
