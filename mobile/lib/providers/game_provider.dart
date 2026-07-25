import 'package:flutter/material.dart';

class GameProvider extends ChangeNotifier {
  // Auth state
  bool _isLoggedIn = false;
  String _userRole = 'Student'; // Student, Teacher, Parent
  String _userName = 'Guest Founder';
  String _schoolName = 'Delhi Public School';
  String _gradeClass = 'Class 8-A';

  // Stage 0 Onboarding State
  int _currentStep = 0; // 0 to 4
  String? _selectedCategory;
  String? _selectedPersona;
  String _problemStatement = '';
  String _avatarType = 'boy'; // boy, girl, neutral
  String _avatarHairColor = '#FFB800';
  String _avatarOutfitColor = '#6366F1';

  // Progress & Gamification
  int _currentStage = 0;
  int _xp = 150;
  int _coins = 40;
  int _level = 1;
  List<String> _unlockedBadges = ['spark-starter'];

  // Getters
  bool get isLoggedIn => _isLoggedIn;
  String get userRole => _userRole;
  String get userName => _userName;
  String get schoolName => _schoolName;
  String get gradeClass => _gradeClass;

  int get currentStep => _currentStep;
  String? get selectedCategory => _selectedCategory;
  String? get selectedPersona => _selectedPersona;
  String get problemStatement => _problemStatement;
  String get avatarType => _avatarType;
  String get avatarHairColor => _avatarHairColor;
  String get avatarOutfitColor => _avatarOutfitColor;

  int get currentStage => _currentStage;
  int get xp => _xp;
  int get coins => _coins;
  int get level => _level;
  List<String> get unlockedBadges => _unlockedBadges;

  // Auth Methods
  void login({required String name, required String role, String? school, String? grade}) {
    _isLoggedIn = true;
    _userName = name;
    _userRole = role;
    if (school != null) _schoolName = school;
    if (grade != null) _gradeClass = grade;
    notifyListeners();
  }

  void logout() {
    _isLoggedIn = false;
    _userName = 'Guest Founder';
    notifyListeners();
  }

  void setUserRole(String role) {
    _userRole = role;
    notifyListeners();
  }

  // Stage 0 Methods
  void setCategory(String category) {
    _selectedCategory = category;
    notifyListeners();
  }

  void setPersona(String persona) {
    _selectedPersona = persona;
    notifyListeners();
  }

  void setProblemStatement(String text) {
    _problemStatement = text;
    notifyListeners();
  }

  void setAvatarConfig({String? type, String? hair, String? outfit}) {
    if (type != null) _avatarType = type;
    if (hair != null) _avatarHairColor = hair;
    if (outfit != null) _avatarOutfitColor = outfit;
    notifyListeners();
  }

  void setStep(int step) {
    _currentStep = step;
    notifyListeners();
  }

  void completeStage0() {
    _currentStage = 1;
    _xp += 250;
    _coins += 50;
    if (!_unlockedBadges.contains('spark-master')) {
      _unlockedBadges.add('spark-master');
    }
    notifyListeners();
  }
}
