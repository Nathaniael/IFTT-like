import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/BleuRadialBackground.dart';
import 'package:client_mobile/Widgets/Text/TextADN.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  void onPressedBackground(context) {
    Navigator.pushNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: BleuRadialBackground(
      child: const TextANM("This is Area"),
      onPressed: onPressedBackground,
    ));
  }
}
