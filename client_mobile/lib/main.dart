import 'package:client_mobile/Login/LoginPage.dart';
import 'package:flutter/material.dart';
import 'Home/HomePage.dart';
import 'package:client_mobile/Services/ServicesPage.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(initialRoute: '/', routes: {
      '/': (context) => const HomePage(),
      '/services': (context) => const ServicesPage(),
      '/profile': (context) => const ServicesPage(),
      '/login': (context) => const LoginPage(),
    });
  }
}
