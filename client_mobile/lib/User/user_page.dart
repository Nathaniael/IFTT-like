import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/Navbar/navbar.dart';
import 'package:client_mobile/Widgets/bleuradialbackground.dart';
import 'package:client_mobile/apiprovider.dart';

import 'package:client_mobile/User/types.dart';
import 'package:client_mobile/User/card_area.dart';

var session = Session();
var uriProfile = Uri.parse('http://pantharea.fun:8080/user/profile/');

//create List area
List<Area> listarea = [
  Area(
    id: 0,
    action: 'Je suis une belle action sexyyyyyyyyyyyyyyyyyyyyy',
    logoa: const AssetImage('web/png/kilian.png'),
    reaction: 'Moi je peux flex parce que je suis une belle reaction',
    logorea: const AssetImage('web/png/emile.png'),
  ),
  Area(
    id: 1,
    action: 'Je suis une belle action sexy',
    logoa: const AssetImage('web/png/kilian.png'),
    reaction: 'Moi je peux flex parce que je suis une belle reaction',
    logorea: const AssetImage('web/png/emile.png'),
  ),
  Area(
    id: 2,
    action: 'je suis pas aussi beau mais quand meme',
    logoa: const AssetImage('web/png/github.png'),
    reaction: 'Moi je peux flex par contre je suis une sacré reaction',
    logorea: const AssetImage('web/png/kilian.png'),
  ),
  Area(
    id: 3,
    action: 'Je suis une belle action sexyyyyyyyyyyyyyyyyyyyyy',
    logoa: const AssetImage('web/png/kilian.png'),
    reaction: 'Moi je peux flex parce que je suis une belle reaction',
    logorea: const AssetImage('web/png/emile.png'),
  ),
  Area(
    id: 4,
    action: 'Je suis une belle action sexy',
    logoa: const AssetImage('web/png/kilian.png'),
    reaction: 'Moi je peux flex parce que je suis une belle reaction',
    logorea: const AssetImage('web/png/emile.png'),
  ),
  Area(
    id: 5,
    action: 'je suis pas aussi beau mais quand meme',
    logoa: const AssetImage('web/png/github.png'),
    reaction: 'Moi je peux flex par contre je suis une sacré reaction',
    logorea: const AssetImage('web/png/kilian.png'),
  )
];

class Userpage extends StatefulWidget {
  final List<Area> area = listarea;
  Userpage({Key? key}) : super(key: key);

  @override
  _UserpageState createState() => _UserpageState();
}

//function of background
void onPressedBackground(context) {
  Navigator.popAndPushNamed(context, '/area');
}

Profile defaultProfile() {
  Profile profile = Profile(username: "Undefined", image: const AssetImage(""));
  return profile;
}

class _UserpageState extends State<Userpage> {
  bool _isEditingText = false;
  late TextEditingController _editingController;
  Profile _profile = defaultProfile();

  Future<Profile> getProfile() async {
    Response res = await session.get(uriProfile);

    if (res.status == Status.success) {
      Profile profile = Profile(
          username: res.data["username"], image: AssetImage(res.data["image"]));
      return profile;
    } else {
      Profile profile = defaultProfile();
      return profile;
    }
  }

  @override
  void initState() {
    super.initState();
    getProfile().then((profile) => {
          setState(() => {_profile = profile})
        });
    _editingController = TextEditingController(text: _profile.username);
  }

  @override
  void dispose() {
    _editingController.dispose();
    super.dispose();
  }

//edit text
  Widget _editTitleTextField() {
    if (_isEditingText) {
      return Center(
        child: TextField(
          onSubmitted: (newValue) {
            setState(() {
              _profile.username = newValue;
              _isEditingText = false;
            });
          },
          autofocus: true,
          controller: _editingController,
        ),
      );
    }
    return InkWell(
        onTap: () {
          setState(() {
            _isEditingText = true;
          });
        },
        child: Text(
          _profile.username,
          style: const TextStyle(
            fontFamily: 'AvenirNext',
            color: Colors.white,
            fontSize: 30.0,
          ),
        ));
  }

  List<Area> insharea = listarea;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Navbar(context: context),
        body: BleuRadialBackground(
          child: Column(
            children: [
              Container(
                  decoration: const BoxDecoration(
                      gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                        Color(0xff007EA7),
                        Color(0xff000D4D),
                      ])),
                  child: SizedBox(
                    width: double.infinity,
                    height: 350.0,
                    child: Center(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          // profile Info display
                          CircleAvatar(
                            backgroundImage: _profile.image,
                            radius: 50.0,
                          ),
                          const SizedBox(
                            height: 10.0,
                          ),
                          _editTitleTextField(),
                          const SizedBox(
                            height: 40.0,
                          ),
                          TextButton(
                            onPressed: () {},
                            child: const Text(
                              'Logout',
                              style: TextStyle(
                                fontFamily: 'AvenirNext',
                                fontSize: 22.0,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  )),
              //Area List display
              Expanded(
                child: Container(
                  padding: const EdgeInsets.fromLTRB(0, 5, 0, 0),
                  margin: const EdgeInsets.all(10),
                  child: ListView.builder(
                      itemCount: insharea.length,
                      itemBuilder: (BuildContext context, int index) {
                        return (
                            //dismisse Area
                            Dismissible(
                                key: Key(insharea[index].action),
                                // Provide a function that tells the app
                                // what to do after an item has been swiped away.
                                onDismissed: (direction) {
                                  // Remove the item from the data source.
                                  setState(() {
                                    insharea.removeAt(index);
                                  });

                                  // Then show a snackbar.
                                  ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                          content: Text('dismissed')));
                                },
                                child: CardArea(area: insharea[index])));
                      }),
                ),
              ),
            ],
          ),
          onPressed: onPressedBackground,
        ));
  }
}
