import 'package:flutter/material.dart';

//Text Widget for home page
class TextANM extends StatelessWidget {
  final String text;

  const TextANM(this.text, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: TextAlign.center,
      style: const TextStyle(
          color: Colors.white, fontSize: 40, fontFamily: 'AvenirNext'),
    );
  }
}
