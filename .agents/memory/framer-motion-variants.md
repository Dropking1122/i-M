---
name: Framer Motion TypeScript variants
description: TypeScript error when using type:"spring" in framer-motion Variants objects — fix with as const.
---

When writing framer-motion `Variants` objects with a `transition` inside a variant key, TypeScript infers `type` as `string` rather than the literal union `AnimationGeneratorType`. This causes TS2322.

**Rule:** Always suffix the `type` value with `as const` in variant transition objects.

```ts
// Bad — TS2322
const variants = {
  visible: { opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

// Good
const variants = {
  visible: { opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
};
```

**Why:** Framer Motion's `Transition` type accepts a specific union for `type`, not a plain `string`. TypeScript narrows string literals only when `as const` is present or the object is typed explicitly as `Variants`.

**How to apply:** Any time a variant contains a `transition: { type: "..." }` inline — add `as const` to the type string.
