import React, { useState, useEffect } from "react";
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Radio, RadioGroup, FormControlLabel, Typography, Container } from "@mui/material";

const QuizComponent = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);

    const [numQuestions, setNumQuestions] = useState(10);
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    const shuffleAnswers = (currentQuestion) => {
        if (!currentQuestion) return [];
        const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    };

    useEffect(() => {
        if (quizStarted) {
            setLoading(true);
            fetch(
                `http://localhost:8080/api/quiz/questions?amount=${numQuestions}&category=${category}&difficulty=${difficulty}`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.results && data.results.length > 0) {
                        setQuestions(data.results);
                        setShuffledAnswers(shuffleAnswers(data.results[0]));
                    } else {
                        console.log("No quiz data available.");
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.log("Error fetching quiz data:", error);
                    setLoading(false);
                });
        }
    }, [quizStarted, numQuestions, category, difficulty]);

    useEffect(() => {
        if (questions[currentQuestionIndex]) {
            setShuffledAnswers(shuffleAnswers(questions[currentQuestionIndex]));
        }
    }, [questions, currentQuestionIndex]);

    const startQuiz = () => {
        setQuizStarted(true);
        setScore(0);
        setCurrentQuestionIndex(0);
        setQuizFinished(false);
    };

    const exitQuiz = () => {
        setQuizStarted(false);
        setQuizFinished(false);
        setScore(0);
        setCurrentQuestionIndex(0);
    };

    const handleAnswerSelect = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const nextQuestion = () => {
        if (selectedAnswer === questions[currentQuestionIndex]?.correct_answer) {
            setScore(score + 1);
        }
        setSelectedAnswer("");
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const previousQuestion = () => {
        setSelectedAnswer("");
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const finishQuiz = () => {
        if (selectedAnswer === questions[currentQuestionIndex]?.correct_answer) {
            setScore(score + 1);
        }
        setQuizFinished(true);
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center" }}>
                <CircularProgress />
                <Typography>Loading...</Typography>
            </div>
        );
    }

    if (!quizStarted) {
        return (
            <Container>
                <Typography variant="h4">Welcome to the Quiz!</Typography>
                <div className="settings">
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Number of Questions</InputLabel>
                        <Select
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(e.target.value)}
                            label="Number of Questions"
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Select Category</InputLabel>
                        <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Select Category">
                            <MenuItem value="">Any Category</MenuItem>
                            <MenuItem value="10">Entertainment: Books</MenuItem>
                            <MenuItem value="11">Entertainment: Film</MenuItem>
                            <MenuItem value="12">Entertainment: Music</MenuItem>
                            <MenuItem value="13">Entertainment: Musicals &amp; Theatres</MenuItem>
                            <MenuItem value="14">Entertainment: Television</MenuItem>
                            <MenuItem value="15">Entertainment: Video Games</MenuItem>
                            <MenuItem value="16">Entertainment: Board Games</MenuItem>
                            <MenuItem value="17">Science &amp; Nature</MenuItem>
                            <MenuItem value="18">Science: Computers</MenuItem>
                            <MenuItem value="19">Science: Mathematics</MenuItem>
                            <MenuItem value="20">Mythology</MenuItem>
                            <MenuItem value="21">Sports</MenuItem>
                            <MenuItem value="22">Geography</MenuItem>
                            <MenuItem value="23">History</MenuItem>
                            <MenuItem value="24">Politics</MenuItem>
                            <MenuItem value="25">Art</MenuItem>
                            <MenuItem value="26">Celebrities</MenuItem>
                            <MenuItem value="27">Animals</MenuItem>
                            <MenuItem value="28">Vehicles</MenuItem>
                            <MenuItem value="29">Entertainment: Comics</MenuItem>
                            <MenuItem value="30">Science: Gadgets</MenuItem>
                            <MenuItem value="31">Entertainment: Japanese Anime &amp; Manga</MenuItem>
                            <MenuItem value="32">Entertainment: Cartoon &amp; Animations</MenuItem>
                            {/* Add more categories */}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Select Difficulty</InputLabel>
                        <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} label="Select Difficulty">
                            <MenuItem value="">Any Difficulty</MenuItem>
                            <MenuItem value="easy">Easy</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="hard">Hard</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" color="primary" onClick={startQuiz}>
                        Start Quiz
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={exitQuiz}>
                        Exit
                    </Button>
                </div>
            </Container>
        );
    }

    if (quizFinished) {
        return (
            <div style={{ textAlign: "center" }}>
                <Typography variant="h5">Quiz Finished!</Typography>
                <Typography>Your Score: {score} / {questions.length}</Typography>
                <Button variant="contained" color="primary" onClick={exitQuiz}>
                    Exit
                </Button>
            </div>
        );
    }

    if (currentQuestionIndex >= questions.length) {
        return (
            <div style={{ textAlign: "center" }}>
                <Typography variant="h5">Quiz Completed!</Typography>
                <Typography>Your score: {score}</Typography>
                <Button variant="contained" color="primary" onClick={finishQuiz}>
                    Finish Quiz
                </Button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Container>
            <Typography variant="h4">Quiz: {currentQuestion?.category}</Typography>
            <Typography variant="h6">Difficulty: {currentQuestion?.difficulty}</Typography>
            <Typography variant="h6">{currentQuestion?.question}</Typography>
            <RadioGroup
                value={selectedAnswer}
                onChange={handleAnswerSelect}
                name="answers"
                aria-label="answers"
            >
                {shuffledAnswers.map((answer, index) => (
                    <FormControlLabel
                        key={index}
                        value={answer}
                        control={<Radio />}
                        label={answer}
                    />
                ))}
            </RadioGroup>
            <div>
                {currentQuestionIndex > 0 && (
                    <Button variant="outlined" color="secondary" onClick={previousQuestion}>
                        Back
                    </Button>
                )}
                {currentQuestionIndex < questions.length - 1 ? (
                    <Button variant="contained" color="primary" onClick={nextQuestion}>
                        Next
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={finishQuiz}>
                        Finish Quiz
                    </Button>
                )}
            </div>
            <Typography variant="body1">Score: {score}</Typography>
        </Container>
    );
};

export default QuizComponent;
