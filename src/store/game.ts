import { writable } from 'svelte/store';
import { parseIfJsonString } from '@app/helper/JSON.helper';

const LS_KEY_HISTORY = 'svelte_gawi_bawi_bo_history__bonus';

interface GameHistory {
  userChoosen: number;
  botChoosen: number;
  result: number;
  id: string;
}

interface GameState {
  score: number;
  isPlaying: boolean;
  userChoosen: null | number;
  isLoading: boolean;
  botChoosen: null | number;
  result: number;
  history: GameHistory[];
}

export const gameState = writable<GameState>({
  score: 0,
  isPlaying: false,
  userChoosen: null,
  isLoading: false,
  botChoosen: null,
  result: 0,
  history:
    (parseIfJsonString(
      localStorage.getItem(LS_KEY_HISTORY)
    ) as unknown as GameHistory[]) || [],
});

gameState.subscribe(({ history }) => {
  localStorage.setItem(LS_KEY_HISTORY, JSON.stringify(history));
});
