# PayGenix Merchant Dashboard — Build Guide

How to build a Merchant Dashboard screen. Read [`../../foundations/BUILD_GUIDE.md`](../../foundations/BUILD_GUIDE.md) first.

## 1. Always

1. Import [`tokens.css`](tokens.css) after the Foundations tokens. Do not also import Portal 2.0's tokens: this file is complete on its own.
2. Read [`DESIGN.md`](DESIGN.md). It is short and lists everything that differs from Portal 2.0.
3. For color rules, text styles, accessibility and every generic component, follow Portal 2.0's docs: [`../portal2.0/BUILD_GUIDE.md`](../portal2.0/BUILD_GUIDE.md) §2 and the component docs it links to. The coded components are the same ones; badge corners and table row height change by themselves through the tokens.

## 2. What is specific to this project

- Chart colors: the `data-visualize-accent-*` tokens in [`DESIGN.md`](DESIGN.md) §2.
- `bg-brand` is for the logo and email template only. Buttons, links and focus use `accent-indigo`.
- Portal 2.0's app components (`nav-`, `home-`, `request-`, `create-form-`, `notification-`, `profile-`, `settings-`) and its patterns describe Portal's features. Do not reuse them here.

## 3. Gaps

This project has no pattern docs and no docs for its own components yet; see [`DESIGN.md`](DESIGN.md) §4. If a screen needs one of the parts listed there, say so instead of inventing it.
