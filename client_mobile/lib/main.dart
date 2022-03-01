import 'package:client_mobile/Login/RegisterPage.dart';
import 'package:client_mobile/Services/OneServicePage.dart';
import 'package:flutter/material.dart';
import 'Home/HomePage.dart';
import 'package:client_mobile/Services/ServicesPage.dart';
import 'package:client_mobile/Login/LoginPage.dart';

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
      '/profile': (context) => const Oneservicepage(),
      '/login': (context) => LoginPage(),
      '/register': (context) => RegisterPage(),
    });
  }
}
