import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../core/constants/app_colors.dart';
import '../../../widgets/primary_button.dart';
import '../../../widgets/stage_badge.dart';
import 'stage0_domain_picker_screen.dart';

class Stage0SplashScreen extends StatelessWidget {
  const Stage0SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgDark,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Top Stage Badge
              const Align(
                alignment: Alignment.centerLeft,
                child: StageBadge(stageNumber: 0, stageTitle: 'The Spark'),
              ),

              // Central Storytelling Visual
              Column(
                children: [
                  Container(
                    width: 100,
                    height: 100,
                    decoration: BoxDecoration(
                      color: AppColors.primaryLight.withValues(alpha: 0.15),
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.primary, width: 2),
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.primary.withValues(alpha: 0.3),
                          blurRadius: 24,
                          spreadRadius: 4,
                        )
                      ],
                    ),
                    child: const Center(
                      child: Text('💡', style: TextStyle(fontSize: 48)),
                    ),
                  ),

                  const SizedBox(height: 32),

                  Text(
                    'You are about to experience building a startup.',
                    textAlign: TextAlign.center,
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 28,
                      fontWeight: FontWeight.w800,
                      color: Colors.white,
                      height: 1.25,
                    ),
                  ),

                  const SizedBox(height: 16),

                  Text(
                    'Every great founder started by noticing a real problem. Step into the shoes of a young innovator and turn your idea into a working startup!',
                    textAlign: TextAlign.center,
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      color: AppColors.textMuted,
                      height: 1.5,
                    ),
                  ),
                ],
              ),

              // Bottom CTA
              Column(
                children: [
                  PrimaryButton(
                    label: 'Ignite Your Spark',
                    icon: Icons.rocket_launch_rounded,
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const Stage0DomainPickerScreen()),
                      );
                    },
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Stage 0 • Discover Real Problems',
                    style: GoogleFonts.inter(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textMuted,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
