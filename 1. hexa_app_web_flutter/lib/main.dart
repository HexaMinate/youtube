// ignore_for_file: must_be_immutable, no_leading_underscores_for_local_identifiers

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:url_strategy/url_strategy.dart';
import 'package:go_router/go_router.dart';

void main() {
  setPathUrlStrategy();
  final GoRouter _router = GoRouter(
    routes: <GoRoute>[
      GoRoute(
        path: '/',
        builder: (BuildContext context, GoRouterState state) {
          return MainPage(path: "/");
        },
      ),
      GoRoute(
        path: '/page2',
        builder: (BuildContext context, GoRouterState state) {
          return MainPage(path: "page2");
        },
      ),
      GoRoute(
        path: '/sign',
        builder: (BuildContext context, GoRouterState state) {
          if (kDebugMode) {
            print(state.queryParams);
          }
          var query = state.queryParams;
          return SignPage(username: query["username"], password: query["password"],);
        },
      ),
    ],
    errorBuilder: (BuildContext context, GoRouterState state) {
      return Scaffold(
        body: Center(
          child: Text(
            "Maaf Page ${state.path} tidak tersedia",
            style: const TextStyle(fontSize: 25),
          ),
        ),
      );
    },
  );

  runApp(MaterialApp.router(
    routeInformationParser: _router.routeInformationParser,
    routerDelegate: _router.routerDelegate,
    title: 'GoRouter Example',
  ));
}

class MainPage extends StatefulWidget {
  late String path;
  MainPage({Key? key, required this.path}) : super(key: key);

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
      child: Column(
        children: [
          const Text(
            "This is main page",
            style: const TextStyle(fontSize: 25),
          ),
          const SizedBox(
            height: 20,
          ),
          Text(
            "path: ${widget.path}",
            style: const TextStyle(fontSize: 25),
          ),
        ],
      ),
    ));
  }
}

class SignPage extends StatefulWidget {
  late String? username;
  late String? password;
  SignPage({Key? key, this.username, this.password}) : super(key: key);

  @override
  State<SignPage> createState() => _SignPageState();
}

class _SignPageState extends State<SignPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
      child: Column(
        children: [
          Text(
            "Username: ${widget.username ?? "kosong"}",
            style: const TextStyle(fontSize: 25),
          ),
          const SizedBox(
            height: 20,
          ),
          Text(
            "Password: ${widget.password ?? "kosong"}",
            style: const TextStyle(fontSize: 25),
          ),
        ],
      ),
    ));
  }
}
