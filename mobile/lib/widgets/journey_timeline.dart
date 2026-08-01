import 'package:flutter/material.dart';

class JourneyTimeline extends StatelessWidget {
  final List<int> completedStages;
  final int currentStage;
  final Function(int) onSelectStage;

  const JourneyTimeline({
    super.key,
    required this.completedStages,
    required this.currentStage,
    required this.onSelectStage,
  });

  static const List<String> stageTitles = [
    'Find a Problem',
    'Validate Idea',
    'Create Plan',
    'Dream Team',
    'Build MVP',
    'Launch & Wall',
    'Grow Startup',
    'Scale or Pivot',
    'Founder Passport'
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 90,
      margin: const EdgeInsets.symmetric(vertical: 12),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: stageTitles.length,
        itemBuilder: (context, index) {
          final isDone = completedStages.contains(index);
          final isCurrent = currentStage == index;

          return GestureDetector(
            onTap: () => onSelectStage(index),
            child: Container(
              width: 100,
              margin: const EdgeInsets.only(right: 10),
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: isCurrent
                    ? const Color(0xFFFF6B00)
                    : isDone
                        ? const Color(0xFFECFDF5)
                        : Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: isCurrent
                      ? const Color(0xFFFF6B00)
                      : isDone
                          ? const Color(0xFFA7F3D0)
                          : const Color(0xFFE2E8F0),
                ),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'STAGE $index',
                    style: TextStyle(
                      fontSize: 9,
                      fontWeight: FontWeight.w900,
                      color: isCurrent ? Colors.white70 : const Color(0xFFFF6B00),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    stageTitles[index],
                    maxLines: 2,
                    textAlign: TextAlign.center,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: isCurrent ? Colors.white : const Color(0xFF1E293B),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
