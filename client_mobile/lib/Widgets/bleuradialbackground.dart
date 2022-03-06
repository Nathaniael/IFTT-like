// ignore_for_file: file_names

import 'package:flutter/material.dart';

//backgroun for all page until login and register
class BleuRadialBackground extends StatelessWidget {
  final Widget child;
  final Function onPressed;

  const BleuRadialBackground(
      {Key? key, required this.child, required this.onPressed})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return (GestureDetector(
        onTap: () => {onPressed(context)},
        child: Container(
          alignment: Alignment.center,
          decoration: const BoxDecoration(
              gradient: RadialGradient(
            radius: 1.3,
            colors: [
              Color(0xff007EA7),
              Color(0xff000D4D),
            ],
          )),
          child: child,
        )));
  }
}
