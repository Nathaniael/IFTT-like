import 'package:flutter/material.dart';

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
  ImageProvider image;
  Item(
      {required this.type,
      required this.name,
      required this.description,
      required this.id,
      required this.image});
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

enum ItemType { action, reaction, none }
