---
name: Suyash Singh Portfolio
description: Editorial software engineering portfolio inspired by the Straightforward Brand Guidelines reference.
colors:
  paper: "#ffffff"
  ink: "#101010"
  muted-ink: "#565656"
  divider: "#e5e5e5"
  blue-tint: "#b6c9cf"
  pale-blue: "#e8ebef"
  orange: "#ed6a24"
  orange-light: "#fa9819"
  navy: "#1e3d59"
typography:
  display:
    fontFamily: "Rethink Sans, sans-serif"
    fontSize: "clamp(5.2rem, 12.3vw, 12.4rem)"
    fontWeight: 520
    lineHeight: 1
    letterSpacing: "-0.065em"
  headline:
    fontFamily: "Rethink Sans, sans-serif"
    fontSize: "clamp(2.5rem, 4.3vw, 4.8rem)"
    fontWeight: 470
    lineHeight: 1
    letterSpacing: "-0.055em"
  body:
    fontFamily: "Rethink Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  code:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    lineHeight: 1.6
rounded:
  square: "0px"
  tag: "100px"
spacing:
  compact: "8px"
  control: "16px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "15px 19px"
  button-accent:
    backgroundColor: "{colors.orange-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "15px 19px"
---

# Design System: Suyash Singh Portfolio

## Overview

The portfolio uses the white editorial structure, crisp type, thin rules, and restrained orange and blue palette of the user-supplied Figma reference. The content stays focused on concrete software engineering work. Motion is slow and limited to the hero gradient, section entry, and responsive controls.

## Colors

White is the page ground. Black carries headings, controls, and primary text. Muted gray supports long copy. Orange marks section sequence and key outcomes. Pale blue groups the featured system and lab; navy anchors the contact section.

## Typography

Rethink Sans is used for both display and reading text. Large headings use tight tracking and regular to medium weight. JetBrains Mono appears only in the simulated execution log.

## Layout

The content width is 1320px with 40px desktop gutters and 18px mobile gutters. Sections use 120px vertical padding on desktop and 78px on mobile. Desktop content favors asymmetric two-column compositions; at 700px it stacks into one column.

## Elevation & Depth

The site is predominantly flat. Thin dividers and tonal backgrounds establish hierarchy; interactive items shift slightly on hover. The Figma-inspired hero gradient is the one prominent atmospheric surface.

## Shapes

Buttons, inputs, and major surfaces have square corners. Small technology tags are pills. The featured system diagram uses straight rules and rectangular cells.

## Components

- Primary actions use black fill and white text, with a navy hover state.
- The project category switcher uses a dark selected tab in a thin outlined group.
- Project and experience entries are open rows separated by rules, without enclosing cards.
- The lab uses a two-column bordered work surface, with the execution log set in monospace.
- All interactive controls have a visible keyboard focus outline.

## Do's and Don'ts

- Do keep work outcomes and technical context easy to scan.
- Do use orange sparingly for numbering and evidence.
- Do respect reduced-motion preferences.
- Don't add terminal styling outside actual code or simulation output.
- Don't add decorative cards where a rule and spacing can organize the content.
