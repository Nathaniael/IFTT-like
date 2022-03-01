import 'package:flutter/material.dart';

class Navbar extends AppBar {
  Navbar({Key? key, required BuildContext context})
      : super(
          key: key,
          actions: <Widget>[
            IconButton(
                icon: const Icon(Icons.account_tree),
                onPressed: () =>
                    {Navigator.popAndPushNamed(context, '/services')}),
            IconButton(
                icon: const Icon(Icons.account_box),
                onPressed: () =>
                    {Navigator.popAndPushNamed(context, '/profile')}),
            IconButton(
                icon: const Icon(Icons.manage_accounts),
                onPressed: () =>
                    {Navigator.popAndPushNamed(context, '/login')}),
          ],
          backgroundColor: Colors.black87,
          title: const Text('Area'),
        );
}
