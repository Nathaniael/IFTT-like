import 'package:flutter/material.dart';

//class area
class Area {
  int id;
  String action;
  ImageProvider logoa;
  String reaction;
  ImageProvider logorea;
  Area({
    required this.id,
    required this.action,
    required this.logoa,
    required this.reaction,
    required this.logorea,
  });
  ImageProvider get getLogo {
    return logoa;
  }
}

class Profile {
  String username;
  ImageProvider image;

  Profile({
    required this.username,
    required this.image,
  });
}
