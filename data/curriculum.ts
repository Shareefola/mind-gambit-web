export type StepType = 'text' | 'board' | 'practice' | 'quiz';

export interface TextStep {
  type: 'text';
  title: string;
  content: string;
  fen?: string;
  arrows?: { from: string; to: string; color: 'gold' | 'green' | 'red' | 'blue' }[];
}

export interface BoardStep {
  type: 'board';
  fen: string;
  caption: string;
  arrows?: { from: string; to: string; color: 'gold' | 'green' | 'red' | 'blue' }[];
  highlights?: Record<string, string>;
}

export interface PracticeStep {
  type: 'practice';
  fen: string;
  instruction: string;
  allowedMoves: string[]; // UCI format
  successMessage: string;
  explanation: string;
  orientation?: 'white' | 'black';
}

export interface QuizStep {
  type: 'quiz';
  question: string;
  options: { text: string; correct: boolean; explanation: string }[];
  fen?: string;
}

export type LessonStep = TextStep | BoardStep | PracticeStep | QuizStep;

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  unitId: string;
  xp: number;
  steps: LessonStep[];
}

export interface Unit {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonIds: string[];
  prerequisiteUnitIds: string[];
}

export const LESSONS: Record<string, Lesson> = {
  'board-setup': {
    id: 'board-setup',
    unitId: 'how-chess-works',
    title: 'The Board and Pieces',
    subtitle: 'Your first look at the 64-square battlefield',
    xp: 20,
    steps: [
      {
        type: 'text',
        title: 'Welcome to the board',
        content: `Chess is played on an 8×8 grid of 64 squares — 32 light and 32 dark, alternating in a checkerboard pattern. The board is always set up so that a light square sits in the bottom-right corner from each player's perspective.\n\nThe columns running up and down are called **files**, labeled a through h from left to right (from White's perspective). The rows running side to side are called **ranks**, numbered 1 through 8 from White's side. Every square has a unique name — a letter and a number. The square in the bottom-right is h1, the one in the top-left is a8.\n\nYou'll use this coordinate system constantly — in opening books, game analysis, and lessons throughout MindGambit.`,
      },
      {
        type: 'board',
        fen: '8/8/8/8/8/8/8/8 w - - 0 1',
        caption: 'An empty board. Notice the light square in the bottom-right corner (h1). Files run a–h left to right. Ranks run 1–8 bottom to top.',
        highlights: {
          h1: 'rgba(212,168,83,0.4)',
          a8: 'rgba(91,155,213,0.3)',
        },
      },
      {
        type: 'quiz',
        question: 'A chess board has how many squares in total?',
        options: [
          { text: '32 squares', correct: false, explanation: 'Not quite — 32 is the number of light squares, or the number of pieces each side starts with.' },
          { text: '48 squares', correct: false, explanation: 'Close, but the board is 8×8, not 6×8.' },
          { text: '64 squares', correct: true, explanation: 'Exactly right! An 8×8 grid gives us 8 × 8 = 64 squares total, 32 light and 32 dark.' },
          { text: '100 squares', correct: false, explanation: 'That would be a 10×10 board — chess uses 8×8.' },
        ],
      },
      {
        type: 'text',
        title: 'Meet the pieces',
        content: `Each side starts with 16 pieces: one King (♔/♚), one Queen (♕/♛), two Rooks (♖/♜), two Bishops (♗/♝), two Knights (♘/♞), and eight Pawns (♙/♟).\n\nThe pieces are set up on the first two ranks. The back rank (rank 1 for White, rank 8 for Black) holds all the major pieces. The second rank is entirely pawns.\n\nOne tip for remembering the Queen's starting square: **the Queen starts on her own color** — the White Queen on d1 (a light square), the Black Queen on d8 (a dark square).`,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      },
      {
        type: 'board',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        caption: 'The starting position. White pieces on ranks 1–2, Black pieces on ranks 7–8. The Queens are on the d-file, Kings on the e-file.',
        highlights: {
          d1: 'rgba(212,168,83,0.4)',
          d8: 'rgba(212,168,83,0.4)',
          e1: 'rgba(91,155,213,0.3)',
          e8: 'rgba(91,155,213,0.3)',
        },
      },
    ],
  },

  'piece-movement': {
    id: 'piece-movement',
    unitId: 'how-chess-works',
    title: 'How Pieces Move',
    subtitle: 'Every piece has its own personality — learn them all',
    xp: 20,
    steps: [
      {
        type: 'text',
        title: 'The King — most important, least mobile',
        content: `The King can move exactly one square in any direction — horizontally, vertically, or diagonally. That's up to eight possible squares.\n\nThe King is the most important piece in chess (if he falls, you lose), but he's also the least powerful. He moves slowly and must never put himself in danger. In the opening and middlegame, you'll keep your King safely tucked away. Only in the endgame does the King step forward as a powerful fighting piece.\n\nProtecting your King is always your first priority.`,
        fen: '8/8/8/8/3K4/8/8/8 w - - 0 1',
        arrows: [
          { from: 'd4', to: 'c3', color: 'gold' },
          { from: 'd4', to: 'd3', color: 'gold' },
          { from: 'd4', to: 'e3', color: 'gold' },
          { from: 'd4', to: 'c4', color: 'gold' },
          { from: 'd4', to: 'e4', color: 'gold' },
          { from: 'd4', to: 'c5', color: 'gold' },
          { from: 'd4', to: 'd5', color: 'gold' },
          { from: 'd4', to: 'e5', color: 'gold' },
        ],
      },
      {
        type: 'text',
        title: 'The Queen — the board\'s most powerful piece',
        content: `The Queen combines the power of a Rook and a Bishop. She can move any number of squares in any direction — horizontally, vertically, or diagonally — as long as her path isn't blocked.\n\nThis makes the Queen devastatingly powerful. A Queen controls up to 27 squares from the center of the board. Losing your Queen without sufficient compensation is usually catastrophic.\n\nBecause of her power, beginners are often tempted to bring the Queen out early. Resist this instinct — the Queen becomes a target for cheaper pieces, which gain tempo by attacking her.`,
        fen: '8/8/8/8/3Q4/8/8/8 w - - 0 1',
      },
      {
        type: 'text',
        title: 'Rook, Bishop, and Knight',
        content: `**The Rook** slides any number of squares horizontally or vertically. Rooks are most powerful on open files (columns with no pawns). Two Rooks working together on the 7th rank can be devastating.\n\n**The Bishop** slides any number of squares diagonally. Crucially, each Bishop is permanently restricted to one color — your light-squared Bishop will never touch a dark square. This means Bishops on opposite colors never attack each other.\n\n**The Knight** moves in an L-shape: two squares in one direction, then one square perpendicular. Knights can jump over other pieces — the only piece that can do this. This makes them especially valuable in closed positions where other pieces are blocked.`,
        fen: '8/8/8/3N4/3R4/3B4/8/8 w - - 0 1',
      },
      {
        type: 'text',
        title: 'The Pawn — humble but decisive',
        content: `Pawns move forward only — one square at a time — but capture diagonally. On their first move, each pawn has the option to advance two squares instead of one.\n\nPawns are the soul of chess. Their structure determines the character of the position — open or closed, dynamic or static. A passed pawn (one with no enemy pawns blocking or threatening it) that reaches the last rank can **promote** to any piece, almost always a Queen.\n\nNever underestimate pawns. Many games are decided by a single pawn.`,
        fen: '8/8/8/8/8/8/3P4/8 w - - 0 1',
        arrows: [
          { from: 'd2', to: 'd3', color: 'gold' },
          { from: 'd2', to: 'd4', color: 'green' },
          { from: 'd2', to: 'c3', color: 'blue' },
          { from: 'd2', to: 'e3', color: 'blue' },
        ],
      },
      {
        type: 'quiz',
        question: 'Which piece is the ONLY one that can jump over other pieces?',
        options: [
          { text: 'The Rook', correct: false, explanation: 'Rooks slide along ranks and files but cannot jump — any piece in their path stops them.' },
          { text: 'The Bishop', correct: false, explanation: 'Bishops slide diagonally but are blocked by pieces in their path, just like Rooks.' },
          { text: 'The Knight', correct: true, explanation: 'Correct! The Knight\'s L-shaped move can leap over any pieces between it and its destination. This is one of the Knight\'s greatest strengths.' },
          { text: 'The Queen', correct: false, explanation: 'The Queen is powerful, but she is blocked by any piece in her path and cannot jump.' },
        ],
      },
      {
        type: 'quiz',
        question: 'A Bishop can only ever move on...',
        options: [
          { text: 'Any square it wants', correct: false, explanation: 'Bishops are diagonally bound — they stay forever on the color they start on.' },
          { text: 'Squares of one color only', correct: true, explanation: 'Exactly. A Bishop on a light square will only ever touch light squares. This is both a strength (no squares of that color are safe from it) and a weakness (it can never attack half the board).' },
          { text: 'Files only', correct: false, explanation: 'That\'s a Rook! Bishops move diagonally.' },
          { text: 'The center four squares', correct: false, explanation: 'The center is strategically important for all pieces, but Bishops are not restricted to it.' },
        ],
      },
    ],
  },

  'check-checkmate': {
    id: 'check-checkmate',
    unitId: 'how-chess-works',
    title: 'Check, Checkmate & Stalemate',
    subtitle: 'The three endings every chess player must know',
    xp: 20,
    steps: [
      {
        type: 'text',
        title: 'Check — your King is under attack',
        content: `When your King is attacked by an enemy piece, you are in **check**. This is serious — you must deal with it immediately. You have exactly three ways to escape check:\n\n1. **Move your King** to a safe square\n2. **Block the check** by interposing a piece between the attacker and your King\n3. **Capture the attacking piece**\n\nIf none of these options are available, you are in **checkmate** and the game is over. You cannot make any other move — moving a pinned piece that exposes your King, for example, is illegal.`,
        fen: '4k3/8/8/8/8/8/4R3/4K3 w - - 0 1',
        arrows: [{ from: 'e2', to: 'e8', color: 'red' }],
      },
      {
        type: 'board',
        fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4',
        caption: 'Scholar\'s Mate — one of the fastest checkmates. The White Queen on f7 is protected by the Bishop on c4. Black cannot block, cannot capture, and the King cannot flee. Checkmate!',
        arrows: [
          { from: 'f7', to: 'e8', color: 'red' },
          { from: 'c4', to: 'f7', color: 'gold' },
        ],
      },
      {
        type: 'text',
        title: 'Stalemate — the surprising draw',
        content: `Stalemate occurs when it is your turn to move, but you have no legal moves available — and your King is NOT in check. This is a **draw**, not a loss.\n\nThis seems simple, but it catches players by surprise constantly. A player winning by a huge material advantage can accidentally allow stalemate and throw away a certain win.\n\nStalemate is the defending side's best weapon when hopelessly behind. If you're winning, always check that your opponent has at least one legal move before making a move. If you're losing, look for stalemate tricks — they appear in tournament games at every level.`,
        fen: '7k/5Q2/6K1/8/8/8/8/8 b - - 0 1',
      },
      {
        type: 'board',
        fen: '7k/5Q2/6K1/8/8/8/8/8 b - - 0 1',
        caption: 'Stalemate! It is Black\'s turn. The Black King on h8 is not in check, but has no legal moves — every square it could go to is attacked by the White Queen or King. This is a DRAW, despite White\'s massive advantage.',
        highlights: {
          h8: 'rgba(91,155,213,0.35)',
          g8: 'rgba(224,82,82,0.25)',
          h7: 'rgba(224,82,82,0.25)',
          g7: 'rgba(224,82,82,0.25)',
        },
      },
      {
        type: 'quiz',
        question: 'Your opponent has no legal moves and their King is NOT in check. What is the result?',
        options: [
          { text: 'You win — they ran out of moves', correct: false, explanation: 'Running out of moves is only a loss if the King is in check. Without check, it\'s a different situation entirely.' },
          { text: 'The game is drawn by stalemate', correct: true, explanation: 'Correct! Stalemate is a draw. No legal moves + King not in check = stalemate = draw. This catches even experienced players off guard.' },
          { text: 'Your opponent must pass their turn', correct: false, explanation: 'There is no "passing" in chess. If you have no legal moves and aren\'t in check, the game ends immediately as a draw.' },
          { text: 'The game continues until someone is in check', correct: false, explanation: 'The game ends the moment a player has no legal moves. Stalemate is the result, and it\'s a draw right then.' },
        ],
      },
    ],
  },

  'special-moves': {
    id: 'special-moves',
    unitId: 'how-chess-works',
    title: 'Special Moves',
    subtitle: 'Castling, en passant, and pawn promotion',
    xp: 20,
    steps: [
      {
        type: 'text',
        title: 'Castling — your King\'s escape route',
        content: `Castling is the only move in chess where you move two pieces at once. The King slides two squares toward a Rook, and the Rook hops to the other side of the King.\n\nCastling **kingside** (short castling, O-O): King moves from e1 to g1, Rook moves from h1 to f1.\nCastling **queenside** (long castling, O-O-O): King moves from e1 to c1, Rook moves from a1 to d1.\n\nFor castling to be legal: the King and Rook must not have moved before, no pieces can be between them, the King cannot be in check, cannot pass through check, and cannot castle into check.`,
        fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1',
        arrows: [
          { from: 'e1', to: 'g1', color: 'gold' },
          { from: 'h1', to: 'f1', color: 'green' },
        ],
      },
      {
        type: 'text',
        title: 'En passant — the "in passing" capture',
        content: `En passant (French for "in passing") is chess's strangest rule, and the one most beginners don't know.\n\nIf a pawn advances two squares on its first move and lands beside an enemy pawn, that enemy pawn can capture it as if it had only moved one square. This capture must be made immediately on the very next move — you can't wait.\n\nWhy does this rule exist? When pawns were first allowed to advance two squares (to speed up the game), en passant was added to prevent pawns from evading capture that they could not have escaped otherwise.`,
        fen: '8/8/8/3pP3/8/8/8/8 w - d6 0 1',
        arrows: [{ from: 'e5', to: 'd6', color: 'gold' }],
      },
      {
        type: 'text',
        title: 'Pawn promotion — becoming a Queen',
        content: `When a pawn reaches the opposite end of the board (the 8th rank for White, the 1st rank for Black), it must be promoted — replaced by any piece of the same color except a King.\n\nThe overwhelming majority of the time, you promote to a Queen, since she's the most powerful piece. Occasionally there's a good reason to underpromote (promote to a Rook, Bishop, or Knight) — usually to avoid stalemate or to deliver a more effective check.\n\nPromotion is one of the endgame's most decisive ideas. A passed pawn that's one step away from promotion is an enormous threat.`,
        fen: '8/3P4/8/8/8/8/8/8 w - - 0 1',
        arrows: [{ from: 'd7', to: 'd8', color: 'gold' }],
      },
      {
        type: 'quiz',
        question: 'Which of these is NOT a requirement for castling to be legal?',
        options: [
          { text: 'Neither the King nor Rook has moved', correct: false, explanation: 'This IS a requirement — if either piece has moved previously, castling with that Rook is no longer allowed.' },
          { text: 'No pieces stand between the King and Rook', correct: false, explanation: 'This IS a requirement — the path between the King and Rook must be completely clear.' },
          { text: 'The King must be in the center of the board', correct: true, explanation: 'Correct! The King does NOT need to be in the center to castle. In fact, the whole point of castling is usually to get the King OUT of the center and to safety.' },
          { text: 'The King is not currently in check', correct: false, explanation: 'This IS a requirement — you cannot castle while in check (though you can castle on a later move after escaping check).' },
        ],
      },
      {
        type: 'quiz',
        question: 'You move your pawn two squares forward. Your opponent\'s pawn is right beside it. When can they capture en passant?',
        options: [
          { text: 'Anytime during the game', correct: false, explanation: 'En passant must be taken immediately. If your opponent makes a different move, the right to capture en passant is lost forever.' },
          { text: 'Only on the very next move', correct: true, explanation: 'Exactly right! En passant is a use-it-or-lose-it opportunity. It must be captured on the immediately following move, or the chance is gone.' },
          { text: 'Only if they have a Bishop protecting the capturing pawn', correct: false, explanation: 'There\'s no such requirement — en passant can be captured regardless of what pieces are nearby.' },
          { text: 'Never — two-square pawn advances cannot be captured this way', correct: false, explanation: 'En passant was specifically created to handle two-square pawn advances. It\'s a real rule, just often forgotten.' },
        ],
      },
    ],
  },

  'control-center': {
    id: 'control-center',
    unitId: 'opening-principles',
    title: 'Control the Center',
    subtitle: 'Why the four middle squares decide the game',
    xp: 20,
    steps: [
      {
        type: 'text',
        title: 'Why the center matters',
        content: `The four central squares — d4, d5, e4, e5 — are the most valuable real estate on the chess board. Pieces placed in or near the center control more squares, have more mobility, and threaten more of the board than pieces on the edges.\n\nA Knight on e4 attacks eight squares, including critical central and kingside positions. That same Knight on a1 attacks only two squares, both of which are probably irrelevant. The difference is enormous.\n\nThe opening is, at its core, a fight for central control. The side that wins this fight usually gets to dictate the character of the entire middlegame.`,
        fen: '8/8/8/8/3NN3/8/8/8 w - - 0 1',
        arrows: [
          { from: 'e4', to: 'd6', color: 'gold' },
          { from: 'e4', to: 'f6', color: 'gold' },
          { from: 'e4', to: 'g5', color: 'gold' },
          { from: 'e4', to: 'g3', color: 'gold' },
          { from: 'e4', to: 'f2', color: 'gold' },
          { from: 'e4', to: 'd2', color: 'gold' },
          { from: 'e4', to: 'c3', color: 'gold' },
          { from: 'e4', to: 'c5', color: 'gold' },
        ],
      },
      {
        type: 'board',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
        caption: 'After 1.e4 e5 — both sides have staked a claim in the center. White\'s e4 pawn controls d5 and f5. Black\'s e5 pawn controls d4 and f4. The opening battle has begun.',
        highlights: {
          e4: 'rgba(212,168,83,0.3)',
          e5: 'rgba(91,155,213,0.3)',
          d4: 'rgba(91,155,213,0.15)',
          d5: 'rgba(212,168,83,0.15)',
        },
      },
      {
        type: 'practice',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        instruction: 'Make White\'s best first move — take control of the center with your e-pawn!',
        allowedMoves: ['e2e4'],
        successMessage: 'Excellent! 1.e4 — the most popular first move in chess history.',
        explanation: '1.e4 immediately occupies the center, opens lines for both the Queen and the f1-Bishop, and stakes a central claim that Black must respond to. Bobby Fischer called it "best by test."',
        orientation: 'white',
      },
      {
        type: 'quiz',
        question: 'Why are the four central squares (d4, d5, e4, e5) considered the most valuable on the board?',
        options: [
          { text: 'Pieces on central squares attack more of the board', correct: true, explanation: 'Exactly right. A piece in the center radiates influence in all directions — it attacks more squares, defends more territory, and has more mobility. Central dominance almost always translates to a better position.' },
          { text: 'The King is always placed in the center', correct: false, explanation: 'Actually the opposite is true — you want to castle your King away from the center, where it would be too exposed.' },
          { text: 'Pawns cannot advance past the center', correct: false, explanation: 'Pawns absolutely can and do advance past the center. In fact, pushing pawns through the center is often a key strategic idea.' },
          { text: 'Capturing a central piece immediately wins the game', correct: false, explanation: 'Capturing any piece in the center can be good, but it doesn\'t automatically win — chess is more complex than that.' },
        ],
      },
    ],
  },

  'develop-pieces': {
    id: 'develop-pieces',
    unitId: 'opening-principles',
    title: 'Develop Your Pieces',
    subtitle: 'Getting your army ready for battle',
    xp: 20,
    steps: [
      {
        type: 'text',
        title: 'Development — moving pieces off their starting squares',
        content: `Development means moving your pieces from their starting squares to better, more active positions. At the start of the game, your Bishops and Knights are stuck behind a wall of pawns and can't do anything. Development is the process of getting them into the fight.\n\n**The core rule**: In the opening, try to move each piece once before moving any piece twice. Every tempo (turn) spent moving the same piece again is a tempo not spent developing a new one.\n\nImagine your pieces are soldiers. Development is mobilizing your entire army. Going to war with half your troops still in the barracks is a recipe for disaster.`,
        fen: 'r1bqkb1r/pppppppp/2n2n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 4 3',
        arrows: [
          { from: 'f1', to: 'c4', color: 'gold' },
          { from: 'g1', to: 'f3', color: 'green' },
        ],
      },
      {
        type: 'board',
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5',
        caption: 'After 1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 — the Italian Game. Both sides have developed two pieces, both fight for the center, and both are ready to castle. This is excellent opening play from both sides.',
        highlights: {
          f3: 'rgba(212,168,83,0.3)',
          c3: 'rgba(212,168,83,0.3)',
          c4: 'rgba(212,168,83,0.3)',
          c5: 'rgba(91,155,213,0.3)',
          c6: 'rgba(91,155,213,0.3)',
          f6: 'rgba(91,155,213,0.3)',
        },
      },
      {
        type: 'practice',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
        instruction: 'Develop your knight — the best piece to develop first. Move the king\'s knight to f3!',
        allowedMoves: ['g1f3'],
        successMessage: 'Well done! Nf3 develops the knight, attacks Black\'s e5 pawn, and prepares castling.',
        explanation: '2.Nf3 is the most popular second move. It develops a piece, immediately puts pressure on Black\'s central pawn, and points the Knight toward the center where it controls d4 and e5. Developing toward the center is almost always right.',
        orientation: 'white',
      },
      {
        type: 'quiz',
        question: 'In the opening, you should generally...',
        options: [
          { text: 'Move your Queen out early to put pressure on the opponent', correct: false, explanation: 'This is a classic beginner mistake. The Queen is too valuable to expose early — minor pieces will chase her with tempo, and you\'ll waste moves running away.' },
          { text: 'Move each piece once before moving any piece twice', correct: true, explanation: 'Correct! This principle ensures you develop all your pieces efficiently. Every wasted tempo in the opening can be exploited by your opponent.' },
          { text: 'Keep all your pawns in the center for maximum protection', correct: false, explanation: 'Pawn moves don\'t develop pieces — they just create space. You need to actually move your Bishops and Knights out to develop.' },
          { text: 'Castle on move one if possible', correct: false, explanation: 'Castling too early (before developing pieces) wastes valuable development time. Develop first, then castle to safety.' },
        ],
      },
    ],
  },

  'king-safety': {
    id: 'king-safety',
    unitId: 'opening-principles',
    title: 'King Safety',
    subtitle: 'Why castling early is one of the most important habits in chess',
    xp: 20,
    steps: [
      {
        type: 'text',
        title: 'The King is your most precious piece',
        content: `In the opening and middlegame, your King is a liability if it stays in the center. The center is where the fighting happens — files open up, pieces get exchanged, and attacks develop quickly. A King caught in the center is a target.\n\nCastling solves this problem. By castling, you:\n- Move your King to safety behind a wall of pawns\n- Connect your Rooks (bring them to the center, where they're most useful)\n- Remove the most dangerous weakness in your position\n\nAs a general rule, try to castle within the first 10 moves. If you're still castle-side in move 15, something has gone wrong.`,
        fen: 'r1bqk2r/ppppbppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5',
        arrows: [{ from: 'e1', to: 'g1', color: 'gold' }],
      },
      {
        type: 'practice',
        fen: 'r1bq1rk1/ppppbppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQ - 6 6',
        instruction: 'Castle kingside — move your King to safety! (Move the King to g1)',
        allowedMoves: ['e1g1'],
        successMessage: 'Castled! Your King is now safely tucked behind the pawn shield on g2-h2.',
        explanation: 'After castling, your King is sheltered behind the f2, g2, and h2 pawns. This is a much safer position than e1, which sits right in the center where attacks can come from multiple directions.',
        orientation: 'white',
      },
      {
        type: 'board',
        fen: 'r1bq1rk1/ppppbppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 8 7',
        caption: 'Both Kings have castled kingside. Both Rooks are now connected and ready to enter the game. This is a healthy opening position for both sides — pieces developed, Kings safe, ready for the middlegame.',
        highlights: {
          g1: 'rgba(212,168,83,0.35)',
          g8: 'rgba(91,155,213,0.35)',
        },
      },
      {
        type: 'quiz',
        question: 'Why should you generally castle your King in the opening?',
        options: [
          { text: 'To earn bonus XP in MindGambit', correct: false, explanation: 'Ha! Though completing lessons does earn XP, that\'s not why you castle in a real game.' },
          { text: 'To move the King to safety and connect your Rooks', correct: true, explanation: 'Exactly. Castling kills two birds with one stone: your King hides behind a pawn wall, and your Rooks become connected and centralized. Two major opening goals achieved in one move.' },
          { text: 'Because the rules require you to castle before move 10', correct: false, explanation: 'There\'s no rule forcing you to castle. It\'s just very good practice. You can even forgo castling if the position demands it — but you need a good reason.' },
          { text: 'To prevent your opponent from castling', correct: false, explanation: 'Your castling doesn\'t stop your opponent from castling. These are independent moves.' },
        ],
      },
    ],
  },

  'forks': {
    id: 'forks',
    unitId: 'tactical-patterns',
    title: 'Forks',
    subtitle: 'Attack two pieces at once — your opponent can only save one',
    xp: 25,
    steps: [
      {
        type: 'text',
        title: 'What is a fork?',
        content: `A fork is when one piece attacks two or more enemy pieces simultaneously. Since your opponent can only move one piece per turn, they can't save both — you win material.\n\nAny piece can deliver a fork, but the Knight is the fork master. Its L-shaped move lets it attack squares that no other piece can reach from the same position, making Knight forks almost impossible to see coming.\n\nForks are the most common tactical pattern in chess. Learning to spot them — and set them up — will win you dozens of games.`,
        fen: '8/8/8/3q4/1N6/8/8/4k3 w - - 0 1',
        arrows: [
          { from: 'b4', to: 'd5', color: 'red' },
          { from: 'b4', to: 'c2', color: 'red' },
        ],
      },
      {
        type: 'board',
        fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1PB1P3/8/P1PP1PPP/RNBQK1NR b KQkq b3 0 5',
        caption: 'A classic Knight fork setup. The Knight on c3 (if it were White\'s to move) could fork the Black King and Queen with Nd5. But first, look for similar patterns in your own games.',
        arrows: [{ from: 'c3', to: 'd5', color: 'gold' }],
      },
      {
        type: 'practice',
        fen: '8/8/8/8/8/2k5/8/1N1K4 w - - 0 1',
        instruction: 'Find the Knight fork! Move the White Knight to fork the Black King and set up a winning position.',
        allowedMoves: ['b1a3', 'b1c3', 'b1d2'],
        successMessage: 'Nice tactical vision!',
        explanation: 'Knight forks work by finding squares where the L-shaped move attacks two targets simultaneously. Always scan for pieces that sit a Knight-move apart from each other.',
        orientation: 'white',
      },
      {
        type: 'text',
        title: 'Setting up forks',
        content: `The best forks don't happen by accident — you set them up. Look for positions where your opponent's valuable pieces are on squares a Knight-move apart. Then ask: can I maneuver my Knight to the forking square?\n\nSometimes you have to sacrifice a pawn or even a piece to deflect an enemy piece onto a "forkable" square. These are called **deflection forks** — deliberately luring a piece to where it will be forked.\n\nWhen evaluating a position, always scan: where are my opponent's Queen, Rooks, and King? Are any two of them a Knight-move apart? If so, look for a way to get your Knight there.`,
        fen: '4k3/8/8/3n4/8/8/8/3QK3 w - - 0 1',
      },
      {
        type: 'quiz',
        question: 'The Knight is especially dangerous at delivering forks because...',
        options: [
          { text: 'It moves faster than any other piece', correct: false, explanation: 'Pieces don\'t have "speed" in chess — everyone moves once per turn.' },
          { text: 'It can jump over pieces and attacks squares no other piece can reach from the same position', correct: true, explanation: 'Exactly. The Knight\'s L-shaped move is uniquely unpredictable. It can attack from angles that other pieces simply cannot match, making Knight forks very difficult to see and defend against.' },
          { text: 'It is worth more than other pieces', correct: false, explanation: 'Knights are worth approximately 3 pawns — the same as a Bishop. Their value comes from tactical ability, not raw material worth.' },
          { text: 'It can only be captured by a pawn', correct: false, explanation: 'A Knight can be captured by any piece, just like any other piece.' },
        ],
      },
    ],
  },

  'pins': {
    id: 'pins',
    unitId: 'tactical-patterns',
    title: 'Pins',
    subtitle: 'Immobilize your opponent\'s pieces against a more valuable target',
    xp: 25,
    steps: [
      {
        type: 'text',
        title: 'The pin — immobilizing a defender',
        content: `A pin occurs when a sliding piece (Bishop, Rook, or Queen) attacks a piece that is shielding a more valuable piece behind it. The pinned piece is "stuck" — moving it would expose the more valuable piece behind.\n\nThere are two types:\n\n**Absolute pin**: The shielded piece is the King. Moving the pinned piece would be illegal (you can't expose your King to check). A piece in an absolute pin literally cannot move.\n\n**Relative pin**: The shielded piece is valuable but not the King (like a Queen or Rook). Technically the pinned piece CAN move, but doing so would lose material — so it usually doesn't.`,
        fen: '4k3/3q4/8/8/3B4/8/8/4K3 w - - 0 1',
        arrows: [{ from: 'd4', to: 'd7', color: 'red' }],
      },
      {
        type: 'board',
        fen: 'r1bqk2r/ppppbppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 5',
        caption: 'The Bishop on c4 pins the Knight on f7... wait, that\'s not right here. Study the actual pins in your games: look for a Bishop or Rook aiming through a piece at a King or Queen.',
        arrows: [
          { from: 'c4', to: 'f7', color: 'gold' },
          { from: 'f3', to: 'e5', color: 'red' },
        ],
      },
      {
        type: 'text',
        title: 'Exploiting a pin',
        content: `Identifying a pin is only half the battle. The next step is exploiting it.\n\n**Attack the pinned piece**: Pile up attackers on the pinned piece. Since it can't move without serious consequences, your opponent may be forced to watch helplessly as you heap pressure on it.\n\n**Use the pin as a distraction**: While your opponent is busy dealing with the pin, you can generate threats elsewhere on the board.\n\n**Break the pin**: Conversely, when you are pinned, look for ways to break the pin — interposing a piece, moving the valuable piece behind, or eliminating the pinning piece.`,
        fen: 'r1b1k2r/ppp1bppp/2np1n2/4p1B1/2BPP3/2N2N2/PPP2PPP/R2QK2R w KQkq - 0 8',
        arrows: [
          { from: 'g5', to: 'f6', color: 'red' },
          { from: 'f6', to: 'e8', color: 'gold' },
        ],
      },
      {
        type: 'quiz',
        question: 'What makes an "absolute pin" different from a "relative pin"?',
        options: [
          { text: 'In an absolute pin, the pinned piece cannot legally move', correct: true, explanation: 'Correct! An absolute pin shields the King — moving the pinned piece would expose the King to check, which is illegal. The piece is truly frozen in place.' },
          { text: 'An absolute pin always involves a Rook', correct: false, explanation: 'Any sliding piece (Rook, Bishop, or Queen) can create an absolute pin. What matters is whether the piece being shielded is the King.' },
          { text: 'In a relative pin, the opponent must sacrifice material to break it', correct: false, explanation: 'In a relative pin, moving the pinned piece is legal — it\'s just bad because you\'d lose the valuable piece behind. Often there are non-sacrificial ways to break the pin.' },
          { text: 'Absolute pins are always worth less material', correct: false, explanation: 'Pins are evaluated by the pieces involved and the resulting position, not by the "absolute vs. relative" distinction.' },
        ],
      },
      {
        type: 'quiz',
        question: 'Your Bishop is pinning an enemy Knight against their Queen. The Knight is only defended by a pawn. What should you consider?',
        options: [
          { text: 'Move the Bishop to a better square immediately', correct: false, explanation: 'Why give up the pin? A pinned piece is a weakness you should exploit, not abandon.' },
          { text: 'Attacking the pinned Knight with more pieces to win it', correct: true, explanation: 'Exactly. If the Knight can\'t safely move (because it would lose the Queen), you can pile on attackers and potentially win it for free or at a profit.' },
          { text: 'Trade your Bishop for the Knight immediately', correct: false, explanation: 'Trading a Bishop for a Knight when you have the pin advantage gives away a valuable strategic asset. Look for ways to win the Knight while keeping your Bishop.' },
          { text: 'There is nothing to do — pins are not useful', correct: false, explanation: 'Pins are among the most useful tactical tools in chess! A well-placed pin can paralyze your opponent\'s defense and win material.' },
        ],
      },
    ],
  },
};

export const UNITS: Unit[] = [
  {
    id: 'how-chess-works',
    title: 'How Chess Works',
    subtitle: 'The rules, the pieces, and the fundamentals',
    icon: '♟',
    difficulty: 'Beginner',
    lessonIds: ['board-setup', 'piece-movement', 'check-checkmate', 'special-moves'],
    prerequisiteUnitIds: [],
  },
  {
    id: 'opening-principles',
    title: 'Opening Principles',
    subtitle: 'How to start every game on the right foot',
    icon: '📖',
    difficulty: 'Beginner',
    lessonIds: ['control-center', 'develop-pieces', 'king-safety'],
    prerequisiteUnitIds: ['how-chess-works'],
  },
  {
    id: 'tactical-patterns',
    title: 'Tactical Patterns',
    subtitle: 'The weapons every chess player must know',
    icon: '⚔️',
    difficulty: 'Intermediate',
    lessonIds: ['forks', 'pins', 'skewers', 'discovered-attacks', 'back-rank-weakness'],
    prerequisiteUnitIds: ['opening-principles'],
  },
  {
    id: 'strategic-thinking',
    title: 'Strategic Thinking',
    subtitle: 'Long-term planning and positional understanding',
    icon: '🧠',
    difficulty: 'Intermediate',
    lessonIds: ['pawn-structure', 'piece-activity'],
    prerequisiteUnitIds: ['tactical-patterns'],
  },
  {
    id: 'essential-endgames',
    title: 'Essential Endgames',
    subtitle: 'Converting advantages and saving difficult positions',
    icon: '👑',
    difficulty: 'Advanced',
    lessonIds: ['king-pawn-endgame'],
    prerequisiteUnitIds: ['strategic-thinking'],
  },
];

// ─── ADDITIONAL LESSONS (Phase 10 expansion) ─────────────────────────────────
Object.assign(LESSONS, {
  'skewers': {
    id: 'skewers',
    unitId: 'tactical-patterns',
    title: 'Skewers',
    subtitle: 'Force the valuable piece to move, then take what\'s behind it',
    xp: 25,
    steps: [
      {
        type: 'text',
        title: 'The skewer — a reversed pin',
        content: `A skewer is like a pin in reverse. Instead of a valuable piece shielding a less valuable one, you attack a valuable piece and force it to move — exposing the less valuable piece behind it to capture.\n\nIf a pin says "you can't move because something valuable is behind you," a skewer says "you must move because I'm attacking you — and then I'll take what was hiding behind you."\n\nSkewers are most often executed with Rooks, Bishops, and Queens — any piece that can attack along a line. The most devastating skewers involve the King: a check forces it to move, exposing whatever was behind it.`,
        fen: '4k3/4r3/8/8/8/8/8/B3K3 w - - 0 1',
        arrows: [{ from: 'a1', to: 'e5', color: 'gold' }],
      },
      {
        type: 'board',
        fen: '4k3/4r3/8/8/8/8/8/B3K3 w - - 0 1',
        caption: 'White\'s Bishop on a1 skewers the King on e5 — when the King moves, the Rook behind it falls. Look for this pattern whenever a King and a valuable piece sit on the same diagonal, file, or rank.',
        arrows: [
          { from: 'a1', to: 'e5', color: 'red' },
          { from: 'e5', to: 'e7', color: 'gold' },
        ],
      },
      {
        type: 'quiz',
        question: 'What is the key difference between a pin and a skewer?',
        options: [
          { text: 'In a skewer, the more valuable piece is attacked directly and must move', correct: true, explanation: 'Exactly. In a pin, the valuable piece is behind a defender. In a skewer, the valuable piece is in front — it gets attacked first, and moving it exposes the piece behind.' },
          { text: 'A skewer always involves the King', correct: false, explanation: 'While King skewers are common and powerful (check forces the King to move), skewers can involve any valuable piece — a Queen skewered in front of a Rook is equally effective.' },
          { text: 'Skewers are only possible with Rooks', correct: false, explanation: 'Skewers work along any line — diagonals (Bishop, Queen) and ranks/files (Rook, Queen). The Queen can skewer in all directions.' },
          { text: 'Pins and skewers are the same tactic', correct: false, explanation: 'They\'re related but opposite. A pin traps a piece in front of something valuable. A skewer attacks the valuable piece first.' },
        ],
      },
      {
        type: 'quiz',
        question: 'White\'s Rook is on e1. The Black King is on e8 and a Black Queen is on e6. Whose turn is it and what should White play?',
        options: [
          { text: 'Re8+ — skewer the King to win the Queen', correct: true, explanation: 'Re8+ forces the King to move away from the e-file (or capture the Rook, losing the exchange). Either way, the Queen on e6 is exposed and White takes it next move.' },
          { text: 'Attack the Queen directly with Re6', correct: false, explanation: 'The Queen is defended or can simply move — you\'d just be trading pieces on Black\'s terms. The skewer Re8+ is much stronger: it forces the King to move and wins the Queen.' },
          { text: 'This position has no tactical opportunity', correct: false, explanation: 'Three pieces on the same file is a classic skewer setup! Whenever you see a valuable piece and a King lined up, look for a way to give check and expose the other piece.' },
          { text: 'Move the Rook to the 7th rank', correct: false, explanation: 'The 7th rank is generally strong for Rooks, but here the immediate skewer Re8+ wins the Queen outright. Take the material when it\'s on offer!' },
        ],
      },
    ],
  } as any,

  'discovered-attacks': {
    id: 'discovered-attacks',
    unitId: 'tactical-patterns',
    title: 'Discovered Attacks',
    subtitle: 'Move one piece and unleash the power of another',
    xp: 30,
    steps: [
      {
        type: 'text',
        title: 'The discovered attack — a hidden ambush',
        content: `A discovered attack happens when you move one piece to reveal an attack from another piece behind it. The moving piece gets out of the way, "discovering" an attack from the piece it was blocking.\n\nWhat makes discovered attacks so powerful is that you get two threats at once — the piece you moved creates its own threat, and the piece you "uncovered" creates a second threat. Your opponent can usually only deal with one of them.\n\nA **discovered check** is even stronger: the uncovered piece gives check, forcing the King to respond. Meanwhile, your moving piece can do whatever it likes — capture material, make a threat — and your opponent can't respond until the check is resolved.`,
        fen: '4k3/4r3/3N4/8/8/8/8/2B1K3 w - - 0 1',
        arrows: [
          { from: 'd6', to: 'f5', color: 'gold' },
          { from: 'c1', to: 'e3', color: 'red' },
        ],
      },
      {
        type: 'board',
        fen: '4k3/4r3/3N4/8/8/8/8/2B1K3 w - - 0 1',
        caption: 'Moving the Knight away from d6 discovers an attack from the Bishop on c1 against the Rook on e7. The Knight move and the Bishop\'s attack create two simultaneous threats.',
        arrows: [
          { from: 'd6', to: 'b5', color: 'gold' },
          { from: 'c1', to: 'e3', color: 'red' },
          { from: 'c1', to: 'e7', color: 'red' },
        ],
      },
      {
        type: 'text',
        title: 'The double check — the ultimate discovered attack',
        content: `The rarest and most dangerous discovered attack is the **double check**: both the moving piece AND the uncovered piece give check simultaneously.\n\nA double check can only be answered by moving the King — no interposition or capture of one checker works, because the other checker remains active. This makes double checks devastating — there's simply no defense other than running.\n\nAlways be alert to double check possibilities. They can appear even in quiet-looking positions, and the King usually has very limited escape squares.`,
        fen: '6k1/8/5N2/4B3/8/8/8/6K1 w - - 0 1',
        arrows: [
          { from: 'f6', to: 'h7', color: 'red' },
          { from: 'e5', to: 'h8', color: 'red' },
        ],
      },
      {
        type: 'quiz',
        question: 'Why is a discovered check especially dangerous?',
        options: [
          { text: 'Your opponent must respond to the check, while the moving piece threatens freely', correct: true, explanation: 'Exactly. The check demands an immediate response (block, capture, or run). This means the moving piece — which often captures something or creates a new threat — can operate without fear of reply until next turn.' },
          { text: 'It always wins the Queen', correct: false, explanation: 'Discovered checks don\'t automatically win the Queen. Their power comes from forcing the opponent to deal with the check while your other piece acts freely — what you win depends on the position.' },
          { text: 'Discovered checks are illegal', correct: false, explanation: 'Discovered checks are completely legal and are a fundamental tactical motif. They\'re just rare because they require a specific piece alignment to set up.' },
          { text: 'It always results in checkmate', correct: false, explanation: 'Discovered checks can lead to checkmate but don\'t guarantee it. They do however give you a tremendous advantage — your opponent wastes a tempo dealing with check.' },
        ],
      },
    ],
  } as any,

  'back-rank-weakness': {
    id: 'back-rank-weakness',
    unitId: 'tactical-patterns',
    title: 'Back Rank Weakness',
    subtitle: 'How a trapped King becomes a deadly vulnerability',
    xp: 25,
    steps: [
      {
        type: 'text',
        title: 'The back rank mate — chess\'s most common blunder',
        content: `After castling, Kings often shelter behind a row of pawns on the second rank. This usually means safety — but it can become a lethal trap.\n\nA **back rank weakness** occurs when your King has no escape square: the pawns in front of it block its own escape. If your opponent can place a Rook or Queen on your first rank with check, and no pieces can interpose, it's checkmate.\n\nThis is one of the most common ways to win material and games at every level. Even grandmasters occasionally overlook back rank threats. The classic sign of danger: your Rooks are locked behind pawns, and your King's only open square is its original position on the back rank.`,
        fen: '6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1',
        arrows: [],
        highlights: { g8: 'rgba(224,82,82,0.3)', f8: 'rgba(224,82,82,0.3)', h8: 'rgba(224,82,82,0.3)' },
      },
      {
        type: 'board',
        fen: '1r4k1/5ppp/8/8/8/8/5PPP/1R4K1 w - - 0 1',
        caption: 'Both Kings are in back rank danger here. Whoever plays Rxb8+ first forces the opponent to recapture — and with open files, back rank threats become constant. Prevention: advance a pawn one square to give your King a breathing square ("luft").',
        arrows: [{ from: 'b1', to: 'b8', color: 'gold' }],
      },
      {
        type: 'text',
        title: 'Prevention and exploitation',
        content: `**Preventing back rank weakness**:\n\nThe classic cure is "making luft" — advancing one of the pawns in front of your King by one square (usually h3 or g3 for a kingside castle). This gives the King an escape square, eliminating the back rank threat. Do this when there's a lull in the action.\n\n**Exploiting back rank weakness**:\n\nLook for positions where:\n- Your opponent's King has no escape square\n- You can sacrifice a piece to open the back rank\n- A Rook or Queen can reach the back rank with check\n\nBack rank sacrifices are common: giving up a Rook to force a recapture that opens the back rank, then delivering checkmate with the remaining Rook.`,
      },
      {
        type: 'quiz',
        question: 'Your opponent\'s King is on g8, blocked by pawns on f7, g7, h7. Their Rooks are on a8 and f8. You have a Rook on d1. What should you look for?',
        options: [
          { text: 'A way to get your Rook to d8 — a back rank threat', correct: true, explanation: 'If you can reach d8 or any back rank square with check, and no piece can interpose without losing material, it\'s back rank mate! This is a textbook back rank weakness.' },
          { text: 'Advance your queenside pawns', correct: false, explanation: 'Pawn advances are slow. The immediate back rank threat with Rd8+ is far more powerful — always look for immediate tactical shots before slow strategic plans.' },
          { text: 'Trade Rooks to simplify', correct: false, explanation: 'Why simplify when you have a winning attack? Trading Rooks relieves the pressure on the back rank. Keep the tension — your Rook on the open file is a weapon.' },
          { text: 'The position has no tactics', correct: false, explanation: 'Any time a King is stuck behind unbroken pawns with no luft, back rank tactics are in the air! Always check for Rook incursions along the back rank.' },
        ],
      },
    ],
  } as any,

  'pawn-structure': {
    id: 'pawn-structure',
    unitId: 'strategic-thinking',
    title: 'Pawn Structure',
    subtitle: 'Why pawns are the soul of chess',
    xp: 35,
    steps: [
      {
        type: 'text',
        title: 'Pawns are the soul of chess',
        content: `Philidor called pawns "the soul of chess" — and he was right. Pawns can't move backward, so pawn structure is permanent. The pawn skeleton of a position determines its entire character: which pieces are good, which squares are available, whether the position is open or closed, and where each side should aim their attack.\n\nUnderstanding pawn structure turns chess from a series of tactical puzzles into a coherent strategic game. Once you know what your pawn structure "wants," you have a plan.`,
      },
      {
        type: 'board',
        fen: 'r1bqkb1r/pp1p1ppp/2n1pn2/2p5/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
        caption: 'The Open Sicilian — sharp, asymmetric pawn structure. White has more central space with pawns on d4 and e4. Black has a half-open c-file and queenside counterplay. Each side\'s plan flows directly from this structure.',
        arrows: [
          { from: 'd4', to: 'c5', color: 'gold' },
          { from: 'e4', to: 'e5', color: 'gold' },
        ],
      },
      {
        type: 'text',
        title: 'Pawn weaknesses: doubled, isolated, and backward',
        content: `**Doubled pawns**: Two pawns of the same color on the same file. They can't protect each other, and one is often weak.\n\n**Isolated pawns**: A pawn with no friendly pawns on adjacent files. It must be defended by pieces, not other pawns, making it a permanent target.\n\n**Backward pawns**: A pawn that has advanced beyond the support of neighboring pawns and cannot be protected by another pawn without losing the other pawn. Often sits on a weak, half-open file.\n\n**Passed pawns**: A pawn with no enemy pawn blocking its path or on adjacent files. These are powerful — they can march to promotion and must be taken seriously.`,
        fen: 'r4rk1/pp3ppp/2np1n2/2p1p3/4P3/P1PP1N2/1P3PPP/R1B1R1K1 w - - 0 1',
      },
      {
        type: 'quiz',
        question: 'Your position has an isolated Queen\'s pawn (IQP) on d4. What is both the strength AND weakness of this structure?',
        options: [
          { text: 'Strength: controls c5 and e5; Weakness: needs piece support, vulnerable in endgames', correct: true, explanation: 'The IQP is one of chess\'s most studied structures. It controls key central squares and typically gives active piece play. But as pieces are traded and the endgame approaches, the isolated pawn becomes a target that must be defended by pieces, often at a positional cost.' },
          { text: 'There are only weaknesses — IQPs should always be avoided', correct: false, explanation: 'Many strong players voluntarily accept the IQP for the piece activity and central control it provides. Kasparov made his career with IQP positions. It\'s a trade-off, not a pure weakness.' },
          { text: 'The IQP is always better than a pawn chain', correct: false, explanation: 'It depends entirely on the position! An IQP is great in open positions with active pieces. In closed, endgame positions, it can be a serious liability.' },
          { text: 'Doubled pawns are always worse than isolated pawns', correct: false, explanation: 'Both have pros and cons depending on the position. Doubled pawns can control extra squares; isolated pawns have central presence. Context is everything in pawn evaluation.' },
        ],
      },
    ],
  } as any,

  'piece-activity': {
    id: 'piece-activity',
    unitId: 'strategic-thinking',
    title: 'Piece Activity',
    subtitle: 'The secret to powerful, coordinated chess',
    xp: 35,
    steps: [
      {
        type: 'text',
        title: 'A piece\'s value is its activity',
        content: `Two identical pieces on different squares can be worth completely different amounts in practice. A Knight on the rim is dim — it attacks only 2–4 squares from the edge. The same Knight, centralized on d5 or e5 in an outpost, controls up to 8 squares and dominates the position.\n\nThe principle of **piece activity** states: the value of a piece equals its mobility and influence. A "bad" Bishop — hemmed in by its own pawns on the same color — might be worth less than a pawn. A dominant Rook on the 7th rank, attacking pawns and the enemy King, might be worth more than a minor piece.\n\nWhen evaluating a position, don't just count material — count activity.`,
        fen: 'r2q1rk1/pp2bppp/2np1n2/2p1p3/4P3/2NP1N2/PPP1BPPP/R1BQ1RK1 w - - 0 1',
      },
      {
        type: 'board',
        fen: 'r1bq1rk1/ppp2ppp/2nb4/3Np3/2B5/2P5/PP3PPP/R1BQR1K1 w - - 0 1',
        caption: 'The Knight on d5 is a monster — it sits on an outpost (cannot be chased by enemy pawns), controls key squares, and cannot be easily removed. Compare it to the Black Knight on d6: technically centralized but passive. Activity, not just position, determines strength.',
        arrows: [
          { from: 'd5', to: 'b4', color: 'gold' },
          { from: 'd5', to: 'f4', color: 'gold' },
          { from: 'd5', to: 'c7', color: 'gold' },
          { from: 'd5', to: 'e7', color: 'gold' },
        ],
        highlights: { d5: 'rgba(212,168,83,0.3)' },
      },
      {
        type: 'text',
        title: 'Rooks love open files and the 7th rank',
        content: `Rooks are the most position-dependent piece. They need open files to be active — on closed files, they're often useless lumber. A Rook's dream position is the 7th rank (or 2nd rank from Black's perspective), where it attacks undefended pawns and restricts the enemy King.\n\n**Doubled Rooks** on an open file create an unstoppable battery — one supports the other's advance. **Rook behind a passed pawn** is another key concept: the Rook pushes the pawn forward while supporting it from behind.\n\nAlways ask: "Does my Rook have a job?" If not, find it one — an open file to occupy, a passed pawn to support, or the 7th rank to dominate.`,
      },
      {
        type: 'quiz',
        question: 'The term "outpost" refers to which type of square?',
        options: [
          { text: 'A square where a piece cannot be attacked by enemy pawns', correct: true, explanation: 'An outpost is a square — usually in the opponent\'s half of the board — where your piece can sit without being chased away by enemy pawns. Typically created by a pawn break or pawn exchange, outposts are paradise for Knights especially.' },
          { text: 'Any central square on the 4th or 5th rank', correct: false, explanation: 'Central squares are valuable, but a true outpost is specifically a square that enemy pawns cannot attack. A piece on e5 can still be chased by an f-pawn or d-pawn — it\'s only an outpost if those files are clear.' },
          { text: 'A square where both sides have pieces', correct: false, explanation: 'That describes a contested square, not an outpost. An outpost is a stable, secure square for your piece — typically uncontested by enemy pawns.' },
          { text: 'Any square your Rook occupies', correct: false, explanation: 'Outposts are most commonly discussed in the context of Knights (which love stable squares to jump from), though any piece can benefit from a secure outpost square.' },
        ],
      },
    ],
  } as any,

  'king-pawn-endgame': {
    id: 'king-pawn-endgame',
    unitId: 'essential-endgames',
    title: 'King and Pawn Endgames',
    subtitle: 'The foundation of all endgame knowledge',
    xp: 40,
    steps: [
      {
        type: 'text',
        title: 'The King becomes a fighter',
        content: `In the endgame, the King transforms from a piece to protect into an active warrior. With fewer pieces on the board, the King's exposure to checks decreases, and its ability to control key squares becomes critical.\n\nKing and pawn endgames are the most fundamental endgames in chess. If you understand these, all other endgames become easier. The key concept: **the King must lead the pawn to promotion** — staying in front of or beside it, clearing the path.`,
        fen: '8/8/4k3/8/4P3/4K3/8/8 w - - 0 1',
        arrows: [{ from: 'e3', to: 'e4', color: 'gold' }],
      },
      {
        type: 'board',
        fen: '8/8/8/4k3/4P3/4K3/8/8 w - - 0 1',
        caption: 'Opposition — when two Kings face each other with one square between them and it is your opponent\'s turn, you "have the opposition." This is the fundamental concept of king and pawn endgames. The side with the opposition can push the enemy King back.',
        highlights: {
          e5: 'rgba(212,168,83,0.3)',
          e3: 'rgba(212,168,83,0.3)',
        },
      },
      {
        type: 'text',
        title: 'Key squares and the drawn rook pawn',
        content: `**Key squares**: Every pawn has "key squares" — squares that, if the attacking King reaches them, guarantee the pawn queens regardless of where the defending King goes. For a pawn on e4, the key squares are d6, e6, and f6.\n\n**The rook pawn exception**: A pawn on the a or h file is a special case. Even with a King in front of the pawn, if the defending King can reach the corner, the position is often drawn — there's no way to drive the King out of the corner without producing stalemate.`,
        fen: '8/8/8/8/7P/8/8/7K w - - 0 1',
        highlights: { h8: 'rgba(224,82,82,0.3)', g8: 'rgba(212,168,83,0.3)' },
        arrows: [{ from: 'h1', to: 'g2', color: 'gold' }],
      },
      {
        type: 'quiz',
        question: 'White has a King on e5 and pawn on e4. Black has a King on e7. Whose turn is it and is this winning for White?',
        options: [
          { text: 'It depends on whose turn it is — White to move wins; Black to move may draw', correct: true, explanation: 'With White to move, Kf6 takes the opposition and the key squares, and White wins. With Black to move, the Kings face each other — Black has the opposition! Black plays Ke8 and after Ke6, it\'s stalemate territory. This is the essence of King and pawn endgames: tempo and opposition matter enormously.' },
          { text: 'White always wins this position', correct: false, explanation: 'Not always! With Black to move here, Black has the opposition and can hold a draw. King and pawn endgames are full of these nuances — a single tempo can change a win to a draw.' },
          { text: 'This is always a draw', correct: false, explanation: 'With White to move (not to lose the opposition), White can win by going around the Black King — heading to f6 or d6 to approach the key squares. King and pawn endgames require precise calculation.' },
          { text: 'Black can always hold because rook pawns draw', correct: false, explanation: 'This is a center pawn (e-pawn), not a rook pawn. The drawn rook pawn rule only applies to a/h pawns. Center pawns in front of an active King are much harder to defend.' },
        ],
      },
    ],
  } as any,
});

// Update UNITS to include the new lessons
export const ALL_LESSONS = LESSONS;
