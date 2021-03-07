const GRID_ORIG  = 120;
const GRID_SIZE  = GRID_ORIG * 2 + 1;
const GRID_SCALE = 3;
const CELL_SCALE = 3;
const CELL_W = GRID_SCALE * Math.sqrt(3) * 0.5;
const CELL_H = GRID_SCALE * 1.5;

const BGCOLOR    = 102;
const GRIDCOLOR  = 153;

let grid1, grid2, generation = 0;

function drawcell(ax, ay, c)
{
    fill(c == 1 ? 0 : 255);  // 0 = white, 1 = black
    rect(CELL_W * (ax * 2 + ay), CELL_H * ay, CELL_SCALE);  // Square to keep it fast
}

function setup()
{
    createCanvas(950, 850);
    // blendMode(REPLACE);
    rectMode(CENTER);
    noStroke();

    // Init grid arrays
    grid1 = new Array(GRID_SIZE);
    grid2 = new Array(GRID_SIZE);
    for (let i = 0; i < GRID_SIZE; ++i) {
        grid1[i] = new Array(GRID_SIZE);
        grid2[i] = new Array(GRID_SIZE);
        for (let j = 0; j < GRID_SIZE; ++j) {
            grid1[i][j] = 0;
            grid2[i][j] = 0;
        }
    }

    // Part 1: get tile coordinates from puzzle input
    const tiles = parse();
    for (const tile of tiles) {
        grid1[tile.y][tile.x] ^= 1;
    }
    console.log(countblacktiles(grid1));
}

function draw()
{
    background(BGCOLOR);
    translate(width / 2, height / 2);
    
    for (let r = -GRID_ORIG; r <= GRID_ORIG; ++r) {
        for (let q = -GRID_ORIG; q <= GRID_ORIG; ++q) {
            if (abs(q + r) <= GRID_ORIG) {
                drawcell(q, r, grid1[GRID_ORIG + r][GRID_ORIG + q]);
            }
        }
    }
    text(generation + ": " + countblacktiles(grid1), -width/2 + 10, -height/2 + 20);


    // Part 2: 100 days of flipping tiles
    if (generation < 100) {
        evolve(grid1, grid2, generation);
        const tmp = grid1;
        grid1 = grid2;
        grid2 = tmp;
        ++generation;
    } else {
        console.log(countblacktiles(grid1));
        noLoop();
    }
}

function countblacktiles(a)
{
    let sum = 0;
    for (let y = 0; y < GRID_SIZE; ++y) {
        for (let x = 0; x < GRID_SIZE; ++x) {
            sum += a[y][x];
        }
    }
    return sum;
}

function evolve(a, b, gen)
{
    const limit = 19 + gen;
    for (let r = -limit; r <= limit; ++r) {
        const y = GRID_ORIG + r;
        for (let q = -limit; q <= limit; ++q) {
            const x = GRID_ORIG + q;
            let nb = 0;
            nb += a[y    ][x + 1];  // E
            nb += a[y    ][x - 1];  // W
            nb += a[y - 1][x + 1];  // NE
            nb += a[y - 1][x    ];  // NW
            nb += a[y + 1][x    ];  // SE
            nb += a[y + 1][x - 1];  // SW
            const t = a[y][x];
            if (t == 0 && nb == 2) {
                b[y][x] = 1;
            } else if (t == 1 && (nb == 0 || nb > 2)) {
                b[y][x] = 0;
            } else {
                b[y][x] = t;
            }
        }
    }
}

function parse()
{
    let a = [];
    for (const line of puzzle) {
        let x = GRID_ORIG, y = GRID_ORIG;
        for (let i = 0; i < line.length; ++i) {
            const ch = line[i];
            if (ch == 'e') {
                ++x;                     // E
            } else if (ch == 'w') {
                --x;                     // W
            } else if (ch == 'n') {
                --y;                     // NW
                if (line[++i] == 'e') {
                    ++x;                 // NE
                }
            } else if (ch == 's') {
                ++y;                     // SE
                if (line[++i] == 'w') {
                    --x;                 // SW
                }
            }
        }
        a.push({x, y});
    }
    return a;
}

const puzzle = [
    "neswsesewswswswswswneeswswswswwwnwsw",
    "nenesenenwneenwnwweneswnenenenwnw",
    "wewnesesweswsenwnwnwsww",
    "eeneswneewneseneeeseeweeesenwe",
    "nwnenenenenenewnwnesenwnwnenenenenenwnese",
    "nwwenwswwnwwwenwnwwnwnwwwnwnwsew",
    "nwnwnenwnwnwnwnwnwswnwnenwswnwnwnenenwne",
    "swsesenweseswseseswswnwswswswseesesesw",
    "nweneneswnenenenenwnenwnwswswnwnwwswsenwne",
    "wnwnwenwnwnwnwnwsewnwnenwnwwwsw",
    "senwewwsewswswnwseswsenwswswsewnenww",
    "nenwnesenwnenwnwnwnenwenwswnwnewnwswnw",
    "neneswwsesenwsesewnenenenenenewenwne",
    "weneneeneneneneeene",
    "ewnwsenwwwwnwnewwneswnwsenwwnwsesww",
    "neenwnwnenenenwwnwnwnenenenenwswnwnenwnwe",
    "wwnwswwwnwwnwwwwwwnewnw",
    "neneneneeneneneneneneswnenenenenenenene",
    "nwwnenwnenwnenenenenesenenwnenenwnwnwne",
    "nenenwsenwsesesenwwnwneenesewnenwnene",
    "nenenewneneeneneneneeseneswnenenenwnene",
    "seseenwewseswsese",
    "seseeseseseseswsesesesesesesesenesesese",
    "sewswswnwswswswswwew",
    "wseswnwnwnwnenewnwnwwnwwnwnwnewnwsw",
    "neeeenenwneeeeeeswneneneeneee",
    "swnwnwnwnwnwnenenwnwewnwnwnenenwnwneenwne",
    "swswsweswseeswseswneswwswseswnwsesww",
    "swnewwnewwweewwwwnwsewwwww",
    "eneswswwewwwswswesewwswswnwwe",
    "eswnweeeeeneeeeeeesweeee",
    "wswswnweswwswnewswseswswswswswswswe",
    "nwewnwwwwnwwwwneswswwwwwnew",
    "nwnwnwnwnwwnwnwwenwnwnwnwsenwnwnwswnwnw",
    "swswnewswswswswwswswwwwweseswswswnww",
    "swneewswswswwswnwnwswwnwwsenwswese",
    "nenenenwswnenenwnenenwnwnwnenenwnenenwne",
    "nwnwnwnwwneswswenwenwenwnwnwnww",
    "neneseswnenwneneneneneenesw",
    "nweswswnwsewswnwwseeseneswnwneene",
    "wwwwswwwnwswwwswsewewwswwsw",
    "wewswwewswswswnweswwswswsweswwsw",
    "sesesesesesewseswsesesesesesenesenesesw",
    "wsweeneeeeneeeene",
    "eseeeeeeeeeeeenweseseseee",
    "wesesewswnesewneeswseewsewnwesesw",
    "seweeneneeweeeneneeeneneeseew",
    "wswseswswwenwswwwswwwsw",
    "eweweeewseneswseenweswnweswene",
    "wwswwwwwwwsewnewswwwwswwww",
    "swseewseneeneswswnewneesewsenwese",
    "sewwwwwwwnwwwnwwww",
    "seseneeseseeenwsesweseeeseswsesesese",
    "neenewnwneneeeneseneneeneseeneneene",
    "nwenwwwswnwwwwwnw",
    "nwseswseseswneseeswneswswneswswsewswse",
    "swswswwswwswwswnewwswwswwseswswe",
    "wnwwnwwnwnwsenwnwnwwnww",
    "swswnwseseseswsesesesewenesewenwsese",
    "eseseesenweeseswseseenwee",
    "nenwseseneeeeeenweseenweweee",
    "swsweseswnwswswswswswswseswswswneseswsw",
    "wnewenesenesweswwnwwseesesesee",
    "wsesesesewseneseseesesesesesesesesesese",
    "seeseeseeeseeswsweesesenwneenwnw",
    "nwwnwnwnwsenwnwwswnwnwsenweswnwnwnwnwnee",
    "esenenenenenenenenenewnewnenenenenene",
    "eswswswswswwswswswwnwswswswswswwswsw",
    "nwnenwnwenwesenwsewsenwwsewswnwsenw",
    "nwnwnwwnwnwnwwnewwwnenwsenwnwwnwwsw",
    "weeseswwenwnwwewwwwnwseenesw",
    "wwswswswwswwwnwwwswsewswwsw",
    "ewsewweswwwewwwwwwnwenwnw",
    "eenwnwnewneweneswseenewseswwsesw",
    "neenenenenenenewwneneseneneneeneene",
    "seswnwswswseswswnwnwseseseeswseswswseswsesw",
    "seseneswseewsesweseseseseseswnwsesesese",
    "nwnwnwnwnwwnwnwnwnwnwenwnwwnwnwwnwnw",
    "seswswsenwwseneseseseswswneseswnesesesesese",
    "eseeseeeeeenweenwesweneenee",
    "nwneswnwnwnwnwnwswneeseswenwswnwnwnww",
    "swsesweswseswswnwswswswswswswnweswswsw",
    "neseseesweseeeseeesewneeewsene",
    "neneswnewneneswseswneswnenw",
    "seweeweswwwnenesewwwnwnewsew",
    "swwweswswswwswswwswswnwswswwswswsw",
    "wneneenenesenewsenenwneswnewneenenw",
    "senwnewnwnwnwnwnwnwwnwswwenwsesenwnwne",
    "wwwwwwnwswsewwwwwwwsw",
    "neneweneeeeenenweneeeeeenwsese",
    "swswsweswswswswswswswswnwseseswswseseswsw",
    "swswswswseswswnwswswseswswnwswneswsee",
    "nwewnenwseneneswsenenenewnenwnesenwnenw",
    "eseswnwswswseneswseseswswseeswswswwsw",
    "seseeeseseseweneeseeeesesesesesese",
    "eewnweswswsweeenenwwnwse",
    "wwswwwswwsewwswnwenwnwswswwwesw",
    "wwewwwwwwwswwwnewwwwww",
    "nwenwwnwnwnwnwneseswnwnwnwnwnwnwnene",
    "nwwnewnwnwwnwnwnwwnwnwsenwwwnwnwww",
    "sewswneswseeswseneseswswswsewneseswnw",
    "newneswswwwwsweswswenesesewneswsw",
    "nwnewwwwwnwswwseswwwwnwwseese",
    "wwwwnewwwwwwenewswwwwwsww",
    "eseeeeeewseneswswseweeneesesee",
    "nwnwnwswnenwnewnwenwnwnwsenwenenwnwwnwne",
    "swseswseswsenesewswseseswswswseswsesese",
    "swswsesesesweswnesesesewsese",
    "eeweeeeseseeesee",
    "swnwnwnwnenwnwnwnwnwnwnwnwnwnwwnwsenenw",
    "nwwnwwwnwswwwwwwnwwewwewww",
    "swnenenenenenenenenenenenenenenenenene",
    "swswneswswswswswseswswnwswswswswswewsw",
    "nwneswnwnenwnwnwnenwnenenenenwnwnenwnwenw",
    "nwnwnwnenwnwnwnenwnwnwnwnenwsenwnwnwnwwnw",
    "wnwnwwnwswwwsenwnwnwnwnwwnewseeww",
    "nwenwnwnwenwnwwnwnwwsenwnwswwwnwnwnw",
    "eeweeseseeeseseeseseseseseese",
    "neeenesewswsweeneenweesenenwswesw",
    "nwwnwnwnwewwnwnwnwwnwwnwnwnwewnwnw",
    "wnwneswwwswwwewwwwswwsewwswne",
    "nwnwsesenenwnenwswseswnenwwnwnenwnwnwnene",
    "nenenwnwnewnwswnwnwnenwneneneeneenww",
    "wwnwswnwnwnwnwnwswswsenwnwenwneesee",
    "nenwnwnwnwnenenwnenwnesenenenenenwnwsenw",
    "swseswswseswseseseswneseswswswseswswswsw",
    "swswsweneswnwwsweswswswswswswswnesw",
    "wnwwwwwwwwswwwewnewwnwwwwse",
    "nwnenenenenenwnwnwwnwenwnwwsenesesenwnw",
    "nenwneeeeeswswneeeeeneeeneswnee",
    "nenwnwnwnwnwnwsenwwnwnwnwwnwnwnwsenesenw",
    "nwnwwnwwswwwnwwnwwnwsewwnwnewnw",
    "wnwwwwenwseswnwswewnww",
    "ewwnwwwswwnwwnww",
    "nwnenwnenenenenenenenewnesenene",
    "sesesesweenwsenwenwsenweesenwenwnw",
    "neneeeeswenwneeswsenwenenenenenenee",
    "seeesenwswwesenwsesenwseseswesenesee",
    "nenwnwnenwswnenwnwsenwnesenwnwnwnwnenenw",
    "eeeeeeeeeeesweenwswne",
    "esesweswnwsenweeesesesenweeesww",
    "eseseeseseseseseweeseeeseesee",
    "swnenenenwnwnesenenewnwneeneneneenenesw",
    "neneneenenenenewneneneseneneneneeewse",
    "wnwnwnwnwenwnwwewswwwwwnwsewwwe",
    "neneeneneneneneneneneneswne",
    "seswswseseeswswnwseseneswswseseseseswsese",
    "wswnwswweneweenwwswswneswswwseswne",
    "eswwwswswneswwswwnwwwenwwwswsewsw",
    "wswswswswenwnwnwswswswswswswseswneeswe",
    "wwwwwswswwwenenwnwnwwnenwsesww",
    "wseweeenwnewneneneneseeneneenwswse",
    "senwwnenwnwnewseswwwsewswnewneene",
    "nenwnwnweneneenesesweneneneneneneswsw",
    "swseswswswswwswswswneseswseswsewswswnesesw",
    "enewnenwnenenenwsenenwnwnwnenenwseswene",
    "wwnewwwswwwwwwwwwswsewwww",
    "wsenwnwnewnwnwnwnwnwnwnwnwnwnwnwwnwnw",
    "wenwnwwwwnwwsenwneswsewwsewnwnw",
    "neenewneneeeneeee",
    "neseswnwswswnwnwseseswseewseseneseswseswsw",
    "nenenewwnenenewneeenenenweswsene",
    "seeeeesesesweeenweesenwseeseswe",
    "swesenweseewseeseeswswesenwenenewne",
    "seseseseseseeeswnwswne",
    "wwwwwwwwwwnwnwsewnwwwwsewe",
    "nenwnwneeswnwnwenwswswnwnwnwswnwnwnwnwnwnw",
    "swswswesewswswseswswswseswswseswswsw",
    "neneenenenenenenenenenewnenenenenenene",
    "wneseenenwnwwswseswswwnewnwwwww",
    "nwnwnwwnwnwweseneswwnwseenwnwnwwnwsw",
    "nwnwsenwnwnenwnwnwnwsenwnwnwnwsenwnwnewnwnw",
    "wsewneeneneneneneneeeneswe",
    "nenwnwnweweswneswne",
    "eseeeeeseeeeeeeeeweewee",
    "newnwswnenwneneneneeneweswnenwnee",
    "wwnwwwwwwnwwnwnwnwsewnwwwww",
    "wwnwwnwwnwswwnwwwwnwwwnweww",
    "neseseseseseswsesesesesesesesesesesesesw",
    "nenwnwnwnwswwnwwnwnwwnwswnwnwnwwnwnwe",
    "neenweeeeeeeeeeneeswseeeswe",
    "swswswswwswswnwswswsesweswswnwswwsw",
    "wnwsenwwnwwnwnwnwnwnwnenwnwnwnwnwnwnw",
    "seswnwswenesesewneswnwsewsesesenenesw",
    "eneewnweseswweeenee",
    "neeneswneswsweswwnenweee",
    "eeseesenewneeeneneswenewne",
    "swnwsewnwnwneweswnenwneneseesenwwsesw",
    "wseewswwnenwswswseesweseneswnwswese",
    "seseseseseswsesesewswseseswseseseseswnene",
    "seseswsesesewnenewseneswnesew",
    "wswseswnwwwwewwwwwswwwwswww",
    "nwnwwnwnwnwnwnwnwnwnwwnwnwnwnwnwenwe",
    "nenwsesenenenenenwnwnwnenwsenenwnwnenwnewne",
    "nwnenenwnenwnwswnewnwnwenenwnwnwnwnene",
    "neseswswnwnwnwneswsweneseseswswnwnewesw",
    "swwsewwwewswswnwwswswwnwsw",
    "neweeswneeeneeneneenwswneseewnw",
    "sewswwweseenwneesewwsewswneee",
    "wwwnwnwswwwwwwnenwnwnwnwnwnwwnw",
    "wwwswwwwwwwwnewwwwneswwsew",
    "nwseswswswneswenesewseeswswswswswnenw",
    "enwswseeeseseswesesesesesenesenwseese",
    "nenenwneswnwnwneneenwnwnweswnenwnwnwnwnw",
    "nwswweneeeeeeeeeeneeeswnese",
    "sweseseseseeeswenwneeeeese",
    "seswswseeswsesewesweswswsesesesenwnwsesw",
    "eenwnewesesewseneeswseewsweenwe",
    "seseswnwwwnewwswweswnwwnewwesw",
    "eeeeeeseseseeseweeeeeeseenew",
    "weseeneswenwewe",
    "swswsesenwseswseseswseneesewswsesesesese",
    "seswseseswswswseseswswswneswswswsesesw",
    "swwswwsewswwswnwwsesweswnwsenwnwnee",
    "eneweeneneneeeeeeee",
    "sesesesenesewsesese",
    "nwnwnenwnewnenwnwnwsenenwnenwnwnwnwnwne",
    "swneswseseswswnwseseseseseswwseswswsese",
    "swswsewnewswwswswswswnenwwwneswsewsw",
    "nwswswsweneseseswseneswseseswnweswew",
    "swseswswswseswswswswseseswseswnesesw",
    "nenwnenenwenwnwnwnwnenenwwwenwnenwne",
    "swwnwnwwwwnwewwnwnwnwnwnwwnw",
    "esenwneswnenwneeswwswenwseneseeenw",
    "eeeswsenwweneenenenesenenewsenenesew",
    "wwswsenwwwnewwewwswwswwwwne",
    "wswesweenewswswnwswsweswnwnwswswe",
    "swswseneswswswswsewswsw",
    "wnenenenewneenesenwwseeneneswne",
    "seeseseseeseenweewseseneseseeseese",
    "seseesesewseseseseseesweseneseesese",
    "swnwnwneseswswswswwe",
    "senwnwnwnwnwnwswnwwnwnenenwwnwnwnwwnww",
    "wwwsenwewwswswwnwsewwewswsww",
    "swwswswswneseseseswsewseswswneswswsesw",
    "seseeeseseseeseseseseseesewesesese",
    "seseeeseweeneseewseeeeeseee",
    "nesenwnwnenenenenwnwnwnwnwnwnenenwsenw",
    "seseseeesesesenweseseeswseseseenese",
    "swswswswswswswseswswswswswswswnenwswswswsw",
    "senwwswwswswwswswwswswswneswsweswsw",
    "swesenwswseswnwnwseseswseswswsweseesesw",
    "wwswswwwswwweswwswswwswswwswsw",
    "swewsweswswewnwwnewewwsewnwswww",
    "wnewseseswswnwswwnwnwwnwswseswseeew",
    "swsenwseseswswseneswswseseseswseseseswsw",
    "swswwwewswswswwwweswwwwesww",
    "swswswneeswnwswswswswswweswswswswswnwsw",
    "enweneeseeneneswswsewneneneeeene",
    "wswwswnwwwewwnwswesewswseenwe",
    "sesesesweeeseeewsenwseseeeseeee",
    "swswswswnwswswswswswswswsweswswseswswswsw",
    "seseewseseeseesesesesesesesesenwsese",
    "eweeseweeneeeeneeeeeeeeese",
    "eeeeeeeeeeeeeeenweeeesw",
    "nwswswswwwwwwwswswweswwwswswsw",
    "weswswnwswweswnwnwneswsenesewwenesw",
    "enweeseeseeneseseseewseeseeesesee",
    "nwnwnwnwnenwwnwnwnwnwsesenwnwwwnwnwe",
    "seseseeneseeseseeseeseeseeeweese",
    "sesesweeswseswsenweswseswnwsenwswswsw",
    "sesweseeeeeeenwseswnewse",
    "swwnwwnewwwwwwnwwwwwnwnwww",
    "swswswneswswswswswswwswwwswwswwesw",
    "wnewneneweneeneseswsenewnesweneene",
    "eseeeseeeseenesw",
    "sesenwseneseseseseswswswsesesewsesesesesw",
    "nwneneneneswnenwnwnenenwneenenwnwnenwnene",
    "neneenewnenenenenenenesweeeeeesee",
    "nenwwswnwenwnwnwsesenenww",
    "eenweswsweeeeneeneeweneene",
    "nenewwneseenwnenwnwsenwnenwwnw",
    "wwwnenewwsenesenwnwsewewwswswswnew",
    "seswwswneswswswwnwswwswwswswswwswwsw",
    "ewneneeeeenweesweswenweneneene",
    "sweswsenwswswwswnewnenewswenweenw",
    "sweweseesesesesewsenwseeweenesenwse",
    "swnwnwwwwwwwne",
    "nwnwswswseswswswswwswswswswswswse",
    "seswseseswswseseseeseswnwswsenweswseneswse",
    "eeswnweseeneeeeseewseseseseesesee",
    "swswswswswswseswwswsweswswneswswwnenw",
    "wnwenwwwwnwwwwwnwwnwwww",
    "swwswwswswswswswwswwnwswswswswswswse",
    "nwwwwwswnwwnwwnwwwwnwnwneww",
    "eeneswenwnwswnwsweswswnwswnenenwnwse",
    "swswseswswseswswswswneswswseneswseswswse",
    "neeeeeeeeeeneneweweeeene",
    "nwnwneenwnwnwnwswneswnenesenwswewnww",
    "weswwswswnesewsewswswwneneseeese",
    "wswswswseswswnesesesw",
    "enwneswwnenwnewnenwnweenwnenwneswnesene",
    "eswwswswswswswwswswswwswswswnweswswsw",
    "eswsenweswswnwswswswswsewswwwnwswswsw",
    "nenwnenenenenwnenenewneenenenenwnenene",
    "wnesesenewwwsewwwnwnwwnenwwswnewsw",
    "wwswswwswwswswwswswwnwswseswswswsw",
    "neneneneneswnenwnenenenwnwswnenwswnenee",
    "sesesesenesesenesewsesenewseswsesesese",
    "wneewseswwwnewswswswswenwnewwww",
    "swwnwswswswswnwswswswwsesweswswwesw",
    "seseswseswseseswseswnweseseseseswseswse",
    "swswseseswswswswsesweswnwseeseswnwsese",
    "neswswnwnwsewnwenwwnwwweenwsewnw",
    "ewneeneneenesweneeeneeenenenene",
    "nwnwwnenwnwwnwnwnwsewnw",
    "eeneneeseenweseswneesweneenenenw",
    "neneneneeneneeneswnwnwneswnenenenenenenwne",
    "nwneneswsewswnwsewwnenwewnw",
    "nenwsenenwnenenenwnesenenenenenenenenwse",
    "seeeesesenwseeesesewsewseeseese",
    "nenenenenenenesesewnenwnenenenwnwnwnenw",
    "neeneneeewneeneneneneeneenenenee",
    "wswnwswseewnwnweneewwneww",
    "seseenwseweswnwneenenenenwnwseeneswse",
    "seswsenwswseeseseswswswseswswseswsesenwsw",
    "neseeseswseswsesewswswnwswwseswnenwsesw",
    "nwnenwswnenenwnwnwnwnwsenwnw",
    "nwnwwswnwwenwnwwnewnwnwnwwnwnwsenwnw",
    "seseeswseenwnwseneseeeesesewswsesese",
    "neneswnwenwnenenenenenenwnenwnwnwnwnwnesw",
    "swswswseeswneswswswswswsweswwneswswswnw",
    "swseswswswswswswneeswwswwswswswseswsesw",
    "sesesesewnwseseseseseseseeseseseseswsese",
    "neenenwwenwswnwneswsweenwnw",
    "wwnwwwnwwnwwnwnwnwseenwwnwnwnwnwnw",
    "swneswsesweswswswswswswswswwwswwsw",
    "esweeneeneeeneenesweeee",
    "eeeeeenweesweeeeeeweew",
    "seseswswewseswwseeswenwnwswseswswse",
    "nenesesesweswnenwewseewnwseswewne",
    "eseweseseseseeesesesesesesesesesee",
    "sesenwswseeswswsesesesenwseseseeneseese",
    "swnwswswnwnwsenwneenwwnwnenwwneenwe",
    "nwwwwnwnwnwnwnwwnwnwnwswewwwnwwnw",
    "seseswsewesesewseseseseseseeseswsesese",
    "senwswwnwnenweesewswenenwneneswswwne",
    "eseweneswsesewwnwwseseswswnesenesew",
    "swwswswswswseswswswswsweswswsw",
    "eesenweweseseeeeeeeseeseseese",
    "seeeeneenewweeene",
    "nenwswswseeewsewwnwwnwwwswwsenw",
    "swswswswwwnewwswnwwnewwewewsww",
    "sewwswswneeswwnwswwwswnewswwswswsw",
    "swwewwnwswswswnwnwweswneeeeww",
    "swswwswswseeseswneeweswswnwnwswene",
    "newwnwseesewsesenwsewseewesenwene",
    "wswwwnwwsenwwnewwnwsewwnwwne",
    "swswseseswnweswnwneeswneswsesesenwwswnesw",
    "nwnwnwnwwnwnwnwsenwnwwnwsenwnwnwwnenwnw",
    "nwswwenwswsweswwswswwseswswswnwsesw",
    "nwewwwnwwsenwwwnwesw",
    "wnwnwnwnwnwwnwsenwnwneswnwenwwsenwnw",
    "swnenwnwwnwnenwnenenwnenwnwenwnwenwnwsw",
    "swswnwswsweswwseswnwwswswnwsenwswew",
    "eeeeneeswseeeeeeeeeenenwene",
    "neeeneneneeeneeeeneswneneenenee",
    "nwnwnwwnwnwneenwnwnwnwsenenwnwnwnwnwnw",
    "eeeseeeswseenwenenwseeseeeesw",
    "neeneneeesenweeeene",
    "neneenenenesenenenenenenenenenenenenwne",
    "senwwswswwswswsewneseeseswneswswswswene",
    "neeeeneeeseseeeeseeseeseesesww",
    "eeeneneenewneneseneneneeeeneee",
    "swnwwnwsenenwnenwnwsenwnwnenewnwenwne",
    "neneneneneenenenenwnenenwwsenenenenenenw",
    "wwnewwwseswwnewww",
    "nwenesenwnwnwnwnew",
    "swseseswseswseswswswenwswswseswseneswse",
    "senwswsweseneeeeneeneeswnesewswwnw",
    "eenenwswswnwswewwneenwwwwsewsenw",
    "seeeenenwneneeneeeneeswe",
    "newenweeneswneneswne",
    "swswswseswswsenewwnwwwnwnesweswwww",
    "nwneneeeneswneneneneeneeneeneeene",
    "eeeeeeesweeeeewnweseeenw",
    "swseswswswswswsewneswnwswswsesesesesesese",
    "nwnwsenenenwswnwnenenwwsenenwnenewseswse",
    "wsewswwswwwswwnewseenenenewwwse",
    "nwnewnenenenenenwnenenenenenenwnenwsenw",
    "wnwwwsenewwnwwwwwwwwwwww",
    "nenwnenewseeseeswswenwwsesewsw",
    "enwnenesweneneneneswenenwswneneeenenene",
    "seeeeeenwnweeseeseeswseseeeee",
    "wwnwwnwswwwwnwwnenesww",
    "seswswswneseseseseswseseseswsesesesewswse",
    "wnenwseseeseswswwseseswswswswseswswseswsw",
    "wnwnwnwneenesenwnwnwnwnwnwnw",
    "nenenenwneeneneneneneneswnenwnenenenenwne",
    "sewwswswswwswswwswwswnwseswwswneswsw",
    "eeeneeeswsenwwseseeeeeeeseese",
    "swswswswswswneswswswswswwswswswsw",
    "newswwswwnenwsewwwwwwwwwswsew",
    "sesesesenwseseseseseseeseseswsenwsesese",
    "swswsesweswwseswwswnwswswswswswwnwnw",
    "nenenwneneswnenwsenewnesesewnwnewnee",
    "sesesesesewneseseseneseseseseseseswsesee",
    "nenenenenwwnesesenenenesesenewneenwene",
    "wnwwwwsewnwswneenwwenwswwwwww",
    "swseswswnwswswseswswswnwswswseseeswswswswsw",
    "wnwwnwwnwwwnewwwnwwswwwwwsewe",
    "neeeeneneenenenesewneneeneeenene",
    "seneenweeneeeeeneenweeeeseee",
    "enewnenwsenenwnenenenenesenwnenenwnenenw",
    "neeneneswneneweenwneneeneeenenee",
    "wwwswwswsweswneswswwswsewswswww",
    "swwwswswseswwwswswwsenenwswwwwnw",
    "neenwneneneeseswswewnwswnenwnenenwnenwne",
    "seeseewwweeseweseeseeesesenwe",
    "swneneneneneneneneneneneeneneneneenene",
    "wwswseesweswneenenwnwseesewswnwene",
    "seseseswseswswseswseneseseswswseswsesesew",
    "neeneneseenewenenwswnweeneeswneswne",
    "seswwneswsewnwnewsenwswswenwww",
    "wwsewwwwwwwnewswwewwwwwww",
    "nenenenwnenenenenenwnesenenenenenenenene",
    "eseswswswwnwswneswneseeswswswswswswswww",
    "neeesweenewenenweneneewnenenenene",
    "nwswwwnwwewswwswwwswseswwwwswswsw",
    "wwenwnwewswwwnenwwwnewnwswww",
    "nwneenenwswwwsewewwsesewwsewswnw",
    "seswseneswseeenenwseeseswneswsesesesenw",
    "eeseswweseeseseesesesesenw",
    "neseseseewwwneseseenwseseeseseeee",
    "seswnwsweseseeswseseswnwnwsesesenweseswe",
    "neseseswswswswsesesw",
    "nenenenewnenwnwnesenenenenwnenwwneneenene",
    "sweseseeswsesenweseesesewsesenwenesee",
    "senenenenwwnwwnesenenesenenwnwnwnewnwe",
    "swwnwseneswseseseneseseneseswnwnesewwswse",
    "wnwnwnewnwnwwnwnwnwwsenwswwnwnenwwww",
    "wnewwwnwwwwwsewwwwwwwnwwnw",
    "eeesenwenesenweenwesweneeeeee",
    "wsesenewnenenenenw",
    "eeeeeseneeweneeeeeeeeee",
    "eneseneweneneeeeswneeneeneneww",
    "nwnwnwnwnwnwnwenwnwnwwewnwnw",
    "seseseswswseseseswsesesewseseseseseswne",
    "swwwsweswswswswwswswswswswneww",
    "seeenweseweseesesweeeeeenwe",
    "nweneneeneeeeeeeeneseeeneene",
    "wswnewwwwwwwwswswwwswewwww",
    "swswswseswswswwseseswneswseswseseswswsesw",
    "swswswswseswswswsenwnweswswswseswsewesw",
    "nwswnwwnwswnwnwnenwnwenenwsenwne",
    "nwwnwesenwnwnwnenwwwnwnwewnwnwnwnwswnw",
    "wswswswnwwwwwneswwswwsewwswwsw",
    "nenewneneneeneewnenenenenenenwnenenene",
    "nwseseswswseseseeeseeseneseseseseese",
    "eswseeseseeewnwseeseseeeseseesese",
    "nenwnwnwneneeneneneneneneneneneneneswnw",
    "nwnenwneneneneenwnenenenenenenwnewnene",
    "nwneneenenenwseeseneeneeenenenewnene",
    "wneseswsweswswsenwswswswsweeswnwswnw",
    "swneeswsewswswenweneswnwnesewew",
    "nwnwnwnwnwnenwnwnwnwsenwsenwwnwnwnwnwnwne",
    "neswneswnewneswseseswnwnwswnewseswsee",
    "eenenwseweeneeneneeweneweeene",
    "nenwwwnwnwneenenenwswnwnwswseenwswnwenw",
    "sweswnwswsweeswwswnenw",
    "wsewsewsenwneswnwnwwewswnwweenw",
    "nenwnenwswnwnenwnwnenenwnenwnenwnenenene",
    "swwneswwewwswneswwwswswwswwwse",
    "swsewswwsewwswneswswwseneswswswnesw",
    "seenenwsweesenwseswnweseeeeenwe",
    "swwswwswswswweswnwsweswswswswnenwwwsw",
    "wnwnwwswenwweswenwwwwwnwnwswnw",
    "swswwswwwswwwwsewwwwwswswwnesw",
    "neswswswswswswswwswswswswwswswswwwe",
    "wenwenwwseswwwnewnwseseswwneswneww",
    "nwswswswneswswwwsewwswswswswswsesww"
];
