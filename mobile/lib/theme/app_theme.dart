import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // BPT Orange Design System
  static const Color bptOrange = Color(0xFFFF6B00);
  static const Color bptOrangeHover = Color(0xFFE05D00);
  static const Color bptOrangeLight = Color(0xFFFFF4EC);

  static const Color bgLight = Color(0xFFFAF9F6);
  static const Color cardLight = Colors.white;
  static const Color textDark = Color(0xFF1E293B);
  static const Color textMuted = Color(0xFF64748B);
  static const Color borderLight = Color(0xFFE2E8F0);

  static const Color successGreen = Color(0xFF10B981);
  static const Color warningAmber = Color(0xFFF59E0B);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: bgLight,
      colorScheme: const ColorScheme.light(
        primary: bptOrange,
        secondary: Color(0xFF0EA5E9),
        tertiary: warningAmber,
        surface: cardLight,
        error: Color(0xFFEF4444),
      ),
      textTheme: GoogleFonts.plusJakartaSansTextTheme().copyWith(
        displayLarge: GoogleFonts.plusJakartaSans(
          color: textDark,
          fontSize: 30,
          fontWeight: FontWeight.w800,
        ),
        titleLarge: GoogleFonts.plusJakartaSans(
          color: textDark,
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
        bodyLarge: GoogleFonts.inter(
          color: textDark,
          fontSize: 16,
        ),
        bodyMedium: GoogleFonts.inter(
          color: textMuted,
          fontSize: 14,
        ),
      ),
    );
  }

  static ThemeData get darkTheme => lightTheme; // Defaulting to clean academy theme

  static BoxDecoration academyCardDecoration({Color? borderAccent}) {
    return BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(18),
      border: Border.all(
        color: borderAccent ?? borderLight,
        width: 1.5,
      ),
      boxShadow: [
        BoxShadow(
          color: Colors.black.withOpacity(0.04),
          blurRadius: 12,
          offset: const Offset(0, 4),
        )
      ],
    );
  }

  static BoxDecoration bptButtonDecoration() {
    return BoxDecoration(
      color: bptOrange,
      borderRadius: BorderRadius.circular(14),
      boxShadow: [
        BoxShadow(
          color: bptOrange.withOpacity(0.3),
          blurRadius: 12,
          offset: const Offset(0, 4),
        )
      ],
    );
  }
}
