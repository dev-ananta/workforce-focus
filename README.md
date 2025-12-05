# **Simple Productivity App (Tailored for the Workforce/Adults)**

**Purpose:** Meeting Planner \+ Task Prioritizer \+ Time Blocking 

**Stack:**

![](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/CSS-663399?logo=css&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=white&style=for-the-badge)

**Hosting:** GitHub Pages

```
work-productivity/  
│── index.html  
│── app.js  
│── styles.css  
│── /modules  
│     ├── timeBlocking.js → 24h Calender UI For Scheduling Blocks
│     ├── meetingNotes.js → Store Meeting Logs
│     └── priorityMatrix.js → Eisenhower matrix (Urgent/Not Urgent, Important/Not Important)
│── /assets  
│     └── icons/  
│── /utils  
│     ├── storage.js  
│     ├── exportPDF.js → Export Tasks/Notes As PDF (Browser)
│     └── analytics.js
```
Timeline

*   **Commit 1 —** Establishement of project structure.
*   **Commit 2 —** Begin development of the user interface using HTML & CSS. (```index.html```, ```styles.css```)
*   **Commit 3 —** Begin development of modules in JavaScript. (```meetingNotes.js```, ```priorityMatrix.js```, ```timeBlocking.js```)
*   **Commit 4 —** Begin development of utilities in JavaScript. (```analytics.js```,```exportPDF.js```,```storage.js```)
*   **Commit 5 —** Begin development of the application logic using JavaScript. (```app.js```)
*   **Commit 6 —** Finalize the user interface using HTML & CSS. (```index.html```, ```styles.css```)
*   **Commit 7 -** Finalize the application modules and utilities. (```meetingNotes.js```, ```priorityMatrix.js```, ```timeBlocking.js```,```analytics.js```,```exportPDF.js```,```storage.js```)
*   **Commit 8 —** Finalize the application logic using JavaScript. (```app.js```)
*   **Commit 9 —** Update the README file with all necessary information. (Instructions, Legal, TechStack, etc...)
*   **Commit 10 —** Begin Debugging. --> Fix bugs, optimize code, & improve performance.

<details>
    <summary><b>Click to expand!</b></summary>
    Summary

    This is a clean, focused single-page client-side productivity app. The code is modular and easy to follow: `app.js` wires three small feature modules (`PriorityMatrix`, `TimeBlocking`, `MeetingNotes`) and util classes (`Storage`, `Analytics`, `Exporter`). Overall design favors simplicity and local-first behavior (localStorage) — a great fit for a lightweight tool.

    Index & Styles

    - index.html: Useful and mostly accessible, but not fully finalized.
    - Strengths: semantic elements, `lang` set, `role="main"`, sensible ARIA usage for views and live regions.
    - Missing polish: `meta` description, favicon, `theme-color`, and explicit `<label>` elements for form inputs. Add `type="button"` on nav buttons to avoid accidental submission and consider `aria-controls` linking nav buttons to views.

    - styles.css: Visually polished and responsive; near production-ready but not final.
    - Strengths: cohesive dark theme, responsive layout at 900px breakpoint, clean component styles.
    - Missing polish: `Inter` is declared but not loaded (import or remove). Add visible keyboard focus styles for interactive elements and an `@media print` section to improve export/printing.

    JavaScript Modules & Utilities

    - Architecture: Good separation of concerns and small classes.
    - Notable points:
    - Storage.get returns null for missing keys; modules handle defaults, but a get(key, defaultValue) helper would simplify callers.
    - TimeBlocking uses prompt() which is quick but degrades UX and accessibility; consider an inline form/modal.
    - `PriorityMatrix` drag-and-drop works but lacks keyboard accessibility.
    - Exporter writes element.innerHTML to a new window for printing — acceptable now, but sanitize or normalize content if rich HTML is allowed later.
    - meetingNotes._escape is a good safety step for notes rendering.

    High-priority recommendations (to finalize)

    - Accessibility: add <label> tags for the meeting form fields, ensure type="button" on non-form buttons, and add :focus styles for keyboard users.
    - Fonts & metadata: import Inter (or remove it), add meta description and a favicon, and include `theme-color` meta tag.
    - Export/print: add @media print CSS and ensure Exporter produces sanitized/plain output for consistent prints.

    Medium / Nice-to-have

    - Replace prompt() with an inline add-block UI for TimeBlocking.
    - Add keyboard support/ARIA for drag-and-drop in PriorityMatrix.
    - Add undo/confirm for destructive actions.
    - Consider a small convenience API on Storage (e.g., get(key, defaultValue)).

    Risk/bugs

    - No obvious runtime errors from static review; code should run in modern browsers with ES module support.
    - Popup/print may be blocked in some browsers, but export is triggered by user click which usually avoids blockers.
    - localStorage failures are caught but currently only logged to console; consider surfacing issues to users.
</details>