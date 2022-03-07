import 'package:client_mobile/Widgets/background.dart';
import 'package:client_mobile/Widgets/bleuradialbackground.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/Navbar/navbar.dart';
import 'package:client_mobile/apiprovider.dart';
import 'package:client_mobile/Services/classes.dart';
import 'package:rflutter_alert/rflutter_alert.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:client_mobile/Services/request.dart';

final Future<SharedPreferences> _storage = SharedPreferences.getInstance();

//Url to call
var session = Session();
var uriServices = Uri.parse('http://pantharea.fun:8080/services/');

@immutable
class NestedServicesLists extends StatefulWidget {
  const NestedServicesLists({Key? key}) : super(key: key);

  @override
  NestedServicesListsState createState() => NestedServicesListsState();
}

//Create 1 placeholder
Placeholder getOnePlaceHolder(ItemType type) {
  //I'm the default value nice :|
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
          image: const AssetImage(defaultImagePath),
          fields: "")));
}

//Get placeholder
List<Placeholder> getPlaceHolders() {
  return ([
    getOnePlaceHolder(ItemType.action),
    getOnePlaceHolder(ItemType.reaction)
  ]);
}

// Call to get list of Service
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
            image: AssetImage(
              "web/png/" + elem["logo"],
            ),
            fields: it["params"]);
        listItems.add(item);
      }
      for (var it in elem["reactions"]) {
        Item item = Item(
            type: ItemType.reaction,
            name: it["name"],
            description: it["description"],
            id: it["id"],
            image: AssetImage("web/png" + elem["logo"]),
            fields: it["params"]);
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

resetItemActionAndReaction(ItemType type) async {
  final storage = await _storage;

  if (type == ItemType.action) {
    storage.remove("action");
    storage.remove("actionId");
  } else if (type == ItemType.reaction) {
    storage.remove("reaction");
    storage.remove("reactionId");
  }

  print(storage.getString("action"));
  print(storage.getString("reaction"));
  print(storage.getInt("actionId"));
  print(storage.getInt("reactionId"));
}

class NestedServicesListsState extends State<NestedServicesLists>
    with TickerProviderStateMixin {
  List<Service> _services = [];

  final List<Placeholder> _placeholder = getPlaceHolders();

  final GlobalKey _draggableKey = GlobalKey();

//Drop placeholder fonction
  void _itemDroppedOnPlaceholderCart({
    required Item item,
    required Placeholder placeholder,
  }) {
    setState(() {
      if (item.type == placeholder.type) {
        resetItemActionAndReaction(item.type);
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
    Size size = MediaQuery.of(context).size;
    return Scaffold(
        appBar: Navbar(context: context),
        body: BleuRadialBackground(
            onPressed: () {},
            child: Column(children: [
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
                          margin:
                              const EdgeInsets.only(left: 8, top: 8, right: 8),
                          child: Row(
                            children: [
                              Image(
                                  image: _services[serviceIndex].logo,
                                  height: 50,
                                  width: 50),
                              const SizedBox(width: 15),
                              Card(
                                  child: Row(
                                children: [
                                  Container(
                                      height: size.height * 0.055,
                                      width: size.width * 0.75,
                                      child: Center(
                                        child: Text(
                                          _services[serviceIndex].name,
                                          style: const TextStyle(
                                              fontSize: 28,
                                              fontWeight: FontWeight.bold,
                                              color: Color(0xff000D4D),
                                              fontFamily: 'AvenirNext'),
                                        ),
                                      ))
                                ],
                              ))
                            ],
                          )),
                      Container(
                        margin: const EdgeInsets.only(left: 16, right: 16),
                        height: 175,
                        child: ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: _services[serviceIndex].items.length,
                            itemBuilder: (context, indexItem) {
                              return SizedBox(
                                  width: 200,
                                  child: Padding(
                                      padding: const EdgeInsets.all(5.0),
                                      child: Center(
                                          child: LongPressDraggable(
                                        data: _services[serviceIndex]
                                            .items[indexItem],
                                        dragAnchorStrategy:
                                            pointerDragAnchorStrategy,
                                        feedback: DraggingListItem(
                                            dragKey: _draggableKey,
                                            photoProvider:
                                                _services[serviceIndex].logo),
                                        child: Card(
                                          color: const Color.fromARGB(
                                              210, 255, 255, 255),
                                          child: Column(
                                            children: [
                                              Padding(
                                                  padding: const EdgeInsets.all(
                                                      10.0),
                                                  child: Center(
                                                      child: Text(
                                                    _services[serviceIndex]
                                                        .items[indexItem]
                                                        .name,
                                                    style: const TextStyle(
                                                        color: const Color(
                                                            0xff000D4D),
                                                        fontSize: 20.0,
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        fontFamily:
                                                            'AvenirNext'),
                                                  ))),
                                              Padding(
                                                  padding: const EdgeInsets.all(
                                                      10.0),
                                                  child: Center(
                                                    child: Text(
                                                        _services[serviceIndex]
                                                            .items[indexItem]
                                                            .description,
                                                        style: const TextStyle(
                                                            color: Color(
                                                                0xff007EA7),
                                                            fontFamily:
                                                                'AvenirNext')),
                                                  ))
                                            ],
                                          ),
                                        ),
                                      ))));
                            }),
                      ),
                    ],
                  );
                },
              )),
              _buildPlaceholderRow()
            ])));
  }

  createArea() async {
    final storage = await _storage;
    final action = storage.getString("action");
    final reaction = storage.getString("reaction");
    final actionId = storage.getInt("actionId");
    final reactionId = storage.getInt("reactionId");
    if (action == null) {
      throw Exception("No action set");
    } else if (reaction == null) {
      throw Exception("No reaction set");
    } else if (actionId == null) {
      throw Exception("No action id set");
    } else if (reactionId == null) {
      throw Exception("No reaction id set");
    }
    RequestCreationArea body =
        RequestCreationArea(actionId, action, reactionId, reaction);
    print(body.toJson());
    session
        .post(uriProfile, body)
        .then((res) => {})
        .catchError((onError) => {throw Exception(onError.toString())});
  }

// Put placeholder in a row
  Widget _buildPlaceholderRow() {
    return Container(
        padding: const EdgeInsets.symmetric(
          horizontal: 0,
          vertical: 20.0,
        ),
        child: Column(
          children: [
            Row(
              children:
                  _placeholder.map(_buildPlaceholderWithDropZone).toList(),
            ),
            TextButton(
                onPressed: () => {
                      createArea().then(
                          (res) => {Navigator.pushNamed(context, "/profile")})
                    },
                child: const Text("CREATE AREA",
                    style: TextStyle(color: Colors.white, fontSize: 20)))
          ],
        ));
  }

//create drop zone in placeholder
  Widget _buildPlaceholderWithDropZone(Placeholder placeholder) {
    return Expanded(
        child: Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: 6.0,
      ),
      child: GestureDetector(
        onTap: () => {
          if (placeholder.item.description != "")
            _openPopupParameters(context, placeholder.item)
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

List<ParamModel> getParamsFromItemFields(String fields) {
  List<ParamModel> params = [];
  dynamic dFields = json.decode(fields);

  for (var field in dFields) {
    if (field["string"] != null) {
      params.add(ParamModel(
          "string", field["string"], TextEditingController(text: "")));
    } else if (field["number"] != null) {
      params.add(ParamModel(
          "number", field["number"], TextEditingController(text: "")));
    }
  }
  return params;
}

class InputParam extends StatelessWidget {
  const InputParam({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

setActionOrReaction(Item item, List<ParamModel> models) async {
  Map<String, String> actionOrReaction = {};

  for (var model in models) {
    actionOrReaction[model.name] = model.controller.text;
  }
  final storage = await _storage;
  if (item.type == ItemType.action) {
    storage.setString("action", actionOrReaction.toString());
    storage.setInt("actionId", item.id);
  } else if (item.type == ItemType.reaction) {
    storage.setString("reaction", actionOrReaction.toString());
    storage.setInt("reactionId", item.id);
  }
}

_openPopupParameters(context, Item item) {
  List<ParamModel> paramsModel = getParamsFromItemFields(item.fields);
  Alert(
      context: context,
      title: item.name,
      content: Column(
        children: <Widget>[
          for (var paramModel in paramsModel)
            TextField(
              decoration: InputDecoration(
                  hintText: paramModel.name,
                  icon: Icon(paramModel.getType() == ParamType.number
                      ? Icons.numbers
                      : Icons.rtt)),
              controller: paramModel.controller,
            )
        ],
      ),
      buttons: [
        DialogButton(
          onPressed: () =>
              {setActionOrReaction(item, paramsModel), Navigator.pop(context)},
          child: const Text(
            "Set parameters",
            style: TextStyle(color: Colors.white, fontSize: 20),
          ),
        )
      ]).show();
}

//class placeholder
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
        color: widget.highlighted
            ? Colors.white
            : Color.fromARGB(210, 255, 255, 255),
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
