import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/Navbar/navbar.dart';
import 'package:client_mobile/Widgets/bleuradialbackground.dart';

class Userpage extends StatefulWidget {
  const Userpage({Key? key}) : super(key: key);

  @override
  _UserpageState createState() => _UserpageState();
}

void onPressedBackground(context) {
  Navigator.popAndPushNamed(context, '/area');
}

List<Area> _area = [
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
  )
];

// final items = List<Area>.generate(
//   _area.length,
//   (i) => i % 6 == 0
//       ? HeadingItem('Heading $i')
//       : MessageItem('Sender $i', 'Message body $i'),
// );

class _UserpageState extends State<Userpage> {
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
                  child: Container(
                    width: double.infinity,
                    height: 350.0,
                    child: Center(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const CircleAvatar(
                            backgroundImage: AssetImage('web/png/baptiste.png'),
                            radius: 50.0,
                          ),
                          const SizedBox(
                            height: 10.0,
                          ),
                          const Text(
                            "NAME ICI MGL",
                            style: TextStyle(
                              fontSize: 22.0,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(
                            height: 40.0,
                          ),
                          TextButton(
                            onPressed: () {},
                            child: const Text(
                              'Logout',
                              style: TextStyle(
                                fontSize: 22.0,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  )),
              Padding(
                padding: const EdgeInsets.symmetric(
                    vertical: 30.0, horizontal: 16.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Card(
                      margin: const EdgeInsets.symmetric(
                          horizontal: 20.0, vertical: 5.0),
                      clipBehavior: Clip.antiAlias,
                      color: Colors.white,
                      elevation: 5.0,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8.0, vertical: 22.0),
                        child: Row(
                          children: [
                            Expanded(
                              child: Column(
                                children: const [
                                  Text(
                                    "Action",
                                    style: TextStyle(
                                      color: Color(0xff000D4D),
                                      fontSize: 22.0,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  SizedBox(
                                    height: 5.0,
                                  ),
                                  Text(
                                    "Je suis une belle action sexy",
                                    style: TextStyle(
                                      fontSize: 20.0,
                                      color: Color(0xff007EA7),
                                    ),
                                  )
                                ],
                              ),
                            ),
                            Expanded(
                              child: Column(
                                children: const [
                                  Text(
                                    "Reaction",
                                    style: TextStyle(
                                      color: Color(0xff000D4D),
                                      fontSize: 22.0,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  SizedBox(
                                    height: 5.0,
                                  ),
                                  Text(
                                    "Moi je peux flex parce que je suis une belle reaction",
                                    style: TextStyle(
                                      fontSize: 20.0,
                                      color: Color(0xff007EA7),
                                    ),
                                  )
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height: 20.0,
              ),
            ],
          ),
          onPressed: onPressedBackground,
        ));
  }
}

class Area {
  int id;
  String action;
  ImageProvider logoa;
  String reaction;
  ImageProvider logorea;
  Area({
    required this.id,
    required this.action,
    required this.logoa,
    required this.reaction,
    required this.logorea,
  });
  ImageProvider get getLogo {
    return logoa;
  }
}
