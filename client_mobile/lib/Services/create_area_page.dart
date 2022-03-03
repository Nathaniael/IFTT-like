import 'package:flutter/material.dart';
import 'package:client_mobile/Widgets/Navbar/navbar.dart';

@immutable
class CreateAreaPage extends StatefulWidget {
  const CreateAreaPage({Key? key}) : super(key: key);

  @override
  CreateAreaPageState createState() => CreateAreaPageState();
}

void onPressedBackground(context) {
  Navigator.popAndPushNamed(context, '/services');
}

enum ItemType { action, reaction, none }

// late String name;
// late ImageProvider logo;
// late List<Item> items;

List<Service> _services = [
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
  Service(
      id: 3,
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
      id: 4,
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
  Service(
      id: 5,
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
      id: 6,
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
  Service(
      id: 7,
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
  Service(
      id: 8,
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
      id: 9,
      name: 'Email',
      logo: const AssetImage('web/png/mail.png'),
      items: <Item>[
        Item(
            type: ItemType.reaction,
            name: 'Send an email',
            description: 'Send a customizable email',
            id: 1,
            imageProvider: const AssetImage('web/png/baptiste.png'))
      ])
];

class CreateAreaPageState extends State<CreateAreaPage>
    with TickerProviderStateMixin {
  final List<Placeholder> _placeholders = [
    Placeholder(
      item: Item(
          type: ItemType.none,
          imageProvider: const AssetImage('web/png/baptiste.png'),
          name: "",
          description: "Pas d'action",
          id: 1),
      name: 'Action',
      imageProvider: const NetworkImage('https://flutter'
          '.dev/docs/cookbook/img-files/effects/split-check/Avatar1.jpg'),
    ),
    Placeholder(
      item: Item(
          type: ItemType.none,
          imageProvider: const AssetImage('web/png/baptiste.png'),
          name: "",
          description: "Pas de réaction",
          id: 1),
      name: 'Réaction',
      imageProvider: const NetworkImage('https://flutter'
          '.dev/docs/cookbook/img-files/effects/split-check/Avatar2.jpg'),
    ),
  ];

  final GlobalKey _draggableKey = GlobalKey();

  void _itemDroppedOnPlaceholderBox({
    required Item item,
    required Placeholder placeholder,
  }) {
    setState(() {
      placeholder.item = item;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Navbar(context: context),
        body: Container(
          alignment: Alignment.center,
          decoration: const BoxDecoration(
              gradient: RadialGradient(
            radius: 0.8,
            colors: [
              Color(0xff007EA7),
              Color(0xff000D4D),
            ],
          )),
          child: _buildContent(),
        ));
  }

  Widget _buildContent() {
    return Stack(
      children: [
        SafeArea(
          child: Column(
            children: [
              Expanded(
                child: _buildServicesList(),
              ),
              _buildPlaceholderRow(),
            ],
          ),
        ),
      ],
    );
  }

  // Widget _buildItemsFromService () {

  // }

  Widget _buildServicesList() {
    return ListView.separated(
      padding: const EdgeInsets.all(16.0),
      itemCount: _services.length,
      separatorBuilder: (context, index) {
        return const SizedBox(
          height: 12.0,
        );
      },
      itemBuilder: (context, index) {
        final service = _services[index];
        return _buildServiceItem(
          service: service,
        );
      },
    );
  }

  Widget _buildServiceItem({
    required Service service,
  }) {
    return LongPressDraggable<Service>(
      data: service,
      dragAnchorStrategy: pointerDragAnchorStrategy,
      feedback: DraggingListItem(
        dragKey: _draggableKey,
        photoProvider: service.getLogo,
      ),
      child: MenuListService(
        name: service.name,
        photoProvider: service.getLogo,
      ),
    );
  }

  Widget _buildPlaceholderRow() {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: 8.0,
        vertical: 20.0,
      ),
      child: Row(
        children: _placeholders.map(_buildPlaceholderWithDropZone).toList(),
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
            return PlaceholderBox(
              highlighted: candidateItems.isNotEmpty,
              placeholder: placeholder,
            );
          },
          onAccept: (item) {
            _itemDroppedOnPlaceholderBox(
              item: item,
              placeholder: placeholder,
            );
          },
        ),
      ),
    );
  }
}

class PlaceholderBox extends StatelessWidget {
  const PlaceholderBox({
    Key? key,
    required this.placeholder,
    this.highlighted = false,
    // this.hasItems = false,
  }) : super(key: key);

  final Placeholder placeholder;
  final bool highlighted;

  @override
  Widget build(BuildContext context) {
    final textColor = highlighted ? Colors.white : Colors.black;

    return Transform.scale(
      scale: highlighted ? 1.075 : 1.0,
      child: Material(
        elevation: highlighted ? 8.0 : 4.0,
        borderRadius: BorderRadius.circular(22.0),
        color: highlighted ? const Color(0xff007EA7) : Colors.white,
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
                    image: placeholder.getItem.imageProvider,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              const SizedBox(height: 8.0),
              Text(
                placeholder.name,
                style: Theme.of(context)
                    .textTheme
                    .subtitle1
                    ?.copyWith(color: textColor, fontWeight: FontWeight.normal),
              ),
              Visibility(
                // visible: hasItems,
                maintainState: true,
                maintainAnimation: true,
                maintainSize: true,
                child: Column(
                  children: [
                    const SizedBox(height: 4.0),
                    Text(
                      placeholder.getItem.description,
                      style: Theme.of(context).textTheme.caption!.copyWith(
                            color: textColor,
                            fontSize: 16.0,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const SizedBox(height: 4.0)
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

class MenuListService extends StatelessWidget {
  const MenuListService({
    Key? key,
    this.name = '',
    required this.photoProvider,
    this.isDepressed = false,
  }) : super(key: key);

  final String name;
  final ImageProvider photoProvider;
  final bool isDepressed;

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 12.0,
      borderRadius: BorderRadius.circular(20),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Row(
          mainAxisSize: MainAxisSize.max,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(12.0),
              child: SizedBox(
                width: 120,
                height: 120,
                child: Center(
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 100),
                    curve: Curves.easeInOut,
                    height: isDepressed ? 115 : 120,
                    width: isDepressed ? 115 : 120,
                    child: Image(
                      image: photoProvider,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 30.0),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: Theme.of(context).textTheme.subtitle1?.copyWith(
                          fontSize: 18.0,
                        ),
                  ),
                  const SizedBox(height: 10.0)
                ],
              ),
            ),
          ],
        ),
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
