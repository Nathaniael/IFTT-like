import 'package:flutter/material.dart';

//Navbar: top navbar
class Navbar extends AppBar {
  Navbar({Key? key, required BuildContext context})
      : super(
          key: key,
          actions: <Widget>[
            IconButton(
                icon: const Icon(Icons.account_tree),
                onPressed: () => {Navigator.popAndPushNamed(context, '/area')}),
            IconButton(
                icon: const Icon(Icons.account_box),
                onPressed: () =>
                    {Navigator.popAndPushNamed(context, '/profile')}),
          ],
          backgroundColor: const Color(0xff000D4D),
          title: const Text('Area', style: TextStyle(fontFamily: 'AvenirNext')),
        );
}
