<script context="module">
  import "aframe"
  import { onMount } from 'svelte'
</script>

<script>
  export let Hue = 0

  let color
$:color = HSLtoRGB(Hue/360 % 1,0.5,0.5)

  onMount(() => {
    console.log('"AFrameEntity" has been mounted')

    setInterval(() => Hue++, 100)

    return () => console.log('"AFrameEntity" has been unmounted')
  })

/**** HSLtoRGB - converts HSL to RGB values ****/

  function HueToRGB (p, q, t) {
    if (t < 0) { t += 1 }
    if (t > 1) { t -= 1 }

    if (t < 1/6) { return p + (q - p) * 6 * t }
    if (t < 1/2) { return q }
    if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6 }
    return p
  }

  function HSLtoRGB (H,S,L) {
    let R,G,B
    if (S === 0) {
      R = G = B = L
    } else {
      let q = L < 0.5 ? L * (1 + S) : L + S - L * S
      let p = 2 * L - q

      R = HueToRGB(p, q, H + 1/3)
      G = HueToRGB(p, q, H)
      B = HueToRGB(p, q, H - 1/3)
    }

    R = Math.round(R * 255)
    G = Math.round(G * 255)
    B = Math.round(B * 255)

    return '#' + (
      (R < 16 ? '0' : '') + R.toString(16) +
      (G < 16 ? '0' : '') + G.toString(16) +
      (B < 16 ? '0' : '') + B.toString(16)
    )
  }
</script>

<a-entity geometry="primitive:box" material="color:{color}"
  {...$$restProps} />
