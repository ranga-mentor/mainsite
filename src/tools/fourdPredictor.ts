export type FourDRecord = {
  drawDate: string;
  drawNo: string;
  prizeCode: "1" | "2" | "3" | "S" | "C";
  digit: string;
};

export type FourDPick = {
  value: string;
  probability: number;
};

export type PositionProbability = {
  position: 1 | 2 | 3 | 4;
  digits: Array<{ digit: number; probability: number }>;
};

export type FourDPrediction = {
  picks: FourDPick[];
  positionProbabilities: PositionProbability[];
};

type FrequencyRow = {
  number: string;
  times: number;
};

type Candidate = {
  value: string;
  score: number;
};

const PRIZE_WEIGHTS: Record<FourDRecord["prizeCode"], number> = {
  "1": 2.6,
  "2": 2.3,
  "3": 2.0,
  S: 1.25,
  C: 1.0,
};

const SGP_TOP_100_FREQUENT_4D: FrequencyRow[] = [
  { number: "9395", times: 29 }, { number: "6741", times: 28 }, { number: "3225", times: 27 },
  { number: "4785", times: 27 }, { number: "5807", times: 27 }, { number: "2698", times: 26 },
  { number: "1845", times: 25 }, { number: "1942", times: 25 }, { number: "2967", times: 25 },
  { number: "3581", times: 25 }, { number: "4678", times: 25 }, { number: "4946", times: 25 },
  { number: "5468", times: 25 }, { number: "7683", times: 25 }, { number: "8887", times: 25 },
  { number: "9509", times: 25 }, { number: "0400", times: 24 }, { number: "0732", times: 24 },
  { number: "1238", times: 24 }, { number: "2000", times: 24 }, { number: "2942", times: 24 },
  { number: "3005", times: 24 }, { number: "3445", times: 24 }, { number: "4527", times: 24 },
  { number: "6556", times: 24 }, { number: "6766", times: 24 }, { number: "7539", times: 24 },
  { number: "9281", times: 24 }, { number: "9306", times: 24 }, { number: "0223", times: 23 },
  { number: "0409", times: 23 }, { number: "0875", times: 23 }, { number: "1273", times: 23 },
  { number: "1275", times: 23 }, { number: "1464", times: 23 }, { number: "2175", times: 23 },
  { number: "2314", times: 23 }, { number: "2636", times: 23 }, { number: "2700", times: 23 },
  { number: "3975", times: 23 }, { number: "4156", times: 23 }, { number: "4601", times: 23 },
  { number: "4840", times: 23 }, { number: "4880", times: 23 }, { number: "5043", times: 23 },
  { number: "5263", times: 23 }, { number: "5374", times: 23 }, { number: "5934", times: 23 },
  { number: "6290", times: 23 }, { number: "6412", times: 23 }, { number: "6440", times: 23 },
  { number: "6990", times: 23 }, { number: "8182", times: 23 }, { number: "8373", times: 23 },
  { number: "8846", times: 23 }, { number: "9007", times: 23 }, { number: "9282", times: 23 },
  { number: "9651", times: 23 }, { number: "9693", times: 23 }, { number: "0379", times: 22 },
  { number: "0386", times: 22 }, { number: "0389", times: 22 }, { number: "0567", times: 22 },
  { number: "0852", times: 22 }, { number: "0885", times: 22 }, { number: "1005", times: 22 },
  { number: "1047", times: 22 }, { number: "1180", times: 22 }, { number: "1438", times: 22 },
  { number: "1849", times: 22 }, { number: "2756", times: 22 }, { number: "2807", times: 22 },
  { number: "2939", times: 22 }, { number: "2941", times: 22 }, { number: "3198", times: 22 },
  { number: "3657", times: 22 }, { number: "4291", times: 22 }, { number: "4421", times: 22 },
  { number: "4470", times: 22 }, { number: "4616", times: 22 }, { number: "4979", times: 22 },
  { number: "5281", times: 22 }, { number: "5502", times: 22 }, { number: "5510", times: 22 },
  { number: "5614", times: 22 }, { number: "5760", times: 22 }, { number: "5788", times: 22 },
  { number: "5790", times: 22 }, { number: "5872", times: 22 }, { number: "6124", times: 22 },
  { number: "6147", times: 22 }, { number: "6676", times: 22 }, { number: "6750", times: 22 },
  { number: "7234", times: 22 }, { number: "7505", times: 22 }, { number: "7753", times: 22 },
  { number: "7816", times: 22 }, { number: "8045", times: 22 }, { number: "8207", times: 22 },
  { number: "8282", times: 22 },
];

const RECENT_4D_DRAWS: Array<{ drawDate: string; drawNo: string; numbers: string[] }> = [
  {
    drawDate: "2026-08-12",
    drawNo: "5521",
    numbers: [
      "2375", "2490", "6546",
      "0047", "0498", "0640", "0832", "1505", "2487", "4702", "6103", "6804", "7305",
      "0942", "1035", "1161", "2482", "3845", "4395", "4643", "5261", "5825", "7456",
    ],
  },
  {
    drawDate: "2026-08-09",
    drawNo: "5520",
    numbers: [
      "7137", "7072", "7256",
      "0827", "1048", "2003", "3477", "3561", "5711", "6471", "7098", "8484", "8670",
      "0740", "3223", "3245", "5245", "6992", "7935", "8023", "8788", "8977", "9646",
    ],
  },
  {
    drawDate: "2026-08-08",
    drawNo: "5519",
    numbers: [
      "5102", "1128", "6050",
      "0164", "0427", "3437", "4097", "4259", "5284", "6139", "7399", "7584", "9146",
      "0221", "1138", "1747", "2834", "4710", "5280", "5849", "6338", "6892", "7406",
    ],
  },
  {
    drawDate: "2026-08-05",
    drawNo: "5518",
    numbers: [
      "0715", "0901", "5730",
      "2093", "3317", "4188", "4305", "5910", "6717", "6786", "8903", "9201", "9807",
      "1833", "4070", "4685", "6299", "7535", "7673", "7943", "8292", "8766", "9530",
    ],
  },
  {
    drawDate: "2026-08-02",
    drawNo: "5517",
    numbers: [
      "3052", "7038", "2268",
      "0051", "0766", "2875", "5068", "6347", "6367", "7934", "8842", "8955", "9857",
      "0179", "0962", "1071", "1448", "1823", "2571", "2908", "4025", "5864", "7278",
    ],
  },
  {
    drawDate: "2026-08-01",
    drawNo: "5516",
    numbers: [
      "5964", "0462", "0631",
      "2182", "2596", "2869", "3167", "5565", "5739", "5843", "6308", "7502", "9040",
      "0267", "1692", "4108", "5810", "6750", "8001", "8632", "8675", "9562", "9955",
    ],
  },
  {
    drawDate: "2026-07-08",
    drawNo: "5506",
    numbers: [
      "5701", "3264", "8354",
      "0381", "1268", "1616", "2669", "3921", "4805", "4849", "4906", "6797", "8968",
      "0028", "0868", "1272", "1540", "3172", "4527", "5974", "6035", "8300", "8856",
    ],
  },
  {
    drawDate: "2026-07-05",
    drawNo: "5505",
    numbers: [
      "0629", "0710", "2094",
      "1155", "1752", "3787", "4413", "5156", "5225", "7513", "8331", "8516", "9313",
      "1963", "2573", "2868", "3314", "3710", "4628", "4924", "5568", "5926", "9707",
    ],
  },
  {
    drawDate: "2026-07-04",
    drawNo: "5504",
    numbers: [
      "4230", "1610", "2014",
      "0006", "0598", "0607", "2189", "2902", "3228", "3733", "3847", "3950", "7643",
      "1464", "1826", "2013", "4717", "6799", "7071", "7537", "8303", "9167", "9659",
    ],
  },
  {
    drawDate: "2026-07-01",
    drawNo: "5503",
    numbers: [
      "6428", "6234", "9596",
      "0927", "4561", "5664", "6543", "7638", "7680", "7902", "8886", "9796", "9818",
      "0707", "1242", "1722", "2534", "3674", "4828", "7927", "8506", "9180", "9386",
    ],
  },
  {
    drawDate: "2026-06-28",
    drawNo: "5502",
    numbers: [
      "1563", "5604", "3531",
      "0131", "1203", "3915", "4718", "4788", "4867", "5473", "7149", "9414", "9893",
      "0503", "1353", "1564", "1592", "1638", "1948", "2562", "5897", "7971", "9763",
    ],
  },
  {
    drawDate: "2026-06-27",
    drawNo: "5501",
    numbers: [
      "5286", "7885", "2103",
      "1092", "3142", "4964", "6094", "6299", "6936", "7299", "9006", "9310", "9706",
      "1122", "1713", "1940", "3972", "4330", "4937", "5950", "7218", "8149", "8474",
    ],
  },
  {
    drawDate: "2026-02-25",
    drawNo: "5449",
    numbers: [
      "8445", "6880", "7342",
      "0206", "0506", "0615", "1336", "3150", "3330", "4708", "5831", "8525", "9567",
      "0188", "1246", "1391", "2185", "5131", "5515", "6277", "8360", "8687", "9397",
    ],
  },
  {
    drawDate: "2026-02-22",
    drawNo: "5448",
    numbers: [
      "2905", "3120", "6629",
      "0672", "1662", "1887", "1970", "4048", "5810", "6628", "7507", "8372", "9856",
      "0540", "0580", "1164", "1648", "1986", "2956", "3372", "4756", "4961", "7197",
    ],
  },
  {
    drawDate: "2026-02-18",
    drawNo: "5447",
    numbers: [
      "5688", "6228", "9150",
      "0477", "1332", "2735", "3018", "4076", "4651", "5509", "6146", "7849", "8844",
      "0795", "1774", "2086", "2114", "2837", "3608", "4832", "5059", "6176", "6249",
    ],
  },
  {
    drawDate: "2026-02-11",
    drawNo: "5443",
    numbers: [
      "5510", "0876", "0529",
      "0245", "2130", "2438", "3414", "3753", "4093", "5569", "7867", "8167", "8518",
      "0034", "0278", "0958", "1469", "1482", "3405", "6117", "6492", "6881", "9882",
    ],
  },
  {
    drawDate: "2026-02-08",
    drawNo: "5442",
    numbers: [
      "1135", "9006", "6501",
      "0138", "0814", "1234", "3260", "4243", "5478", "6731", "7194", "8577", "9047",
      "1272", "1567", "2570", "2672", "3622", "5735", "5783", "5832", "8320", "9897",
    ],
  },
  {
    drawDate: "2026-02-07",
    drawNo: "5441",
    numbers: [
      "1516", "8047", "7919",
      "0743", "1239", "3077", "3246", "4394", "5148", "5232", "7734", "8070", "9023",
      "0001", "0979", "1259", "2206", "3038", "4327", "6510", "6852", "7464", "7505",
    ],
  },
  {
    drawDate: "2026-02-01",
    drawNo: "5439",
    numbers: [
      "7970", "0896", "0553",
      "1818", "2021", "3015", "4271", "4932", "6175", "8533", "9134", "9406", "9463",
      "1931", "1952", "2144", "3346", "4713", "6872", "6946", "8339", "8658", "9806",
    ],
  },
  {
    drawDate: "2026-01-31",
    drawNo: "5438",
    numbers: [
      "2490", "7164", "6555",
      "0249", "0285", "2225", "2628", "3631", "4235", "6547", "6661", "8293", "9354",
      "3717", "4115", "4439", "5336", "6334", "6399", "6870", "7138", "9339", "9813",
    ],
  },
  {
    drawDate: "2024-04-07",
    drawNo: "5154",
    numbers: [
      "2194", "1562", "6955",
      "0094", "0143", "1416", "5626", "6314", "6746", "8586", "8728", "8818", "9645",
      "0223", "0644", "1195", "1326", "5765", "5989", "6805", "7817", "8470", "9175",
    ],
  },
  {
    drawDate: "2024-04-06",
    drawNo: "5153",
    numbers: [
      "4437", "9844", "2406",
      "1446", "2993", "3322", "4340", "5281", "5546", "5921", "8650", "9227", "9858",
      "0309", "0697", "2469", "3222", "4094", "7254", "7660", "8148", "8711", "9106",
    ],
  },
  {
    drawDate: "2024-04-03",
    drawNo: "5152",
    numbers: [
      "1755", "4508", "3542",
      "1830", "2209", "2260", "3315", "4554", "6220", "6901", "7684", "8278", "9206",
      "0859", "0912", "3181", "3288", "3699", "4235", "4669", "7985", "8467", "9800",
    ],
  },
];

function flattenRecords(): FourDRecord[] {
  const records: FourDRecord[] = [];
  RECENT_4D_DRAWS.forEach((draw) => {
    draw.numbers.forEach((digit, idx) => {
      let prizeCode: FourDRecord["prizeCode"] = "C";
      if (idx === 0) prizeCode = "1";
      else if (idx === 1) prizeCode = "2";
      else if (idx === 2) prizeCode = "3";
      else if (idx <= 12) prizeCode = "S";
      records.push({
        drawDate: draw.drawDate,
        drawNo: draw.drawNo,
        prizeCode,
        digit,
      });
    });
  });
  return records.sort((a, b) => b.drawDate.localeCompare(a.drawDate));
}

const EMBEDDED_RECORDS = flattenRecords();

function scoreNumberMap(records: FourDRecord[]): Map<string, number> {
  const map = new Map<string, number>();
  const latestWeight = RECENT_4D_DRAWS.length;

  records.forEach((row) => {
    const drawIndex = RECENT_4D_DRAWS.findIndex((d) => d.drawNo === row.drawNo);
    const recency = drawIndex >= 0 ? latestWeight - drawIndex : 0;
    const score = PRIZE_WEIGHTS[row.prizeCode] + recency * 0.22;
    map.set(row.digit, (map.get(row.digit) ?? 0) + score);
  });

  SGP_TOP_100_FREQUENT_4D.forEach((row) => {
    map.set(row.number, (map.get(row.number) ?? 0) + row.times * 2.9);
  });

  return map;
}

function scorePositionDigits(records: FourDRecord[]): number[][] {
  const matrix = Array.from({ length: 4 }, () => Array.from({ length: 10 }, () => 0));

  records.forEach((row) => {
    const base = PRIZE_WEIGHTS[row.prizeCode];
    row.digit.split("").forEach((char, idx) => {
      matrix[idx][Number(char)] += base;
    });
  });

  SGP_TOP_100_FREQUENT_4D.forEach((row) => {
    row.number.split("").forEach((char, idx) => {
      matrix[idx][Number(char)] += row.times * 1.8;
    });
  });

  return matrix;
}

function normalizePositionProbabilities(matrix: number[][]): PositionProbability[] {
  return matrix.map((row, index) => {
    const total = row.reduce((sum, value) => sum + value, 0);
    return {
      position: (index + 1) as 1 | 2 | 3 | 4,
      digits: row.map((weight, digit) => ({
        digit,
        probability: total > 0 ? weight / total : 0,
      })),
    };
  });
}

function buildCandidates(records: FourDRecord[]): Candidate[] {
  const map = scoreNumberMap(records);
  const posMatrix = scorePositionDigits(records);
  const candidates: Candidate[] = [];

  for (let i = 0; i <= 9999; i += 1) {
    const value = String(i).padStart(4, "0");
    const historical = map.get(value) ?? 0;
    const positional = value
      .split("")
      .reduce((sum, char, idx) => sum + posMatrix[idx][Number(char)], 0);
    const uniqueDigits = new Set(value.split("")).size;
    const diversityBoost = uniqueDigits <= 2 ? 0.9 : uniqueDigits === 3 ? 1 : 1.06;
    const score = (historical * 1.35 + positional * 0.7) * diversityBoost;
    candidates.push({ value, score });
  }

  return candidates.sort((a, b) => b.score - a.score);
}

function weightedPick(candidates: Array<{ value: string; probability: number }>): string {
  const total = candidates.reduce((sum, row) => sum + row.probability, 0);
  let target = Math.random() * total;
  for (const row of candidates) {
    target -= row.probability;
    if (target <= 0) {
      return row.value;
    }
  }
  return candidates[candidates.length - 1].value;
}

export function getPrediction(count = 5): FourDPrediction {
  const ranked = buildCandidates(EMBEDDED_RECORDS).slice(0, 800);
  const total = ranked.reduce((sum, row) => sum + row.score, 0);
  const normalized = ranked.map((row) => ({ value: row.value, probability: row.score / total }));

  const picks: FourDPick[] = [];
  const used = new Set<string>();
  const mutable = [...normalized];
  const size = Math.max(1, Math.min(count, 10));

  while (picks.length < size && mutable.length > 0) {
    const value = weightedPick(mutable);
    const idx = mutable.findIndex((item) => item.value === value);
    if (idx >= 0) {
      const [row] = mutable.splice(idx, 1);
      if (!used.has(row.value)) {
        used.add(row.value);
        picks.push(row);
      }
    }
  }

  return {
    picks,
    positionProbabilities: normalizePositionProbabilities(scorePositionDigits(EMBEDDED_RECORDS)),
  };
}

export function getEmbeddedRecordsSummary(): {
  totalRows: number;
  uniqueNumbers: number;
  dateFrom: string;
  dateTo: string;
} {
  const unique = new Set(EMBEDDED_RECORDS.map((row) => row.digit));
  const sortedDates = [...new Set(EMBEDDED_RECORDS.map((row) => row.drawDate))].sort();
  return {
    totalRows: EMBEDDED_RECORDS.length,
    uniqueNumbers: unique.size,
    dateFrom: sortedDates[0] ?? "",
    dateTo: sortedDates[sortedDates.length - 1] ?? "",
  };
}

export function getEmbeddedRecordsPreview(limit = 300): FourDRecord[] {
  return EMBEDDED_RECORDS.slice(0, Math.max(1, Math.min(limit, EMBEDDED_RECORDS.length)));
}

export function get4DPredictorSources(): { label: string; url: string }[] {
  return [
    {
      label: "Singapore Pools Top 100 frequently drawn 4D numbers",
      url: "https://www.singaporepools.com.sg/en/product/Pages/4d_t100fd4dn.aspx",
    },
    {
      label: "Singapore Pools check past winning numbers (from May 1986)",
      url: "https://www.singaporepools.com.sg/en/product/pages/check_past_winning_numbers.aspx",
    },
    {
      label: "4dinsingapore past 4D results",
      url: "https://4dinsingapore.com/past-4d-results/",
    },
    {
      label: "Live4D2U Singapore 4D latest/results listing",
      url: "https://live4d2u.com/singapore/4d/",
    },
  ];
}
