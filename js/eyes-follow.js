window.initEyeFollow = () => {
    const leftPupil = document.getElementById("pupil-left");
    const rightPupil = document.getElementById("pupil-right");

    if (!leftPupil || !rightPupil) {
        console.warn("Pupils not found.");
        return;
    }

    const maxOffset = 10;

    const movePupil = (pupil, event) => {
        const rect = pupil.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let offsetX = (event.clientX - centerX) / 20;
        let offsetY = (event.clientY - centerY) / 20;

        offsetX = Math.max(-maxOffset, Math.min(maxOffset, offsetX));
        offsetY = Math.max(-maxOffset, Math.min(maxOffset, offsetY));

        pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    document.addEventListener("mousemove", (event) => {
        movePupil(leftPupil, event);
        movePupil(rightPupil, event);
    });
};

// Laser firing from both pupils
function fireLaserFromPupil(pupilElement, event) {
    const pupilRect = pupilElement.getBoundingClientRect();
    const centerX = pupilRect.left + pupilRect.width / 2;
    const centerY = pupilRect.top + pupilRect.height / 2;

    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const distance = Math.hypot(dx, dy);

    const laser = document.createElement("div");
    laser.classList.add("laser");
    laser.style.left = `${centerX}px`;
    laser.style.top = `${centerY}px`;
    laser.style.width = `${distance}px`;
    laser.style.transform = `rotate(${angle}deg)`;

    document.body.appendChild(laser);

    setTimeout(() => laser.style.opacity = "0", 100);
    setTimeout(() => laser.remove(), 300);
}


document.addEventListener("click", (event) => {
    const leftPupil = document.getElementById("pupil-left");
    const rightPupil = document.getElementById("pupil-right");

    if (!leftPupil || !rightPupil) return;

    fireLaserFromPupil(leftPupil, event);
    fireLaserFromPupil(rightPupil, event);
});
let bugInterval = null;
let bugs = [];

function initBugSpawning() {
    // Clear any existing interval if already running
    if (bugInterval) {
        clearInterval(bugInterval);
        bugInterval = null;
    }

    const spawnBug = () => {
        const bug = document.createElement("div");
        bug.className = "bug";
        // Set initial position at random y along left edge
        bug.style.top = (Math.random() * (window.innerHeight - 50)) + "px";
        bug.style.left = "-50px"; // start just off-screen left
        document.body.appendChild(bug);
        bugs.push(bug);

        // Animate bug moving to the right
        bug.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(${window.innerWidth}px)` }
        ], {
            duration: 7000,
            easing: 'linear',
            fill: 'forwards'
        }).onfinish = () => {
            bug.remove();
            bugs = bugs.filter(b => b !== bug);
        };
    };

    // Spawn a bug based on an interval
    bugInterval = setInterval(spawnBug, 1500);
}

function destroyBugSpawning() {
    if (bugInterval) {
        clearInterval(bugInterval);
        bugInterval = null;
    }
    // Remove all bugs from DOM
    bugs.forEach(bug => bug.remove());
    bugs = [];
}

function splatBug(bug) {

    const rect = bug.getBoundingClientRect();

    // Create splat element
    const splat = document.createElement('img');
    splat.src = 'images/bugsplat.png';
    splat.style.position = 'fixed';
    splat.style.left = `${rect.left}px`;
    splat.style.top = `${rect.top}px`;
    splat.style.width = `${rect.width}px`;
    splat.style.height = `${rect.height}px`;
    splat.style.pointerEvents = 'none'; // so it doesn't block clicks
    splat.style.zIndex = 1000;
    splat.classList.add('splat-fade');
    document.body.appendChild(splat);

    bug.remove();
    bugs = bugs.filter(b => b !== bug);

    splat.addEventListener('animationend', () => {
        splat.remove();
    })
}


/**
 * ? * Handles laser shooting from both pupils and checks for bug collisions.
 * @param {any} event
 * @returns
 */
function onLaserShoot(event) {
    const leftPupil = document.getElementById("pupil-left");
    const rightPupil = document.getElementById("pupil-right");

    if (!leftPupil || !rightPupil) return;

    // Laser start positions (center of pupils)
    const leftRect = leftPupil.getBoundingClientRect();
    const rightRect = rightPupil.getBoundingClientRect();

    const leftStart = {
        x: leftRect.left + leftRect.width / 2,
        y: leftRect.top + leftRect.height / 2
    };
    const rightStart = {
        x: rightRect.left + rightRect.width / 2,
        y: rightRect.top + rightRect.height / 2
    };

    // Laser end position (mouse click)
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Checks collision with bugs
    bugs.forEach(bug => {
        const bugRect = bug.getBoundingClientRect();

        // Check if bug is close enough to laser line
        if (isPointNearLine({ x: bugRect.left + bugRect.width / 2, y: bugRect.top + bugRect.height / 2 }, leftStart, { x: mouseX, y: mouseY }, 30) ||
            isPointNearLine({ x: bugRect.left + bugRect.width / 2, y: bugRect.top + bugRect.height / 2 }, rightStart, { x: mouseX, y: mouseY }, 30)) {

            // Destroy bug!
            splatBug(bug);
            bug.remove();
            bugs = bugs.filter(b => b !== bug);
        }
    });
}

// Helper function to check if point is within threshold distance from a line segment
function isPointNearLine(point, lineStart, lineEnd, threshold) {
    // Calculate distance from point to line segment

    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq !== 0)
        param = dot / len_sq;

    let xx, yy;

    if (param < 0) {
        xx = lineStart.x;
        yy = lineStart.y;
    }
    else if (param > 1) {
        xx = lineEnd.x;
        yy = lineEnd.y;
    }
    else {
        xx = lineStart.x + param * C;
        yy = lineStart.y + param * D;
    }

    const dx = point.x - xx;
    const dy = point.y - yy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    return dist <= threshold;
}

document.addEventListener("click", onLaserShoot);

