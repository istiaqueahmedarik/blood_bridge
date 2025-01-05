export const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

export const slideIn = (direction: 'left' | 'right', delay: number = 0) => ({
    initial: { opacity: 0, x: direction === 'left' ? -50 : 50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay }
});