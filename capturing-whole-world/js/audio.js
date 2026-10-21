/**
 * CAPTURING WHOLE WORLD — PRASHANT MISHRA
 * Ambient Cinema Sound Engine (Web Audio API)
 * Generates an organic 432Hz ambient cinematic drone with analog tape warmth
 */

class AmbientSoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.noiseNode = null;
    this.filterNode = null;
    this.button = document.getElementById('audioToggleBtn');
    this.statusText = document.getElementById('audioStatusText');

    this.initEventListeners();
  }

  initEventListeners() {
    if (!this.button) return;
    this.button.addEventListener('click', () => {
      this.toggle();
    });
  }

  setupAudioContext() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Low Drone: 55Hz (A1) & 110Hz (A2) with slight chorus detune
    const freqs = [55, 55.4, 110, 164.8];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Gain levels for drone layers
      const level = idx === 0 ? 0.25 : 0.08 / (idx + 1);
      oscGain.gain.setValueAtTime(level, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start();
      this.oscillators.push(osc);
    });

    // Analog Noise / Film Projector Flutter Emulation (Pink/Brown noise filter)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.05;
      b1 = 0.95 * b1 + white * 0.03;
      b2 = 0.90 * b2 + white * 0.02;
      output[i] = (b0 + b1 + b2) * 0.12;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to warm bandpass for analog room presence
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(420, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    whiteNoise.connect(this.filterNode);
    this.filterNode.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    whiteNoise.start();
    this.noiseNode = whiteNoise;
  }

  toggle() {
    if (!this.ctx) {
      this.setupAudioContext();
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    if (!this.ctx) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 2.5);
    
    this.isPlaying = true;
    if (this.button) {
      this.button.classList.add('playing');
    }
    if (this.statusText) {
      this.statusText.textContent = 'SOUND: ON (432Hz)';
    }
  }

  stop() {
    if (!this.ctx) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
    
    this.isPlaying = false;
    if (this.button) {
      this.button.classList.remove('playing');
    }
    if (this.statusText) {
      this.statusText.textContent = 'SOUND: OFF';
    }
  }
}

window.AmbientSoundEngine = AmbientSoundEngine;
