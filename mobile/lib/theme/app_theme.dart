import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Brand Color Palette - Modern, vibrant, non-generic
  static const Color bgDark = Color(0xFF0B0F19);
  static const Color surfaceDark = Color(0xFF161C2E);
  static const Color cardDark = Color(0xFF1E2640);
  
  static const Color primaryViolet = Color(0xFF6366F1);
  static const Color primaryHover = Color(0xFF4F46E5);
  static const Color electricCyan = Color(0xFF06B6D4);
  static const Color amberSpark = Color(0xFFFFB800);
  static const Color coralFire = Color(0xFFFF4757);
  static const Color emeraldGreen = Color(0xFF10B981);
  
  static const Color textLight = Color(0xFFF8FAFC);
  static const Color textMuted = Color(0xFF94A3B8);

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: bgDark,
      colorScheme: const ColorScheme.dark(
        primary: primaryViolet,
        secondary: electricCyan,
        tertiary: amberSpark,
        surface: surfaceDark,
        error: coralFire,
      ),
      textTheme: GoogleFonts.outfitTextTheme(ThemeData.dark().textTheme).copyWith(
        displayLarge: GoogleFonts.outfit(
          color: textLight,
          fontSize: 32,
          fontWeight: FontWeight.w800,
          letterSpacing: -0.5,
        ),
        titleLarge: GoogleFonts.outfit(
          color: textLight,
          fontSize: 22,
          fontWeight: FontWeight.bold,
        ),
        bodyLarge: GoogleFonts.inter(
          color: textLight,
          fontSize: 16,
        ),
        bodyMedium: GoogleFonts.inter(
          color: textMuted,
          fontSize: 14,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFF13192B),
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFF2D3754)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFF2D3754)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: primaryViolet, width: 2),
        ),
        hintStyle: GoogleFonts.inter(color: const Color(0xFF64748B), fontSize: 14),
      ),
    );
  }

  // Gradient Decorations
  static BoxDecoration glassCardDecoration({Color? borderAccent}) {
    return BoxDecoration(
      color: cardDark.withOpacity(0.85),
      borderRadius: BorderRadius.circular(24),
      border: Border.all(
        color: borderAccent ?? const Color(0xFF2D3754),
        width: 1.5,
      ),
      boxShadow: [
        BoxShadow(
          color: Colors.black.withOpacity(0.3),
          blurRadius: 20,
          offset: const Offset(0, 8),
        )
      ],
    );
  }

  static BoxDecoration gradientButtonDecoration() {
    return BoxDecoration(
      gradient: const LinearGradient(
        colors: [primaryViolet, primaryHover],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      borderRadius: BorderRadius.circular(18),
      boxShadow: [
        BoxShadow(
          color: primaryViolet.withOpacity(0.4),
          blurRadius: 16,
          offset: const Offset(0, 6),
        )
      ],
    );
  }

  static BoxDecoration amberButtonDecoration() {
    return BoxDecoration(
      gradient: const LinearGradient(
        colors: [amberSpark, Color(0xFFF59E0B)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      borderRadius: BorderRadius.circular(18),
      boxShadow: [
        BoxShadow(
          color: amberSpark.withOpacity(0.35),
          blurRadius: 16,
          offset: const Offset(0, 6),
        )
      ],
    );
  }
}
