import 'package:flutter/material.dart';
import 'package:client_mobile/User/types.dart';

// card for area
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
                      fontFamily: 'AvenirNext',
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
                      fontFamily: 'AvenirNext',
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
                      fontFamily: 'AvenirNext',
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
                      fontFamily: 'AvenirNext',
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
