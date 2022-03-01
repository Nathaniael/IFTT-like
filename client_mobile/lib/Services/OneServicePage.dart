import 'package:client_mobile/Widgets/BleuRadialBackground.dart';
import 'package:client_mobile/Widgets/Navbar/Navbar.dart';
import 'package:client_mobile/Widgets/Text/TextADN.dart';
import 'package:flutter/material.dart';

class Oneservicepage extends StatefulWidget {
  const Oneservicepage({Key? key}) : super(key: key);

  @override
  _OneservicepageState createState() => _OneservicepageState();
}

void onPressedBackground(context) {
  Navigator.pushNamed(context, '/services');
}

class _OneservicepageState extends State<Oneservicepage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Navbar(context: context),
        body: const BleuRadialBackground(
          child: TextANM("This is One SERVICE bitches"),
          onPressed: onPressedBackground,
        ));
  }
}
