import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/Navbar/navbar.dart';

class NestedLIstview extends StatelessWidget {
  NestedLIstview({Key? key}) : super(key: key);

  final List<Service> _services = [
    Service(
        id: 1,
        name: 'Github',
        logo: const AssetImage('web/png/github.png'),
        items: <Item>[
          Item(
              type: ItemType.action,
              name: 'Push event',
              description: 'Trigger a reaction when a new push occurs',
              id: 1,
              imageProvider: const AssetImage('web/png/baptiste.png'))
        ]),
    Service(
        id: 2,
        name: 'Email',
        logo: const AssetImage('web/png/mail.png'),
        items: <Item>[
          Item(
              type: ItemType.reaction,
              name: 'Send an email',
              description: 'Send a customizable email',
              id: 1,
              imageProvider: const AssetImage('web/png/baptiste.png'))
        ]),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Navbar(context: context),
      backgroundColor: Colors.white,
      body: ListView.separated(
        separatorBuilder: (context, index) {
          return const SizedBox(
            height: 12.0,
          );
        },
        shrinkWrap: true,
        itemCount: _services.length,
        itemBuilder: (context, serviceIndex) {
          return Column(children: [
            Container(
                width: double.infinity,
                padding: const EdgeInsets.all(4),
                margin: const EdgeInsets.only(left: 8, top: 8, right: 8),
                child: Card(
                    color: const Color(0xff000D4D),
                    child: Row(
                      children: [
                        Image(
                            image: _services[serviceIndex].logo,
                            height: 50,
                            width: 50),
                        Text(
                          _services[serviceIndex].name,
                          style: const TextStyle(
                              fontSize: 24, color: Colors.white),
                        ),
                      ],
                    ))),
            Container(
              color: Colors.white,
              margin: const EdgeInsets.only(left: 8, right: 8),
              height: 150,
              child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _services[serviceIndex].items.length,
                  itemBuilder: (context, indexItem) {
                    return Padding(
                      padding: const EdgeInsets.all(2.0),
                      child: Card(
                        color: const Color(0xff007EA7),
                        child: Column(
                          children: [
                            Text(
                              _services[serviceIndex].items[indexItem].name,
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 22.0,
                              ),
                            ),
                            SizedBox(
                                width: 100,
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Center(
                                    child: Text(
                                        _services[serviceIndex]
                                            .items[indexItem]
                                            .description,
                                        style: const TextStyle(
                                          color: Colors.white,
                                        )),
                                  ),
                                ))
                          ],
                        ),
                      ),
                    );
                  }),
            ),
          ]);
        },
      ),
    );
  }
}

class DraggingListItem extends StatelessWidget {
  const DraggingListItem({
    Key? key,
    required this.dragKey,
    required this.photoProvider,
  }) : super(key: key);

  final GlobalKey dragKey;
  final ImageProvider photoProvider;

  @override
  Widget build(BuildContext context) {
    return FractionalTranslation(
      translation: const Offset(-0.5, -0.5),
      child: ClipRRect(
        key: dragKey,
        borderRadius: BorderRadius.circular(12.0),
        child: SizedBox(
          height: 150,
          width: 150,
          child: Opacity(
            opacity: 0.85,
            child: Image(
              image: photoProvider,
              fit: BoxFit.cover,
            ),
          ),
        ),
      ),
    );
  }
}

class Item {
  ItemType type;
  String name;
  String description;
  int id;
  ImageProvider imageProvider;
  Item(
      {required this.type,
      required this.name,
      required this.description,
      required this.id,
      required this.imageProvider});
}

class Service {
  int id;
  String name;
  ImageProvider logo;
  List<Item> items;
  Service(
      {required this.id,
      required this.name,
      required this.logo,
      required this.items});
  ImageProvider get getLogo {
    return logo;
  }
}

class Placeholder {
  String name;
  ImageProvider imageProvider;
  Item item;
  Placeholder(
      {required this.name, required this.imageProvider, required this.item});
  Item get getItem {
    return item;
  }
}

enum ItemType { action, reaction, none }
