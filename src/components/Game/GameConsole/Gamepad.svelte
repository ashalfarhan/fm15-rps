<script lang="ts">
  export let padValue = 0;
  export let withAction = false;

  import { gameState } from '@app/store/game';
  import { gameOptions, gamepadImages } from '@app/libs/game';
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ 'on-user-select': number }>();
  const handlePlay = () => {
    if (withAction) {
      gameState.update(prev => ({
        ...prev,
        isPlaying: true,
        userChoosen: padValue,
        isLoading: true,
      }));
      dispatch('on-user-select', padValue);
    }
  };
</script>

{#if typeof padValue === 'number'}
  <button
    in:fade
    on:click={handlePlay}
    class="game-button {gameOptions[padValue]} {!withAction
      ? 'display-only'
      : ''}"
  >
    <div class="button-inner">
      <img src={gamepadImages[padValue]} alt="" />
    </div>
  </button>
{:else}
  <div in:fade class="loading-pick" />
{/if}

<style>
  .button-inner {
    border-radius: 100%;
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    background-color: var(--main);
    transition: box-shadow 200ms ease-in-out;
  }

  .game-button {
    width: 130px;
    height: 130px;
    border-radius: 100%;
    display: flex;
    padding: 1em;
    transition: all 200ms ease;
  }

  .game-button.paper {
    background-image: var(--paper-gradient);
    box-shadow: 0 0.5rem 0 hsl(230, 180%, 58%);
  }

  .game-button.scissors {
    background-image: var(--scissors-gradient);
    box-shadow: 0 0.5rem 0 hsl(39, 89%, 45%);
  }

  .game-button.rock {
    background-image: var(--rock-gradient);
    box-shadow: 0 0.5rem 0 hsl(349, 71%, 45%);
  }

  .game-button.lizard {
    background-image: var(--lizard-gradient);
    box-shadow: 0 0.5rem 0 hsl(261, 73%, 56%);
  }

  .game-button.spock {
    background-image: var(--cyan);
    box-shadow: 0 0.5rem 0 hsl(189, 59%, 40%);
  }

  .game-button:active {
    box-shadow: 0 0 0;
    transform: translateY(0.4rem);
  }

  .game-button:active .button-inner {
    box-shadow: inset 0 3px 0 3px rgba(0, 0, 0, 0.3);
  }

  .button-inner {
    box-shadow: inset 0 -2px 0 2px rgba(0, 0, 0, 0.3);
  }

  .game-button.display-only .button-inner {
    box-shadow: inset 0 3px 0 3px rgba(0, 0, 0, 0.3);
  }

  .loading-pick {
    width: 180px;
    height: 180px;
    background-image: var(--bg);
    border-radius: 100%;
  }

  @media screen and (max-width: 768px) {
    .game-button {
      width: 120px;
      height: 120px;
      padding: 1em;
    }
    .loading-pick {
      width: 120px;
      height: 120px;
    }
  }
</style>
