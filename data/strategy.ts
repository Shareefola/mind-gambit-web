export interface StrategyLesson {
  id: string;
  title: string;
  subtitle: string;
  category: 'Pawn Structure' | 'Piece Activity' | 'Planning' | 'Defense';
  difficulty: 'Intermediate' | 'Advanced';
  concept: string;
  sections: StrategySection[];
  keyPrinciples: string[];
  masterExample?: {
    title: string;
    description: string;
    fen: string;
    arrows?: { from: string; to: string; color: 'gold' | 'green' | 'red' | 'blue' }[];
  };
}

export interface StrategySection {
  title: string;
  content: string;
  fen: string;
  arrows?: { from: string; to: string; color: 'gold' | 'green' | 'red' | 'blue' }[];
  highlights?: Record<string, string>;
}

export const STRATEGY_LESSONS: StrategyLesson[] = [
  {
    id: 'passed-pawns',
    title: 'Passed Pawns',
    subtitle: 'The most powerful pawn in chess — and how to use it',
    category: 'Pawn Structure',
    difficulty: 'Intermediate',
    concept: 'A passed pawn is one with no enemy pawns in front of it or on adjacent files. It cannot be stopped by a pawn — only pieces. Passed pawns are a long-term structural advantage because they constantly threaten to promote.',
    keyPrinciples: [
      'Passed pawns must be pushed — a passed pawn is most dangerous when advanced',
      'A protected passed pawn supported by the King in the endgame is usually decisive',
      'Two connected passed pawns are usually stronger than a Rook',
      'The enemy must commit pieces to blockade a passed pawn, limiting their activity',
    ],
    sections: [
      {
        title: 'Creating a Passed Pawn',
        content: 'A passed pawn is created through a pawn majority — having more pawns than the opponent on one side of the board. When you advance your majority, one of your pawns will eventually outrun the opponent\'s pawns and become passed. A 3 vs 2 queenside majority, for instance, will always create a passed pawn with correct technique.',
        fen: '8/2pp4/8/3PP3/8/8/8/8 w - - 0 1',
        arrows: [
          { from: 'd5', to: 'd6', color: 'gold' },
          { from: 'e5', to: 'e6', color: 'gold' },
        ],
      },
      {
        title: 'The Passed Pawn as a Threat',
        content: 'An advanced passed pawn forces the opponent to commit a Rook or other piece to blockade it. This limits the activity of that piece and gives you a free hand elsewhere on the board. Nimzowitsch called a blockaded passed pawn "a thorn in the enemy position." The pawn itself doesn\'t move — but it cramps and restricts.',
        fen: '4r1k1/pp3ppp/8/3P4/8/8/PP3PPP/4R1K1 w - - 0 1',
        highlights: { d5: 'rgba(212,168,83,0.4)' },
        arrows: [{ from: 'd5', to: 'd6', color: 'gold' }],
      },
      {
        title: 'Promoting the Passed Pawn',
        content: 'In the endgame, a far-advanced passed pawn supported by the King is often decisive. The enemy must sacrifice material to stop promotion or allow the pawn to queen. When you have a passed pawn, simplify the position — trade pieces, not pawns — and march toward promotion.',
        fen: '8/8/8/8/8/5k2/6P1/6K1 w - - 0 1',
        arrows: [{ from: 'g2', to: 'g8', color: 'gold' }],
      },
    ],
    masterExample: {
      title: 'Capablanca\'s Endgame Technique',
      description: 'Jose Raul Capablanca was the greatest endgame player in history. His games frequently featured the elegant exploitation of passed pawns. In this typical Capablanca structure, a queenside passed pawn supported by an active King decides the game through the threat of promotion — forcing Black to abandon kingside defense.',
      fen: '8/5pk1/6p1/1P6/8/5K2/8/8 w - - 0 1',
      arrows: [{ from: 'b5', to: 'b7', color: 'gold' }],
    },
  },
  {
    id: 'doubled-pawns',
    title: 'Doubled Pawns',
    subtitle: 'When they\'re weak, when they\'re acceptable, and when they\'re actually good',
    category: 'Pawn Structure',
    difficulty: 'Intermediate',
    concept: 'Doubled pawns are two pawns of the same color on the same file. They are generally considered a weakness because they cannot protect each other, they can only be defended by pieces (not other pawns), and they often create backward pawns. However, doubled pawns aren\'t always bad — context matters enormously.',
    keyPrinciples: [
      'Doubled pawns become weak when they are isolated or on an open file',
      'Doubled pawns can be acceptable if they provide compensation — open files, extra piece activity',
      'In the Nimzo-Indian, Black often accepts doubled pawns to destroy White\'s pawn structure',
      'Attack the base of doubled pawns — the rear pawn is usually more vulnerable',
    ],
    sections: [
      {
        title: 'When Doubled Pawns Are Weak',
        content: 'Doubled pawns are most vulnerable when isolated (no supporting pawns on adjacent files) or on an open file where Rooks can attack them. The classic "damaged majority" occurs when doubled pawns on one side cannot generate a passed pawn — even with three pawns vs two, the extra pawn is worthless.',
        fen: 'r1bq1rk1/pp3ppp/2np1n2/4p3/2B1P3/2PP1N2/P4PPP/R1BQ1RK1 w - - 0 9',
        highlights: {
          c2: 'rgba(224,82,82,0.25)',
          c3: 'rgba(224,82,82,0.25)',
        },
      },
      {
        title: 'The Nimzo-Indian: Compensation for Doubles',
        content: 'In the Nimzo-Indian Defense, Black plays Bb4 and later Bxc3, doubling White\'s c-pawns. But this is not automatically bad for White — the open b-file, the two Bishops, and strong central control can compensate. This demonstrates that pawn structure must always be evaluated alongside piece activity, not in isolation.',
        fen: 'r1bq1rk1/ppp2ppp/2n5/3pp3/1bPP4/2NBP3/PP3PPP/R1BQ1RK1 w - - 2 9',
        highlights: {
          c3: 'rgba(212,168,83,0.3)',
          c4: 'rgba(212,168,83,0.3)',
        },
        arrows: [{ from: 'b1', to: 'c3', color: 'blue' }],
      },
      {
        title: 'Attacking Doubled Pawns',
        content: 'When your opponent has doubled pawns, the strategy is clear: attack them with Rooks, keep them under permanent pressure, and prevent them from advancing and consolidating. Force them onto open files. The player with doubled pawns must keep pieces active to compensate — simplification usually favors the side without them.',
        fen: '4r1k1/5ppp/2p5/2p5/8/8/5PPP/4R1K1 w - - 0 1',
        arrows: [{ from: 'e1', to: 'e5', color: 'gold' }],
        highlights: {
          c5: 'rgba(224,82,82,0.3)',
          c6: 'rgba(224,82,82,0.3)',
        },
      },
    ],
    masterExample: {
      title: 'The Doubled c-Pawns as Dynamic Compensation',
      description: 'World Championship games have been decided by the question of whether doubled pawns provide enough compensation. In the Nimzo-Indian structures that arose in Kasparov vs Karpov matches, the doubled c-pawns for White were often compensated by the two Bishops and open lines. This position illustrates the tension.',
      fen: 'r2q1rk1/pp3ppp/2n1pn2/3p4/1bPP4/2NBP3/PP2QPPP/R1B2RK1 b - - 4 12',
      arrows: [
        { from: 'b4', to: 'c3', color: 'red' },
        { from: 'c1', to: 'g5', color: 'gold' },
      ],
    },
  },
  {
    id: 'isolated-pawn',
    title: 'The Isolated Queen Pawn',
    subtitle: 'Chess\'s most double-edged pawn structure',
    category: 'Pawn Structure',
    difficulty: 'Intermediate',
    concept: 'The isolated Queen pawn (IQP) occurs when the d-pawn has no pawns on the c or e files to support it. It\'s a structural weakness — the pawn cannot be defended by another pawn and often requires a piece to guard it. But the IQP also provides dynamic compensation: open c and e files, active piece play, and often a powerful d5 advance.',
    keyPrinciples: [
      'The IQP is simultaneously a weakness and a source of dynamic activity',
      'With the IQP: attack, attack, attack — don\'t let the position simplify',
      'Against the IQP: blockade it with a piece on d5, then target it',
      'The d5 advance is the IQP player\'s most important tactical threat',
    ],
    sections: [
      {
        title: 'The IQP Position',
        content: 'The isolated Queen pawn arises frequently from the Queen\'s Gambit Accepted, the Caro-Kann, and other openings. White has a d-pawn on d4 with no c or e pawn. The c and e files are semi-open, giving Rooks active posts. The pieces have more space and mobility, but the pawn itself needs constant attention.',
        fen: 'r1bqr1k1/pp3ppp/2n2n2/3p4/3P4/2NB1N2/PP3PPP/R1BQR1K1 w - - 0 12',
        highlights: {
          d4: 'rgba(212,168,83,0.4)',
          c5: 'rgba(91,155,213,0.25)',
          e5: 'rgba(91,155,213,0.25)',
        },
      },
      {
        title: 'Playing WITH the IQP — Attack',
        content: 'If you have the isolated pawn, you must play actively. The IQP provides space and open lines — use them. Typical plans: centralize all pieces on active squares, launch a kingside attack with f3-f4-f5 or Ng5, play the thematic d4-d5 advance to open lines and create tactics. Simplification is your enemy — keep pieces on the board.',
        fen: 'r1bqr1k1/pp3ppp/2n5/3p2N1/3P4/2NB4/PP3PPP/R1BQR1K1 w - - 2 14',
        arrows: [
          { from: 'd4', to: 'd5', color: 'gold' },
          { from: 'g5', to: 'f7', color: 'red' },
        ],
      },
      {
        title: 'Playing AGAINST the IQP — Blockade',
        content: 'To play against the IQP: first blockade it with a piece on d5 (usually a Knight) so it cannot advance. This piece becomes very powerful — it\'s safe from pawn attack and sits in the center. Then trade pieces — each trade makes the pawn weaker in the endgame. Target the pawn with Rooks on the d-file.',
        fen: 'r1bqr1k1/pp3ppp/2n2n2/3N4/3P4/2PB4/PP3PPP/R1BQR1K1 b - - 0 12',
        highlights: { d5: 'rgba(76,175,125,0.4)' },
        arrows: [
          { from: 'd8', to: 'd4', color: 'red' },
          { from: 'f6', to: 'd5', color: 'green' },
        ],
      },
    ],
    masterExample: {
      title: 'Kasparov\'s Brilliant IQP Attack',
      description: 'Garry Kasparov was the supreme master of the IQP. In countless games, he demonstrated that the isolated pawn\'s dynamic activity could compensate for its structural weakness. His typical approach: rapidly develop all pieces to active squares, threaten d5, and launch a direct kingside attack before the opponent can coordinate defense.',
      fen: 'r1bqr1k1/pp3ppp/2n2n2/3p2B1/3P4/2NB1N2/PP2QPPP/R4RK1 w - - 6 14',
      arrows: [
        { from: 'd4', to: 'd5', color: 'gold' },
        { from: 'g5', to: 'h6', color: 'red' },
        { from: 'e2', to: 'e4', color: 'green' },
      ],
    },
  },
  {
    id: 'outpost-squares',
    title: 'Outpost Squares',
    subtitle: 'Creating and occupying permanent homes for your pieces',
    category: 'Piece Activity',
    difficulty: 'Intermediate',
    concept: 'An outpost is a square in the opponent\'s half of the board that cannot be attacked by enemy pawns. A piece on an outpost — especially a Knight — is extremely powerful because it cannot be driven away by pawns and sits in the heart of the position. Creating outposts and occupying them is a fundamental positional skill.',
    keyPrinciples: [
      'A Knight on an outpost in the center or opponent\'s half is often worth more than a Bishop',
      'Create outposts by exchanging or advancing pawns that guard key squares',
      'A Knight on d5 or e5 (for White) anchored by no enemy pawns is a dream piece',
      'To destroy an outpost: trade the piece occupying it or advance to attack it',
    ],
    sections: [
      {
        title: 'What Makes an Outpost',
        content: 'An outpost is a square in the opponent\'s territory that cannot be attacked by enemy pawns — because there are no enemy pawns on the adjacent files, or because those pawns have advanced past the critical square. The e5 square for White is a classic outpost if Black has no d6 or f6 pawn to challenge it.',
        fen: 'r1bq1rk1/pp3ppp/2n5/3pN3/3P4/2N5/PP3PPP/R1BQKB1R w KQ - 0 10',
        highlights: { e5: 'rgba(212,168,83,0.5)' },
        arrows: [
          { from: 'd5', to: 'e5', color: 'red' },
          { from: 'f7', to: 'e5', color: 'red' },
        ],
      },
      {
        title: 'Establishing the Knight Outpost',
        content: 'The most dramatic outpost is a Knight on the 5th rank, especially d5 or e5 for White. Such a Knight controls critical central squares, cannot be attacked by pawns, threatens multiple pieces simultaneously, and often requires the opponent to sacrifice material to dislodge it. Nimzowitsch called such a piece "a Knight on the rim is dim — but a Knight in the center is supreme."',
        fen: 'r1bq1rk1/pp3ppp/2p2n2/3Np3/3P4/4B3/PP3PPP/R2QKBNR w KQ - 0 11',
        highlights: { d5: 'rgba(212,168,83,0.5)' },
        arrows: [{ from: 'd5', to: 'c7', color: 'red' }],
      },
      {
        title: 'Fighting for the Outpost',
        content: 'Good players fight to establish and maintain outposts — and fight equally hard to prevent the opponent from establishing them. The classic battle: one side pushes a pawn to create an outpost (e.g., f4-f5 to clear e5), the other side tries to eliminate the outpost piece with a trade or pawn advance. Whoever wins this fight often wins the game.',
        fen: 'r1bq1rk1/pp3ppp/2n2n2/3pp3/2PP4/2N1BN2/PP3PPP/R2QKB1R w KQ - 2 9',
        arrows: [
          { from: 'f3', to: 'e5', color: 'gold' },
          { from: 'c6', to: 'e5', color: 'red' },
        ],
      },
    ],
    masterExample: {
      title: 'Karpov\'s Legendary Knight Outpost',
      description: 'Anatoly Karpov was the greatest positional player in chess history. In countless games, he maneuvered Knights to perfect central outposts and then slowly strangled his opponents. His motto: "First restrain, then blockade, then destroy." The Knight on d6 in these types of positions is immune to attack and controls the entire board.',
      fen: '2r3k1/pp3ppp/3N4/3pp3/8/8/PP3PPP/2R3K1 w - - 0 24',
      highlights: { d6: 'rgba(212,168,83,0.5)' },
      arrows: [{ from: 'd6', to: 'c8', color: 'red' }],
    },
  },
  {
    id: 'two-weaknesses',
    title: 'The Principle of Two Weaknesses',
    subtitle: 'How to convert a small advantage into a win',
    category: 'Planning',
    difficulty: 'Advanced',
    concept: 'One weakness alone is rarely enough to win a game — the defender can concentrate all their forces on defending it. The key to converting a small advantage is to create a SECOND weakness on the other side of the board. With two weaknesses to defend, the opponent\'s pieces are overstretched and eventually something falls.',
    keyPrinciples: [
      'One weakness can usually be defended indefinitely',
      'Two weaknesses on opposite sides of the board cannot both be defended',
      'Create the second weakness by attacking the other wing when the defender is tied down',
      'This principle explains why Rook endings with one pawn advantage are often drawn',
    ],
    sections: [
      {
        title: 'Why One Weakness Isn\'t Enough',
        content: 'Imagine your opponent has a weak pawn on c6. You attack it with a Rook — they defend with a Rook. You bring your King — they bring their King. Everything is balanced. The defender can always meet your attack with the corresponding defense. One weakness is a target; two weaknesses are a vice that cannot be escaped.',
        fen: '8/5k2/2p5/8/8/5K2/8/3R4 w - - 0 1',
        highlights: { c6: 'rgba(212,168,83,0.35)' },
      },
      {
        title: 'Creating the Second Weakness',
        content: 'When you have the winning position, fix the first weakness (keep it under permanent threat without necessarily winning it), then use your superior piece activity to attack the other wing. The opponent must make a choice: abandon the first weakness to defend the second, or keep defending the first and lose the second. Either way, material falls.',
        fen: '8/2p2k2/2p3p1/8/6P1/8/P4K2/8 w - - 0 1',
        arrows: [
          { from: 'g4', to: 'g5', color: 'gold' },
          { from: 'a2', to: 'a4', color: 'green' },
        ],
        highlights: {
          c7: 'rgba(224,82,82,0.25)',
          c6: 'rgba(224,82,82,0.25)',
          g6: 'rgba(212,168,83,0.25)',
        },
      },
      {
        title: 'The Principle in Practice',
        content: 'In practice, the two-weakness principle looks like this: you have a better position (maybe a passed pawn or better piece). You attack one side, forcing the opponent to commit their Rook to defense. Then you open the other side with a pawn break. The opponent\'s Rook is too far away, and the second front collapses.',
        fen: '5k2/1p4pp/p7/4R3/8/4K3/PP4PP/8 w - - 0 1',
        arrows: [
          { from: 'e5', to: 'a5', color: 'gold' },
          { from: 'g2', to: 'g4', color: 'green' },
        ],
      },
    ],
    masterExample: {
      title: 'Capablanca\'s Technical Mastery',
      description: 'Capablanca won many games by creating two weaknesses on opposite sides of the board, then shuttling between them faster than his opponent could defend. His opponents would desperately try to consolidate, but the two-front pressure was invariably decisive. This position illustrates his typical technique.',
      fen: '8/pp1k4/2p5/3pP3/3P4/P4K2/1P6/8 w - - 0 1',
      arrows: [
        { from: 'f3', to: 'e4', color: 'gold' },
        { from: 'a3', to: 'a4', color: 'green' },
      ],
    },
  },
  {
    id: 'rook-activity',
    title: 'Rook Activity — Open Files and the 7th Rank',
    subtitle: 'Putting your most powerful pieces to work',
    category: 'Piece Activity',
    difficulty: 'Intermediate',
    concept: 'Rooks are the strongest pieces after the Queen, but they need open files to work. A Rook on a closed file contributes nothing. Rooks should be placed on open files (no pawns of either color), half-open files (no own pawns), or — most powerfully — on the 7th rank where they attack enemy pawns and can restrict the enemy King.',
    keyPrinciples: [
      'Open files are highways for Rooks — fight to control them',
      'Two Rooks on the 7th rank ("pigs on the 7th") can often force checkmate alone',
      'A Rook on the 7th rank simultaneously attacks pawns and restricts the King',
      'Doubling Rooks on an open file creates overwhelming pressure',
    ],
    sections: [
      {
        title: 'Seizing the Open File',
        content: 'When a file is opened (by an exchange or pawn advance), rush to occupy it with your Rook. If your opponent gets there first, fight to drive them off or control the file at least partially. The Rook on an open file can infiltrate to the 7th or 8th rank, attack backward pawns, and create constant threats.',
        fen: 'r1b2rk1/pp3ppp/2n2n2/3p4/3P4/2N2N2/PP3PPP/R1B1R1K1 w - - 0 12',
        arrows: [
          { from: 'e1', to: 'e8', color: 'gold' },
          { from: 'a1', to: 'd1', color: 'green' },
        ],
      },
      {
        title: 'Rooks on the 7th Rank',
        content: 'A Rook on the 7th rank (for White) is devastating — it attacks all enemy pawns that haven\'t moved from their starting positions, restricts the King to the 8th rank, and often teams up with the other Rook for a mating attack. Two Rooks on the 7th rank can often force checkmate regardless of material.',
        fen: '6k1/RR6/8/8/8/8/8/6K1 w - - 0 1',
        arrows: [{ from: 'a7', to: 'h7', color: 'gold' }],
        highlights: { a7: 'rgba(212,168,83,0.3)', b7: 'rgba(212,168,83,0.3)' },
      },
      {
        title: 'The Active Rook vs Passive Rook',
        content: 'Compare an active Rook (on an open file, attacking pawns, penetrating to the 7th rank) with a passive Rook (defending a weakness, stuck behind pawns). The player with the active Rook has an enormous practical advantage. Even in "balanced" positions, Rook activity often determines the outcome.',
        fen: '6k1/pp3ppp/8/8/8/8/PP3PPP/1R4K1 w - - 0 1',
        arrows: [{ from: 'b1', to: 'b7', color: 'gold' }],
      },
    ],
    masterExample: {
      title: 'Alekhine\'s Brilliant Rook Penetration',
      description: 'Alexander Alekhine was famous for his dynamic piece play, especially with Rooks. In this type of position, Alekhine would sacrifice a pawn to open a file, get both Rooks to penetrating squares, and create threats faster than his opponents could respond. The active Rooks dominate the passive ones.',
      fen: '1r4k1/1r3ppp/8/8/8/8/PP3PPP/RR4K1 w - - 0 1',
      arrows: [
        { from: 'a1', to: 'a7', color: 'gold' },
        { from: 'b1', to: 'b7', color: 'gold' },
      ],
    },
  },
];

export function getStrategyLessonById(id: string): StrategyLesson | undefined {
  return STRATEGY_LESSONS.find(l => l.id === id);
}

export const STRATEGY_CATEGORIES = [...new Set(STRATEGY_LESSONS.map(l => l.category))];
