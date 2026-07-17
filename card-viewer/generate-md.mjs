// concepts/data.js의 모든 개념을 카드 템플릿용 마크다운(.md)으로 변환한다.
// 실행: node card-viewer/generate-md.mjs  (repo root에서)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

global.window = {};
await import(path.join(repoRoot, "concepts/data.js"));
const CONCEPTS = global.window.CONCEPTS;

const DOMAIN_LABEL = {
  linalg: "선형대수", calc: "미적분 · 최적화", prob: "확률 · 통계",
  info: "정보이론", disc: "이산수학 · 그래프", numeric: "수치해석 · 기하",
  xai: "XAI · 해석가능성", llm: "LLM/Agent", product: "서비스 · 프로덕트 분석",
  mlops: "MLOps · 인프라", recsys: "추천시스템 · 랭킹", arch: "모델 아키텍처 심화",
  pm: "Process Mining", stat: "추론통계", causal: "인과추론",
  disc2: "이산수학 심화", num2: "수치해석 심화", linalg2: "선형대수 심화",
  calc2: "미적분 심화", info2: "정보이론 심화", found: "예비수학", axis: "매트릭스 읽는 법",
};

function stripHtml(s) {
  return (s || "")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<\/p>\s*<p>/g, "\n\n")
    .replace(/<\/?p>/g, "")
    .replace(/<strong>/g, "**").replace(/<\/strong>/g, "**")
    .trim();
}

function firstSentence(s) {
  const clean = stripHtml(s).replace(/\*\*/g, "");
  const m = clean.match(/^(.{10,140}?[.?!])(\s|$)/);
  return (m ? m[1] : clean.slice(0, 90)).trim();
}

function proposition(explanation) {
  const idx = explanation.indexOf("명제.</strong>");
  if (idx === -1) return stripHtml(explanation);
  return stripHtml(explanation.slice(idx + "명제.</strong>".length)).trim();
}

function firstBlankSection(concept) {
  const sections = concept.sections || [];
  for (const s of sections) {
    if (s.blanks && s.blanks.length) {
      const blank = s.blanks[0];
      const text = s.text.replace(
        new RegExp(`\\[\\[blank:${blank.id}\\]\\]`, "g"),
        "==빈칸=="
      );
      return { text: stripHtml(text), why: stripHtml(blank.why), answer: blank.latex };
    }
  }
  return null;
}

function toSlugMd(slug, concept) {
  const theme = concept.domain.toUpperCase();
  const domainLabel = DOMAIN_LABEL[concept.domain] || concept.domain;
  const hook = firstSentence(concept.explanation);
  const basic = proposition(concept.explanation);
  const bq = firstBlankSection(concept);
  const question = bq ? bq.text : "(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)";
  const answer = bq ? `정답: $${bq.answer}$` : "";
  const commentary = bq ? bq.why : (concept.intuition ? stripHtml(concept.intuition) : "");
  const example = stripHtml(concept.example || "");

  return `---
slug: ${slug}
theme: ${theme}
domainLabel: ${domainLabel}
subLabel: ${concept.subLabel || ""}
title: ${concept.title}
hook: ${hook}
---

## 기본설명
${basic}

## 문제
${question}

## 해설
${commentary}
${answer ? "\n**" + answer + "**" : ""}

## 예시
${example}
`;
}

const outDir = path.join(__dirname, "concepts");
fs.mkdirSync(outDir, { recursive: true });

let count = 0;
for (const [slug, concept] of Object.entries(CONCEPTS)) {
  const md = toSlugMd(slug, concept);
  fs.writeFileSync(path.join(outDir, slug + ".md"), md, "utf-8");
  count++;
}
console.log(`생성 완료: ${count}개 .md 파일 → ${outDir}`);
