# Development Guidelines

## Page Understanding

- Before designing or editing any section, thoroughly understand `live/index.html` first.
- Review the shared styles in `live/assets/css/common.css` and the page-specific styles in `live/assets/css/style.css` before adding new rules.
- Treat the page as a single landing flow, not a collection of unrelated blocks.
- I have also created classes for padding and margins within the common CSS, Ma'am; please make sure to understand those thoroughly as well.

## Reusable Classes

- Common CSS classes already exist for:
  - Font sizes
  - Colors
  - Background gradients
  - Font weights
  - Other reusable styling properties
- Use these existing classes instead of creating new ones wherever possible.
- Always use the prefix `fe_` for any new classes, variables, or custom naming conventions.
- Prefer the existing typography utility stack already used on the page, such as `xxl`, `xl`, `lg`, `md`, `sm`, `xs`, `ys`, and `zs` classes.
- Keep typography responsive by updating the shared utility definitions in `common.css` rather than adding inline sizes.

## Styling Rules

- Avoid using inline CSS.
- Write custom CSS in the appropriate stylesheet instead.
- Follow the existing project structure when adding or updating styles.
- Reuse the current color and gradient helpers instead of introducing duplicate visual tokens.
- Keep custom section styling scoped to `fe_`-prefixed classes.

## CSS Structure Guidelines

- Wrap every CSS section with clear start and end comments.
- Write CSS sections sequentially, with one section placed directly after another.
- Use a structure like this:

```css
/* new-search section START */

/* Section CSS here */

.new-search {
    /* styles */
}

/* new-search section END */
```

## Responsive Styling

- Do not create separate media query blocks for every section.

- If a suitable media query already exists, add section-specific responsive styles inside that existing block.
- Create a new media query only if the project does not already have a suitable one.
- Match the existing breakpoint system in `common.css` before introducing any new responsive rule.
- Prefer small responsive refinements over section-specific breakpoint sprawl.
- All media query CSS must be placed at the very end of the stylesheet.
- No normal CSS should be written after the media query section starts.

## CSS Cleanup Rules

- Check for duplicate or repeated CSS definitions.
- Merge duplicate selectors and properties into a single definition whenever possible.
- Avoid defining the same styles multiple times.
- Keep the stylesheet clean, organized, and optimized.

## Page Flow

- Keep the landing page flow logical and progressive.
- Recommended order of the content:
  - Hero/banner
  - Marquee or quick credibility strip
  - AI engine/social proof section
  - Statistics or problem framing
  - Results/testimonials
  - Feature or plugin proof sections
  - New-search explanation
  - Final objection handling or call-to-action section
- Each section should naturally lead into the next one.
- Maintain the dark background, orange gradient, and high-contrast text language already established on the page.
- When a section is hidden with `d-none`, treat it as part of the same narrative system and preserve its styling consistency if it is later enabled.
