const { Match, Scoreboard } = require("../index");

describe('Match', () => {
    test("should create a new match", () => {
        const match = new Match("Porto", "Benfica");
        expect(match.homeTeam).toBe("Porto");
        expect(match.awayTeam).toBe("Benfica");
        expect(match.homeScore).toBe(0);
        expect(match.awayScore).toBe(0);
        expect(match.startTime).toBeInstanceOf(Date);
    });

    test("should update match score", () => {
        const match = new Match("Porto", "Benfica");
        match.updateScore(2, 1);
        expect(match.homeScore).toBe(2);
        expect(match.awayScore).toBe(1);
    })

    test("should calculate the total score", () => {
        const match = new Match("Porto", "Benfica");
        match.updateScore(5, 0);
        expect(match.getTotalScore()).toBe(5);
    })
});

describe('Scoreboard', () => {

})