import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/Navbar/navbar.dart';
import 'package:client_mobile/Widgets/bleuradialbackground.dart';

import 'package:client_mobile/User/types.dart';
import 'package:client_mobile/User/card_area.dart';
import 'package:client_mobile/User/request.dart';

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

class _UserpageState extends State<Userpage> {
  bool _isEditingText = false;
  late TextEditingController _editingController;
  Profile _profile = defaultProfile();
  List<Area> _areas = [];

  @override
  void initState() {
    super.initState();
    getProfile().then((profile) => {
          setState(() => {_profile = profile})
        });
    getAreas().then((areas) => {
          setState(() => {_areas = areas})
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
                      itemCount: _areas.length,
                      itemBuilder: (BuildContext context, int index) {
                        return (
                            //dismisse Area
                            Dismissible(
                                key: Key(_areas[index].action),
                                // Provide a function that tells the app
                                // what to do after an item has been swiped away.
                                onDismissed: (direction) {
                                  // Remove the item from the data source.
                                  deleteArea(_areas[index].id);
                                  setState(() {
                                    _areas.removeAt(index);
                                  });
                                  // Then show a snackbar.
                                  ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                          content: Text('Area deleted')));
                                },
                                child: CardArea(area: _areas[index])));
                      }),
                ),
              ),
            ],
          ),
          onPressed: onPressedBackground,
        ));
  }
}
