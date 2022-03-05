import 'package:flutter/material.dart';

class LoginRequest {
  final String username;
  final String email;
  final String password;
  final String image;

  LoginRequest(this.username, this.email, this.password, this.image);

  Map toJson() => {
        "username": username,
        "email": email,
        "password": password,
        "image": image
      };
}
