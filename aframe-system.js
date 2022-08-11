  import "aframe"

  function log1 (Message) {
    console.log('system "a-svelte-system (System)": ' + Message)
  }

  function log2 (Message) {
    console.log('system "a-svelte-system (Component)": ' + Message)
  }

/**** systems are activated by the <a-scene> ****/

  AFRAME.registerSystem('a-svelte-system',{
    schema: { /* system property specification */ },
    init:   ()            => { log1('init') },
//    tick:   (Time, Delta) => { log1('tick') },
    pause:  ()            => { log1('pause') },
    play:   ()            => { log1('play') }
  })

/**** systems are used from within components with the same name ****/

  AFRAME.registerComponent('a-svelte-system',{
    dependencies: [ /* other components to depend on */ ],
    multiple:     true,
    schema:       { /* component property specification */ },
    init:         ()        => { log2('init') },
    update:       (oldData) => { log2('update') },
//    tick:         (Time, Delta)         => { log2('tick') },
//    tock:         (Time, Delta, Camera) => { log2('tock') },
    remove:       ()        => { log2('remove') },
    pause:        ()        => { log2('pause') },
    play:         ()        => { log2('play') },
    updateSchema: (newData) => { log2('updateSchema') },
    events:       { /* declarated event handlers */ }
  })
