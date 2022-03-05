import 'package:client_mobile/Login/register_page.dart';
import 'package:flutter/material.dart';
import 'Home/home_page.dart';
import 'package:client_mobile/Services/create_area_page.dart';
import 'package:client_mobile/Services/test.dart';
import 'package:client_mobile/Login/login_page.dart';
import 'package:client_mobile/User/user_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(initialRoute: '/', routes: {
      '/': (context) => const HomePage(),
      '/area': (context) => NestedLIstview(),
      '/login': (context) => const LoginPage(),
      '/register': (context) => const RegisterPage(),
      '/profile': (context) => Userpage(),
    });
  }
}
