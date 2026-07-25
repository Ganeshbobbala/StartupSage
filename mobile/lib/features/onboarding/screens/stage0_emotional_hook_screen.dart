import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../models/domain_model.dart';
import '../../../providers/game_provider.dart';
import '../../../widgets/emotional_checkin.dart';
import '../../../widgets/primary_button.dart';
import '../../../widgets/stage_badge.dart';

class Stage0EmotionalHookScreen extends StatefulWidget {
  final DomainModel domain;
  final String chosenScenario;

  const Stage0EmotionalHookScreen({
    super.key,
    required this.domain,
    required this.chosenScenario,
  });

  @override
  State<Stage0EmotionalHookScreen> createState() => _Stage0EmotionalHookScreenState();
}

class _Stage0EmotionalHookScreenState extends State<Stage0EmotionalHookScreen> {
  bool _isCompleted = false;

  void _handleCompleteStage0() {
    final provider = Provider.of<GameProvider>(context, listen: false);
    provider.completeStage0();

    setState(() => _isCompleted = true);

    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => Container(
        padding: const EdgeInsets.all(28),
        decoration: const BoxDecoration(
          color: AppColors.surfaceDark,
          borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
          border: Border(top: BorderSide(color: AppColors.primary, width: 2)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 72,
              height: 72,
              decoration: BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppColors.primary.withValues(alpha: 0.4),
                    blurRadius: 20,
                    spreadRadius: 4,
                  )
                ],
              ),
              child: const Icon(Icons.workspace_premium_rounded, size: 40, color: Colors.white),
            ),

            const SizedBox(height: 16),

            Text(
              'Stage 0 Complete! 🎉',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 24,
                fontWeight: FontWeight.w800,
                color: Colors.white,
              ),
            ),

            const SizedBox(height: 8),

            Text(
              'You unlocked the Spark Starter Badge +250 XP & +50 Founder Coins!',
              textAlign: TextAlign.center,
              style: GoogleFonts.inter(
                fontSize: 13,
                color: AppColors.warning,
                fontWeight: FontWeight.w600,
              ),
            ),

            const SizedBox(height: 24),

            PrimaryButton(
              label: 'Proceed to Stage 1: The Idea',
              icon: Icons.arrow_forward_rounded,
              onPressed: () {
                Navigator.pop(context); // Close bottom sheet
                Navigator.popUntil(context, (route) => route.isFirst);
              },
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const StageBadge(stageNumber: 0, stageTitle: 'The Spark Moment'),
        centerTitle: true,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
          child: Column(
            children: [
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      const SizedBox(height: 16),

                      // Purposeful Illustration / Icon Badge
                      Container(
                        width: 84,
                        height: 84,
                        decoration: BoxDecoration(
                          color: widget.domain.accentColor.withValues(alpha: 0.15),
                          shape: BoxShape.circle,
                          border: Border.all(color: widget.domain.accentColor, width: 2),
                        ),
                        child: Center(
                          child: Text(widget.domain.icon, style: const TextStyle(fontSize: 44)),
                        ),
                      ),

                      const SizedBox(height: 24),

                      Text(
                        'Target Problem Statement:',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: widget.domain.accentColor,
                          letterSpacing: 1.0,
                        ),
                      ),

                      const SizedBox(height: 8),

                      Text(
                        '"${widget.chosenScenario}"',
                        textAlign: TextAlign.center,
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                          color: Colors.white,
                          height: 1.3,
                        ),
                      ),

                      const SizedBox(height: 20),

                      Text(
                        'This isn\'t just a line in a textbook. Millions of people face this daily frustration without a simple solution.',
                        textAlign: TextAlign.center,
                        style: GoogleFonts.inter(
                          fontSize: 14,
                          color: AppColors.textMuted,
                          height: 1.5,
                        ),
                      ),

                      const SizedBox(height: 32),

                      // Emotional Check-In Widget
                      const EmotionalCheckIn(),
                    ],
                  ),
                ),
              ),

              // Clear Storytelling CTA
              PrimaryButton(
                label: 'I Could Actually Solve This 🚀',
                icon: Icons.rocket_launch_rounded,
                status: _isCompleted ? ButtonStatus.completed : ButtonStatus.defaultState,
                onPressed: _handleCompleteStage0,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
