import { writable } from 'svelte/store';

export const modalState = writable({
  rulesOpen: false,
  historyOpen: false,
});
