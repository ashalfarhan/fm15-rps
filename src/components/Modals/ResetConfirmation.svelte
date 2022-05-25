<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  export let open = false;
</script>

{#if open}
  <div transition:fade={{ duration: 150 }} class="reset-confirmation">
    <div class="reset-confirmation__overlay" />
    <div class="reset-confirmation__content">
      <h1>Are you sure want to delete history (and score) ?</h1>
      <div class="button-group">
        <button class="button agree" on:click={() => dispatch('aggree')}
          >Yes</button
        >
        <button class="button disagree" on:click={() => dispatch('disagree')}
          >No</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .reset-confirmation {
    display: flex;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .reset-confirmation__overlay {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    z-index: 0;
  }

  .reset-confirmation__content {
    position: relative;
    z-index: 1;
    display: flex;
    padding: 1em;
    margin: 12px;
    background-color: white;
    flex-direction: column;
    border-radius: 9px;
    row-gap: 18px;
  }

  .reset-confirmation__content h1 {
    font-size: 16px;
    text-align: center;
    color: var(--text-main);
  }

  .button-group {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }

  .button {
    padding: 1em 2em;
    background-image: var(--rock-gradient);
    color: white;
    flex: 1;
    border-radius: 9px;
    transition: filter 200ms ease-in-out;
  }

  .button:hover {
    filter: opacity(0.8);
  }
</style>
