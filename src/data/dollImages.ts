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

export const DOLL_IMAGES: Record<string, string> = {
  'micromanager': micromanager,
  'credit-grabber': creditGrabber,
  'gaslighter': gaslighter,
  'clown': clown,
  'exploiter': exploiter,
  'ghoster': ghoster,
  'love-bomber': loveBomber,
  'clingy-one': clingyOne,
  'commitment-phobe': commitmentPhobe,
  'gold-digger': goldDigger,
};

export function getDollImage(dollId: string): string | undefined {
  return DOLL_IMAGES[dollId];
}
