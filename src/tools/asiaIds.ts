type MyGender = "any" | "male" | "female";
export type HkPrefixMode = "auto" | "one" | "two";
export type HkCheckDigitFormat = "parentheses" | "hyphen";
type ValidationResult = {
  valid: boolean;
  normalized: string;
  reason?: string;
};

function randomInt(maxExclusive: number): number {
  return Math.floor(Math.random() * maxExclusive);
}

function randomBetween(minInclusive: number, maxInclusive: number): number {
  return minInclusive + randomInt(maxInclusive - minInclusive + 1);
}

function pick<T>(items: T[]): T {
  return items[randomInt(items.length)];
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function randomDateYyMmDd(): string {
  const start = new Date(1950, 0, 1).getTime();
  const end = new Date(2024, 11, 31).getTime();
  const date = new Date(randomBetween(start, end));
  const yy = date.getFullYear() % 100;
  return `${pad2(yy)}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;
}

const MALAYSIA_STATE_CODES = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13",
  "14", "15", "16", "21", "22", "23", "24", "71", "72", "73", "74", "75", "76",
  "77", "78", "79", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91",
  "92", "93", "98", "99",
];

function normalizeDigits(value: string): string {
  return value.replace(/\D+/g, "");
}

function isValidYyMmDd(datePart: string): boolean {
  const yy = Number(datePart.slice(0, 2));
  const mm = Number(datePart.slice(2, 4));
  const dd = Number(datePart.slice(4, 6));
  if (!Number.isInteger(mm) || !Number.isInteger(dd) || mm < 1 || mm > 12 || dd < 1) {
    return false;
  }

  // Use 2000+YY for a deterministic date check on generated IDs.
  const fullYear = 2000 + yy;
  const maxDay = new Date(fullYear, mm, 0).getDate();
  return dd <= maxDay;
}

export function validateMalaysiaId(rawValue: string): ValidationResult {
  const compact = normalizeDigits(rawValue);
  const normalized =
    compact.length === 12
      ? `${compact.slice(0, 6)}-${compact.slice(6, 8)}-${compact.slice(8)}`
      : rawValue.trim();

  if (!/^\d{12}$/.test(compact)) {
    return {
      valid: false,
      normalized,
      reason: "Expected compact 12 digits (YYMMDDPB####); hyphens are also accepted.",
    };
  }

  const datePart = compact.slice(0, 6);
  const stateCode = compact.slice(6, 8);
  if (!isValidYyMmDd(datePart)) {
    return {
      valid: false,
      normalized,
      reason: "Invalid birth date section (YYMMDD).",
    };
  }

  if (!MALAYSIA_STATE_CODES.includes(stateCode)) {
    return {
      valid: false,
      normalized,
      reason: "Invalid state/place code.",
    };
  }

  return { valid: true, normalized };
}

export function generateMalaysiaId(gender: MyGender = "any"): string {
  const yymmdd = randomDateYyMmDd();
  const stateCode = pick(MALAYSIA_STATE_CODES);
  const firstThree = String(randomInt(1000)).padStart(3, "0");

  let lastDigit = randomInt(10);
  if (gender === "male" && lastDigit % 2 === 0) {
    lastDigit = lastDigit === 0 ? 1 : lastDigit - 1;
  }
  if (gender === "female" && lastDigit % 2 === 1) {
    lastDigit = lastDigit === 9 ? 8 : lastDigit + 1;
  }

  const compact = `${yymmdd}${stateCode}${firstThree}${lastDigit}`;
  return compact;
}

function randomLetters(length: number): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let value = "";
  for (let i = 0; i < length; i += 1) {
    value += letters[randomInt(letters.length)];
  }
  return value;
}

function letterValue(char: string): number {
  return char.charCodeAt(0) - 55; // A=10 ... Z=35
}

function hkCheckDigit(prefix: string, digits: string): string {
  let sum = 0;

  if (prefix.length === 1) {
    sum += 36 * 9; // implied leading space for 1-letter HKID
    sum += letterValue(prefix[0]) * 8;
  } else {
    sum += letterValue(prefix[0]) * 9;
    sum += letterValue(prefix[1]) * 8;
  }

  for (let i = 0; i < 6; i += 1) {
    sum += Number(digits[i]) * (7 - i);
  }

  const remainder = sum % 11;
  const check = (11 - remainder) % 11;
  return check === 10 ? "A" : String(check);
}

function normalizeHkId(value: string): string {
  return value.toUpperCase().replace(/\s+/g, "");
}

export function validateHongKongId(rawValue: string): ValidationResult {
  const normalized = normalizeHkId(rawValue);
  const match = normalized.match(/^([A-Z]{1,2})(\d{6})(?:\(([0-9A])\)|-([0-9A])|([0-9A]))$/);
  if (!match) {
    return {
      valid: false,
      normalized,
      reason: "Expected format: A123456-7, AB123456-7, or A123456(7).",
    };
  }

  const [, prefix, digits, pCheck, hCheck, plainCheck] = match;
  const givenCheck = pCheck ?? hCheck ?? plainCheck ?? "";
  const expected = hkCheckDigit(prefix, digits);
  if (givenCheck !== expected) {
    return {
      valid: false,
      normalized,
      reason: `Invalid checksum. Expected check digit: ${expected}.`,
    };
  }

  return { valid: true, normalized };
}

type HkGenerateOptions = {
  prefixMode?: HkPrefixMode;
  checkDigitFormat?: HkCheckDigitFormat;
};

export function generateHongKongId(
  modeOrOptions: HkPrefixMode | HkGenerateOptions = "auto",
): string {
  const options: HkGenerateOptions =
    typeof modeOrOptions === "string"
      ? { prefixMode: modeOrOptions, checkDigitFormat: "hyphen" }
      : modeOrOptions;
  const prefixMode = options.prefixMode ?? "auto";
  const checkDigitFormat = options.checkDigitFormat ?? "hyphen";

  const letterCount =
    prefixMode === "auto" ? (Math.random() < 0.65 ? 1 : 2) : prefixMode === "one" ? 1 : 2;
  const prefix = randomLetters(letterCount);
  const digits = String(randomInt(1_000_000)).padStart(6, "0");
  const check = hkCheckDigit(prefix, digits);
  return checkDigitFormat === "parentheses"
    ? `${prefix}${digits}(${check})`
    : `${prefix}${digits}-${check}`;
}
