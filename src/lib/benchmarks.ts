/**
 * Framework benchmark results, from Profiler_s2t (results/report.json).
 *
 * Scenarios, sizes, names and the trace format are those of the Swiftly
 * Development Team's profilers (github.com/swiftly-solution/profiler); every
 * value is the time of one sample in milliseconds, as the profilers report it.
 */

export type FrameworkKey = 'css' | 's2t' | 'swiftly' | 'modsharp';

export interface Sample {
  min: number;
  avg: number;
  max: number;
  count: number;
}

export interface Framework {
  key: FrameworkKey;
  name: string;
  version: string;
}

export const frameworks: Framework[] = [
  { key: 'css', name: 'CounterStrikeSharp', version: 'v1.0.376' },
  { key: 's2t', name: 'Source2Toolkit', version: 'local build' },
  { key: 'swiftly', name: 'SwiftlyS2', version: 'v1.4.14' },
  { key: 'modsharp', name: 'ModSharp', version: 'git-187' },
];

export const run = {
  date: '13 October 2026',
  build: '1.41.9.0',
  map: 'de_dust2, competitive',
  bots: 20,
  seconds: 60,
};

export const results: Record<string, Partial<Record<FrameworkKey, Sample>>> = {
  'Create 1024 entities': { css: { min: 266.8, avg: 266.8, max: 266.8, count: 1 }, s2t: { min: 4.23, avg: 4.23, max: 4.23, count: 1 }, swiftly: { min: 5.83, avg: 5.83, max: 5.83, count: 1 }, modsharp: { min: 6.8, avg: 6.8, max: 6.8, count: 1 } },
  'Spawn 1024 entities': { css: { min: 8.99, avg: 8.99, max: 8.99, count: 1 }, s2t: { min: 3.3, avg: 3.3, max: 3.3, count: 1 }, swiftly: { min: 6.76, avg: 6.76, max: 6.76, count: 1 }, modsharp: { min: 7.23, avg: 7.23, max: 7.23, count: 1 } },
  'Despawn entity (1 entity)': { css: { min: 0, avg: 0, max: 0.35, count: 1029 }, s2t: { min: 0, avg: 0, max: 0.001, count: 1025 }, swiftly: { min: 0, avg: 0, max: 0.14, count: 1030 }, modsharp: { min: 0, avg: 0, max: 0.07, count: 1024 } },
  'Schema Write + Update (1024 entities)': { css: { min: 3.99, avg: 3.99, max: 3.99, count: 1 }, s2t: { min: 0.39, avg: 0.39, max: 0.39, count: 1 }, swiftly: { min: 1.08, avg: 1.08, max: 1.08, count: 1 }, modsharp: { min: 4.9, avg: 4.9, max: 4.9, count: 1 } },
  'Schema Read (1024 entities)': { css: { min: 1.08, avg: 1.08, max: 1.08, count: 1 }, s2t: { min: 0.006, avg: 0.006, max: 0.006, count: 1 }, swiftly: { min: 0.31, avg: 0.31, max: 0.31, count: 1 }, modsharp: { min: 0.49, avg: 0.49, max: 0.49, count: 1 } },
  'Virtual Calls (teleport 1024 entities)': { css: { min: 4.55, avg: 4.55, max: 4.55, count: 1 }, s2t: { min: 0.16, avg: 0.16, max: 0.16, count: 1 }, swiftly: { min: 0.52, avg: 0.52, max: 0.52, count: 1 }, modsharp: { min: 0.32, avg: 0.32, max: 0.32, count: 1 } },
  'Teleport All Game Entities': { css: { min: 0.67, avg: 1.16, max: 43.06, count: 3725 }, s2t: { min: 0.28, avg: 0.41, max: 1.45, count: 3845 }, swiftly: { min: 0.4, avg: 0.54, max: 14.46, count: 1972 }, modsharp: { min: 0.32, avg: 0.59, max: 3.21, count: 3847 } },
  'Get Game Rules': { css: { min: 0.07, avg: 0.11, max: 38.24, count: 3725 }, s2t: { min: 0, avg: 0, max: 0.04, count: 3845 }, swiftly: { min: 0.001, avg: 0.004, max: 2.34, count: 1972 }, modsharp: { min: 0, avg: 0.001, max: 0.07, count: 3847 } },
  'Find ConVar': { css: { min: 0.001, avg: 0.005, max: 0.57, count: 3725 }, s2t: { min: 0, avg: 0.001, max: 0.03, count: 3845 }, swiftly: { min: 0.003, avg: 0.01, max: 0.24, count: 1972 }, modsharp: { min: 0.001, avg: 0.007, max: 0.14, count: 3847 } },
  'Read ConVar (1024 times)': { css: { min: 0.21, avg: 0.24, max: 39.13, count: 3725 }, s2t: { min: 0, avg: 0, max: 0.001, count: 3845 }, swiftly: { min: 0.001, avg: 0.001, max: 0.09, count: 1972 }, modsharp: { min: 0.001, avg: 0.001, max: 0.09, count: 3847 } },
  'Write ConVar (1024 times)': { css: { min: 1, avg: 1.17, max: 35.37, count: 3725 }, s2t: { min: 0, avg: 0, max: 0.05, count: 3845 }, swiftly: { min: 1.2, avg: 1.3, max: 3.38, count: 1972 }, modsharp: { min: 0.7, avg: 0.81, max: 1.77, count: 3847 } },
  'Replicate ConVar to Client (1024 times)': { css: { min: 0, avg: 0, max: 0.03, count: 74500 }, s2t: { min: 0.16, avg: 0.18, max: 1.11, count: 76900 }, swiftly: { min: 0.85, avg: 1.2, max: 30.8, count: 39440 } },
  'Fire Game Event to Players': { css: { min: 0.007, avg: 0.02, max: 0.4, count: 3725 }, s2t: { min: 0.008, avg: 0.02, max: 0.13, count: 3845 }, modsharp: { min: 0.001, avg: 0.003, max: 0.73, count: 3847 } },
  'Send NetMessage to All Players': { css: { min: 0.008, avg: 0.02, max: 0.29, count: 3725 }, s2t: { min: 0.009, avg: 0.01, max: 0.13, count: 3845 }, modsharp: { min: 0, avg: 0.003, max: 2.13, count: 3847 } },
  'CMsgSosStartSoundEvent Add All Recipients (Server sends NetMessage, 1024 times)': { css: { min: 26.04, avg: 31.03, max: 69.05, count: 1212 }, s2t: { min: 0, avg: 0, max: 0.03, count: 1240 }, swiftly: { min: 0.001, avg: 0.003, max: 0.04, count: 645 }, modsharp: { min: 0.13, avg: 0.14, max: 0.32, count: 1235 } },
};

export const groups: { title: string; scenarios: string[] }[] = [
  {
    title: 'Entities',
    scenarios: [
      'Create 1024 entities',
      'Spawn 1024 entities',
      'Despawn entity (1 entity)',
      'Schema Write + Update (1024 entities)',
      'Schema Read (1024 entities)',
      'Virtual Calls (teleport 1024 entities)',
      'Teleport All Game Entities',
      'Get Game Rules',
    ],
  },
  {
    title: 'ConVars',
    scenarios: ['Find ConVar', 'Read ConVar (1024 times)', 'Write ConVar (1024 times)', 'Replicate ConVar to Client (1024 times)'],
  },
  {
    title: 'Events and net messages',
    scenarios: [
      'Fire Game Event to Players',
      'Send NetMessage to All Players',
      'CMsgSosStartSoundEvent Add All Recipients (Server sends NetMessage, 1024 times)',
    ],
  },
  {
    title: 'Client messages',
    scenarios: ['CCLCMsg_Move Simulate Data (Server receives NetMessage, 1024 times)'],
  },
];

/** Cells without a comparable measurement, by footnote. */
export const notes = [
  "CounterStrikeSharp's reference profiler has the replication call commented out, so the row times an empty block.",
  "ModSharp's reference profiler does not implement ConVar replication.",
  'SwiftlyS2’s profiler threw “The event is invalid” from its game event setter on this build; the exception ends the tick, so these two rows never completed.',
  'Only real clients send CCLCMsg_Move and the run had bots only. Of the reference profilers only SwiftlyS2 implements the handler.',
  'Every framework despawns in under 1 µs on average; the row is a tie.',
];

export const blanks: Record<string, Partial<Record<FrameworkKey, { note: number; text: string }>>> = {
  'Replicate ConVar to Client (1024 times)': { css: { note: 1, text: 'empty in profiler' }, modsharp: { note: 2, text: 'not implemented' } },
  'Fire Game Event to Players': { swiftly: { note: 3, text: 'failed' } },
  'Send NetMessage to All Players': { swiftly: { note: 3, text: 'failed' } },
  'CCLCMsg_Move Simulate Data (Server receives NetMessage, 1024 times)': {
    css: { note: 4, text: 'no client' },
    s2t: { note: 4, text: 'no client' },
    swiftly: { note: 4, text: 'no client' },
    modsharp: { note: 4, text: 'no client' },
  },
};

export const rowNotes: Record<string, number> = { 'Despawn entity (1 entity)': 5 };

/** Process RSS in MB before the test, at its end and 30 s after; managed heap before / after / after GC. */
export const memory: { key: FrameworkKey; before: number; end: number; after: number; heap?: [number, number, number] }[] = [
  { key: 'css', before: 1256.3, end: 1304.4, after: 1308.6, heap: [2.39, 55.78, 11.36] },
  { key: 's2t', before: 1044.0, end: 1043.1, after: 1037.8 },
  { key: 'swiftly', before: 1135.9, end: 1221.2, after: 1199.0, heap: [4.09, 31.63, 5.85] },
  { key: 'modsharp', before: 1311.8, end: 1345.2, after: 1337.7, heap: [23.84, 61.96, 24.17] },
];

/** The same ConVar operations through g_pToolkitConVars (engine setter: callbacks and replication on every write). */
export const toolkitApiRows: { scenario: string; sample: Sample }[] = [
  { scenario: 'Find ConVar (g_pToolkitConVars)', sample: { min: 0, avg: 0, max: 0.03, count: 3845 } },
  { scenario: 'Read ConVar (g_pToolkitConVars) (1024 times)', sample: { min: 0.009, avg: 0.01, max: 0.13, count: 3845 } },
  { scenario: 'Write ConVar (g_pToolkitConVars) (1024 times)', sample: { min: 6.66, avg: 7.01, max: 10.83, count: 3845 } },
];

export function formatMs(ms: number): string {
  if (ms >= 1) return `${ms.toFixed(2)} ms`;
  const us = Math.round(ms * 1000);
  return us < 1 ? '<1 µs' : `${us} µs`;
}

/** "Read ConVar (g_pToolkitConVars) (1024 times)" -> ["Read ConVar", "g_pToolkitConVars · 1024 times"] */
export function splitScenario(name: string): [string, string] {
  const parts = [...name.matchAll(/\(([^)]*)\)/g)].map((m) => m[1]);
  return [name.split(' (')[0], parts.join(' · ')];
}

export interface RowVerdict {
  best?: number;
  worst?: number;
  tie: boolean;
}

export function verdict(scenario: string): RowVerdict {
  const row = results[scenario] ?? {};
  const blank = blanks[scenario] ?? {};
  const avgs = frameworks.filter((f) => row[f.key] && !blank[f.key]).map((f) => row[f.key]!.avg);
  if (avgs.length < 2) return { tie: false };
  const best = Math.min(...avgs);
  const worst = Math.max(...avgs);
  return { best, worst, tie: best === worst };
}

/** Fastest-average count per framework over the scenarios with a real comparison. */
export function winCounts(): { wins: Record<FrameworkKey, number>; compared: number } {
  const wins: Record<FrameworkKey, number> = { css: 0, s2t: 0, swiftly: 0, modsharp: 0 };
  let compared = 0;
  for (const scenario of Object.keys(results)) {
    const v = verdict(scenario);
    if (v.best === undefined || v.tie || rowNotes[scenario]) continue;
    compared++;
    const row = results[scenario];
    const blank = blanks[scenario] ?? {};
    for (const f of frameworks) {
      if (row[f.key] && !blank[f.key] && row[f.key]!.avg === v.best) wins[f.key]++;
    }
  }
  return { wins, compared };
}
