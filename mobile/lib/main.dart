import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'core/theme/app_theme.dart';
import 'features/auth/screens/login_screen.dart';
import 'providers/game_provider.dart';
import 'widgets/mobile_device_frame.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const StartupSageApp());
}

class StartupSageApp extends StatelessWidget {
  const StartupSageApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => GameProvider()),
      ],
      child: MaterialApp(
        title: 'StartupSage Mobile',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.darkTheme,
        home: const MobileDeviceFrame(child: LoginScreen()),
      ),
    );
  }
}
