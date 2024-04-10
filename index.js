class Match {
    constructor(homeTeam, awayTeam) {
        if (!homeTeam || !awayTeam) {
            throw new Error("Both home team and away team must be provided");
        }

        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeScore = 0;
        this.awayScore = 0;
        this.startTime = new Date();
    }

    updateScore(homeScore, awayScore) {
        if (typeof homeScore !== "number" || typeof awayScore !== "number") {
            throw new Error("Both home score and away score must be numbers");
        }

        this.homeScore = homeScore;
        this.awayScore = awayScore;
    }

    getTotalScore() {
        return this.homeScore + this.awayScore;
    }
}
class Scoreboard {
    constructor() {
        this.matches = [];
    }

    startMatch(homeTeam, awayTeam) {
        const doesMatchAlreadyExist = this.matches.some(
            (match) =>
                match.homeTeam === homeTeam && match.awayTeam === awayTeam
        );

        if (doesMatchAlreadyExist) {
            throw new Error("Match already exists");
        }

        const match = new Match(homeTeam, awayTeam);
        this.matches.push(match);
    }

    updateMatchScore(index, homeScore, awayScore) {
        const match = this.matches[index];

        if (!match) {
            throw new Error("Match not found");
        }

        match.updateScore(homeScore, awayScore);
    }

    finishMatch(index) {
        if (!this.matches[index]) {
            throw new Error("Match not found");
        }

        this.matches.splice(index, 1);
    }

    getSummary() {
        if (this.matches.length === 0) {
            return [];
        }
        return this.matches
            .sort(
                (a, b) =>
                    b.getTotalScore() - a.getTotalScore() ||
                    b.startTime - a.startTime
            )
            .map(
                (match, index) =>
                    `${index + 1}. ${match.homeTeam} ${match.homeScore} - ${
                        match.awayTeam
                    } ${match.awayScore}`
            );
    }
}

module.exports = { Match, Scoreboard };
