// test-subs.js
// Simulate a sub goal jump after 5 seconds for testing
setTimeout(() => {
    window.simulateSubs = function(count) {
        if (typeof count !== 'number') return;
        window.currentSubCount = count;
        if (typeof window.renderGoal === 'function') {
            // Find the right goal index
            let idx = 0;
            while (idx < window.subGoals.length && count >= window.subGoals[idx].count) {
                idx++;
            }
            window.currentGoalIndex = idx;
            window.renderGoal();
        }
    };
    // Simulate 105 subs
    window.simulateSubs(105);
}, 5000);
