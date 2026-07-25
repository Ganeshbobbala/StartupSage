import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../core/constants/app_colors.dart';
import '../../../models/domain_model.dart';
import '../../../widgets/domain_badge.dart';
import '../../../widgets/primary_button.dart';
import '../../../widgets/stage_badge.dart';
import 'stage0_emotional_hook_screen.dart';

class Stage0ProblemDiscoveryScreen extends StatefulWidget {
  final DomainModel domain;

  const Stage0ProblemDiscoveryScreen({super.key, required this.domain});

  @override
  State<Stage0ProblemDiscoveryScreen> createState() => _Stage0ProblemDiscoveryScreenState();
}

class _Stage0ProblemDiscoveryScreenState extends State<Stage0ProblemDiscoveryScreen> {
  String? _selectedScenario;

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
        title: StageBadge(stageNumber: 0, stageTitle: widget.domain.name),
        centerTitle: true,
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        DomainBadge(
                          label: widget.domain.name,
                          icon: widget.domain.icon,
                          accentColor: widget.domain.accentColor,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Problem Scenarios',
                          style: GoogleFonts.inter(fontSize: 12, color: AppColors.textMuted),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Choose a relatable problem scenario to solve:',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 22,
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Great startups are built by focusing on specific real-world frustrations.',
                      style: GoogleFonts.inter(fontSize: 13, color: AppColors.textMuted),
                    ),
                    const SizedBox(height: 24),

                    // 3 Realistic Scenarios
                    ...widget.domain.scenarios.map((scenario) {
                      final isSelected = _selectedScenario == scenario;
                      return GestureDetector(
                        onTap: () => setState(() => _selectedScenario = scenario),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          margin: const EdgeInsets.only(bottom: 14),
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: isSelected
                                ? widget.domain.accentColor.withValues(alpha: 0.15)
                                : AppColors.cardDark,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: isSelected ? widget.domain.accentColor : AppColors.borderDark,
                              width: isSelected ? 2 : 1,
                            ),
                          ),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                width: 24,
                                height: 24,
                                decoration: BoxDecoration(
                                  color: isSelected
                                      ? widget.domain.accentColor
                                      : Colors.transparent,
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: isSelected
                                        ? widget.domain.accentColor
                                        : AppColors.textMuted,
                                    width: 2,
                                  ),
                                ),
                                child: isSelected
                                    ? const Icon(Icons.check, size: 14, color: Colors.white)
                                    : null,
                              ),
                              const SizedBox(width: 14),
                              Expanded(
                                child: Text(
                                  '"$scenario"',
                                  style: GoogleFonts.inter(
                                    fontSize: 15,
                                    fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                                    color: isSelected ? Colors.white : AppColors.textLight,
                                    height: 1.4,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    }),
                  ],
                ),
              ),
            ),

            // Bottom Continue
            Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: AppColors.surfaceDark,
                border: Border(top: BorderSide(color: AppColors.borderDark)),
              ),
              child: PrimaryButton(
                label: 'Confirm Target Problem',
                icon: Icons.check_circle_rounded,
                status: _selectedScenario == null ? ButtonStatus.disabled : ButtonStatus.defaultState,
                onPressed: _selectedScenario == null
                    ? null
                    : () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => Stage0EmotionalHookScreen(
                              domain: widget.domain,
                              chosenScenario: _selectedScenario!,
                            ),
                          ),
                        );
                      },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
