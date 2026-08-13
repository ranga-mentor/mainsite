import { useMemo, useState } from "react";

const SAMPLE_JSON = `{
  "site": "Learning Lab",
  "tools": ["ID Tools", "Json Tools"],
  "active": true
}`;

function formatJson(value: unknown): string {
  return JSON.stringify(value, null, 2) ?? "";
}

function escapeForJavaString(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");
}

function unescapeJavaString(value: string): string {
  const unquoted = value.trim().replace(/^"/, "").replace(/"$/, "");
  return unquoted
    .replace(/\\\\/g, "\u0000")
    .replace(/\\"/g, "\"")
    .replace(/\\r/g, "\r")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\u0000/g, "\\");
}

function getLineColumn(value: string, position: number): { line: number; column: number } {
  const beforeError = value.slice(0, Math.max(0, position));
  const lines = beforeError.split("\n");
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

function getErrorPosition(message: string): number | null {
  const match = message.match(/position\s+(\d+)/i);
  return match ? Number(match[1]) : null;
}

function findLikelyJsonErrorPosition(value: string): number | null {
  const stack: string[] = [];
  let inString = false;
  let escaped = false;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
      continue;
    }
    if (char === "{" || char === "[") {
      stack.push(char);
      continue;
    }
    if (char === "}" || char === "]") {
      const expected = char === "}" ? "{" : "[";
      if (stack.pop() !== expected) {
        return index;
      }
    }
  }

  if (inString || stack.length > 0) {
    return Math.max(0, value.length - 1);
  }
  return null;
}

export default function JsonTools() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const parsed = useMemo(() => {
    try {
      return { valid: true as const, value: JSON.parse(jsonInput), error: "" };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid JSON";
      const position = getErrorPosition(message) ?? findLikelyJsonErrorPosition(jsonInput);
      const location = typeof position === "number" ? getLineColumn(jsonInput, position) : null;
      return {
        valid: false as const,
        value: null,
        error: message,
        position,
        location,
      };
    }
  }, [jsonInput]);

  const jsonLines = useMemo(() => jsonInput.split("\n"), [jsonInput]);

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
        <div className="generator-actions json-actions">
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

          <button
            className="generate-button"
            type="button"
            onClick={() => {
              setJsonInput(escapeForJavaString(jsonInput));
              setCopyState("idle");
            }}
          >
            Escape
          </button>
          <button
            className="generate-button"
            type="button"
            onClick={() => {
              setJsonInput(unescapeJavaString(jsonInput));
              setCopyState("idle");
            }}
          >
            Unescape
          </button>
          <button className="generate-button json-copy-button" type="button" onClick={copyJson}>
            {copyState === "copied" ? "Copied" : "Copy"}
          </button>
        </div>
        <div className={parsed.valid ? "result ok" : "result bad"} role="status">
          <strong>{parsed.valid ? "Valid JSON" : "Invalid JSON"}</strong>
          <p>Escape and Unescape convert between JSON and Java string-safe JSON text.</p>
          {!parsed.valid && (
            <>
              <p>{parsed.error}</p>
              {parsed.location && (
                <p>
                  Error location: line {parsed.location.line}, column {parsed.location.column}
                </p>
              )}
            </>
          )}
        </div>
        {!parsed.valid && (
          <div className="json-error-preview" aria-label="JSON error location preview">
            {jsonLines.map((line, index) => {
              const lineNumber = index + 1;
              const isErrorLine = parsed.location?.line === lineNumber;
              return (
                <div
                  className={`json-error-line ${isErrorLine ? "is-error" : ""}`}
                  key={`${lineNumber}-${line}`}
                >
                  <span className="json-line-number">{lineNumber}</span>
                  <code>{line || " "}</code>
                </div>
              );
            })}
          </div>
        )}
      </article>
    </section>
  );
}
