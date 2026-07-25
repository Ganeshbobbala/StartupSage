import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/theme/app_theme.dart';
import '../../../providers/game_provider.dart';
import '../../../widgets/primary_button.dart';
import '../../onboarding/screens/stage0_splash_screen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _schoolController = TextEditingController(text: 'Delhi Public School');
  final _classCodeController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  String _selectedGrade = 'Class 8';
  bool _acceptedPledge = true;
  bool _obscurePassword = true;
  ButtonStatus _buttonStatus = ButtonStatus.defaultState;

  @override
  void dispose() {
    _nameController.dispose();
    _schoolController.dispose();
    _classCodeController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleRegister() {
    if (!_formKey.currentState!.validate()) return;
    if (!_acceptedPledge) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please accept the Young Founder Pledge to continue.')),
      );
      return;
    }

    setState(() => _buttonStatus = ButtonStatus.loading);

    Future.delayed(const Duration(milliseconds: 800), () {
      if (!mounted) return;
      final name = _nameController.text.trim().isEmpty ? 'Young Founder' : _nameController.text.trim();
      final provider = Provider.of<GameProvider>(context, listen: false);

      provider.login(
        name: name,
        role: 'Student',
        school: _schoolController.text.trim(),
        grade: _selectedGrade,
      );

      setState(() => _buttonStatus = ButtonStatus.completed);

      Future.delayed(const Duration(milliseconds: 300), () {
        if (!mounted) return;
        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => const Stage0SplashScreen()),
          (route) => false,
        );
      });
    });
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
        title: Text(
          'Founder Registration',
          style: GoogleFonts.plusJakartaSans(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18),
        ),
        centerTitle: true,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 12.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Banner
                Container(
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: AppColors.primary.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 48,
                        height: 48,
                        decoration: BoxDecoration(
                          color: AppColors.primary,
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: const Icon(Icons.workspace_premium_rounded, color: Colors.white, size: 28),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Start Your Startup Journey',
                              style: GoogleFonts.plusJakartaSans(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              'Gain +150 XP bonus upon registration!',
                              style: GoogleFonts.inter(
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                                color: AppColors.warning,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                // Form Card
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: AppTheme.cardDecoration(),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Full Name', style: GoogleFonts.plusJakartaSans(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                      const SizedBox(height: 6),
                      TextFormField(
                        controller: _nameController,
                        style: const TextStyle(color: Colors.white, fontSize: 14),
                        validator: (value) {
                          if (value == null || value.trim().isEmpty) return 'Please enter your name';
                          return null;
                        },
                        decoration: const InputDecoration(
                          hintText: 'e.g. Aarav Sharma',
                          prefixIcon: Icon(Icons.person_outline_rounded, color: AppColors.primary, size: 20),
                        ),
                      ),

                      const SizedBox(height: 16),

                      Text('School Name', style: GoogleFonts.plusJakartaSans(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                      const SizedBox(height: 6),
                      TextFormField(
                        controller: _schoolController,
                        style: const TextStyle(color: Colors.white, fontSize: 14),
                        decoration: const InputDecoration(
                          hintText: 'Enter your school name',
                          prefixIcon: Icon(Icons.school_outlined, color: AppColors.primary, size: 20),
                        ),
                      ),

                      const SizedBox(height: 16),

                      Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Grade / Class', style: GoogleFonts.plusJakartaSans(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                                const SizedBox(height: 6),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 14),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF13192B),
                                    borderRadius: BorderRadius.circular(16),
                                    border: Border.all(color: AppColors.borderDark),
                                  ),
                                  child: DropdownButtonHideUnderline(
                                    child: DropdownButton<String>(
                                      value: _selectedGrade,
                                      isExpanded: true,
                                      dropdownColor: const Color(0xFF161C2E),
                                      style: GoogleFonts.inter(color: Colors.white, fontSize: 13),
                                      items: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map((g) {
                                        return DropdownMenuItem(value: g, child: Text(g));
                                      }).toList(),
                                      onChanged: (val) {
                                        if (val != null) setState(() => _selectedGrade = val);
                                      },
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Class Code', style: GoogleFonts.plusJakartaSans(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                                const SizedBox(height: 6),
                                TextFormField(
                                  controller: _classCodeController,
                                  style: const TextStyle(color: Colors.white, fontSize: 14),
                                  decoration: const InputDecoration(hintText: 'e.g. SAGE-8B'),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 16),

                      Text('Email Address', style: GoogleFonts.plusJakartaSans(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                      const SizedBox(height: 6),
                      TextFormField(
                        controller: _emailController,
                        style: const TextStyle(color: Colors.white, fontSize: 14),
                        validator: (value) {
                          if (value == null || value.trim().isEmpty) return 'Please enter your email';
                          return null;
                        },
                        decoration: const InputDecoration(
                          hintText: 'founder@school.edu',
                          prefixIcon: Icon(Icons.email_outlined, color: AppColors.primary, size: 20),
                        ),
                      ),

                      const SizedBox(height: 16),

                      Text('Password', style: GoogleFonts.plusJakartaSans(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                      const SizedBox(height: 6),
                      TextFormField(
                        controller: _passwordController,
                        obscureText: _obscurePassword,
                        style: const TextStyle(color: Colors.white, fontSize: 14),
                        validator: (value) {
                          if (value == null || value.isEmpty) return 'Please enter a password';
                          return null;
                        },
                        decoration: InputDecoration(
                          hintText: 'Create a password',
                          prefixIcon: const Icon(Icons.lock_outline_rounded, color: AppColors.primary, size: 20),
                          suffixIcon: IconButton(
                            icon: Icon(_obscurePassword ? Icons.visibility_off_outlined : Icons.visibility_outlined, color: AppColors.textMuted, size: 20),
                            onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                          ),
                        ),
                      ),

                      const SizedBox(height: 20),

                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(
                            height: 24,
                            width: 24,
                            child: Checkbox(
                              value: _acceptedPledge,
                              activeColor: AppColors.primary,
                              checkColor: Colors.white,
                              onChanged: (val) => setState(() => _acceptedPledge = val ?? true),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              'I accept the Young Founder Pledge to build innovative solutions for positive impact.',
                              style: GoogleFonts.inter(fontSize: 12, color: AppColors.textMuted, height: 1.4),
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 24),

                      PrimaryButton(
                        label: 'Create Founder Account',
                        icon: Icons.rocket_launch_rounded,
                        status: _buttonStatus,
                        onPressed: _handleRegister,
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
