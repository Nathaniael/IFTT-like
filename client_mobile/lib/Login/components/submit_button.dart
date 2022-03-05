import 'package:flutter/material.dart';

ButtonStyle resetStyle() {
  return (ElevatedButton.styleFrom(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(80.0)),
      padding: const EdgeInsets.all(0)));
}

class SubmitButton extends StatelessWidget {
  final String labelText;

  const SubmitButton({Key? key, required this.labelText}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return (Container(
      alignment: Alignment.center,
      height: 50.0,
      width: size.width * 0.5,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(80.0),
          gradient: const LinearGradient(colors: [
            Color(0xff007EA7),
            Color(0xff000D4D),
          ])),
      padding: const EdgeInsets.all(0),
      child: Text(
        labelText,
        textAlign: TextAlign.center,
        style:
            const TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
      ),
    ));
  }
}
