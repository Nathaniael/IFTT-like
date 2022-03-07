// Flutter components
import 'package:client_mobile/Widgets/Text/text_adn.dart';
import 'package:flutter/material.dart';

// App components
import 'package:client_mobile/Widgets/background.dart';
import 'package:client_mobile/apiprovider.dart';

// My components
import 'package:client_mobile/Login/types.dart';
import 'package:client_mobile/Login/components/input_form.dart';
import 'package:client_mobile/Login/components/submit_button.dart';
import 'package:client_mobile/Login/components/title_page.dart';
import 'package:client_mobile/Login/components/page_switch.dart';
import 'package:shared_preferences/shared_preferences.dart';

//url to call
var session = Session();
var uriRegister = Uri.parse('http://pantharea.fun:8080/auth/register/');
final Future<SharedPreferences> _storage = SharedPreferences.getInstance();

@immutable
class RegisterPage extends StatefulWidget {
  const RegisterPage({Key? key}) : super(key: key);

  @override
  RegisterPageState createState() => RegisterPageState();
}

class RegisterPageState extends State<RegisterPage> {
  final usernameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  String error = "";

  //call back to register
  Future<bool> register(String username, String email, String password,
      {String? image}) async {
    RegisterRequest body = image == null
        ? RegisterRequest(username, email, password)
        : RegisterRequest(username, email, password, image: image);
    Response res = await session.post(uriRegister, body, getCookies: true);
    final storage = await _storage;
    if (res.status == Status.success) {
      storage.setBool("logged", true);
      return true;
    }
    setState(() {
      error = res.message!;
    });
    storage.setBool("logged", false);
    return false;
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      body: Background(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const TextANM("REGISTRER",
                color: Color(0xff007EA7), fontWeight: FontWeight.bold),
            InputForm(controller: usernameController, labelText: "Username"),
            InputForm(controller: emailController, labelText: "Email"),
            InputForm(
                controller: passwordController,
                labelText: "Password",
                obscure: true),
            Text(error),
            Container(
              alignment: Alignment.centerRight,
              margin: EdgeInsets.symmetric(
                  horizontal: size.width * 0.1, vertical: 10),
              child: ElevatedButton(
                  onPressed: () {
                    register(usernameController.text, emailController.text,
                            passwordController.text)
                        .then((value) => {
                              if (value == true)
                                {Navigator.popAndPushNamed(context, '/area')}
                            });
                  },
                  style: resetStyle(),
                  child: const SubmitButton(
                    labelText: "SIGN UP",
                  )),
            ),
            const PageSwitch(
                labelText: "Already Have an Account? Sign in", path: "/login")
          ],
        ),
      ),
    );
  }
}
