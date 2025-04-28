var socket = io.connect();
let highscores = []
let tilemap1 = [
  "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "b....r...........................................b",
  "b....r......t...t...t....t.....t........t.....t..b",
  "b....r..t...................t.........h...h......b",
  "b....rr....t.........t...............rrrrrrr..t..b",
  "b.....r.......trrrrrrrr.t......t....tr..t..rt....b",
  "b.....rr...t...rt..t..rrrrrr........rr.....r...t.b",
  "b.t....r.......r..t...t..h.rt.......r......rrt...b",
  "b......rrrrr.t.r........t..rrrrrrr.tr....t.trr...b",
  "b.......r..rrrrr.............t..trrrrt.......r...b",
  "b...t...r.......t.....t.....................trrt.b",
  "b.......rr..t......t..........................r..b",
  "b........r...............t......t.......t.....r..b",
  "b........rr....t............t......t.......h..rrrb",
  "b.........rrr......t....t..................rrrr.hb",
  "b.t.......r.rrrr......h............h....rrrr.....b",
  "b.........r....rrrrrrrrrrrrrrrrrrrrrrrrrr........b",
  "b....h...rr.t...h..........r.................t..tb",
  "b..hrrrr.r.................rh........t...........b",
  "b....h.rrr................rr.....................b",
  "b........rt........t.....hr....................hrb",
  "b.......rr................r...............hr....rb",
  "b.......r....h..h........hrh.......h.......r...rrb",
  "b.......r.t..rrrr.........r...t....r.....hrrh..r.b",
  "b.......r...rr.h..........rr......rr......r...hr.b",
  "b.......rrrrr.............hrr....hr......hr....rhb",
  "b........r..h...............rrr...rh.h.h..rh.h.r.b",
  "b........r....................rrrrrrrrrrrrrrrrrrrb",
  "b..t.....r.........t...........r.h.h..r..h.h.r.h.b",
  "b........r...................h.rh....hr......r...b",
  "b........rr..............t...rrr......r.....hrrh.b",
  "b.......h.r.................hr.......rrh......r..b",
  "b...h.rrrrrr.t...............rh....t.r......rrrh.b",
  "b...rrrh...r.................r............hrr.r..b",
  "b.t........rr...............................h.r..b",
  "b...........rr...t...................t........rr.b",
  "b............rrrr....t....................t....r.b",
  "b.....hr........rrrr...........t...............r.b",
  "b......r........r..rrrrrrrrrrrrrrrrrrrr....h...r.b",
  "b......rh.......r........r..h....r..h.rrrrr....r.b",
  "b......rr.....rrr.......hrr....rrr........rrrrrrrb",
  "b.......r.h.rrrh..........r....r.........rr......b",
  "b.h...h.rrrrr........t...hr....rh........rh......b",
  "brrrrrrrr...r.............r....r.........r.......b",
  "b...........rr..........................hrrrr....b",
  "b...........hrr.............................r....b",
  "b.t...........r.............................h....b",
  "b........t....rh...t....t..t....t....t...........b",
  "b................................................b",
  "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
];



let matrix = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1],
  [1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,1],
  [1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,0,1,1],
  [1,1,1,1,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,0,1,1],
  [1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1],
  [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1],
  [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
  [1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,1,1,1],
  [1,1,1,1,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1],
  [1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

//LEADERBOARD
let topScores = [];


// SOUNDS

let purchasedUpgrade;
let gameoverSound; 
let stormChaserSound; 
let cowSound; 
let treeSound; 
let houseSound; 
let c_carSound; 
let tornadoSound; 
let introMusic;
let muteMusic = false;
let coinSound;
let upgradeSound1, upgradeSound2; 
let clickSound;
let volumeUpdateTimeout;

// Global Variables
let moveToHTP = false;
let moveToleaderBoard = false;
let startButton, HTPButton, backButton, backButton1, information, LeaderboardButton;
let player,
  game = false,
  tileSize = 50,
  timer = 5,
  tornadoStrength = 1,
  time = 0,
  stage = 0;
let weatherText;
let attemptingSpawn;
let civilianCar,
  civilians = [];
let stormChaser,
  stormChasers = [];
let cow,
  enemiesToSpawn = 1;
let attemptingSpawn1;
let enemiesToSpawn1 = 10;
let coinMultiplier = 1;
let coinCounter = 0;
let gameOver = false;
let runMM = false;
let tree, tiles1, tiles2;
let spinimg;
let homepage;
let leaderboard;
let leaderboardBack;
let goHome;
let treeimg;
let houseimg;
let carimg;
// MENU STUFF
let exitOption = false;
let exitScreen;
let exitSY;
let exitSN;
let exitScreenY;
let exitScreenN;
let homeExit;
let spawnspinimg;
let homeplay;
let homehow;
let homelead;
let playscreen;
let gobackHTP;
let HTP;
let HTPB;
let HTPM;
let HIPMA;
let arrowButton;
let arrowButton1;
let gobackHIPM;
let winScreen;
let winScreenUP;
let winScreenMM;
let gameoverimg;
let gameoverGlowup;
let gameoverGlowmm;
let stormChaserimg;



let HTPIchecker = false;
let HTPMchecker = false;
let upgradebaseMenu;
let upgradeChecker = false;
let upgradeOne = 0;
let upgradetwo = 0;
let upgradethree = 0;
let upgradefour = 0;
let tornadoScale = 1;
let onlyOnce = false;
let sizeSurgeActive = false;
let upthreerunOnce = false;
let speedPerk = 1.0;
let speedPerkActive = false;
let upgradeMenuButton;
let mainMenuButton;
let floorb;
let font;
let cowperkActive = false;
// PATHFINDING STUFF

let path, grid, node;
let movementS = 5;
let trafficDirect = 0;


const spawnTimer = new Timer();

function pathFinding() {
  node = new Group();
  node.radius = 10;
  node.collider = "n";
  console.log(trafficDirect, "++++");
  if (trafficDirect == 0) {
    grid = new PF.Grid(matrix);
    let finder = new PF.AStarFinder();
    path = finder.findPath(floor(5), floor(1), 5, 18, grid);
    for (p of path) {
      let n = new node.Sprite(p[0] * 50, p[1] * 50);
      n.visible = false;
      console.log("donedone");
    }
  } else if (trafficDirect == 1) {
    grid = new PF.Grid(matrix);
    let finder = new PF.AStarFinder();
    path = finder.findPath(floor(5), floor(1), 43, 22, grid);
    for (p of path) {
      let n = new node.Sprite(p[0] * 50, p[1] * 50);
      n.visible = false;
      console.log("donedone");
    }
  }
    else if (trafficDirect == 2) {
      grid = new PF.Grid(matrix);
      let finder = new PF.AStarFinder();
      path = finder.findPath(floor(49), floor(13), 43, 33, grid);
      for (p of path) {
        let n = new node.Sprite(p[0] * 50, p[1] * 50);
        n.visible = false;
        console.log("donedone");
      }
  }
    else if (trafficDirect == 3) {
      grid = new PF.Grid(matrix);
      let finder = new PF.AStarFinder();
      path = finder.findPath(floor(49), floor(13), 25, 6, grid);
      console.log(path)
      for (p of path) {
        let n = new node.Sprite(p[0] * 50, p[1] * 50);
        n.visible = false;
        console.log("donedone");
      }
  }
    else if (trafficDirect == 4) {
      grid = new PF.Grid(matrix);
      let finder = new PF.AStarFinder();
      path = finder.findPath(floor(49), floor(27), 27, 18, grid);
      for (p of path) {
        let n = new node.Sprite(p[0] * 50, p[1] * 50);
        n.visible = false;
        console.log("donedone");
      }
  }
  else if (trafficDirect == 5) {
    grid = new PF.Grid(matrix);
    let finder = new PF.AStarFinder();
    path = finder.findPath(floor(2), floor(43), 43, 40, grid);
    for (p of path) {
      let n = new node.Sprite(p[0] * 50, p[1] * 50);
      n.visible = false;
      console.log("donedone");
    }
  }
}

function moveAI(enemy, nodeGroup) {
  if (nodeGroup[enemy.counter]) {
    let targetNode = nodeGroup[enemy.counter];
    let directionX = targetNode.x - enemy.x;
    let directionY = targetNode.y - enemy.y;
    let angle = Math.atan2(directionY, directionX);
    let angleInDegrees = angle * (180 / Math.PI);
    enemy.rotation = angleInDegrees;
    enemy.moveTo(targetNode, movementS);
    if (enemy.overlaps(targetNode)) {
      enemy.counter++;
    }
  } else {
    enemy.counter = 0;
  }
  if (enemy.counter >= nodeGroup.length) {
    enemy.remove();
    civilians.splice(civilians.indexOf(enemy), 1);
  }
}

function AIMovement() {
  for (let i = 0; i < civilians.length; i++) {
    moveAI(civilians[i], node);
  }
}

function preload() {
  // SOUNDS
  purchasedUpgrade = loadSound("Upgrade purchase.mp4");
  // gameoverSound = loadSound("gameover.mp3");
  // stormChaserSound = loadSound("stormChaser.mp3");
  cowSound = loadSound("Cow.mp4");
  treeSound = loadSound("Tree.mp4");
  houseSound = loadSound("House.mp4");
  c_carSound = loadSound("civilian.mp4");
  tornadoSound = loadSound("Tornado Sound.mp3");
  introMusic = loadSound("Intro music.mp3");
  coinSound = loadSound("coin.mp3");
  upgradeSound1 = loadSound("Powerup (size).mp4");
  upgradeSound2 = loadSound("Powerup (speed).mp4");
  clickSound = loadSound("click.mp3");

  // IMAGES
  spawnspinimg = loadImage("tornadospawnspin.png");
  homepage = loadImage("BaseMainMenu.png");
  homeplay = loadImage("MM_Play.png");
  homehow = loadImage("MM_HTP.png");
  homeExit = loadImage("MM_Exit.png");
  homelead = loadImage("MM_Leaderboard.png");
  leaderboard = loadImage("LeaderboardS.png");
  leaderboardBack = loadImage("LeaderboardBack.png");
  treeimg = loadImage("Tree Sprite.png");
  houseimg = loadImage("House Sprite UPDATED.png");
  carimg = loadImage("stormC.png")
  stormChaserimg = loadImage("car1.png");
  cowimg = loadImage("cow.png");
  playscreen = loadImage("playscreen.png");
  HTP = loadImage("HTPI.png");
  HTPA = loadImage("HTPI_A.png");
  gobackHTP = loadImage("HTPI_B.png");
  HTPM = loadImage("HTPM.png");
  HIPMA = loadImage("HTPM_A.png");
  gobackHIPM = loadImage("HTPM_B.png");
  upgradebaseMenu = loadImage("baseUpgrade.png");
  firstBuy = loadImage("firstBuy.png");
  secondBuy = loadImage("secondBuy.png");
  thirdBuy = loadImage("thirdBuy.png");
  fourthBuy = loadImage("fourthBuy.png");
  goHome = loadImage("gohome.png");
  gameoverGlowmm = loadImage("mainmenuGLOW.png");
  gameoverGlowup = loadImage("upgrademenuGLOW.png");
  gameoverimg = loadImage("gameover.png");
  winScreen = loadImage("winS.png");
  winScreenUP = loadImage("winS_UM.png");
  winScreenMM = loadImage("winS_MM.png");
  exitScreen = loadImage("exitScreen.png");
  exitScreenY = loadImage("exitScreen_Y.png");
  exitScreenN = loadImage("exitScreen_N.png");
  font = loadFont("a.ttf");
}

// Setup Function
function setup() {
  textFont(font);
  createCanvas(windowWidth, windowHeight);
  mainMenu();
  runMM = true;
  createGroups();

  socket.on('sendscores',getHighScore);
  // send(coinCounter,floor(random(10000)))
   socket.emit('request');

  spriteParent = new Group();
  spriteParent.collider = "s";
  spriteParent.w = tileSize;
  spriteParent.h = tileSize;

  border = new spriteParent.Group();
  border.tile = "b";
  border.w = tileSize;
  border.h = tileSize;
  border.visible = false;
  border.color = color(0, 0, 255);

  road = new spriteParent.Group();
  road.tile = "r";
  road.w = 51;
  road.h = 51;
  road.debug = false;
  road.collider = "n";
  road.color = color(128, 128, 128);
  road.strokeWeight = 0;

  tree = new spriteParent.Group();
  tree.tile = "t";
  tree.w = 121;
  tree.h = 121;
  tree.collider = "k";
  tree.scale = 0.5;
  tree.spriteSheet = treeimg;
  tree.anis.frameDelay = 5;
  tree.addAnis({
    treeSpawn: { row: 0, frames: 1 },
    treeDebarking: { row: 0, frames: 13 },
  });

  house = new spriteParent.Group();
  house.tile = "h";
  house.w = 121;
  house.h = 121;
  house.debug = false;
  house.scale = 0.5;
  house.color = color(100, 85, 100);
  house.spriteSheet = houseimg;
  house.anis.frameDelay = 7;
  house.addAnis({
    houseSpawn: { row: 0, frames: 1 },
    houseDestroyed: { row: 0, frames: 8 },
  });
  floorbb();
}

function floorbb() {
  let w = 50 * tileSize,
    h = 50 * tileSize;
  floorb = new Sprite(w / 2, h / 2);
  floorb.w = w;
  floorb.h = h;
  floorb.image = playscreen;
  floorb.collider = "n";
  floorb.visible = false;
  floorb.layer = -2;
}

// Main Menu
function mainMenu() {
  upgradeChecker = false;
  runMM = true;
  onlyOnce = false;
  startButton = new Sprite(620, 429, 620, height / 5, "k");
  startButton.color = "#0000ff";
  startButton.opacity = 0.00000000000000000000000000000000000001;

  HTPButton = new Sprite(1728, 852, 335, 75, "k");
  HTPButton.color = "#0000ff";
  HTPButton.opacity = 0.00000000000000000000000000000000000001;

  LeaderboardButton = new Sprite(1848, 768, 95, 95, "k");
  LeaderboardButton.color = "#0000ff";
  LeaderboardButton.opacity = 0.00000000000000000000000000000000000001;

  exitButton = new Sprite(103, 878, 210, 85, "k");
  exitButton.color = "#0000ff";
  exitButton.opacity = 0.00000000000000000000000000000000000001;
}

const maxStrength = 100;
const strengthScale = 5;

// This function modifies the player's strength and scale based on the tornado's strength and the stage of the game
// It also handles the interaction with different objects in the game, such as houses and trees
function changePlayerStrength(scale, stormChaser = null) {
  if (stage === 1 && tornadoStrength < maxStrength) {
    tornadoStrength += Math.ceil(scale * tornadoScale * strengthScale);
    player.scale += (scale * tornadoScale) ** 0.5 / strengthScale;
  } else if (stage === 2) {
    if (player && civilianCar && player.overlaps(civilianCar)) {
        player.scale -= player.scale / 7;
    } else if (player && stormChaser && player.overlaps(stormChaser)) {
        player.scale -= player.scale / 10;
    } else if (player && house && player.overlaps(house)) {
      tornadoStrength += Math.ceil(scale * tornadoScale * strengthScale);
      player.scale += (scale * tornadoScale) ** 0.5 / strengthScale;
    } else if (player && tree && player.overlaps(tree)) {
      tornadoStrength += Math.ceil(scale * tornadoScale * strengthScale);
      player.scale += (scale * tornadoScale) ** 0.5 / strengthScale;
    } else {
      coinCounter+= Math.ceil(scale) * coinMultiplier;
    }
  }
  console.log("->", player.scale.x, "x", player.scale.y);
}

// This function handles the collision detection between the player and other objects in the game
// It plays sounds and changes the animation of the objects when a collision occurs
function addCollisions() {
  if (player && house) {
    player.overlaps(house, (p, h) => {
      let soundMax = 0;
      if (soundMax < 4) {
        houseSound.play();
        houseSound.setVolume(0.025);
        soundMax++;
      }
      else{
        houseSound.stop();
        soundMax = 0;
      }
      h.changeAni("houseDestroyed");
      setTimeout(() => {
        h.visible = false;
        changePlayerStrength(0.025);
        if (stage == 2) {
          player.scale += (0.1 * tornadoScale) ** 0.5 / 5;
          tornadoStrength += Math.ceil(0.1 * tornadoScale * 5);
        }
        setTimeout(() => {
          h.changeAni("houseSpawn");
          h.visible = true;
        }, 11000);
      }, 950);
    });
  }

  if (player && tree) {
    player.overlaps(tree, (p, t) => {
      if (!treeSound.isPlaying()) {
        treeSound.play();
        treeSound.setVolume(0.025);
      }
      console.log("hit tree");
      t.changeAni("treeDebarking");
      setTimeout(() => {
        t.visible = false;
        changePlayerStrength(0.025);
        if (stage == 2) {
          player.scale += (0.1 * tornadoScale) ** 0.5 / 5;
          tornadoStrength += Math.ceil(0.1 * tornadoScale * 5);
        }
        setTimeout(() => {
          t.changeAni("treeSpawn");
          t.visible = true;
        }, 11000);
      }, 1100);
    });
  }
}

// Draw Loop
function draw() {
  spawnTimer.tick();
  back_Ground();
  how_PlayButton();
  leaderboardCreation();

  // sound

  if (!game && introMusic && stage != 1 && stage != 2) {
    if (!muteMusic) {
      if (!introMusic.isPlaying()) {
        introMusic.play(); // Play the intro music only if it is not already playing
        introMusic.jump(10); // Start playing from 10 seconds in
        introMusic.setVolume(0.1); // Set the volume
      }
      if(kb.presses("m")){
        setTimeout(() => {
          muteMusic = true;
          introMusic.stop();
        }, 10);
      }
    }
    if (kb.presses("m") && muteMusic) {
      muteMusic = false;
    }
  }
  else {
    introMusic.stop(); // Stop the intro music if the game starts or the stage changes
  }
  if (player && stage == 1 || stage == 2) {
    if (!tornadoSound.isPlaying()) {
      tornadoSound.play();
    }
    tornadoSound.setVolume((camera.zoom - minWheelZoom) / (maxWheelZoom - minWheelZoom)); // Adjust volume based on zoom level
  }

  if(kb.presses("escape")){
    send()
  }
  
  if (startButton.mouse.hovering()) {
    background(homeplay);
  }
  if (HTPButton.mouse.hovering()) {
    background(homehow);
  }
  if (LeaderboardButton.mouse.hovering()) {
    background(homelead);
  }
  if (exitButton.mouse.hovering()) {
    background(homeExit);
  }

  if (exitButton.mouse.presses()) {
    exitGame();
    clickSound.play();
    clickSound.setVolume(0.05);
  }

  if (exitSY && exitSY.mouse.presses()) {
    window.close();
    clickSound.play();
    clickSound.setVolume(0.05);
  }

  if(exitSN && exitSN.mouse.presses()) {
    exitOption = false;
    exitSN.remove();
    exitSY.remove();
    clickSound.play();
    clickSound.setVolume(0.05);
    goBack();
  }

  if (!runMM && exitOption) {
    if (exitSY.mouse.hovering()) {
      background(exitScreenY);
    }
    if (exitSN.mouse.hovering()) {
      background(exitScreenN);
    }
  }  

  if (HTPIchecker || HTPMchecker) {
    // Ensure both buttons are created only once
    if (!arrowButton) {
      arrowButton = new Sprite(1340, 782, 80, 50, "k");
      arrowButton.opacity = 0.00000000000000000000000000000000000001;
    }
    if (!arrowButton1) {
      arrowButton1 = new Sprite(574, 782, 80, 50, "k");
      arrowButton1.opacity = 0.00000000000000000000000000000000000001;
    }

    // Enable or disable interactivity based on the current state
    arrowButton.collider = HTPIchecker ? "d" : "n"; // Enable if HTPIchecker is true
    arrowButton1.collider = HTPMchecker ? "d" : "n"; // Enable if HTPMchecker is true
  }

  if (HTPIchecker && backButton && backButton.mouse.presses()) {
    goBack();
    clickSound.play();
    clickSound.setVolume(0.05);
  }

  if (HTPIchecker && arrowButton && arrowButton.mouse.presses()) {
    HTPIchecker = false;
    HTPMchecker = true;
    clickSound.play();
    clickSound.setVolume(0.05);
  }

  if (HTPMchecker && backButton && backButton.mouse.presses()) {
    goBack();
    clickSound.play();
    clickSound.setVolume(0.05);
  }

  if (moveToleaderBoard && backButton1 && backButton1.mouse.hovering()) {
    background(leaderboardBack);
    displayLeaderboard();
  }
  else if(moveToleaderBoard) {
    background(leaderboard);
    displayLeaderboard();
  }

  if (moveToleaderBoard && backButton1 && backButton1.mouse.presses()) {
    goBack();
    clickSound.play();
    clickSound.setVolume(0.05);
  }

  if (HTPMchecker && arrowButton1 && arrowButton1.mouse.presses()) {
    HTPIchecker = true;
    HTPMchecker = false;
    clickSound.play();
    clickSound.setVolume(0.05);
  }

  if (HTPIchecker) {
    background(HTP); // Instructions page background
    const instructions = document.getElementById("instructions");
      console.log(instructions);
      if (instructions) {
          instructions.style.display = "block"; // Show instructions
      } else {
      }
  } else if (HTPMchecker) {
    background(HTPM); // Movement page background
    const instructions = document.getElementById("instructions");
      if (instructions) {
          instructions.style.display = "none"; // Hides instructions
      } else {
      }
  }

  // Highlight buttons when hovering
  if (HTPIchecker && arrowButton && arrowButton.mouse.hovering()) {
    background(HTPA); // Highlighted arrow button on instructions page
  }

  if (HTPMchecker && arrowButton1 && arrowButton1.mouse.hovering()) {
    background(HIPMA); // Highlighted arrow button on movement page
  }

  if (HTPIchecker && backButton && backButton.mouse.hovering()) {
    background(gobackHTP); // Highlighted goBack button on instructions page
  }

  if (HTPMchecker && backButton && backButton.mouse.hovering()) {
    background(gobackHIPM); // Highlighted goBack button on movement page
  }

  if (upgradeChecker == true && firstUpgrade.mouse.hovering()) {
    background(firstBuy);
    fill(255, 215, 0);
    textSize(24);
    textAlign(LEFT, TOP);
    text("Coin Counter " + coinCounter, 1220, 120);
  }
  if (upgradeChecker == true && secondUpgrade.mouse.hovering()) {
    background(secondBuy);
    fill(255, 215, 0);
    textSize(24);
    textAlign(LEFT, TOP);
    text("Coin Counter " + coinCounter, 1220, 120);
  }
  if (upgradeChecker == true && thirdUpgrade.mouse.hovering()) {
    background(thirdBuy);
    fill(255, 215, 0);
    textSize(24);
    textAlign(LEFT, TOP);
    text("Coin Counter " + coinCounter, 1220, 120);
  }
  if (upgradeChecker == true && fourthUpgrade.mouse.hovering()) {
    background(fourthBuy);
    fill(255, 215, 0);
    textSize(24);
    textAlign(LEFT, TOP);
    text("Coin Counter " + coinCounter, 1220, 120);
  }
  if (upgradeChecker == true && returnMM.mouse.hovering()) {
    background(goHome);
    fill(255, 215, 0);
    textSize(24);
    textAlign(LEFT, TOP);
    text("Coin Counter " + coinCounter, 1220, 120);
  }
  if (gameOver == true && timer > 0 && mainMenuButton.mouse.hovering()) {
    background(gameoverGlowmm);
  }
  else if(gameOver == true && timer <= 0 && mainMenuButton.mouse.hovering()) {
    background(winScreenMM);
  }
  if (gameOver == true && timer > 0 && upgradeMenuButton.mouse.hovering()) {
    background(gameoverGlowup);
  }
  else if(gameOver == true && timer <= 0 && upgradeMenuButton.mouse.hovering()) {
    background(winScreenUP);
  }

  // UPGRADE ONE
if ((stage == 1 || stage == 2) && upgradeOne == 1 && onlyOnce == false) {
  tornadoScale = 1;
  tornadoScale = tornadoScale * 1.25;
  onlyOnce = true;
}
if ((stage == 1 || stage == 2) && upgradeOne == 2 && onlyOnce == false) {
  tornadoScale = 1;
  tornadoScale = tornadoScale * 1.75;
  onlyOnce = true;
}
if ((stage == 1 || stage == 2) && upgradeOne == 3 && onlyOnce == false) {
  tornadoScale = 1;
  tornadoScale = tornadoScale * 2.5;
  onlyOnce = true;
}
if ((stage == 1 || stage == 2) && upgradeOne == 4 && onlyOnce == false) {
  tornadoScale = 1;
  tornadoScale = tornadoScale * 3.75;
  onlyOnce = true;
}
if ((stage == 1 || stage == 2) && upgradeOne == 5 && onlyOnce == false) {
  tornadoScale = 1;
  tornadoScale = tornadoScale * 5;
  onlyOnce = true;
}

// UPGRADE TWO
if ((stage == 1 || stage == 2) && upgradetwo == 1 && speedPerkActive == false && kb.presses("q")) {
  speedPerkActive = true;
  speedPerk = 1.25;
  upgradeSound2.play();
  upgradeSound2.setVolume(0.05);
  console.log("running");
  setTimeout(() => {
    speedPerk = 1.0;
    setTimeout(() => {
      speedPerkActive = false;
    }, 5000);
  }, 2000);
} else if ((stage == 1 || stage == 2) && upgradetwo == 2 && speedPerkActive == false && kb.presses("q")) {
  speedPerkActive = true;
  speedPerk = 1.5;
  upgradeSound2.play();
  upgradeSound2.setVolume(0.05);
  setTimeout(() => {
    speedPerk = 1.0;
    setTimeout(() => {
      speedPerkActive = false;
    }, 5000);
  }, 2000);
} else if ((stage == 1 || stage == 2) && upgradetwo == 3 && speedPerkActive == false && kb.presses("q")) {
  speedPerkActive = true;
  speedPerk = 1.75;
  upgradeSound2.play();
  upgradeSound2.setVolume(0.05);
  setTimeout(() => {
    speedPerk = 1.0;
    setTimeout(() => {
      speedPerkActive = false;
    }, 5000);
  }, 2000);
} else if ((stage == 1 || stage == 2) && upgradetwo == 4 && speedPerkActive == false && kb.presses("q")) {
  speedPerkActive = true;
  speedPerk = 2.0;
  upgradeSound2.play();
  upgradeSound2.setVolume(0.05);
  setTimeout(() => {
    speedPerk = 1.0;
    setTimeout(() => {
      speedPerkActive = false;
    }, 5000);
  }, 2000);
} else if ((stage == 1 || stage == 2) && upgradetwo == 5 && speedPerkActive == false && kb.presses("q")) {
  speedPerkActive = true;
  speedPerk = 2.5;
  upgradeSound2.play();
  upgradeSound2.setVolume(0.05);
  setTimeout(() => {
    speedPerk = 1.0;
    setTimeout(() => {
      speedPerkActive = false;
    }, 5000);
  }, 2000);
}

// UPGRADE THREE
if ((stage == 1 || stage == 2) && upgradethree == 1 && upthreerunOnce == false) {
  timer = 10;
  upthreerunOnce = true;
} else if ((stage == 1 || stage == 2) && upgradethree == 2 && upthreerunOnce == false) {
  timer = 15;
  upthreerunOnce = true;
} else if ((stage == 1 || stage == 2) && upgradethree == 3 && upthreerunOnce == false) {
  timer = 20;
  upthreerunOnce = true;
} else if ((stage == 1 || stage == 2) && upgradethree == 4 && upthreerunOnce == false) {
  timer = 25;
  upthreerunOnce = true;
} else if ((stage == 1 || stage == 2) && upgradethree == 5 && upthreerunOnce == false) {
  timer = 30;
  upthreerunOnce = true;
}

// UPGRADE FOUR
if ((stage == 1 || stage == 2) && upgradefour == 1 && kb.presses("e") && sizeSurgeActive == false && timer > 5) {
  sizeSurgeActive = true;
  upgradeSound1.play();
  upgradeSound1.setVolume(0.05);
  player.scale = player.scale;
  setTimeout(() => {
    player.scale += 0.025;
    setTimeout(() => {
      player.scale += 0.05;
      setTimeout(() => {
        player.scale += 0.1;
      }, 100);
    }, 100);
  }, 100);
  setTimeout(() => {
    upgradeSound1.play();
    upgradeSound1.setVolume(0.05);
    setTimeout(() => {
      player.scale -= 0.1;
      setTimeout(() => {
        player.scale -= 0.05;
        setTimeout(() => {
          player.scale -= 0.025;
        }, 100);
      }, 100);
    }, 100);
    setTimeout(() => {
      sizeSurgeActive = false;
    }, 5000);
  }, 5000);
} else if ((stage == 1 || stage == 2) && upgradefour == 2 && kb.presses("e") && sizeSurgeActive == false) {
  sizeSurgeActive = true;
  upgradeSound1.play();
  upgradeSound1.setVolume(0.05);
  player.scale = player.scale;
  setTimeout(() => {
    player.scale += 0.05;
    setTimeout(() => {
      player.scale += 0.1;
      setTimeout(() => {
        player.scale += 0.2;
      }, 100);
    }, 100);
  }, 100);
  setTimeout(() => {
    upgradeSound1.play();
    upgradeSound1.setVolume(0.05);
    setTimeout(() => {
      player.scale -= 0.2;
      setTimeout(() => {
        player.scale -= 0.1;
        setTimeout(() => {
          player.scale -= 0.05;
        }, 100);
      }, 100);
    }, 100);
    setTimeout(() => {
      sizeSurgeActive = false;
    }, 5000);
  }, 5000);
} else if ((stage == 1 || stage == 2) && upgradefour == 3 && kb.presses("e") && sizeSurgeActive == false) {
  sizeSurgeActive = true;
  upgradeSound1.play();
  upgradeSound1.setVolume(0.05);
  setTimeout(() => {
    player.scale += 0.1;
    setTimeout(() => {
      player.scale += 0.2;
      setTimeout(() => {
        player.scale += 0.3;
      }, 100);
    }, 100);
  }, 100);
  setTimeout(() => {
    upgradeSound1.play();
    upgradeSound1.setVolume(0.05);
    setTimeout(() => {
      player.scale -= 0.3;
      setTimeout(() => {
        player.scale -= 0.2;
        setTimeout(() => {
          player.scale -= 0.1;
        }, 100);
      }, 100);
    }, 100);
    setTimeout(() => {
      sizeSurgeActive = false;
    }, 5000);
  }, 5000);
} else if ((stage == 1 || stage == 2) && upgradefour == 4 && kb.presses("e") && sizeSurgeActive == false) {
  sizeSurgeActive = true;
  upgradeSound1.play();
  upgradeSound1.setVolume(0.05);
  player.scale = player.scale;
  setTimeout(() => {
    player.scale += 0.125;
    setTimeout(() => {
      player.scale += 0.275;
      setTimeout(() => {
        player.scale += 0.4;
      }, 100);
    }, 100);
  }, 100);
  setTimeout(() => {
    upgradeSound1.play();
    upgradeSound1.setVolume(0.05);
    setTimeout(() => {
      player.scale -= 0.4;
      setTimeout(() => {
        player.scale -= 0.275;
        setTimeout(() => {
          player.scale -= 0.1;
        }, 100);
      }, 100);
    }, 100);
    setTimeout(() => {
      sizeSurgeActive = false;
    }, 5000);
  }, 5000);
} else if ((stage == 1 || stage == 2) && upgradefour == 5 && kb.presses("e") && sizeSurgeActive == false) {
  sizeSurgeActive = true;
  player.scale = player.scale;
  upgradeSound1.play();
  upgradeSound1.setVolume(0.05);
  setTimeout(() => {
    player.scale += 0.15;
    setTimeout(() => {
      player.scale += 0.35;
      setTimeout(() => {
        player.scale += 0.5;
      }, 100);
    }, 100);
  }, 100);
  setTimeout(() => {
    upgradeSound1.play();
    upgradeSound1.setVolume(0.05);
    setTimeout(() => {
      player.scale -= 0.5;
      setTimeout(() => {
        player.scale -= 0.35;
        setTimeout(() => {
          player.scale -= 0.15;
        }, 100);
      }, 100);
    }, 100);
    setTimeout(() => {
      sizeSurgeActive = false;
    }, 5000);
  }, 5000);
} else {
}

  //UPGRADE MENU (GREEN BITS)
  if (upgradeChecker == true) {
    if (upgradeOne == 1) {
      first1lvl.opacity = 1;
    } else if (upgradeOne == 2) {
      first1lvl.opacity = 1;
      first2lvl.opacity = 1;
    } else if (upgradeOne == 3) {
      first1lvl.opacity = 1;
      first2lvl.opacity = 1;
      first3lvl.opacity = 1;
    } else if (upgradeOne == 4) {
      first1lvl.opacity = 1;
      first2lvl.opacity = 1;
      first3lvl.opacity = 1;
      first4lvl.opacity = 1;
    } else if (upgradeOne == 5) {
      first1lvl.opacity = 1;
      first2lvl.opacity = 1;
      first3lvl.opacity = 1;
      first4lvl.opacity = 1;
      first5lvl.opacity = 1;
    } else {
    }
    if (upgradetwo == 1) {
      second1lvl.opacity = 1;
    } else if (upgradetwo == 2) {
      second1lvl.opacity = 1;
      second2lvl.opacity = 1;
    } else if (upgradetwo == 3) {
      second1lvl.opacity = 1;
      second2lvl.opacity = 1;
      second3lvl.opacity = 1;
    } else if (upgradetwo == 4) {
      second1lvl.opacity = 1;
      second2lvl.opacity = 1;
      second3lvl.opacity = 1;
      second4lvl.opacity = 1;
    } else if (upgradetwo == 5) {
      second1lvl.opacity = 1;
      second2lvl.opacity = 1;
      second3lvl.opacity = 1;
      second4lvl.opacity = 1;
      second5lvl.opacity = 1;
    } else {
    }
    if (upgradethree == 1) {
      third1lvl.opacity = 1;
    } else if (upgradethree == 2) {
      third1lvl.opacity = 1;
      third2lvl.opacity = 1;
    } else if (upgradethree == 3) {
      third1lvl.opacity = 1;
      third2lvl.opacity = 1;
      third3lvl.opacity = 1;
    } else if (upgradethree == 4) {
      third1lvl.opacity = 1;
      third2lvl.opacity = 1;
      third3lvl.opacity = 1;
      third4lvl.opacity = 1;
    } else if (upgradethree == 5) {
      third1lvl.opacity = 1;
      third2lvl.opacity = 1;
      third3lvl.opacity = 1;
      third4lvl.opacity = 1;
      third5lvl.opacity = 1;
    } else {
    }
    if (upgradefour == 1) {
      fourth1lvl.opacity = 1;
    } else if (upgradefour == 2) {
      fourth1lvl.opacity = 1;
      fourth2lvl.opacity = 1;
    } else if (upgradefour == 3) {
      fourth1lvl.opacity = 1;
      fourth2lvl.opacity = 1;
      fourth3lvl.opacity = 1;
    } else if (upgradefour == 4) {
      fourth1lvl.opacity = 1;
      fourth2lvl.opacity = 1;
      fourth3lvl.opacity = 1;
      fourth4lvl.opacity = 1;
    } else if (upgradefour == 5) {
      fourth1lvl.opacity = 1;
      fourth2lvl.opacity = 1;
      fourth3lvl.opacity = 1;
      fourth4lvl.opacity = 1;
      fourth5lvl.opacity = 1;
    }
  }

  // MAIN MENU UPGRADE FUNCTIONALITY/BOUGHT

  if (
    upgradeChecker == true &&
    firstUpgrade.mouse.presses() &&
    coinCounter >= 20
  ) {
    purchasedUpgrade.play();
    purchasedUpgrade.setVolume(0.05);
    if (upgradeOne == 0) {
      upgradeOne += 1;
      first1lvl.opacity = 1;
      coinCounter -= 20;
    } else if (upgradeOne == 1) {
      upgradeOne += 1;
      first2lvl.opacity = 1;
      coinCounter -= 20;
    } else if (upgradeOne == 2) {
      upgradeOne += 1;
      first3lvl.opacity = 1;
      coinCounter -= 20;
    } else if (upgradeOne == 3) {
      upgradeOne += 1;
      first4lvl.opacity = 1;
      coinCounter -= 20;
    } else if (upgradeOne == 4) {
      upgradeOne += 1;
      first5lvl.opacity = 1;
      coinCounter -= 20;
    }
  }

  if (
    upgradeChecker == true &&
    secondUpgrade.mouse.presses() &&
    coinCounter >= 50
  ) {
    purchasedUpgrade.play();
    purchasedUpgrade.setVolume(0.05);
    if (upgradetwo == 0) {
      upgradetwo += 1;
      second1lvl.opacity = 1;
      coinCounter -= 50;
    } else if (upgradetwo == 1) {
      upgradetwo += 1;
      second2lvl.opacity = 1;
      coinCounter -= 50;
    } else if (upgradetwo == 2) {
      upgradetwo += 1;
      second3lvl.opacity = 1;
      coinCounter -= 50;
    } else if (upgradetwo == 3) {
      upgradetwo += 1;
      second4lvl.opacity = 1;
      coinCounter -= 50;
    } else if (upgradetwo == 4) {
      upgradetwo += 1;
      second5lvl.opacity = 1;
      coinCounter -= 50;
    }
  }

  if (
    upgradeChecker == true &&
    thirdUpgrade.mouse.presses() &&
    coinCounter >= 30
  ) {
    purchasedUpgrade.play();
    purchasedUpgrade.setVolume(0.05);
    if (upgradethree == 0) {
      upgradethree += 1;
      third1lvl.opacity = 1;
      coinCounter -= 30;
    } else if (upgradethree == 1) {
      upgradethree += 1;
      third2lvl.opacity = 1;
      coinCounter -= 30;
    } else if (upgradethree == 2) {
      upgradethree += 1;
      third3lvl.opacity = 1;
      coinCounter -= 30;
    } else if (upgradethree == 3) {
      upgradethree += 1;
      third4lvl.opacity = 1;
      coinCounter -= 30;
    } else if (upgradethree == 4) {
      upgradethree += 1;
      third5lvl.opacity = 1;
      coinCounter -= 30;
    }
  }

  if (
    upgradeChecker == true &&
    fourthUpgrade.mouse.presses() &&
    coinCounter >= 70
  ) {
    purchasedUpgrade.play();
    purchasedUpgrade.setVolume(0.05);
    if (upgradefour == 0) {
      upgradefour += 1;
      fourth1lvl.opacity = 1;
      coinCounter -= 70;
    } else if (upgradefour == 1) {
      upgradefour += 1;
      fourth2lvl.opacity = 1;
      coinCounter -= 70;
    } else if (upgradefour == 2) {
      upgradefour += 1;
      fourth3lvl.opacity = 1;
      coinCounter -= 70;
    } else if (upgradefour == 3) {
      upgradefour += 1;
      fourth4lvl.opacity = 1;
      coinCounter -= 70;
    } else if (upgradefour == 4) {
      upgradefour += 1;
      fourth5lvl.opacity = 1;
      coinCounter -= 70;
    }
  }
  // makes tilemaps
  camera.on();
  if (floorb && floorb.visible) floorb.draw();
  if (tiles1) tiles1.draw();
  if (tiles2) tiles2.draw();
  camera.off();
[[]]

  if (stage === 1) {
    playerMovement();
    cameraControl();
    // Making the cow randomly spawn
    if(!cow && !cowperkActive){
      let cowChance = Math.floor(random(0, 1001))
      if (cowChance == 703) {
        cow = new Sprite(random(50, 2450), random(50, 2450), 50, 50);
        cow.collider = "n";
        cow.image = cowimg;
        cowperkActive = true;
      }
    }

  } else if (stage === 2) {
    playerMovement();
    cameraControl();
    handleCivilians();
    handleStormChasers();
    AIMovement();

  }

  if (game) {
    displayCoinBalance();
    displayTornadoStrength();

    if (player && cow && player.overlaps(cow)){
      cowSound.play();
      cowSound.setVolume(2);
      cow.remove();
      cow = null;
      coinCounter += 50;
      coinMultiplier = 2;
    }
  }
  if (runMM) {
    if (startButton.mouse.presses()) {
      cleanupMenu();
      stage = 1;
      mainGame();
      runMM = false;
    }
  }

  if (backButton && backButton.mouse.presses()) {
    clickSound.play();
    clickSound.setVolume(0.05);
    goBack();
  }

  if (game && stage === 1) {
    textSize(20);
    time += deltaTime;
    fill(209, 0, 0);
    textAlign(LEFT, TOP);
    weatherText = text("Storm chasers incoming in " + timer, 20, 10);
    if (time >= 1000 && timer > 0) {
      timer--;
      time = 0;
    }
    if (timer === 1) {
      stage = 2;
      mainGame();
      addCollisions();
      timer = 180;
      time = 0;
    }
    displayCoinBalance();
  }
  else if(game && stage === 2){
    textSize(20);
    time += deltaTime;
    fill(209,0,0)
    textAlign(LEFT,TOP);
    weatherText = text("Time remaining " + timer, 20, 10);
    if (time >= 1000 && timer > 0) {
      timer--;
      time = 0;
    }
    if (timer === 1) {
      timer = 0;
      time = 0;
    }
  }

  if (tornadoStrength <= 0 && !gameOver || timer <= 0 && stage == 2 ) {
    gameOver = true;
    civilians.forEach((enemy) => {
      enemy.visible = false; // makes the sprite invisible
    });
    stormChasers.forEach((enemy) => {
      enemy.visible = false; // makes the sprite invisible
    });
    stage = 1;
    gameOverScreen();
  }

  if (gameOver && mainMenuButton && mainMenuButton.mouse.presses()) {
    clickSound.play();
    clickSound.setVolume(0.05);
    resetEVERYTHING();
    mainMenu();
  }
  if (gameOver && upgradeMenuButton.mouse.presses()) {
    clickSound.play();
    clickSound.setVolume(0.05);
    upgradeMenu();
  }
  if (upgradeChecker && returnMM.mouse.presses()) {
    clickSound.play();
    clickSound.setVolume(0.05);
    resetEVERYTHING();
    mainMenu();
  }
}

// Helper Functions
function cleanupMenu() {
  startButton.remove();
  HTPButton.remove();
  exitButton.remove();
  LeaderboardButton.remove();
}

function back_Ground() {
  if (stage === 1 || stage === 2) {
    background(0);
    let bgX = -player.position.x + width / 2 - 1000;
    let bgY = -player.position.y + height / 2 - 1000;
    // image(playscreen, -camera.x, -camera.y, 0, 0);
  } else if (HTPIchecker == false && HTPMchecker == false && gameOver == false && upgradeChecker == false && exitOption == false) {
    background(homepage);
  } else if (HTPIchecker == true) {
    background(HTP);
  } else if (HTPMchecker == true) {
    background(HTPM);
  } else if (upgradeChecker == true) {
    background(upgradebaseMenu);
    fill(255, 215, 0); // Gold color for coins
    textSize(24); // Font size
    textAlign(LEFT, TOP); // Align text to the top-left corner
    text("Coin Counter " + coinCounter, 1220, 120);
  } else if (gameOver == true && timer > 0) {
    background(gameoverimg);
  }
    else if (gameOver == true && timer <= 0) {
      background(winScreen);
  } else if (exitOption == true) {
    background(exitScreen);
  }
  else {
  }
}

function how_PlayButton() {
  if (!moveToHTP) {
    if (runMM && HTPButton.mouse.presses()) {
      clickSound.play();
      clickSound.setVolume(0.05);
      moveToHTP = true;
      startButton.remove();
      HTPButton.remove();
      exitButton.remove();
      LeaderboardButton.remove();
      HTPIchecker = true; // Set HTPIchecker to true before creating the How To Play screen
      createHowToPlay();
    }
  }
}

function leaderboardCreation() {
  if (!moveToleaderBoard) {
      if (runMM && LeaderboardButton.mouse.presses()) {
          clickSound.play();
          clickSound.setVolume(0.05);
          moveToleaderBoard = true;
          startButton.remove();
          HTPButton.remove();
          exitButton.remove();
          LeaderboardButton.remove();
          createLeaderboard();
      }
  }
}

function createLeaderboard() {
  triggerCleanDatabase();

  backButton1 = new Sprite(180, 850, 160, 135, "k");
  backButton1.text = "Go Back";
  backButton1.textSize = height / 32;
  backButton1.opacity = 0.000000000000000000000000001;

  socket.emit('request');
}

function createHowToPlay() {
  backButton = new Sprite(180, 850, 160, 135, "k");
  backButton.text = "Go Back";
  backButton.textSize = height / 32;
  backButton.opacity = 0.000000000000000000000000001;
}

function goBack() {
  if (backButton) backButton.remove();
  if (backButton1) backButton1.remove();
  if (arrowButton) {
    arrowButton.remove();
    arrowButton = null; // Reset to null to allow recreation if needed
  }
  if (arrowButton1) {
    arrowButton1.remove();
    arrowButton1 = null; // Reset to null to allow recreation if needed
  }
  moveToHTP = false;
  HTPIchecker = false;
  HTPMchecker = false;
  moveToleaderBoard = false;
  runMM = true;
  const instructions = document.getElementById("instructions");
      if (instructions) {
          instructions.style.display = "none";
      } else {
          console.error("Instructions element not found!");
      }
  topScores = [];
  mainMenu();
}

function createGroups() {}

function createPlayer() {
  player = new Sprite(
    Math.floor(Math.random(50) * 2450),
    Math.floor(Math.random(50) * 2450),
    120,
    10,
    "d"
  );
  
  player.h = 120.4;
  player.w = 121;
  player.color = color(160, 160, 160);
  player.rotationLock = true;
  player.debug = false;
  player.spriteSheet = spawnspinimg;
  player.anis.frameDelay = 5;
  player.addAnis({
    spawning: { row: 0, frames: 18 },
    spinning: { row: 1, frames: 15 },
  });
  player.changeAni(["spawning", "spinning"]);
  player.scale = 0.5;

  addCollisions();
}

function mainGame() {
  if (stage == 1) {
    createPlayer();
    startButton.remove();
    HTPButton.remove();
    exitButton.remove();
    LeaderboardButton.remove();

    tiles1 = new Tiles(tilemap1, 0, 0, tileSize, tileSize);
    floorb.visible = true;

    game = true;
  } else if (stage == 2) {
    speedPerk = 1;
    game = true;
    startWave();
  }
}

function startWave() {
  spawnCivilians();
  spawnStormChasers();
}

function spawnCivilians() {
  if (gameOver || !game || stage !== 2) return; // Exit if the game is over or paused. Or civilians shouldn't spawn. That too.
  trafficDirect = Math.floor(random(0, 6));
  pathFinding();
  attemptingSpawn = true;
  for (let i = 0; i < enemiesToSpawn; i++) {
    spawnTimer.addOperation(createCivilian, i * 40);
  }
  console.log("Creating", spawnTimer.operations, "civilians");
  attemptingSpawn = false;
}

function spawnStormChasers() {
  if (gameOver || !game || stage !== 2) return; // Exit if the game is over or paused. Or storm chasers shouldn't spawn. That too.
  attemptingSpawn1 = true;
  for (let i = 0; i < enemiesToSpawn1; i++) {
    createStormChaser();
  }
  console.log("Creating", enemiesToSpawn1, "storm chasers");
  attemptingSpawn1 = false;
}

function createCivilian() {
  let civilianCar;
  if (trafficDirect == 0) {
    civilianCar = new Sprite(200, 50, 200, 200, "d");
  } else if (trafficDirect == 1) {
    civilianCar = new Sprite(200, 50, 200, 200, "d");
  } else if (trafficDirect == 2) {
    civilianCar = new Sprite(2400, 650, 200, 200, "d");
  } else if (trafficDirect == 3) {
    civilianCar = new Sprite(2400, 650, 200, 200, "d");
  } else if (trafficDirect == 4) {
    civilianCar = new Sprite(2500, 1350, 200, 200, "d");
  } else if (trafficDirect == 5) {
    civilianCar = new Sprite(50, 2150, 200, 200, "d");
  }

  civilianCar.image = carimg;
  civilianCar.color = color(255, 0, 0);
  civilianCar.rotationLock = true;
  civilianCar.scale = 0.1;
  civilianCar.debug = true;
  civilians.push(civilianCar);
}

function createStormChaser() {
  let stormChaser = new Sprite(random(50, 2450), random(50, 2450), 25, 25);
  stormChaser.color = color(255, 0, 0);
  stormChaser.rotationLock = false;
  stormChaser.collider = "n";
  stormChaser.image = stormChaserimg;
  stormChaser.debug = false;
  stormChasers.push(stormChaser); // Add to the stormChasers group
}

function playerMovement() {
  speed = 2.5;

  if (kb.pressing("left") || kb.pressing("a")) {
    player.vel.x = -speed * speedPerk;
  } else if (kb.pressing("right") || kb.pressing("d")) {
    player.vel.x = speed * speedPerk;
  } else {
    player.vel.x = 0;
  }
  if (kb.pressing("up") || kb.pressing("w")) {
    player.vel.y = -speed * speedPerk;
  } else if (kb.pressing("down") || kb.pressing("s")) {
    player.vel.y = speed * speedPerk;
  } else {
    player.vel.y = 0;
  }
}

function cameraControl() {
  camera.x = player.x;
  camera.y = player.y;
}

const maxWheelZoom = 3; // Maximum zoom level
const minWheelZoom = 1 / maxWheelZoom; // Minimum zoom level

function mouseWheel(event) {
  if (stage == 1 || stage == 2) {
    if (event.delta > 0) {
      if (camera.zoom < maxWheelZoom) camera.zoom += 0.1; // Zoom in
    } else {
      if (camera.zoom > minWheelZoom) camera.zoom -= 0.1; // Zoom out
    }

    clearTimeout(volumeUpdateTimeout);
    volumeUpdateTimeout = setTimeout(() => {
      let normalizedZoom = (camera.zoom - minWheelZoom) / (maxWheelZoom - minWheelZoom);
      tornadoSound.setVolume(normalizedZoom); // Set volume (0 to 1)
    }, 50);

    return false;
  }
}

function clearGroups1() {
  tiles1.remove();
  border.removeAll();
  floorb.visible = false;
}

// Function to move storm chasers toward the player and check for wave progress
function handleCivilians() {
  if (gameOver || !game || stage !== 2) return;

  let enemySpeed = 5;

  // prevent multiple spawns
  if (attemptingSpawn) return;

  // Handle civilians
  for (let i = civilians.length - 1; i >= 0; i--) {
    let civilianCar = civilians[i];
    
    if (player && civilianCar && player.overlaps(civilianCar)) {
        c_carSound.play();
        c_carSound.setVolume(0.75);
        changePlayerStrength(-10.0);
        tornadoStrength -= 10;
        coinCounter -= 3;

        civilianCar.remove(); // remove the enemy sprite
        civilians.splice(i, 1);
        console.log("storm chaser from collision removed");
        console.log(civilians.length);
    }
  }

  // spawn new civilians if none exist
  if (civilians.length === 0 && !attemptingSpawn) {
    enemiesToSpawn += 1; // increases civilians per wave
    console.log("Enemies to spawn", enemiesToSpawn);
    attemptingSpawn = true;
    spawnCivilians();
  }
}

function handleStormChasers() {
  if (gameOver || !game || stage !== 2) return;

  let enemySpeed = 5;

  // prevent multiple spawns
  if (attemptingSpawn1) return;

  // Handle storm chasers
  for (let i = stormChasers.length - 1; i >= 0; i--) {
    let stormChaser = stormChasers[i];
    let directionX = player.x - stormChaser.x;
    let directionY = player.y - stormChaser.y;
    let distance = sqrt(directionX * directionX + directionY * directionY);

    directionX /= distance;
    directionY /= distance;

    stormChaser.vel.x = directionX * enemySpeed;
    stormChaser.vel.y = directionY * enemySpeed;

    stormChaser.rotation = atan2(directionY, directionX);

    // Check for collision with the player only
    if (player && stormChaser && player.overlaps(stormChaser)) {
        changePlayerStrength(-10,stormChaser);
        tornadoStrength -= 3;
        coinCounter += 2 * coinMultiplier;
        stormChaser.remove();
        stormChasers.splice(i, 1);
        coinSound.play();
        coinSound.setVolume(0.1);
    }
  }

  // spawn new storm chasers if none exist
  if (stormChasers.length === 0 && !attemptingSpawn1) {
    enemiesToSpawn1 += 1; // increases storm chasers per wave
    attemptingSpawn1 = true;
    spawnStormChasers();
  }
}

// Function to display tornado strength above the player
function displayTornadoStrength() {
  push(); // Save state
  if (game && !gameOver) {
    fill(255); // Set text color to white
    textSize(20); // Set text size
    textAlign(CENTER, CENTER); // Align text to middle
    playerTextHealth = text(
      "Tornado Strength " + tornadoStrength,
      width / 2,
      40
    ); // Display the strength
  }
  pop(); // Load state
}

function displayCoinBalance() {
  //simplest bit of code ever
  if (game && !gameOver) {
    fill(255, 215, 0); // Gold color for coins
    textSize(20); // Font size
    textAlign(RIGHT, TOP); // Align text to the top-left corner
    text("Coins " + coinCounter, 1720, 10); // Display coin counter at the top-left
  }
}

function gameOverScreen() {
  spawnTimer.cancelAll(); // Cancel additional spawns
  clearGroups1(); // clear tilemap1
  allSprites.remove();

  tornadoSound.stop();
  treeSound.stop();
  houseSound.stop();

  civilians.forEach((enemy) => {
    if (enemy && enemy.remove) {
      enemy.remove();
    }
  });

  stormChasers.forEach((enemy) => {
    if (enemy && enemy.remove) {
      enemy.remove();
    }
  });

  civilians = []; // Reset the civilians array
  stormChasers = []; // Reset the storm chasers array

  if (player) player.remove(); // Remove the player sprite

  // Reset game variables
  game = false;
  stage = 0;

  // Clear the screen and display the Game Over text
  resizeCanvas(windowWidth, windowHeight);

  // Game Over Text
  camera.zoom = 1;
  // display button
  mainMenuButton = new Sprite(1215, 579, 343, 146, "k");
  mainMenuButton.opacity = 0.000000000000000001;
  upgradeMenuButton = new Sprite(545, 587, 343, 145, "k");
  upgradeMenuButton.opacity = 0.000000000000000001;
}

function upgradeMenu() {
  upgradeChecker = true;
  upgradeMenuButton.remove();
  mainMenuButton.remove();
  resizeCanvas(windowWidth, windowHeight);
  fill(255, 215, 0); // Gold color for coins
  textSize(24); // Font size
  textAlign(LEFT, TOP); // Align text to the top-left corner
  text("Coins: " + coinCounter, 20, 20);
  firstUpgrade = new Sprite(1524, 296, 150, 55, "k");
  firstUpgrade.opacity = 0.0000000000000000001;
  first1lvl = new Sprite(418.6, 284, 199, 32, "k");
  first1lvl.color = "#163919";
  first1lvl.opacity = 0.0000000000000000001;
  first2lvl = new Sprite(625.6, 284, 199, 32, "k");
  first2lvl.color = "#163919";
  first2lvl.opacity = 0.0000000000000000001;
  first3lvl = new Sprite(832.6, 284, 199, 32, "k");
  first3lvl.color = "#163919";
  first3lvl.opacity = 0.0000000000000000001;
  first4lvl = new Sprite(1039.6, 284, 199, 32, "k");
  first4lvl.color = "#163919";
  first4lvl.opacity = 0.0000000000000000001;
  first5lvl = new Sprite(1246.6, 284, 199, 32, "k");
  first5lvl.color = "#163919";
  first5lvl.opacity = 0.0000000000000000001;

  secondUpgrade = new Sprite(1524, 390, 150, 55, "k");
  secondUpgrade.opacity = 0.0000000000000000001;
  second1lvl = new Sprite(418.6, 375.5, 199, 32, "k");
  second1lvl.color = "#163919";
  second1lvl.opacity = 0.0000000000000000001;
  second2lvl = new Sprite(625.6, 375.5, 199, 32, "k");
  second2lvl.color = "#163919";
  second2lvl.opacity = 0.0000000000000000001;
  second3lvl = new Sprite(832.6, 375.5, 199, 32, "k");
  second3lvl.color = "#163919";
  second3lvl.opacity = 0.0000000000000000001;
  second4lvl = new Sprite(1039.6, 375.5, 199, 32, "k");
  second4lvl.color = "#163919";
  second4lvl.opacity = 0.0000000000000000001;
  second5lvl = new Sprite(1246.6, 375.5, 199, 32, "k");
  second5lvl.color = "#163919";
  second5lvl.opacity = 0.0000000000000000001;

  thirdUpgrade = new Sprite(1524, 484, 150, 55, "k");
  thirdUpgrade.opacity = 0.0000000000000000001;
  third1lvl = new Sprite(418.6, 467, 199, 32, "k");
  third1lvl.color = "#163919";
  third1lvl.opacity = 0.0000000000000000001;
  third2lvl = new Sprite(625.6, 467, 199, 32, "k");
  third2lvl.color = "#163919";
  third2lvl.opacity = 0.0000000000000000001;
  third3lvl = new Sprite(832.6, 467, 199, 32, "k");
  third3lvl.color = "#163919";
  third3lvl.opacity = 0.0000000000000000001;
  third4lvl = new Sprite(1039.6, 467, 199, 32, "k");
  third4lvl.color = "#163919";
  third4lvl.opacity = 0.0000000000000000001;
  third5lvl = new Sprite(1246.6, 467, 199, 32, "k");
  third5lvl.color = "#163919";
  third5lvl.opacity = 0.0000000000000000001;

  fourthUpgrade = new Sprite(1524, 578, 150, 55, "k");
  fourthUpgrade.opacity = 0.0000000000000000001;
  fourth1lvl = new Sprite(418.6, 559, 199, 32, "k");
  fourth1lvl.color = "#163919";
  fourth1lvl.opacity = 0.0000000000000000001;
  fourth2lvl = new Sprite(625.6, 559, 199, 32, "k");
  fourth2lvl.color = "#163919";
  fourth2lvl.opacity = 0.0000000000000000001;
  fourth3lvl = new Sprite(832.6, 559, 199, 32, "k");
  fourth3lvl.color = "#163919";
  fourth3lvl.opacity = 0.0000000000000000001;
  fourth4lvl = new Sprite(1039.6, 559, 199, 32, "k");
  fourth4lvl.color = "#163919";
  fourth4lvl.opacity = 0.0000000000000000001;
  fourth5lvl = new Sprite(1246.6, 559, 199, 32, "k");
  fourth5lvl.color = "#163919";
  fourth5lvl.opacity = 0.0000000000000000001;

  returnMM = new Sprite(1809, 95, 178, 145, "k");
  returnMM.opacity = 0.0000000000000000001;
}

function resetEVERYTHING() {
  cow = null;
  coinMultiplier = 1;
  cowperkActive = false;
  moveToHTP = false;
  upthreerunOnce = false;
  game = false;
  tileSize = 50;
  tornadoStrength = 1;
  time = 0;
  timer = 5;
  stage = 0;
  civilians = [];
  stormChasers = [];
  enemiesToSpawn = 1;
  enemiesToSpawn1 = 10;
  runMM = false;
  gameOver = false;
  clearGroups1();
  allSprites.remove();
  floorbb();
  mainMenuButton.remove();
  speedPerkActive = false;
}

// Database

function send(){
  let names = prompt("Enter your name for your score to be saved to our database: ");
  data = {
    Name: names,
    Score: coinCounter
  };
  socket.emit('insert', data)
}

// Function to handle high scores received from the server
function getHighScore(data) {
  if (data) {
      topScores = []; // Clear the topScores array
      for (let i = 0; i < data.length; i++) {
          let number = i + 1; // Get the rank of the score
          let textdisplay = number + ". " + data[i].Name + " " + data[i].Score; // Create the text to display
          topScores.push(textdisplay); // Add the score to the topScores array
      }
  }
}

// Function to display high scores
function displayLeaderboard() {
  if (topScores.length > 0) {
      textFont(font); 
      fill(73, 112, 105); 
      textSize(23); 
      textAlign(CENTER, CENTER); 
      text("The top 5 most coins globally!", width / 2, 320);
      textSize(15);
      text("Sorted by NAME and COINS", width / 2, 360);
      textSize(23);
      for (let i = 0; i < topScores.length; i++) {
          text(topScores[i], width / 2, 440 + i * 50); // Display each score
      }
  }
}


function triggerCleanDatabase() {
  socket.emit('cleanDatabase');
  console.log("Database cleaned.");
}

function exitGame() {
  exitOption = true;
  runMM = false;
  startButton.remove();
  HTPButton.remove();
  exitButton.remove();
  LeaderboardButton.remove();

  exitSY = new Sprite(840, 531, 310, 160, "k");
  exitSY.opacity = 0.0000000000000000001;

  exitSN = new Sprite(1150, 531, 255, 160, "k");
  exitSN.opacity = 0.0000000000000000001;
}