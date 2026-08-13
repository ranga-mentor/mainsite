import { useMemo, useState } from "react";
import {
  generateBatch,
  normalizeNric,
  validateNric,
  type NricPrefixSelection,
} from "../tools/nric";
import {
  generateHongKongId,
  generateMalaysiaId,
  type HkCheckDigitFormat,
  type HkPrefixMode,
  validateHongKongId,
  validateMalaysiaId,
} from "../tools/asiaIds";

const PREFIX_OPTIONS: NricPrefixSelection[] = ["AUTO", "S", "T", "F", "G", "M"];
const DEFAULT_ID_COUNT = 1;
const MAX_ID_COUNT = 50;

type CountryPage = "sg" | "my" | "hk";

type NricToolsProps = {
  countryPage?: CountryPage;
  onCountryPageChange?: (next: CountryPage) => void;
};

function generateUniqueIds(count: number, generator: () => string): string[] {
  const values = new Set<string>();
  const size = Math.max(1, Math.min(MAX_ID_COUNT, Math.floor(count)));
  while (values.size < size) {
    values.add(generator());
  }
  return [...values];
}

export default function NricTools({ countryPage = "sg", onCountryPageChange }: NricToolsProps) {
  const [internalCountryPage, setInternalCountryPage] = useState<CountryPage>(countryPage);
  const activeCountryPage = onCountryPageChange ? countryPage : internalCountryPage;

  const [valueToValidate, setValueToValidate] = useState("");
  const [prefixSelection, setPrefixSelection] =
    useState<NricPrefixSelection>("S");
  const [sgCount, setSgCount] = useState(DEFAULT_ID_COUNT);
  const [generatedSg, setGeneratedSg] = useState<string[]>(() => generateBatch(DEFAULT_ID_COUNT, "S"));
  const [valueToValidateMy, setValueToValidateMy] = useState("");
  const [myCount, setMyCount] = useState(DEFAULT_ID_COUNT);
  const [generatedMy, setGeneratedMy] = useState<string[]>(() =>
    generateUniqueIds(DEFAULT_ID_COUNT, () => generateMalaysiaId("any")),
  );
  const [valueToValidateHk, setValueToValidateHk] = useState("");
  const [hkPrefixMode, setHkPrefixMode] = useState<HkPrefixMode>("auto");
  const [hkCheckDigitFormat, setHkCheckDigitFormat] =
    useState<HkCheckDigitFormat>("hyphen");
  const [hkCount, setHkCount] = useState(DEFAULT_ID_COUNT);
  const [generatedHk, setGeneratedHk] = useState<string[]>(() =>
    generateUniqueIds(DEFAULT_ID_COUNT, () =>
      generateHongKongId({ prefixMode: "auto", checkDigitFormat: "hyphen" }),
    ),
  );
  const [copyStateSg, setCopyStateSg] = useState<"idle" | "copied">("idle");
  const [copyStateMy, setCopyStateMy] = useState<"idle" | "copied">("idle");
  const [copyStateHk, setCopyStateHk] = useState<"idle" | "copied">("idle");
  const [logicPopup, setLogicPopup] = useState<null | "sg" | "my" | "hk">(null);

  const validationResult = useMemo(
    () => validateNric(valueToValidate),
    [valueToValidate],
  );
  const validationResultMy = useMemo(
    () => validateMalaysiaId(valueToValidateMy),
    [valueToValidateMy],
  );
  const validationResultHk = useMemo(
    () => validateHongKongId(valueToValidateHk),
    [valueToValidateHk],
  );

  async function copyGeneratedValue(
    value: string[],
    setState: (next: "idle" | "copied") => void,
  ) {
    try {
      await navigator.clipboard.writeText(value.join(", "));
      setState("copied");
      setTimeout(() => setState("idle"), 1200);
    } catch {
      setState("idle");
    }
  }

  function normalizeCount(value: number): number {
    return Math.max(
      1,
      Math.min(MAX_ID_COUNT, Math.floor(Number.isFinite(value) ? value : DEFAULT_ID_COUNT)),
    );
  }

  function updateCount(value: string, setCount: (next: number) => void) {
    setCount(normalizeCount(Number(value)));
  }

  const logicTextByCountry: Record<"sg" | "my" | "hk", string[]> = {
    sg: [
      "Format: prefix + 7 digits + suffix (e.g. S1234567D).",
      "Supported prefixes: S, T, F, G, M.",
      "Checksum uses weights 2,7,6,5,4,3,2 on 7 digits.",
      "Offset: T/G = +4, M = +3, S/F = +0.",
      "Suffix map: S/T -> JZIHGFEDCBA, F/G -> XWUTRQPNMLK, M -> XWUTRQPNJLK.",
      "Generator creates random 7-digit serial, computes suffix from prefix rules.",
    ],
    my: [
      "Format: compact 12 digits (YYMMDDPB####); hyphenated input is also accepted.",
      "YYMMDD is randomly generated date in configured range.",
      "PB is a state/place code from known MyKad code list.",
      "Last 4 digits are random serial.",
      "Gender hint (common convention): odd last digit often male, even often female.",
      "Validator checks structure, date validity, and state/place code validity.",
    ],
    hk: [
      "Format: 1-2 prefix letters + 6 digits + check digit.",
      "Output style supports hyphen (default) or parentheses.",
      "Examples: A123456-7, AB123456(9).",
      "Checksum uses HKID weighted sum with implied leading space for 1-letter prefix.",
      "Letter mapping: A=10 ... Z=35.",
      "Check digit is computed modulo 11 (10 represented as A).",
    ],
  };

  const logicTitleByCountry: Record<"sg" | "my" | "hk", string> = {
    sg: "Singapore ID Generation Logic",
    my: "Malaysia ID Generation Logic",
    hk: "Hong Kong ID Generation Logic",
  };

  function changeCountryPage(next: CountryPage) {
    if (onCountryPageChange) {
      onCountryPageChange(next);
      return;
    }
    setInternalCountryPage(next);
  }

  return (
    <>
      <section className="id-tools-hero">
        <h2>ID Tools</h2>
        <p>Pick a country to validate or generate identity format examples.</p>
      </section>

      <section className="country-switcher id-country-switcher">
        <button
          className={activeCountryPage === "sg" ? "is-active" : ""}
          onClick={() => changeCountryPage("sg")}
          type="button"
        >
          <span className="country-flag" aria-hidden="true">🇸🇬</span>
          <span>Singapore NRIC/FIN</span>
        </button>
        <button
          className={activeCountryPage === "my" ? "is-active" : ""}
          onClick={() => changeCountryPage("my")}
          type="button"
        >
          <span className="country-flag" aria-hidden="true">🇲🇾</span>
          <span>Malaysia MyKad</span>
        </button>
        <button
          className={activeCountryPage === "hk" ? "is-active" : ""}
          onClick={() => changeCountryPage("hk")}
          type="button"
        >
          <span className="country-flag" aria-hidden="true">🇭🇰</span>
          <span>Hong Kong HKID</span>
        </button>
      </section>

      {activeCountryPage === "sg" && (
        <section className="nric-tools">
          <article className="tool-card id-tool-card">
            <h2>Singapore NRIC/FIN Validator</h2>
            <p>Checks format and checksum for S, T, F, G, and M series.</p>
            <label htmlFor="nric-input">NRIC/FIN value</label>
            <input
              id="nric-input"
              className="tool-input"
              value={valueToValidate}
              onChange={(event) => setValueToValidate(event.target.value)}
              placeholder="e.g. S1234567D"
            />
            {valueToValidate.trim() ? (
              <div
                className={validationResult.valid ? "result ok" : "result bad"}
                role="status"
              >
                <strong>{validationResult.valid ? "Valid" : "Invalid"}</strong>
                <p>Normalized: {normalizeNric(valueToValidate)}</p>
                {!validationResult.valid && validationResult.reason && (
                  <p>{validationResult.reason}</p>
                )}
              </div>
            ) : (
              <div className="result neutral">Enter a value to validate.</div>
            )}
          </article>

          <article className="tool-card id-tool-card id-generator-card">
            <h2>Singapore NRIC/FIN Generator</h2>
            <p>Generates up to 50 unique values with correct checksums (test/demo use only).</p>
            <div className="generator-controls">
              <div className="generator-field">
                <label htmlFor="prefix-select">Prefix</label>
                <select
                  id="prefix-select"
                  className="tool-select"
                  value={prefixSelection}
                  onChange={(event) =>
                    setPrefixSelection(event.target.value as NricPrefixSelection)
                  }
                >
                  {PREFIX_OPTIONS.map((prefix) => (
                    <option key={prefix} value={prefix}>
                      {prefix}
                    </option>
                  ))}
                </select>
              </div>
              <div className="generator-field">
                <label htmlFor="sg-id-count">Number of IDs</label>
                <input
                  id="sg-id-count"
                  className="tool-input"
                  type="number"
                  min={1}
                  max={MAX_ID_COUNT}
                  value={sgCount}
                  onChange={(event) => updateCount(event.target.value, setSgCount)}
                />
              </div>
              <button
                className="generate-button"
                type="button"
                onClick={() => {
                  setGeneratedSg(generateBatch(sgCount, prefixSelection));
                  setCopyStateSg("idle");
                }}
              >
                Generate IDs
              </button>
            </div>
            <div className="generated-single">
              <p className="generated-label">Generated IDs</p>
              <button
                className="generated-value"
                onClick={() => copyGeneratedValue(generatedSg, setCopyStateSg)}
                title="Copy generated IDs as comma-separated values"
                type="button"
              >
                <code>{generatedSg.join(", ")}</code>
                <span className={`copy-state ${copyStateSg === "copied" ? "is-copied" : ""}`}>
                  {copyStateSg === "copied" ? "Copied" : "Copy"}
                </span>
              </button>
              <p className="generated-hint">Click the generated values to copy comma-separated IDs.</p>
            </div>
            <button
              className="logic-button"
              onClick={() => setLogicPopup("sg")}
              type="button"
            >
              View generation logic
            </button>
          </article>
        </section>
      )}

      {activeCountryPage === "my" && (
        <section className="nric-tools">
          <article className="tool-card id-tool-card">
            <h2>Malaysia MyKad Validator</h2>
            <p>Checks format and basic date/state structure.</p>
            <label htmlFor="mykad-input">MyKad value</label>
            <input
              id="mykad-input"
              className="tool-input"
              value={valueToValidateMy}
              onChange={(event) => setValueToValidateMy(event.target.value)}
              placeholder="e.g. 900101145678"
            />
            {valueToValidateMy.trim() ? (
              <div
                className={validationResultMy.valid ? "result ok" : "result bad"}
                role="status"
              >
                <strong>{validationResultMy.valid ? "Valid" : "Invalid"}</strong>
                <p>Normalized: {validationResultMy.normalized}</p>
                {!validationResultMy.valid && validationResultMy.reason && (
                  <p>{validationResultMy.reason}</p>
                )}
              </div>
            ) : (
              <div className="result neutral">Enter a value to validate.</div>
            )}
          </article>

          <article className="tool-card id-tool-card id-generator-card">
            <h2>Malaysia MyKad Generator</h2>
            <p>Generates up to 50 unique compact MyKad style IDs (YYMMDDPB####).</p>
            <div className="generator-select-grid">
              <div className="generator-field">
                <label htmlFor="my-id-count">Number of IDs</label>
                <input
                  id="my-id-count"
                  className="tool-input"
                  type="number"
                  min={1}
                  max={MAX_ID_COUNT}
                  value={myCount}
                  onChange={(event) => updateCount(event.target.value, setMyCount)}
                />
              </div>
            </div>
            <div className="generator-actions">
              <button
                className="generate-button"
                type="button"
                onClick={() => {
                  setGeneratedMy(generateUniqueIds(myCount, () => generateMalaysiaId("any")));
                  setCopyStateMy("idle");
                }}
              >
                Generate IDs
              </button>
            </div>
            <div className="generated-single">
              <p className="generated-label">Generated IDs</p>
              <button
                className="generated-value"
                onClick={() => copyGeneratedValue(generatedMy, setCopyStateMy)}
                title="Copy generated IDs as comma-separated values"
                type="button"
              >
                <code>{generatedMy.join(", ")}</code>
                <span className={`copy-state ${copyStateMy === "copied" ? "is-copied" : ""}`}>
                  {copyStateMy === "copied" ? "Copied" : "Copy"}
                </span>
              </button>
              <p className="generated-hint">Click the generated values to copy comma-separated IDs.</p>
            </div>
            <button
              className="logic-button"
              onClick={() => setLogicPopup("my")}
              type="button"
            >
              View generation logic
            </button>
          </article>
        </section>
      )}

      {activeCountryPage === "hk" && (
        <section className="nric-tools">
          <article className="tool-card id-tool-card">
            <h2>Hong Kong HKID Validator</h2>
            <p>Checks format and checksum for one/two-letter HKID values.</p>
            <label htmlFor="hkid-input">HKID value</label>
            <input
              id="hkid-input"
              className="tool-input"
              value={valueToValidateHk}
              onChange={(event) => setValueToValidateHk(event.target.value)}
              placeholder="e.g. A123456-7 or AB123456(9)"
            />
            {valueToValidateHk.trim() ? (
              <div
                className={validationResultHk.valid ? "result ok" : "result bad"}
                role="status"
              >
                <strong>{validationResultHk.valid ? "Valid" : "Invalid"}</strong>
                <p>Normalized: {validationResultHk.normalized}</p>
                {!validationResultHk.valid && validationResultHk.reason && (
                  <p>{validationResultHk.reason}</p>
                )}
              </div>
            ) : (
              <div className="result neutral">Enter a value to validate.</div>
            )}
          </article>

          <article className="tool-card id-tool-card id-generator-card">
            <h2>Hong Kong HKID Generator</h2>
            <p>Generates up to 50 unique HKID style values with checksums.</p>
            <div className="generator-select-grid">
              <div className="generator-field">
                <label htmlFor="hk-prefix-mode">Prefix mode</label>
                <select
                  id="hk-prefix-mode"
                  className="tool-select"
                  value={hkPrefixMode}
                  onChange={(event) =>
                    setHkPrefixMode(event.target.value as HkPrefixMode)
                  }
                >
                  <option value="auto">Auto</option>
                  <option value="one">One letter</option>
                  <option value="two">Two letters</option>
                </select>
              </div>
              <div className="generator-field">
                <label htmlFor="hk-id-format">ID format</label>
                <select
                  id="hk-id-format"
                  className="tool-select"
                  value={hkCheckDigitFormat}
                  onChange={(event) =>
                    setHkCheckDigitFormat(event.target.value as HkCheckDigitFormat)
                  }
                >
                  <option value="hyphen">Hyphen (A123456-7)</option>
                  <option value="parentheses">Parentheses (A123456(7))</option>
                </select>
              </div>
              <div className="generator-field">
                <label htmlFor="hk-id-count">Number of IDs</label>
                <input
                  id="hk-id-count"
                  className="tool-input"
                  type="number"
                  min={1}
                  max={MAX_ID_COUNT}
                  value={hkCount}
                  onChange={(event) => updateCount(event.target.value, setHkCount)}
                />
              </div>
            </div>
            <div className="generator-actions">
              <button
                className="generate-button"
                type="button"
                onClick={() => {
                  setGeneratedHk(
                    generateUniqueIds(hkCount, () =>
                      generateHongKongId({
                        prefixMode: hkPrefixMode,
                        checkDigitFormat: hkCheckDigitFormat,
                      }),
                    ),
                  );
                  setCopyStateHk("idle");
                }}
              >
                Generate IDs
              </button>
            </div>
            <div className="generated-single">
              <p className="generated-label">Generated IDs</p>
              <button
                className="generated-value"
                onClick={() => copyGeneratedValue(generatedHk, setCopyStateHk)}
                title="Copy generated IDs as comma-separated values"
                type="button"
              >
                <code>{generatedHk.join(", ")}</code>
                <span className={`copy-state ${copyStateHk === "copied" ? "is-copied" : ""}`}>
                  {copyStateHk === "copied" ? "Copied" : "Copy"}
                </span>
              </button>
              <p className="generated-hint">Click the generated values to copy comma-separated IDs.</p>
            </div>
            <button
              className="logic-button"
              onClick={() => setLogicPopup("hk")}
              type="button"
            >
              View generation logic
            </button>
          </article>
        </section>
      )}

      {logicPopup && (
        <div className="logic-modal-overlay" role="dialog" aria-modal="true">
          <div className="logic-modal">
            <h3>{logicTitleByCountry[logicPopup]}</h3>
            <ul>
              {logicTextByCountry[logicPopup].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <button onClick={() => setLogicPopup(null)} type="button">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
