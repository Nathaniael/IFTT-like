import 'package:flutter/material.dart';

const defaultProfileImage = "/newbie.png";

// register Info
class RegisterRequest {
  final String username;
  final String email;
  final String password;
  final String image;

  RegisterRequest(this.username, this.email, this.password,
      {this.image = defaultProfileImage});

  Map toJson() => {
        "username": username,
        "email": email,
        "password": password,
        "image": image
      };
}

// Login Info
class LoginRequest {
  final String email;
  final String password;

  LoginRequest(this.email, this.password);

  Map toJson() => {
        "email": email,
        "password": password,
      };
}
