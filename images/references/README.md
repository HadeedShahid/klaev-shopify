# KLAEV image reference library

This folder stores reusable visual references for KLAEV product imagery. Keep only assets that future campaigns still need.

## Folder structure

```text
images/
├── references/
│   ├── models/
│   │   └── primary/                         Canonical model identity
│   └── products/                            Add active product references here when needed
└── generated/
    └── <campaign>/                          Temporary review renders and revisions
```

Use `models/primary/klaev-primary-model-front.png` as the approved canonical model and styling reference. Add original product photos under a descriptive folder in `products/` while that campaign is active. Generated images normally belong in `images/generated/`; retain an image in `references/` only when the user explicitly approves it as a reusable canonical reference.

## Recommended source images

The current canonical model reference provides the full-body front view. When expanding the reference set, add a clear front portrait, three-quarter portrait, full-body side view, and full-body three-quarter view. Use consistent, neutral lighting where possible.

For the jacket, include front, back, left side, right side, open-front, lining, collar, zipper, pocket, cuff, seam, and leather-texture photos. More angles reduce invented details and improve consistency.

## File naming

Use descriptive, stable filenames:

```text
model-primary-portrait-front-01.jpg
model-primary-fullbody-three-quarter-01.jpg
jacket-black-front-01.jpg
jacket-black-back-01.jpg
jacket-black-zipper-detail-01.jpg
```

Generated review images use a version suffix:

```text
crop-jacket-black-model-front-v01.webp
crop-jacket-black-model-front-v02.webp
```

Never overwrite a source or an earlier generated version.

## Generation workflow

1. Inspect all relevant model and garment references before writing the prompt.
2. Label each input explicitly as the identity reference, garment reference, edit target, or composition reference.
3. Use an identity-preserving or compositing edit workflow.
4. Lock the model's face, skin tone, hair, body proportions, and age appearance.
5. Lock the garment's true black color, leather texture, silhouette, crop length, fit, panel layout, seams, collar, zipper, pockets, cuffs, lining, and metal hardware.
6. Generate one representative front or three-quarter test image.
7. Compare the result with the source references at close range. Correct identity or garment drift before generating more poses.
8. Save iterations under `images/generated/cropped-leather-jacket-black/`.
9. After approval, export web-ready derivatives and copy only the selected storefront assets into `assets/`.

## Prompt baseline

Use this as the invariant portion of every prompt and add the requested pose, crop, background, and lighting:

```text
Use case: identity-preserve and compositing
Asset type: KLAEV cropped leather jacket product photography
Input images: canonical model images are identity references; original jacket images are garment construction and material references
Primary request: place the exact referenced black cropped leather jacket on the referenced model
Constraints: preserve the model's identity, face, skin tone, hair, body proportions, and natural anatomy; preserve the jacket's true black color, leather grain, silhouette, crop length, fit, collar, panel seams, stitching, zipper, pockets, cuffs, lining, hardware, and proportions; keep all visible construction details faithful to the references
Avoid: redesigning the jacket; changing its color or length; adding or removing pockets, seams, logos, hardware, distressing, or decorative details; changing the model's identity; plastic skin; distorted hands; text; watermark
```

## Storefront handling

Files in `images/references/` and `images/generated/` are working material and are not referenced by the theme. Approved storefront images must be copied to `assets/` or uploaded to Shopify Files before Liquid templates can use them.
