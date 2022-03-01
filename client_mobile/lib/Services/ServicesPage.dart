// ignore_for_file: deprecated_member_use, unnecessary_const

import 'package:client_mobile/Widgets/BleuRadialBackground.dart';
import 'package:client_mobile/Widgets/Navbar/Navbar.dart';
import 'package:flutter/material.dart';

class ServicesPage extends StatefulWidget {
  const ServicesPage({Key? key}) : super(key: key);

  @override
  State<ServicesPage> createState() => _ServicesPageState();
}

void onPressedBackground(context) {
  Navigator.pushNamed(context, '/services');
}

// ListView list() {
//   return (ListView(padding: EdgeInsets.all(5), children: <Widget>[
//     Container(padding: EdgeInsets.all(5)),
//     ListTile(
//       leading: GestureDetector(
//         behavior: HitTestBehavior.translucent,
//         onTap: () {},
//         child: Container(
//             height: 150.0,
//             width: 150.0,
//             decoration: const BoxDecoration(
//                 image: DecorationImage(
//               image: AssetImage('web/png/emile.png'),
//               fit: BoxFit.fill,
//             ))),
//       ),
//       title: const Text('Map'),
//     ),
//     const ListTile(
//       leading: Icon(Icons.photo_album),
//       title: Text('Album'),
//     ),
//     const ListTile(
//       leading: Icon(Icons.phone),
//       title: Text('Phone'),
//     ),
//   ]));
// }

final List dummyList = List.generate(10, (index) {
  return {
    "id": index,
    "title": "This is the title $index",
    "subtitle": "This is the subtitle $index"
  };
});

class _ServicesPageState extends State<ServicesPage> {
  var isLongPress = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Navbar(context: context),
        body: BleuRadialBackground(
          child: ListView.builder(
            itemCount: dummyList.length,
            itemBuilder: (context, index) => Container(
                height: 150,
                child: Card(
                  elevation: 6,
                  margin: EdgeInsets.all(10),
                  child: ListTile(
                    leading: GestureDetector(
                        behavior: HitTestBehavior.translucent,
                        onTap: () {},
                        child: Container(
                            height: 150.0,
                            width: 150.0,
                            decoration: const BoxDecoration(
                                image: DecorationImage(
                              image: AssetImage('web/png/emile.png'),
                            )))),
                    title: Text(dummyList[index]["title"]),
                    subtitle: Text(dummyList[index]["subtitle"]),
                    trailing: Icon(Icons.add_a_photo),
                  ),
                )),
          ),
          // <Widget>[

          // Container(
          //     height: 120.0,
          //     width: 120.0,
          //     decoration: const BoxDecoration(
          //         image: DecorationImage(
          //       image: AssetImage('web/png/emile.png'),
          //       fit: BoxFit.fill,
          //     ))),
          // FlatButton(
          //     height: 100.0,
          //     padding: const EdgeInsets.all(100),
          //     onPressed: () {
          //       print('I got clicked' + isLongPress.toString());
          //       isLongPress = false;
          //     },
          //     onLongPress: () {
          //       print('I got LONG clicked' + isLongPress.toString());
          //       isLongPress = true;
          //       // const Text('Login',
          //       // style: TextStyle(color: Colors.white, fontSize: 25));
          //     },
          //     child: isLongPress
          //         ? const Text('Login',
          //             style: TextStyle(color: Colors.white, fontSize: 25))
          //         : Image.asset('web/png/emile.png'))

          onPressed: onPressedBackground,
        ));
  }
}
