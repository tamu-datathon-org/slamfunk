"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { Bracket } from "app/api/bracket/route"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/Alert"
import { AlertCircle, Trophy, Send, FileText } from "lucide-react"
import { Button } from "../components/ui/Button"
import Link from "next/link"

// Type definitions
type Team = string | null

interface Match {
  team1: Team
  team2: Team
  winner?: Team
}

interface RoundData {
  [matchId: string]: Match
}

interface BracketData {
  id?: string
  user_id?: string
  rounds: {
    round_64: RoundData
    round_32: RoundData
    sweet_16: RoundData
    elite_8: RoundData
    final_4: RoundData
    championship: RoundData
  }
}

interface MarchMadnessBracketProps {
  initialMatches?: { rounds: RoundData }
  onBracketChange?: (bracket: BracketData) => void
  submissionId?: string
  userID?: string
  roundData?: Bracket
}

const SUBMISSION_DEADLINE = new Date("2025-03-21T12:00:00")

const MarchMadnessBracket: React.FC<MarchMadnessBracketProps> = ({
  initialMatches,
  onBracketChange,
  submissionId = "user_bracket",
  userID = crypto.randomUUID(),
  roundData,
}) => {
  const [bracket, setBracket] = useState<BracketData>(
    roundData
      ? {
          id: roundData.id,
          user_id: roundData.user_id,
          rounds: {
            round_64: roundData.rounds.round_64,
            round_32: roundData.rounds.round_32,
            sweet_16: roundData.rounds.sweet_16,
            elite_8: roundData.rounds.elite_8,
            final_4: roundData.rounds.final_4,
            championship: roundData.rounds.championship,
          },
        }
      : {
          id: submissionId,
          user_id: userID,
          rounds: {
            round_64: {},
            round_32: {},
            sweet_16: {},
            elite_8: {},
            final_4: {},
            championship: {},
          },
        },
  )

  const router = useRouter()
  const bracketRef = useRef<HTMLDivElement>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false)

  useEffect(() => {
    const now = new Date()
    setIsDeadlinePassed(now > SUBMISSION_DEADLINE)

    const checkDeadline = () => {
      const currentTime = new Date()
      if (currentTime > SUBMISSION_DEADLINE) {
        setIsDeadlinePassed(true)
      }
    }

    const timer = setInterval(checkDeadline, 60000) 
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (initialMatches && initialMatches.rounds) {
      const round64: RoundData = {}

      Object.entries(initialMatches.rounds).forEach(([matchId, match]) => {
        round64[matchId] = { ...match, winner: null }
      })

      setBracket((prev) => ({
        ...prev,
        rounds: {
          ...prev.rounds,
          round_64: round64,
        },
      }))
    }
  }, [initialMatches])

  useEffect(() => {
    if (onBracketChange) {
      onBracketChange(bracket)
    }
  }, [bracket, onBracketChange])

  const handleWinnerSelection = (round: string, matchId: string, winner: Team) => {
    if (isDeadlinePassed) return

    const updatedBracket = { ...bracket }

    if (updatedBracket.rounds[round as keyof typeof updatedBracket.rounds][matchId]) {
      updatedBracket.rounds[round as keyof typeof updatedBracket.rounds][matchId].winner = winner
    }

    const nextRoundMap: { [key: string]: string } = {
      round_64: "round_32",
      round_32: "sweet_16",
      sweet_16: "elite_8",
      elite_8: "final_4",
      final_4: "championship",
    }

    if (nextRoundMap[round]) {
      const nextRound = nextRoundMap[round]
      const nextMatchId = `match_${Math.ceil(Number.parseInt(matchId.split("_")[1]) / 2)}`
      const isFirstTeam = Number.parseInt(matchId.split("_")[1]) % 2 !== 0

      if (!updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId]) {
        updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId] = {
          team1: null,
          team2: null,
          winner: null,
        }
      }

      if (isFirstTeam) {
        updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].team1 = winner
      } else {
        updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].team2 = winner
      }

      updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].winner = null

      clearSubsequentRounds(updatedBracket, nextRound, nextMatchId)
    }

    setBracket(updatedBracket)
  }

  const clearSubsequentRounds = (updatedBracket: BracketData, round: string, matchId: string) => {
    const nextRoundMap: { [key: string]: string } = {
      round_32: "sweet_16",
      sweet_16: "elite_8",
      elite_8: "final_4",
      final_4: "championship",
    }

    if (nextRoundMap[round]) {
      const nextRound = nextRoundMap[round]
      const nextMatchId = `match_${Math.ceil(Number.parseInt(matchId.split("_")[1]) / 2)}`
      const isFirstTeam = Number.parseInt(matchId.split("_")[1]) % 2 !== 0

      if (!updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId]) {
        updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId] = {
          team1: null,
          team2: null,
          winner: null,
        }
      } else {
        if (isFirstTeam) {
          updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].team1 = null
        } else {
          updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].team2 = null
        }
        updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].winner = null
      }

      clearSubsequentRounds(updatedBracket, nextRound, nextMatchId)
    }
  }

  const exportBracket = async () => {
    if (isDeadlinePassed) return

    setIsSaving(true)
    try {
      const response = await fetch("/api/bracket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bracket),
      })

      if (!response.ok) {
        throw new Error(`Failed to send bracket: ${response.statusText}`)
      }

      const result = await response.json()
      console.log("Bracket successfully sent:", result)
      router.push("/bracket")
    } catch (error) {
      console.error("Error sending bracket:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const renderMatch = (round: string, matchId: string, match: Match) => {
    const { team1, team2, winner } = match

    return (
      <div key={`${round}-${matchId}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 mb-2 text-xs">
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
              winner === team1 ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-gray-100 dark:hover:bg-gray-700"
            } ${isDeadlinePassed ? "opacity-80 cursor-not-allowed" : ""}`}
            onClick={() => team1 && !isDeadlinePassed && handleWinnerSelection(round, matchId, team1)}
          >
            <span className="truncate max-w-[80px] font-medium">{team1 || "—"}</span>
            <input
              type="radio"
              name={`${round}-${matchId}`}
              checked={winner === team1}
              onChange={() => {}} 
              disabled={!team1 || !team2 || isDeadlinePassed}
              className="ml-1"
            />
          </div>
          <div
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors mt-1 ${
              winner === team2 ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-gray-100 dark:hover:bg-gray-700"
            } ${isDeadlinePassed ? "opacity-80 cursor-not-allowed" : ""}`}
            onClick={() => team2 && !isDeadlinePassed && handleWinnerSelection(round, matchId, team2)}
          >
            <span className="truncate max-w-[80px] font-medium">{team2 || "—"}</span>
            <input
              type="radio"
              name={`${round}-${matchId}`}
              checked={winner === team2}
              onChange={() => {}} 
              disabled={!team1 || !team2 || isDeadlinePassed}
              className="ml-1"
            />
          </div>
        </div>
      </div>
    )
  }

  const renderEmptyMatch = (key: string) => (
    <div key={key} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 mb-2 text-xs opacity-50">
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-2 rounded-md">
          <span className="truncate max-w-[80px]">—</span>
          <input type="radio" className="ml-1" disabled />
        </div>
        <div className="flex items-center justify-between p-2 rounded-md mt-1">
          <span className="truncate max-w-[80px]">—</span>
          <input type="radio" className="ml-1" disabled />
        </div>
      </div>
    </div>
  )

  const renderFirstRound = (side: "left" | "right") => {
    const roundData = bracket.rounds.round_64
    const startMatchId = side === "left" ? 1 : 17

    return (
      <div className="flex flex-col justify-around h-full">
        <div className="text-center font-bold mb-2 text-sm">First Round</div>
        <div className="flex flex-col justify-around h-full">
          {Array.from({ length: 16 }).map((_, index) => {
            const matchId = `match_${startMatchId + index}`
            if (roundData[matchId]) {
              return renderMatch("round_64", matchId, roundData[matchId])
            } else {
              return renderEmptyMatch(`empty-round64-${matchId}`)
            }
          })}
        </div>
      </div>
    )
  }

  const renderSecondRound = (side: "left" | "right") => {
    const roundData = bracket.rounds.round_32
    const startMatchId = side === "left" ? 1 : 9

    return (
      <div className="flex flex-col justify-around h-full">
        <div className="text-center font-bold mb-2 text-sm">Second Round</div>
        <div className="flex flex-col justify-around h-full">
          {Array.from({ length: 8 }).map((_, index) => {
            const matchId = `match_${startMatchId + index}`
            if (roundData[matchId]) {
              return renderMatch("round_32", matchId, roundData[matchId])
            } else {
              return renderEmptyMatch(`empty-round32-${matchId}`)
            }
          })}
        </div>
      </div>
    )
  }

  const renderSweet16 = (side: "left" | "right") => {
    const roundData = bracket.rounds.sweet_16
    const startMatchId = side === "left" ? 1 : 5

    return (
      <div className="flex flex-col justify-around h-full space-y-4">
        <div className="text-center font-bold mb-2 text-sm">Sweet 16</div>
        <div className="flex flex-col justify-around h-full">
          {Array.from({ length: 4 }).map((_, index) => {
            const matchId = `match_${startMatchId + index}`
            if (roundData[matchId]) {
              return renderMatch("sweet_16", matchId, roundData[matchId])
            } else {
              return renderEmptyMatch(`empty-sweet16-${matchId}`)
            }
          })}
        </div>
      </div>
    )
  }

  const renderElite8 = (side: "left" | "right") => {
    const roundData = bracket.rounds.elite_8
    const startMatchId = side === "left" ? 1 : 3

    return (
      <div className="flex flex-col justify-around h-full space-y-6">
        <div className="text-center font-bold mb-2 text-sm">Elite 8</div>
        <div className="flex flex-col justify-around h-full">
          {Array.from({ length: 2 }).map((_, index) => {
            const matchId = `match_${startMatchId + index}`
            if (roundData[matchId]) {
              return renderMatch("elite_8", matchId, roundData[matchId])
            } else {
              return renderEmptyMatch(`empty-elite8-${matchId}`)
            }
          })}
        </div>
      </div>
    )
  }

  const renderFinalFour = () => {
    const roundData = bracket.rounds.final_4

    return (
      <div className="flex flex-col justify-around h-full space-y-8">
        <div className="text-center font-bold mb-2 text-sm">Final Four</div>
        <div className="flex flex-col justify-around h-full">
          {Array.from({ length: 2 }).map((_, index) => {
            const matchId = `match_${index + 1}`
            if (roundData[matchId]) {
              return renderMatch("final_4", matchId, roundData[matchId])
            } else {
              return renderEmptyMatch(`empty-final4-${matchId}`)
            }
          })}
        </div>
      </div>
    )
  }

  const renderChampionship = () => {
    const roundData = bracket.rounds.championship

    return (
      <div className="flex flex-col justify-center h-full mb-8">
        <div className="text-center font-bold mb-2 text-sm">Championship</div>
        <div className="flex flex-col justify-center h-full">
          {roundData["match_1"]
            ? renderMatch("championship", "match_1", roundData["match_1"])
            : renderEmptyMatch("empty-championship-1")}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-4 rounded-lg font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {isDeadlinePassed && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Submission Closed</AlertTitle>
          <AlertDescription>
            The deadline for bracket submissions has passed. You can view your bracket but cannot make changes.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
          March Madness 2025
        </h2>

        <div className="flex space-x-2">

          <Button onClick={exportBracket} disabled={isDeadlinePassed || isSaving} className="flex items-center">
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Bracket
              </>
            )}
          </Button>
        </div>
      </div>

      <div
        className="bracket-container overflow-x-auto"
        ref={bracketRef}
        style={{
          overflowY: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(155, 155, 155, 0.5) transparent",
        }}
      >
        <div className="flex justify-center min-w-max">
          <div className="flex">
            <div className="w-[140px] mx-1">{renderFirstRound("left")}</div>

            <div className="w-[140px] mx-1">{renderSecondRound("left")}</div>

            <div className="w-[140px] mx-1">{renderSweet16("left")}</div>

            <div className="w-[140px] mx-1">{renderElite8("left")}</div>
          </div>

          <div className="flex flex-col items-center mx-4">
            <div className="flex flex-col justify-center h-full">
              <div className="w-[140px]">{renderChampionship()}</div>

              <div className="w-[140px]">{renderFinalFour()}</div>
            </div>
          </div>

          <div className="flex">
            <div className="w-[140px] mx-1">{renderElite8("right")}</div>

            <div className="w-[140px] mx-1">{renderSweet16("right")}</div>

            <div className="w-[140px] mx-1">{renderSecondRound("right")}</div>

            <div className="w-[140px] mx-1">{renderFirstRound("right")}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarchMadnessBracket

