import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/bleuradialbackground.dart';
import 'package:client_mobile/Widgets/Text/text_adn.dart';

//First page
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
