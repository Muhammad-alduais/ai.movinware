export interface SplitTextResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
}

export function splitText(
  element: HTMLElement,
  types: "chars" | "words" | "lines" | "chars,words" | "chars,lines" | "words,lines" | "chars,words,lines" = "chars,words,lines"
): SplitTextResult {
  const originalHTML = element.innerHTML;
  const text = element.textContent || "";
  const hasArabic = /[\u0600-\u06FF]/.test(text);
  const types_ = hasArabic ? types.replace("chars", "").trim() : types;
  const includeChars =
    !hasArabic && (types_.includes("chars") || types_.length === 0);
  const includeWords = types_.includes("words") || types_.length === 0;
  const includeLines = types_.includes("lines");

  const words: HTMLElement[] = [];
  const chars: HTMLElement[] = [];
  const lines: HTMLElement[] = [];

  const wordsSplit = text.split(/\s+/).filter(Boolean);

  let html = "";
  wordsSplit.forEach((word, wi) => {
    html += `<span class="split-word" style="display:inline-block;white-space:nowrap;">`;
    if (includeChars) {
      [...word].forEach((char) => {
        html += `<span class="split-char" style="display:inline-block;">${char}</span>`;
      });
    } else {
      html += word;
    }
    html += `</span>`;
    if (wi < wordsSplit.length - 1) html += " ";
  });

  element.innerHTML = html;

  const wordEls = element.querySelectorAll<HTMLElement>(".split-word");
  const charEls = element.querySelectorAll<HTMLElement>(".split-char");

  wordEls.forEach((w) => words.push(w));
  charEls.forEach((c) => chars.push(c));

  if (includeLines) {
    const wordRects = wordEls.map((w) => w.getBoundingClientRect());
    let currentTop = wordRects[0]?.top ?? 0;
    let lineGroup: HTMLElement[] = [];

    wordEls.forEach((w, i) => {
      const rect = wordRects[i];
      if (Math.abs(rect.top - currentTop) > 5) {
        if (lineGroup.length > 0) {
          lines.push(createLineWrapper(lineGroup));
        }
        lineGroup = [w];
        currentTop = rect.top;
      } else {
        lineGroup.push(w);
      }
    });
    if (lineGroup.length > 0) {
      lines.push(createLineWrapper(lineGroup));
    }

    const wrapper = document.createElement("div");
    wrapper.style.display = "contents";
    wordEls.forEach((w) => wrapper.appendChild(w));
    element.innerHTML = "";
    element.appendChild(wrapper);
  }

  function createLineWrapper(wordEls: HTMLElement[]): HTMLElement {
    const wrapper = document.createElement("span");
    wrapper.className = "split-line";
    wrapper.style.display = "inline-block";
    wrapper.style.whiteSpace = "nowrap";
    wordEls.forEach((w) => {
      wrapper.appendChild(w);
      wrapper.appendChild(document.createTextNode(" "));
    });
    return wrapper;
  }

  function revert() {
    element.innerHTML = originalHTML;
  }

  return { chars, words, lines, revert };
}
