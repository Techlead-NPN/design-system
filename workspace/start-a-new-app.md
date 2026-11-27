# Start a new app — for product owners and designers

How to go from an idea to a clickable prototype that developers can build from, without Figma.

## Which one to use

Claude offers two ways to start a design:

| | **Design in codebase** (recommended for app prototypes) | **Design** |
|---|---|---|
| What it is | Opens the Code tab (Claude Code) on this repo | A design canvas on claude.ai |
| Builds with | The design system's real components and tokens | Its own drawing of the look, from what you give it |
| Follows this repo's rules | Yes: it reads `CLAUDE.md` (asks what kind of project, Duo for new apps, starts from the starter, checks [`app-parts.md`](app-parts.md)) | Not guaranteed |
| Good for | A prototype developers will build from | Early ideas, concepts, a deck |

Use **Design in codebase** for anything developers will build: what you approve is made of the same parts they use. **Design** is fine for exploring before the app is worked out; expect small differences from the design system. The steps below are the same in both.

## The journey

1. **Describe the app in a few sentences.** What people do in it, the main pages, and who approves what. Example: *"Build Room booking: employees see free rooms and their bookings, book a room for a time slot, and the office admin approves bookings for the boardroom."* Plain language is fine; you don't need to name components.
2. **Answer one or two questions.** If your message doesn't say, Claude asks what kind of project it is:
   - **New internal app.** It uses the workspace's Duo look and starts from the Leave starter app. It then asks only what's missing, such as the app's name.
   - **Feature in an existing product** (E-Approval, PayGenix). It follows that product's own look and docs.
   - **Client project.** It asks whether to use the company look, the client's own theme, or neither.

   It won't ask you to choose between Classic and Duo: new apps are Duo, and Classic is E-Approval's. If it doesn't ask and the kind of project matters, say it in your first message ("a new internal app for the workspace").
3. **Claude builds the prototype** from the design system's shell, blocks and components, and tells you about anything it had to make up or couldn't find. Ask for changes in plain language, as many rounds as you like.
4. **Share and hand over.**
   - **In Design:** the prototype lives in your Claude Design project; share it from there.
   - **In Design in codebase (Claude Code):** the prototype goes in `components/trial/<app-name>/`, which isn't saved to git. Run `npm run storybook` in `components/` and open **Trial** in the sidebar to click through it. Share it the way your team shares prototypes today (for example a screen recording or a Vercel link), and keep a copy of the folder.
   - **Developers** start the real app in its own repo by copying the starter (see its [README](../components/starter/leave/README.md)) and use your prototype as the reference.
   - **Send the design system team** whatever Claude said was missing. Missing parts become the next design system work.

## Good to know

- **The look is decided for you.** Colours, type, sizes and the shell come from the Duo theme, so every new app matches. If something looks wrong, say so rather than asking for a custom colour; a change to the theme reaches every app.
- **Parts other apps already built** (an org chart canvas, a kanban board) are listed in [`app-parts.md`](app-parts.md). Claude checks that list and tells you if your app needs one; a second app needing a part is when it moves into the design system.
- **Each app is its own site** (for example `leave.techlead.com`) with single sign-on; the app switcher links between them ([`shell.md`](shell.md)).
- **Desktop only for now.** The mobile layout isn't designed yet.

## Changelog

- **2026-11-27:** named the two ways to start (Design in codebase, recommended for app prototypes; Design for early ideas).
- **2026-11-27:** first version, after the Room booking vibe test showed a brief alone is enough for an on-system prototype.
