import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../core/constants/app_colors.dart';
import '../../../models/domain_model.dart';
import '../../../widgets/domain_badge.dart';
import '../../../widgets/primary_button.dart';
import '../../../widgets/stage_badge.dart';
import 'stage0_problem_discovery_screen.dart';

class Stage0DomainPickerScreen extends StatefulWidget {
  const Stage0DomainPickerScreen({super.key});

  @override
  State<Stage0DomainPickerScreen> createState() => _Stage0DomainPickerScreenState();
}

class _Stage0DomainPickerScreenState extends State<Stage0DomainPickerScreen> {
  DomainModel? _selectedDomain;

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
        title: const StageBadge(stageNumber: 0, stageTitle: 'Domain Selection'),
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
                    Text(
                      'What problem do you want to solve?',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 24,
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Select a domain that inspires you to innovate.',
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        color: AppColors.textMuted,
                      ),
                    ),
                    const SizedBox(height: 24),

                    // 7 Domains List
                    ...DomainModel.domains.map((domain) {
                      final isSelected = _selectedDomain?.id == domain.id;
                      return GestureDetector(
                        onTap: () {
                          setState(() => _selectedDomain = domain);
                        },
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          curve: Curves.easeInOut,
                          margin: const EdgeInsets.only(bottom: 14),
                          transform: Matrix4.diagonal3Values(isSelected ? 1.02 : 1.0, isSelected ? 1.02 : 1.0, 1.0),
                          padding: const EdgeInsets.all(18),
                          decoration: BoxDecoration(
                            color: isSelected
                                ? domain.accentColor.withValues(alpha: 0.15)
                                : AppColors.cardDark,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: isSelected ? domain.accentColor : AppColors.borderDark,
                              width: isSelected ? 2 : 1,
                            ),
                            boxShadow: isSelected
                                ? [
                                    BoxShadow(
                                      color: domain.accentColor.withValues(alpha: 0.3),
                                      blurRadius: 16,
                                      offset: const Offset(0, 4),
                                    )
                                  ]
                                : [],
                          ),
                          child: Row(
                            children: [
                              Container(
                                width: 50,
                                height: 50,
                                decoration: BoxDecoration(
                                  color: domain.accentColor.withValues(alpha: 0.2),
                                  borderRadius: BorderRadius.circular(16),
                                ),
                                child: Center(
                                  child: Text(domain.icon, style: const TextStyle(fontSize: 26)),
                                ),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Text(
                                          domain.name,
                                          style: GoogleFonts.plusJakartaSans(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                          ),
                                        ),
                                        const SizedBox(width: 8),
                                        DomainBadge(
                                          label: domain.id.toUpperCase(),
                                          icon: domain.icon,
                                          accentColor: domain.accentColor,
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      domain.description,
                                      style: GoogleFonts.inter(
                                        fontSize: 12,
                                        color: AppColors.textMuted,
                                      ),
                                    ),
                                  ],
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

            // Bottom Continue Action
            Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: AppColors.surfaceDark,
                border: Border(top: BorderSide(color: AppColors.borderDark)),
              ),
              child: PrimaryButton(
                label: _selectedDomain == null
                    ? 'Select a Domain to Continue'
                    : 'Explore ${_selectedDomain!.name} Problems',
                icon: Icons.arrow_forward_rounded,
                status: _selectedDomain == null ? ButtonStatus.disabled : ButtonStatus.defaultState,
                onPressed: _selectedDomain == null
                    ? null
                    : () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => Stage0ProblemDiscoveryScreen(domain: _selectedDomain!),
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
