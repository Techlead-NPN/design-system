# Duo rail task test

A moderated task test for the Duo rail shell (`WorkspaceShell layout="rail"`, package 0.12.0). The rail spec is in [`../shell.md`](../shell.md#rail-layout-duo).

Employees chose the Duo look from screenshots. That tells us what they like, not whether they can find things. This test measures task success before the rail goes to every app.

- **Participants:** 5 or 6 employees who don't work on the design system. Mix people who raise requests often with people who rarely do.
- **Length:** about 30 minutes each: 5 minutes intro, 18 minutes of tasks, 7 minutes of questions.
- **Roles:** one moderator who talks, and ideally one note taker who stays quiet.

## Goal

The test answers three questions:

1. Can people tell the 13 Org Chart Studio icons apart when the rail is collapsed?
2. Do they find request types inside the ProcureApp category flyouts?
3. Do they expand the rail, and do they keep it expanded?

## Setup

### What to open

All tasks run in one story, so the rail's expanded state carries across tasks the way it would in a real session. Open it on its own page, not inside the Storybook frame, so the Storybook sidebar doesn't get in the way:

- **Main:** Org Chart Studio, collapsed: https://techlead-npn.github.io/design-system/iframe.html?id=workspace-duo-rail-task-test--org-chart-collapsed&viewMode=story

Participants move to ProcureApp themselves with the grid button (task 3), so you don't open a second story. Don't reload the page between tasks: a reload resets the rail to collapsed and puts the person back on Org chart.

Backup, only if the page breaks mid-session (start again from the task you were on):

- ProcureApp, collapsed: https://techlead-npn.github.io/design-system/iframe.html?id=workspace-duo-rail-task-test--procure-app-collapsed&viewMode=story
- ProcureApp, expanded and Org Chart Studio, expanded: same Storybook, under Workspace → Duo rail (task test).

| Task | App | Rail at the start |
|---|---|---|
| 1, 2 | Org Chart Studio | Collapsed (page just loaded) |
| 3 | Org Chart Studio, moves to ProcureApp | Collapsed |
| 4, 5, 6 | ProcureApp | Collapsed |
| 7 | ProcureApp | Collapsed, unless they expanded it earlier |
| 8 | ProcureApp, moves to Org Chart Studio | Whatever they left it at |

### Equipment

- A laptop or desktop at 1440px wide or more, with a mouse. Browser full screen, zoom 100%.
- Screen and voice recording (Teams or Zoom recording, or QuickTime). Test the recording before each session.
- A printed note sheet per participant (see Note sheet), and a timer.
- Run one pilot session with a colleague first, to check the links, timings and wording.

### Before you start

Load the main link, then move the mouse off the rail so no label is showing.

Say, in your own words:

> Thanks for helping. We're testing a new menu design for our internal apps. We're testing the design, not you: if something is hard to find, that's a problem with the design, and it's exactly what we need to learn.
>
> I'll read you some short situations and ask you to find the place in the app where you'd deal with them. Please think aloud as you go: say what you're looking for, what you expect, and what surprises you.
>
> This is a prototype. The page content is the same placeholder table on every page; the page title at the top tells you where you are. Nothing you click will save or send anything.
>
> I can't help during the tasks, because I want to see how the design works on its own. Say "done" when you think you've found it, or "skip" if you'd give up in real life. Both are fine.

### Consent and recording

- Ask before you start recording: "May I record the screen and your voice? Only the design team will watch it, to check our notes." Record their answer at the start of the recording.
- Tell them they can stop at any time, and that taking part, and how they do, has nothing to do with their performance review.
- Name participants P1 to P6 in notes and files. Keep names only in a separate list that only the moderator holds.
- Store recordings in the team's private drive, and delete them once the results summary is done (within 30 days).

## Tasks

Read each scenario aloud, word for word. Never say the menu label. If they ask "do you mean X?", answer "where would you look?".

How to score every task:

- **Success:** they land on the right page (the page title matches) without help, within the time limit.
- **Struggle:** they get there, but with one or more wrong clicks, more than half the time limit, or hovering more than three icons to read labels before choosing.
- **Fail:** time runs out, they say "skip", they settle on the wrong page, or you have to help.

Also note whether their **first click** was right, and how many icons they **hovered** before clicking. Collapsed, a hover shows the label, so for icon recognition the first click and hover count matter more than final success.

### Task 1: job levels, job families, job profiles (Org Chart Studio, collapsed)

Three short prompts, one after another. After each, wait for "done", then read the next. Don't move them back to Org chart between prompts.

- **1a.** "A new hire asks what grades employees can have here, from junior up to senior. Find where you'd see that."
  - Target: **Job levels**.
- **1b.** "You want to see jobs grouped by line of work, for example all the finance jobs together, or all the IT jobs."
  - Target: **Job families**.
- **1c.** "You need the description of one particular job: its duties and the skills it needs."
  - Target: **Job profiles**.

Time limit: 45 seconds each.

Struggle: hovers all three Jobs icons before choosing; picks Employees or Positions and seats first; says the icons look alike. Before the sessions, check that Job families and Employees show different icons; this was fixed in the blocks batch A release.

### Task 2: change requests, upcoming, history (Org Chart Studio, collapsed)

- **2a.** "You drafted a change to the team structure last week, but it hasn't been approved yet. Find it."
  - Target: **Change requests** (count badge 2).
- **2b.** "A team move takes effect next month. Where would you check what's about to change?"
  - Target: **Upcoming changes**.
- **2c.** "Someone asks when the sales team was moved to a new unit last year. Where would you look?"
  - Target: **Change history**.

Time limit: 45 seconds each.

Struggle: tries Units, Org chart or Positions and seats first; goes back and forth between the three Changes icons.

### Task 3: switch apps

"Now you need to buy something for your team. Go to the app where you raise purchases and other requests."

- Target: open the grid button at the top of the rail and choose **ProcureApp**. Success when the ProcureApp home page shows.
- Time limit: 60 seconds.
- Struggle: clicks the Org Chart Studio app icon, the search button or the avatar first; reads all the rail icons looking for it.

### Task 4: petty cash (ProcureApp, flyout)

"You spent 350 baht of your own money on snacks for a team meeting. Find where you'd ask for that small amount back from the office cash box."

- Target: **Expense and payment** flyout, then **PET: Petty cash**.
- Time limit: 90 seconds.
- Struggle: opens another category flyout first (Purchasing or Employee); tries Create request or My requests first; picks Payment request or Advance request and then corrects.
- Fail also if they stop at Create request. Note it: it may mean people expect to start from the button, which is worth knowing.

### Task 5: purchase order (ProcureApp, flyout)

"The supplier's price for new laptops has been agreed. Find where you'd raise the document that confirms the buy with that supplier."

- Target: **Purchasing** flyout, then **PO: Purchase order**.
- Time limit: 90 seconds.
- Struggle: picks Purchase request or Request for quotation first; opens Expense and payment first.
- Note separately if they pick Purchase request and are sure it's right. That is a wording problem in the request types, not a rail problem.

### Task 6: count badge, "Waiting for me"

"Your manager says some requests are waiting for you to approve. How many are there? Open the list."

- Target: say **5** and open **Waiting for me**.
- Time limit: 60 seconds.
- Struggle: reads 5 from the "Waiting for you" card on the home page but doesn't open the list; opens My requests (3) first.
- Note whether they noticed the number on the rail icon, or found the number some other way.

### Task 7: a task where expanding helps

"Before a meeting, you need to tell your boss which request types have something in them right now, and how many each has."

- Target: **Petty cash 12, Purchase request 2, Purchase order 1**. Collapsed, they can only see these by opening each of the four flyouts. Expanded, they can open all four categories at once and see every count.
- Time limit: 3 minutes.
- Success: all three found and correct. Struggle: one wrong or missing, or more than half the time. Fail: two or more wrong or missing.
- Main thing to note: **did they find and use the expand button (bottom of the rail) on their own?** Note when, and what they said.
- The tab counts on the page (All 12, Waiting 5, Approved 7) are placeholder data. If they use them, note it and say "that table is a placeholder".
- If they didn't expand during the task, after scoring it say: "There's a button at the bottom of the menu. Try it." Then go on to task 8 with the rail expanded. Record "not discovered".

### Task 8: back to the first app, and do they keep it expanded

"Go back to the app you used first. Find where you'd set who is allowed to use that app and what they can do in it."

- Target: grid button, **Org Chart Studio**, then **Access and roles**.
- Time limit: 60 seconds.
- Struggle: picks Data sharing (API) or Employees first.
- Main thing to note: **did they collapse the rail again**, before, during or after the task? Note whether they said why.

## Note sheet

Print one sheet per participant. Result: S = success, St = struggle, F = fail.

**Participant:** P__ **Date:** ______ **Role and how often they raise requests:** ______________

| Task | Result (S / St / F) | Time | First click right? | Icons hovered | Notes |
|---|---|---|---|---|---|
| 1a Job levels | | | | | |
| 1b Job families | | | | | |
| 1c Job profiles | | | | | |
| 2a Change requests | | | | | |
| 2b Upcoming changes | | | | | |
| 2c Change history | | | | | |
| 3 Switch to ProcureApp | | | | | |
| 4 Petty cash | | | | | |
| 5 Purchase order | | | | | |
| 6 Waiting for me | | | | | |
| 7 Counts across types | | | | | Expanded on their own? Yes / No. When: |
| 8 Access and roles | | | | | Collapsed again? Yes / No. When: |

After all sessions, copy the results into one grid:

| Task | P1 | P2 | P3 | P4 | P5 | P6 | Success rate |
|---|---|---|---|---|---|---|---|
| 1a | | | | | | | /6 |
| 1b | | | | | | | /6 |
| 1c | | | | | | | /6 |
| 2a | | | | | | | /6 |
| 2b | | | | | | | /6 |
| 2c | | | | | | | /6 |
| 3 | | | | | | | /6 |
| 4 | | | | | | | /6 |
| 5 | | | | | | | /6 |
| 6 | | | | | | | /6 |
| 7 | | | | | | | /6 |
| 8 | | | | | | | /6 |
| Expanded on their own (task 7) | | | | | | | /6 |
| Kept it expanded (task 8) | | | | | | | /6 |

## Questions after the test

Ask after the last task, with the rail in whatever state they left it.

1. Which tasks felt hardest, and why?
2. When the menu showed icons only, how did you decide which icon to click?
3. Here are both versions (click the expand button to show each). If this were your app every day, which would you keep: icons only, or with labels? Why?
4. Did you notice the numbers on the icons? What did you think they meant?
5. When you opened a group such as Expense and payment, was the list that appeared what you expected?
6. Is there anything you'd change about the menu?

## Results summary template

Fill in after all sessions. Keep it to two pages.

**Sessions:** _ participants, dates ______. **Moderator:** ______.

### Answers to the three questions

| Question | Answer | Evidence |
|---|---|---|
| Can people tell the 13 Org Chart Studio icons apart collapsed? | Yes / Partly / No | Tasks 1 and 2: success rate, first-click rate, average icons hovered |
| Do they find request types inside the flyouts? | Yes / Partly / No | Tasks 4 and 5: success rate, wrong categories opened |
| Do they expand the rail, and keep it expanded? | Yes / Partly / No | Task 7: _/6 expanded on their own. Task 8: _/6 kept it. Question 3: _/6 prefer labels |

### Per-task results

| Task | Success | Struggle | Fail | Median time | First click right |
|---|---|---|---|---|---|
| 1a Job levels | | | | | |
| ... | | | | | |
| 8 Access and roles | | | | | |

### Top issues, ranked by severity

Severity: **1 critical**, stops people finishing the task; **2 serious**, slows most people or causes wrong choices they correct; **3 minor**, small delay or comment, people recover quickly.

| # | Issue | Severity | Tasks | How many participants | Quote or clip |
|---|---|---|---|---|---|
| 1 | | | | /6 | |
| 2 | | | | /6 | |
| 3 | | | | /6 | |

### Recommendations

For each issue: what to change, in which doc or component (for example `workspace/shell.md`, `RailNav`), and whether it needs another test round.

| Issue # | Recommendation | Where | Retest? |
|---|---|---|---|
| | | | |

**Decision for the default rail state:** collapsed / expanded / remember the person's choice, and why.

## Thai task wording

Read the English as the main text. Use the Thai with participants who prefer it; the menu labels in the app stay in English.

**Intro (short):** ขอบคุณที่มาช่วยนะคะ/ครับ วันนี้เราทดสอบเมนูแบบใหม่ของแอปภายในบริษัท เราทดสอบตัวดีไซน์ ไม่ได้ทดสอบคุณ ถ้าหาอะไรไม่เจอ แปลว่าดีไซน์มีปัญหา ซึ่งเป็นสิ่งที่เราอยากรู้ ระหว่างทำ ช่วยพูดสิ่งที่คิดออกมาดัง ๆ ด้วย เนื้อหาในหน้าเป็นตารางตัวอย่างที่เหมือนกันทุกหน้า ดูชื่อหน้าด้านบนเพื่อรู้ว่าอยู่หน้าไหน ทำเสร็จแล้วบอกว่า "เสร็จ" หรือถ้าในชีวิตจริงจะเลิกหา บอกว่า "ข้าม" ได้เลย

| Task | Thai |
|---|---|
| 1a | พนักงานใหม่ถามว่าที่นี่พนักงานมีระดับอะไรบ้าง ตั้งแต่ระดับเริ่มต้นจนถึงระดับอาวุโส คุณจะดูได้ที่ไหน |
| 1b | คุณอยากดูงานที่จัดกลุ่มตามสายงาน เช่น งานด้านการเงินทั้งหมด หรืองานด้านไอทีทั้งหมด |
| 1c | คุณต้องการรายละเอียดของงานหนึ่งตำแหน่ง ว่ามีหน้าที่อะไรและต้องใช้ทักษะอะไร |
| 2a | สัปดาห์ที่แล้วคุณร่างการเปลี่ยนโครงสร้างทีมไว้ แต่ยังไม่ได้รับอนุมัติ ลองหาเรื่องนั้นดู |
| 2b | จะมีการย้ายทีมที่มีผลเดือนหน้า คุณจะดูได้ที่ไหนว่ามีอะไรกำลังจะเปลี่ยน |
| 2c | มีคนถามว่าทีมขายถูกย้ายไปอยู่หน่วยงานใหม่เมื่อไหร่ในปีที่แล้ว คุณจะไปดูที่ไหน |
| 3 | ตอนนี้คุณต้องซื้อของให้ทีม ไปที่แอปที่ใช้ทำเรื่องขอซื้อและคำขออื่น ๆ |
| 4 | คุณจ่ายค่าขนมสำหรับประชุมทีมไป 350 บาทด้วยเงินตัวเอง หาที่ที่คุณจะขอเงินจำนวนเล็กน้อยนี้คืนจากเงินสดที่สำนักงานเก็บไว้ |
| 5 | ตกลงราคาแล็ปท็อปใหม่กับผู้ขายเรียบร้อยแล้ว หาที่ที่คุณจะออกเอกสารยืนยันกับผู้ขายรายนั้นว่าเราจะซื้อ |
| 6 | หัวหน้าบอกว่ามีคำขอรอให้คุณอนุมัติอยู่ มีกี่รายการ แล้วเปิดรายการนั้นดู |
| 7 | ก่อนเข้าประชุม คุณต้องบอกหัวหน้าว่าตอนนี้คำขอประเภทไหนบ้างที่มีรายการอยู่ และแต่ละประเภทมีกี่รายการ |
| 7, hint after scoring | ที่ด้านล่างของเมนูมีปุ่มอยู่ ลองกดดูนะคะ/ครับ |
| 8 | กลับไปที่แอปที่คุณใช้ตอนแรก แล้วหาที่ที่ใช้กำหนดว่าใครใช้แอปนั้นได้บ้าง และทำอะไรในแอปได้บ้าง |
