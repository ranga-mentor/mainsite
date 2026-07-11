import { useMemo, useState } from "react";

const SAMPLE_JSON = `{
  "site": "Learning Lab",
  "tools": ["ID Tools", "Json Tools"],
  "active": true
}`;

function formatJson(value: unknown): string {
  return JSON.stringify(value, null, 2) ?? "";
}

export default function JsonTools() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const parsed = useMemo(() => {
    try {
      return { valid: true as const, value: JSON.parse(jsonInput), error: "" };
    } catch (error) {
      return {
        valid: false as const,
        value: null,
        error: error instanceof Error ? error.message : "Invalid JSON",
      };
    }
  }, [jsonInput]);

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(jsonInput);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1200);
    } catch {
      setCopyState("idle");
    }
  }

  return (
    <section className="json-tools">
      <article className="tool-card id-tool-card">
        <h2>Json Tools</h2>
        <p>Validate, format, and minify JSON payloads.</p>
        <label htmlFor="json-input">JSON input</label>
        <textarea
          id="json-input"
          className="tool-input json-input"
          value={jsonInput}
          onChange={(event) => {
            setJsonInput(event.target.value);
            setCopyState("idle");
          }}
          spellCheck={false}
        />
        <div className="generator-actions">
          <button
            className="generate-button"
            type="button"
            disabled={!parsed.valid}
            onClick={() => parsed.valid && setJsonInput(formatJson(parsed.value))}
          >
            Format
          </button>
          <button
            className="generate-button"
            type="button"
            disabled={!parsed.valid}
            onClick={() => parsed.valid && setJsonInput(JSON.stringify(parsed.value) ?? "")}
          >
            Minify
          </button>
          <button className="generate-button" type="button" onClick={copyJson}>
            {copyState === "copied" ? "Copied" : "Copy"}
          </button>
        </div>
        <div className={parsed.valid ? "result ok" : "result bad"} role="status">
          <strong>{parsed.valid ? "Valid JSON" : "Invalid JSON"}</strong>
          {!parsed.valid && <p>{parsed.error}</p>}
        </div>
      </article>
    </section>
  );
}
