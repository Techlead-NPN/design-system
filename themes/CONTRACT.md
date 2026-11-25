# Theme contract

A theme is one CSS file that gives the components their look. The components never use a raw colour; they use names such as `bg-primary`, `text-secondary` or `rounded-badge`. Any theme that defines those names restyles every component.

| Theme | Used by |
|---|---|
| [`workspace.css`](workspace.css) | Every internal app in the employee workspace (E-Approval and the apps that follow). The reference theme. |
| [`paygenix.css`](paygenix.css) | PayGenix Merchant Dashboard. An independent copy: a change in `workspace.css` does not reach it. |

Internal apps do not get a theme of their own. A new theme is only for a product with a different brand, or for a client.

## The rule

**A theme defines every name that `workspace.css` defines.** That means:

1. Every CSS variable: the semantic colours in `:root` (`--text-primary`, `--bg-accent-indigo`, …), the component tokens (`--badge-radius`, `--table-row-height`), and the variables in its `@theme` blocks that turn them into Tailwind classes.
2. Every `@utility`: the 30 text styles (`text-body-small-medium`, …) and the loading shimmers (`bg-loading-light`, …).

A theme may change any value and may add names of its own (PayGenix adds a brand ramp and chart colours). It may not leave a name out or rename one: a component that uses a missing name renders with no colour or the wrong size, and nothing warns you.

A theme changes the look (colours, type, radii, shadows, sizes set through tokens), not the structure. A component that should behave differently needs component work, not a theme.

## Making a new theme

1. Copy `workspace.css` and rename it, e.g. `themes/<brand>.css`.
2. Change the values. Keep every name.
3. Run the check (below) until it passes.
4. In the app's stylesheet, import it instead of `workspace.css`, after `foundations.css`.

A client's theme stays in the client's private repo, never in this repo, which is public.

## The check

The check compares a theme's names with `workspace.css` and lists anything missing. It exits with code 1 if a name is missing.

In this repo (checks every theme in `themes/`; it also runs before every package publish):

```bash
cd components && npm run check-themes
```

In an app that installs `@techlead-npn/design-system` (0.8.0 or later), for example a client project:

```bash
npx ds-check-theme src/styles/client-theme.css
```

When a new name is added to `workspace.css`, every other theme must add it too, or the check fails on the next publish.
