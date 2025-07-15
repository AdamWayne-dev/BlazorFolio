window.initEyeFollow = () => {
    const leftPupil = document.getElementById("pupil-left");
    const rightPupil = document.getElementById("pupil-right");

    if (!leftPupil || !rightPupil) {
        console.warn("Pupils not found.");
        return;
    }

    const maxOffset = 10; // Maximum movement in pixels

    const movePupil = (pupil, event) => {
        const rect = pupil.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let offsetX = (event.clientX - centerX) / 20;
        let offsetY = (event.clientY - centerY) / 20;

        // Clamp the offset
        offsetX = Math.max(-maxOffset, Math.min(maxOffset, offsetX));
        offsetY = Math.max(-maxOffset, Math.min(maxOffset, offsetY));

        pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    document.addEventListener("mousemove", (event) => {
        movePupil(leftPupil, event);
        movePupil(rightPupil, event);
    });
};
