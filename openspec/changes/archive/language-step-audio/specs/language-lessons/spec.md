# Language lessons — audio delta

## ADDED REQ-LANG-014 Listen on dialogue and teach

**Given** a language lesson step with dialogue lines or teach items  
**When** the learner taps Listen  
**Then** the app plays `audioUrl` if provided, otherwise TTS for the track language  
**And** missing Speech API fails softly without breaking the lesson
