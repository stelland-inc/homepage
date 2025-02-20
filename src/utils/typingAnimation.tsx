const letters = "1234567890";

export function applyTypingAnimation(element: HTMLElement, speed: number = 30) {
    let interval: NodeJS.Timeout | null = null;
    const originalText = element.dataset.value || element.innerText;

    let iteration = 0;
        
    if (interval) clearInterval(interval);
        
    interval = setInterval(() => {
        element.innerText = originalText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        
        if (iteration >= originalText.length) {
            clearInterval(interval!);
        }
        
        iteration += 1 / 3;
    }, speed);
}