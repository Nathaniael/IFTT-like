import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/Navbar/navbar.dart';
import 'package:client_mobile/Widgets/bleuradialbackground.dart';

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
  List<Area> area = listarea;
  Userpage({Key? key}) : super(key: key);

  @override
  _UserpageState createState() => _UserpageState();
}

void onPressedBackground(context) {
  Navigator.popAndPushNamed(context, '/area');
}

class CardArea extends StatelessWidget {
  final Area area;
  const CardArea({Key? key, required this.area}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 5.0),
      clipBehavior: Clip.antiAlias,
      color: Colors.white,
      elevation: 5.0,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 22.0),
        child: Row(
          children: [
            Expanded(
              child: Column(
                children: [
                  const Text(
                    "Action",
                    style: TextStyle(
                      color: Color(0xff000D4D),
                      fontSize: 22.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(
                    height: 5.0,
                  ),
                  CircleAvatar(backgroundImage: area.logoa),
                  Text(
                    area.action,
                    style: const TextStyle(
                      fontSize: 20.0,
                      color: Color(0xff007EA7),
                    ),
                  )
                ],
              ),
            ),
            Expanded(
              child: Column(
                children: [
                  const Text(
                    "Reaction",
                    style: TextStyle(
                      color: Color(0xff000D4D),
                      fontSize: 22.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(
                    height: 5.0,
                  ),
                  CircleAvatar(backgroundImage: area.logorea),
                  Text(
                    area.reaction,
                    style: const TextStyle(
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
    );
  }
}

class _UserpageState extends State<Userpage> {
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
              Expanded(
                child: Container(
                  padding: const EdgeInsets.fromLTRB(0, 5, 0, 0),
                  margin: const EdgeInsets.all(10),
                  child: ListView.builder(
                      itemCount: insharea.length,
                      itemBuilder: (BuildContext context, int index) {
                        return (Dismissible(
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
                                  const SnackBar(content: Text('dismissed')));
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
