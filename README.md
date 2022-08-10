# aframe-within-svelte #

some notes on how to use A-Frame within a Svelte Application

[A-Frame](https://github.com/aframevr/aframe) is a framework for creating "virtual reality experiences" in the same way as "ordinary" web pages: by means of HTML elements with attributes and content. Under the hood, A-Frame only uses the DOM to manage the hierarchical description of a VR/AR "scene" and its "assets" (especially, without burdening the browser's layout engine) and simply maps these elements to corresponding objects of the underlying [Three.js](https://github.com/mrdoob/three.js/) library and their properties and methods.

[Svelte](https://github.com/sveltejs/svelte) is a tool to build web applications from components which look and behave like custom HTML elements. Svelte accesses the DOM directly to manage elements and update attributes and content upon changes.

While the underlying execution models of A-Frame and Svelte differ completely, their use of the DOM as a common data base ensures a fairly smooth interaction.

This repository illustrates how to integrate A-Frame entities, components and systems into a Svelte application - and how to use Svelte to implement custom A-Frame entities, components and systems.

### Teminology ###

A-Frame has an [entity-component-system](https://aframe.io/docs/1.3.0/introduction/entity-component-system.html) (ECS) architecture. As a consequence, it is _very_ important to keep in mind, that an A-Frame "component" is something completely different than a Svelte "component". The following table tries to give a rough mapping between A-Frame "Entities", "Components" and "Systems" and their Svelte counterparts:

<table>
</table>

## License ##

[MIT License](LICENSE.md)
