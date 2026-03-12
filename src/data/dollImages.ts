// Corporate dolls
import micromanager from '@/assets/dolls/micromanager.jpeg';
import creditGrabber from '@/assets/dolls/credit-grabber.jpeg';
import gaslighter from '@/assets/dolls/gaslighter.jpeg';
import clown from '@/assets/dolls/clown.jpeg';
import exploiter from '@/assets/dolls/exploiter.jpeg';

// Relationship dolls
import ghoster from '@/assets/dolls/ghoster.jpeg';
import loveBomber from '@/assets/dolls/love-bomber.jpeg';
import clingyOne from '@/assets/dolls/clingy-one.jpeg';
import commitmentPhobe from '@/assets/dolls/commitment-phobe.jpeg';
import goldDigger from '@/assets/dolls/gold-digger.jpeg';

// Family dolls
import mother from '@/assets/dolls/mother.jpeg';
import judgmentalAunt from '@/assets/dolls/judgmental-aunt.jpeg';
import goldenChild from '@/assets/dolls/golden-child.jpeg';
import sister from '@/assets/dolls/sister.jpeg';
import drunkUncle from '@/assets/dolls/drunk-uncle.jpeg';

// Friendship dolls
import karen from '@/assets/dolls/karen.jpeg';
import bridezilla from '@/assets/dolls/bridezilla.jpeg';
import messyRoommate from '@/assets/dolls/messy-roommate.jpeg';
import fakeFriend from '@/assets/dolls/fake-friend.jpeg';
import badInfluence from '@/assets/dolls/bad-influence.jpeg';

// Bonus
import innerYou from '@/assets/dolls/inner-you.jpeg';

export const DOLL_IMAGES: Record<string, string> = {
  'micromanager': micromanager,
  'credit-grabber': creditGrabber,
  'gaslighter': gaslighter,
  'clown': exploiter,
  'exploiter': clown,
  'ghoster': ghoster,
  'love-bomber': loveBomber,
  'clingy-one': clingyOne,
  'commitment-phobe': commitmentPhobe,
  'gold-digger': goldDigger,
  'mother': mother,
  'judgmental-aunt': judgmentalAunt,
  'golden-child': goldenChild,
  'sister': sister,
  'drunk-uncle': drunkUncle,
  'karen': karen,
  'bridezilla': bridezilla,
  'messy-roommate': messyRoommate,
  'fake-friend': fakeFriend,
  'bad-influence': badInfluence,
  'inner-you': innerYou,
};

export function getDollImage(dollId: string): string | undefined {
  return DOLL_IMAGES[dollId];
}
