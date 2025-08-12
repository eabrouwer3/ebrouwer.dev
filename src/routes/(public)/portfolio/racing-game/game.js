// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const speedDisplay = document.getElementById('speed');
const lapDisplay = document.getElementById('lap');
const timeDisplay = document.getElementById('time');

// Game settings (configured by player)
let gameSettings = {
    difficulty: 'medium',
    lapCount: 10,
    gameMode: 'single' // 'single' or 'pvp'
};

// Game state
let gameStartTime = Date.now();
let lastTime = 0;
let keys = {};
let raceFinished = false;
let winner = null;
let raceStarted = false;
let countdown = 3;
let countdownTimer = 0;
let gameInitialized = false; // Prevent auto-start

// Racer selection state
let selectedPlayerRacer = null; // The racer the player chooses to drive (Player 1 in PvP)
let selectedPlayer2Racer = null; // Second player's racer (PvP mode only)
let selectedOpponents = []; // Random opponents that will be generated
const maxOpponents = 5; // In single player mode
const maxOpponentsPvP = 4; // In PvP mode (2 players + 4 AI = 6 total)

// Static spectator cars data - generated once and reused
let spectatorCars = [];
let cameraFlashes = [];

// Initialize static spectator cars
function initializeSpectatorCars() {
    spectatorCars = [];

    const spectatorColors = [
        '#ff0000', '#0000ff', '#00ff00', '#ffff00', '#ff00ff', '#00ffff',
        '#ffa500', '#800080', '#008000', '#000080', '#800000', '#008080',
        '#ffb6c1', '#90ee90', '#87ceeb', '#dda0dd', '#f0e68c', '#ffd700'
    ];

    // Outer stands - cars facing the track
    for (let angle = 0; angle < Math.PI * 2; angle += 0.3) {
        const standRadius = track.radius + 40 + Math.random() * 30;
        const carX = track.centerX + Math.cos(angle) * standRadius;
        const carY = track.centerY + Math.sin(angle) * standRadius;
        const carAngle = angle + Math.PI + (Math.random() - 0.5) * 0.5;
        const carColor = spectatorColors[Math.floor(Math.random() * spectatorColors.length)];

        if (carX > 10 && carX < canvas.width - 10 && carY > 10 && carY < canvas.height - 10) {
            spectatorCars.push({ x: carX, y: carY, angle: carAngle, color: carColor });
        }
    }

    // Inner stands - cars facing the track from inside
    for (let angle = 0; angle < Math.PI * 2; angle += 0.4) {
        const standRadius = track.radius - track.trackWidth - 20 - Math.random() * 15;
        if (standRadius > 30) {
            const carX = track.centerX + Math.cos(angle) * standRadius;
            const carY = track.centerY + Math.sin(angle) * standRadius;
            const carAngle = angle + (Math.random() - 0.5) * 0.5;
            const carColor = spectatorColors[Math.floor(Math.random() * spectatorColors.length)];

            spectatorCars.push({ x: carX, y: carY, angle: carAngle, color: carColor });
        }
    }

    // Additional scattered spectator cars
    for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = track.radius + 25 + Math.random() * 45;
        const carX = track.centerX + Math.cos(angle) * distance;
        const carY = track.centerY + Math.sin(angle) * distance;
        const carAngle = angle + Math.PI + (Math.random() - 0.5) * 1.0;
        const carColor = spectatorColors[Math.floor(Math.random() * spectatorColors.length)];

        if (carX > 15 && carX < canvas.width - 15 && carY > 15 && carY < canvas.height - 15) {
            const distanceFromTrack = Math.sqrt(Math.pow(carX - track.centerX, 2) + Math.pow(carY - track.centerY, 2));
            if (distanceFromTrack > track.radius + 15) {
                spectatorCars.push({ x: carX, y: carY, angle: carAngle, color: carColor });
            }
        }
    }
}

// Initialize camera flashes
function initializeCameraFlashes() {
    cameraFlashes = [];

    // Create fixed flash positions throughout the stands
    for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = track.radius + 20 + Math.random() * 60;
        const flashX = track.centerX + Math.cos(angle) * distance;
        const flashY = track.centerY + Math.sin(angle) * distance;

        if (flashX > 10 && flashX < canvas.width - 10 && flashY > 10 && flashY < canvas.height - 10) {
            cameraFlashes.push({
                x: flashX,
                y: flashY,
                timer: Math.random() * 3000, // Random initial timer
                duration: 0,
                interval: 2000 + Math.random() * 4000 // Flash every 2-6 seconds
            });
        }
    }
}

// Track properties - circular shape
const track = {
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    radius: 200,
    trackWidth: 80,
    startLineX: canvas.width / 2 + 200, // Right side of circle
    startLineY: canvas.height / 2
};

// Car properties - positioned at front left of starting grid
const car = {
    x: track.centerX + Math.cos(0.05) * (track.radius - 60), // Front left position on track
    y: track.centerY + Math.sin(0.05) * (track.radius - 60),
    angle: -Math.PI / 2, // Start pointing up for counter-clockwise track direction
    speed: 0,
    maxSpeed: 1.5,
    acceleration: 0.075,
    friction: 0.015,
    turnSpeed: 0.03,
    width: 8,
    height: 16,
    currentLap: 1, // Start at lap 1
    passedStartLine: false,
    startLineCrossings: 0,
    lastAngleAtStart: 0, // Track angle when crossing start line for proper lap detection
    hasPassedTopOfTrack: false, // Ensure car goes around the track
    isPlayer: true,
    playerNumber: 1, // Player 1
    name: "Lightning McQueen",
    color: '#dc143c',
    lastAngle: undefined, // For lap tracking
    totalRotation: 0, // For lap tracking
    hasLeftStart: false // For lap tracking
};

// Second player car for PvP mode - positioned at front right of starting grid
const car2 = {
    x: track.centerX + Math.cos(0.05) * (track.radius - 20), // Front right position on track
    y: track.centerY + Math.sin(0.05) * (track.radius - 20),
    angle: -Math.PI / 2, // Start pointing up for counter-clockwise track direction
    speed: 0,
    maxSpeed: 1.5,
    acceleration: 0.075,
    friction: 0.015,
    turnSpeed: 0.03,
    width: 8,
    height: 16,
    currentLap: 1, // Start at lap 1
    passedStartLine: false,
    startLineCrossings: 0,
    lastAngleAtStart: 0, // Track angle when crossing start line for proper lap detection
    hasPassedTopOfTrack: false, // Ensure car goes around the track
    isPlayer: true,
    playerNumber: 2, // Player 2
    name: "The King",
    color: '#0066cc',
    lastAngle: undefined, // For lap tracking
    totalRotation: 0, // For lap tracking
    hasLeftStart: false // For lap tracking
};

// AI Cars - 5 AI cars for 6 total (player selects their racer, opponents are random)
const aiCars = [];
const availableAICars = [
    {
        name: 'Lightning McQueen',
        color: '#dc143c',
        maxSpeed: 1.5,
        acceleration: 0.075,
        handling: 0.03,
        consistency: 0.1,
        description: 'Ka-chiga! Speed, I am speed!'
    },
    {
        name: 'The King',
        color: '#0066cc',
        maxSpeed: 1.8,
        acceleration: 0.055,
        handling: 0.045,
        consistency: 0.15,
        description: 'Veteran racer with excellent speed and experience'
    },
    {
        name: 'Chick Hicks',
        color: '#00cc00',
        maxSpeed: 1.6,
        acceleration: 0.065,
        handling: 0.035,
        consistency: 0.4,
        description: 'Aggressive racer who takes risks and makes mistakes'
    },
    {
        name: 'Cal Weathers',
        color: '#ff8800',
        maxSpeed: 1.7,
        acceleration: 0.06,
        handling: 0.05,
        consistency: 0.2,
        description: 'Next-gen racer with balanced performance'
    },
    {
        name: 'Bobby Swift',
        color: '#9900cc',
        maxSpeed: 1.75,
        acceleration: 0.045,
        handling: 0.055,
        consistency: 0.25,
        description: 'Fast but sometimes inconsistent veteran'
    },
    {
        name: 'Mater',
        color: '#ff6600',
        maxSpeed: 1.2,
        acceleration: 0.035,
        handling: 0.025,
        consistency: 0.6,
        description: 'Slow but unpredictable - might surprise you!'
    },
    {
        name: 'Sally Carrera',
        color: '#cc0066',
        maxSpeed: 1.4,
        acceleration: 0.05,
        handling: 0.06,
        consistency: 0.1,
        description: 'Excellent handling and very consistent'
    },
    {
        name: 'Ramone',
        color: '#66cc00',
        maxSpeed: 1.5,
        acceleration: 0.07,
        handling: 0.04,
        consistency: 0.3,
        description: 'Quick acceleration but moderate handling'
    },
    {
        name: 'Flo',
        color: '#0099cc',
        maxSpeed: 1.45,
        acceleration: 0.055,
        handling: 0.05,
        consistency: 0.2,
        description: 'Well-rounded racer with steady performance'
    },
    {
        name: 'Fillmore',
        color: '#cc6600',
        maxSpeed: 1.3,
        acceleration: 0.04,
        handling: 0.035,
        consistency: 0.1,
        description: 'Slow but very reliable and consistent'
    },
    {
        name: 'Sarge',
        color: '#6600cc',
        maxSpeed: 1.6,
        acceleration: 0.065,
        handling: 0.045,
        consistency: 0.05,
        description: 'Military precision - highly disciplined racer'
    },
    {
        name: 'Luigi',
        color: '#00cc66',
        maxSpeed: 1.35,
        acceleration: 0.045,
        handling: 0.055,
        consistency: 0.15,
        description: 'Tire expert with great cornering skills'
    },
    {
        name: 'Guido',
        color: '#cc0099',
        maxSpeed: 1.25,
        acceleration: 0.08,
        handling: 0.04,
        consistency: 0.25,
        description: 'Small but lightning-fast acceleration'
    },
    {
        name: 'Sheriff',
        color: '#ffcc00',
        maxSpeed: 1.55,
        acceleration: 0.05,
        handling: 0.04,
        consistency: 0.1,
        description: 'Steady lawman with reliable performance'
    },
    {
        name: 'Doc Hudson',
        color: '#00ccff',
        maxSpeed: 1.9,
        acceleration: 0.06,
        handling: 0.055,
        consistency: 0.05,
        description: 'Legendary racer - top stats across the board'
    },
    {
        name: 'Lizzie',
        color: '#ff0066',
        maxSpeed: 1.1,
        acceleration: 0.025,
        handling: 0.03,
        consistency: 0.5,
        description: 'Vintage racer - slow but has her moments'
    },
    {
        name: 'Red',
        color: '#66ff00',
        maxSpeed: 1.4,
        acceleration: 0.04,
        handling: 0.045,
        consistency: 0.2,
        description: 'Fire truck with surprising agility'
    },
    {
        name: 'Frank',
        color: '#ff3300',
        maxSpeed: 1.8,
        acceleration: 0.03,
        handling: 0.025,
        consistency: 0.7,
        description: 'Powerful but difficult to control'
    },
    {
        name: 'Tractor',
        color: '#3300ff',
        maxSpeed: 1.0,
        acceleration: 0.02,
        handling: 0.02,
        consistency: 0.8,
        description: 'Slowest racer but might cause chaos'
    },
    {
        name: 'Boost',
        color: '#00ff33',
        maxSpeed: 2.0,
        acceleration: 0.075,
        handling: 0.03,
        consistency: 0.35,
        description: 'Fastest racer but poor handling and mistakes'
    }
];

// Difficulty settings
const difficultySettings = {
    easy: {
        maxSpeedRange: [1.0, 1.2],
        accelerationRange: [0.02, 0.03],
        turnSpeedRange: [0.025, 0.035],
        stupidityRange: [0.4, 0.8],
        mistakeFrequency: 0.2 // Reasonable increase from 0.25
    },
    medium: {
        maxSpeedRange: [1.3, 1.7],
        accelerationRange: [0.03, 0.05],
        turnSpeedRange: [0.03, 0.05],
        stupidityRange: [0.2, 0.7],
        mistakeFrequency: 0.12 // Slight increase from 0.15
    },
    hard: {
        maxSpeedRange: [1.5, 1.9],
        accelerationRange: [0.04, 0.06],
        turnSpeedRange: [0.035, 0.055],
        stupidityRange: [0.1, 0.5],
        mistakeFrequency: 0.08 // Same as original
    },
    extreme: {
        maxSpeedRange: [1.7, 2.1],
        accelerationRange: [0.05, 0.08],
        turnSpeedRange: [0.04, 0.06],
        stupidityRange: [0.0, 0.3],
        mistakeFrequency: 0.04 // Slight increase from 0.02
    }
};

// Initialize AI cars - using selected opponents with static stats
function initAICars() {
    // Clear existing AI cars
    aiCars.length = 0;

    // Use the selected opponents from the racer selection screen
    for (let i = 0; i < selectedOpponents.length; i++) {
        // Create starting grid formation with player at front left (angle 0.05)
        // AI Car layout:
        // i=0: Front right (angle 0.05, outside lane)
        // i=1: Back left (angle 0.2, inside lane)
        // i=2: Back right (angle 0.2, outside lane)
        // i=3: Third row left (angle 0.35, inside lane)
        // i=4: Third row right (angle 0.35, outside lane)

        let gridAngle, laneRadius;

        if (i === 0) {
            // Front right position (same row as player but different lane)
            gridAngle = 0.05;
            laneRadius = track.radius - 20; // Outside lane (player is inside)
        } else if (i === 1) {
            // Second row left
            gridAngle = 0.25;
            laneRadius = track.radius - 60; // Inside lane
        } else if (i === 2) {
            // Second row right
            gridAngle = 0.25;
            laneRadius = track.radius - 20; // Outside lane
        } else if (i === 3) {
            // Third row left
            gridAngle = 0.45;
            laneRadius = track.radius - 60; // Inside lane
        } else {
            // Third row right
            gridAngle = 0.45;
            laneRadius = track.radius - 20; // Outside lane
        }

        const carX = track.centerX + Math.cos(gridAngle) * laneRadius;
        const carY = track.centerY + Math.sin(gridAngle) * laneRadius;
        const selectedCar = selectedOpponents[i];

        aiCars.push({
            x: carX,
            y: carY,
            angle: -Math.PI / 2, // Point upward initially
            speed: 0,
            maxSpeed: selectedCar.maxSpeed, // Use static stats
            acceleration: selectedCar.acceleration,
            friction: 0.015,
            turnSpeed: selectedCar.handling, // Use handling for turn speed
            width: 8,
            height: 16,
            currentLap: 1, // Start at lap 1
            passedStartLine: false,
            startLineCrossings: 0,
            lastAngleAtStart: 0,
            hasPassedTopOfTrack: false,
            name: selectedCar.name,
            color: selectedCar.color,
            targetAngle: -Math.PI / 2,
            distanceToTarget: 0,
            isPlayer: false,
            racingLine: (Math.random() - 0.5) * 0.4, // Smaller range to keep cars on track better
            aggressiveness: Math.random(), // How aggressive in overtaking
            lanePreference: i % 3, // 0=inside, 1=middle, 2=outside lane preference
            needsToGetOnTrack: true, // Flag to help AI get onto proper racing line

            // Use static consistency instead of random stupidity
            stupidity: selectedCar.consistency, // Use the consistency stat as stupidity
            speedVariation: Math.random() * 0.3, // How much their speed varies
            passingStyle: Math.random(), // 0 = conservative, 1 = risky (drives on edges)
            speedTimer: 0, // Timer for speed changes
            currentSpeedModifier: 1.0, // Current speed multiplier
            mistakeTimer: Math.random() * 3000, // Timer for periodic mistakes

            // Lap tracking properties
            lastAngle: undefined, // For lap tracking
            totalRotation: 0, // For lap tracking
            hasLeftStart: false // For lap tracking
        });
    }
}

// Event listeners for controls
document.addEventListener('keydown', (e) => {
    // Prevent page scrolling with arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }

    // F5 restart functionality
    if (e.key === 'F5') {
        e.preventDefault();
        restartRace();
        return;
    }

    keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
    // Prevent page scrolling with arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
    keys[e.key.toLowerCase()] = false;
});

// Screen management functions
function showStartScreen() {
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('racerScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'none';
    gameInitialized = false;
}

function showRacerScreen() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('racerScreen').style.display = 'block';
    document.getElementById('gameScreen').style.display = 'none';
    initializeRacerSelection();
    updateSelectionUI(); // Update UI based on game mode
}

function showGameScreen() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('racerScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    // Focus the canvas for keyboard controls
    canvas.focus();
}

// Racer selection functions
function initializeRacerSelection() {
    selectedPlayerRacer = null;
    selectedPlayer2Racer = null;
    selectedOpponents = [];
    renderRacerGrid();
    updateSelectedRacersList();
    updateStartButton();
}

// Update selection UI based on game mode
function updateSelectionUI() {
    const selectionInfo = document.getElementById('selectionInfo');
    const totalRacers = document.getElementById('totalRacers');

    if (gameSettings.gameMode === 'pvp') {
        selectionInfo.textContent = 'Pick your racers! Each player controls a different racer. 4 AI opponents will fill the remaining spots.';
        totalRacers.textContent = '6';
    } else {
        selectionInfo.textContent = 'Pick who you want to drive! 5 random opponents will be automatically selected.';
        totalRacers.textContent = '6';
    }
}

function renderRacerGrid() {
    const racerGrid = document.getElementById('racerGrid');
    racerGrid.innerHTML = '';

    availableAICars.forEach((racer, index) => {
        const racerCard = document.createElement('div');
        racerCard.className = 'racer-card';
        racerCard.dataset.racerIndex = index;

        // Check if this racer is selected
        const isSelectedAsPlayer1 = selectedPlayerRacer && selectedPlayerRacer.name === racer.name;
        const isSelectedAsPlayer2 = selectedPlayer2Racer && selectedPlayer2Racer.name === racer.name;
        const isSelected = isSelectedAsPlayer1 || isSelectedAsPlayer2;

        if (isSelected) {
            racerCard.classList.add('selected');
        }

        racerCard.innerHTML = `
            <div class="racer-header">
                <div class="racer-color" style="background-color: ${racer.color}"></div>
                <div class="racer-name">${racer.name}</div>
                ${isSelectedAsPlayer1 ? '<span class="player-indicator">P1</span>' : ''}
                ${isSelectedAsPlayer2 ? '<span class="player-indicator">P2</span>' : ''}
            </div>
            <div class="racer-description">${racer.description}</div>
            <div class="racer-stats">
                <div class="stat-item">
                    <span class="stat-label">Speed</span>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${(racer.maxSpeed / 2.0) * 100}%"></div>
                    </div>
                    <span class="stat-value">${Math.round((racer.maxSpeed / 2.0) * 100)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Accel</span>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${(racer.acceleration / 0.08) * 100}%"></div>
                    </div>
                    <span class="stat-value">${Math.round((racer.acceleration / 0.08) * 100)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Handle</span>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${(racer.handling / 0.06) * 100}%"></div>
                    </div>
                    <span class="stat-value">${Math.round((racer.handling / 0.06) * 100)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Consist</span>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${((1 - racer.consistency) / 0.8) * 100}%"></div>
                    </div>
                    <span class="stat-value">${Math.round(((1 - racer.consistency) / 0.8) * 100)}</span>
                </div>
            </div>
        `;

        racerCard.addEventListener('click', () => toggleRacerSelection(index));
        racerGrid.appendChild(racerCard);
    });
}

function toggleRacerSelection(racerIndex) {
    const racer = availableAICars[racerIndex];

    if (gameSettings.gameMode === 'single') {
        // Single player mode logic (existing behavior)
        if (selectedPlayerRacer && selectedPlayerRacer.name === racer.name) {
            // Deselect current player racer
            selectedPlayerRacer = null;
            selectedOpponents = [];
        } else {
            // Select new player racer and generate random opponents
            selectedPlayerRacer = racer;
            generateRandomOpponents();
        }
    } else {
        // PvP mode logic
        const isSelectedAsPlayer1 = selectedPlayerRacer && selectedPlayerRacer.name === racer.name;
        const isSelectedAsPlayer2 = selectedPlayer2Racer && selectedPlayer2Racer.name === racer.name;

        if (isSelectedAsPlayer1) {
            // Deselect Player 1
            selectedPlayerRacer = null;
        } else if (isSelectedAsPlayer2) {
            // Deselect Player 2
            selectedPlayer2Racer = null;
        } else {
            // Select racer for available player slot
            if (!selectedPlayerRacer) {
                selectedPlayerRacer = racer;
            } else if (!selectedPlayer2Racer) {
                selectedPlayer2Racer = racer;
            } else {
                // Both slots filled, replace Player 1
                selectedPlayerRacer = racer;
            }
        }

        // Generate opponents if we have at least one player selected
        if (selectedPlayerRacer || selectedPlayer2Racer) {
            generateRandomOpponents();
        } else {
            selectedOpponents = [];
        }
    }

    renderRacerGrid();
    updateSelectedRacersList();
    updateStartButton();
}

function generateRandomOpponents() {
    selectedOpponents = [];

    // Get all available racers except the selected player racers
    let excludedRacers = [];
    if (selectedPlayerRacer) excludedRacers.push(selectedPlayerRacer.name);
    if (selectedPlayer2Racer) excludedRacers.push(selectedPlayer2Racer.name);

    const availableOpponents = availableAICars.filter(racer =>
        !excludedRacers.includes(racer.name)
    );

    // Determine how many opponents to select based on game mode
    const opponentCount = gameSettings.gameMode === 'pvp' ? maxOpponentsPvP : maxOpponents;

    // Randomly select opponents
    const shuffled = [...availableOpponents].sort(() => Math.random() - 0.5);
    selectedOpponents = shuffled.slice(0, opponentCount);
}

function updateSelectedRacersList() {
    const selectedList = document.getElementById('selectedList');
    const selectedCount = document.getElementById('selectedCount');

    // Calculate selected count based on game mode
    let totalSelected = selectedOpponents.length;
    if (selectedPlayerRacer) totalSelected++;
    if (selectedPlayer2Racer && gameSettings.gameMode === 'pvp') totalSelected++;

    selectedCount.textContent = totalSelected.toString();

    if (gameSettings.gameMode === 'single') {
        // Single player mode display
        if (!selectedPlayerRacer) {
            selectedList.className = 'selected-list empty';
            selectedList.innerHTML = '<div style="text-align: center; color: #999; font-style: italic;">Select your racer above</div>';
            return;
        }

        selectedList.className = 'selected-list';

        // Show player racer first with special styling
        let html = `
            <div class="selected-racer-card" style="border: 2px solid #ffd700; background: rgba(255, 215, 0, 0.1);">
                <div class="racer-color" style="background-color: ${selectedPlayerRacer.color}"></div>
                <div class="racer-name">${selectedPlayerRacer.name} (YOU)</div>
                <button class="remove-racer" onclick="clearPlayerSelection()" title="Clear selection">×</button>
            </div>
        `;

        // Add opponents
        html += selectedOpponents.map((racer, index) => `
            <div class="selected-racer-card">
                <div class="racer-color" style="background-color: ${racer.color}"></div>
                <div class="racer-name">${racer.name}</div>
                <span class="opponent-label" style="font-size: 12px; color: #999;">AI</span>
            </div>
        `).join('');

        selectedList.innerHTML = html;
    } else {
        // PvP mode display
        if (!selectedPlayerRacer && !selectedPlayer2Racer) {
            selectedList.className = 'selected-list empty';
            selectedList.innerHTML = '<div style="text-align: center; color: #999; font-style: italic;">Select racers for Player 1 and Player 2</div>';
            return;
        }

        selectedList.className = 'selected-list';
        let html = '';

        // Show Player 1 if selected
        if (selectedPlayerRacer) {
            html += `
                <div class="selected-racer-card" style="border: 2px solid #ffd700; background: rgba(255, 215, 0, 0.1);">
                    <div class="racer-color" style="background-color: ${selectedPlayerRacer.color}"></div>
                    <div class="racer-name">${selectedPlayerRacer.name} (P1)</div>
                    <button class="remove-racer" onclick="clearPlayer1Selection()" title="Clear Player 1">×</button>
                </div>
            `;
        }

        // Show Player 2 if selected
        if (selectedPlayer2Racer) {
            html += `
                <div class="selected-racer-card" style="border: 2px solid #00aaff; background: rgba(0, 170, 255, 0.1);">
                    <div class="racer-color" style="background-color: ${selectedPlayer2Racer.color}"></div>
                    <div class="racer-name">${selectedPlayer2Racer.name} (P2)</div>
                    <button class="remove-racer" onclick="clearPlayer2Selection()" title="Clear Player 2">×</button>
                </div>
            `;
        }

        // Add opponents
        html += selectedOpponents.map((racer, index) => `
            <div class="selected-racer-card">
                <div class="racer-color" style="background-color: ${racer.color}"></div>
                <div class="racer-name">${racer.name}</div>
                <span class="opponent-label" style="font-size: 12px; color: #999;">AI</span>
            </div>
        `).join('');

        selectedList.innerHTML = html;
    }
}

function clearPlayerSelection() {
    selectedPlayerRacer = null;
    selectedOpponents = [];
    renderRacerGrid();
    updateSelectedRacersList();
    updateStartButton();
}

function clearPlayer1Selection() {
    selectedPlayerRacer = null;
    if (selectedPlayer2Racer) {
        generateRandomOpponents();
    } else {
        selectedOpponents = [];
    }
    renderRacerGrid();
    updateSelectedRacersList();
    updateStartButton();
}

function clearPlayer2Selection() {
    selectedPlayer2Racer = null;
    if (selectedPlayerRacer) {
        generateRandomOpponents();
    } else {
        selectedOpponents = [];
    }
    renderRacerGrid();
    updateSelectedRacersList();
    updateStartButton();
}

function clearSelection() {
    selectedPlayerRacer = null;
    selectedPlayer2Racer = null;
    selectedOpponents = [];
    renderRacerGrid();
    updateSelectedRacersList();
    updateStartButton();
}

function randomSelection() {
    // Randomly select a player racer and generate opponents
    const randomPlayerIndex = Math.floor(Math.random() * availableAICars.length);
    selectedPlayerRacer = availableAICars[randomPlayerIndex];
    generateRandomOpponents();
    renderRacerGrid();
    updateSelectedRacersList();
    updateStartButton();
}

function updateStartButton() {
    const startBtn = document.getElementById('startRaceFromSelectionBtn');

    if (gameSettings.gameMode === 'single') {
        // Single player mode: need at least player 1 selected
        startBtn.disabled = !selectedPlayerRacer;
    } else {
        // PvP mode: need both players selected
        startBtn.disabled = !selectedPlayerRacer || !selectedPlayer2Racer;
    }
}

// Make clear functions available globally for onclick handlers
window.clearPlayerSelection = clearPlayerSelection;
window.clearPlayer1Selection = clearPlayer1Selection;
window.clearPlayer2Selection = clearPlayer2Selection;

// Start screen event handlers
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startRaceBtn');
    const gameModeSelect = document.getElementById('gameMode');
    const difficultySelect = document.getElementById('difficulty');
    const lapCountSelect = document.getElementById('lapCount');

    startBtn.addEventListener('click', () => {
        // Get selected settings
        gameSettings.gameMode = gameModeSelect.value;
        gameSettings.difficulty = difficultySelect.value;
        gameSettings.lapCount = parseInt(lapCountSelect.value);

        // Go to racer selection instead of directly to game
        showRacerScreen();
    });

    // Racer selection event handlers
    const clearSelectionBtn = document.getElementById('clearSelectionBtn');
    const randomSelectionBtn = document.getElementById('randomSelectionBtn');
    const backToStartBtn = document.getElementById('backToStartBtn');
    const startRaceFromSelectionBtn = document.getElementById('startRaceFromSelectionBtn');

    clearSelectionBtn.addEventListener('click', clearSelection);
    randomSelectionBtn.addEventListener('click', randomSelection);
    backToStartBtn.addEventListener('click', showStartScreen);
    startRaceFromSelectionBtn.addEventListener('click', () => {
        initializeGame();
        showGameScreen();
    });
});

// Initialize the game with selected settings
function initializeGame() {
    // Reset all race variables
    raceFinished = false;
    winner = null;
    raceStarted = false;
    countdown = 3;
    countdownTimer = 0;
    gameStartTime = Date.now();

    // Initialize static spectator cars and camera flashes
    initializeSpectatorCars();
    initializeCameraFlashes();

    // Reset player 1 car and apply selected racer's stats
    car.x = track.centerX + Math.cos(0.05) * (track.radius - 60);
    car.y = track.centerY + Math.sin(0.05) * (track.radius - 60);
    car.angle = -Math.PI / 2;
    car.speed = 0;
    car.currentLap = 1;
    car.passedStartLine = false;
    car.startLineCrossings = 0;
    car.hasPassedTopOfTrack = false;
    car.lastAngle = undefined;
    car.totalRotation = 0;
    car.hasLeftStart = false;

    if (selectedPlayerRacer) {
        car.name = selectedPlayerRacer.name;
        car.color = selectedPlayerRacer.color;
        car.maxSpeed = selectedPlayerRacer.maxSpeed;
        car.acceleration = selectedPlayerRacer.acceleration;
        car.turnSpeed = selectedPlayerRacer.handling;
    }

    // Reset player 2 car (PvP mode only)
    car2.x = track.centerX + Math.cos(0.05) * (track.radius - 20);
    car2.y = track.centerY + Math.sin(0.05) * (track.radius - 20);
    car2.angle = -Math.PI / 2;
    car2.speed = 0;
    car2.currentLap = 1;
    car2.passedStartLine = false;
    car2.startLineCrossings = 0;
    car2.hasPassedTopOfTrack = false;
    car2.lastAngle = undefined;
    car2.totalRotation = 0;
    car2.hasLeftStart = false;

    if (selectedPlayer2Racer && gameSettings.gameMode === 'pvp') {
        car2.name = selectedPlayer2Racer.name;
        car2.color = selectedPlayer2Racer.color;
        car2.maxSpeed = selectedPlayer2Racer.maxSpeed;
        car2.acceleration = selectedPlayer2Racer.acceleration;
        car2.turnSpeed = selectedPlayer2Racer.handling;
    }

    // Initialize AI cars with difficulty settings
    initAICars();

    // Set game as initialized
    gameInitialized = true;

    // Update UI for the selected game mode
    updateGameUI();

    // Start the game loop if not already running
    if (!gameLoop.running) {
        gameLoop.running = true;
        requestAnimationFrame(gameLoop);
    }
}

// Restart race function (now returns to start screen)
function restartRace() {
    showStartScreen();
}

// Make canvas focusable and focus it
canvas.tabIndex = 0;
canvas.focus();

// Draw a small spectator car
function drawSpectatorCar(x, y, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Car body (smaller than racing cars)
    ctx.fillStyle = color;
    ctx.fillRect(-3, -5, 6, 10);

    // Windshield
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(-2, -3, 4, 3);

    // Wheels
    ctx.fillStyle = '#000000';
    ctx.fillRect(-3, -4, 1, 2);
    ctx.fillRect(2, -4, 1, 2);
    ctx.fillRect(-3, 2, 1, 2);
    ctx.fillRect(2, 2, 1, 2);

    ctx.restore();
}

// Update camera flash timers
function updateCameraFlashes(deltaTime) {
    for (const flash of cameraFlashes) {
        flash.timer += deltaTime;

        // Start a new flash
        if (flash.timer >= flash.interval && flash.duration <= 0) {
            flash.duration = 150 + Math.random() * 100; // Flash for 150-250ms
            flash.timer = 0; // Reset timer
            flash.interval = 2000 + Math.random() * 4000; // Next flash in 2-6 seconds
        }

        // Countdown flash duration
        if (flash.duration > 0) {
            flash.duration -= deltaTime;
        }
    }
}

// Draw camera flashes
function drawCameraFlashes() {
    for (const flash of cameraFlashes) {
        if (flash.duration > 0) {
            // Flash brightness based on remaining duration
            const brightness = Math.min(flash.duration / 100, 1.0);
            const alpha = brightness * 0.8;

            ctx.save();
            ctx.globalAlpha = alpha;

            // Draw flash as a bright white circle with gradient
            const gradient = ctx.createRadialGradient(flash.x, flash.y, 0, flash.x, flash.y, 12);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.5, '#ffffcc');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(flash.x, flash.y, 12 * brightness, 0, Math.PI * 2);
            ctx.fill();

            // Add a small bright center
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(flash.x, flash.y, 3 * brightness, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }
}

// Track rendering function - circular shape
function drawTrack() {
    // Stadium grass background
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stadium sections with grey colors for variety
    const standsSections = [
        { color: '#666666', name: 'grandstand' },  // Medium grey grandstand
        { color: '#555555', name: 'bleachers' },   // Darker grey bleachers
        { color: '#777777', name: 'premium' },     // Lighter grey premium section
    ];

    // Draw stands background in sections
    for (let i = 0; i < 12; i++) {
        const sectionAngle = (i / 12) * Math.PI * 2;
        const sectionWidth = Math.PI / 6; // 30 degrees per section
        const sectionColor = standsSections[i % standsSections.length].color;

        ctx.fillStyle = sectionColor;
        ctx.beginPath();
        ctx.moveTo(track.centerX, track.centerY);
        ctx.arc(track.centerX, track.centerY, track.radius + 80, sectionAngle, sectionAngle + sectionWidth);
        ctx.closePath();
        ctx.fill();
    }

    // Add spectator cars in the stands
    for (const car of spectatorCars) {
        drawSpectatorCar(car.x, car.y, car.angle, car.color);
    }

    // Draw camera flashes
    drawCameraFlashes();

    // Draw circular track
    const outerRadius = track.radius;
    const innerRadius = track.radius - track.trackWidth;

    // Outer track boundary
    ctx.fillStyle = '#404040';
    ctx.beginPath();
    ctx.arc(track.centerX, track.centerY, outerRadius, 0, Math.PI * 2);
    ctx.fill();

    // Inner track boundary (creates the hole)
    ctx.fillStyle = '#2d5016';
    ctx.beginPath();
    ctx.arc(track.centerX, track.centerY, innerRadius, 0, Math.PI * 2);
    ctx.fill();

    // Track surface (slightly smaller outer, slightly larger inner)
    ctx.fillStyle = '#555555';
    ctx.beginPath();
    ctx.arc(track.centerX, track.centerY, outerRadius - 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#2d5016';
    ctx.beginPath();
    ctx.arc(track.centerX, track.centerY, innerRadius + 5, 0, Math.PI * 2);
    ctx.fill();

    // Track lane markings (dashed white lines)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);

    // Center lane marking
    ctx.beginPath();
    ctx.arc(track.centerX, track.centerY, (outerRadius + innerRadius) / 2, 0, Math.PI * 2);
    ctx.stroke();

    // Start/finish line
    ctx.setLineDash([]);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(track.centerX + innerRadius + 5, track.centerY);
    ctx.lineTo(track.centerX + outerRadius - 5, track.centerY);
    ctx.stroke();

    // Checkered pattern for start line
    const checkSize = 8;
    const lineLength = track.trackWidth - 10;
    const checksHorizontal = Math.floor(lineLength / checkSize);
    for (let i = 0; i < checksHorizontal; i++) {
        for (let j = 0; j < 2; j++) {
            if ((i + j) % 2 === 0) {
                ctx.fillStyle = '#000000';
            } else {
                ctx.fillStyle = '#ffffff';
            }
            ctx.fillRect(
                track.centerX + innerRadius + 5 + i * checkSize,
                track.centerY - checkSize + j * checkSize,
                checkSize,
                checkSize
            );
        }
    }
}

// Car rendering function - supports both player and AI cars
function drawCar(carObj) {
    ctx.save();

    // Move to car position and rotate
    ctx.translate(carObj.x, carObj.y);
    ctx.rotate(carObj.angle - Math.PI / 2); // Adjust rotation so car points in movement direction

    // Car body with car's color
    ctx.fillStyle = carObj.color;
    ctx.fillRect(-carObj.width / 2, -carObj.height / 2, carObj.width, carObj.height);

    if (carObj.isPlayer) {
        // Player-specific details
        if (carObj.name === 'Lightning McQueen') {
            // Lightning McQueen specific details
            // Yellow lightning bolt stripe (simplified)
            ctx.fillStyle = '#ffd700';
            ctx.fillRect(-carObj.width / 2 + 1, -carObj.height / 2 + 6, carObj.width - 2, 2);
            ctx.fillRect(-carObj.width / 2 + 2, -carObj.height / 2 + 4, carObj.width - 4, 2);

            // Number 95 (simplified for pixel art)
            ctx.fillStyle = '#ffd700';
            ctx.font = '8px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('95', 0, 2);
        } else {
            // Generic player car (number 01)
            ctx.fillStyle = '#ffd700';
            ctx.font = '8px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('01', 0, 2);
        }
    } else {
        // AI car numbers
        const aiIndex = aiCars.indexOf(carObj);
        const carNumber = (aiIndex + 2).toString().padStart(2, '0'); // Numbers 02-06
        ctx.fillStyle = '#ffffff';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(carNumber, 0, 2);
    }

    // Windshield with "eyes"
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(-carObj.width / 2 + 1, -carObj.height / 2 + 2, carObj.width - 2, 4);

    // Eyes (two small white dots with black pupils)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-2, -carObj.height / 2 + 3, 1, 1);
    ctx.fillRect(1, -carObj.height / 2 + 3, 1, 1);
    ctx.fillStyle = '#000000';
    ctx.fillRect(-2, -carObj.height / 2 + 3, 1, 1); // Left pupil
    ctx.fillRect(1, -carObj.height / 2 + 3, 1, 1);  // Right pupil

    // Side accents
    ctx.fillStyle = carObj.isPlayer ? '#ffa500' : '#ffffff';
    ctx.fillRect(-carObj.width / 2, -1, 1, 2);
    ctx.fillRect(carObj.width / 2 - 1, -1, 1, 2);

    // Racing tires (black with white rim)
    ctx.fillStyle = '#000000';
    ctx.fillRect(-carObj.width / 2 - 1, -carObj.height / 2 + 2, 2, 3);
    ctx.fillRect(carObj.width / 2 - 1, -carObj.height / 2 + 2, 2, 3);
    ctx.fillRect(-carObj.width / 2 - 1, carObj.height / 2 - 5, 2, 3);
    ctx.fillRect(carObj.width / 2 - 1, carObj.height / 2 - 5, 2, 3);

    // White tire rims
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-carObj.width / 2, -carObj.height / 2 + 3, 1, 1);
    ctx.fillRect(carObj.width / 2 - 1, -carObj.height / 2 + 3, 1, 1);
    ctx.fillRect(-carObj.width / 2, carObj.height / 2 - 4, 1, 1);
    ctx.fillRect(carObj.width / 2 - 1, carObj.height / 2 - 4, 1, 1);

    // Small spoiler at the back
    ctx.fillStyle = carObj.color;
    ctx.fillRect(-carObj.width / 2 + 2, carObj.height / 2, carObj.width - 4, 1);

    ctx.restore();
}

// Physics and movement
function updateCar(deltaTime) {
    if (!raceStarted) {
        car.speed = 0;
        return;
    }

    // Handle input - in PvP mode, Player 1 uses arrow keys only
    let accelerating = false;
    let turning = 0;

    if (gameSettings.gameMode === 'pvp') {
        // PvP mode: Player 1 uses arrow keys only
        if (keys['arrowup']) {
            car.speed = Math.min(car.speed + car.acceleration, car.maxSpeed);
            accelerating = true;
        }
        if (keys['arrowdown']) {
            car.speed = Math.max(car.speed - car.acceleration * 1.5, -car.maxSpeed * 0.5);
        }
        if (keys['arrowleft']) {
            turning = -1;
        }
        if (keys['arrowright']) {
            turning = 1;
        }
    } else {
        // Single player mode: can use both arrow keys and WASD
        if (keys['arrowup'] || keys['w']) {
            car.speed = Math.min(car.speed + car.acceleration, car.maxSpeed);
            accelerating = true;
        }
        if (keys['arrowdown'] || keys['s']) {
            car.speed = Math.max(car.speed - car.acceleration * 1.5, -car.maxSpeed * 0.5);
        }
        if (keys['arrowleft'] || keys['a']) {
            turning = -1;
        }
        if (keys['arrowright'] || keys['d']) {
            turning = 1;
        }
    }

    // Apply friction when not accelerating
    if (!accelerating) {
        car.speed *= (1 - car.friction);
        if (Math.abs(car.speed) < 0.1) car.speed = 0;
    }

    // Turn when moving (much more responsive)
    if (Math.abs(car.speed) > 0.1) {
        // Make turning less dependent on speed for better control
        const speedFactor = Math.min(Math.abs(car.speed) / car.maxSpeed, 1);
        const baseTurnRate = 0.01; // Base turning that works even at low speed
        const speedTurnRate = car.turnSpeed * speedFactor; // Additional turning based on speed
        car.angle += turning * (baseTurnRate + speedTurnRate);
    }

        // Store previous position before moving
    const prevX = car.x;
    const prevY = car.y;

    // Update position
    car.x += Math.cos(car.angle) * car.speed;
    car.y += Math.sin(car.angle) * car.speed;

    // Check track boundaries and collision - circular shape
    const centerX = track.centerX;
    const centerY = track.centerY;
    const distanceFromCenter = Math.sqrt(Math.pow(car.x - centerX, 2) + Math.pow(car.y - centerY, 2));

    // Outer boundary with warning zone and hard stop
    const outerWarningZone = track.radius - 10;
    const outerHardStop = track.radius + 15;

    if (distanceFromCenter > outerHardStop) {
        // Hard stop - hit the wall
        car.x = prevX;
        car.y = prevY;
        car.speed = 0;
    } else if (distanceFromCenter > outerWarningZone) {
        // Warning zone - slow down significantly
        car.speed *= 0.5;
    }

    // Inner boundary with warning zone and hard stop
    const innerWarningZone = track.radius - track.trackWidth + 10;
    const innerHardStop = track.radius - track.trackWidth - 5;

    if (distanceFromCenter < innerHardStop) {
        // Hard stop - hit the inner wall
        car.x = prevX;
        car.y = prevY;
        car.speed = 0;
    } else if (distanceFromCenter < innerWarningZone) {
        // Warning zone - slow down significantly
        car.speed *= 0.5;
    }

    // Check lap completion
    checkLapCompletion(car);
}

// AI Car Movement and Behavior - updated for circular track
function updateAICar(aiCar, deltaTime) {
    if (!raceStarted) {
        aiCar.speed = 0;
        return;
    }

    const centerX = track.centerX;
    const centerY = track.centerY;

    // Add some randomization to AI behavior
    if (!aiCar.behaviorTimer) aiCar.behaviorTimer = 0;
    aiCar.behaviorTimer += deltaTime;

    // Subtle speed changes - AI gets slightly faster/slower over time
    aiCar.speedTimer += deltaTime;
    if (aiCar.speedTimer > 3000 + Math.random() * 4000) { // Every 3-7 seconds (less frequent)
        aiCar.speedTimer = 0;
        // Subtle speed variation: 0.9 to 1.1 (much smaller range)
        aiCar.currentSpeedModifier = 0.9 + Math.random() * 0.2;
    }

            // Occasional positioning mistakes - faster cars take more risks
    aiCar.mistakeTimer += deltaTime;
    const difficulty = difficultySettings[gameSettings.difficulty];
    const mistakeInterval = 4000 + Math.random() * 4000; // Base 4-8 seconds (less frequent)

    // Faster cars are slightly more prone to mistakes (risk vs reward)
    const speedBasedMistakeMultiplier = Math.max(1.0, aiCar.maxSpeed / 1.8); // Much less extreme
    const adjustedMistakeChance = difficulty.mistakeFrequency * speedBasedMistakeMultiplier; // No extra multiplier

    if (aiCar.mistakeTimer > mistakeInterval && Math.random() < adjustedMistakeChance) {
        aiCar.mistakeTimer = 0;
        aiCar.makingMistake = 30 + Math.random() * 30; // Make mistake for 30-60 frames (0.5-1 seconds)
    }

    // Calculate proper circular racing path
    const trackRadius = track.radius - track.trackWidth / 2;

        // Moderate lane variation for different racing lines
    let laneVariation = (aiCar.lanePreference - 1) * 12; // -12, 0, +12 for lanes
    const racingLineVariation = aiCar.racingLine * 8; // Moderate variation

    // Occasional bad decisions and edge driving when trying to pass
    if (aiCar.passingStyle > 0.7 && Math.random() < 0.2) {
        // Risky passing - drive near the edges
        laneVariation += (Math.random() - 0.5) * 25; // Moderate edge driving
    }

    // Moderate stupidity impact - sometimes just pick a bad racing line
    if (Math.random() < aiCar.stupidity) {
        laneVariation += (Math.random() - 0.5) * 20; // Moderate bad positioning
    }

        // Active mistake period - poor positioning and steering, minimal speed impact
    if (aiCar.makingMistake > 0) {
        aiCar.makingMistake--;
        laneVariation += (Math.random() - 0.5) * 25; // Bad positioning during mistakes

        // Mess up steering during mistakes
        const mistakeAngle = (Math.random() - 0.5) * 0.15;
        aiCar.angle += mistakeAngle;

        // Very minimal speed reduction during mistakes (keep them competitive)
        aiCar.currentSpeedModifier *= 0.95; // Just slightly slower
    }

    // Target radius for this car's racing line
    const targetRadius = trackRadius + laneVariation + racingLineVariation;

    // Calculate current angle on the circular track
    const currentAngle = Math.atan2(aiCar.y - centerY, aiCar.x - centerX);

    // Look ahead along the track (counter-clockwise) - slight skill variation
    const baseLookAhead = 0.25 + aiCar.aggressiveness * 0.15;
    const skillVariation = (Math.random() - 0.5) * 0.1; // Slight randomness to look-ahead
    const lookAhead = baseLookAhead + skillVariation;
    const targetAngle = currentAngle - lookAhead;

    // Calculate target position on the racing line
    const targetX = centerX + Math.cos(targetAngle) * targetRadius;
    const targetY = centerY + Math.sin(targetAngle) * targetRadius;

    // Check if in stuck recovery mode
    if (aiCar.stuckRecovery > 0) {
        aiCar.stuckRecovery--;
        // Don't change angle during recovery - let wall collision logic handle it
    } else {
        // Normal racing behavior with more imprecise steering
        // Calculate direction to target
        const directionToTarget = Math.atan2(targetY - aiCar.y, targetX - aiCar.x);

        // Smooth steering towards target with more variation
        let angleDiff = directionToTarget - aiCar.angle;

        // Normalize angle difference
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

        // AI steering toward target with slight imprecision
        if (Math.abs(aiCar.speed) > 0.1) {
            const maxTurnRate = 0.06;
            const steeringPrecision = 0.35 + Math.random() * 0.15; // Slight steering precision variation (0.35-0.5)
            aiCar.angle += Math.sign(angleDiff) * Math.min(maxTurnRate, Math.abs(angleDiff) * steeringPrecision);
        }
    }

    // AI acceleration with moderate variation and occasional mistakes
    let targetSpeed = aiCar.maxSpeed * (0.8 + 0.2 * aiCar.aggressiveness); // Moderate base multiplier

    // Apply current speed modifier
    targetSpeed *= aiCar.currentSpeedModifier;

    // Very rare speed mistakes
    if (Math.random() < aiCar.stupidity * 0.3) {
        targetSpeed *= 0.85 + Math.random() * 0.1; // Slight slowdown (0.85-0.95x speed)
    }

    // Very rarely AI gets overconfident and goes too fast (leading to crashes)
    if (Math.random() < 0.02 && aiCar.maxSpeed > 1.7) { // Only very fast cars occasionally get overconfident
        targetSpeed *= 1.1; // 10% speed boost that sometimes leads to crashes
    }

    if (aiCar.speed < targetSpeed) {
        aiCar.speed = Math.min(aiCar.speed + aiCar.acceleration, targetSpeed);
    } else {
        aiCar.speed *= 0.99; // Normal deceleration
    }

    // Ensure AI cars maintain reasonable minimum speed
    if (aiCar.speed < 0.4 && !aiCar.makingMistake) {
        aiCar.speed = 0.4; // Higher minimum speed to prevent crawling
    }

    // Apply friction
    aiCar.speed *= (1 - aiCar.friction);

    // Store previous position before moving
    const prevAiX = aiCar.x;
    const prevAiY = aiCar.y;

    // Update position
    aiCar.x += Math.cos(aiCar.angle) * aiCar.speed;
    aiCar.y += Math.sin(aiCar.angle) * aiCar.speed;

    // Track boundary collision for AI cars - circular shape
    const distanceFromCenter = Math.sqrt(Math.pow(aiCar.x - centerX, 2) + Math.pow(aiCar.y - centerY, 2));

    // AI car boundary handling with warning zones
    const outerWarningZone = track.radius - 10;
    const outerHardStop = track.radius + 15;

    if (distanceFromCenter > outerHardStop) {
        // Hard stop - hit the wall
        aiCar.x = prevAiX;
        aiCar.y = prevAiY;
        aiCar.speed = 0.6; // Better speed after wall hit
        aiCar.stuckRecovery = 30; // Faster recovery time
        aiCar.angle = Math.atan2(centerY - aiCar.y, centerX - aiCar.x);
    } else if (distanceFromCenter > outerWarningZone) {
        // Warning zone - slow down slightly and steer toward center
        aiCar.speed *= 0.8; // Less dramatic slowdown
        const turnTowardCenter = Math.atan2(centerY - aiCar.y, centerX - aiCar.x);
        aiCar.angle += (turnTowardCenter - aiCar.angle) * 0.1; // Normal correction
    }

    // Inner boundary handling
    const innerWarningZone = track.radius - track.trackWidth + 10;
    const innerHardStop = track.radius - track.trackWidth - 5;

    if (distanceFromCenter < innerHardStop) {
        // Hard stop - hit the inner wall
        aiCar.x = prevAiX;
        aiCar.y = prevAiY;
        aiCar.speed = 0.6; // Better speed after wall hit
        aiCar.stuckRecovery = 30; // Faster recovery time
        aiCar.angle = Math.atan2(aiCar.y - centerY, aiCar.x - centerX);
    } else if (distanceFromCenter < innerWarningZone) {
        // Warning zone - slow down slightly and steer away from center
        aiCar.speed *= 0.8; // Less dramatic slowdown
        const turnAwayFromCenter = Math.atan2(aiCar.y - centerY, aiCar.x - centerX);
        aiCar.angle += (turnAwayFromCenter - aiCar.angle) * 0.1; // Normal correction
    }

    // Check lap completion for AI cars
    checkLapCompletion(aiCar);
}

// Check car collisions - improved to prevent jittering
function checkCarCollisions() {
    // Get all cars based on game mode
    const allCars = gameSettings.gameMode === 'pvp' ? [car, car2, ...aiCars] : [car, ...aiCars];

    for (let i = 0; i < allCars.length; i++) {
        for (let j = i + 1; j < allCars.length; j++) {
            const car1 = allCars[i];
            const car2 = allCars[j];

            const dx = car2.x - car1.x;
            const dy = car2.y - car1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 15 && distance > 0) { // Cars are too close
                // Gentler separation to prevent jittering
                const angle = Math.atan2(dy, dx);
                const overlap = 15 - distance;
                const separation = overlap * 0.3; // Gentler push

                // Only separate if cars are moving toward each other or very close
                if (overlap > 5) {
                    car1.x -= Math.cos(angle) * separation;
                    car1.y -= Math.sin(angle) * separation;
                    car2.x += Math.cos(angle) * separation;
                    car2.y += Math.sin(angle) * separation;

                    // Slight speed reduction only for major collisions
                    if (overlap > 8) {
                        car1.speed *= 0.95;
                        car2.speed *= 0.95;
                    }
                }
            }
        }
    }
}

// Simplified lap tracking - just detect crossing start line after going around
function checkLapCompletion(carObj = car) {
    const centerX = track.centerX;
    const centerY = track.centerY;

    // Calculate angle from track center
    const currentAngle = Math.atan2(carObj.y - centerY, carObj.x - centerX);

    // Normalize to 0-2π
    let normalizedAngle = currentAngle;
    while (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;
    while (normalizedAngle >= 2 * Math.PI) normalizedAngle -= 2 * Math.PI;

    // Initialize tracking if not set
    if (carObj.lastAngle === undefined) {
        carObj.lastAngle = normalizedAngle;
        carObj.hasLeftStart = false;
        carObj.totalRotation = 0;
        return;
    }

    // Track total rotation to detect full laps
    let angleDelta = normalizedAngle - carObj.lastAngle;

    // Handle wrapping around 0/2π boundary
    if (angleDelta > Math.PI) {
        angleDelta -= 2 * Math.PI;
    } else if (angleDelta < -Math.PI) {
        angleDelta += 2 * Math.PI;
    }

    carObj.totalRotation += angleDelta;

    // Check if car has completed a full counter-clockwise rotation (-2π)
    if (carObj.totalRotation <= -2 * Math.PI) {
        carObj.currentLap++;
        carObj.totalRotation = 0; // Reset for next lap

        if (carObj.isPlayer) {
            gameStartTime = Date.now(); // Reset timer for new lap
        }

        // Check for race completion - finish when completing the target lap count
        if (carObj.currentLap > gameSettings.lapCount && !raceFinished) {
            raceFinished = true;
            winner = carObj.name;

            // Ensure all cars' lap counts don't exceed target + 1
            carObj.currentLap = gameSettings.lapCount + 1;
            car.currentLap = Math.min(car.currentLap, gameSettings.lapCount + 1);
            if (gameSettings.gameMode === 'pvp') {
                car2.currentLap = Math.min(car2.currentLap, gameSettings.lapCount + 1);
            }
            aiCars.forEach(aiCar => {
                aiCar.currentLap = Math.min(aiCar.currentLap, gameSettings.lapCount + 1);
            });
        }
    }

    carObj.lastAngle = normalizedAngle;
}

// Update UI displays
function updateUI() {
    if (gameSettings.gameMode === 'single') {
        // Single player UI updates
        const speedDisplay = document.getElementById('speed');
        const lapDisplay = document.getElementById('lap');
        const timeDisplay = document.getElementById('time');

        speedDisplay.textContent = Math.round(car.speed * 20);

        // Fix lap display to not exceed the target lap count
        const displayLap = Math.min(car.currentLap, gameSettings.lapCount);
        lapDisplay.textContent = `${displayLap}/${gameSettings.lapCount}`;

        // Only update time if race hasn't finished
        if (!raceFinished) {
            timeDisplay.textContent = ((Date.now() - gameStartTime) / 1000).toFixed(1);
        }
    } else {
        // PvP mode UI updates
        const speedDisplay = document.getElementById('speed');
        const lapDisplay = document.getElementById('lap');
        const speed2Display = document.getElementById('speed2');
        const lap2Display = document.getElementById('lap2');
        const timeDisplay = document.getElementById('time');

        speedDisplay.textContent = Math.round(car.speed * 20);
        speed2Display.textContent = Math.round(car2.speed * 20);

        // Fix lap display to not exceed the target lap count
        const displayLap = Math.min(car.currentLap, gameSettings.lapCount);
        const displayLap2 = Math.min(car2.currentLap, gameSettings.lapCount);
        lapDisplay.textContent = `${displayLap}/${gameSettings.lapCount}`;
        lap2Display.textContent = `${displayLap2}/${gameSettings.lapCount}`;

        // Only update time if race hasn't finished
        if (!raceFinished) {
            timeDisplay.textContent = ((Date.now() - gameStartTime) / 1000).toFixed(1);
        }
    }

    // Update live leaderboard (only update every 30 frames for stability)
    if (!raceFinished && raceStarted && gameLoop.frame % 30 === 0) {
        updateStandings();
    }

    // Update standings panel with final results when race finishes
    if (raceFinished) {
        updateStandings(true); // Pass true to indicate final standings

        // Draw race finish overlay on canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ffd700';
        ctx.font = '32px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('RACE FINISHED!', canvas.width / 2, canvas.height / 2 - 120);

        ctx.fillStyle = '#ffffff';
        ctx.font = '24px monospace';
        ctx.fillText(`Winner: ${winner}`, canvas.width / 2, canvas.height / 2 - 80);

        // Show final standings on canvas (simplified version)
        const allCars = gameSettings.gameMode === 'pvp' ? [car, car2, ...aiCars] : [car, ...aiCars];
        const sortedCars = allCars.sort((a, b) => {
            // Primary sort: by lap number (higher is better)
            if (b.currentLap !== a.currentLap) {
                return b.currentLap - a.currentLap;
            }
            // Secondary sort: by progress around current lap
            if (a.totalRotation !== undefined && b.totalRotation !== undefined) {
                return a.totalRotation - b.totalRotation;
            }
            return 0;
        });

        ctx.font = '16px monospace';
        const maxStandingsToShow = 6; // Show top 6 positions
        for (let i = 0; i < Math.min(sortedCars.length, maxStandingsToShow); i++) {
            const position = i + 1;
            const carName = sortedCars[i].name;
            const displayLap = Math.min(sortedCars[i].currentLap, gameSettings.lapCount);

            // Highlight player cars in different colors
            if (sortedCars[i].isPlayer) {
                if (sortedCars[i].playerNumber === 1) {
                    ctx.fillStyle = '#ffd700'; // Gold for Player 1
                } else {
                    ctx.fillStyle = '#00aaff'; // Blue for Player 2
                }
            } else {
                ctx.fillStyle = '#ffffff'; // White for AI cars
            }

            const playerLabel = sortedCars[i].isPlayer ? ` (P${sortedCars[i].playerNumber})` : '';
            ctx.fillText(`${position}. ${carName}${playerLabel} - Lap ${displayLap}`, canvas.width / 2, canvas.height / 2 - 40 + i * 25);
        }

        // Position restart text properly within canvas bounds
        ctx.fillStyle = '#00ff88';
        ctx.font = '14px monospace';
        ctx.fillText('Press F5 to restart', canvas.width / 2, canvas.height - 40);
    }
}

// Extract standings update logic into separate function
function updateStandings(isFinalStandings = false) {
    const standingsDiv = document.getElementById('standings');
    const leaderboardTitle = document.querySelector('.leaderboard h3');

    // Update leaderboard title
    if (isFinalStandings) {
        leaderboardTitle.textContent = 'Final Results';
    } else {
        leaderboardTitle.textContent = 'Race Standings';
    }

    // Get all cars based on game mode
    const allCars = gameSettings.gameMode === 'pvp' ? [car, car2, ...aiCars] : [car, ...aiCars];
    const sortedCars = allCars.sort((a, b) => {
        // Primary sort: by lap number (higher is better)
        if (b.currentLap !== a.currentLap) {
            return b.currentLap - a.currentLap;
        }

        // Secondary sort: by progress around current lap (more negative totalRotation = further ahead)
        if (a.totalRotation !== undefined && b.totalRotation !== undefined) {
            return a.totalRotation - b.totalRotation; // More negative = further ahead
        }

        // Fallback: by angle position on track (for counter-clockwise racing)
        const aAngle = Math.atan2(a.y - track.centerY, a.x - track.centerX);
        const bAngle = Math.atan2(b.y - track.centerY, b.x - track.centerX);

        // Normalize angles to 0-2π
        let aNorm = aAngle;
        let bNorm = bAngle;
        if (aNorm < 0) aNorm += 2 * Math.PI;
        if (bNorm < 0) bNorm += 2 * Math.PI;

        // For counter-clockwise racing, smaller angle = further ahead in current lap
        return aNorm - bNorm;
    });

    standingsDiv.innerHTML = sortedCars.map((carObj, index) => {
        const isPlayer = carObj.isPlayer;
        let style = '';
        let playerLabel = '';

        if (isPlayer) {
            if (carObj.playerNumber === 1) {
                style = 'color: #ffd700; font-weight: bold;'; // Gold for Player 1
                playerLabel = ' (P1)';
            } else {
                style = 'color: #00aaff; font-weight: bold;'; // Blue for Player 2
                playerLabel = ' (P2)';
            }
        }

        // Fix lap display in standings to not exceed target
        const displayLap = Math.min(carObj.currentLap, gameSettings.lapCount);
        const statusText = isFinalStandings ?
            (index === 0 ? 'WINNER' : `Position ${index + 1}`) :
            `Lap ${displayLap}`;
        return `<div style="${style}">${index + 1}. ${carObj.name}${playerLabel} (${statusText})</div>`;
    }).join('');
}

// Main game loop
// Initialize frame counter for stable leaderboard updates
if (!gameLoop.frame) gameLoop.frame = 0;

function gameLoop(currentTime) {
    // Only run game loop if game is initialized
    if (!gameInitialized) {
        requestAnimationFrame(gameLoop);
        return;
    }

    gameLoop.frame++;
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw everything
    drawTrack();

    // Handle countdown
    if (!raceStarted && !raceFinished) {
        countdownTimer += deltaTime;
        if (countdownTimer >= 1000) { // 1 second intervals
            countdown--;
            countdownTimer = 0;
            if (countdown <= 0) {
                raceStarted = true;
                gameStartTime = Date.now();
            }
        }

        // Draw countdown
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ffd700';
        ctx.font = '72px monospace';
        ctx.textAlign = 'center';
        if (countdown > 0) {
            ctx.fillText(countdown.toString(), canvas.width / 2, canvas.height / 2);
        } else {
            ctx.fillStyle = '#00ff88';
            ctx.fillText('GO!', canvas.width / 2, canvas.height / 2);
        }

        // Update camera flashes during countdown
        updateCameraFlashes(deltaTime);

        // Draw cars during countdown but don't update them
        drawCar(car);
        if (gameSettings.gameMode === 'pvp') {
            drawCar(car2);
        }
        aiCars.forEach(aiCar => {
            drawCar(aiCar);
        });

        ctx.fillStyle = '#ffffff';
        ctx.font = '24px monospace';
        ctx.fillText('Get Ready to Race!', canvas.width / 2, canvas.height / 2 + 100);
    } else if (!raceFinished) {
        // Update game state only if race has started
        updateCar(deltaTime);

        // Update car2 in PvP mode
        if (gameSettings.gameMode === 'pvp') {
            updateCar2(deltaTime);
        }

        // Update AI cars
        aiCars.forEach(aiCar => {
            updateAICar(aiCar, deltaTime);
        });

        // Update camera flashes
        updateCameraFlashes(deltaTime);

        // Check collisions between all cars
        checkCarCollisions();

        // Draw all cars
        drawCar(car); // Player 1 car
        if (gameSettings.gameMode === 'pvp') {
            drawCar(car2); // Player 2 car
        }
        aiCars.forEach(aiCar => {
            drawCar(aiCar);
        });
    } else {
        // Race finished - just draw cars
        drawCar(car);
        if (gameSettings.gameMode === 'pvp') {
            drawCar(car2);
        }
        aiCars.forEach(aiCar => {
            drawCar(aiCar);
        });

        // Continue updating camera flashes even when race is finished
        updateCameraFlashes(deltaTime);
    }

    // Update UI (includes race finish screen)
    updateUI();

    // Continue the loop
    requestAnimationFrame(gameLoop);
}

// Initialize the game
function init() {
    console.log('Lightning McQueen Racing game initialized!');

    // Show start screen first
    showStartScreen();

    // Start the game loop (it will wait for game initialization)
    gameLoop.running = true;
    requestAnimationFrame(gameLoop);
}

// Start the game
init();

// Update game UI based on game mode
function updateGameUI() {
    const controlsInfo = document.getElementById('controlsInfo');
    const infoPanel = document.getElementById('infoPanel');

    if (gameSettings.gameMode === 'single') {
        // Single player controls
        controlsInfo.innerHTML = `
            <p>Use ARROW KEYS or WASD to control your racer</p>
            <p>↑/W: Accelerate | ↓/S: Brake | ←→/A/D: Steer | F5: New Race</p>
        `;

        // Single player info panel
        infoPanel.innerHTML = `
            <span>Speed: <span id="speed">0</span> mph</span>
            <span>Lap: <span id="lap">1</span></span>
            <span>Time: <span id="time">0.0</span>s</span>
        `;
    } else {
        // PvP controls
        controlsInfo.innerHTML = `
            <p>Player 1: ARROW KEYS | Player 2: WASD</p>
            <p>↑/W: Accelerate | ↓/S: Brake | ←→/A/D: Steer | F5: New Race</p>
        `;

        // PvP info panel with both players
        infoPanel.innerHTML = `
            <div class="player-info">
                <span class="player-label">Player 1:</span>
                <span>Speed: <span id="speed">0</span> mph</span>
                <span>Lap: <span id="lap">1</span></span>
            </div>
            <div class="player-info">
                <span class="player-label">Player 2:</span>
                <span>Speed: <span id="speed2">0</span> mph</span>
                <span>Lap: <span id="lap2">1</span></span>
            </div>
            <div class="shared-info">
                <span>Time: <span id="time">0.0</span>s</span>
            </div>
        `;
    }
}

// Physics and movement for Player 2 (WASD controls)
function updateCar2(deltaTime) {
    if (!raceStarted || gameSettings.gameMode !== 'pvp') {
        car2.speed = 0;
        return;
    }

    // Handle WASD input for Player 2
    let accelerating = false;
    let turning = 0;

    if (keys['w']) {
        car2.speed = Math.min(car2.speed + car2.acceleration, car2.maxSpeed);
        accelerating = true;
    }
    if (keys['s']) {
        car2.speed = Math.max(car2.speed - car2.acceleration * 1.5, -car2.maxSpeed * 0.5);
    }
    if (keys['a']) {
        turning = -1;
    }
    if (keys['d']) {
        turning = 1;
    }

    // Apply friction when not accelerating
    if (!accelerating) {
        car2.speed *= (1 - car2.friction);
        if (Math.abs(car2.speed) < 0.1) car2.speed = 0;
    }

    // Turn when moving (much more responsive)
    if (Math.abs(car2.speed) > 0.1) {
        // Make turning less dependent on speed for better control
        const speedFactor = Math.min(Math.abs(car2.speed) / car2.maxSpeed, 1);
        const baseTurnRate = 0.01; // Base turning that works even at low speed
        const speedTurnRate = car2.turnSpeed * speedFactor; // Additional turning based on speed
        car2.angle += turning * (baseTurnRate + speedTurnRate);
    }

    // Store previous position before moving
    const prevX = car2.x;
    const prevY = car2.y;

    // Update position
    car2.x += Math.cos(car2.angle) * car2.speed;
    car2.y += Math.sin(car2.angle) * car2.speed;

    // Check track boundaries and collision - circular shape
    const centerX = track.centerX;
    const centerY = track.centerY;
    const distanceFromCenter = Math.sqrt(Math.pow(car2.x - centerX, 2) + Math.pow(car2.y - centerY, 2));

    // Outer boundary with warning zone and hard stop
    const outerWarningZone = track.radius - 10;
    const outerHardStop = track.radius + 15;

    if (distanceFromCenter > outerHardStop) {
        // Hard stop - hit the wall
        car2.x = prevX;
        car2.y = prevY;
        car2.speed = 0;
    } else if (distanceFromCenter > outerWarningZone) {
        // Warning zone - slow down significantly
        car2.speed *= 0.5;
    }

    // Inner boundary with warning zone and hard stop
    const innerWarningZone = track.radius - track.trackWidth + 10;
    const innerHardStop = track.radius - track.trackWidth - 5;

    if (distanceFromCenter < innerHardStop) {
        // Hard stop - hit the inner wall
        car2.x = prevX;
        car2.y = prevY;
        car2.speed = 0;
    } else if (distanceFromCenter < innerWarningZone) {
        // Warning zone - slow down significantly
        car2.speed *= 0.5;
    }

    // Check lap completion
    checkLapCompletion(car2);
}
