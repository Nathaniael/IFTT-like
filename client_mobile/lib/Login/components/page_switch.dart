import 'package:flutter/material.dart';

class PageSwitch extends StatelessWidget {
  final String labelText;
  final String path;

  const PageSwitch({Key? key, required this.labelText, required this.path})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return (Container(
      alignment: Alignment.centerRight,
      margin: const EdgeInsets.symmetric(horizontal: 40, vertical: 10),
      child: GestureDetector(
        onTap: () => {Navigator.popAndPushNamed(context, path)},
        child: Text(
          labelText,
          style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: Color(0xff007EA7)),
        ),
      ),
    ));
  }
}
