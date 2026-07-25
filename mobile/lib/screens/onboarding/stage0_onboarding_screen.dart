import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../providers/game_provider.dart';
import '../../theme/app_theme.dart';

class Stage0OnboardingScreen extends StatefulWidget {
  const Stage0OnboardingScreen({Key? key}) : super(key: key);

  @override
  State<Stage0OnboardingScreen> createState() => _Stage0OnboardingScreenState();
}

class _Stage0OnboardingScreenState extends State<Stage0OnboardingScreen> {
  int _currentStep = 0;

  final List<Map<String, String>> _categories = [
    {
      'title': 'Education & Learning',
      'icon': '📚',
      'desc': 'Solve exam stress, homework tracking, or school resource sharing.',
    },
    {
      'title': 'Climate & Eco-Campus',
      'icon': '🌱',
      'desc': 'Reduce plastic waste, save electricity, or manage food compost.',
    },
    {
      'title': 'Youth Health & Wellness',
      'icon': '💪',
      'desc': 'Promote outdoor games, healthy eating, or digital eye care.',
    },
    {
      'title': 'Community & Smart City',
      'icon': '🏙️',
      'desc': 'Help local street vendors, stray animal rescue, or neighborhood safety.',
    },
  ];

  final List<Map<String, String>> _personas = [
    {
      'name': 'Rohan (Class 8 Student)',
      'avatar': '👦',
      'challenge': 'Loses track of assignment deadlines & revision notes.',
    },
    {
      'name': 'Mrs. Sharma (Science Teacher)',
      'avatar': '👩‍🏫',
      'challenge': 'Needs engaging interactive lab experiments for students.',
    },
    {
      'name': 'Anika (Class 10 Student)',
      'avatar': '👧',
      'challenge': 'Struggles with heavy school backpack & posture pain.',
    },
  ];

  String? _selectedCat;
  String? _selectedPerson;
  final _problemTextController = TextEditingController(
    text: 'Students lose track of homework deadlines across multiple physical notebooks.',
  );
  String _avatarType = 'boy';

  @override
  void dispose() {
    _problemTextController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep < 4) {
      setState(() => _currentStep++);
    } else {
      _showCompletionDialog();
    }
  }

  void _prevStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep--);
    }
  }

  void _showCompletionDialog() {
    final gameProvider = Provider.of<GameProvider>(context, listen: false);
    gameProvider.completeStage0();

    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => Container(
        padding: const EdgeInsets.all(28),
        decoration: const BoxDecoration(
          color: AppTheme.surfaceDark,
          borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
          border: Border(top: BorderSide(color: AppTheme.amberSpark, width: 2)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: AppTheme.amberSpark,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.amberSpark.withOpacity(0.5),
                    blurRadius: 24,
                    spreadRadius: 4,
                  )
                ],
              ),
              child: const Icon(Icons.workspace_premium_rounded, size: 48, color: AppTheme.bgDark),
            ).animate().scale(duration: 500.ms, curve: Curves.elasticOut),

            const SizedBox(height: 16),

            Text(
              'Stage 0 Complete! 🎉',
              style: GoogleFonts.outfit(
                fontSize: 24,
                fontWeight: FontWeight.w900,
                color: Colors.white,
              ),
            ),

            const SizedBox(height: 8),

            Text(
              'You unlocked the Spark Starter Badge +250 XP & +50 Founder Coins!',
              textAlign: TextAlign.center,
              style: GoogleFonts.inter(
                fontSize: 13,
                color: AppTheme.amberSpark,
                fontWeight: FontWeight.w600,
              ),
            ),

            const SizedBox(height: 24),

            GestureDetector(
              onTap: () {
                Navigator.pop(context);
                // Return to step 0 or continue to Stage 1
                setState(() => _currentStep = 0);
              },
              child: Container(
                height: 52,
                decoration: AppTheme.gradientButtonDecoration(),
                child: Center(
                  child: Text(
                    'Proceed to Stage 1: Idea Refinement',
                    style: GoogleFonts.outfit(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: _currentStep > 0
            ? IconButton(
                icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Colors.white),
                onPressed: _prevStep,
              )
            : null,
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.bolt_rounded, color: AppTheme.amberSpark, size: 20),
            const SizedBox(width: 6),
            Text(
              'Stage 0: Spark Onboarding',
              style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Progress Indicator
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 8.0),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Step ${_currentStep + 1} of 5',
                        style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.amberSpark),
                      ),
                      Text(
                        '${((_currentStep + 1) / 5 * 100).toInt()}% Complete',
                        style: GoogleFonts.inter(fontSize: 12, color: AppTheme.textMuted),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: LinearProgressIndicator(
                      value: (_currentStep + 1) / 5,
                      backgroundColor: const Color(0xFF1E2640),
                      valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.amberSpark),
                      minHeight: 6,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 12),

            // Step Content Switcher
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 8.0),
                child: _buildStepContent(),
              ),
            ),

            // Bottom Navigation Footer
            Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: AppTheme.surfaceDark,
                border: Border(top: BorderSide(color: Color(0xFF2D3754))),
              ),
              child: Row(
                children: [
                  if (_currentStep > 0)
                    Expanded(
                      flex: 1,
                      child: OutlinedButton(
                        onPressed: _prevStep,
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          side: const BorderSide(color: Color(0xFF2D3754)),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        ),
                        child: Text(
                          'Back',
                          style: GoogleFonts.outfit(color: Colors.white, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  if (_currentStep > 0) const SizedBox(width: 12),
                  Expanded(
                    flex: 2,
                    child: GestureDetector(
                      onTap: _nextStep,
                      child: Container(
                        height: 50,
                        decoration: _currentStep == 4 ? AppTheme.amberButtonDecoration() : AppTheme.gradientButtonDecoration(),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              _currentStep == 4 ? 'Complete Onboarding' : 'Next Step',
                              style: GoogleFonts.outfit(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: _currentStep == 4 ? AppTheme.bgDark : Colors.white,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Icon(
                              _currentStep == 4 ? Icons.stars_rounded : Icons.arrow_forward_rounded,
                              color: _currentStep == 4 ? AppTheme.bgDark : Colors.white,
                              size: 18,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStepContent() {
    switch (_currentStep) {
      case 0:
        return _buildStep0CategoryPicker();
      case 1:
        return _buildStep1PersonaPicker();
      case 2:
        return _buildStep2ProblemSynthesizer();
      case 3:
        return _buildStep3AvatarBuilder();
      case 4:
        return _buildStep4ReviewSummary();
      default:
        return Container();
    }
  }

  // STEP 0: Category Picker
  Widget _buildStep0CategoryPicker() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '1. Choose a Spark Domain 💡',
          style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 4),
        Text(
          'Which real-world area are you most excited to innovate in?',
          style: GoogleFonts.inter(fontSize: 13, color: AppTheme.textMuted),
        ),
        const SizedBox(height: 20),
        ..._categories.map((cat) {
          final isSelected = _selectedCat == cat['title'];
          return GestureDetector(
            onTap: () => setState(() => _selectedCat = cat['title']),
            child: Container(
              margin: const EdgeInsets.only(bottom: 14),
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: isSelected ? AppTheme.primaryViolet.withOpacity(0.2) : AppTheme.cardDark,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: isSelected ? AppTheme.primaryViolet : const Color(0xFF2D3754),
                  width: isSelected ? 2 : 1,
                ),
              ),
              child: Row(
                children: [
                  Text(cat['icon']!, style: const TextStyle(fontSize: 32)),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          cat['title']!,
                          style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          cat['desc']!,
                          style: GoogleFonts.inter(fontSize: 12, color: AppTheme.textMuted),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        }).toList(),
      ],
    );
  }

  // STEP 1: Persona Picker
  Widget _buildStep1PersonaPicker() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '2. Who is your Target User? 👤',
          style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 4),
        Text(
          'Select the person whose daily pain point you want to solve.',
          style: GoogleFonts.inter(fontSize: 13, color: AppTheme.textMuted),
        ),
        const SizedBox(height: 20),
        ..._personas.map((p) {
          final isSelected = _selectedPerson == p['name'];
          return GestureDetector(
            onTap: () => setState(() => _selectedPerson = p['name']),
            child: Container(
              margin: const EdgeInsets.only(bottom: 14),
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: isSelected ? AppTheme.electricCyan.withOpacity(0.15) : AppTheme.cardDark,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: isSelected ? AppTheme.electricCyan : const Color(0xFF2D3754),
                  width: isSelected ? 2 : 1,
                ),
              ),
              child: Row(
                children: [
                  Text(p['avatar']!, style: const TextStyle(fontSize: 36)),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          p['name']!,
                          style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Challenge: ${p['challenge']!}',
                          style: GoogleFonts.inter(fontSize: 12, color: AppTheme.amberSpark),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        }).toList(),
      ],
    );
  }

  // STEP 2: Problem Synthesizer
  Widget _buildStep2ProblemSynthesizer() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '3. Define the Problem Statement 🎯',
          style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 4),
        Text(
          'Clearly express what issue needs fixing. Great startups solve real problems!',
          style: GoogleFonts.inter(fontSize: 13, color: AppTheme.textMuted),
        ),
        const SizedBox(height: 20),
        Container(
          padding: const EdgeInsets.all(18),
          decoration: AppTheme.glassCardDecoration(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.auto_awesome_rounded, color: AppTheme.amberSpark, size: 20),
                  const SizedBox(width: 8),
                  Text('AI Spark Helper', style: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.bold, color: AppTheme.amberSpark)),
                ],
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _problemTextController,
                maxLines: 4,
                style: const TextStyle(color: Colors.white, fontSize: 14),
                decoration: const InputDecoration(
                  hintText: 'Describe the problem...',
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // STEP 3: Avatar Builder
  Widget _buildStep3AvatarBuilder() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '4. Customize Your Founder Avatar 🎨',
          style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 4),
        Text(
          'Design your digital founder identity for badges and leaderboards.',
          style: GoogleFonts.inter(fontSize: 13, color: AppTheme.textMuted),
        ),
        const SizedBox(height: 24),
        Center(
          child: Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              color: AppTheme.primaryViolet.withOpacity(0.3),
              shape: BoxShape.circle,
              border: Border.all(color: AppTheme.amberSpark, width: 3),
            ),
            child: Center(
              child: Text(
                _avatarType == 'boy' ? '👦' : _avatarType == 'girl' ? '👧' : '🧑',
                style: const TextStyle(fontSize: 54),
              ),
            ),
          ),
        ),
        const SizedBox(height: 24),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _avatarTypeOption('Boy', 'boy'),
            const SizedBox(width: 12),
            _avatarTypeOption('Girl', 'girl'),
            const SizedBox(width: 12),
            _avatarTypeOption('Neutral', 'neutral'),
          ],
        ),
      ],
    );
  }

  Widget _avatarTypeOption(String label, String type) {
    final isSelected = _avatarType == type;
    return GestureDetector(
      onTap: () => setState(() => _avatarType = type),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        decoration: BoxDecoration(
          color: isSelected ? AppTheme.amberSpark : AppTheme.cardDark,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(
          label,
          style: GoogleFonts.outfit(
            fontWeight: FontWeight.bold,
            color: isSelected ? AppTheme.bgDark : Colors.white,
          ),
        ),
      ),
    );
  }

  // STEP 4: Review Summary
  Widget _buildStep4ReviewSummary() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '5. Review Your Startup Spark 🚀',
          style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        const SizedBox(height: 4),
        Text(
          'You are ready to ignite your founder journey!',
          style: GoogleFonts.inter(fontSize: 13, color: AppTheme.textMuted),
        ),
        const SizedBox(height: 20),
        Container(
          padding: const EdgeInsets.all(20),
          decoration: AppTheme.glassCardDecoration(borderAccent: AppTheme.amberSpark),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _summaryRow('Domain:', _selectedCat ?? 'Education & Learning'),
              const Divider(color: Color(0xFF2D3754)),
              _summaryRow('Target User:', _selectedPerson ?? 'Class 8 Student'),
              const Divider(color: Color(0xFF2D3754)),
              _summaryRow('Problem:', _problemTextController.text),
            ],
          ),
        ),
      ],
    );
  }

  Widget _summaryRow(String label, String val) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.amberSpark)),
          const SizedBox(height: 2),
          Text(val, style: GoogleFonts.outfit(fontSize: 14, color: Colors.white)),
        ],
      ),
    );
  }
}
