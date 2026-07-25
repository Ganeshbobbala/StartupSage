import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../core/constants/app_colors.dart';

enum ButtonStatus { defaultState, pressed, disabled, loading, completed }

class PrimaryButton extends StatefulWidget {
  final String label;
  final VoidCallback? onPressed;
  final ButtonStatus status;
  final IconData? icon;

  const PrimaryButton({
    super.key,
    required this.label,
    this.onPressed,
    this.status = ButtonStatus.defaultState,
    this.icon,
  });

  @override
  State<PrimaryButton> createState() => _PrimaryButtonState();
}

class _PrimaryButtonState extends State<PrimaryButton> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final isDisabled = widget.status == ButtonStatus.disabled || widget.onPressed == null;
    final isLoading = widget.status == ButtonStatus.loading;
    final isCompleted = widget.status == ButtonStatus.completed;

    Color bgColor = AppColors.primary;
    if (isDisabled) {
      bgColor = const Color(0xFF334155);
    } else if (isCompleted) {
      bgColor = AppColors.success;
    } else if (_isPressed || widget.status == ButtonStatus.pressed) {
      bgColor = AppColors.primaryPressed;
    }

    return GestureDetector(
      onTapDown: isDisabled || isLoading ? null : (_) => setState(() => _isPressed = true),
      onTapUp: isDisabled || isLoading ? null : (_) => setState(() => _isPressed = false),
      onTapCancel: isDisabled || isLoading ? null : () => setState(() => _isPressed = false),
      onTap: isDisabled || isLoading ? null : widget.onPressed,
      child: AnimatedScale(
        scale: _isPressed ? 0.97 : 1.0,
        duration: const Duration(milliseconds: 120),
        curve: Curves.easeOutCubic,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          height: 52,
          decoration: BoxDecoration(
            color: bgColor,
            borderRadius: BorderRadius.circular(16),
            boxShadow: isDisabled
                ? []
                : [
                    BoxShadow(
                      color: bgColor.withValues(alpha: 0.35),
                      blurRadius: _isPressed ? 6 : 14,
                      offset: _isPressed ? const Offset(0, 2) : const Offset(0, 5),
                    )
                  ],
          ),
          child: Center(
            child: isLoading
                ? const SizedBox(
                    width: 22,
                    height: 22,
                    child: CircularProgressIndicator(
                      color: Colors.white,
                      strokeWidth: 2.5,
                    ),
                  )
                : Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (isCompleted)
                        const Padding(
                          padding: EdgeInsets.only(right: 8.0),
                          child: Icon(Icons.check_circle_rounded, color: Colors.white, size: 20),
                        )
                      else if (widget.icon != null)
                        Padding(
                          padding: const EdgeInsets.only(right: 8.0),
                          child: Icon(widget.icon, color: Colors.white, size: 20),
                        ),
                      Text(
                        widget.label,
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: isDisabled ? AppColors.textMuted : Colors.white,
                        ),
                      ),
                    ],
                  ),
          ),
        ),
      ),
    );
  }
}
