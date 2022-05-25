<script lang="ts">
  import Gamepad from './GameConsole/Gamepad.svelte';
  import { scale } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { gameState } from '@app/store';
  import { parseResultText } from '@app/libs/game';

  const handlePlayAgain = () => {
    gameState.update(prev => ({
      ...prev,
      isPlaying: false,
      userChoosen: null,
      botChoosen: null,
      isLoading: false,
    }));
  };

  $: resultText = parseResultText[$gameState.result];
</script>

<div
  in:scale
  class="game-result-container {$gameState.isLoading ? 'loading' : ''}"
>
  <div class="pick client-picked">
    <h1>You Picked</h1>
    <Gamepad padValue={$gameState.userChoosen} />
  </div>
  <div class="pick bot-picked">
    <h1>The House Picked</h1>
    <Gamepad padValue={$gameState.botChoosen} />
  </div>
</div>
{#if !$gameState.isLoading}
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
