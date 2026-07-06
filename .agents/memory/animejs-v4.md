---
name: Anime.js v4 migration
description: Breaking changes from animejs v3 to v4 — import style, parameter names, easing names, and utility functions.
---

## Import style
```ts
// v3 (WRONG in v4)
import anime from 'animejs';

// v4 (correct)
import { animate, stagger, utils } from 'animejs';
```

## API changes
| v3 | v4 |
|---|---|
| `anime({ targets, ...params })` | `animate(targets, { ...params })` |
| `easing: 'easeOutCubic'` | `ease: 'outCubic'` |
| `anime.stagger(100)` | `stagger(100)` |
| `anime.remove(el)` | `utils.remove(el)` |
| `update: fn` callback | `onUpdate: fn` callback |
| `direction: 'alternate'` | `alternate: true` |

## Easing names (v4)
Drop the `ease` prefix: `'easeOutCubic'` → `'outCubic'`, `'easeInOutSine'` → `'inOutSine'`, etc.
Parametric: `'outElastic(1, 0.7)'`, `'outBack(1.4)'`, `'outBack(overshoot = 1.7)'`

## Plain object tweening (counters)
In v4, animating plain JS objects (`{ v: 0 }`) may behave differently. Prefer `requestAnimationFrame` with manual easing for stat counters — more reliable and predictable.

## Vite cache
After changing from default to named import, Vite's pre-bundled cache for animejs must be cleared:
```bash
rm -rf artifacts/<app>/node_modules/.vite
# then restart the workflow
```

**Why:** animejs v4 dropped the default export entirely — it's now a proper ES module with named exports only. The Vite pre-bundler caches the old default-export shape until the `.vite` dir is deleted.

**How to apply:** Any project adding animejs for the first time should use v4 named imports from the start. If upgrading from v3, apply all changes above + clear Vite cache.
