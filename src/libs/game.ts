import paperIcon from '@app/assets/images/icon-paper.svg';
import scissorsIcon from '@app/assets/images/icon-scissors.svg';
import rockIcon from '@app/assets/images/icon-rock.svg';
import spockIcon from '@app/assets/images/icon-spock.svg';
import lizardIcon from '@app/assets/images/icon-lizard.svg';

export const gamepadImages = [
  rockIcon,
  paperIcon,
  scissorsIcon,
  spockIcon,
  lizardIcon,
];

export const gameOptions = ['rock', 'paper', 'scissors', 'spock', 'lizard'];

export const parseResultText = {
  '-1': 'LOSE',
  '0': 'DRAW',
  '1': 'WIN',
};

export function determineResult(
  userWeaponIdx: number,
  botWeaponIdx: number
): -1 | 0 | 1 {
  const userWeapon = gameOptions[userWeaponIdx];
  const botWeapon = gameOptions[botWeaponIdx];
  if (!userWeapon || !botWeapon) {
    return 0;
  }
  const pair = userWeapon.substring(0, 2) + botWeapon.substring(0, 2);
  switch (pair.toLowerCase()) {
    case 'roro':
    case 'papa':
    case 'scsc':
    // Bonus
    case 'spsp':
    case 'lili':
      return 0;
    case 'paro':
    case 'pasp':
    case 'rosc':
    case 'roli':
    case 'scpa':
    case 'scli':
    // Bonus
    case 'lisp':
    case 'lipa':
    case 'spsc':
    case 'spro':
      return 1;
    case 'ropa':
    case 'rosp':
    case 'scro':
    case 'scsp':
    case 'pasc':
    case 'pali':
    // Bonus
    case 'liro':
    case 'lisc':
    case 'spli':
    case 'sppa':
      return -1;
    default:
      return 0;
  }
}
