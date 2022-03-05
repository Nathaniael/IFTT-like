// Flutter components
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

var session = Session();
var uriRegister = Uri.parse('http://localhost:8080/auth/login/');

@immutable
class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  LoginPageState createState() => LoginPageState();
}

class LoginPageState extends State<LoginPage> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  String error = "";

  Future<bool> login(String email, String password) async {
    LoginRequest body = LoginRequest(email, password);
    Response res = await session.post(uriRegister, body);
    if (res.status == Status.success) {
      return true;
    }
    setState(() {
      error = res.message!;
    });
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
            const TitlePage(labelText: "LOGIN"),
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
                    login(emailController.text, passwordController.text)
                        .then((value) => {
                              if (value == true)
                                {Navigator.popAndPushNamed(context, '/area')}
                            });
                  },
                  style: resetStyle(),
                  child: const SubmitButton(labelText: "SIGN IN")),
            ),
            const PageSwitch(
                labelText: "Don't have an Account? Sign up", path: "/register")
          ],
        ),
      ),
    );
  }
}
