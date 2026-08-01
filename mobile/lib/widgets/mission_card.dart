import 'package:flutter/material.dart';

class MissionCard extends StatelessWidget {
  final int stageIndex;
  final String title;
  final String roomName;
  final String description;
  final bool isCompleted;
  final bool isCurrent;
  final VoidCallback onEnterMission;

  const MissionCard({
    super.key,
    required this.stageIndex,
    required this.title,
    required this.roomName,
    required this.description,
    this.isCompleted = false,
    this.isCurrent = false,
    required this.onEnterMission,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isCurrent ? const Color(0xFFFFF4EC) : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isCurrent
              ? const Color(0xFFFF6B00)
              : isCompleted
                  ? const Color(0xFFA7F3D0)
                  : const Color(0xFFE2E8F0),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Row(
                children: [
                  Container(
                    width: 36,
                    height: 36,
                    decoration: BoxDecoration(
                      color: isCompleted
                          ? const Color(0xFF10B981)
                          : isCurrent
                              ? const Color(0xFFFF6B00)
                              : const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Center(
                      child: isCompleted
                          ? const Icon(Icons.check, color: Colors.white, size: 20)
                          : Text(
                              '${stageIndex + 1}',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: isCurrent ? Colors.white : const Color(0xFF64748B),
                              ),
                            ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'MISSION ${stageIndex + 1}',
                        style: const TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFFFF6B00),
                        ),
                      ),
                      Text(
                        title,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1E293B),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: isCompleted
                      ? const Color(0xFFECFDF5)
                      : isCurrent
                          ? const Color(0xFFFF6B00)
                          : const Color(0xFFF1F5F9),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  isCompleted ? 'Done ✓' : isCurrent ? 'Active' : 'Ready',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: isCompleted
                        ? const Color(0xFF047857)
                        : isCurrent
                            ? Colors.white
                            : const Color(0xFF64748B),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: onEnterMission,
              style: ElevatedButton.styleFrom(
                backgroundColor: isCurrent ? const Color(0xFFFF6B00) : Colors.white,
                foregroundColor: isCurrent ? Colors.white : const Color(0xFFFF6B00),
                side: const BorderSide(color: Color(0xFFFF6B00)),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                elevation: 0,
              ),
              child: Text(
                isCurrent ? 'Enter Mission' : 'Open Room',
                style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
