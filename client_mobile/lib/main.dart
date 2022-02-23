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
      '/login': (context) => const ServicesPage(),
    });
  }
}
