"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, ChevronLeft, ChevronRight, Flag, RotateCcw, Calculator } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Sample MCQ data - JEE format
const mockTestData = {
  testTitle: "JEE MAINS - Physics Mock Test 1",
  subject: "Physics",
  totalQuestions: 30,
  duration: 90, // minutes
  questions: [
    {
      id: 1,
      type: "single", // single, multiple, numerical
      subject: "Physics",
      topic: "Mechanics",
      question:
        "A particle moves in a straight line with constant acceleration. If it covers 10 m in the first 2 seconds and 20 m in the next 2 seconds, what is its acceleration?",
      options: [
        { id: "A", text: "2.5 m/s²", isCorrect: true },
        { id: "B", text: "5 m/s²", isCorrect: false },
        { id: "C", text: "7.5 m/s²", isCorrect: false },
        { id: "D", text: "10 m/s²", isCorrect: false },
      ],
      explanation:
        "Using kinematic equations: s = ut + (1/2)at². For first 2s: 10 = 2u + 2a. For next 2s: 20 = 2(u+2a) + 2a. Solving: a = 2.5 m/s²",
    },
    {
      id: 2,
      type: "single",
      subject: "Physics",
      topic: "Thermodynamics",
      question: "An ideal gas undergoes an isothermal process. Which of the following remains constant?",
      options: [
        { id: "A", text: "Pressure", isCorrect: false },
        { id: "B", text: "Volume", isCorrect: false },
        { id: "C", text: "Temperature", isCorrect: true },
        { id: "D", text: "Internal Energy", isCorrect: false },
      ],
      explanation: "In an isothermal process, temperature remains constant by definition.",
    },
    {
      id: 3,
      type: "multiple",
      subject: "Physics",
      topic: "Electromagnetism",
      question: "Which of the following are correct about electromagnetic waves? (Multiple correct answers)",
      options: [
        { id: "A", text: "They can travel through vacuum", isCorrect: true },
        { id: "B", text: "They are transverse waves", isCorrect: true },
        { id: "C", text: "They require a medium to propagate", isCorrect: false },
        { id: "D", text: "Speed in vacuum is 3×10⁸ m/s", isCorrect: true },
      ],
      explanation:
        "Electromagnetic waves can travel through vacuum, are transverse in nature, and travel at speed of light in vacuum.",
    },
    {
      id: 4,
      type: "numerical",
      subject: "Physics",
      topic: "Optics",
      question:
        "A convex lens of focal length 20 cm forms an image at a distance of 30 cm from the lens. Find the object distance (in cm).",
      numericalAnswer: 60,
      explanation:
        "Using lens formula: 1/f = 1/v - 1/u. Given f = 20 cm, v = 30 cm. So 1/20 = 1/30 - 1/u. Solving: u = 60 cm",
    },
  ],
}

export default function MCQ() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({}) // questionId: selectedOptions
  const [markedForReview, setMarkedForReview] = useState(new Set())
  const [timeLeft, setTimeLeft] = useState(mockTestData.duration * 60) // in seconds
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [numericalAnswer, setNumericalAnswer] = useState("")

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto submit when time is up
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleOptionSelect = (questionId, optionId, isMultiple = false) => {
    setAnswers((prev) => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || []
        const newAnswers = currentAnswers.includes(optionId)
          ? currentAnswers.filter((id) => id !== optionId)
          : [...currentAnswers, optionId]
        return { ...prev, [questionId]: newAnswers }
      } else {
        return { ...prev, [questionId]: [optionId] }
      }
    })
  }

  const handleNumericalAnswer = (questionId, value) => {
    setNumericalAnswer(value)
    setAnswers((prev) => ({ ...prev, [questionId]: [value] }))
  }

  const handleMarkForReview = (questionId) => {
    setMarkedForReview((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const handleClearResponse = (questionId) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev }
      delete newAnswers[questionId]
      return newAnswers
    })
    if (mockTestData.questions[currentQuestion].type === "numerical") {
      setNumericalAnswer("")
    }
  }

  const handleSubmit = () => {
    // Handle test submission
    setShowSubmitDialog(false)
  }

  const getQuestionStatus = (questionIndex) => {
    const questionId = mockTestData.questions[questionIndex].id
    const isAnswered = answers[questionId] && answers[questionId].length > 0
    const isMarked = markedForReview.has(questionId)

    if (isAnswered && isMarked) return "answered-marked"
    if (isAnswered) return "answered"
    if (isMarked) return "marked"
    return "not-visited"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "answered":
        return "bg-green-500 text-white"
      case "marked":
        return "bg-purple-500 text-white"
      case "answered-marked":
        return "bg-blue-500 text-white"
      case "current":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  const currentQ = mockTestData.questions[currentQuestion]
  const answeredCount = Object.keys(answers).length
  const markedCount = markedForReview.size

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{mockTestData.testTitle}</h1>
            <p className="text-sm text-gray-600">
              {mockTestData.subject} • {mockTestData.totalQuestions} Questions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-red-600" />
              <span className="font-mono text-red-600 font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white">Submit Test</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Submit Test</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>Are you sure you want to submit the test?</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Answered: {answeredCount}</div>
                    <div>Marked for Review: {markedCount}</div>
                    <div>Not Answered: {mockTestData.totalQuestions - answeredCount}</div>
                    <div>Time Left: {formatTime(timeLeft)}</div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                      Submit
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Question Area */}
        <div className="flex-1 p-6">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Question {currentQuestion + 1}</Badge>
                  <Badge
                    className={
                      currentQ.type === "multiple"
                        ? "bg-blue-100 text-blue-800"
                        : currentQ.type === "numerical"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                    }
                  >
                    {currentQ.type === "single"
                      ? "Single Correct"
                      : currentQ.type === "multiple"
                        ? "Multiple Correct"
                        : "Numerical"}
                  </Badge>
                  <Badge variant="secondary">{currentQ.topic}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  {currentQ.type === "multiple" && (
                    <span className="text-xs text-blue-600 font-medium">Select all correct options</span>
                  )}
                  {currentQ.type === "numerical" && <Calculator className="w-4 h-4 text-purple-600" />}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg leading-relaxed">{currentQ.question}</div>

              {/* Options for MCQ */}
              {currentQ.type !== "numerical" && (
                <div className="space-y-3">
                  {currentQ.options.map((option) => {
                    const isSelected = answers[currentQ.id]?.includes(option.id) || false
                    return (
                      <div
                        key={option.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleOptionSelect(currentQ.id, option.id, currentQ.type === "multiple")}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                              isSelected ? "border-blue-500 bg-blue-500 text-white" : "border-gray-400"
                            }`}
                          >
                            {option.id}
                          </div>
                          <span className="text-gray-900">{option.text}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Numerical Input */}
              {currentQ.type === "numerical" && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Enter your numerical answer:</label>
                  <input
                    type="number"
                    value={numericalAnswer}
                    onChange={(e) => handleNumericalAnswer(currentQ.id, e.target.value)}
                    className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter answer"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => handleClearResponse(currentQ.id)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear Response
              </Button>
              <Button
                variant="outline"
                onClick={() => handleMarkForReview(currentQ.id)}
                className={markedForReview.has(currentQ.id) ? "bg-purple-50 text-purple-700 border-purple-200" : ""}
              >
                <Flag className="w-4 h-4 mr-2" />
                {markedForReview.has(currentQ.id) ? "Unmark" : "Mark for Review"}
              </Button>
            </div>

            <Button
              onClick={() => setCurrentQuestion(Math.min(mockTestData.questions.length - 1, currentQuestion + 1))}
              disabled={currentQuestion === mockTestData.questions.length - 1}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Question Palette */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Question Palette</h3>
              <div className="grid grid-cols-5 gap-2">
                {mockTestData.questions.map((_, index) => {
                  const status = index === currentQuestion ? "current" : getQuestionStatus(index)
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${getStatusColor(status)}`}
                    >
                      {index + 1}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Legend</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span>Marked for Review ({markedCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Answered & Marked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>Current Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>Not Visited</span>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed</span>
                  <span>
                    {answeredCount}/{mockTestData.totalQuestions}
                  </span>
                </div>
                <Progress value={(answeredCount / mockTestData.totalQuestions) * 100} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
