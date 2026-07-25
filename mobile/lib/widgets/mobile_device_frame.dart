import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../core/constants/app_colors.dart';

class MobileDeviceFrame extends StatelessWidget {
  final Widget child;

  const MobileDeviceFrame({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    // If running on actual mobile native device (Android/iOS), render child full-screen directly.
    if (!kIsWeb && (defaultTargetPlatform == TargetPlatform.android || defaultTargetPlatform == TargetPlatform.iOS)) {
      return child;
    }

    // On Web / Desktop, render inside a realistic mobile phone shell!
    return Scaffold(
      backgroundColor: const Color(0xFF070A10),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Mobile Device Outer Shell
              Container(
                width: 390,
                height: 812,
                decoration: BoxDecoration(
                  color: AppColors.bgDark,
                  borderRadius: BorderRadius.circular(48),
                  border: Border.all(color: const Color(0xFF2E384D), width: 8),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.6),
                      blurRadius: 36,
                      spreadRadius: 6,
                      offset: const Offset(0, 16),
                    ),
                    BoxShadow(
                      color: AppColors.primary.withValues(alpha: 0.15),
                      blurRadius: 48,
                      spreadRadius: 2,
                    ),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(40),
                  child: Stack(
                    children: [
                      // Screen App Content
                      Positioned.fill(child: child),

                      // Top Phone Speaker / Dynamic Island Notch
                      Positioned(
                        top: 0,
                        left: 0,
                        right: 0,
                        child: Container(
                          height: 38,
                          padding: const EdgeInsets.symmetric(horizontal: 24),
                          color: Colors.black.withValues(alpha: 0.8),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                '9:41',
                                style: GoogleFonts.plusJakartaSans(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                              // Dynamic Island Capsule
                              Container(
                                width: 90,
                                height: 22,
                                decoration: BoxDecoration(
                                  color: Colors.black,
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(color: Colors.white10),
                                ),
                              ),
                              Row(
                                children: const [
                                  Icon(Icons.signal_cellular_4_bar_rounded, size: 14, color: Colors.white),
                                  SizedBox(width: 4),
                                  Icon(Icons.wifi_rounded, size: 14, color: Colors.white),
                                  SizedBox(width: 4),
                                  Icon(Icons.battery_full_rounded, size: 16, color: Colors.white),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),

                      // Bottom Home Indicator Bar
                      Positioned(
                        bottom: 8,
                        left: 0,
                        right: 0,
                        child: Center(
                          child: Container(
                            width: 134,
                            height: 4,
                            decoration: BoxDecoration(
                              color: Colors.white38,
                              borderRadius: BorderRadius.circular(2),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 12),

              // Device Label
              Text(
                '📱 StartupSage Mobile App • 390 x 812 Screen',
                style: GoogleFonts.inter(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textMuted,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
