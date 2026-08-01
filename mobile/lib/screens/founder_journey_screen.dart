import 'package:flutter/material.dart';
import '../widgets/mentor_card.dart';
import '../widgets/mission_card.dart';
import '../widgets/journey_timeline.dart';

class FounderJourneyScreen extends StatefulWidget {
  const FounderJourneyScreen({super.key});

  @override
  State<FounderJourneyScreen> createState() => _FounderJourneyScreenState();
}

class _FounderJourneyScreenState extends State<FounderJourneyScreen> {
  int currentStage = 0;
  List<int> completedStages = [];

  final List<Map<String, String>> missions = const [
    {
      'title': 'Find a Problem',
      'room': 'Spark Discovery Lab',
      'desc': 'Interview virtual customers and select your problem domain.'
    },
    {
      'title': 'Validate Your Idea',
      'room': 'Customer Validation Room',
      'desc': 'Test your idea with 3-way virtual customer conversations.'
    },
    {
      'title': 'Create Your Plan',
      'room': 'Canvas Strategy Room',
      'desc': 'Build your 6-block Lean Canvas strategy.'
    },
    {
      'title': 'Build Your MVP',
      'room': 'MVP Launch Studio',
      'desc': 'Allocate seed budget to build product features.'
    },
    {
      'title': 'Launch & Crisis',
      'room': 'Crisis Arena',
      'desc': 'Face "The Wall" and solve customer complaints.'
    },
    {
      'title': 'Grow Startup',
      'room': 'Growth Engine Room',
      'desc': 'Run 6 months of growth experiments.'
    },
    {
      'title': 'Scale or Pivot',
      'room': 'Founder Crossroads',
      'desc': 'Make the final strategic crossroads decision.'
    },
    {
      'title': 'Become a Founder',
      'room': 'Graduation Hall',
      'desc': 'Receive your Founder Passport and certificate.'
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAF9F6),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Founder Journey',
          style: TextStyle(
            color: Color(0xFF1E293B),
            fontWeight: FontWeight.w900,
            fontSize: 18,
          ),
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: const Color(0xFFFF6B00),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Row(
              children: [
                Icon(Icons.bolt, color: Colors.white, size: 16),
                SizedBox(width: 4),
                Text(
                  '1,450 XP',
                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                ),
              ],
            ),
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Virtual Mentor Sage
            MentorCard(
              mentorName: 'Sage',
              role: 'Virtual Mentor',
              message:
                  'Welcome to Startup Academy! You are currently inside ${missions[currentStage]['room']}. Tap Enter Mission below to begin!',
              actionText: 'Enter Mission ${currentStage + 1}',
              onAction: () {},
            ),
            const SizedBox(height: 16),

            const Text(
              'Startup Academy Map',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: Color(0xFFFF6B00)),
            ),
            JourneyTimeline(
              completedStages: completedStages,
              currentStage: currentStage,
              onSelectStage: (idx) {
                setState(() {
                  currentStage = idx;
                });
              },
            ),
            const SizedBox(height: 12),

            const Text(
              'Academy Missions',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF1E293B)),
            ),
            const SizedBox(height: 8),

            ...List.generate(missions.length, (idx) {
              final m = missions[idx];
              return MissionCard(
                stageIndex: idx,
                title: m['title']!,
                roomName: m['room']!,
                description: m['desc']!,
                isCompleted: completedStages.contains(idx),
                isCurrent: currentStage == idx,
                onEnterMission: () {
                  setState(() {
                    currentStage = idx;
                  });
                },
              );
            }),
          ],
        ),
      ),
    );
  }
}
