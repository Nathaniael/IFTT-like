// ignore_for_file: deprecated_member_use

import 'package:client_mobile/Widgets/BleuRadialBackground.dart';
import 'package:client_mobile/Widgets/Navbar/Navbar.dart';
import 'package:flutter/material.dart';

class ServicesPage extends StatefulWidget {
  const ServicesPage({Key? key}) : super(key: key);

  @override
  State<ServicesPage> createState() => _ServicesPageState();
}

void onPressedBackground(context) {
  Navigator.pushNamed(context, '/');
}

class _ServicesPageState extends State<ServicesPage> {
  var isLongPress = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Navbar(context: context),
        body: BleuRadialBackground(
          child: Column(children: <Widget>[
            Container(
                height: 120.0,
                width: 120.0,
                decoration: const BoxDecoration(
                    image: DecorationImage(
                  image: AssetImage('web/png/emile.png'),
                  fit: BoxFit.fill,
                ))),
            FlatButton(
                height: 100.0,
                padding: const EdgeInsets.all(100),
                onPressed: () {
                  print('I got clicked' + isLongPress.toString());
                  isLongPress = false;
                },
                onLongPress: () {
                  print('I got LONG clicked' + isLongPress.toString());
                  isLongPress = true;
                  // const Text('Login',
                  // style: TextStyle(color: Colors.white, fontSize: 25));
                },
                child: isLongPress
                    ? const Text('Login',
                        style: TextStyle(color: Colors.white, fontSize: 25))
                    : Image.asset('web/png/emile.png'))
          ]),
          onPressed: onPressedBackground,
        ));
  }
}
