import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';

class DomainModel {
  final String id;
  final String name;
  final String icon;
  final String description;
  final Color accentColor;
  final List<String> scenarios;

  const DomainModel({
    required this.id,
    required this.name,
    required this.icon,
    required this.description,
    required this.accentColor,
    required this.scenarios,
  });

  static const List<DomainModel> domains = [
    DomainModel(
      id: 'healthtech',
      name: 'HealthTech',
      icon: '🏥',
      description: 'Improve student posture, mental well-being, and daily active habits.',
      accentColor: AppColors.healthTech,
      scenarios: [
        'Students spend hours slouching over screens with bad posture and fatigue.',
        'Teenagers struggle with exam stress and sleep deprivation.',
        'School canteens serve junk food because healthy options are inconvenient.',
      ],
    ),
    DomainModel(
      id: 'edtech',
      name: 'EdTech',
      icon: '📚',
      description: 'Transform homework, study habits, and classroom collaboration.',
      accentColor: AppColors.edTech,
      scenarios: [
        'Students struggle to remember assignments across multiple classes.',
        'Teachers spend hours grading repetitive practice worksheets manually.',
        'Parents do not know where their child needs extra learning support.',
      ],
    ),
    DomainModel(
      id: 'fintech',
      name: 'FinTech',
      icon: '💳',
      description: 'Teach financial literacy, pocket money management, and smart saving.',
      accentColor: AppColors.finTech,
      scenarios: [
        'Students run out of allowance quickly without understanding budgeting.',
        'Kids struggle to save money for long-term personal goals or equipment.',
        'School clubs find it difficult to collect and track event fees transparently.',
      ],
    ),
    DomainModel(
      id: 'agritech',
      name: 'AgriTech',
      icon: '🚜',
      description: 'Help community gardens and local farms monitor soil and reduce crop waste.',
      accentColor: AppColors.agriTech,
      scenarios: [
        'Local growers lose crops because they cannot detect soil moisture drops early.',
        'School organic gardens waste water due to manual unmetered watering.',
        'Fresh produce spoils before reaching local neighborhood buyers.',
      ],
    ),
    DomainModel(
      id: 'd2c',
      name: 'D2C',
      icon: '🛍️',
      description: 'Create custom handcrafted products, eco-merch, and student brands.',
      accentColor: AppColors.d2c,
      scenarios: [
        'Student creators have great handcrafted items but lack a trusted store channel.',
        'Eco-friendly school supplies are expensive and hard to find locally.',
        'Custom school spirit merchandise takes weeks to produce and ship.',
      ],
    ),
    DomainModel(
      id: 'saas',
      name: 'SaaS',
      icon: '⚙️',
      description: 'Build digital productivity tools for school clubs, events, and teams.',
      accentColor: AppColors.saas,
      scenarios: [
        'School clubs waste hours manually tracking volunteer shifts on paper.',
        'Event organizers struggle to collect participant feedback efficiently.',
        'Campus libraries lack a simple digital reservation tool for study rooms.',
      ],
    ),
    DomainModel(
      id: 'ai_tech',
      name: 'AI / Technology',
      icon: '🤖',
      description: 'Leverage smart automation, vision AI, and bite-sized tech helpers.',
      accentColor: AppColors.aiTech,
      scenarios: [
        'Students find technical coding concepts dry without instant visual feedback.',
        'Campus cafeterias cannot predict daily meal demand leading to food waste.',
        'Visually impaired campus visitors struggle to navigate unfamiliar buildings.',
      ],
    ),
  ];
}
