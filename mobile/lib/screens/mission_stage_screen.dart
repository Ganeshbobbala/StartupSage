import 'package:flutter/material.dart';
import '../widgets/mentor_card.dart';
import '../widgets/customer_card.dart';

class MissionStageScreen extends StatefulWidget {
  final int stageNumber;
  const MissionStageScreen({super.key, this.stageNumber = 1});

  @override
  State<MissionStageScreen> createState() => _MissionStageScreenState();
}

class _MissionStageScreenState extends State<MissionStageScreen> {
  String? selectedCustomer;
  bool decisionMade = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAF9F6),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: const BackButton(color: Color(0xFF1E293B)),
        title: Text(
          'Mission ${widget.stageNumber}: Stage Simulation',
          style: const TextStyle(
            color: Color(0xFF1E293B),
            fontWeight: FontWeight.w900,
            fontSize: 16,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const MentorCard(
              message:
                  'Listen to virtual customers explain their real-world problems. Select a customer to interview and formulate your startup solution!',
            ),
            const SizedBox(height: 16),
            const Text(
              'Virtual Customers',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF1E293B)),
            ),
            const SizedBox(height: 10),
            CustomerCard(
              name: 'Mrs. Sharma',
              role: 'Teacher',
              avatar: '👩‍🏫',
              problemStatement: 'I spend 3 hours every evening manually grading paper worksheets instead of planning engaging lessons.',
              isSelected: selectedCustomer == 'Mrs. Sharma',
              onSelect: () => setState(() => selectedCustomer = 'Mrs. Sharma'),
            ),
            const SizedBox(height: 10),
            CustomerCard(
              name: 'Dr. Mehta',
              role: 'Doctor',
              avatar: '👨‍⚕️',
              problemStatement: 'Patients forget follow-up appointments and misplace paper prescription records.',
              isSelected: selectedCustomer == 'Dr. Mehta',
              onSelect: () => setState(() => selectedCustomer = 'Dr. Mehta'),
            ),
            const SizedBox(height: 10),
            CustomerCard(
              name: 'Ramesh K.',
              role: 'Farmer',
              avatar: '🌾',
              problemStatement: 'Unpredictable rainfall causes soil damage because we lack simple local moisture sensors.',
              isSelected: selectedCustomer == 'Ramesh K.',
              onSelect: () => setState(() => selectedCustomer = 'Ramesh K.'),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: selectedCustomer != null
                    ? () {
                        setState(() {
                          decisionMade = true;
                        });
                      }
                    : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFFF6B00),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                ),
                child: const Text('Formulate Solution', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
              ),
            ),
            if (decisionMade) ...[
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFECFDF5),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFA7F3D0)),
                ),
                child: const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Mission Accomplished! 🎉',
                      style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF047857), fontSize: 14),
                    ),
                    SizedBox(height: 4),
                    Text(
                      'You successfully validated customer demand. +150 XP awarded!',
                      style: TextStyle(color: Color(0xFF065F46), fontSize: 12),
                    )
                  ],
                ),
              ),
            ]
          ],
        ),
      ),
    );
  }
}
