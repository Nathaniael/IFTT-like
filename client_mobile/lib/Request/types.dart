import 'package:flutter/material.dart';

const defaultProfileImage = "/baptiste.png";

class LoginRequest {
  final String username;
  final String email;
  final String password;
  final String image;

  LoginRequest(this.username, this.email, this.password,
      {this.image = defaultProfileImage});

  Map toJson() => {
        "username": username,
        "email": email,
        "password": password,
        "image": image
      };
}
