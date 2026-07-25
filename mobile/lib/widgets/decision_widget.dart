import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../core/constants/app_colors.dart';
import 'primary_button.dart';

class DecisionOption {
  final String id;
  final String title;
  final String description;
  final String consequence;

  const DecisionOption({
    required this.id,
    required this.title,
    required this.description,
    required this.consequence,
  });
}

class DecisionWidget extends StatefulWidget {
  final String question;
  final List<DecisionOption> options;
  final Function(DecisionOption selected) onConfirm;

  const DecisionWidget({
    super.key,
    required this.question,
    required this.options,
    required this.onConfirm,
  });

  @override
  State<DecisionWidget> createState() => _DecisionWidgetState();
}

class _DecisionWidgetState extends State<DecisionWidget> {
  DecisionOption? _selectedOption;
  bool _isConfirmed = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.surfaceDark,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.borderDark),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppColors.primary.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.alt_route_rounded, color: AppColors.primary, size: 20),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  'Founder Decision',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            widget.question,
            style: GoogleFonts.plusJakartaSans(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: AppColors.textLight,
            ),
          ),
          const SizedBox(height: 18),
          ...widget.options.map((opt) {
            final isSelected = _selectedOption?.id == opt.id;
            return GestureDetector(
              onTap: _isConfirmed ? null : () => setState(() => _selectedOption = opt),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: isSelected ? AppColors.primary.withValues(alpha: 0.15) : AppColors.cardDark,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isSelected ? AppColors.primary : AppColors.borderDark,
                    width: isSelected ? 2 : 1,
                  ),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Radio<String>(
                      value: opt.id,
                      groupValue: _selectedOption?.id,
                      activeColor: AppColors.primary,
                      onChanged: _isConfirmed ? null : (_) => setState(() => _selectedOption = opt),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            opt.title,
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                              color: AppColors.textLight,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            opt.description,
                            style: GoogleFonts.inter(
                              fontSize: 13,
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
          const SizedBox(height: 16),
          if (!_isConfirmed)
            PrimaryButton(
              label: 'Confirm Founder Choice',
              icon: Icons.check_circle_outline_rounded,
              status: _selectedOption == null ? ButtonStatus.disabled : ButtonStatus.defaultState,
              onPressed: _selectedOption == null
                  ? null
                  : () {
                      setState(() => _isConfirmed = true);
                      widget.onConfirm(_selectedOption!);
                    },
            ),
          if (_isConfirmed && _selectedOption != null) ...[
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.success.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.success.withValues(alpha: 0.3)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.info_outline_rounded, color: AppColors.success, size: 22),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      'Consequence: ${_selectedOption!.consequence}',
                      style: GoogleFonts.inter(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: AppColors.success,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}
