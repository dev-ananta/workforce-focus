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
*   **Commit 6 -** Release MVP. (v1.0)
*   **Commit 7 —** Clarify Prioritity Matrix Module. (```priorityMatrix.js```)
*   **Commit 8 -** Add up to a week in calendar view. (```timeBlocking.js```)
*   **Commit 9 —** Finalize the application's JavaScript files. (```app.js, storage.js, analytics.js, exportPDF.js, meetingNotes.js, priorityMatrix.js, timeBlocking.js```)
*   **Commit 10 —** Release the newest version. (v1.1)
*   **Commit 11 —** Begin Debugging. --> Fix bugs, optimize code, & improve performance.
*   **Commit 12 —** Add up to two weeks in calendar view. (```timeBlocking.js```)
*   **Commit 13 —** Release the newest version. (v1.2)
*   **Commit 14 —** Add up to a month in calendar view. (```timeBlocking.js```)
*   **Commit 15 —** Release the newest version. (v1.3)
*   **Commit 16 —** Begin Platform Integration. (Prioritize compatibility with mobile devices.)
*   **Commit 17 —** Release the newest version. (v1.4)
*   **Commit 18 —** Continue Debugging. --> Fix bugs, optimize code, & improve performance. (Mobile Device Friendly Ensurance)
*   **Commit 19 —** Release the newest version. (v1.5)
*   **Commit 20 —** Begin MacOS Application Development. (XCode?)
*   **Commit 21 —** Progress Updates - MacOS Application (```README.md```)
*   **Commit 22 —** Release the newest version. (v1.6)
*   **Commit 23 —** Continue Debugging. --> Fix bugs, optimize code, & improve performance. (MacOS Application Ensurance)
*   **Commit 24 —** Release the newest version. (v1.7)
*   **Commit 25 —** Begin Windows Application Development. (Visual Studio Code?)
*   **Commit 26 —** Progress Updates - Windows Application (```README.md```)
*   **Commit 27 —** Release the newest version. (v1.8)
*   **Commit 28 —** Continue Debugging. --> Fix bugs, optimize code, & improve performance. (Windows Application Ensurance)
*   **Commit 29 —** Release the newest version. (v1.9)
*   **Commit 30 —** Begin Android Application Development. (Android Studio?)
*   **Commit 31 —** Progress Updates - Android Application (```README.md```)
*   **Commit 32 —** Release the newest version. (v1.10)
*   **Commit 33 —** Continue Debugging. --> Fix bugs, optimize code, & improve performance. (Android Application Ensurance)
*   **Commit 34 —** Release the newest version. (v1.11)
*   **Commit 35 —** Enable Digital Export Functionality. (Export --> Google Calendar/iCalendar)
*   **Commit 36 —** Release the newest version. (v2.1)
*   **Commit 37 —** Continue Debugging. --> Fix bugs, optimize code, & improve performance. (Digital Export Ensurance)
*   **Commit 38 —** Release the newest version. (v2.2)
*   **Commit 39 —** Begin user preference development. (```index.html, styles.css```)
*   **Commit 38 —** Release the newest version. (v2.3)
*   **Commit 39 —** Continue Debugging. --> Fix bugs, optimize code, & improve performance. (User Preference Ensurance)
*   **Commit 40 —** Release the newest version. (v2.4)

<details>
    <summary><b>Developer Notes (Ignore Please)</b></summary>
    ```timeBlocking.js``` - day --> week --> 2 weeks --> month
    ```meetingNotes.js``` - store meeting logs
    ```priorityMatrix.js``` - use more common vocabulary (get rid of eisenhower matrix terms)
    ```analytics.js``` - track user activity
    ```exportCal.js``` - add file --> export calendar events as calendar file (.ics)
    ```index.html & styles.css``` - implement user preferences/themes

    - Accessibility: add <label> tags for the meeting form fields, ensure type="button" on non-form buttons, and add :focus styles for keyboard users.
    - Fonts & metadata: import Inter (or remove it), add meta description and a favicon, and include `theme-color` meta tag.
    - Export/print: add @media print CSS and ensure Exporter produces sanitized/plain output for consistent prints.

    - Replace prompt() with an inline add-block UI for TimeBlocking.
    - Add keyboard support/ARIA for drag-and-drop in PriorityMatrix.
    - Add undo/confirm for destructive actions.
    - Consider a small convenience API on Storage (e.g., get(key, defaultValue)).

    - No obvious runtime errors from static review; code should run in modern browsers with ES module support.
    - Popup/print may be blocked in some browsers, but export is triggered by user click which usually avoids blockers.
    - localStorage failures are caught but currently only logged to console; consider surfacing issues to users.

    - Architecture: Good separation of concerns and small classes.
    - Notable points:
    - Storage.get returns null for missing keys; modules handle defaults, but a get(key, defaultValue) helper would simplify callers.
    - TimeBlocking uses prompt() which is quick but degrades UX and accessibility; consider an inline form/modal.
    - `PriorityMatrix` drag-and-drop works but lacks keyboard accessibility.
    - Exporter writes element.innerHTML to a new window for printing — acceptable now, but sanitize or normalize content if rich HTML is allowed later.
    - meetingNotes._escape is a good safety step for notes rendering.

    - index.html: Useful and mostly accessible, but not fully finalized.
    - Strengths: semantic elements, `lang` set, `role="main"`, sensible ARIA usage for views and live regions.
    - Missing polish: `meta` description, favicon, `theme-color`, and explicit `<label>` elements for form inputs. Add `type="button"` on nav buttons to avoid accidental submission and consider `aria-controls` linking nav buttons to views.

    - styles.css: Visually polished and responsive; near production-ready but not final.
    - Strengths: cohesive dark theme, responsive layout at 900px breakpoint, clean component styles.
    - Missing polish: `Inter` is declared but not loaded (import or remove). Add visible keyboard focus styles for interactive elements and an `@media print` section to improve export/printing.

    ----------------------------------------------------------------------------------------------------

    This is a clean, focused single-page client-side productivity app. The code is modular and easy to follow: `app.js` wires three small feature modules (`PriorityMatrix`, `TimeBlocking`, `MeetingNotes`) and util classes (`Storage`, `Analytics`, `Exporter`). Overall design favors simplicity and local-first behavior (localStorage) — a great fit for a lightweight tool.
</details>