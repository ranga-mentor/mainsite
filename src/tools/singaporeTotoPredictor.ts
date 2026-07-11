export type TotoSet = {
  numbers: number[];
  additional: number;
  confidence: number;
};

export type TotoBallProbability = {
  ball: number;
  probability: number;
};

export type TotoRecentDraw = {
  drawDate: string;
  drawNo: string;
  winning: number[];
  additional: number;
  jackpotAmount?: number;
};

export type TotoPrediction = {
  sets: TotoSet[];
  ballProbabilities: TotoBallProbability[];
};

export type PredictionOptions = {
  timestamp?: number;
  randomness?: number;
};

type TotoFrequencyRow = {
  ball: number;
  mainFreq: number;
  additionalFreq: number;
};

const OFFICIAL_TOTO_WNF: TotoFrequencyRow[] = [
  { ball: 1, mainFreq: 153, additionalFreq: 27 },
  { ball: 2, mainFreq: 148, additionalFreq: 26 },
  { ball: 3, mainFreq: 138, additionalFreq: 21 },
  { ball: 4, mainFreq: 143, additionalFreq: 16 },
  { ball: 5, mainFreq: 149, additionalFreq: 20 },
  { ball: 6, mainFreq: 139, additionalFreq: 31 },
  { ball: 7, mainFreq: 134, additionalFreq: 23 },
  { ball: 8, mainFreq: 149, additionalFreq: 25 },
  { ball: 9, mainFreq: 145, additionalFreq: 18 },
  { ball: 10, mainFreq: 150, additionalFreq: 24 },
  { ball: 11, mainFreq: 137, additionalFreq: 16 },
  { ball: 12, mainFreq: 153, additionalFreq: 23 },
  { ball: 13, mainFreq: 137, additionalFreq: 24 },
  { ball: 14, mainFreq: 133, additionalFreq: 19 },
  { ball: 15, mainFreq: 170, additionalFreq: 20 },
  { ball: 16, mainFreq: 134, additionalFreq: 27 },
  { ball: 17, mainFreq: 139, additionalFreq: 19 },
  { ball: 18, mainFreq: 134, additionalFreq: 26 },
  { ball: 19, mainFreq: 140, additionalFreq: 23 },
  { ball: 20, mainFreq: 141, additionalFreq: 36 },
  { ball: 21, mainFreq: 137, additionalFreq: 28 },
  { ball: 22, mainFreq: 154, additionalFreq: 22 },
  { ball: 23, mainFreq: 137, additionalFreq: 24 },
  { ball: 24, mainFreq: 147, additionalFreq: 24 },
  { ball: 25, mainFreq: 129, additionalFreq: 24 },
  { ball: 26, mainFreq: 135, additionalFreq: 20 },
  { ball: 27, mainFreq: 139, additionalFreq: 25 },
  { ball: 28, mainFreq: 155, additionalFreq: 20 },
  { ball: 29, mainFreq: 129, additionalFreq: 28 },
  { ball: 30, mainFreq: 146, additionalFreq: 24 },
  { ball: 31, mainFreq: 147, additionalFreq: 31 },
  { ball: 32, mainFreq: 152, additionalFreq: 13 },
  { ball: 33, mainFreq: 120, additionalFreq: 32 },
  { ball: 34, mainFreq: 143, additionalFreq: 30 },
  { ball: 35, mainFreq: 151, additionalFreq: 25 },
  { ball: 36, mainFreq: 147, additionalFreq: 26 },
  { ball: 37, mainFreq: 146, additionalFreq: 24 },
  { ball: 38, mainFreq: 139, additionalFreq: 18 },
  { ball: 39, mainFreq: 135, additionalFreq: 23 },
  { ball: 40, mainFreq: 165, additionalFreq: 16 },
  { ball: 41, mainFreq: 131, additionalFreq: 24 },
  { ball: 42, mainFreq: 124, additionalFreq: 27 },
  { ball: 43, mainFreq: 139, additionalFreq: 19 },
  { ball: 44, mainFreq: 149, additionalFreq: 26 },
  { ball: 45, mainFreq: 117, additionalFreq: 20 },
  { ball: 46, mainFreq: 154, additionalFreq: 25 },
  { ball: 47, mainFreq: 134, additionalFreq: 20 },
  { ball: 48, mainFreq: 145, additionalFreq: 31 },
  { ball: 49, mainFreq: 154, additionalFreq: 28 },
];

const RECENT_TOTO_DRAWS: TotoRecentDraw[] = [
  { drawNo: "4198", drawDate: "2026-07-09", winning: [23, 27, 31, 38, 42, 47], additional: 29, jackpotAmount: 5_716_108 },
  { drawNo: "4197", drawDate: "2026-07-06", winning: [8, 25, 34, 37, 39, 46], additional: 44, jackpotAmount: 2_969_336 },
  { drawNo: "4196", drawDate: "2026-07-02", winning: [5, 7, 11, 37, 46, 49], additional: 16, jackpotAmount: 1_206_978 },
  { drawNo: "4195", drawDate: "2026-06-29", winning: [6, 11, 22, 23, 31, 34], additional: 14, jackpotAmount: 2_955_939 },
  { drawNo: "4194", drawDate: "2026-06-25", winning: [4, 21, 23, 28, 31, 39], additional: 41, jackpotAmount: 1_195_425 },
  { drawNo: "4193", drawDate: "2026-06-22", winning: [4, 11, 15, 16, 21, 39], additional: 20, jackpotAmount: 5_624_442 },
  { drawNo: "4180", drawDate: "2026-05-07", winning: [2, 3, 8, 16, 20, 47], additional: 10, jackpotAmount: 1_218_611 },
  { drawNo: "4179", drawDate: "2026-05-04", winning: [7, 18, 19, 30, 36, 48], additional: 11, jackpotAmount: 12_813_283 },
  { drawNo: "4178", drawDate: "2026-04-30", winning: [2, 6, 7, 31, 35, 39], additional: 15, jackpotAmount: 5_742_496 },
  { drawNo: "4177", drawDate: "2026-04-27", winning: [3, 11, 13, 22, 28, 48], additional: 21, jackpotAmount: 2_942_054 },
  { drawNo: "4176", drawDate: "2026-04-23", winning: [3, 5, 15, 23, 37, 42], additional: 48, jackpotAmount: 1_228_056 },
  { drawNo: "4175", drawDate: "2026-04-20", winning: [3, 5, 9, 23, 43, 49], additional: 8, jackpotAmount: 2_980_914 },
  { drawNo: "4174", drawDate: "2026-04-16", winning: [1, 3, 6, 12, 21, 41], additional: 18, jackpotAmount: 1_239_943 },
  { drawNo: "4173", drawDate: "2026-04-13", winning: [4, 8, 10, 15, 16, 26], additional: 17, jackpotAmount: 1_267_460 },
  { drawNo: "4160", drawDate: "2026-02-27", winning: [5, 9, 20, 23, 45, 46], additional: 7, jackpotAmount: 12_000_001 },
  { drawNo: "4159", drawDate: "2026-02-23", winning: [24, 26, 30, 32, 37, 47], additional: 2, jackpotAmount: 1_787_436 },
  { drawNo: "4158", drawDate: "2026-02-19", winning: [8, 16, 17, 34, 38, 48], additional: 25, jackpotAmount: 1_474_367 },
  { drawNo: "4157", drawDate: "2026-02-16", winning: [13, 24, 28, 34, 37, 44], additional: 29, jackpotAmount: 2_000_000 },
  { drawNo: "4156", drawDate: "2026-02-13", winning: [10, 15, 25, 43, 45, 49], additional: 4, jackpotAmount: 4_300_000 },
  { drawNo: "4155", drawDate: "2026-02-09", winning: [10, 15, 29, 31, 33, 49], additional: 30, jackpotAmount: 3_100_000 },
  { drawNo: "4154", drawDate: "2026-02-05", winning: [6, 18, 24, 26, 36, 48], additional: 5, jackpotAmount: 5_800_000 },
  { drawNo: "4153", drawDate: "2026-02-02", winning: [4, 19, 40, 41, 46, 47], additional: 20, jackpotAmount: 1_700_000 },
  { drawNo: "4152", drawDate: "2026-01-29", winning: [11, 13, 16, 31, 42, 48], additional: 21, jackpotAmount: 7_200_000 },
  { drawNo: "4151", drawDate: "2026-01-26", winning: [10, 11, 13, 26, 32, 39], additional: 44, jackpotAmount: 2_600_000 },
  { drawNo: "4150", drawDate: "2026-01-22", winning: [6, 22, 27, 32, 37, 44], additional: 19, jackpotAmount: 3_900_000 },
  { drawNo: "4149", drawDate: "2026-01-19", winning: [4, 11, 21, 23, 31, 35], additional: 48 },
  { drawNo: "4148", drawDate: "2026-01-15", winning: [16, 32, 34, 35, 36, 41], additional: 14 },
  { drawNo: "4147", drawDate: "2026-01-12", winning: [1, 9, 16, 18, 35, 43], additional: 12 },
  { drawNo: "4146", drawDate: "2026-01-08", winning: [3, 14, 15, 17, 25, 27], additional: 31 },
  { drawNo: "4145", drawDate: "2026-01-05", winning: [5, 20, 35, 39, 40, 49], additional: 27 },
  { drawNo: "4144", drawDate: "2026-01-02", winning: [11, 18, 20, 32, 38, 39], additional: 34 },
  { drawNo: "4143", drawDate: "2025-12-29", winning: [2, 4, 22, 24, 30, 33], additional: 49 },
  { drawNo: "4142", drawDate: "2025-12-25", winning: [3, 8, 15, 28, 37, 43], additional: 49 },
  { drawNo: "4141", drawDate: "2025-12-22", winning: [4, 5, 13, 22, 24, 30], additional: 36 },
  { drawNo: "4140", drawDate: "2025-12-18", winning: [2, 14, 15, 30, 31, 43], additional: 27 },
  { drawNo: "4139", drawDate: "2025-12-15", winning: [17, 21, 22, 35, 37, 42], additional: 9 },
  { drawNo: "4138", drawDate: "2025-12-11", winning: [6, 11, 20, 28, 33, 43], additional: 16 },
  { drawNo: "4137", drawDate: "2025-12-08", winning: [9, 12, 15, 23, 27, 47], additional: 45 },
  { drawNo: "4136", drawDate: "2025-12-04", winning: [1, 5, 24, 36, 41, 46], additional: 39 },
  { drawNo: "4135", drawDate: "2025-12-01", winning: [2, 10, 24, 35, 45, 49], additional: 37 },
  { drawNo: "4134", drawDate: "2025-11-27", winning: [6, 8, 17, 28, 32, 46], additional: 16 },
  { drawNo: "4133", drawDate: "2025-11-24", winning: [8, 25, 27, 34, 45, 47], additional: 19 },
  { drawNo: "4132", drawDate: "2025-11-20", winning: [11, 13, 22, 31, 47, 49], additional: 39 },
  { drawNo: "4131", drawDate: "2025-11-17", winning: [3, 9, 12, 18, 19, 34], additional: 24 },
  { drawNo: "4130", drawDate: "2025-11-13", winning: [6, 13, 18, 22, 34, 35], additional: 40 },
];

function createSeededRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function weightedPickWithRng(
  pool: Array<{ value: number; probability: number }>,
  rng: () => number,
): number {
  const total = pool.reduce((sum, row) => sum + row.probability, 0);
  let target = rng() * total;
  for (const row of pool) {
    target -= row.probability;
    if (target <= 0) {
      return row.value;
    }
  }
  return pool[pool.length - 1].value;
}

function getBaseBallProbabilities(): TotoBallProbability[] {
  const recentMainCounts = new Map<number, number>();
  const recentAdditionalCounts = new Map<number, number>();
  const lastSeenOffset = new Map<number, number>();

  RECENT_TOTO_DRAWS.forEach((draw, index) => {
    draw.winning.forEach((ball) => {
      recentMainCounts.set(ball, (recentMainCounts.get(ball) ?? 0) + 1);
      if (!lastSeenOffset.has(ball)) {
        lastSeenOffset.set(ball, index);
      }
    });

    recentAdditionalCounts.set(draw.additional, (recentAdditionalCounts.get(draw.additional) ?? 0) + 1);
    if (!lastSeenOffset.has(draw.additional)) {
      lastSeenOffset.set(draw.additional, index);
    }
  });

  const scored = OFFICIAL_TOTO_WNF.map((row) => {
    const recentMain = recentMainCounts.get(row.ball) ?? 0;
    const recentAdditional = recentAdditionalCounts.get(row.ball) ?? 0;
    const lastSeen = lastSeenOffset.get(row.ball) ?? RECENT_TOTO_DRAWS.length;
    const overdueBonus = (lastSeen / RECENT_TOTO_DRAWS.length) * 16;
    const score =
      row.mainFreq * 1.35 +
      row.additionalFreq * 0.4 +
      recentMain * 8.5 +
      recentAdditional * 2.5 +
      overdueBonus;

    return { ball: row.ball, score };
  });

  const total = scored.reduce((sum, row) => sum + row.score, 0);
  return scored
    .map((row) => ({ ball: row.ball, probability: row.score / total }))
    .sort((a, b) => b.probability - a.probability);
}

function applyRandomness(
  normalized: TotoBallProbability[],
  rng: () => number,
  randomness: number,
): TotoBallProbability[] {
  if (randomness <= 0) {
    return normalized;
  }

  const jittered = normalized.map((row) => {
    const jitter = 1 + (rng() * 2 - 1) * randomness;
    return {
      ball: row.ball,
      probability: Math.max(0.0000001, row.probability * jitter),
    };
  });
  const total = jittered.reduce((sum, row) => sum + row.probability, 0);
  return jittered.map((row) => ({ ball: row.ball, probability: row.probability / total }));
}

function createSet(pool: TotoBallProbability[], rng: () => number): TotoSet {
  const mutable = [...pool];
  const numbers: number[] = [];
  let confidenceSum = 0;

  while (numbers.length < 6 && mutable.length > 0) {
    const picked = weightedPickWithRng(
      mutable.map((row) => ({ value: row.ball, probability: row.probability })),
      rng,
    );
    const idx = mutable.findIndex((row) => row.ball === picked);
    if (idx >= 0) {
      const [selected] = mutable.splice(idx, 1);
      numbers.push(selected.ball);
      confidenceSum += selected.probability;
    }
  }

  numbers.sort((a, b) => a - b);

  const additionalPool = mutable.length > 0 ? mutable : pool;
  const additional = weightedPickWithRng(
    additionalPool.map((row) => ({ value: row.ball, probability: row.probability })),
    rng,
  );

  return {
    numbers,
    additional,
    confidence: confidenceSum,
  };
}

export function getTotoPrediction(count = 5, options: PredictionOptions = {}): TotoPrediction {
  const seed = options.timestamp ?? Date.now();
  const randomness = Math.max(0, Math.min(1, options.randomness ?? 0.18));
  const rng = createSeededRng(seed);
  const basePool = getBaseBallProbabilities();
  const weightedPool = applyRandomness(basePool, rng, randomness);

  const sets: TotoSet[] = [];
  const used = new Set<string>();
  const size = Math.max(1, Math.min(count, 10));

  while (sets.length < size) {
    const set = createSet(weightedPool, rng);
    const key = set.numbers.join("-");
    if (!used.has(key)) {
      used.add(key);
      sets.push(set);
    }
    if (used.size > 300) {
      break;
    }
  }

  return {
    sets,
    ballProbabilities: basePool,
  };
}

export function getRecentTotoDraws(limit = 8): TotoRecentDraw[] {
  return RECENT_TOTO_DRAWS.slice(0, Math.max(1, Math.min(limit, RECENT_TOTO_DRAWS.length)));
}

export function getTotoDatasetSummary(): {
  totalDraws: number;
  rangeStart: string;
  rangeEnd: string;
  numberPool: string;
  sourceNote: string;
} {
  const sortedDates = [...RECENT_TOTO_DRAWS].sort((a, b) => a.drawDate.localeCompare(b.drawDate));
  return {
    totalDraws: RECENT_TOTO_DRAWS.length,
    rangeStart: sortedDates[0]?.drawDate ?? "",
    rangeEnd: sortedDates[sortedDates.length - 1]?.drawDate ?? "",
    numberPool: "1-49 (6 winning + 1 additional)",
    sourceNote: "Scoring blends official number-frequency data and recent draw history.",
  };
}

export function getTotoSources(): { label: string; url: string }[] {
  return [
    {
      label: "Singapore Pools Toto Results",
      url: "https://www.singaporepools.com.sg/en/product/pages/toto_results.aspx",
    },
    {
      label: "Singapore Pools Toto Microsite",
      url: "https://www.singaporepools.com.sg/ms/lotteryhomepage/toto/index.html",
    },
    {
      label: "Lottolyzer Singapore Toto History",
      url: "https://en.lottolyzer.com/history/singapore/toto/",
    },
    {
      label: "Singapore Pools Winning Number Frequency",
      url: "https://www.singaporepools.com.sg/en/product/Pages/toto_wnf.aspx",
    },
  ];
}
