import { useMemo, useState } from "react";

type SqlDialect = "postgres" | "mssql";

type SqlIssue = {
  message: string;
  line: number;
  column: number;
};

const SAMPLE_SQL = `SELECT id, name, created_at
FROM users
WHERE active = true
ORDER BY created_at DESC;`;

const COMMAND_START = /^(select|insert|update|delete|with|create|alter|drop|merge|truncate|exec|execute)\b/i;

function getLineColumn(value: string, position: number): { line: number; column: number } {
  const before = value.slice(0, Math.max(0, position));
  const lines = before.split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

function findSqlIssues(sql: string, dialect: SqlDialect): SqlIssue[] {
  const issues: SqlIssue[] = [];
  const trimmed = sql.trim();

  if (!trimmed) {
    return [{ message: "SQL input is empty.", line: 1, column: 1 }];
  }

  if (!COMMAND_START.test(trimmed)) {
    issues.push({ message: "Statement should start with a common SQL command.", line: 1, column: 1 });
  }

  const stack: Array<{ char: string; index: number }> = [];
  let singleQuoteIndex: number | null = null;
  let doubleQuoteIndex: number | null = null;
  let lineComment = false;
  let blockCommentIndex: number | null = null;

  for (let index = 0; index < sql.length; index += 1) {
    const char = sql[index];
    const next = sql[index + 1];

    if (lineComment) {
      if (char === "\n") {
        lineComment = false;
      }
      continue;
    }

    if (blockCommentIndex !== null) {
      if (char === "*" && next === "/") {
        blockCommentIndex = null;
        index += 1;
      }
      continue;
    }

    if (singleQuoteIndex !== null) {
      if (char === "'" && next === "'") {
        index += 1;
        continue;
      }
      if (char === "'") {
        singleQuoteIndex = null;
      }
      continue;
    }

    if (doubleQuoteIndex !== null) {
      if (char === "\"") {
        doubleQuoteIndex = null;
      }
      continue;
    }

    if (char === "-" && next === "-") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === "/" && next === "*") {
      blockCommentIndex = index;
      index += 1;
      continue;
    }
    if (char === "'") {
      singleQuoteIndex = index;
      continue;
    }
    if (char === "\"") {
      doubleQuoteIndex = index;
      continue;
    }
    if (char === "(" || char === "[" || char === "{") {
      stack.push({ char, index });
      continue;
    }
    if (char === ")" || char === "]" || char === "}") {
      const expected = char === ")" ? "(" : char === "]" ? "[" : "{";
      const last = stack.pop();
      if (!last || last.char !== expected) {
        const location = getLineColumn(sql, index);
        issues.push({ message: `Unexpected closing ${char}.`, ...location });
      }
    }
  }

  if (singleQuoteIndex !== null) {
    issues.push({ message: "Unclosed single-quoted string.", ...getLineColumn(sql, singleQuoteIndex) });
  }
  if (doubleQuoteIndex !== null) {
    issues.push({ message: "Unclosed double-quoted identifier/string.", ...getLineColumn(sql, doubleQuoteIndex) });
  }
  if (blockCommentIndex !== null) {
    issues.push({ message: "Unclosed block comment.", ...getLineColumn(sql, blockCommentIndex) });
  }
  stack.forEach((entry) => {
    issues.push({ message: `Unclosed ${entry.char}.`, ...getLineColumn(sql, entry.index) });
  });

  if (!/[;)]\s*$/.test(trimmed)) {
    const location = getLineColumn(sql, sql.length);
    issues.push({ message: "Statement should end with a semicolon.", ...location });
  }

  if (dialect === "postgres" && /\b(top|nvarchar|getdate|isnull)\b/i.test(sql)) {
    const match = sql.match(/\b(top|nvarchar|getdate|isnull)\b/i);
    const location = getLineColumn(sql, match?.index ?? 0);
    issues.push({ message: "Possible MSSQL syntax in PostgreSQL mode.", ...location });
  }
  if (dialect === "mssql" && /\b(limit|returning|serial|true|false)\b/i.test(sql)) {
    const match = sql.match(/\b(limit|returning|serial|true|false)\b/i);
    const location = getLineColumn(sql, match?.index ?? 0);
    issues.push({ message: "Possible PostgreSQL syntax in MSSQL mode.", ...location });
  }

  return issues;
}

export default function SqlTools() {
  const [dialect, setDialect] = useState<SqlDialect>("postgres");
  const [sqlInput, setSqlInput] = useState(SAMPLE_SQL);
  const issues = useMemo(() => findSqlIssues(sqlInput, dialect), [dialect, sqlInput]);

  return (
    <section className="sql-tools">
      <article className="tool-card id-tool-card">
        <h2>SQL Syntax Checker</h2>
        <p>Check common SQL syntax issues for PostgreSQL and MSSQL.</p>
        <label htmlFor="sql-dialect">Database</label>
        <select
          id="sql-dialect"
          className="tool-select"
          value={dialect}
          onChange={(event) => setDialect(event.target.value as SqlDialect)}
        >
          <option value="postgres">PostgreSQL</option>
          <option value="mssql">MSSQL</option>
        </select>
        <label htmlFor="sql-input">SQL input</label>
        <textarea
          id="sql-input"
          className="tool-input json-input"
          value={sqlInput}
          onChange={(event) => setSqlInput(event.target.value)}
          spellCheck={false}
        />
        <div className={issues.length === 0 ? "result ok" : "result bad"} role="status">
          <strong>{issues.length === 0 ? "No obvious syntax issues" : `${issues.length} issue(s) found`}</strong>
          {issues.map((issue) => (
            <p key={`${issue.line}-${issue.column}-${issue.message}`}>
              Line {issue.line}, column {issue.column}: {issue.message}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}
