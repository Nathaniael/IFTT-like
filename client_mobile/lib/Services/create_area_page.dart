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

List<Item> _items = [
  Item(
    name: 'Github',
    actionText: "Blablabla 1",
    uid: '1',
    imageProvider: const AssetImage('web/png/emile.png'),
  ),
  Item(
    name: 'Mail',
    actionText: "Blablabla 2",
    uid: '2',
    imageProvider: const AssetImage('web/png/baptiste.png'),
  )
];

class CreateAreaPageState extends State<CreateAreaPage>
    with TickerProviderStateMixin {
  final List<Placeholder> _people = [
    Placeholder(
      item: Item(
          imageProvider: AssetImage('web/png/baptiste.png'),
          name: "Pas d'action",
          actionText: "Action",
          uid: ''),
      name: 'Action',
      imageProvider: const NetworkImage('https://flutter'
          '.dev/docs/cookbook/img-files/effects/split-check/Avatar1.jpg'),
    ),
    Placeholder(
      item: Item(
          imageProvider: AssetImage('web/png/baptiste.png'),
          name: "Pas de reaction",
          actionText: "Réaction",
          uid: ''),
      name: 'Reaction',
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
      backgroundColor: const Color(0xff000D4D),
      appBar: Navbar(context: context),
      body: _buildContent(),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      iconTheme: const IconThemeData(color: Color(0xff007EA7)),
      title: Text(
        'Add Action or Reaction',
        style: Theme.of(context).textTheme.headline4?.copyWith(
              fontSize: 20,
              color: const Color(0xff007EA7),
              fontWeight: FontWeight.bold,
            ),
      ),
      backgroundColor: const Color(0xFFF7F7F7),
      elevation: 0,
    );
  }

  Widget _buildContent() {
    return Stack(
      children: [
        SafeArea(
          child: Column(
            children: [
              Expanded(
                child: _buildMenuList(),
              ),
              _buildPeopleRow(),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMenuList() {
    return ListView.separated(
      padding: const EdgeInsets.all(16.0),
      itemCount: _items.length,
      separatorBuilder: (context, index) {
        return const SizedBox(
          height: 12.0,
        );
      },
      itemBuilder: (context, index) {
        final item = _items[index];
        return _buildMenuItem(
          item: item,
        );
      },
    );
  }

  Widget _buildMenuItem({
    required Item item,
  }) {
    return LongPressDraggable<Item>(
      data: item,
      dragAnchorStrategy: pointerDragAnchorStrategy,
      feedback: DraggingListItem(
        dragKey: _draggableKey,
        photoProvider: item.imageProvider,
      ),
      child: MenuListItem(
        name: item.name,
        price: item.actionText,
        photoProvider: item.imageProvider,
      ),
    );
  }

  Widget _buildPeopleRow() {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: 8.0,
        vertical: 20.0,
      ),
      child: Row(
        children: _people.map(_buildPersonWithDropZone).toList(),
      ),
    );
  }

  Widget _buildPersonWithDropZone(Placeholder placeholder) {
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
                    image: placeholder.formattedTotalItemPrice.imageProvider,
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
                      placeholder.formattedTotalItemPrice.actionText,
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

class MenuListItem extends StatelessWidget {
  const MenuListItem({
    Key? key,
    this.name = '',
    this.price = '',
    required this.photoProvider,
    this.isDepressed = false,
  }) : super(key: key);

  final String name;
  final String price;
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
                  const SizedBox(height: 10.0),
                  Text(
                    price,
                    style: Theme.of(context).textTheme.subtitle1?.copyWith(
                          fontWeight: FontWeight.bold,
                          fontSize: 18.0,
                        ),
                  ),
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

// @immutable
class Item {
  String actionText;
  String name;
  String uid;
  ImageProvider imageProvider;
  Item({
    this.actionText = "No action",
    this.name = "Action",
    this.uid = '',
    this.imageProvider = const AssetImage('web/png/baptiste.png'),
  });
}

class Placeholder {
  String name;
  ImageProvider imageProvider;
  Item item;
  Placeholder(
      {required this.name, required this.imageProvider, required this.item});
  Item get formattedTotalItemPrice {
    return item;
  }
}
