<script lang="ts">
  import Gamepad from './Gamepad.svelte';
  import { scale } from 'svelte/transition';
</script>

<div in:scale class="console-container">
  <svg
    class="pentagon"
    xmlns="http://www.w3.org/2000/svg"
    width="329"
    height="313"
  >
    <path
      fill="none"
      stroke="#000"
      stroke-width="15"
      d="M164.5 9.27L9.26 122.06l59.296 182.495h191.888L319.74 122.06 164.5 9.271z"
      opacity=".2"
    />
  </svg>

  <div class="console console-upper">
    <Gamepad withAction padValue={2} on:on-user-select />
  </div>
  <div class="console console-middle">
    <Gamepad withAction padValue={3} on:on-user-select />
    <Gamepad withAction padValue={1} on:on-user-select />
  </div>
  <div class="console console-below">
    <Gamepad withAction padValue={4} on:on-user-select />
    <Gamepad withAction padValue={0} on:on-user-select />
  </div>
</div>

<style>
  .console-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    row-gap: 1em;
  }
  .pentagon {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
  }
  .console {
    position: relative;
  }
  .console-upper {
    display: flex;
  }
  .console-middle {
    display: flex;
    column-gap: 14em;
    top: -3em;
  }
  .console-below {
    display: flex;
    column-gap: 4em;
  }
  @media screen and (max-width: 768px) {
    .pentagon {
      transform: translate(-50%, -50%) scale(0.8);
    }
    .console-container {
      row-gap: 0;
      top: -2.5em;
    }
    .console-middle {
      column-gap: 6em;
      top: -1.5em;
    }
    .console-below {
      display: flex;
      column-gap: 2em;
    }
  }
</style>
