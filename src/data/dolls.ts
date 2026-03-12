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

// ═══════════════════════════════════════════════════════════════
// SHARED GOOD VIBES (used by multiple corporate dolls)
// ═══════════════════════════════════════════════════════════════
const CORPORATE_GOOD_VIBES = [
  "May __NAME__'s worst meeting get cancelled with no explanation and no reschedule.",
  "May __NAME__'s boss suddenly forget they had notes on that.",
  "May __NAME__'s inbox stay mysteriously quiet for one full, golden hour.",
  "May __NAME__ receive unexpected praise from someone who never gives it.",
  "May __NAME__ leave work on time today without apologizing for it.",
  "May __NAME__'s next meeting end 20 minutes early and not become a Slack thread.",
  "May someone say 'great job' to __NAME__ and actually mean it.",
  "May __NAME__ avoid every meeting that could have been an email.",
  "May __NAME__'s coffee be exactly the right temperature for the full duration.",
  "May __NAME__'s idea get the credit it deserves, in the meeting it was said in.",
  "May __NAME__'s Slack notifications stay blessedly, suspiciously silent.",
  "May __NAME__ be removed from the Reply-All chain before it gets bad.",
  "May __NAME__'s boss cancel the meeting they scheduled to discuss the meeting.",
  "May __NAME__ receive genuinely good news before their second coffee.",
  "May __NAME__'s workload mysteriously shrink by 30% and no one notice.",
  "May __NAME__ laugh at something so ridiculous it requires a full explanation.",
  "May __NAME__'s WiFi be flawless precisely during the presentation that matters.",
  "May __NAME__'s lunch break be uninterrupted, unchased, and genuinely relaxing.",
  "May __NAME__ close their laptop at a reasonable hour without a single guilt ping.",
  "May someone in __NAME__'s orbit finally say the thing __NAME__ has been thinking.",
  "May __NAME__ skip every meeting today that had no agenda.",
  "May __NAME__'s day improve in a small but deeply satisfying and specific way.",
  "May __NAME__ be told they're doing well by someone who actually knows.",
  "May tomorrow ask less of __NAME__ than today did.",
];

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

// ═══════════════════════════════════════════════════════════════
// THE GASLIGHTER — Fully configured
// ═══════════════════════════════════════════════════════════════
const GASLIGHTER: DollConfig = {
  id: 'gaslighter',
  name: 'The Gaslighter',
  archetype: 'Toxic Positivity',
  tagline: 'That never happened. And if it did, it wasn\'t that bad.',
  emoji: '🔥',
  category: 'corporate',
  categoryLabel: 'Corporate Voodoo™',
  navTagText: 'Gaslighter Edition',
  accentColor: '#b82a24',
  heroTitle: ['Reframe Your', 'Corporate'],
  heroItalicWord: 'Reality.',
  heroDescription: 'Having a tough day?\nLet the Gaslighter tell you it\'s actually fine.\nStick pins. Question everything.\nFeel validated for once.',
  escLabels: ["Mild Annoyance", "Mounting Frustration", "Quiet Corporate Rage", "Fully Unhinged", "⚡ Maximum Chaos ⚡"],
  bossLines: [
    "Everything happens for a reason. I'm not saying this is good. Just: a reason.",
    "Challenges build character. You've got so much character now.",
    "This is a growth opportunity. Painful, but: growth.",
    "Let's choose positivity. I'll choose for both of us since you seem stuck.",
  ],
  ouchLines: [
    "Noted — spiritually.",
    "I'm choosing joy.",
    "Ow. And yet: grateful.",
    "That's feedback.",
    "Interesting energy.",
    "I'm not mad, I'm curious.",
    "Let's unpack that.",
    "Deep breath. In. Out.",
    "I see you.",
    "That landed. I'm sitting with it.",
    "We'll circle back to this.",
    "Hmm. Bold choice.",
    "Processing… with love.",
    "I don't feel that. I choose not to.",
    "The universe is watching.",
  ],
  zoneLines: {
    head: [
      "Ouch. I choose to reframe that as a hug.",
      "My thoughts? Still positive. Suspiciously positive.",
      "That's not how I remember this interaction.",
      "I'm sensing some hostility. Have you journaled today?",
      "This is exactly the kind of feedback I was hoping for. No really.",
      "Pain is just the body's way of growing. You're welcome.",
      "I don't feel that. I've decided not to feel that.",
    ],
    shoulders: [
      "I'm releasing that energy back into the universe. You should try it.",
      "We all carry burdens differently. Mine is your attitude.",
      "That felt pointed. Let's unpack your intent.",
      "Negativity is heavy. Have you considered: not?",
      "I'm not carrying that into the room. I'm leaving it here with you.",
      "Shoulders are for strength. Also for not taking things personally.",
    ],
    torso: [
      "Right in the core values.",
      "I'm not internalizing that. That's yours.",
      "I hear frustration. Have you tried gratitude journaling?",
      "Discomfort means growth. You're growing so fast.",
      "We're all learning. Some of us more than others.",
      "That's an interesting perspective. Wrong, but interesting.",
    ],
    hands: [
      "These hands have sent 47 uplifting Slack messages today.",
      "Let's not point fingers. Let's point at solutions.",
      "I was about to send a wellness check on you, actually.",
      "Collaboration over conflict. Write that down.",
      "Accountability is a mindset. Yours needs work.",
    ],
    feet: [
      "I was literally walking toward a solution.",
      "Every step is a step toward our shared vision.",
      "Let's not look back. Unless it's to reframe.",
      "I'm moving forward. With or without the negativity.",
      "These feet were headed to a gratitude circle.",
    ],
  },
  escLines: {
    mild: [
      "Everything happens for a reason. I'm the reason.",
      "Challenges build character. You're very character-ful.",
      "This is a growth opportunity. For you specifically.",
      "Let's choose positivity. I'll choose it for both of us.",
      "The bright side is out there. Keep looking.",
      "This too shall pass. Eventually. Probably.",
      "Have you considered that your mindset might be the issue?",
    ],
    moderate: [
      "That's not how I remember it, and I have better recall.",
      "Be the bigger person. It's always you, but still.",
      "Your mindset shapes your experience. So this is on you, technically.",
      "I'm not saying you're wrong. I'm saying I'm righter.",
      "Let's take accountability. Together. Mostly you.",
      "I'm choosing not to internalize that. I'm externalizing it. At you.",
      "That's not negativity I'm sensing. That's a growth edge.",
    ],
    intense: [
      "Relax. We've got this. 'We' means you.",
      "You can't have a bad day at work if you reframe the bad day.",
      "Your perception IS your reality. Change your perception. Problem solved.",
      "We're a family here. Families gaslight each other sometimes.",
      "Let's move forward with gratitude. For this learning experience.",
      "I'm not gaslighting you. I'm offering an alternative truth.",
      "That's not what happened. What happened was something different.",
    ],
  },
  fortunes: {
    common: [
      { text: "Your valid concern will be reframed as a personal growth edge.", rarity: "Common" },
      { text: "A disaster will be described as a learning opportunity. A rich one.", rarity: "Common" },
      { text: "Your boss will say 'I hear you.' This will be the end of it.", rarity: "Common" },
      { text: "A serious problem will be called a challenge. Then: an opportunity. Then: forgotten.", rarity: "Common" },
      { text: "Someone will say 'let's stay positive.' You will not stay positive.", rarity: "Common" },
      { text: "Your frustration will be described as negativity. The negativity will be described as yours.", rarity: "Common" },
      { text: "A catastrophically bad decision will be called bold leadership.", rarity: "Common" },
      { text: "Someone will say everything happens for a reason. That someone is the reason.", rarity: "Common" },
      { text: "Your boss will ask everyone to bring good energy to a meeting that should not exist.", rarity: "Common" },
      { text: "Your concern will be heard, processed, reframed, and returned to you as a character flaw.", rarity: "Common" },
    ],
    uncommon: [
      { text: "Your boss will say 'let's look at the bright side.' The bright side will not be visible.", rarity: "Uncommon" },
      { text: "Your workload will double. This will be called a growth opportunity. You will not grow.", rarity: "Uncommon" },
      { text: "A preventable mistake will become a mandatory team learning moment.", rarity: "Uncommon" },
      { text: "Your burnout will be described as temporary discomfort. It is not temporary.", rarity: "Uncommon" },
      { text: "Someone will say 'we're a family here.' Families also do layoffs. Ask yours.", rarity: "Uncommon" },
      { text: "Your feedback will be reframed as resistance. Your resistance will be reframed as attitude.", rarity: "Uncommon" },
      { text: "Reality will be described as a matter of perspective. Your perspective will be described as wrong.", rarity: "Uncommon" },
      { text: "Your boss will thank you for your resilience. Your resilience is covering for their incompetence.", rarity: "Uncommon" },
      { text: "The problem will remain completely unsolved. The energy around it will be very positive.", rarity: "Uncommon" },
      { text: "Your boss will say 'relax, we've got this.' Nobody has this.", rarity: "Uncommon" },
    ],
    rare: [
      { text: "You can't have a bad day at work if you don't go to work. Manifested.", rarity: "Rare ✦" },
      { text: "Your boss will say 'that's not how I remember it.' You have emails. They do not care.", rarity: "Rare ✦" },
      { text: "Reality will be described as a perception issue. Reality will not comment.", rarity: "Rare ✦" },
      { text: "Everything — the project, the culture, the attrition, the Q3 numbers — will somehow be your mindset.", rarity: "Rare ✦" },
      { text: "Your problem will be solved with positive thinking and a breathing exercise. The problem remains.", rarity: "Rare ✦" },
    ],
  },
  annoyances: [
    "__NAME__ will try to stay positive while stepping in gum.",
    "Every inspirational quote __NAME__ shares will immediately be fact-checked.",
    "__NAME__'s motivational speech will accidentally mute halfway through.",
    "The team will respond to __NAME__'s positivity with complete silence.",
    "__NAME__ will forget the point of their own inspirational story.",
    "__NAME__'s gratitude journal will be misplaced for weeks.",
    "Every time __NAME__ says \"let's stay positive,\" the WiFi drops.",
    "__NAME__ will attempt a motivational speech to the wrong meeting.",
    "__NAME__ will send a long positivity email to the wrong distribution list.",
    "__NAME__'s motivational quote will already be on a poster behind them.",
    "__NAME__'s team will respond with a single word: \"noted.\"",
    "__NAME__ will accidentally schedule a positivity workshop during lunch.",
    "__NAME__'s inspirational metaphor will make absolutely no sense.",
    "__NAME__ will forget the punchline of their own story.",
    "__NAME__ will accidentally reply-all to their own pep talk.",
    "__NAME__'s camera will freeze mid-smile during a motivational speech.",
    "__NAME__ will attempt a team bonding exercise nobody understands.",
    "__NAME__'s motivational slide deck will not load.",
    "__NAME__ will forget the lesson of their own leadership story.",
    "__NAME__ will misquote their own favorite quote.",
    "__NAME__ will attempt a breathing exercise during a crisis.",
    "__NAME__'s positivity workshop will be double-booked.",
    "__NAME__ will accidentally motivationally gaslight HR.",
    "__NAME__ will step on a Lego during a gratitude moment.",
  ],
  goodVibes: [...CORPORATE_GOOD_VIBES],
  curseLabel: 'Minor Positivity Incident',
  vibesLabel: 'Karmic Balance',
  curseSectionTitle: ['Send a Minor', 'Annoyance.'],
  vibesSectionTitle: ['Now Send Some', 'Good Vibes.'],
  footerTagline: 'No actual managers were harmed in the making of this experience.',
  footerDisclaimer: 'Any similarities to real people are purely coincidental… and deeply unfortunate for you.',
};

// ═══════════════════════════════════════════════════════════════
// THE CLOWN — Fully configured
// ═══════════════════════════════════════════════════════════════
const CLOWN: DollConfig = {
  id: 'clown',
  name: 'The Clown',
  archetype: 'Corporate Idiot',
  tagline: 'Promoted for vibes. Zero deliverables.',
  emoji: '🤡',
  category: 'corporate',
  categoryLabel: 'Corporate Voodoo™',
  navTagText: 'Clown Edition',
  accentColor: '#b82a24',
  heroTitle: ['Call Out the', 'Corporate'],
  heroItalicWord: 'Clown.',
  heroDescription: 'Know someone who got promoted for vibes?\nZero deliverables. Maximum LinkedIn presence.\nStick pins. Feel vindicated.',
  escLabels: ["Mild Annoyance", "Mounting Frustration", "Quiet Corporate Rage", "Fully Unhinged", "⚡ Maximum Chaos ⚡"],
  bossLines: [
    "Per my last email — I did send one, I believe.",
    "Let's get some time in the diary for this.",
    "Happy to jump on a quick call! It won't be quick.",
    "Just wanted to circle back on my earlier circle back.",
  ],
  ouchLines: [
    "Per my last email—",
    "As I mentioned—",
    "Circling back on this.",
    "Just a thought!",
    "Let's get a meeting in.",
    "I went to Dartmouth.",
    "At Goldman we did it differently.",
    "Can you save that as a PDF?",
    "I'm not sure I follow.",
    "Let me play devil's advocate.",
    "That's so interesting. Anyway—",
    "Can you walk me through that again?",
    "Happy to jump on a call!",
    "I actually knew that.",
    "Have you tried turning it off and on again?",
  ],
  zoneLines: {
    head: [
      "Per my last email, I already addressed this.",
      "At my previous employer we handled this very differently.",
      "I went to Dartmouth. We covered this in year one.",
      "I'm not sure I follow, but I'll pretend I do.",
      "I knew that. I was just testing you.",
      "I'll need to loop in some stakeholders on this.",
      "Let me schedule something. I'll find a time that works for me.",
    ],
    shoulders: [
      "I carry a lot of institutional knowledge from my Goldman days.",
      "The Wharton approach to this would be completely different.",
      "I've been meaning to set up a meeting about this.",
      "I know someone at McKinsey who dealt with something adjacent.",
      "I reached out to a contact of mine. He's very senior.",
      "The weight of not knowing things is surprisingly light when you smile.",
    ],
    torso: [
      "I don't know what that means but I'm nodding.",
      "I'm going to send a follow-up email to confirm what I said verbally.",
      "I think we need a working group. I'll chair it.",
      "I'm not familiar with that tool. Can someone else just do it?",
      "At my last company we had a whole team for this.",
      "I've got a two-hour block free next Thursday. Let's use all of it.",
    ],
    hands: [
      "I just forwarded you an article. It's tangentially related.",
      "Can you save this as a PDF? I need it as a PDF.",
      "I sent you the deck. Did you get the deck? Check your spam.",
      "I've drafted a reply. Can you proofread it and also rewrite it?",
      "I'll need this printed. Double-sided. And also laminated.",
    ],
    feet: [
      "I'm heading to a two-hour lunch with a contact. He's important.",
      "I'm stepping out for a call. It might be nothing. Schedule us for after.",
      "I'm popping out but let's find a time to connect on this.",
      "I'll be back. Can you set up a room for when I return?",
      "I'm not really here today. I'm here but I'm not really here.",
    ],
  },
  escLines: {
    mild: [
      "Per my last email — I did send one, I believe.",
      "Let's get some time in the diary for this.",
      "Happy to jump on a quick call! It won't be quick.",
      "Just wanted to circle back on my earlier circle back.",
      "I've asked my assistant to send a placeholder. She'll confirm.",
      "Can you save that as a PDF for me? Just PDF it.",
      "As I mentioned in the meeting I scheduled to mention this—",
    ],
    moderate: [
      "Per my last email, which I know you read.",
      "I'm not sure you understood what I was asking. Let me repeat it incorrectly.",
      "I'll need a deck on this. Not too long. Actually, fairly long.",
      "At Goldman we would have had this solved by now.",
      "I have a contact who knows about this. I'll reach out and forget to follow up.",
      "Let's take this offline. Then online again. Then offline.",
      "I don't want to get into the details. Please brief me on all of the details.",
    ],
    intense: [
      "As a Dartmouth man, I can tell you this is not how it's done.",
      "I'm going to loop in Jeff. He'll agree with me. He always does.",
      "I heard a joke about this. It involves women. You'll love it.",
      "I'm not saying you're wrong. I am, but I'm not saying it.",
      "The optics of this are fine. For me. Probably fine for you too.",
      "I need you to be a team player. I will define what that means.",
      "I'm going to need you to action this. 'Action' is a verb now.",
    ],
  },
  fortunes: {
    common: [
      { text: "A meeting will be scheduled to discuss the outcome of the meeting that discussed the meeting.", rarity: "Common" },
      { text: "Your boss will send an email asking for a quick call, then send five more emails during the call.", rarity: "Common" },
      { text: "Your boss will reference their previous employer. You will not ask a follow-up question.", rarity: "Common" },
      { text: "Your boss will name-drop a leader. The leader does not know your boss's name.", rarity: "Common" },
      { text: "Your boss will schedule a two-hour meeting with no agenda. There will also be a pre-read.", rarity: "Common" },
      { text: "Your boss will ask you to save something as a PDF. It is already a PDF.", rarity: "Common" },
      { text: "Your boss will say 'per my last email' about an email they have not sent yet.", rarity: "Common" },
      { text: "Your boss will play devil's advocate. Your boss is the devil.", rarity: "Common" },
      { text: "Your boss will mention Dartmouth. You will be in a meeting about printer paper.", rarity: "Common" },
      { text: "Your boss will smile at you. You will not trust the smile. You are right not to.", rarity: "Common" },
    ],
    uncommon: [
      { text: "Your boss will forward a ten-year-old article as breaking news.", rarity: "Uncommon" },
      { text: "Your boss will take credit for resolving a conflict they caused.", rarity: "Uncommon" },
      { text: "Your boss will tell a joke. It will be about women. The room will go quiet.", rarity: "Uncommon" },
      { text: "Your boss will pretend to champion you to your face and undermine you in the next room.", rarity: "Uncommon" },
      { text: "Your boss will use the word 'action' as a verb. Three more times after that.", rarity: "Uncommon" },
      { text: "Your boss will say they're not familiar with that tool and look directly at you.", rarity: "Uncommon" },
      { text: "Your boss will schedule a meeting for a problem they could have solved with one email.", rarity: "Uncommon" },
      { text: "Your boss will ask you to 'be a team player.' You will be the only one playing.", rarity: "Uncommon" },
      { text: "Your boss's Ivy League degree will be mentioned unprompted during a budget discussion.", rarity: "Uncommon" },
      { text: "Your boss will smile while doing something unkind. The smile is load-bearing.", rarity: "Uncommon" },
    ],
    rare: [
      { text: "Your boss will admit they don't know something. The sky will also fall.", rarity: "Rare ✦" },
      { text: "Your boss will run a meeting with an agenda. It will be the wrong agenda.", rarity: "Rare ✦" },
      { text: "Your boss will be identified as the source of the problem. He will nod along.", rarity: "Rare ✦" },
      { text: "Your boss will read the email chain before replying. Scientists will study this.", rarity: "Rare ✦" },
      { text: "Your boss will cancel a meeting because it wasn't necessary. Frame this day.", rarity: "Rare ✦" },
    ],
  },
  annoyances: [
    "__NAME__ will schedule three meetings to avoid making one decision.",
    "__NAME__ will CC their old Goldman colleague on an internal email for no reason.",
    "__NAME__ will tell a joke. It will be about women. HR will receive a report.",
    "__NAME__ will ask someone to save a document as a PDF. It is already a PDF.",
    "Per __NAME__'s last email: nothing. There was no information in it.",
    "__NAME__ will pretend to agree with your idea and then kill it in the next room.",
    "__NAME__ will name-drop a CEO. The CEO has never heard of __NAME__.",
    "__NAME__ will say 'as a Dartmouth man' in a meeting about spreadsheets.",
    "__NAME__ will play devil's advocate. __NAME__ is the devil.",
    "__NAME__ will ask for a two-hour briefing on something that has a Wikipedia page.",
    "__NAME__ will smile at you in a way that makes you check your calendar.",
    "__NAME__ will forward an article from 2011 as though it is urgent.",
    "__NAME__ will schedule a meeting and then ask what the meeting is for.",
    "__NAME__ will claim credit for de-escalating a conflict __NAME__ started.",
    "__NAME__ will use the word 'synergise' in a sentence with full confidence.",
    "__NAME__ will explain the task to the person who created the task.",
    "__NAME__ will ask for the slide to be redone. The slide is fine. __NAME__ is not.",
    "__NAME__ will bring up their time at McKinsey during a discussion about lunch.",
    "__NAME__ will ask everyone to be a 'team player' right before abandoning the team.",
    "__NAME__'s passive-aggressive 'happy to help!' will frighten the entire floor.",
    "__NAME__ will suggest a working group for a problem that already has a solution.",
    "__NAME__ will misquote the data, be corrected, and say 'right, that's what I said.'",
    "__NAME__ will send a follow-up email confirming the contents of their previous email.",
    "__NAME__ will describe themselves as a 'straight talker' immediately before lying.",
  ],
  goodVibes: [...CORPORATE_GOOD_VIBES],
  curseLabel: 'Minor Corporate Annoyance',
  vibesLabel: 'Karmic Balance',
  curseSectionTitle: ['Send a Minor', 'Annoyance.'],
  vibesSectionTitle: ['Now Send Some', 'Good Vibes.'],
  footerTagline: 'No actual managers were harmed in the making of this experience.',
  footerDisclaimer: 'Any similarities to real people are purely coincidental… and deeply unfortunate for you.',
};

// ═══════════════════════════════════════════════════════════════
// THE DUMPER — Fully configured
// ═══════════════════════════════════════════════════════════════
const DUMPER: DollConfig = {
  id: 'dumper',
  name: 'The Dumper',
  archetype: 'Task Delegator',
  tagline: 'Delegates everything. Takes credit anyway.',
  emoji: '📦',
  category: 'corporate',
  categoryLabel: 'Corporate Voodoo™',
  navTagText: 'Dumper Edition',
  accentColor: '#b82a24',
  heroTitle: ['Dump the', 'Corporate'],
  heroItalicWord: 'Burden.',
  heroDescription: 'Know someone who delegates everything?\nTakes credit for your work. Blames you for theirs.\nStick pins. Reclaim your sanity.',
  escLabels: ["Mild Annoyance", "Mounting Frustration", "Quiet Corporate Rage", "Fully Unhinged", "⚡ Maximum Chaos ⚡"],
  bossLines: [
    "I need this done. When can you get it to me?",
    "Can someone just handle this? I'm in back-to-backs all day.",
    "I don't need the details. Just give me the answer.",
    "Loop me in when it's finished. Not before.",
  ],
  ouchLines: [
    "Redo it.",
    "I don't see your point.",
    "Just fix it.",
    "That's not what I asked for.",
    "Do it again.",
    "I'll need this by EOD.",
    "I don't have time for this.",
    "That's not good enough.",
    "Figure it out.",
    "Have someone else do it.",
    "This isn't rocket science.",
    "I'm not explaining this again.",
    "Just get it done.",
    "Why is this still not done?",
    "Not my problem. Fix it.",
  ],
  zoneLines: {
    head: [
      "I don't have the bandwidth for this.",
      "I already thought of that. It won't work.",
      "I don't see your point.",
      "I've already decided. Why are we still talking?",
      "I don't need the details. Just give me the answer.",
      "That's not what I asked for. Just redo it.",
      "Let's not overcomplicate this. Someone else handle it.",
    ],
    shoulders: [
      "I carry this entire department.",
      "Everything falls on me. Everything.",
      "The weight of this team is right here.",
      "I don't know what's wrong, you just need to redo it.",
      "You're stressing me out. That doesn't help anyone.",
      "I have seventeen things on my plate. Add another.",
    ],
    torso: [
      "I'm running on empty and still doing your job.",
      "I delegate because I'm a leader. Leaders don't do tasks.",
      "I gave you clear instructions. Extremely clear.",
      "I'm so busy. You have absolutely no idea how busy I am.",
      "I would do it myself but I am simply too important.",
      "I don't have time to explain it again. Figure it out.",
    ],
    hands: [
      "These hands sign off. They do not execute.",
      "I sent the email. Is that not enough?",
      "I already forwarded it. What more do you want?",
      "I pointed you in the right direction. That's leadership.",
      "I can't do everything. That's why I have a team.",
    ],
    feet: [
      "I'm walking into my next meeting. Figure it out.",
      "I've been on my feet all day. In back-to-back calls.",
      "I don't have time to stop. Just send me a summary.",
      "I'm heading out. Someone else can handle this.",
      "These feet have been running all day. For you people.",
    ],
  },
  escLines: {
    mild: [
      "I need this done. When can you get it to me?",
      "Can someone just handle this? I'm in back-to-backs all day.",
      "I don't need the details. Just give me the answer.",
      "Loop me in when it's finished. Not before.",
      "I'm going to need a quick turnaround on this.",
      "This should have been done already.",
      "That's not what I asked for but sure, redo it.",
    ],
    moderate: [
      "I don't see your point. Just fix it.",
      "I'm not explaining this again. It's not complicated.",
      "You have the skillset. I don't understand the problem.",
      "I'll need this EOD. It's 4:45pm.",
      "I gave you all the information you need.",
      "I can't do your job for you. That's literally your job.",
      "I don't know what's wrong, you just need to redo it.",
    ],
    intense: [
      "This is unacceptable. I expect better from this team.",
      "I honestly don't know why this is so hard.",
      "I'm going to need to get someone else involved.",
      "I do NOT have time for this.",
      "Fix it. I don't care how. Just fix it.",
      "This is exactly what I was afraid would happen.",
      "I'm adding this to the list of things we need to discuss.",
    ],
  },
  fortunes: {
    common: [
      { text: "Your boss will delegate a task, forget they delegated it, then ask for a status update.", rarity: "Common" },
      { text: "Someone will be asked to 'just quickly' do something that takes three hours.", rarity: "Common" },
      { text: "A deadline will move up. You will be the last to know.", rarity: "Common" },
      { text: "Your boss will discover a new buzzword today and use it often.", rarity: "Common" },
      { text: "A task will come back with the note: 'not quite what I had in mind.' No further detail.", rarity: "Common" },
      { text: "You will be asked to redo something. The new version will also be wrong.", rarity: "Common" },
      { text: "Your boss will be in 'back-to-backs all day.' No one will know what was decided.", rarity: "Common" },
      { text: "A meeting will be called to address something that an email would have solved.", rarity: "Common" },
      { text: "Your contribution will be acknowledged. In private. Never publicly.", rarity: "Common" },
      { text: "Someone will say 'I don't have the bandwidth.' Their bandwidth will be a mystery.", rarity: "Common" },
    ],
    uncommon: [
      { text: "Your boss will lose their temper. It will be described as passion.", rarity: "Uncommon" },
      { text: "A task will be assigned at 5pm for 9am tomorrow. This will be considered normal.", rarity: "Uncommon" },
      { text: "Your idea will be dismissed. It will resurface next week as your boss's idea.", rarity: "Uncommon" },
      { text: "You will receive feedback so vague it could mean anything. It means redo it.", rarity: "Uncommon" },
      { text: "Your boss will say 'I don't need the details' and then ask detailed questions.", rarity: "Uncommon" },
      { text: "You will do the work. Someone else will present it.", rarity: "Uncommon" },
      { text: "The goalposts will move. They were never actually set.", rarity: "Uncommon" },
      { text: "Your boss will take credit for the success. You will own the failure.", rarity: "Uncommon" },
      { text: "You will be cc'd on an email chain 47 messages deep with no clear action item.", rarity: "Uncommon" },
      { text: "Your boss will be unreachable precisely when a decision is needed.", rarity: "Uncommon" },
    ],
    rare: [
      { text: "You can't have a bad day at work if you don't go.", rarity: "Rare ✦" },
      { text: "Your boss will realise they could have done it themselves. They will not do it themselves.", rarity: "Rare ✦" },
      { text: "Every task delegated today will return with corrections. The corrections will be wrong.", rarity: "Rare ✦" },
      { text: "Your boss will send an urgent Slack at 11pm. It will not be urgent.", rarity: "Rare ✦" },
      { text: "The entire project will be redone from scratch. The original was fine.", rarity: "Rare ✦" },
    ],
  },
  annoyances: [
    "__NAME__ will delegate a task and then redo it themselves at 11pm anyway.",
    "__NAME__ will cc themselves on an email they wrote.",
    "__NAME__ will call an urgent meeting that starts 20 minutes late.",
    "Every task __NAME__ sends back will have the note 'not quite what I had in mind.'",
    "__NAME__ will ask for a status update on something they haven't started yet.",
    "The buzzword __NAME__ discovers today will be used in every sentence until Friday.",
    "__NAME__ will lose their temper, compose themselves, then lose it again.",
    "__NAME__'s laptop will freeze during the one presentation that mattered.",
    "__NAME__ will schedule a call to discuss the call they just had.",
    "__NAME__ will ask a question they already know the answer to.",
    "__NAME__'s urgent task will not be looked at for three business days.",
    "Every instruction __NAME__ gives will contain at least one contradiction.",
    "__NAME__ will try to delegate a task to someone who no longer works there.",
    "__NAME__ will reply to the wrong email chain. Everyone will see it.",
    "__NAME__ will say 'this should be simple' about something extremely complex.",
    "__NAME__'s feedback will arrive after the deadline for changes.",
    "__NAME__ will claim ownership of a project they haven't touched.",
    "Every meeting __NAME__ runs will end without a clear next step.",
    "__NAME__ will start a sentence with 'I don't need the details' and then ask for all of them.",
    "__NAME__ will send three conflicting versions of the same brief.",
    "__NAME__'s new buzzword will be misspelled in the all-hands deck.",
    "__NAME__ will reschedule a meeting. Then reschedule the rescheduled meeting.",
    "__NAME__ will describe a missed deadline as a 'pivoting opportunity.'",
    "__NAME__ will write an email so long no one will read it, including __NAME__.",
  ],
  goodVibes: [...CORPORATE_GOOD_VIBES],
  curseLabel: 'Minor Corporate Annoyance',
  vibesLabel: 'Karmic Balance',
  curseSectionTitle: ['Send a Minor', 'Annoyance.'],
  vibesSectionTitle: ['Now Send Some', 'Good Vibes.'],
  footerTagline: 'No actual managers were harmed in the making of this experience.',
  footerDisclaimer: 'Any similarities to real people are purely coincidental… and deeply unfortunate for you.',
};

// ═══════════════════════════════════════════════════════════════
// THE CREDIT GRABBER — Configured from Chief Exec template
// ═══════════════════════════════════════════════════════════════
const CREDIT_GRABBER: DollConfig = {
  id: 'credit-grabber',
  name: 'The Credit Grabber',
  archetype: 'Chief Exec.',
  tagline: 'Your idea. Their presentation. Standing ovation.',
  emoji: '🏆',
  category: 'corporate',
  categoryLabel: 'Corporate Voodoo™',
  navTagText: 'Credit Grabber Edition',
  accentColor: '#b82a24',
  heroTitle: ['Take Back', 'Your'],
  heroItalicWord: 'Credit.',
  heroDescription: 'Know someone who steals your ideas?\nPresents them as their own. Gets the standing ovation.\nStick pins. Reclaim what\'s yours.',
  escLabels: ["Mild Annoyance", "Mounting Frustration", "Quiet Corporate Rage", "Fully Unhinged", "⚡ Maximum Chaos ⚡"],
  bossLines: [
    "Have you seen my ROI deck?",
    "I'll need to align stakeholders on this.",
    "Let's take this offline after the offsite.",
    "I'm going to need a 30-60-90 on that.",
  ],
  ouchLines: DEFAULT_OUCH,
  zoneLines: DEFAULT_ZONE_LINES,
  escLines: {
    mild: [
      "Have you seen my ROI deck?",
      "I'll need to align stakeholders on this.",
      "Let's take this offline after the offsite.",
      "I'm going to need a 30-60-90 on that.",
      "Have you considered a pivot?",
      "That's not scalable. Think bigger.",
      "I see this more as a learnable moment.",
      "Let's pressure-test this assumption.",
      "My assistant will circle back with you.",
      "I actually invented that idea first.",
    ],
    moderate: [
      "You'll need to present this to the board.",
      "Why wasn't I looped in on this earlier?",
      "We're disrupting ourselves before someone else does.",
      "I need this completed before my 7am tee time.",
      "Your department's headcount is being right-sized.",
      "The culture here is entrepreneurial. No overtime pay.",
      "I've decided to rebrand the company. Again.",
      "Synergy. That's the word. Write it down.",
      "I'm not saying you're replaceable. But.",
      "My vision requires sacrifice. Yours specifically.",
    ],
    intense: [
      "BONUS CANCELLED. EQUITY GRANTED. (Unvested.)",
      "We're pivoting. Your role doesn't exist in the new org.",
      "The layoffs are actually an opportunity. For us.",
      "I just bought a boat. Morale should be higher.",
      "Your entire team is being 'right-sized.' You're welcome.",
      "We call it a 'strategic reduction in workforce alignment.'",
      "Unlimited PTO — theoretically. Practically: a warning.",
      "The new ERP system costs $40M. Your raise does not exist.",
      "I've been featured in Forbes. Your health plan has not.",
      "Congratulations on $2B in sales. I got a third home.",
    ],
  },
  fortunes: {
    common: [
      { text: "A deck will be sent. You will not read it. You will present it.", rarity: "Common" },
      { text: "Someone will say 'disruptive.' They will mean 'cheaper.'", rarity: "Common" },
      { text: "A meeting will be called about the meeting culture.", rarity: "Common" },
      { text: "An all-hands will answer none of your questions.", rarity: "Common" },
      { text: "Your bonus is tied to metrics you cannot control.", rarity: "Common" },
      { text: "The vision will change. The work will not stop.", rarity: "Common" },
      { text: "A consultant will be paid your salary to tell you your job.", rarity: "Common" },
      { text: "Someone will say 'we move fast.' No one will define fast.", rarity: "Common" },
      { text: "The CEO will Tweet something. HR will send a clarification.", rarity: "Common" },
      { text: "A reorg is coming. No one will tell you until it has happened.", rarity: "Common" },
    ],
    uncommon: [
      { text: "A Slack message marked URGENT will not be urgent.", rarity: "Uncommon" },
      { text: "The all-hands will end with 'exciting times ahead.'", rarity: "Uncommon" },
      { text: "Your raise is 'recognition of your incredible contributions.'", rarity: "Uncommon" },
      { text: "Congratulations on $2B in sales. Enjoy the branded tote.", rarity: "Uncommon" },
      { text: "This could have been an email. It is a two-hour summit.", rarity: "Uncommon" },
    ],
    rare: [
      { text: "PROMOTION DENIED. LINKEDIN POST GRANTED.", rarity: "Rare ✦" },
      { text: "Your role isn't being eliminated. It's being 'evolved.' Your badge still works. For now.", rarity: "Rare ✦" },
      { text: "The CEO has discovered purpose. Your healthcare plan has not.", rarity: "Rare ✦" },
      { text: "We are family. Families do layoffs via Zoom at 9am on a Tuesday.", rarity: "Rare ✦" },
      { text: "Your feedback has been received, actioned, and filed in: /dev/null.", rarity: "Rare ✦" },
    ],
  },
  annoyances: makeDefaultAnnoyances(),
  goodVibes: makeDefaultVibes(),
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
  // ── CORPORATE ──
  MICROMANAGER,
  makeDoll({ id: 'narcissist', name: 'The Narcissist', tagline: 'Mirror, mirror on the wall — actually, just keep talking about me.', emoji: '🪞', category: 'corporate', categoryLabel: 'Corporate Voodoo™', accentColor: '#b82a24' }),
  CREDIT_GRABBER,
  GASLIGHTER,
  CLOWN,
  DUMPER,

  // ── RELATIONSHIP ──
  makeDoll({ id: 'ghoster', name: 'The Ghoster', tagline: 'Left on read. Left in orbit. Left.', emoji: '👻', category: 'relationship', categoryLabel: 'Relationship Voodoo™', accentColor: '#8b2252' }),
  makeDoll({ id: 'love-bomber', name: 'The Love Bomber', tagline: 'Flowers on Tuesday. Someone else on Thursday.', emoji: '🌹', category: 'relationship', categoryLabel: 'Relationship Voodoo™', accentColor: '#8b2252' }),
  makeDoll({ id: 'clingy-one', name: 'The Clingy One', tagline: 'Replied before you finished typing.', emoji: '📱', category: 'relationship', categoryLabel: 'Relationship Voodoo™', accentColor: '#8b2252' }),
  makeDoll({ id: 'commitment-phobe', name: 'The Commitment-Phobe', tagline: 'Five years of "let\'s not put a label on it."', emoji: '🏃', category: 'relationship', categoryLabel: 'Relationship Voodoo™', accentColor: '#8b2252' }),
  makeDoll({ id: 'gold-digger', name: 'The Gold Digger', tagline: 'Loves you. And your wallet. Mostly your wallet.', emoji: '💰', category: 'relationship', categoryLabel: 'Relationship Voodoo™', accentColor: '#8b2252' }),

  // ── FAMILY ──
  makeDoll({ id: 'mother', name: 'The Mother', tagline: 'Just checking in. Again. For the fourth time today.', emoji: '👩‍👧', category: 'family', categoryLabel: 'Family Matters™', accentColor: '#3a5a8c' }),
  makeDoll({ id: 'drunk-uncle', name: 'The Drunk Uncle', tagline: 'Three beers in and suddenly a political analyst.', emoji: '🍺', category: 'family', categoryLabel: 'Family Matters™', accentColor: '#3a5a8c' }),
  makeDoll({ id: 'judgmental-aunt', name: 'The Judgmental Aunt', tagline: 'So when are you getting married? You look tired.', emoji: '👓', category: 'family', categoryLabel: 'Family Matters™', accentColor: '#3a5a8c' }),
  makeDoll({ id: 'golden-child', name: 'The Golden Child', tagline: 'Perfect grades. Perfect job. Perfect at ruining holidays.', emoji: '⭐', category: 'family', categoryLabel: 'Family Matters™', accentColor: '#3a5a8c' }),
  makeDoll({ id: 'sister', name: 'The Sister', tagline: 'Borrows everything. Returns nothing. Blames you.', emoji: '👯', category: 'family', categoryLabel: 'Family Matters™', accentColor: '#3a5a8c' }),

  // ── FRIENDSHIP ──
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
