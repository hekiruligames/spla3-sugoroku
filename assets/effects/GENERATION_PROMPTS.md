# 生成プロンプト記録

素材はCodex内蔵のImageGenを使用し、透明背景のPNGとして生成しました。共通条件は次のとおりです。

```text
Use case: stylized-concept
Asset type: production game VFX sprite strip, tintable alpha-mask source
Composition/framing: exactly three equal square cells in one horizontal 3:1 strip; generous transparent padding; nothing crosses cell boundaries
Color palette: white alpha-mask shapes with subtle light-gray internal highlights only, suitable for runtime tinting
Constraints: genuine transparent background; no character, tile, road, weapon, text, labels, numbers, border, UI, colored glow, watermark; rounded silhouette readable at small size
Avoid: branded or game-specific motifs, black background, checkerboard background
```

各素材へ追加した主要求は次のとおりです。

```text
SHOT: compact round jelly pellet -> elongated fast droplet with two satellite droplets -> small rounded pop impact with three beads.

BEAM: compressed charge bead -> short narrow rounded beam segment with a bulb-shaped leading cap -> stretched leading cap with two spark droplets. The long beam body is drawn separately at runtime.

WAVE: narrow soft fan-shaped jelly wave -> broad rounded fan with three lobes and a thick leading edge -> fan breaking into four rounded droplets.

BOMB: compressed round jelly orb -> airborne orb with two trailing beads -> compact circular ground burst with a donut ring and six rounded droplets.

BURST: swollen pressure blob -> thick wide jelly ribbon with a blunt rounded front -> ribbon breaking into chunky rounded lobes and droplets.

RICOCHET: fast rounded nose approaching an invisible wall -> broad flat squash with short droplets -> fresh rounded nose redirected downward. Do not draw the wall.

MOVE TAIL: short rounded taper trailing left -> medium jelly streak with two droplets -> long elastic taper with three speed beads. Character body is layered separately.

LANDING SPLASH: tiny contact/compression splash -> maximum wide radial jelly splash with six rounded droplets -> small settled puddle ring.
```
