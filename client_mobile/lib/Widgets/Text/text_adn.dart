import 'package:flutter/material.dart';

//Text Widget for home page
class TextANM extends StatelessWidget {
  final String text;
  final Color color;
  final double fontSize;
  final FontWeight fontWeight;

  const TextANM(this.text,
      {Key? key,
      this.color = Colors.white,
      this.fontSize = 40,
      this.fontWeight = FontWeight.normal})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: TextAlign.center,
      style: TextStyle(
          color: color,
          fontSize: fontSize,
          fontWeight: fontWeight,
          fontFamily: 'AvenirNext'),
    );
  }
}
