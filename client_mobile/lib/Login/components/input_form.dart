import 'package:flutter/material.dart';

class InputForm extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;
  final bool obscure;

  const InputForm(
      {Key? key,
      required this.controller,
      required this.labelText,
      this.obscure = false})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return (Container(
      alignment: Alignment.center,
      margin: EdgeInsets.symmetric(
          horizontal: size.width * 0.1, vertical: size.height * 0.01),
      child: TextField(
        obscureText: obscure,
        controller: controller,
        decoration: InputDecoration(labelText: labelText),
      ),
    ));
  }
}
