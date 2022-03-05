import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/Navbar/navbar.dart';

@immutable
class NestedServicesLists extends StatefulWidget {
  const NestedServicesLists({Key? key}) : super(key: key);

  @override
  NestedServicesListsState createState() => NestedServicesListsState();
}

class NestedServicesListsState extends State<NestedServicesLists>
    with TickerProviderStateMixin {
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

  final List<Placeholder> _placeholder = [
    Placeholder(
        name: "Action",
        type: ItemType.action,
        imageProvider: const AssetImage('web/png/baptiste.png'),
        item: Item(
            type: ItemType.none,
            name: "No action",
            description: "",
            id: 1,
            imageProvider: const AssetImage('web/png/baptiste.png'))),
    Placeholder(
        name: "Réaction",
        type: ItemType.reaction,
        imageProvider: const AssetImage('web/png/baptiste.png'),
        item: Item(
            type: ItemType.none,
            name: "No réaction",
            description: "",
            id: 1,
            imageProvider: const AssetImage('web/png/baptiste.png'))),
  ];

  final GlobalKey _draggableKey = GlobalKey();

  void _itemDroppedOnPlaceholderCart({
    required Item item,
    required Placeholder placeholder,
  }) {
    setState(() {
      if (item.type == placeholder.type) placeholder.item = item;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Navbar(context: context),
        backgroundColor: Colors.white,
        body: Column(children: [
          ListView.separated(
            separatorBuilder: (context, index) {
              return const SizedBox(
                height: 12.0,
              );
            },
            shrinkWrap: true,
            itemCount: _services.length,
            itemBuilder: (context, serviceIndex) {
              return Column(
                children: [
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
                                  height: 45,
                                  width: 45),
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
                              child: LongPressDraggable(
                                data: _services[serviceIndex].items[indexItem],
                                dragAnchorStrategy: pointerDragAnchorStrategy,
                                feedback: DraggingListItem(
                                    dragKey: _draggableKey,
                                    photoProvider:
                                        _services[serviceIndex].logo),
                                child: Card(
                                  color: const Color(0xff007EA7),
                                  child: Column(
                                    children: [
                                      Text(
                                        _services[serviceIndex]
                                            .items[indexItem]
                                            .name,
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
                              ));
                        }),
                  ),
                ],
              );
            },
          ),
          Expanded(child: _buildPlaceholderRow())
        ]));
  }

  Widget _buildPlaceholderRow() {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: 8.0,
        vertical: 20.0,
      ),
      child: Row(
        children: _placeholder.map(_buildPlaceholderWithDropZone).toList(),
      ),
    );
  }

  Widget _buildPlaceholderWithDropZone(Placeholder placeholder) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 6.0,
        ),
        child: DragTarget<Item>(
          builder: (context, candidateItems, rejectedItems) {
            return PlaceholderCart(
              hasItem: !(placeholder.item.name == ""),
              highlighted: candidateItems.isNotEmpty,
              placeholder: placeholder,
            );
          },
          onAccept: (item) {
            _itemDroppedOnPlaceholderCart(
              item: item,
              placeholder: placeholder,
            );
          },
        ),
      ),
    );
  }
}

class PlaceholderCart extends StatelessWidget {
  const PlaceholderCart({
    Key? key,
    required this.placeholder,
    this.highlighted = false,
    this.hasItem = false,
  }) : super(key: key);

  final Placeholder placeholder;
  final bool highlighted;
  final bool hasItem;

  @override
  Widget build(BuildContext context) {
    final textColor = highlighted ? Colors.white : Colors.black;

    return Transform.scale(
      scale: highlighted ? 1.075 : 1.0,
      child: Material(
        elevation: highlighted ? 8.0 : 4.0,
        borderRadius: BorderRadius.circular(22.0),
        color: highlighted ? const Color(0xFFF64209) : Colors.white,
        child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 12.0,
              vertical: 24.0,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                ClipOval(
                  child: SizedBox(
                    width: 46,
                    height: 46,
                    child: Image(
                      image: placeholder.imageProvider,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                const SizedBox(height: 8.0),
                Text(
                  placeholder.name,
                  style: Theme.of(context).textTheme.subtitle1?.copyWith(
                        color: textColor,
                        fontWeight:
                            hasItem ? FontWeight.normal : FontWeight.bold,
                      ),
                ),
                Visibility(
                  visible: hasItem,
                  maintainState: true,
                  maintainAnimation: true,
                  maintainSize: true,
                  child: Column(
                    children: [
                      const SizedBox(height: 4.0),
                      Text(
                        placeholder.getItem.name,
                        style: Theme.of(context).textTheme.caption!.copyWith(
                              color: textColor,
                              fontSize: 16.0,
                              fontWeight: FontWeight.bold,
                            ),
                      ),
                      const SizedBox(height: 4.0),
                      Text(
                        placeholder.getItem.description,
                        style: Theme.of(context).textTheme.subtitle1!.copyWith(
                              color: textColor,
                              fontSize: 12.0,
                            ),
                      ),
                    ],
                  ),
                )
              ],
            )),
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
  ItemType type;
  ImageProvider imageProvider;
  Item item;
  Placeholder(
      {required this.name,
      required this.imageProvider,
      required this.item,
      required this.type});
  Item get getItem {
    return item;
  }
}

enum ItemType { action, reaction, none }
