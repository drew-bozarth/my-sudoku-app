import React, { Component } from "react";

export default class Result extends Component {
    render() {
        const { sudoku } = this.props;
        const elapsed = Math.floor(
            (sudoku.solvedTime.getTime() - sudoku.startTime.getTime()) / 1000
        );
        const opponent = sudoku.challengerSolvedTime
            ? Math.floor(
                (sudoku.challengerSolvedTime - 
                    sudoku.challengerStartTime) / 
                    1000
            )
        : null;

        
        return (
            <div>
                <h2>You solved the sudoku in {elapsed} seconds!</h2>
                {opponent && <h3> Your opponent solved it in {opponent} seconds</h3>}
                <p>
                    Challenge a friend:{" "}
                    <a href={sudoku.shareUrl} target="_blank">Share Link</a>{" "}
                </p>
            </div>
        );
    }
}