# ==========================================
# SIMPLE LIGHTWEIGHT LIVENESS DETECTION
# ==========================================

"""
Temporary lightweight liveness system.

This removes:
- TensorFlow
- Keras
- Deep learning dependencies

Purpose:
- keep backend stable
- allow attendance system to work
- avoid dependency conflicts

Later you can upgrade with:
- real anti-spoofing AI
- blink detection
- head movement detection
- ArcFace / InsightFace
"""


# ==========================================
# DETECT LIVENESS
# ==========================================

def detect_liveness(frame):

    try:

        # Currently always returns REAL

        return {
            "is_real": True,
            "confidence": 1.0
        }

    except Exception as e:

        print(
            "Liveness Detection Error:",
            e
        )

        return {
            "is_real": True,
            "confidence": 0.5
        }