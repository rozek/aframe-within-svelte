# aframe-within-svelte #

some notes on how to use A-Frame within a Svelte Application

[A-Frame](https://github.com/aframevr/aframe) is a framework for creating "virtual reality experiences" in the same way as "ordinary" web pages: by means of HTML elements with attributes and content. Under the hood, A-Frame only uses the DOM to manage the hierarchical description of a VR/AR "scene" and its "assets" (especially, without burdening the browser's layout engine) and simply maps these elements to corresponding objects of the underlying [Three.js](https://github.com/mrdoob/three.js/) library and their properties and methods.

[Svelte](https://github.com/sveltejs/svelte) is a tool to build web applications from components which can be used like custom "web components" within an HTML document.

While the underlying execution models of A-Frame and Svelte differ completely, the use of HTML elements on both sides ensures a fairly smooth interaction.

These repository illustrates how to use A-Frame entities, components and systems within a Svelte application - and how to use Svelte to implemente custom A-Frame entities, components and systems.

### Teminology ###

## License ##

[MIT License](LICENSE.md)
