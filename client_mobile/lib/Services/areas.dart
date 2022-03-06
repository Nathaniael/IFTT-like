import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/Navbar/navbar.dart';
import 'package:client_mobile/apiprovider.dart';
import 'package:client_mobile/Services/classes.dart';

var session = Session();
var uriServices = Uri.parse('http://pantharea.fun:8080/services/');

@immutable
class NestedServicesLists extends StatefulWidget {
  const NestedServicesLists({Key? key}) : super(key: key);

  @override
  NestedServicesListsState createState() => NestedServicesListsState();
}

Placeholder getOnePlaceHolder(ItemType type) {
  const defaultImagePath = 'web/png/baptiste.png';
  return (Placeholder(
      name: type == ItemType.action ? "Action" : "Reaction",
      type: type,
      imageProvider: const AssetImage(defaultImagePath),
      item: Item(
          type: type,
          name: type == ItemType.action ? "No action" : "No reaction",
          description: "",
          id: type == ItemType.action ? 1 : 2,
          image: const AssetImage(defaultImagePath))));
}

List<Placeholder> getPlaceHolders() {
  return ([
    getOnePlaceHolder(ItemType.action),
    getOnePlaceHolder(ItemType.reaction)
  ]);
}

Future<List<Service>> getServices() async {
  Response res = await session.get(uriServices);
  List<Service> services = [];
  if (res.status == Status.success) {
    for (var elem in res.data) {
      List<Item> listItems = [];
      for (var it in elem["actions"]) {
        Item item = Item(
            type: ItemType.action,
            name: it["name"],
            description: it["description"],
            id: it["id"],
            image: AssetImage("web/png" + elem["logo"]));
        listItems.add(item);
      }
      for (var it in elem["reactions"]) {
        Item item = Item(
            type: ItemType.reaction,
            name: it["name"],
            description: it["description"],
            id: it["id"],
            image: AssetImage("web/png" + elem["logo"]));
        listItems.add(item);
      }
      Service service = Service(
          id: elem["id"],
          name: elem["name"],
          logo: AssetImage("web/png" + elem["logo"]),
          items: listItems);
      services.add(service);
    }
    return services;
  } else {
    return [];
  }
}

class NestedServicesListsState extends State<NestedServicesLists>
    with TickerProviderStateMixin {
  List<Service> _services = [];

  final List<Placeholder> _placeholder = getPlaceHolders();

  final GlobalKey _draggableKey = GlobalKey();

//Here
  void _itemDroppedOnPlaceholderCart({
    required Item item,
    required Placeholder placeholder,
  }) {
    setState(() {
      if (item.type == placeholder.type) {
        placeholder.item = item;
        placeholder.imageProvider = item.image;
      }
    });
  }

  @override
  void initState() {
    super.initState();
    getServices().then((services) => {
          setState(() => {_services = services})
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Navbar(context: context),
        backgroundColor: Colors.white,
        body: Column(children: [
          Expanded(
              child: ListView.separated(
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
                                    fontSize: 24,
                                    color: Colors.white,
                                    fontFamily: 'AvenirNext'),
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
                                            fontFamily: 'AvenirNext'),
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
                                                      fontFamily:
                                                          'AvenirNext')),
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
          )),
          _buildPlaceholderRow()
        ]));
  }

  Widget _buildPlaceholderRow() {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: 0,
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
      child: GestureDetector(
        onTap: () => {
          showDialog(
              context: context,
              builder: (BuildContext context) {
                return const AlertDialog();
              })
        },
        child: DragTarget<Item>(
          builder: (context, candidateItems, rejectedItems) {
            return PlaceholderCart(
              hasItem: !(placeholder.item.name == ""),
              highlighted: candidateItems.isNotEmpty,
              placeholder: placeholder,
            );
          },
          //Here
          onAccept: (item) {
            _itemDroppedOnPlaceholderCart(
              item: item,
              placeholder: placeholder,
            );
          },
        ),
      ),
    ));
  }
}

class PlaceholderCart extends StatefulWidget {
  Placeholder placeholder;
  final bool highlighted;
  final bool hasItem;

  PlaceholderCart({
    Key? key,
    required this.placeholder,
    this.highlighted = false,
    this.hasItem = false,
  }) : super(key: key);

  @override
  State<PlaceholderCart> createState() => _PlaceholderCartState();
}

class _PlaceholderCartState extends State<PlaceholderCart> {
  @override
  Widget build(BuildContext context) {
    final textColor = widget.highlighted ? Colors.white : Colors.black;

    return Transform.scale(
      scale: widget.highlighted ? 1.075 : 1.0,
      child: Material(
        elevation: widget.highlighted ? 8.0 : 4.0,
        borderRadius: BorderRadius.circular(22.0),
        color: widget.highlighted ? const Color(0xff007EA7) : Colors.white,
        child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 12.0,
              vertical: 24.0,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Align(
                    alignment: Alignment.topRight,
                    child: GestureDetector(
                      onTap: () => {
                        setState(() => {
                              widget.placeholder =
                                  getOnePlaceHolder(widget.placeholder.type)
                            })
                      },
                      child: const Icon(Icons.delete, color: Colors.grey),
                    )),
                ClipOval(
                  child: SizedBox(
                    width: 46,
                    height: 46,
                    child: Image(
                      image: widget.placeholder.imageProvider,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                const SizedBox(height: 8.0),
                Text(
                  widget.placeholder.name,
                  style: Theme.of(context).textTheme.subtitle1?.copyWith(
                        color: textColor,
                        fontFamily: 'AvenirNext',
                        fontWeight: widget.hasItem
                            ? FontWeight.normal
                            : FontWeight.bold,
                      ),
                ),
                Visibility(
                  visible: widget.hasItem,
                  maintainState: true,
                  maintainAnimation: true,
                  maintainSize: true,
                  child: Column(
                    children: [
                      const SizedBox(height: 4.0),
                      Text(
                        widget.placeholder.getItem.name,
                        textAlign: TextAlign.center,
                        style: Theme.of(context).textTheme.caption!.copyWith(
                              color: textColor,
                              fontFamily: 'AvenirNext',
                              fontSize: 16.0,
                              fontWeight: FontWeight.bold,
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
