export type DollCategory = 'corporate' | 'relationship' | 'family' | 'friendship' | 'neighborhood';

export interface DollConfig {
  id: string;
  name: string;
  archetype: string;
  tagline: string;
  emoji: string;
  category: DollCategory;
  categoryLabel: string;
  navTagText: string;
  accentColor: string;
  heroTitle: string[];
  heroItalicWord: string;
  heroDescription: string;
  escLabels: string[];
  bossLines: string[];
  ouchLines: string[];
  zoneLines: Record<string, string[]>;
  escLines: Record<string, string[]>;
  fortunes: {
    common: { text: string; rarity: string }[];
    uncommon: { text: string; rarity: string }[];
    rare: { text: string; rarity: string }[];
  };
  annoyances: string[];
  goodVibes: string[];
  curseLabel: string;
  vibesLabel: string;
  curseSectionTitle: string[];
  vibesSectionTitle: string[];
  footerTagline: string;
  footerDisclaimer: string;
}

export const CATEGORY_META: Record<DollCategory, { label: string; tagClass: string; packTitle: string }> = {
  corporate: { label: 'Corporate Voodoo™', tagClass: 'bg-corp', packTitle: 'The Office Nightmares' },
  relationship: { label: 'Relationship Voodoo™', tagClass: 'bg-love', packTitle: 'The Romantic Disasters' },
  family: { label: 'Family Matters™', tagClass: 'bg-fam', packTitle: 'The Relatives' },
  friendship: { label: 'With Friends Like These™', tagClass: 'bg-friend', packTitle: 'The Social Archetypes' },
  neighborhood: { label: 'Neighborhood Watch™', tagClass: 'bg-neighbor', packTitle: 'The Local Menaces' },
};

// Default lines used as fallback for dolls not yet fully configured
const DEFAULT_OUCH = [
  "OW!!", "!@#$%!!", "*bleeeep*", "WHY", "That's it.", "I QUIT", "ouch.", "NOPE",
  "okay then.", "noted.", "per my last pin", "circle BACK on that",
  "looping in HR", "take that OFFLINE", "not in my wheelhouse",
];

const DEFAULT_ZONE_LINES = {
  head: ["That's my thinking spot.", "Right in the brain.", "My best ideas live there.", "Ow, the thoughts!"],
  shoulders: ["All the stress is stored there.", "That's where I carry everything.", "My whole inbox lives there."],
  torso: ["Right in the core.", "My center of gravity!", "That's where the feelings are."],
  hands: ["These hands type 80 words a minute!", "I was mid-gesture!", "That's my scrolling hand."],
  feet: ["I was on my way somewhere important.", "Caught me mid-step.", "These feet were walking away."],
};

const DEFAULT_ESC_LINES = {
  mild: ["Quick question — do you have a minute?", "Let's circle back on that.", "Can we sync?"],
  moderate: ["I need a status update on your status update.", "That's been noted. It will be addressed. Eventually."],
  intense: ["Your role has evolved. We've evolved it for you.", "We're pivoting. You are the pivot."],
};

function makeDefaultFortunes(name: string) {
  return {
    common: [
      { text: `A meeting about ${name} will be scheduled. It could have been an email.`, rarity: "Common" },
      { text: `Someone will ask ${name} a quick question. It will not be quick.`, rarity: "Common" },
      { text: `${name} will circle back on something that did not need circling.`, rarity: "Common" },
      { text: `A calendar invite will appear. ${name} will sigh.`, rarity: "Common" },
      { text: `${name} will pretend to understand a spreadsheet.`, rarity: "Common" },
    ],
    uncommon: [
      { text: `${name}'s raise has been approved. It is recognition.`, rarity: "Uncommon" },
      { text: `A Slack message marked URGENT will not be urgent.`, rarity: "Uncommon" },
      { text: `${name} will be asked to do more with less.`, rarity: "Uncommon" },
    ],
    rare: [
      { text: `PROMOTION DENIED. EXPOSURE GRANTED.`, rarity: "Rare ✦" },
      { text: `${name} has unlimited PTO. They will be warned for taking it.`, rarity: "Rare ✦" },
    ],
  };
}

function makeDefaultAnnoyances() {
  return [
    "Every ketchup bottle __NAME__ touches will release the watery liquid first.",
    "__NAME__ will walk into rooms and immediately forget why.",
    "__NAME__'s coffee will always be slightly too cold.",
    "Every printer __NAME__ touches will jam. Immediately.",
    "__NAME__'s headphones will die at 3% right when needed most.",
  ];
}

function makeDefaultVibes() {
  return [
    "May every green light turn for __NAME__ today.",
    "May __NAME__'s coffee be the perfect temperature every time.",
    "May someone notice __NAME__'s hard work and actually say something.",
    "May __NAME__'s 4pm meeting get cancelled and never rescheduled.",
    "May __NAME__ leave work on time today. And tomorrow.",
  ];
}

// ═══════════════════════════════════════════════════════════════
// THE MICROMANAGER — Fully configured
// ═══════════════════════════════════════════════════════════════
const MICROMANAGER: DollConfig = {
  id: 'micromanager',
  name: 'The Micromanager',
  archetype: 'Corporate Overlord',
  tagline: 'Watches your screen. Counts your keystrokes. Schedules syncs about syncs.',
  emoji: '📎',
  category: 'corporate',
  categoryLabel: 'Corporate Voodoo™',
  navTagText: 'Micromanager Edition',
  accentColor: '#b82a24',
  heroTitle: ['Hands on', 'Corporate'],
  heroItalicWord: 'Therapy.',
  heroDescription: 'Having a tough day?\nGet through it with a Corporate Voodoo Doll.\nStick pins. Consult the Office Spirits.\nFeel marginally better about your Monday.',
  escLabels: ["Mild Annoyance", "Mounting Frustration", "Quiet Corporate Rage", "Fully Unhinged", "⚡ Maximum Chaos ⚡"],
  bossLines: [
    "Quick question — do you have a minute?",
    "Can you just use a different font for the deck?",
    "Let's circle back on that.",
    "I need you to loop me in going forward.",
  ],
  ouchLines: [
    "OW!!", "!@#$%!!", "*bleeeep*", "Son of a—*", "*CENSORED*",
    "WHY", "That's it.", "I QUIT", "ouch.", "NOPE",
    "okay then.", "noted.", "per my last pin", "circle BACK on that",
    "as per my previous stab", "thoughts?", "reply all: OW",
    "looping in HR", "take that OFFLINE", "low priority??",
    "unsubscribe from THIS", "not in my wheelhouse", "no bandwidth for pain",
    "I'll escalate this", "this is a learning moment",
  ],
  zoneLines: {
    head: [
      "I was just in the middle of a thought. Now it's gone.",
      "My migraine says we need to reschedule.",
      "Did someone remove my thinking cap?",
      "I have a lot on my plate — literally, in my head.",
    ],
    shoulders: [
      "The weight of this company rests right here.",
      "All the micromanagement is stored in the shoulders.",
      "That's where I keep my passive aggression.",
      "My entire email inbox lives here.",
    ],
    torso: [
      "Right in the KPIs.",
      "That's where the synergy lives.",
      "My quarterly targets just shifted.",
      "You hit my core competency.",
    ],
    hands: [
      "These hands send 47 emails a day.",
      "I was about to Reply All.",
      "That's my Track Changes hand.",
      "These are my passive-aggressive typing fingers.",
    ],
    feet: [
      "I was on my way to give you feedback.",
      "Caught me leaving on time for once.",
      "I was about to stop by your desk.",
      "These feet were going straight to HR.",
    ],
  },
  escLines: {
    mild: [
      "Quick question — do you have a minute?",
      "Can you just use a different font for the deck?",
      "Let's circle back on that.",
      "I need you to loop me in going forward.",
      "Can we get a quick sync on your bandwidth?",
    ],
    moderate: [
      "I need a status update on your status update.",
      "We're a family here. Families don't quit.",
      "Can you get this to me EOD? It's 4:57pm.",
      "You had an excellent year. Your raise is 1.2%.",
      "That's been noted. It will be addressed. Eventually.",
      "This really could have been an email.",
      "I've restructured your role. It's an opportunity.",
    ],
    intense: [
      "PROMOTION DENIED. EXPOSURE GRANTED.",
      "Your role has evolved. We've evolved it for you.",
      "You have unlimited PTO. Please don't use it.",
      "Your contributions have earned you a raise. Of recognition.",
      "I'm pinging you about work-life balance. It's 11pm.",
      "I have questions about your anonymous feedback survey. About me.",
      "Give me a full rundown of your tasks. I need to see you online more.",
      "We're pivoting. You are the pivot.",
    ],
  },
  fortunes: {
    common: [
      { text: "Someone will ask you a quick question. It will not be quick.", rarity: "Common" },
      { text: "You will be asked to circle back on something that did not need circling.", rarity: "Common" },
      { text: "A meeting will be scheduled to discuss a future meeting.", rarity: "Common" },
      { text: "Your calendar will be fully booked by 10am.", rarity: "Common" },
      { text: "A meeting scheduled for 30 minutes will run 47.", rarity: "Common" },
      { text: "You will pretend to understand a spreadsheet.", rarity: "Common" },
      { text: "You will be told you are a family. Families do not get equity.", rarity: "Common" },
      { text: "The company will hit record profits. There will be pizza.", rarity: "Common" },
      { text: "Your boss just discovered a new buzzword. You will hear it eleven times today.", rarity: "Common" },
    ],
    uncommon: [
      { text: "A Slack message marked URGENT will not be urgent.", rarity: "Uncommon" },
      { text: "You will be asked to do more with less. The less will get smaller.", rarity: "Uncommon" },
      { text: "Your raise has been approved. It is recognition.", rarity: "Uncommon" },
      { text: "The company made one billion dollars. You will get a slice of $12 pizza.", rarity: "Uncommon" },
      { text: "This meeting could have been an email. The email also could have been nothing.", rarity: "Uncommon" },
    ],
    rare: [
      { text: "PROMOTION DENIED. EXPOSURE GRANTED.", rarity: "Rare ✦" },
      { text: "You have unlimited PTO. You will be warned for taking it.", rarity: "Rare ✦" },
      { text: "Your boss will present your work and wins as their own.", rarity: "Rare ✦" },
      { text: "A work-life balance initiative will be announced. At 11pm.", rarity: "Rare ✦" },
      { text: "You will be asked to take on the work of your laid-off coworker. This is a growth opportunity.", rarity: "Rare ✦" },
    ],
  },
  annoyances: [
    "It will rain every single time __NAME__ washes the car. Without fail.",
    "Every ketchup bottle __NAME__ touches will release the watery liquid first.",
    "__NAME__ will walk into rooms and immediately forget why.",
    "__NAME__'s Zoom will randomly mute mid-sentence on every important call.",
    "__NAME__'s iced coffee ice will melt in under four minutes. Always.",
    "__NAME__ will CC the wrong person on a sensitive email. Repeatedly.",
    "__NAME__ will forget to attach the attachment. Every single time.",
    "__NAME__'s computer will blue screen five minutes before a big presentation.",
    "Every printer __NAME__ touches will jam. Immediately.",
    "__NAME__'s clearly labeled lunch will go missing from the office fridge.",
    "__NAME__'s headphones will die at 3% battery right when the meeting starts.",
    "All of __NAME__'s Excel formulas will break simultaneously.",
    "The office coffee machine will be broken every single time __NAME__ needs it.",
    "__NAME__'s office nemesis gets promoted above them. Effective immediately.",
  ],
  goodVibes: [
    "May every green light turn for __NAME__ today. Every single one.",
    "May __NAME__'s coffee be the perfect temperature every single time.",
    "May __NAME__ find a $20 bill in an old jacket pocket today.",
    "May __NAME__'s inbox be suspiciously quiet on a Monday morning.",
    "May __NAME__'s presentation go flawlessly and earn a genuine compliment.",
    "May every parking spot __NAME__ needs appear instantly.",
    "May __NAME__'s WiFi be fast and the Zoom connection perfectly stable.",
    "May someone notice __NAME__'s hard work today and actually say something.",
    "May __NAME__'s 4pm meeting get cancelled and never rescheduled.",
    "May __NAME__ leave work on time today. And tomorrow. And the day after.",
    "May __NAME__'s iced coffee stay iced for the entire afternoon.",
    "May __NAME__ sleep so well tonight that tomorrow actually feels manageable.",
  ],
  curseLabel: 'Minor Corporate Annoyance',
  vibesLabel: 'Karmic Balance',
  curseSectionTitle: ['Send a Minor', 'Annoyance.'],
  vibesSectionTitle: ['Now Send Some', 'Good Vibes.'],
  footerTagline: 'No actual managers were harmed in the making of this experience.',
  footerDisclaimer: 'Any similarities to real people are purely coincidental… and deeply unfortunate for you.',
};

// Helper to create a basic doll config with defaults
function makeDoll(partial: Partial<DollConfig> & Pick<DollConfig, 'id' | 'name' | 'tagline' | 'emoji' | 'category' | 'categoryLabel'>): DollConfig {
  return {
    archetype: partial.name,
    navTagText: `${partial.name.replace('The ', '')} Edition`,
    accentColor: '#b82a24',
    heroTitle: ['Stick It To', 'Them.'],
    heroItalicWord: 'Virtually.',
    heroDescription: `Know someone like ${partial.name}? Of course you do.\nStick pins. Read fortunes. Feel slightly better.`,
    escLabels: ["Mild Annoyance", "Mounting Frustration", "Quiet Rage", "Fully Unhinged", "⚡ Maximum Chaos ⚡"],
    bossLines: DEFAULT_ESC_LINES.mild,
    ouchLines: DEFAULT_OUCH,
    zoneLines: DEFAULT_ZONE_LINES,
    escLines: DEFAULT_ESC_LINES,
    fortunes: makeDefaultFortunes(partial.name),
    annoyances: makeDefaultAnnoyances(),
    goodVibes: makeDefaultVibes(),
    curseLabel: 'Minor Annoyance',
    vibesLabel: 'Karmic Balance',
    curseSectionTitle: ['Send a Minor', 'Annoyance.'],
    vibesSectionTitle: ['Now Send Some', 'Good Vibes.'],
    footerTagline: 'No real people were harmed in the making of this experience.',
    footerDisclaimer: 'Any catharsis is purely coincidental.',
    ...partial,
  };
}

export const ALL_DOLLS: DollConfig[] = [
  MICROMANAGER,
  makeDoll({ id: 'narcissist', name: 'The Narcissist', tagline: 'Mirror, mirror on the wall — actually, just keep talking about me.', emoji: '🪞', category: 'corporate', categoryLabel: 'Corporate Voodoo™', accentColor: '#b82a24' }),
  makeDoll({ id: 'credit-grabber', name: 'The Credit Grabber', tagline: 'Your idea. Their presentation. Standing ovation.', emoji: '🏆', category: 'corporate', categoryLabel: 'Corporate Voodoo™', accentColor: '#b82a24' }),
  makeDoll({ id: 'gaslighter', name: 'The Gaslighter', tagline: 'That never happened. And if it did, it wasn\'t that bad.', emoji: '🔥', category: 'corporate', categoryLabel: 'Corporate Voodoo™', accentColor: '#b82a24' }),
  makeDoll({ id: 'clown', name: 'The Clown', tagline: 'Promoted for vibes. Zero deliverables.', emoji: '🤡', category: 'corporate', categoryLabel: 'Corporate Voodoo™', accentColor: '#b82a24' }),
  makeDoll({ id: 'dumper', name: 'The Dumper', tagline: 'Delegates everything. Takes credit anyway.', emoji: '📦', category: 'corporate', categoryLabel: 'Corporate Voodoo™', accentColor: '#b82a24' }),

  makeDoll({ id: 'ghoster', name: 'The Ghoster', tagline: 'Left on read. Left in orbit. Left.', emoji: '👻', category: 'relationship', categoryLabel: 'Relationship Voodoo™', accentColor: '#8b2252' }),
  makeDoll({ id: 'love-bomber', name: 'The Love Bomber', tagline: 'Flowers on Tuesday. Someone else on Thursday.', emoji: '🌹', category: 'relationship', categoryLabel: 'Relationship Voodoo™', accentColor: '#8b2252' }),
  makeDoll({ id: 'clingy-one', name: 'The Clingy One', tagline: 'Replied before you finished typing.', emoji: '📱', category: 'relationship', categoryLabel: 'Relationship Voodoo™', accentColor: '#8b2252' }),
  makeDoll({ id: 'commitment-phobe', name: 'The Commitment-Phobe', tagline: 'Five years of "let\'s not put a label on it."', emoji: '🏃', category: 'relationship', categoryLabel: 'Relationship Voodoo™', accentColor: '#8b2252' }),
  makeDoll({ id: 'gold-digger', name: 'The Gold Digger', tagline: 'Loves you. And your wallet. Mostly your wallet.', emoji: '💰', category: 'relationship', categoryLabel: 'Relationship Voodoo™', accentColor: '#8b2252' }),

  makeDoll({ id: 'mother', name: 'The Mother', tagline: 'Just checking in. Again. For the fourth time today.', emoji: '👩‍👧', category: 'family', categoryLabel: 'Family Matters™', accentColor: '#3a5a8c' }),
  makeDoll({ id: 'drunk-uncle', name: 'The Drunk Uncle', tagline: 'Three beers in and suddenly a political analyst.', emoji: '🍺', category: 'family', categoryLabel: 'Family Matters™', accentColor: '#3a5a8c' }),
  makeDoll({ id: 'judgmental-aunt', name: 'The Judgmental Aunt', tagline: 'So when are you getting married? You look tired.', emoji: '👓', category: 'family', categoryLabel: 'Family Matters™', accentColor: '#3a5a8c' }),
  makeDoll({ id: 'golden-child', name: 'The Golden Child', tagline: 'Perfect grades. Perfect job. Perfect at ruining holidays.', emoji: '⭐', category: 'family', categoryLabel: 'Family Matters™', accentColor: '#3a5a8c' }),
  makeDoll({ id: 'sister', name: 'The Sister', tagline: 'Borrows everything. Returns nothing. Blames you.', emoji: '👯', category: 'family', categoryLabel: 'Family Matters™', accentColor: '#3a5a8c' }),

  makeDoll({ id: 'karen', name: 'The Entitled Karen', tagline: 'The customer is always right. Especially when she\'s wrong.', emoji: '👑', category: 'friendship', categoryLabel: 'Friendship Voodoo™', accentColor: '#7a1c6e' }),
  makeDoll({ id: 'bridezilla', name: 'The Bridezilla', tagline: 'It\'s her day. Every day. For eighteen months.', emoji: '💍', category: 'friendship', categoryLabel: 'Friendship Voodoo™', accentColor: '#c0306a' }),
  makeDoll({ id: 'messy-roommate', name: 'The Messy Roommate', tagline: 'The dishes. The rent. Your clothes. Everything.', emoji: '🧹', category: 'friendship', categoryLabel: 'Friendship Voodoo™', accentColor: '#4a8c3f' }),
  makeDoll({ id: 'fake-friend', name: 'The Fake Friend', tagline: 'So happy for you. Not happy for you.', emoji: '🪞', category: 'friendship', categoryLabel: 'Friendship Voodoo™', accentColor: '#9b6fa0' }),
  makeDoll({ id: 'bad-influence', name: 'The Bad Influence', tagline: 'One more. It\'ll be fine. It wasn\'t fine.', emoji: '🍸', category: 'friendship', categoryLabel: 'Friendship Voodoo™', accentColor: '#c0392b' }),
  makeDoll({ id: 'inner-you', name: 'The Inner You', tagline: 'The one that was always here. No pins. Just wishes.', emoji: '❤️', category: 'friendship', categoryLabel: 'Friendship Voodoo™', accentColor: '#c0394a' }),
];

export function getDollById(id: string): DollConfig | undefined {
  return ALL_DOLLS.find(d => d.id === id);
}

export function getDollsByCategory(category: DollCategory): DollConfig[] {
  return ALL_DOLLS.filter(d => d.category === category);
}
