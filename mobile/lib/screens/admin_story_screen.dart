import 'package:flutter/material.dart';

class AdminStoryScreen extends StatelessWidget {
  const AdminStoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAF9F6),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B),
        elevation: 0,
        title: const Text(
          'Academy Director Portal',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Row(
                children: [
                  Text('🏛️', style: TextStyle(fontSize: 32)),
                  SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Startup Academy Director',
                          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        Text(
                          '1,420 Active Student Founders | 540 Passports Issued',
                          style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Mission Completion Funnel',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF1E293B)),
            ),
            const SizedBox(height: 8),
            _funnelItem('Mission 1: Find Problem', 1.0, '1,420 Founders'),
            _funnelItem('Mission 2: Validate Idea', 0.9, '1,280 Founders'),
            _funnelItem('Mission 3: Create Plan', 0.78, '1,110 Founders'),
            _funnelItem('Mission 4: Build MVP', 0.66, '940 Founders'),
            _funnelItem('Mission 5: Launch & Wall', 0.58, '820 Founders'),
            _funnelItem('Mission 6: Grow Startup', 0.5, '710 Founders'),
            _funnelItem('Mission 7: Scale Crossroads', 0.44, '620 Founders'),
            _funnelItem('Mission 8: Founder Passport', 0.38, '540 Passports'),
          ],
        ),
      ),
    );
  }

  Widget _funnelItem(String label, double progress, String count) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF1E293B))),
              Text(count, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFFF6B00))),
            ],
          ),
          const SizedBox(height: 6),
          LinearProgressIndicator(
            value: progress,
            backgroundColor: const Color(0xFFF1F5F9),
            color: const Color(0xFFFF6B00),
            minHeight: 6,
          ),
        ],
      ),
    );
  }
}
