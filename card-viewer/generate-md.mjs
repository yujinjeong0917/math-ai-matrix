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

// <p>/<strong>/<br>만 다루는 얕은 변환 (박스류 내부 텍스트에도 재사용)
function stripInline(s) {
  return (s || "")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<\/p>\s*<p[^>]*>/g, "\n\n")
    .replace(/<\/?p[^>]*>/g, "")
    .replace(/<strong>/g, "**").replace(/<\/strong>/g, "**")
    .replace(/<span class="hl">/g, "::").replace(/<\/span>/g, "::")
    .trim();
}

// concepts/index.html에서 쓰는 재사용 컴포넌트(HTML)를 card-viewer의
// ::: 마크다운 문법으로 변환한다. 순서 중요: 블록 컴포넌트를 먼저 뽑아내고,
// 남은 텍스트에 얕은 인라인 변환을 적용한다.
function stripHtml(s) {
  let text = s || "";

  text = text.replace(/<div class="note-box">(?:<p class="box-label">[^<]*<\/p>)?([\s\S]*?)<\/div>/g,
    (_, inner) => `\n\n:::note\n${stripInline(inner).trim()}\n:::\n\n`);

  text = text.replace(/<div class="warn-box">(?:<p class="box-label">[^<]*<\/p>)?([\s\S]*?)<\/div>/g,
    (_, inner) => `\n\n:::warn\n${stripInline(inner).trim()}\n:::\n\n`);

  text = text.replace(/<div class="def-box"><span class="def-term">정의(?:\s*·\s*([^<]*))?<\/span>([\s\S]*?)<\/div>/g,
    (_, title, inner) => `\n\n:::def${title ? " " + title.trim() : ""}\n${stripInline(inner).trim()}\n:::\n\n`);

  text = text.replace(/<ol class="steps">([\s\S]*?)<\/ol>/g, (_, inner) => {
    const items = [...inner.matchAll(/<li class="step-item">([\s\S]*?)<\/li>/g)]
      .map(m => stripInline(m[1]).trim());
    return `\n\n:::steps\n${items.join("\n")}\n:::\n\n`;
  });

  text = text.replace(/<table class="content-table">([\s\S]*?)<\/table>/g, (_, inner) => {
    const head = [...inner.matchAll(/<th>([\s\S]*?)<\/th>/g)].map(m => stripInline(m[1]).trim());
    const rows = [...inner.matchAll(/<tr>([\s\S]*?)<\/tr>/g)]
      .slice(1) // 첫 <tr>은 헤더
      .map(r => [...r[1].matchAll(/<td>([\s\S]*?)<\/td>/g)].map(m => stripInline(m[1]).trim()));
    const sep = head.map(() => "---");
    const line = arr => `| ${arr.join(" | ")} |`;
    return `\n\n${line(head)}\n${line(sep)}\n${rows.map(line).join("\n")}\n\n`;
  });

  return stripInline(text).replace(/\n{3,}/g, "\n\n").trim();
}

// 도입부(왜 궁금한가)와 명제(형식적 진술)를 분리한다.
// 웹 원본의 친절한 도입부를 카드에서도 그대로 살리기 위함 — 이전 버전은
// "명제." 이후만 남기고 도입부를 통째로 버려서 카드가 공식으로 바로
// 시작하는 문제가 있었다(pub-admin 평가에서 지적됨).
function splitExplanation(explanation) {
  const marker = "명제.</strong>";
  const idx = explanation.indexOf(marker);
  if (idx === -1) {
    return { lede: stripHtml(explanation), proposition: "" };
  }
  const lede = stripHtml(explanation.slice(0, idx).replace(/<br><br>\s*<strong>\s*$/, "")).trim();
  const proposition = stripHtml(explanation.slice(idx + marker.length)).trim();
  return { lede, proposition };
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
  const { lede, proposition } = splitExplanation(concept.explanation);
  const bq = firstBlankSection(concept);
  const question = bq ? bq.text : "(이 개념은 증명/빈칸 문항이 없는 개요 카드입니다.)";
  const answer = bq ? `정답: $${bq.answer}$` : "";
  const commentary = bq ? bq.why : (concept.intuition ? stripHtml(concept.intuition) : "");
  const example = stripHtml(concept.example || "");
  const related = (concept.related || []).slice(0, 4).map(function (r) { return r.label; }).join(" · ");
  const diagram = concept.diagram ? concept.diagram.trim() : "";
  const diagramCaption = concept.diagramCaption ? stripHtml(concept.diagramCaption) : "";

  return `---
slug: ${slug}
theme: ${theme}
domainLabel: ${domainLabel}
subLabel: ${concept.subLabel || ""}
title: ${concept.title}
related: ${related}
---

## 도입
${lede}

## 명제
${proposition}
${diagram ? "\n## 그림\n" + diagram + (diagramCaption ? "\n\n_" + diagramCaption + "_" : "") : ""}

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
const manifest = [];
for (const [slug, concept] of Object.entries(CONCEPTS)) {
  const md = toSlugMd(slug, concept);
  fs.writeFileSync(path.join(outDir, slug + ".md"), md, "utf-8");
  manifest.push({ slug, title: concept.title, domain: concept.domain });
  count++;
}
fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf-8");
console.log(`생성 완료: ${count}개 .md 파일 + manifest.json → ${outDir}`);
