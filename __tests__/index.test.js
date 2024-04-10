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

    test("should throw if invalid input when creating match", () => {
        expect(() => new Match()).toThrow(
            "Both home team and away team must be provided"
        );
        expect(() => new Match("Porto")).toThrow(
            "Both home team and away team must be provided"
        );

        expect(() => new Match(null, "Benfica")).toThrow(
            "Both home team and away team must be provided"
        );
    });
});

describe('Scoreboard', () => {
    let scoreboard;

    beforeEach(() => {
        scoreboard = new Scoreboard();
    });

    test("should start a match", () => {
        scoreboard.startMatch("Home Team", "Away Team");
        expect(scoreboard.matches.length).toBe(1);
    });

    test("should finish match", () => {
        scoreboard.startMatch("Home Team", "Away Team");
        scoreboard.finishMatch(0);
        expect(scoreboard.matches.length).toBe(0);
    });

    test("should get summary of matches", () => {
        scoreboard.startMatch("Mexico", "Canada");
        scoreboard.updateMatchScore(0, 0, 5);

        // Adding a delay of 1 millisecond between starting matches
        setTimeout(() => {
            scoreboard.startMatch("Spain", "Brazil");
            scoreboard.updateMatchScore(1, 10, 2);
        }, 1);

        setTimeout(() => {
            scoreboard.startMatch("Germany", "France");
            scoreboard.updateMatchScore(2, 2, 2);
        }, 2);

        setTimeout(() => {
            scoreboard.startMatch("Uruguay", "Italy");
            scoreboard.updateMatchScore(3, 6, 6);
        }, 3);

        setTimeout(() => {
            scoreboard.startMatch("Argentina", "Australia");
            scoreboard.updateMatchScore(4, 3, 1);

            const summary = scoreboard.getSummary();
            expect(summary).toEqual([
                "1. Uruguay 6 - Italy 6",
                "2. Spain 10 - Brazil 2",
                "3. Mexico 0 - Canada 5",
                "4. Argentina 3 - Australia 1",
                "5. Germany 2 - France 2",
            ]);

        }, 4); // Wait until all matches are started and then check the summary
    });

    test("should get summary of matches when matches start concurrently", () => {
        scoreboard.startMatch("Mexico", "Canada");
        scoreboard.updateMatchScore(0, 0, 5);

        scoreboard.startMatch("Spain", "Brazil");
        scoreboard.updateMatchScore(1, 10, 2);

        scoreboard.startMatch("Germany", "France");
        scoreboard.updateMatchScore(2, 2, 2);

        scoreboard.startMatch("Uruguay", "Italy");
        scoreboard.updateMatchScore(3, 6, 6);

        scoreboard.startMatch("Argentina", "Australia");
        scoreboard.updateMatchScore(4, 3, 1);

        const summary = scoreboard.getSummary();
        expect(summary).toEqual([
            "1. Spain 10 - Brazil 2",
            "2. Uruguay 6 - Italy 6",
            "3. Mexico 0 - Canada 5",
            "4. Germany 2 - France 2",
            "5. Argentina 3 - Australia 1",
        ]);
    });

    test("should return an empty summary array if the scoreboard is empty", () => {
        const emptyScoreboard = new Scoreboard();
        expect(emptyScoreboard.getSummary()).toEqual([]);
    });
})