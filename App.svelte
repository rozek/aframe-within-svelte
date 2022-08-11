<script context="module">
  import "aframe"

  import "./aframe-component.js"
  import "./aframe-system.js"
  import "./aframe-primitive.js"

  import AFrameEntity from './AFrameEntity.svelte'
</script>

<script>
  let Angle = 45
  setInterval(() => { Angle++ }, 100)
</script>

<a-scene a-svelte-system>
  <a-sky color="#ECECEC"/>

  <AFrameEntity position="0 0.5 -3" rotation="0 {Angle} 0" Hue="180"/>
  <a-svelte-primitive a-svelte-component a-svelte-system/>

  <a-plane width="4" height="4" color="#7BC8A4"
    position="0 0 -4" rotation="-90 0 0"
  />
</a-scene>
