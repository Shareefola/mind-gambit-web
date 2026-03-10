export interface EndgamePosition {
  id: string;
  title: string;
  category: 'King & Pawn' | 'Rook Endings' | 'Queen vs Pawn' | 'King & Rook vs King' | 'Bishop Endings' | 'Knight Endings';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  fen: string;
  objective: string;
  sideToMove: 'White' | 'Black';
  concept: string;
  keyIdea: string;
  solution: string[]; // UCI moves
  explanation: string;
  tips: string[];
  arrows?: { from: string; to: string; color: 'gold' | 'green' | 'red' | 'blue' }[];
  highlights?: Record<string, string>;
}

export const ENDGAMES: EndgamePosition[] = [
  {
    id: 'kp-opposition',
    title: 'King & Pawn: The Opposition',
    category: 'King & Pawn',
    difficulty: 'Beginner',
    fen: '8/8/8/8/8/4k3/4P3/4K3 w - - 0 1',
    objective: 'White to move and win — advance the pawn to promotion',
    sideToMove: 'White',
    concept: 'Opposition',
    keyIdea: 'In King and Pawn endings, the King must lead the pawn. When two Kings face each other with one square between them, the player who does NOT have to move is said to have the "opposition." Having the opposition forces the enemy King to yield ground.',
    solution: ['e1e2', 'e3e4', 'e2e3', 'e4e5', 'e3f3', 'e5d5', 'f3e3', 'd5e5', 'e3d3', 'e5f5', 'd3e3', 'f5e5', 'e3f3'],
    explanation: 'The key is for White\'s King to take the opposition (face the Black King with one square between them) so the Black King is forced to step aside. Then the White King advances and escorts the pawn safely to promotion. With correct play, White wins because the King gets in front of the pawn.',
    tips: [
      'The King must get in front of the pawn — a pawn cannot promote without King support',
      'Opposition means the Kings face each other with an odd number of squares between them',
      'The player who does NOT have to move has the opposition',
    ],
    arrows: [{ from: 'e1', to: 'e2', color: 'gold' }],
    highlights: { e3: 'rgba(224,82,82,0.3)', e2: 'rgba(212,168,83,0.3)' },
  },
  {
    id: 'kp-key-squares',
    title: 'Key Squares of a Pawn',
    category: 'King & Pawn',
    difficulty: 'Beginner',
    fen: '8/8/8/8/3k4/8/3P4/3K4 w - - 0 1',
    objective: 'White to move and win — reach the key squares',
    sideToMove: 'White',
    concept: 'Key Squares',
    keyIdea: 'Every pawn has "key squares" — squares that, if the attacking King reaches them, guarantee promotion regardless of where the defending King is. For a d-pawn, the key squares are c6, d6, and e6 (the squares two ranks ahead of the pawn). If White\'s King reaches any of these, it\'s a guaranteed win.',
    solution: ['d1e2', 'd4e4', 'e2e3', 'e4d5', 'e3d3', 'd5e5', 'd3c4', 'e5e4', 'c4c5', 'e4e5', 'c5d6'],
    explanation: 'The key squares for a d-pawn (d4 in this case) are c6, d6, and e6. White\'s King needs to reach any one of these. Once on d6, the pawn promotes with ease regardless of Black\'s King position. The winning plan is to march the King toward these key squares while keeping it ahead of the pawn.',
    tips: [
      'Know your key squares before planning the King march',
      'Center pawns (c, d, e, f) have three key squares two ranks ahead',
      'Rook pawns (a, h) are special — they can only draw in many positions',
    ],
    highlights: { c6: 'rgba(212,168,83,0.4)', d6: 'rgba(212,168,83,0.4)', e6: 'rgba(212,168,83,0.4)' },
    arrows: [{ from: 'd1', to: 'd6', color: 'gold' }],
  },
  {
    id: 'kp-drawn-rook-pawn',
    title: 'The Drawn Rook Pawn',
    category: 'King & Pawn',
    difficulty: 'Beginner',
    fen: '8/8/8/8/8/7k/7P/7K w - - 0 1',
    objective: 'This position is a DRAW with best play — understand why',
    sideToMove: 'White',
    concept: 'Rook Pawn Exception',
    keyIdea: 'Rook pawns (a-pawn and h-pawn) are the great exception to normal King and Pawn theory. Even if White\'s King reaches the key squares (g7 or h7 for an h-pawn), it\'s still a draw — because the promotion square (h8) is a different color than the Bishop would be, and the defending King can sit on h8 forever with stalemate threats.',
    solution: ['h1g2', 'h3g4', 'g2h3', 'g4h5', 'h3g3', 'h5g6', 'g3g4', 'g6h6', 'g4h4'],
    explanation: 'The Black King simply shuttles between g8 and h8. When White\'s King advances, Black heads for the corner. On h8, the Black King is stalemated if White plays h8=Q. White cannot make progress — the rook pawn always draws with this defensive technique when the defending King can reach the corner.',
    tips: [
      'Always check if your pawn is an a or h pawn — the rules change completely',
      'The defending King must reach h8 (or a8) to hold the draw',
      'Even a Queen cannot force checkmate against a King in the corner on h8 with an h-pawn',
    ],
    highlights: { h8: 'rgba(91,155,213,0.35)', g8: 'rgba(91,155,213,0.2)' },
  },
  {
    id: 'rook-lucena',
    title: 'The Lucena Position',
    category: 'Rook Endings',
    difficulty: 'Intermediate',
    fen: '1K1k4/1P6/8/8/8/8/8/2R5 w - - 0 1',
    objective: 'White to move and win — apply the Lucena method',
    sideToMove: 'White',
    concept: 'Lucena Position',
    keyIdea: 'The Lucena position is one of the most important in all of endgame theory. White wins by "building a bridge" — the Rook shields the King from checks so the pawn can promote. The technique: 1) Bring the Rook to the 4th rank, 2) March the King out, 3) Use the Rook to cut off enemy checks.',
    solution: ['c1c4', 'd8d7', 'b8a7', 'd7c7', 'c4c1', 'c7d7', 'c1d1', 'd7c7', 'a7a8', 'c7c6', 'd1d4'],
    explanation: 'The "bridge building" technique: White brings the Rook to the 4th rank (c4), then marches the King forward. When Black checks, the Rook on the 4th rank interposes, shielding the King from further checks. The pawn then promotes safely. This specific technique and position appear regularly in top-level games.',
    tips: [
      'The Lucena is a WIN for the side with the pawn (unless it\'s a rook pawn)',
      '"Building a bridge" = using the Rook to shield your King from side checks',
      'Know this position cold — it appears in many practical rook endings',
    ],
    arrows: [
      { from: 'c1', to: 'c4', color: 'gold' },
      { from: 'b8', to: 'a7', color: 'green' },
    ],
  },
  {
    id: 'rook-philidor',
    title: 'The Philidor Position',
    category: 'Rook Endings',
    difficulty: 'Intermediate',
    fen: '8/8/8/3k4/3p4/8/8/3K1R2 w - - 0 1',
    objective: 'White to move and DRAW — use the Philidor defense',
    sideToMove: 'White',
    concept: 'Philidor Position',
    keyIdea: 'The Philidor position is the key drawing technique when defending a Rook ending. The defending Rook stays on the 6th rank (cutting off the attacking King) until the pawn advances to the 6th rank — then the Rook switches to checking from behind. This drawing technique is essential defensive knowledge.',
    solution: ['f1f6', 'd5e5', 'f6f1', 'e5e4', 'f1e1', 'e4f4', 'e1f1', 'f4e4'],
    explanation: 'The Philidor defense: White keeps the Rook on the 6th rank as long as possible. This cuts off the Black King. Once the pawn advances to the 6th rank, White switches to checking from behind — the Black King can never escape the checks because it must shield the pawn. Result: draw by repetition or stalemate.',
    tips: [
      'The Philidor is a DRAW for the defending side',
      'Keep the Rook on the 6th rank until the pawn reaches the 6th',
      'Switch to checking from behind only when the pawn has advanced far',
    ],
    arrows: [{ from: 'f1', to: 'f6', color: 'gold' }],
    highlights: { f6: 'rgba(212,168,83,0.3)' },
  },
  {
    id: 'krk-checkmate',
    title: 'King & Rook vs King: Forced Mate',
    category: 'King & Rook vs King',
    difficulty: 'Beginner',
    fen: '8/8/8/8/8/3k4/8/4KR2 w - - 0 1',
    objective: 'White to move and checkmate — force the Black King to the edge',
    sideToMove: 'White',
    concept: 'Box Method',
    keyIdea: 'King and Rook vs lone King is always a forced win. The technique: use the "box method." The Rook cuts off ranks or files, shrinking the box the enemy King can occupy. The King marches toward the enemy King, and finally the Rook delivers checkmate on the edge of the board.',
    solution: ['f1f3', 'd3e4', 'e1e2', 'e4d4', 'f3d3'],
    explanation: 'The box method: The Rook on f3 restricts the Black King to ranks 1-2. White\'s King advances. Eventually the Black King is pushed to the edge where the Rook delivers checkmate. This mate can always be forced in 16 moves or fewer from any position. Practice this until it\'s automatic.',
    tips: [
      'Shrink the box systematically — don\'t let the King escape',
      'Your King must help — the Rook alone cannot force checkmate',
      'Beware of stalemate when the Black King reaches the corner',
    ],
    arrows: [
      { from: 'f1', to: 'f3', color: 'gold' },
      { from: 'e1', to: 'e2', color: 'green' },
    ],
  },
  {
    id: 'bishop-wrong-color',
    title: 'Wrong-Colored Bishop Draw',
    category: 'Bishop Endings',
    difficulty: 'Intermediate',
    fen: '8/8/8/8/7B/8/7P/7K w - - 0 1',
    objective: 'This is a DRAW — study why the Bishop color matters',
    sideToMove: 'White',
    concept: 'Wrong-Color Bishop',
    keyIdea: 'A Bishop that does not control the promotion square of a rook pawn creates an unwinnable endgame. Here, the h-pawn promotes on h8 (a dark square), but the Bishop moves on light squares — it can never cover h8. The Black King simply parks on h8 and cannot be moved. Draw.',
    solution: ['h4g5', 'h8g8', 'g5f6', 'g8h8', 'h2h4', 'h8g8', 'h4h5', 'g8h8', 'h5h6', 'h8g8'],
    explanation: 'No matter what White tries, the Black King sits on h8 and is stalemated whenever White pushes h7. The Bishop on light squares cannot attack h8 (dark square). White cannot make progress. This is the most important exception to the "pawn up = win" rule in Bishop endings.',
    tips: [
      'Always check if your Bishop covers the promotion square',
      'A rook pawn + wrong-colored Bishop is almost always a draw',
      'The defending King just needs to reach the corner square that the pawn promotes on',
    ],
    highlights: { h8: 'rgba(224,82,82,0.35)' },
  },
  {
    id: 'queen-vs-pawn',
    title: 'Queen vs Pawn on 7th Rank',
    category: 'Queen vs Pawn',
    difficulty: 'Intermediate',
    fen: '8/3p4/8/8/8/8/8/3QK1k1 w - - 0 1',
    objective: 'White to move and win — technique with Queen vs advanced pawn',
    sideToMove: 'White',
    concept: 'Queen vs Pawn Technique',
    keyIdea: 'A Queen vs a pawn on the 7th rank is usually a win, but requires technique. The Queen must give check to force the enemy King in front of its own pawn — this stalls the pawn. Then the White King marches up to assist. Exception: a Bishop pawn or Rook pawn on the 7th can sometimes draw.',
    solution: ['d1d2', 'g1h1', 'd2d4', 'h1g1', 'd4g4', 'g1h1', 'g4f3', 'h1g1', 'f3e3', 'g1h1'],
    explanation: 'The Queen technique: give check to force the enemy King in front of its pawn (stopping it from advancing), then use the time to bring the White King closer. Once the White King is near enough to help, the Queen finishes the job. The pawn is captured and promotion follows.',
    tips: [
      'Force the defending King in front of its pawn to stall it',
      'Bring your King up while the pawn is stalled',
      'Beware of stalemate tricks with rook pawns and bishop pawns',
    ],
    arrows: [{ from: 'd1', to: 'd7', color: 'gold' }],
  },
  {
    id: 'active-king-endgame',
    title: 'Activate Your King in the Endgame',
    category: 'King & Pawn',
    difficulty: 'Beginner',
    fen: '8/5k2/8/5P2/8/8/8/5K2 w - - 0 1',
    objective: 'White to move and win — march the King to escort the pawn',
    sideToMove: 'White',
    concept: 'Active King',
    keyIdea: 'In the endgame, the King transforms from a piece to protect into a powerful fighting piece. The King should march toward the center and toward the passed pawn. Here, White\'s King must race to get in front of the f-pawn and reach the key squares (e7, f7, g7) to secure promotion.',
    solution: ['f1e2', 'f7e6', 'e2e3', 'e6e5', 'e3f3', 'e5f5', 'f3g4', 'f5g6', 'g4g5'],
    explanation: 'The White King needs to reach e7, f7, or g7 to guarantee promotion. The plan is straightforward: march the King forward while the pawn provides support. Black\'s King tries to block, but with correct technique White\'s King takes the opposition and forces Black\'s King away from the promotion path.',
    tips: [
      'Activate your King immediately in the endgame — don\'t leave it on the back rank',
      'The King should march toward the center or the pawn it needs to support',
      'Opposition (facing the enemy King with one square gap) is the key tool',
    ],
    arrows: [{ from: 'f1', to: 'f7', color: 'gold' }],
  },
  {
    id: 'rook-behind-pawn',
    title: 'Rook Behind the Passed Pawn',
    category: 'Rook Endings',
    difficulty: 'Intermediate',
    fen: '8/8/8/3k4/8/8/3P4/3R2K1 w - - 0 1',
    objective: 'White to move and win — position the Rook correctly',
    sideToMove: 'White',
    concept: 'Rook Behind Passed Pawn',
    keyIdea: 'The most important principle in Rook endings: place your Rook BEHIND the passed pawn (your own or the enemy\'s). A Rook behind its own passed pawn gains strength as the pawn advances. A Rook behind the enemy\'s passed pawn restrains it. This is Tarrasch\'s principle and applies in virtually every Rook ending.',
    solution: ['d1d4', 'd5e5', 'd4d8', 'e5e4', 'd2d4', 'e4e3', 'd8d3', 'e3e2', 'd4d5', 'e2e1', 'd5d6'],
    explanation: 'White places the Rook behind the pawn on d1 (already there). As the pawn advances, the Rook on d1 grows more powerful — it controls the entire d-file and supports the pawn from maximum range. The White King escorts, and Black cannot stop the pawn from queening.',
    tips: [
      'Always put Rooks behind passed pawns — yours or the enemy\'s',
      'A Rook in front of a passed pawn is passive and cramped',
      'This principle applies in virtually every practical Rook ending',
    ],
    arrows: [{ from: 'd1', to: 'd4', color: 'gold' }],
  },
  {
    id: 'knight-vs-bishop',
    title: 'Knight vs Bad Bishop',
    category: 'Knight Endings',
    difficulty: 'Advanced',
    fen: '8/pp6/k1p5/2Pp4/3P4/4B3/PPK5/8 w - - 0 1',
    objective: 'White to move — understand why the Knight is superior here',
    sideToMove: 'White',
    concept: 'Good Knight vs Bad Bishop',
    keyIdea: 'The "bad bishop" is a Bishop whose pawns are fixed on the same color as the Bishop itself. Here, Black\'s pawns are on dark squares and the Bishop (if Black had one) would be on dark squares too — completely blocked by its own pawns. A Knight, which can reach any color, would dominate such a Bishop in the endgame.',
    solution: ['c2c3', 'a7a5', 'c3b3', 'a5a4', 'b3a3'],
    explanation: 'In this pawn structure, a Knight on c4 or d5 would be completely dominant — it can attack all of Black\'s pawns (on c6, d5, b7) while the Bishop is paralyzed. The practical lesson: avoid putting your pawns on the same color as your Bishop. If you have the Knight, trade pawns to open the board. If you have the bad Bishop, try to trade it off.',
    tips: [
      'Avoid fixing pawns on the same color as your Bishop',
      'Knights shine in closed positions with pawns on both colors',
      'A Knight on a strong central outpost can outplay a "bad" Bishop',
    ],
    highlights: {
      c6: 'rgba(224,82,82,0.25)',
      d5: 'rgba(224,82,82,0.25)',
      a7: 'rgba(224,82,82,0.25)',
    },
  },
  {
    id: 'triangulation',
    title: 'Triangulation — Losing a Tempo',
    category: 'King & Pawn',
    difficulty: 'Advanced',
    fen: '8/8/8/8/8/2k5/2p5/2K5 b - - 0 1',
    objective: 'Black to move and WIN — use triangulation to outmaneuver White',
    sideToMove: 'Black',
    concept: 'Triangulation',
    keyIdea: 'Triangulation is an advanced King maneuver used to lose a tempo — to arrive at the same position but with the opponent to move. When two Kings are in opposition, sometimes one side can "triangle" (make a 3-move detour) to transfer the move to the opponent. This is one of the most sophisticated concepts in all of endgame theory.',
    solution: ['c3b3', 'c1d1', 'b3b2', 'd1d2', 'b2a2'],
    explanation: 'Black uses a triangular path (c3-b3-b2 or c3-d3-d2) to arrive at the same position but with White to move. This puts White in zugzwang — any King move allows Black\'s c-pawn to advance and promote. The technique requires recognizing when your King can move in a triangle while the enemy King cannot.',
    tips: [
      'Triangulation is used to transfer the move to your opponent',
      'Look for triangulation when the enemy King cannot triangulate back',
      'Zugzwang positions are where triangulation pays off most',
    ],
    arrows: [
      { from: 'c3', to: 'b3', color: 'gold' },
      { from: 'b3', to: 'b2', color: 'gold' },
    ],
  },
];

export function getEndgamesByCategory(category: string): EndgamePosition[] {
  return ENDGAMES.filter(e => e.category === category);
}

export const ENDGAME_CATEGORIES = Array.from(new Set(ENDGAMES.map(e => e.category)));
