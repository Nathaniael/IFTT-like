import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/bleuradialbackground.dart';
import 'package:client_mobile/Widgets/Text/text_adn.dart';
import 'package:shared_preferences/shared_preferences.dart';

final Future<SharedPreferences> _storage = SharedPreferences.getInstance();

//First page
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  void onPressedBackground(context) async {
    final storage = await _storage;
    print(storage.getBool("logged"));
    if (storage.getBool("logged") == true) {
      Navigator.pushNamed(context, '/area');
    } else {
      print("PAS POSSIBLE");
      Navigator.pushNamed(context, '/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: BleuRadialBackground(
      child: const TextANM("This is Area"),
      onPressed: onPressedBackground,
    ));
  }
}
