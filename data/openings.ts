export interface OpeningStep {
  move: string;       // SAN notation
  uci: string;        // UCI format
  fen: string;        // Position after this move
  annotation: string; // Explanation of the move
  keyMove?: boolean;
}

export interface OpeningVariation {
  id: string;
  name: string;
  idea: string;
  steps: OpeningStep[];
  gameType: string;
}

export interface MiddlegamePlan {
  title: string;
  description: string;
  fen: string;
  arrows?: { from: string; to: string; color: 'gold' | 'green' | 'red' | 'blue' }[];
}

export interface CommonMistake {
  title: string;
  badMove: string;
  whyBad: string;
  correctMove: string;
  whyCorrect: string;
  fen: string;
}

export interface Opening {
  id: string;
  name: string;
  eco: string;
  tagline: string;
  intro: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  style: 'Tactical' | 'Positional' | 'Balanced';
  forColor: 'White' | 'Black' | 'Both';
  mainLine: OpeningStep[];
  variations: OpeningVariation[];
  middlegamePlans: MiddlegamePlan[];
  commonMistakes: CommonMistake[];
  famousPlayers: { name: string; note: string }[];
  tips: string[];
}

export const OPENINGS: Opening[] = [
  {
    id: 'italian-game',
    name: 'The Italian Game',
    eco: 'C50–C59',
    tagline: 'Classical, harmonious, and endlessly deep',
    difficulty: 'Beginner',
    style: 'Balanced',
    forColor: 'White',
    intro: 'The Italian Game is one of the oldest and most respected openings in chess. After 1.e4 e5 2.Nf3 Nc6 3.Bc4, White aims the Bishop at the f7 square — the weakest point in Black\'s position early on. It leads to rich, principled play that rewards understanding over memorization, making it perfect for players at any level.',
    famousPlayers: [
      { name: 'Fabiano Caruana', note: 'Uses it as his main weapon in top-level play' },
      { name: 'Magnus Carlsen', note: 'Frequently employs it for complex middlegame battles' },
      { name: 'Garry Kasparov', note: 'Played it throughout his career for its dynamic potential' },
    ],
    tips: [
      'After castling, focus on the d3-d4 pawn break to open the center',
      'The Bishop on c4 is a long-term asset — keep it active',
      'Knight on f3 controls e5 — prevent Black from establishing a strong center',
    ],
    mainLine: [
      {
        move: 'e4',
        uci: 'e2e4',
        fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
        annotation: '1.e4 — the most popular first move in chess. White immediately stakes a claim in the center and opens lines for the Queen and f1-Bishop. Bobby Fischer called it "best by test."',
        keyMove: true,
      },
      {
        move: 'e5',
        uci: 'e7e5',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
        annotation: '1...e5 — Black mirrors White\'s move, claiming central space symmetrically. This is the most classical response, leading to Open Game positions.',
      },
      {
        move: 'Nf3',
        uci: 'g1f3',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
        annotation: '2.Nf3 — the Knight develops to its best square, attacking the e5 pawn and pointing toward the center. This is almost universally White\'s second move in 1.e4 e5 positions.',
        keyMove: true,
      },
      {
        move: 'Nc6',
        uci: 'b8c6',
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
        annotation: '2...Nc6 — the most natural defense, developing a piece and defending e5 simultaneously. The Knight eyes d4 and e5.',
      },
      {
        move: 'Bc4',
        uci: 'f1c4',
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
        annotation: '3.Bc4 — the Italian! The Bishop targets f7, Black\'s most vulnerable square early in the game. White develops actively and prepares castling.',
        keyMove: true,
      },
      {
        move: 'Bc5',
        uci: 'f8c5',
        fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        annotation: '3...Bc5 — the Giuoco Piano ("Quiet Game"). Black mirrors White\'s development and stakes out the same diagonal. Both sides are ready to castle and begin the middlegame.',
      },
    ],
    variations: [
      {
        id: 'giuoco-piano',
        name: 'Giuoco Piano',
        idea: 'Solid, symmetrical development leading to a rich positional middlegame',
        gameType: 'Positional with tactical chances',
        steps: [
          {
            move: 'c3',
            uci: 'c2c3',
            fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4',
            annotation: '4.c3 prepares d4, aiming to establish a strong pawn center. This is the Giuoco Piano proper — slow but strategically sound.',
          },
          {
            move: 'Nf6',
            uci: 'g8f6',
            fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5',
            annotation: '4...Nf6 — Black develops the last minor piece and attacks e4. This natural move creates immediate counter-pressure.',
          },
        ],
      },
      {
        id: 'evans-gambit',
        name: 'Evans Gambit',
        idea: 'A pawn sacrifice to gain a massive development lead and attacking chances',
        gameType: 'Sharp and tactical',
        steps: [
          {
            move: 'b4',
            uci: 'b2b4',
            fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq - 0 4',
            annotation: '4.b4!? — the Evans Gambit! White offers a pawn to lure the Bishop away from its strong square, gaining time for a powerful central advance.',
            keyMove: true,
          },
          {
            move: 'Bxb4',
            uci: 'c5b4',
            fen: 'r1bqk1nr/pppp1ppp/2n5/4p3/1bB1P3/5N2/P1PP1PPP/RNBQK2R w KQkq - 0 5',
            annotation: '4...Bxb4 — accepting the gambit. Black takes the pawn but must later spend moves returning the Bishop, giving White a free hand in the center.',
          },
        ],
      },
      {
        id: 'two-knights',
        name: 'Two Knights Defense',
        idea: 'Black fights back immediately with active piece play instead of mirroring White',
        gameType: 'Dynamic and tactical',
        steps: [
          {
            move: 'Nf6',
            uci: 'g8f6',
            fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
            annotation: '3...Nf6 instead of Bc5 — the Two Knights Defense. Black immediately counterattacks with the Knight, creating tactical complications right from move three.',
            keyMove: true,
          },
        ],
      },
    ],
    middlegamePlans: [
      {
        title: 'The d3-d4 Pawn Break',
        description: 'After completing development and castling, White\'s primary middlegame plan is the d3-d4 advance. This opens the center, activates the c4-Bishop, and gives White more space. The ideal moment is after Nc3-e2-g3 or simply when Black cannot comfortably respond.',
        fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2BPP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
        arrows: [{ from: 'd3', to: 'd4', color: 'gold' }],
      },
      {
        title: 'Kingside Attack After Castling',
        description: 'With the King safely castled, White can begin a kingside attack. The f4-f5 advance, combined with a Rook lift (Re1-e3-g3), creates serious threats against the Black King. The Bishop on c4 and Knight on f3 both point toward the kingside.',
        fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP1BPPP/R1BQ1RK1 w - - 0 9',
        arrows: [
          { from: 'f2', to: 'f4', color: 'gold' },
          { from: 'f1', to: 'e3', color: 'green' },
        ],
      },
    ],
    commonMistakes: [
      {
        title: 'Playing Ng5 too early',
        badMove: 'Ng5',
        whyBad: 'After 3.Ng5, Black can play 3...Nf6 attacking e4, or even 3...d5 striking the center. The Knight on g5 is exposed and Black gets active counterplay.',
        correctMove: 'Bc4',
        whyCorrect: '3.Bc4 is more principled — it develops a piece toward the center and creates long-term pressure on f7 without exposing the Knight.',
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
      },
      {
        title: 'Grabbing f7 with Bxf7+ too early',
        badMove: 'Bxf7+',
        whyBad: 'This "Greek Gift" sacrifice rarely works in the Italian Game at an early stage. After Kxf7, White has lost the Bishop for a pawn and pawn structure but Black\'s King can often escape to safety.',
        correctMove: 'Nc3',
        whyCorrect: 'Developing Nc3 maintains all advantages without speculative play. The f7 threat can be used as long-term pressure rather than an immediate sacrifice.',
        fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
      },
    ],
  },
  {
    id: 'sicilian-defense',
    name: 'The Sicilian Defense',
    eco: 'B20–B99',
    tagline: 'The sharpest, most complex reply to 1.e4',
    difficulty: 'Intermediate',
    style: 'Tactical',
    forColor: 'Black',
    intro: 'The Sicilian is the most popular chess opening at all levels, from club players to World Champions. After 1.e4 c5, Black avoids the symmetrical positions that arise after 1...e5 and instead creates an asymmetrical pawn structure, fighting for the d4 square without directly contesting e4. This asymmetry creates rich, complex positions where both sides have winning chances.',
    famousPlayers: [
      { name: 'Bobby Fischer', note: 'Called it Black\'s best answer to 1.e4; used it extensively' },
      { name: 'Garry Kasparov', note: 'Played it his entire career, particularly the Najdorf variation' },
      { name: 'Magnus Carlsen', note: 'Uses multiple Sicilian systems depending on the opponent' },
    ],
    tips: [
      'Black\'s queenside majority of pawns is a long-term asset — activate it in the endgame',
      'Always look for the d5 break to free your position',
      'Control the d4 square — it\'s the key to the Sicilian structure',
    ],
    mainLine: [
      {
        move: 'e4',
        uci: 'e2e4',
        fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
        annotation: '1.e4 — White takes the center.',
        keyMove: false,
      },
      {
        move: 'c5',
        uci: 'c7c5',
        fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
        annotation: '1...c5 — the Sicilian! Black attacks the d4 square without symmetrically mirroring e4. This creates immediate imbalance and fights for the initiative.',
        keyMove: true,
      },
      {
        move: 'Nf3',
        uci: 'g1f3',
        fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
        annotation: '2.Nf3 — the most flexible response. White prepares d4 without committing yet.',
      },
      {
        move: 'd6',
        uci: 'd7d6',
        fen: 'rnbqkbnr/pp2pppp/3p4/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3',
        annotation: '2...d6 — preparing Nf6 and eventually e5. This is the Najdorf move order.',
      },
      {
        move: 'd4',
        uci: 'd2d4',
        fen: 'rnbqkbnr/pp2pppp/3p4/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3',
        annotation: '3.d4 — White opens the center. Black will capture and White recaptures with the Knight, gaining a central pawn majority.',
        keyMove: true,
      },
      {
        move: 'cxd4',
        uci: 'c5d4',
        fen: 'rnbqkbnr/pp2pppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4',
        annotation: '3...cxd4 — Black eliminates White\'s d-pawn. Now White gets the Open Sicilian.',
      },
      {
        move: 'Nxd4',
        uci: 'f3d4',
        fen: 'rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4',
        annotation: '4.Nxd4 — the Open Sicilian. White has a pawn majority in the center, Black has queenside counterplay. The battle is joined.',
      },
    ],
    variations: [
      {
        id: 'najdorf',
        name: 'Najdorf Variation',
        idea: 'The most sophisticated Sicilian — a5 prepares queenside play while waiting',
        gameType: 'Complex and double-edged',
        steps: [
          {
            move: 'Nf6',
            uci: 'g8f6',
            fen: 'rnbqkb1r/pp2pppp/3p1n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5',
            annotation: '4...Nf6 — developing and attacking e4.',
          },
          {
            move: 'Nc3',
            uci: 'b1c3',
            fen: 'rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 2 5',
            annotation: '5.Nc3 — the most popular continuation.',
          },
          {
            move: 'a6',
            uci: 'a7a6',
            fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
            annotation: '5...a6 — the Najdorf! This quiet pawn move prepares b5, controls b5, and keeps White\'s pieces out of b5. Deceptively deep.',
            keyMove: true,
          },
        ],
      },
      {
        id: 'dragon',
        name: 'Dragon Variation',
        idea: 'Black\'s Bishop on g7 breathes fire along the h8-a1 diagonal',
        gameType: 'Extremely sharp and tactical',
        steps: [
          {
            move: 'g6',
            uci: 'g7g6',
            fen: 'rnbqkbnr/pp2pp1p/3p2p1/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5',
            annotation: '4...g6 — the Dragon! Black fianchettoes the Bishop to g7 where it becomes a powerful long-range weapon.',
            keyMove: true,
          },
        ],
      },
      {
        id: 'scheveningen',
        name: 'Scheveningen Variation',
        idea: 'A solid pawn chain that fights for the d5 square',
        gameType: 'Solid and resilient',
        steps: [
          {
            move: 'e6',
            uci: 'e7e6',
            fen: 'rnbqkbnr/pp3ppp/3pp3/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5',
            annotation: '4...e6 — the Scheveningen. A solid structure that keeps options open and fights for the center differently from the Najdorf.',
          },
        ],
      },
    ],
    middlegamePlans: [
      {
        title: 'Queenside Counterattack',
        description: 'Black\'s typical middlegame plan involves a queenside expansion with b5-b4, targeting White\'s queenside pawns. The open c-file is Black\'s highway for Rooks, and the d5 break at the right moment liberates the position.',
        fen: 'r1bqr1k1/pp3ppp/2np1n2/4p3/3NP3/2N1BP2/PPP3PP/R2QKB1R b KQ - 2 9',
        arrows: [
          { from: 'b7', to: 'b5', color: 'gold' },
          { from: 'a8', to: 'c8', color: 'green' },
        ],
      },
      {
        title: 'The d5 Break',
        description: 'Black\'s most important freeing move is d5. When properly supported, this advance frees Black\'s position and challenges White\'s central control. The timing must be right — premature d5 can leave Black\'s pawns weak.',
        fen: 'r1bqr1k1/pp3ppp/2n2n2/3pp3/3NP3/2N1B3/PPP2PPP/R2QKB1R b KQ - 0 8',
        arrows: [{ from: 'd6', to: 'd5', color: 'gold' }],
      },
    ],
    commonMistakes: [
      {
        title: 'Playing d5 too early',
        badMove: 'd5',
        whyBad: 'An early d5 before completing development usually loses a pawn or creates weak isolated pawns. White captures exd5 and Black\'s position falls apart.',
        correctMove: 'Nf6',
        whyCorrect: 'Develop pieces first! Get the Knight to f6, castle, and prepare d5 only when it can be properly supported and the time is right.',
        fen: 'rnbqkb1r/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4',
      },
      {
        title: 'Forgetting about the kingside in the race',
        badMove: 'b5',
        whyBad: 'Rushing queenside counterplay before castling can be fatal. White attacks the king while Black\'s forces are on the wrong side of the board.',
        correctMove: 'Be7',
        whyCorrect: 'Develop the Bishop and castle first. A safe King is a prerequisite for any counterattack — only then can Black safely expand on the queenside.',
        fen: 'r1bqkb1r/pp3ppp/2np1n2/4p3/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 2 7',
      },
    ],
  },
  {
    id: 'queens-gambit',
    name: "The Queen's Gambit",
    eco: 'D06–D69',
    tagline: "Chess's most prestigious and classical opening",
    difficulty: 'Beginner',
    style: 'Positional',
    forColor: 'White',
    intro: "The Queen's Gambit is perhaps the most respected opening in chess — played by every World Champion and studied for centuries. After 1.d4 d5 2.c4, White offers a pawn to gain central control. Despite the name, it isn't truly a gambit — Black can rarely keep the pawn safely, and the resulting positions offer rich strategic battles.",
    famousPlayers: [
      { name: 'Jose Raul Capablanca', note: 'Used it to dominate opponents positionally' },
      { name: 'Anatoly Karpov', note: 'Built his entire style around Queen\'s Gambit positions' },
      { name: 'Magnus Carlsen', note: 'Uses QGD and QGA depending on his mood and opponent' },
    ],
    tips: [
      'The c4 pawn can almost always be recovered — focus on development',
      "In the QGD, the c8-Bishop is often Black's problem piece — help it get active",
      'Control of the e5 and d5 squares is crucial in most variations',
    ],
    mainLine: [
      {
        move: 'd4',
        uci: 'd2d4',
        fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1',
        annotation: '1.d4 — the second most popular first move. White stakes a central claim and opens the diagonal for the c1-Bishop.',
        keyMove: true,
      },
      {
        move: 'd5',
        uci: 'd7d5',
        fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
        annotation: '1...d5 — Black responds symmetrically, contesting the center directly.',
      },
      {
        move: 'c4',
        uci: 'c2c4',
        fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',
        annotation: "2.c4 — the Queen's Gambit! White attacks the d5 pawn. If Black captures, White wins the center. If Black defends, the c4 pawn puts pressure on d5.",
        keyMove: true,
      },
      {
        move: 'e6',
        uci: 'e7e6',
        fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
        annotation: "2...e6 — the Queen's Gambit Declined. Black reinforces d5 and takes a solid stance. The c8-Bishop is temporarily locked in, but the position is solid.",
        keyMove: true,
      },
      {
        move: 'Nc3',
        uci: 'b1c3',
        fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3',
        annotation: '3.Nc3 — developing the Knight and adding pressure to d5.',
      },
      {
        move: 'Nf6',
        uci: 'g8f6',
        fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
        annotation: '3...Nf6 — developing and guarding d5 with another piece.',
      },
    ],
    variations: [
      {
        id: 'queens-gambit-accepted',
        name: "Queen's Gambit Accepted",
        idea: 'Black takes the pawn and fights for equality in more open positions',
        gameType: 'Dynamic with open lines',
        steps: [
          {
            move: 'dxc4',
            uci: 'd5c4',
            fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
            annotation: '2...dxc4 — the QGA! Black accepts the pawn, understanding they cannot easily hold it. The position opens up and becomes more dynamic.',
            keyMove: true,
          },
        ],
      },
      {
        id: 'slav-defense',
        name: 'Slav Defense',
        idea: 'A solid way to support d5 without locking in the c8-Bishop',
        gameType: 'Solid and reliable',
        steps: [
          {
            move: 'c6',
            uci: 'c7c6',
            fen: 'rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
            annotation: '2...c6 — the Slav. Black supports d5 with a pawn, keeping the c8-Bishop\'s diagonal open. This is one of Black\'s most solid replies.',
            keyMove: true,
          },
        ],
      },
      {
        id: 'nimzo-indian',
        name: 'Nimzo-Indian Defense',
        idea: 'Pin the c3 Knight immediately to fight for the center without ...d5',
        gameType: 'Rich and imbalanced',
        steps: [
          {
            move: 'Nf6',
            uci: 'g8f6',
            fen: 'rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2',
            annotation: '1...Nf6 — flexible, heading toward Nimzo-Indian or King\'s Indian.',
          },
          {
            move: 'c4',
            uci: 'c2c4',
            fen: 'rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',
            annotation: '2.c4',
          },
          {
            move: 'e6',
            uci: 'e7e6',
            fen: 'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
            annotation: '2...e6',
          },
          {
            move: 'Nc3',
            uci: 'b1c3',
            fen: 'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3',
            annotation: '3.Nc3',
          },
          {
            move: 'Bb4',
            uci: 'f8b4',
            fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
            annotation: '3...Bb4 — the Nimzo-Indian! The Bishop pins the c3 Knight, fighting for the center indirectly and creating long-term pressure on White\'s pawn structure.',
            keyMove: true,
          },
        ],
      },
    ],
    middlegamePlans: [
      {
        title: 'Minority Attack on the Queenside',
        description: "White's classic plan in the QGD Exchange variation is the minority attack — advancing b4-b5 to create weaknesses in Black's queenside pawn structure, particularly the c6 pawn which becomes isolated and weak.",
        fen: 'r1b1r1k1/pp3ppp/2p2n2/3p4/2PP4/2N1BN2/PP3PPP/R4RK1 w - - 0 14',
        arrows: [
          { from: 'b2', to: 'b4', color: 'gold' },
          { from: 'b4', to: 'b5', color: 'gold' },
        ],
      },
      {
        title: 'Freeing the c8-Bishop in the QGD',
        description: "Black's main strategic challenge in the QGD is freeing the c8-Bishop, which is locked behind the e6 pawn. The plan involves e5 or a well-timed exchange to open the diagonal, often after moves like ...Bd6, ...0-0, and ...e5.",
        fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 4 8',
        arrows: [{ from: 'e6', to: 'e5', color: 'blue' }],
      },
    ],
    commonMistakes: [
      {
        title: 'Holding the gambit pawn with b5',
        badMove: 'b5',
        whyBad: "After 2...dxc4 3.Nf3 b5?, White plays 4.a4! and the b5 pawn falls, leaving Black with nothing to show for the cramped position. The gambit pawn should not be defended this way.",
        correctMove: 'e6',
        whyCorrect: '2...dxc4 3.Nf3 e6 — develop normally and let White recapture the pawn in their own time. Black will have quick development as compensation.',
        fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3',
      },
      {
        title: 'Developing the c8-Bishop too early in the QGD',
        badMove: 'Bd7',
        whyBad: 'The c8-Bishop on d7 is passive and blocks the c-file. White continues development easily while Black\'s position remains cramped.',
        correctMove: 'Be7',
        whyCorrect: "Be7 is solid and prepares kingside castling. The c8-Bishop is best activated after 0-0 and ...dxc4 or ...e5 to open diagonals.",
        fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
      },
    ],
  },
];

export function getOpeningById(id: string): Opening | undefined {
  return OPENINGS.find(o => o.id === id);
}

// Phase 5 — 7 more openings
export const OPENINGS_PHASE5: Opening[] = [
  {
    id: 'kings-indian',
    name: "King's Indian Defense",
    eco: 'E60–E99',
    tagline: 'Hypermodern fighting chess for dynamic players',
    difficulty: 'Intermediate',
    style: 'Tactical',
    forColor: 'Black',
    intro: "The King's Indian is one of the most combative and complex openings in chess. Black allows White to build a large pawn center with d4 and e4, then attacks it with …d6 and …e5 or …c5. The resulting positions are double-edged with chances for both sides. Favorite of Fischer, Kasparov, and countless other champions.",
    famousPlayers: [
      { name: 'Bobby Fischer', note: 'Played it his entire career with devastating effect' },
      { name: 'Garry Kasparov', note: 'His main weapon as Black in the 1980s–1990s' },
      { name: 'Hikaru Nakamura', note: 'Modern-day KID specialist with many novelties' },
    ],
    tips: [
      'The g7 Bishop is your most powerful piece — keep it active',
      'Counterattack in the center with …e5 or …c5 at the right moment',
      'Don\'t castle too late — but once castled, launch the kingside attack',
    ],
    mainLine: [
      { move: 'd4', uci: 'd2d4', fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1', annotation: '1.d4 — the start of many complex opening systems.' },
      { move: 'Nf6', uci: 'g8f6', fen: 'rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2', annotation: '1...Nf6 — flexible, fighting for e4.' },
      { move: 'c4', uci: 'c2c4', fen: 'rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2', annotation: '2.c4 — staking out space.' },
      { move: 'g6', uci: 'g7g6', fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3', annotation: '2...g6 — the King\'s Indian! The Bishop will go to g7.', keyMove: true },
      { move: 'Nc3', uci: 'b1c3', fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3', annotation: '3.Nc3' },
      { move: 'Bg7', uci: 'f8g7', fen: 'rnbqk2r/ppppppbp/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4', annotation: '3...Bg7 — the Dragon Bishop. This piece is Black\'s most powerful asset.', keyMove: true },
      { move: 'e4', uci: 'e2e4', fen: 'rnbqk2r/ppppppbp/5np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR b KQkq - 0 4', annotation: '4.e4 — White establishes the broad center.', keyMove: true },
      { move: 'd6', uci: 'd7d6', fen: 'rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR w KQkq - 0 5', annotation: '4...d6 — preparing …e5 to challenge the center.' },
    ],
    variations: [
      { id: 'kid-classical', name: 'Classical Variation', idea: 'Nf3 + Be2 — solid central development', gameType: 'Strategic with kingside attack', steps: [{ move: 'Nf3', uci: 'g1f3', fen: 'rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP3PPP/R1BQKB1R b KQkq - 1 5', annotation: '5.Nf3' }, { move: 'O-O', uci: 'e8g8', fen: 'rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP3PPP/R1BQKB1R w KQ - 2 6', annotation: '5...O-O — castling immediately.' }] },
      { id: 'kid-saemisch', name: 'Sämisch Variation', idea: 'f3 — aggressive anti-KID system', gameType: 'Extremely sharp', steps: [{ move: 'f3', uci: 'f2f3', fen: 'rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2P2/PP4PP/R1BQKBNR b KQkq - 0 5', annotation: '5.f3! — the Sämisch. Aggressive, preventing Ng4 and preparing a kingside pawn storm.', keyMove: true }] },
      { id: 'kid-four-pawns', name: 'Four Pawns Attack', idea: 'Maximum central aggression', gameType: 'Wild and theoretical', steps: [{ move: 'f4', uci: 'f2f4', fen: 'rnbqk2r/ppp1ppbp/3p1np1/8/2PPPP2/2N5/PP4PP/R1BQKBNR b KQkq - 0 5', annotation: '5.f4 — the Four Pawns Attack. White builds a massive pawn center — Black must react immediately.', keyMove: true }] },
    ],
    middlegamePlans: [
      { title: '…e5 Counter in the Center', description: 'Black\'s main counterplay comes with …e5, challenging White\'s center. After d4xe5, Black recaptures and the position opens. After the center is closed with d4-d5, Black attacks on the kingside with …f5-f4.', fen: 'r1bq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 4 7', arrows: [{ from: 'e7', to: 'e5', color: 'gold' }] },
      { title: 'Kingside Attack with …f5', description: 'When White closes the center with d5, Black attacks on the kingside. The plan: …Ne8-d6-f5, …g5, …Nh5-f4, and a pawn storm. This is the classic KID attacking plan used by Fischer and Kasparov.', fen: 'r1bq1rk1/ppp3bp/3pnnp1/3Ppp2/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 11', arrows: [{ from: 'f5', to: 'f4', color: 'gold' }, { from: 'g6', to: 'g5', color: 'green' }] },
    ],
    commonMistakes: [
      { title: 'Playing …e5 without preparation', badMove: 'e5', whyBad: 'An early …e5 before completing development and castling allows White to play d5, creating a space advantage and restricting the g7 Bishop.', correctMove: 'O-O', whyCorrect: 'Castle first, then prepare …e5 with …Re8 and …Nbd7 to ensure the center counterplay is properly supported.', fen: 'rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP3PPP/R1BQKB1R b KQkq - 1 5' },
      { title: 'Exchanging the g7 Bishop too early', badMove: 'Bxc3', whyBad: 'Trading the Dragon Bishop on g7 for a Knight or even the Bishop pair hands White a lasting structural and dynamic advantage.', correctMove: 'Bg7', whyCorrect: 'Preserve the g7 Bishop at all costs — it\'s the soul of the King\'s Indian and Black\'s main attacking piece.', fen: 'r1bqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP3PPP/R1BQKB1R b KQkq - 1 5' },
    ],
  },
  {
    id: 'ruy-lopez',
    name: 'The Ruy López',
    eco: 'C60–C99',
    tagline: 'The most studied opening in chess history',
    difficulty: 'Intermediate',
    style: 'Positional',
    forColor: 'White',
    intro: 'The Ruy López (Spanish Opening) is the most analyzed opening in chess history. After 1.e4 e5 2.Nf3 Nc6 3.Bb5, White pins the defender of the e5 pawn, creating long-term pressure. The resulting positions offer rich strategic battles and have been the battleground of every World Championship match for over a century.',
    famousPlayers: [
      { name: 'Anatoly Karpov', note: 'Built his entire career on the positional subtleties of the Spanish' },
      { name: 'Ruy de Segura', note: 'Spanish priest who analyzed it in 1561, giving the opening its name' },
      { name: 'Magnus Carlsen', note: 'Uses it regularly, often transposing to Berlin endings' },
    ],
    tips: [
      'The Bb5 doesn\'t immediately win e5 — it creates long-term strategic pressure',
      'The Berlin Defense (3...Nf6) leads to famous endgames — study them',
      'White\'s plan often involves d4 to open the center after careful preparation',
    ],
    mainLine: [
      { move: 'e4', uci: 'e2e4', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1', annotation: '1.e4' },
      { move: 'e5', uci: 'e7e5', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2', annotation: '1...e5' },
      { move: 'Nf3', uci: 'g1f3', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2', annotation: '2.Nf3 — attacking e5.' },
      { move: 'Nc6', uci: 'b8c6', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3', annotation: '2...Nc6 — defending e5.' },
      { move: 'Bb5', uci: 'f1b5', fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3', annotation: '3.Bb5 — the Ruy López! The Bishop pins the Nc6 (indirectly) against the King.', keyMove: true },
      { move: 'a6', uci: 'a7a6', fen: 'r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', annotation: '3...a6 — the Morphy Defense. Black challenges the Bishop immediately.' },
      { move: 'Ba4', uci: 'b5a4', fen: 'r1bqkbnr/1ppp1ppp/p1n5/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 4', annotation: '4.Ba4 — retreating to maintain pressure. White keeps the pin alive.', keyMove: true },
      { move: 'Nf6', uci: 'g8f6', fen: 'r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5', annotation: '4...Nf6 — Black counterattacks e4 immediately.' },
    ],
    variations: [
      { id: 'berlin', name: 'Berlin Defense', idea: 'Solid endgame-oriented play', gameType: 'Strategic and endgame-heavy', steps: [{ move: 'Nf6', uci: 'g8f6', fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', annotation: '3...Nf6 — the Berlin. After 4.O-O Nxe4 5.Re1 Nd6, Queens are often traded early leading to famous endgames.', keyMove: true }] },
      { id: 'marshall', name: 'Marshall Attack', idea: 'A stunning pawn sacrifice for lasting initiative', gameType: 'Extremely sharp and theoretical', steps: [{ move: 'd5', uci: 'd7d5', fen: 'r1bq1rk1/2p2ppp/p1pb1n2/1B1Pp3/4P3/2N2N2/PPPQ1PPP/R3K2R b KQ - 0 9', annotation: '8...d5! — the Marshall Gambit. Black sacrifices a pawn for enormous attacking chances. Named after American GM Frank Marshall.', keyMove: true }] },
      { id: 'closed-ruy', name: 'Closed Variation', idea: 'Slow maneuvering with d3 and Nd2-f1-g3', gameType: 'Positional and long-term', steps: [{ move: 'd3', uci: 'd2d3', fen: 'r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 5', annotation: '5.d3 — the Closed Ruy. A slower approach — White builds a solid position and maneuvers pieces to optimal squares without early pawn breaks.', keyMove: true }] },
    ],
    middlegamePlans: [
      { title: 'The d4 Break', description: 'White\'s central plan is the d4 advance, typically after O-O, Re1, c3, and Nbd2. This challenges Black\'s center, opens the position for White\'s Bishops and Rooks, and creates play on the d-file. The timing of d4 is crucial.', fen: 'r1bq1rk1/1pp2ppp/p1npbn2/4p3/B3P3/3P1N2/PPPN1PPP/R1BQR1K1 w - - 2 10', arrows: [{ from: 'd3', to: 'd4', color: 'gold' }] },
      { title: 'Queenside Expansion', description: 'After the center is stabilized, White often advances on the queenside with a4-a5 or b4-b5. This exploits the space advantage that the Ruy López structure provides and creates long-term pressure against Black\'s queenside pawns.', fen: 'r1b2rk1/1pp1qppp/p1np1n2/4p3/B2PP3/2N2N2/PPP1BPPP/R1BQR1K1 w - - 4 11', arrows: [{ from: 'a2', to: 'a4', color: 'gold' }, { from: 'a4', to: 'a5', color: 'green' }] },
    ],
    commonMistakes: [
      { title: 'Taking the e5 pawn with Bxc6+ first', badMove: 'Bxc6', whyBad: 'If White plays Bxc6 and then Nxe5, Black plays Qe7! forking the Knight and threatening Qxe4+. White loses material.', correctMove: 'Ba4', whyCorrect: 'The Bishop retreats to maintain long-term pressure. Immediate capture of e5 is tactically flawed without careful preparation.', fen: 'r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4' },
      { title: 'Pushing d4 too early', badMove: 'd4', whyBad: 'Without preparation (c3, castling, Re1), the d4 advance can leave White\'s center overextended and Black can counter with exd4, cxd4 creating a mobile pawn center.', correctMove: 'O-O', whyCorrect: 'Castle first, then Re1, then c3, then Nbd2, and only then play d4 with full preparation.', fen: 'r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5' },
    ],
  },
  {
    id: 'french-defense',
    name: 'The French Defense',
    eco: 'C00–C19',
    tagline: 'Solid, strategic, and uncompromising',
    difficulty: 'Beginner',
    style: 'Positional',
    forColor: 'Black',
    intro: 'The French Defense (1.e4 e6) is one of the most reliable responses to 1.e4. Black immediately prepares to fight for the d5 square and accepts a slightly cramped position in exchange for a very solid pawn structure. The resulting positions favor strategic players who enjoy long maneuvering battles.',
    famousPlayers: [
      { name: 'Viktor Korchnoi', note: 'Greatest French Defense player of all time' },
      { name: 'Mikhail Botvinnik', note: 'Used it in World Championship matches' },
      { name: 'Tigran Petrosian', note: 'Loved its solid, defensive qualities' },
    ],
    tips: [
      'The c8-Bishop on e6 is often Black\'s problematic piece — find ways to activate it',
      'The …c5 break is Black\'s most important liberating move',
      'In the Winawer, Black sacrifices a pawn for dynamic compensation',
    ],
    mainLine: [
      { move: 'e4', uci: 'e2e4', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1', annotation: '1.e4' },
      { move: 'e6', uci: 'e7e6', fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2', annotation: '1...e6 — the French! Solid and principled.', keyMove: true },
      { move: 'd4', uci: 'd2d4', fen: 'rnbqkbnr/pppp1ppp/4p3/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2', annotation: '2.d4 — taking the center.' },
      { move: 'd5', uci: 'd7d5', fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3', annotation: '2...d5 — challenging the center immediately.' },
      { move: 'Nc3', uci: 'b1c3', fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3', annotation: '3.Nc3 — the most popular. White defends e4.' },
    ],
    variations: [
      { id: 'winawer', name: 'Winawer Variation', idea: 'Pin and double White\'s pawns', gameType: 'Sharp and unbalanced', steps: [{ move: 'Bb4', uci: 'f8b4', fen: 'rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4', annotation: '3...Bb4 — the Winawer. Pin the Nc3, aiming to double White\'s pawns.', keyMove: true }] },
      { id: 'classical', name: 'Classical Variation', idea: 'Solid development with Nf6', gameType: 'Strategic and solid', steps: [{ move: 'Nf6', uci: 'g8f6', fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4', annotation: '3...Nf6 — the Classical. Solid development, fighting for the center.', keyMove: true }] },
      { id: 'advance', name: 'Advance Variation', idea: 'e5 closes the center for a kingside attack', gameType: 'Aggressive and pawn-structure-focused', steps: [{ move: 'e5', uci: 'e4e5', fen: 'rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 0 4', annotation: '4.e5 — the Advance. White closes the center and prepares a kingside attack. Black counters with …c5.', keyMove: true }] },
    ],
    middlegamePlans: [
      { title: 'The …c5 Break', description: 'Black\'s primary counterplay comes from …c5, challenging White\'s d4 pawn. This opens lines for Black\'s pieces and creates a pawn majority on the queenside. The timing of …c5 is the key strategic decision in most French Defense games.', fen: 'r1bqk2r/pp3ppp/4pn2/2pp4/3PP3/2N2N2/PPP1BPPP/R1BQK2R w KQkq - 0 8', arrows: [{ from: 'c7', to: 'c5', color: 'gold' }] },
      { title: 'Attacking the d4 Pawn Chain', description: 'In Advance Variation positions, Black attacks the base of White\'s pawn chain with …c5. White\'s chain is e5-d4; the base is d4. Black uses …Nc6, …Qb6, and …c5 to pressure d4, forcing White to either defend or allow the center to collapse.', fen: 'rnbqkb1r/pp3ppp/4pn2/2ppP3/3P4/2N2N2/PPP1BPPP/R1BQK2R b KQkq - 1 7', arrows: [{ from: 'c5', to: 'd4', color: 'red' }] },
    ],
    commonMistakes: [
      { title: 'Allowing exd5 without recapturing correctly', badMove: 'exd5', whyBad: 'After exd5, if Black recaptures with the pawn (cxd5 or …exd5), the pawn structure is symmetrical and Black has lost the French\'s solid qualities without gaining anything.', correctMove: 'Nxd5', whyCorrect: 'Recapture with the Knight to maintain a compact structure and keep more central tension.', fen: 'rnbqkb1r/ppp2ppp/4p3/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 1 4' },
      { title: 'Passive defense without …c5', badMove: 'Be7', whyBad: 'Playing too passively without the …c5 break allows White to build a free hand in the center and launch a kingside attack before Black can create counterplay.', correctMove: 'c5', whyCorrect: 'Strike at the center with …c5 at the right moment — this is Black\'s lifeblood in the French Defense.', fen: 'r1bqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 3 5' },
    ],
  },
  {
    id: 'caro-kann',
    name: 'The Caro-Kann Defense',
    eco: 'B10–B19',
    tagline: 'Solid, active, and always reliable',
    difficulty: 'Beginner',
    style: 'Balanced',
    forColor: 'Black',
    intro: 'The Caro-Kann (1.e4 c6) is one of the most reliable defenses to 1.e4. Black prepares …d5 with the c-pawn, keeping the c8-Bishop\'s diagonal open (unlike the French). The resulting positions are solid but not passive — Black seeks active counterplay while maintaining a sound structure.',
    famousPlayers: [
      { name: 'Anatoly Karpov', note: 'Won many World Championship games with it' },
      { name: 'Hou Yifan', note: 'Former Women\'s World Champion who uses it regularly' },
      { name: 'Magnus Carlsen', note: 'Employs it for solid positions in rapid play' },
    ],
    tips: [
      'The c8-Bishop stays active — a key advantage over the French',
      'After …dxe4, aim to develop actively and fight for the center',
      'The Caro-Kann is perfect if you want solid but not passive positions',
    ],
    mainLine: [
      { move: 'e4', uci: 'e2e4', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1', annotation: '1.e4' },
      { move: 'c6', uci: 'c7c6', fen: 'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2', annotation: '1...c6 — the Caro-Kann! Preparing …d5.', keyMove: true },
      { move: 'd4', uci: 'd2d4', fen: 'rnbqkbnr/pp1ppppp/2p5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2', annotation: '2.d4' },
      { move: 'd5', uci: 'd7d5', fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3', annotation: '2...d5 — challenging the center.' },
      { move: 'Nc3', uci: 'b1c3', fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3', annotation: '3.Nc3 — defending e4.' },
      { move: 'dxe4', uci: 'd5e4', fen: 'rnbqkbnr/pp2pppp/2p5/8/3Pp3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4', annotation: '3...dxe4 — capturing. Now White must recapture.', keyMove: true },
      { move: 'Nxe4', uci: 'c3e4', fen: 'rnbqkbnr/pp2pppp/2p5/8/3PN3/8/PPP2PPP/R1BQKBNR b KQkq - 0 4', annotation: '4.Nxe4 — the main continuation. The Knight enters the center.' },
    ],
    variations: [
      { id: 'caro-classical', name: 'Classical Variation', idea: 'Develop both bishops actively', gameType: 'Solid and reliable', steps: [{ move: 'Bf5', uci: 'c8f5', fen: 'rn1qkbnr/pp2pppp/2p5/5b2/3PN3/8/PPP2PPP/R1BQKBNR w KQkq - 1 5', annotation: '4...Bf5 — the Classical. The Bishop develops actively BEFORE pushing …e6.', keyMove: true }] },
      { id: 'caro-advance', name: 'Advance Variation', idea: 'White pushes e5 for space', gameType: 'Space-based positional play', steps: [{ move: 'e5', uci: 'e4e5', fen: 'rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3', annotation: '3.e5 — the Advance. White grabs space but Black has good counterplay with …Bf5 and …e6.', keyMove: true }] },
      { id: 'caro-fantasy', name: 'Fantasy Variation', idea: 'Gambit-like play with f3', gameType: 'Sharp and aggressive', steps: [{ move: 'f3', uci: 'f2f3', fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/5P2/PPP3PP/RNBQKBNR b KQkq - 0 3', annotation: '3.f3!? — the Fantasy Variation. An aggressive gambit attempt, not often seen at the top level but dangerous for unprepared players.' }] },
    ],
    middlegamePlans: [
      { title: 'Active Bishop Development', description: 'Unlike the French, the Caro-Kann allows the c8-Bishop to develop outside the pawn chain. After …Bf5, the Bishop is actively placed and supports Black\'s queenside play. This active Bishop is the main reason players prefer the Caro over the French.', fen: 'rn1qkb1r/pp2pppp/2p2n2/5b2/3PN3/3B4/PPP2PPP/R1BQK2R b KQkq - 3 6', arrows: [{ from: 'f5', to: 'b1', color: 'gold' }] },
      { title: 'Queenside Counterplay', description: 'Black typically generates counterplay on the queenside. After castling, Black can advance with …c5 to challenge White\'s center, followed by …Qb6 pressuring b2 and d4. The half-open d-file gives Black\'s Rooks active posting.', fen: 'r2q1rk1/pp2ppbp/2p2np1/5b2/2pP4/2N1BN2/PP2BPPP/R2Q1RK1 b - - 4 11', arrows: [{ from: 'c6', to: 'c5', color: 'gold' }, { from: 'd8', to: 'b6', color: 'green' }] },
    ],
    commonMistakes: [
      { title: 'Playing …Bf5 too late', badMove: 'e6', whyBad: 'Playing …e6 before …Bf5 traps the c8-Bishop behind the pawn chain — exactly what the Caro-Kann is supposed to avoid.', correctMove: 'Bf5', whyCorrect: '4...Bf5 immediately — develop the Bishop before closing the diagonal with …e6.', fen: 'rnbqkbnr/pp2pppp/2p5/8/3PN3/8/PPP2PPP/R1BQKBNR b KQkq - 0 4' },
      { title: 'Exchanging the strong Bishop', badMove: 'Bxe4', whyBad: 'Trading the Bf5 for a Knight gives White the two Bishops and removes Black\'s most active piece without compensation.', correctMove: 'Nf6', whyCorrect: 'Develop the Knight and keep the Bishop active. The Bishop on f5 or g6 is Black\'s most important piece.', fen: 'rn1qkb1r/pp2pppp/2p2n2/5b2/3PN3/8/PPP2PPP/R1BQKBNR w KQkq - 2 5' },
    ],
  },
  {
    id: 'english-opening',
    name: 'The English Opening',
    eco: 'A10–A39',
    tagline: 'Flexible, positional, and deeply strategic',
    difficulty: 'Intermediate',
    style: 'Positional',
    forColor: 'White',
    intro: 'The English Opening (1.c4) is a hypermodern opening where White fights for central control indirectly, without immediately occupying the center with pawns. It leads to rich positional battles and transposes frequently into other openings. Especially popular among players who prefer strategic maneuvering over early confrontation.',
    famousPlayers: [
      { name: 'Mikhail Botvinnik', note: 'Pioneer of the English at the top level' },
      { name: 'Anatoly Karpov', note: 'Used it to outmaneuver opponents positionally' },
      { name: 'Magnus Carlsen', note: 'Employs it regularly for flexible, complex positions' },
    ],
    tips: [
      'The English frequently transposes to Queen\'s Gambit or King\'s Indian positions',
      'Control d5 — it\'s the key square in almost all English Opening systems',
      'Be flexible — the English is defined by piece play, not pawn structure',
    ],
    mainLine: [
      { move: 'c4', uci: 'c2c4', fen: 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1', annotation: '1.c4 — the English Opening. White attacks d5 from the flank.', keyMove: true },
      { move: 'e5', uci: 'e7e5', fen: 'rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2', annotation: '1...e5 — the Reversed Sicilian. Black takes central space.' },
      { move: 'Nc3', uci: 'b1c3', fen: 'rnbqkbnr/pppp1ppp/8/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR b KQkq - 1 2', annotation: '2.Nc3 — developing toward d5.' },
      { move: 'Nf6', uci: 'g8f6', fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3', annotation: '2...Nf6 — active development.' },
      { move: 'g3', uci: 'g2g3', fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N3P1/PP1PPP1P/R1BQKBNR b KQkq - 0 3', annotation: '3.g3 — preparing the fianchetto. The Bishop on g2 will be White\'s strongest piece.', keyMove: true },
    ],
    variations: [
      { id: 'symmetrical', name: 'Symmetrical English', idea: 'Mirror Black\'s structure for complex maneuvering', gameType: 'Strategic and complex', steps: [{ move: 'c5', uci: 'c7c5', fen: 'rnbqkbnr/pp1ppppp/8/2p5/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2', annotation: '1...c5 — the Symmetrical English. Black mirrors White\'s structure, leading to one of the most theoretically rich systems in chess.', keyMove: true }] },
      { id: 'english-four-knights', name: 'Four Knights Variation', idea: 'All four knights developed quickly', gameType: 'Classical and balanced', steps: [{ move: 'Nc6', uci: 'b8c6', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3', annotation: '2...Nc6 — leading to the Four Knights English, classical and principled.' }] },
    ],
    middlegamePlans: [
      { title: 'Fianchetto and Central Control', description: 'White\'s main plan: fianchetto the King\'s Bishop to g2, where it controls the long diagonal. Combined with the c4 pawn, the Bishop on g2 exerts enormous pressure on d5 and the queenside. Castle kingside and double Rooks on the c and d files.', fen: 'r1bqr1k1/pp1p1ppp/2n2n2/2p1p3/2P5/2N3P1/PP1PPBBP/R2QR1K1 w - - 4 10', arrows: [{ from: 'g2', to: 'd5', color: 'gold' }] },
      { title: 'The d4 Break', description: 'In many English Opening positions, the thematic d4 advance opens the center at the right moment. After preparation with e3, d4 challenges Black\'s center and often leads to an IQP position or a dynamic pawn battle.', fen: 'r1bq1rk1/pp1p1ppp/2n2n2/2p1p3/2P5/2NP2P1/PP2PPBP/R1BQ1RK1 w - - 2 8', arrows: [{ from: 'd3', to: 'd4', color: 'gold' }] },
    ],
    commonMistakes: [
      { title: 'Entering the Reversed Sicilian without understanding', badMove: 'e4', whyBad: 'Rushing e4 without preparation in the English often leads to positions that favor Black (who is essentially playing White in a Sicilian with an extra tempo).', correctMove: 'g3', whyCorrect: 'Develop the Bishop to g2 first, castle, and only then decide on the e4 advance based on the specific position.', fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3' },
      { title: 'Ignoring the d5 square', badMove: 'b3', whyBad: 'Passive play that ignores the d5 square allows Black to establish a Knight or pawn there, negating White\'s entire English Opening strategy.', correctMove: 'Nc3', whyCorrect: 'Always fight for d5. The Nc3-d5 plan or the fianchetto g3-Bg2 is the core of the English Opening.', fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 2 2' },
    ],
  },
  {
    id: 'london-system',
    name: 'The London System',
    eco: 'D02–D09',
    tagline: 'The solid, set-it-and-forget-it opening',
    difficulty: 'Beginner',
    style: 'Positional',
    forColor: 'White',
    intro: 'The London System is one of the most popular openings at all levels today. White plays d4, Nf3, Bf4 (or c4), and e3 — a solid, reliable setup that can be played against almost anything Black does. It requires less memorization than most openings and leads to sound positions with a clear plan.',
    famousPlayers: [
      { name: 'Magnus Carlsen', note: 'Uses it regularly at the top level for reliable positions' },
      { name: 'Fabiano Caruana', note: 'Has employed it as a surprise weapon in classical games' },
      { name: 'Vladimir Kramnik', note: 'Refined the London system in top-level play' },
    ],
    tips: [
      'The Bishop on f4 is your key piece — keep it active and don\'t let it get trapped',
      'Castle kingside and then decide on c4 or e4 based on Black\'s setup',
      'Don\'t rush — the London is a slow, reliable system',
    ],
    mainLine: [
      { move: 'd4', uci: 'd2d4', fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1', annotation: '1.d4' },
      { move: 'd5', uci: 'd7d5', fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2', annotation: '1...d5 — Black takes the center.' },
      { move: 'Nf3', uci: 'g1f3', fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 1 2', annotation: '2.Nf3 — developing.' },
      { move: 'Nf6', uci: 'g8f6', fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3', annotation: '2...Nf6' },
      { move: 'Bf4', uci: 'c1f4', fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3', annotation: '3.Bf4 — the London! The Bishop to f4 is the defining move.', keyMove: true },
      { move: 'e6', uci: 'e7e6', fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R w KQkq - 0 4', annotation: '3...e6 — solid, preparing to develop.' },
      { move: 'e3', uci: 'e2e3', fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1B2/4PN2/PPP2PPP/RN1QKB1R b KQkq - 0 4', annotation: '4.e3 — completing the London setup.', keyMove: true },
    ],
    variations: [
      { id: 'london-c4', name: 'London with c4', idea: 'A more ambitious setup fighting for the center', gameType: 'More dynamic than pure London', steps: [{ move: 'c4', uci: 'c2c4', fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP1B2/4PN2/PP3PPP/RN1QKB1R b KQkq - 0 5', annotation: '5.c4 — White breaks in the center, transitioning to a more QGD-like structure with the London piece placement.', keyMove: true }] },
      { id: 'london-kings-indian', name: "vs King's Indian Setup", idea: 'Fighting the KID with London pieces', gameType: 'Strategic and solid', steps: [{ move: 'g6', uci: 'g7g6', fen: 'rnbqkb1r/ppp1pp1p/5np1/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R w KQkq - 0 4', annotation: '3...g6 — Black goes for a King\'s Indian setup. White continues with e3 and Bd3.', keyMove: false }] },
    ],
    middlegamePlans: [
      { title: 'Kingside Attack after Castling', description: 'White\'s typical plan: complete development with Bd3, castle kingside, and launch a kingside pawn attack. The moves h3, g4, and g5 are common. The London Bishop on f4 or h2 supports this plan from afar.', fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/3P1B2/3BPN2/PPP2PPP/RN1Q1RK1 w - - 4 8', arrows: [{ from: 'h2', to: 'g4', color: 'gold' }, { from: 'g4', to: 'g5', color: 'green' }] },
      { title: 'The Nd2-f1-e5 Plan', description: 'A key maneuver in the London: after Nf3-d2-f1-e5 or Nf3-d2-f1-g3, White gains excellent piece coordination and prepares f4-f5. The Knight on e5 is a powerful outpost, and f4 adds to the kingside attack.', fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3pN3/3P1B2/3BP3/PPP2PPP/RN1Q1RK1 w - - 0 9', arrows: [{ from: 'e5', to: 'f7', color: 'red' }, { from: 'f2', to: 'f4', color: 'gold' }] },
    ],
    commonMistakes: [
      { title: 'Allowing the Bishop to get trapped', badMove: 'Bf4', whyBad: 'If Black plays …Nh5 or …e5, the London Bishop on f4 can be attacked and must retreat awkwardly, losing tempo.', correctMove: 'e3', whyCorrect: 'Be aware of …Nh5 and have the retreat Bg3 or Be5 in mind. Alternatively, play e3 first to give the Bishop a retreat square.', fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 0 4' },
      { title: 'Playing too passively', badMove: 'Bd3', whyBad: 'The London can become passive if White never advances in the center. Playing only Be2, d3, and waiting gives Black a free hand to build a strong position.', correctMove: 'c4', whyCorrect: 'At some point, White should decide on e4 or c4 to create central tension. Pure passivity in the London allows Black to equalize easily.', fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/3P1B2/3BPN2/PPP2PPP/RN1Q1RK1 w - - 4 8' },
    ],
  },
  {
    id: 'kings-gambit',
    name: "The King's Gambit",
    eco: 'C30–C39',
    tagline: 'The most romantic and daring opening in chess',
    difficulty: 'Intermediate',
    style: 'Tactical',
    forColor: 'White',
    intro: "The King's Gambit (1.e4 e5 2.f4) is the most romantic opening in chess — White immediately sacrifices a pawn for rapid development, open lines, and a savage attack. For two centuries it was the dominant opening in chess, and while modern theory has refined it, it remains one of the sharpest and most exciting openings.",
    famousPlayers: [
      { name: 'Paul Morphy', note: 'Used it to demolish all opponents in the 1850s' },
      { name: 'Bobby Fischer', note: 'Called it "by hand" — meaning overwhelming force' },
      { name: 'Mikhail Tal', note: 'Loved the chaos and sacrificial opportunities' },
    ],
    tips: [
      'After accepting the gambit, attack immediately — don\'t try to hold the pawn',
      'Open the f-file is your reward — use it with Rf1 and Qf3',
      'Speed is everything — every tempo counts when attacking the King',
    ],
    mainLine: [
      { move: 'e4', uci: 'e2e4', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1', annotation: '1.e4' },
      { move: 'e5', uci: 'e7e5', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2', annotation: '1...e5' },
      { move: 'f4', uci: 'f2f4', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2', annotation: "2.f4 — the King's Gambit! A direct pawn offer for the initiative and open f-file.", keyMove: true },
      { move: 'exf4', uci: 'e5f4', fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3', annotation: "2...exf4 — the King's Gambit Accepted. Black takes the pawn." },
      { move: 'Nf3', uci: 'g1f3', fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R b KQkq - 1 3', annotation: '3.Nf3 — developing and preparing to attack.', keyMove: true },
    ],
    variations: [
      { id: 'kga-bishops', name: "Bishop's Gambit", idea: 'Bc4 threatens immediate Bxf7+', gameType: 'Very aggressive and tactical', steps: [{ move: 'Bc4', uci: 'f1c4', fen: 'rnbqkbnr/pppp1ppp/8/8/2B1Pp2/8/PPPP2PP/RNBQK1NR b KQkq - 1 3', annotation: '3.Bc4 — the Bishop\'s Gambit. White immediately targets f7.', keyMove: true }] },
      { id: 'kgd', name: "King's Gambit Declined", idea: 'Bc5 — keeping the center solid', gameType: 'Solid counter against the gambit', steps: [{ move: 'Bc5', uci: 'f8c5', fen: 'rnbqk1nr/pppp1ppp/8/2b1p3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq - 1 3', annotation: "2...Bc5 — declining the gambit. Black develops and keeps the center closed.", keyMove: true }] },
      { id: 'falkbeer', name: 'Falkbeer Counter-Gambit', idea: 'Strike back immediately with d5', gameType: 'Sharp counter-gambit', steps: [{ move: 'd5', uci: 'd7d5', fen: 'rnbqkbnr/ppp2ppp/8/3pp3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3', annotation: "2...d5!? — the Falkbeer Counter-Gambit. Black gives back the pawn to seize the initiative immediately.", keyMove: true }] },
    ],
    middlegamePlans: [
      { title: 'Opening the f-File', description: "White's primary compensation for the gambit pawn is the open f-file. After Nf3, Bc4, and castling, White doubles Rooks on the f-file. The pawn on f4 will be advanced to f5 or captured on f3 — either way, the f-file becomes White's highway for attack.", fen: 'rnbq1rk1/pppp1ppp/5n2/8/2B1Pp2/5N2/PPPP2PP/RNBQK2R w KQ - 3 5', arrows: [{ from: 'f1', to: 'f4', color: 'gold' }] },
      { title: 'The d4 Central Thrust', description: 'After Bc4, d4 is the key central advance that opens lines for all of White\'s pieces. The combination of d4, Nc3, and Nf3 creates rapid development and central control that compensates for the missing f-pawn.', fen: 'rnbqkbnr/pppp1ppp/8/8/2B1Pp2/5N2/PPPP2PP/RNBQK2R b KQkq - 2 4', arrows: [{ from: 'd2', to: 'd4', color: 'gold' }] },
    ],
    commonMistakes: [
      { title: 'Trying to hold the gambit pawn', badMove: 'g5', whyBad: "After 2...exf4 3.Nf3 g5? 4.h4! g4 5.Ne5, White gets a devastating attack. Trying to hold the f4 pawn with g5 weakens Black's kingside fatally.", correctMove: 'd6', whyCorrect: 'Accept the gambit but don\'t try to hold the pawn. Play 3...d6 or 3...Nf6 — develop normally and let the pawn fall.', fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R b KQkq - 1 3' },
      { title: 'Castling too early before attacking', badMove: 'O-O', whyBad: "In the King's Gambit, delay castling and attack while the position is open. Early castling can reduce White's attacking chances if the position closes.", correctMove: 'Nc3', whyCorrect: 'Develop the Knight to c3, point the Bishop at f7, and create immediate threats before committing the King to the kingside.', fen: 'rnbqkbnr/pppp1ppp/8/8/2B1Pp2/5N2/PPPP2PP/RNBQK2R b KQkq - 2 4' },
    ],
  },
];

// Export combined list
export const ALL_OPENINGS: Opening[] = [...OPENINGS, ...OPENINGS_PHASE5];

export function getAllOpeningById(id: string): Opening | undefined {
  return ALL_OPENINGS.find(o => o.id === id);
}
