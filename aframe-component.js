  import "aframe"

  function log (Message) {
    console.log('component "a-svelte-component": ' + Message)
  }

  AFRAME.registerComponent('a-svelte-component',{
    dependencies: [ /* other components to depend on */ ],
    multiple:     true,
    schema:       { /* component property specification */ },
    init:         ()        => { log('init') },
    update:       (oldData) => { log('update') },
//    tick:         (Time, Delta)         => { log('tick') },
//    tock:         (Time, Delta, Camera) => { log('tock') },
    remove:       ()        => { log('remove') },
    pause:        ()        => { log('pause') },
    play:         ()        => { log('play') },
    updateSchema: (newData) => { log('updateSchema') },
    events:       { /* declarated event handlers */ }
  })
