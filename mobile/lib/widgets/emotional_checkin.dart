import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../core/constants/app_colors.dart';

class EmotionalCheckIn extends StatefulWidget {
  final Function(String emotion)? onSelected;

  const EmotionalCheckIn({super.key, this.onSelected});

  @override
  State<EmotionalCheckIn> createState() => _EmotionalCheckInState();
}

class _EmotionalCheckInState extends State<EmotionalCheckIn> {
  String? _selectedEmotion;

  final List<Map<String, String>> _emotions = [
    {'label': 'Excited', 'icon': '🚀', 'color': '0xFFF97316'},
    {'label': 'Confident', 'icon': '🦁', 'color': '0xFF10B981'},
    {'label': 'Unsure', 'icon': '🤔', 'color': '0xFF3B82F6'},
    {'label': 'Worried', 'icon': '😟', 'color': '0xFFEC4899'},
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF13192B),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Founder Reflection',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: AppColors.primary,
              letterSpacing: 1.0,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            'How are you feeling about your startup right now?',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppColors.textLight,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: _emotions.map((e) {
              final isSelected = _selectedEmotion == e['label'];
              return Expanded(
                child: GestureDetector(
                  onTap: () {
                    setState(() => _selectedEmotion = e['label']);
                    if (widget.onSelected != null) widget.onSelected!(e['label']!);
                  },
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? AppColors.primary.withValues(alpha: 0.2)
                          : AppColors.cardDark,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: isSelected ? AppColors.primary : AppColors.borderDark,
                        width: isSelected ? 2 : 1,
                      ),
                    ),
                    child: Column(
                      children: [
                        Text(e['icon']!, style: const TextStyle(fontSize: 24)),
                        const SizedBox(height: 6),
                        Text(
                          e['label']!,
                          style: GoogleFonts.inter(
                            fontSize: 11,
                            fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                            color: isSelected ? AppColors.primary : AppColors.textMuted,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
          if (_selectedEmotion != null) ...[
            const SizedBox(height: 14),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.primaryLight.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.tips_and_updates_rounded, color: AppColors.primary, size: 18),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      _selectedEmotion == 'Excited'
                          ? '🚀 Energy Boost: Channel your excitement into user interviews!'
                          : _selectedEmotion == 'Confident'
                          ? '🦁 Resilience Unlocked: Keep testing your core assumptions.'
                          : _selectedEmotion == 'Unsure'
                          ? '🤔 Reflection Note: Share your draft idea with 3 classmates.'
                          : '😟 Founder Support: Every great founder faces doubt. Take it step-by-step!',
                      style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.primary),
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
