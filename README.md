# aframe-within-svelte #

some notes on how to use A-Frame within a Svelte Application

[A-Frame](https://github.com/aframevr/aframe) is a framework for creating "virtual reality experiences" in the same way as "ordinary" web pages: by means of HTML elements with attributes and content. Under the hood, A-Frame uses the DOM only to manage the hierarchical description of a VR/AR "scene" and its "assets" (especially, without burdening the browser's layout engine) and then simply maps these elements to corresponding objects of the underlying [Three.js](https://github.com/mrdoob/three.js/) library (this approach drastically simplifies the use of Three.js)

[Svelte](https://github.com/sveltejs/svelte) is a tool for building web applications from components which look and behave like custom HTML elements. Svelte accesses the DOM directly to manage these elements and update their attributes and contents upon changes.

While the underlying execution models of A-Frame and Svelte differ completely, their use of the DOM as a common data base ensures a fairly smooth interaction.

This repository illustrates how to integrate A-Frame entities, components and systems into a Svelte application - and how to use Svelte to implement custom A-Frame entities, components and systems. As you will see, it's quite simple.

### Terminology ###

A-Frame has an [entity-component-system](https://aframe.io/docs/1.3.0/introduction/entity-component-system.html) (ECS) architecture. As a consequence, an A-Frame "component" is something completely different than a Svelte "component". The following table tries to give a (really) rough mapping between A-Frame "Entities", "Components" and "Systems" and their Svelte counterparts:

<table><tbody>
<tr><th>A-Frame</th><th>Svelte</th></tr>
<tr><td>Entity</td><td>similar to a Svelte Component</td></tr>
<tr><td>Component</td><td>similar to Svelte "props"</td></tr>
<tr><td>System</td><td>the business logic behind these "props"</td></tr>
</tbody></table>

In an object-oriented world, ECS "components" contain the data of a mixin or (in case of multiple inheritance) a single superclass, whereas a "system" contains the mixin's or superclass's implementation. ECS "entities" then simply represent instances of (classes inheriting from) these mixins or superclasses without any own data or business logic.

## Using A-Frame in a Svelte Application ##

Assuming that you are following the usual workflow for Svelte applications (which finally runs [Rollup](https://rollupjs.org/guide/en/) or [WebPack](https://webpack.js.org/) to bundle a set of modules into an optimized JavaScript distribution), everything starts by installing A-Frame as such a module:

```bash
npm install --save aframe
```

Within a Svelte file, you then just import A-Frame like so:

```html
<script context="module">
  import "aframe"
</script>
```

Two remarks seem appropriate:

* importing A-Frame will blow up your final JavaScript distribution file by more than 2 MB - that's ok since A-Frame is not "tree-shakeable" yet and there seem to be [no plans to make it tree-shakeable](https://github.com/aframevr/aframe/issues/4242) in the near future
* since A-Frame actually expects to be included by a `<script>` element in the `<head>` section of an HTML document, it issues a _warning_ in the browser console if this is not the case - just ignore this warning...

After having imported A-Frame, its elements may be used like any other HTML element in a Svelte application:

```html
<a-scene>
  <a-sky color="#ECECEC"/>
  <a-box color="#4CC3D9"
    position="0 0.5 -3" rotation="0 45 0"/>
  <a-plane width="4" height="4" color="#7BC8A4"
    position="0 0 -4" rotation="-90 0 0"/>
</a-scene>
```

Even better: Svelte's reactivity mechanisms work as usual:

```html
<script>
  let BoxIsVisible = false
  setTimeout(() => { BoxIsVisible = true }, 5000)

  let Angle = 45
  setInterval(() => { Angle++ }, 100)
</script>

<a-scene a-svelte-system>
  <a-sky color="#ECECEC"/>
  {#if BoxIsVisible}
    <a-box color="#4CC3D9"
      position="0 0.5 -3" rotation="0 {Angle} 0"/>
  {/if}
  <a-plane width="4" height="4" color="#7BC8A4"
    position="0 0 -4" rotation="-90 0 0"/>
</a-scene>
```

Note: while the rotation animation shown above works (and illustrates that you don't have to synchronize your business logic with the 3D rendering loop) using A-Frame's `animation` component should be preferred.

## Implementing an A-Frame Component within Svelte ##

A-Frame provides a mechanism for [adding new "components"](https://aframe.io/docs/1.3.0/introduction/writing-a-component.html) - this mechanism still works within a Svelte application.

Just [implement the new A-Frame component](https://aframe.io/docs/1.3.0/core/component.html) in a separate JavaScript (or TypeScript) file:

```javascript
import "aframe"

AFRAME.registerComponent('a-svelte-component',{
  ... // add your specification and implementation here
})
```

and import it into your Svelte application. From then on it may be added to A-Frame elements as usual:

```html
<script context="module">
  import "aframe"
  import "./aframe-component.js"
</script>

<a-scene>
  <a-sky color="#ECECEC"/>

  <a-box a-svelte-component="..." color="#4CC3D9"
    position="0 0.5 -3" rotation="0 {Angle} 0"/>

  <a-plane width="4" height="4" color="#7BC8A4"
    position="0 0 -4" rotation="-90 0 0"
  />
</a-scene>
```

## Implementing an A-Frame System within Svelte ##

A-Frame also provides a mechanism for adding new "systems" - and, again, this mechanism also works within a Svelte application.

Just [implement the new A-Frame system]([https://aframe.io/docs/1.3.0/core/component.html](https://aframe.io/docs/1.3.0/core/systems.html)) in a separate JavaScript (or TypeScript) file:

```javascript
import "aframe"

AFRAME.registerSystem('a-svelte-system',{
  ... // add your specification and implementation here
})

AFRAME.registerComponent('a-svelte-system',{
  ... // add your specification and implementation here
})
```

and import it into your Svelte application. From then on it may be added to A-Frame as usual:

```html
<script context="module">
  import "aframe"
  import "./aframe-system.js"
</script>

<a-scene a-svelte-system="...">
  <a-sky color="#ECECEC"/>

  <a-box a-svelte-system="..." color="#4CC3D9"
    position="0 0.5 -3" rotation="0 {Angle} 0"/>

  <a-plane width="4" height="4" color="#7BC8A4"
    position="0 0 -4" rotation="-90 0 0"
  />
</a-scene>
```

## Implementing an A-Frame Primitive within Svelte ##

You may even [implement new A-Frame "primitives"](https://aframe.io/docs/1.3.0/introduction/html-and-primitives.html) within Svelte.

As before, implement the primitive in a separate JavaScript (or TypeScript) file:

```javascript
import "aframe"

AFRAME.registerPrimitive('a-svelte-primitive',{
  defaultComponents: { /* ... */ },
  mappings:          { /* ... */ }
})
```

and import it into your Svelte application where it may be used like any other A-Frame tag:

```html
<script context="module">
  import "aframe"
  import "./aframe-primitive.js"
</script>

<a-scene a-svelte-system="...">
  <a-sky color="#ECECEC"/>

  <a-svelte-primitive position="0 0.5 -3" rotation="0 {Angle} 0"/>

  <a-plane width="4" height="4" color="#7BC8A4"
    position="0 0 -4" rotation="-90 0 0"
  />
</a-scene>
```

## Using a Svelte Component as an A-Frame Entity ##

Svelte may also be used to implement new A-Frame entities in order to benefit from Svelte features like [stores](https://svelte.dev/tutorial/writable-stores), [actions](https://svelte.dev/tutorial/actions), [contexts](https://svelte.dev/tutorial/context-api) and [component composition](https://svelte.dev/tutorial/slots).

## License ##

[MIT License](LICENSE.md)
