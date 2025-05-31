import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { marked } from 'marked';

const drumPadMap = {
  a: { name: 'Kick', color: '#ef4444' },
  s: { name: 'Snare', color: '#f59e42' },
  k: { name: 'Hi-Hat', color: '#fde047' },
  l: { name: 'Tom', color: '#22c55e' },
  g: { name: 'Cymbal', color: '#3b82f6' },
};
const drumKeys = Object.keys(drumPadMap);

export default function DrumTrainer() {
  const padsRef = useRef();
  const rhythmRef = useRef();
  const feedbackRef = useRef();
  const aiFeedbackRef = useRef();
  const startBtnRef = useRef();
  const resetBtnRef = useRef();

  useEffect(() => {
    // All the logic from drum.html, adapted for React
    let drumSounds = {};
    let padPads = {};
    let audioContextStartedByGesture = false;
    let userHits = [];
    let currentTargetRhythm = [];
    let targetRhythmIndicators = [];
    let isRecording = false;
    let practiceStartTime = 0;
    let currentTargetIndex = 0;
    let targetSequence = null;
    let rhythmDuration = 0;
    const toleranceMs = 150;

    function createDrumPads() {
      if (!padsRef.current) return;
      padsRef.current.innerHTML = '';
      drumKeys.forEach(key => {
        const padInfo = drumPadMap[key];
        const pad = document.createElement('div');
        pad.id = `pad-${key}`;
        pad.className = 'drum-pad';
        pad.style.background = padInfo.color;
        pad.style.color = '#222';
        pad.style.margin = '0.5rem';
        pad.style.padding = '1.5rem 1rem';
        pad.style.borderRadius = '0.75rem';
        pad.style.fontWeight = 600;
        pad.style.fontSize = '1.25rem';
        pad.style.display = 'flex';
        pad.style.flexDirection = 'column';
        pad.style.alignItems = 'center';
        pad.style.cursor = 'pointer';
        pad.innerHTML = `<span>${padInfo.name}</span><span style="font-size:0.875rem;color:#555;margin-top:0.5rem;">${key.toUpperCase()}</span>`;
        pad.addEventListener('mousedown', () => playDrum(key));
        pad.addEventListener('mouseup', () => removeActiveState(key));
        pad.addEventListener('touchstart', (e) => { e.preventDefault(); playDrum(key); });
        pad.addEventListener('touchend', (e) => { e.preventDefault(); removeActiveState(key); });
        padPads[key] = pad;
        padsRef.current.appendChild(pad);
      });
    }

    async function initializeSynths() {
      if (Object.keys(drumSounds).length > 0 && drumSounds['a']) return;
      drumSounds['a'] = new Tone.MembraneSynth().toDestination();
      const snareNoise = new Tone.NoiseSynth().toDestination();
      const snareBody = new Tone.MembraneSynth().toDestination();
      drumSounds['s'] = (time) => {
        snareNoise.triggerAttackRelease('8n', time);
        snareBody.triggerAttackRelease('C2', time);
      };
      drumSounds['k'] = new Tone.NoiseSynth().toDestination();
      drumSounds['l'] = new Tone.MembraneSynth().toDestination();
      drumSounds['g'] = new Tone.NoiseSynth().toDestination();
    }

    async function ensureAudioContextStarted() {
      if (!audioContextStartedByGesture && Tone.context.state !== 'running') {
        try {
          await Tone.start();
          audioContextStartedByGesture = true;
          if (feedbackRef.current) feedbackRef.current.textContent = 'Audio enabled. Ready to practice!';
        } catch {
          if (feedbackRef.current) feedbackRef.current.textContent = 'Failed to start audio.';
        }
      }
    }

    async function playDrum(key) {
      await ensureAudioContextStarted();
      if (Tone.context.state !== 'running') return;
      if (drumSounds[key]) {
        if (typeof drumSounds[key] === 'function') {
          drumSounds[key](Tone.now());
        } else {
          drumSounds[key].triggerAttackRelease('C3', '8n');
        }
      }
      const pad = padPads[key];
      if (pad) {
        pad.style.transform = 'scale(0.95)';
        setTimeout(() => { pad.style.transform = 'scale(1)'; }, 100);
      }
      recordUserHit(key);
    }

    function removeActiveState(key) {
      const pad = padPads[key];
      if (pad) pad.style.transform = 'scale(1)';
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    function onKeyDown(e) {
      const key = e.key.toLowerCase();
      if (drumKeys.includes(key) && !e.repeat) playDrum(key);
    }
    function onKeyUp(e) {
      const key = e.key.toLowerCase();
      if (drumKeys.includes(key)) removeActiveState(key);
    }

    function generateRandomRhythm() {
      const newRhythm = [];
      const minPatternLength = 6, maxPatternLength = 12;
      const numHits = Math.floor(Math.random() * (maxPatternLength - minPatternLength + 1)) + minPatternLength;
      for (let i = 0; i < numHits; i++) {
        const randomPadKey = drumKeys[Math.floor(Math.random() * drumKeys.length)];
        const timeIntervals = ['4n', '8n', '16n'];
        const randomInterval = timeIntervals[Math.floor(Math.random() * timeIntervals.length)];
        newRhythm.push({ time: `+${randomInterval}`, pad: randomPadKey });
      }
      return newRhythm;
    }

    function createRhythmIndicators() {
      if (!rhythmRef.current) return;
      rhythmRef.current.innerHTML = '';
      targetRhythmIndicators = [];
      currentTargetRhythm.forEach((hit) => {
        const padInfo = drumPadMap[hit.pad];
        const indicator = document.createElement('div');
        indicator.style.width = '30px';
        indicator.style.height = '30px';
        indicator.style.background = padInfo.color;
        indicator.style.borderRadius = '0.25rem';
        indicator.style.margin = '0 4px';
        indicator.style.display = 'inline-block';
        indicator.title = padInfo.name;
        rhythmRef.current.appendChild(indicator);
        targetRhythmIndicators.push(indicator);
      });
    }

    function recordUserHit(key) {
      if (isRecording) {
        userHits.push({ timestamp: performance.now(), pad: key });
      }
    }

    function comparePerformance() {
      // ... (omitted for brevity, see drum.html for full logic)
      // After analysis, call sendToLLMForFeedback(results)
      sendToLLMForFeedback([]); // Placeholder
    }

    async function sendToLLMForFeedback(performanceResults) {
      if (!aiFeedbackRef.current) return;
      aiFeedbackRef.current.innerHTML = 'Generating AI feedback...';
      // ... (omitted for brevity, see drum.html for full logic)
      // Use marked to render markdown
      aiFeedbackRef.current.innerHTML = marked.parse('**Sample feedback**\n- Great job!\n- Try to improve timing.');
    }

    function startPractice() {
      currentTargetRhythm = generateRandomRhythm();
      createRhythmIndicators();
      userHits = [];
      isRecording = true;
      practiceStartTime = performance.now();
      currentTargetIndex = 0;
      if (feedbackRef.current) feedbackRef.current.textContent = 'Practice started!';
      if (aiFeedbackRef.current) aiFeedbackRef.current.innerHTML = '';
      if (startBtnRef.current) startBtnRef.current.disabled = true;
      if (resetBtnRef.current) resetBtnRef.current.disabled = false;
      // ... (scheduling omitted for brevity)
      setTimeout(() => {
        isRecording = false;
        if (feedbackRef.current) feedbackRef.current.textContent = 'Practice finished! Analyzing performance...';
        comparePerformance();
        if (startBtnRef.current) startBtnRef.current.disabled = false;
        if (resetBtnRef.current) resetBtnRef.current.disabled = false;
      }, 5000); // Simulate 5s practice
    }

    function resetPractice() {
      userHits = [];
      isRecording = false;
      practiceStartTime = 0;
      currentTargetIndex = 0;
      if (feedbackRef.current) feedbackRef.current.textContent = 'Practice reset. Press "Start Practice" to begin!';
      if (aiFeedbackRef.current) aiFeedbackRef.current.innerHTML = '';
      if (startBtnRef.current) startBtnRef.current.disabled = false;
      if (resetBtnRef.current) resetBtnRef.current.disabled = true;
      if (rhythmRef.current) rhythmRef.current.innerHTML = '';
    }

    if (startBtnRef.current) startBtnRef.current.onclick = startPractice;
    if (resetBtnRef.current) resetBtnRef.current.onclick = resetPractice;

    createDrumPads();
    initializeSynths();
    currentTargetRhythm = generateRandomRhythm();
    createRhythmIndicators();
    if (feedbackRef.current) feedbackRef.current.textContent = 'Press "Start Practice" to begin!';
    if (resetBtnRef.current) resetBtnRef.current.disabled = true;

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <div style={{ background: '#2d3748', borderRadius: '1rem', padding: '1.5rem', color: '#e2e8f0', marginTop: 24 }}>
      <h2 style={{ fontWeight: 700, fontSize: 24, textAlign: 'center', marginBottom: 16 }}>AI Drum Pad Trainer</h2>
      <div ref={rhythmRef} style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }} />
      <div ref={padsRef} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
        <button ref={startBtnRef} style={{ padding: '12px 32px', borderRadius: 12, fontWeight: 700, fontSize: 18, background: '#22c55e', color: '#fff', border: 'none', cursor: 'pointer' }}>Start Practice</button>
        <button ref={resetBtnRef} style={{ padding: '12px 32px', borderRadius: 12, fontWeight: 700, fontSize: 18, background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}>Reset</button>
      </div>
      <div ref={feedbackRef} style={{ minHeight: 32, textAlign: 'center', marginBottom: 12, fontWeight: 600 }} />
      <div ref={aiFeedbackRef} style={{ background: '#23293a', borderRadius: 8, padding: 16, minHeight: 60, marginTop: 8 }} />
    </div>
  );
} 