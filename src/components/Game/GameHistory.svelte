<script lang="ts">
  import { flip } from 'svelte/animate';
  import { gamepadImages, parseResultText } from '@app/libs/game';
  import { gameState, modalState } from '@app/store';
  import ResetConfirmation from '../Modals/ResetConfirmation.svelte';
  const handleReset = () => {
    gameState.update(prev => ({ ...prev, history: [], score: 0 }));
    handleClose();
  };
  let confirmOpen = false;
  const handleClose = () => {
    modalState.update(prev => ({
      ...prev,
      historyOpen: false,
      rulesOpen: false,
    }));
  };
</script>

<div class="game-history-wrapper">
  {#if $gameState.history.length > 0}
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <td>You Choose</td>
            <td>Result</td>
            <td>House Choose</td>
          </tr>
        </thead>
        <tbody>
          {#each $gameState.history as result (result.id)}
            <tr animate:flip>
              <td>
                <img
                  width="24"
                  height="24"
                  src={gamepadImages[result.userChoosen]}
                  alt=""
                />
              </td>
              <td
                class={'result ' +
                  (parseResultText[result.result]?.toLowerCase() ?? 'draw')}
              >
                {parseResultText[result.result] ?? 'DRAW'}
              </td>
              <td>
                <img
                  width="24"
                  height="24"
                  src={gamepadImages[result.botChoosen]}
                  alt=""
                />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <ResetConfirmation
      open={confirmOpen}
      on:aggree={handleReset}
      on:disagree={() => (confirmOpen = false)}
    />
    <button class="clear-button" on:click={() => (confirmOpen = true)}
      >Clear</button
    >
  {:else}
    <p>You haven't played a game yet</p>
  {/if}
  <p class="banner">
    Back to
    <a href="https://ashal-rps.surge.sh">Classic Game</a>
  </p>
</div>

<style>
  .game-history-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 1em;
    position: relative;
  }

  .table-wrapper {
    overflow-y: scroll;
    max-height: 380px;
  }

  .table-wrapper::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  .table-wrapper::-webkit-scrollbar-track {
    box-shadow: inset 0 2px 2px 2px var(--main);
    border-radius: 10px;
  }

  /* Handle */
  .table-wrapper::-webkit-scrollbar-thumb {
    background-color: var(--text-main);
    border-radius: 10px;
  }

  table {
    position: relative;
  }

  thead {
    position: sticky;
    top: 0;
  }

  thead td {
    background-color: var(--text-main);
    color: var(--main);
    text-align: center;
    padding: 12px;
  }

  tbody td {
    text-align: center;
    padding: 20px;
  }

  .result.win {
    color: green;
  }

  .result.lose {
    color: red;
  }

  .result.draw {
    color: blue;
  }

  .clear-button {
    padding: 1em 2em;
    background-image: var(--rock-gradient);
    color: white;
    border-radius: 9px;
    transition: filter 200ms ease-in-out;
  }

  .clear-button:hover {
    filter: opacity(0.8);
  }

  .banner {
    font-size: 12px;
    color: var(--text-main);
  }
  .banner a {
    color: var(--text-main);
    text-decoration: none;
    background: var(--rock-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: cover;
    font-weight: bold;
  }

  @media screen and (max-width: 480px) {
    .game-history-wrapper {
      bottom: 4em;
    }
  }
</style>
