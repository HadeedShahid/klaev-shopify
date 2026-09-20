# KLAEV theme instructions

This repository contains the KLAEV Shopify theme, based on Shopify Horizon.

## AI product imagery

Before generating or editing product imagery, read `images/references/README.md` and inspect every relevant source image in `images/references/`.

- Treat files under `images/references/` as immutable source material. Never overwrite or edit them.
- Use `images/references/models/primary/klaev-primary-model-front.png` as the approved canonical model identity and styling reference unless the user names a different model.
- Preserve the model's face, skin tone, hair, body proportions, and other identifying features across the image set.
- Preserve the product's actual color, silhouette, crop length, construction, seams, collar, closures, pockets, cuffs, hardware, leather grain, and proportions.
- Do not invent branding, stitching, hardware, pockets, panels, distressing, or other garment details that are absent from the product references.
- Generate one representative test image first. Compare it against the source images and correct product or identity drift before producing the remaining set.
- Make one targeted correction per iteration and repeat all identity and garment invariants in each edit prompt.
- Save review outputs non-destructively under `images/generated/`. Do not replace an earlier version.
- Only copy an approved final image into `assets/` when it is ready to be used by the Shopify theme.
