import 'package:flutter/material.dart';

class TitlePage extends StatelessWidget {
  final String labelText;

  const TitlePage({Key? key, required this.labelText}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return (Container(
      alignment: Alignment.centerLeft,
      padding: EdgeInsets.symmetric(
          horizontal: size.width * 0.1, vertical: size.height * 0.03),
      child: Text(
        labelText,
        style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: Color(0xff007EA7),
            fontSize: 36),
        textAlign: TextAlign.left,
      ),
    ));
  }
}
