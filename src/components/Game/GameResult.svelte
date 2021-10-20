<script lang="ts">
  import Gamepad from './GameConsole/Gamepad.svelte'
  import { scale } from 'svelte/transition'
  import { onDestroy, tick } from 'svelte'
  import { fade } from 'svelte/transition'
  import { nanoid } from 'nanoid'
  import { sleep } from '@app/helper/sleep.helper'
  import { gameState } from '@app/store'
  import { determineResult } from '@app/libs/game'

  const handlePlayAgain = () => {
    gameState.update((prev) => ({ ...prev, isPlaying: false, userChoosen: null, botChoosen: null, isLoading: false }))
  }

  let resultText = null
  let loading = true
  let botChoosen = null
  const unsubscribe = gameState.subscribe(async (state) => {
    if (state.isPlaying) {
      if (typeof state.userChoosen === 'number') {
        await sleep(800)
        const rand = Math.floor(Math.random() * 5)
        const res = determineResult(state.userChoosen, rand)
        state.botChoosen = rand
        state.result = res
        state.isLoading = false
        state.score += state.result
        state.history = [
          ...state.history,
          { botChoosen: rand, userChoosen: state.userChoosen, result: res, id: nanoid(4) },
        ]
        await tick()
        loading = state.isLoading
        resultText = state.result === 0 ? 'DRAW' : state.result === 1 ? 'YOU WIN' : 'YOU LOSE'
        botChoosen = state.botChoosen
      }
    }
  })
  onDestroy(() => {
    loading = true
    botChoosen = null
    resultText = null
    unsubscribe()
  })
</script>

<div in:scale class="game-result-container {loading ? 'loading' : ''}">
  <div class="pick client-picked">
    <h1>You Picked</h1>
    <Gamepad padValue={$gameState.userChoosen} />
  </div>
  <div class="pick bot-picked">
    <h1>The House Picked</h1>
    <Gamepad padValue={botChoosen} />
  </div>
</div>
{#if !loading}
  <div class="result-container">
    <div in:fade>
      <h1>{resultText}</h1>
      <button on:click={handlePlayAgain} class="play-again">PLAY AGAIN</button>
    </div>
  </div>
{/if}

<style>
  .game-result-container {
    display: flex;
    flex: 1;
    align-items: center;
    color: var(--main);
    padding: 4em 0;
    transition: all 200ms linear;
    position: relative;
    justify-content: center;
    column-gap: calc(100% - 40rem);
  }

  .game-result-container.loading {
    column-gap: 2em;
  }

  .pick {
    display: flex;
    flex-direction: column;
    row-gap: 3em;
    align-items: center;
  }

  .pick > :global(.game-button) {
    width: 200px;
    height: 200px;
    padding: 1.7em;
  }

  .result-container {
    position: absolute;
    top: 66%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .result-container div {
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 0.8em;
    color: var(--main);
  }

  .result-container h1 {
    font-size: 48px;
    text-transform: uppercase;
  }

  .play-again {
    padding: 1em 4em;
    border-radius: 9px;
  }

  @media screen and (max-width: 768px) {
    .game-result-container {
      align-items: flex-start;
      padding: 2em 0;
      column-gap: calc(100% - 18rem);
    }
    .game-result-container.loading {
      column-gap: 1em;
    }
    .pick > :global(.game-button) {
      width: 120px;
      height: 120px;
      padding: 1.2em;
    }
    .pick {
      flex-direction: column-reverse;
      row-gap: 1.5em;
    }
    .pick h1 {
      font-size: 18px;
    }
    .result-container {
      top: 70%;
      width: 100%;
    }
    .result-container h1 {
      font-size: 36px;
    }
    .play-again {
      padding: 1em 2em;
      width: 60%;
    }
  }
</style>
