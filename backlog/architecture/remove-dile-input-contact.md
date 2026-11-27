# Remove the deprecated dile-input-contact

## Context

`dile-input-contact` (`packages/ui/components/input/src/DileInputContact.js`, registered by `packages/ui/components/input/input-contact.js`) was deprecated on 2026-11-27. It is intentionally **not documented publicly**: it has no page in `docs/`, it is not exported from `packages/ui/components/input/index.js` and it is not listed in `demos/index.html`. It logs a one-time `console.warn` when the first instance is connected.

Why it was deprecated:

- Phone validation is hardcoded to Spanish numbers (`+34`, `0034`, `34` prefixes; fixed lines starting with 8/9, mobiles with 6/7) and rejects numbers typed with spaces.
- `dile-input-phone` (`@dile/utils`) covers phone numbers internationally and much better.
- It uses its own `messageError` property instead of the standard `message` used by `DileForm` and the other inputs.
- The `isMobile` / `isPhone` / `isFax` / `isMail` flags of the `dile-input-contact-blur` event are sticky and depend on the attributes, not on the value.

## What to do

In the next major version of `@dile/ui`:

1. Delete `packages/ui/components/input/src/DileInputContact.js`, `packages/ui/components/input/input-contact.js` and `packages/ui/components/input/input-contact.spec.js`.
2. Delete `demos/ui/dile-input-contact.html`.
3. Mention the removal in the release notes, pointing to `dile-input-phone` for phones and `dile-input type="email"` for emails.
4. Delete this backlog file.
