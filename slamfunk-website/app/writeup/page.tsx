"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Header from "components/Header"
import FileUpload from "components/FileUpload"
import { type Writeup, WriteupType } from "./types"
import { getSession, useSession } from "next-auth/react"
import { redirect, useParams } from "next/navigation"
import { PiLinkBold } from "react-icons/pi"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/Alert"
import { Button } from "../../components/ui/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { Input } from "../../components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/Card"
import { CheckCircle, AlertCircle, HelpCircle, Trash2 } from "lucide-react"

export default function WriteupPage() {
  // variables and states
  const { data: session, status } = useSession()
  const { bid } = useParams()
  const [writeupData, setWriteupData] = useState<Writeup | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [bracketId, setBracketId] = useState<string | null>(null)

  // check that the user is logged in
  // fetch writeup data if it exists for the user
  useEffect(() => {
    const fetchWriteupData = async () => {
      const session = await getSession()
      const userId = session?.user?.id
      if (!userId) {
        return
      }

      // Set the bracket ID from the URL parameter
      if (bid && typeof bid === "string") {
        setBracketId(bid)
      }

      const res = await fetch(`/api/writeup/${userId}`)
      const data = await res.json()
      if (res.ok) {
        setWriteupData(data)
        setSubmitted(true)
      }
      setLoading(false)
    }

    fetchWriteupData()
  }, [submitted, bid])

  if (status === "loading") {
    return <></>
  }
  if (status === "unauthenticated") {
    return redirect("/login")
  }
  if (!session?.user?.id) {
    return redirect("/login")
  }
  if (loading) {
    return <></>
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {writeupData && submitted ? (
          <SubmissionComplete
            userId={session.user.id}
            setSubmitted={setSubmitted}
            bracketSubmitted={true}
            submissionType={writeupData.type}
            fileName={writeupData.filename}
            bracketId={bracketId}
          />
        ) : new Date() < new Date(2025, 3, 4) ? (
          <SubmissionUi
            userId={session.user.id}
            submitted={submitted}
            setSubmitted={setSubmitted}
            bracketId={bracketId}
          />
        ) : (
          <SubmissionClosed />
        )}
      </div>
    </div>
  )
}

const TabContent = ({ submitted, setSubmitted, activeTab, userId, bracketId }) => {
  switch (activeTab) {
    case WriteupType.Document:
      return (
        <FileUpload
          submitted={submitted}
          setSubmitted={setSubmitted}
          userId={userId}
          type={WriteupType.Document}
        />
      )
    case WriteupType.Video:
      return (
        <FileUpload
          submitted={submitted}
          setSubmitted={setSubmitted}
          userId={userId}
          type={WriteupType.Video}
        />
      )
    case WriteupType.YouTube:
      return <YouTubeLink setSubmitted={setSubmitted} userId={userId} bracketId={bracketId} />
  }
}

interface YouTubeLinkProps {
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  userId: string
  bracketId?: string | null
}

const YouTubeLink = (props: YouTubeLinkProps) => {
  const [link, setLink] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

  const handleSubmission = async () => {
    if (link === "") {
      setError("Error: Empty YouTube link")
      return
    } else if (!youtubeRegex.test(link)) {
      setError(
        "Error: Invalid YouTube link. Ensure that it follows the format: https://www.youtube.com/watch?v=XXXXXXXXXXX",
      )
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("id", crypto.randomUUID().toString())
      formData.append("uid", props.userId)
      formData.append("type", WriteupType.YouTube)
      formData.append("link", link)

      if (props.bracketId) {
        formData.append("bracketId", props.bracketId)
      }

      const res = await fetch("/api/writeup", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        setError(null)
        props.setSubmitted(true)
      } else {
        setError(`Error: ${data.error}`)
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Paste in your YouTube link</h2>
        <p className="text-muted-foreground">Share your bracket analysis through a YouTube video</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 border rounded-md px-3 py-2 pl-5 focus-within:ring-2 focus-within:ring-primary">
          <PiLinkBold className="text-muted-foreground text-xl flex-shrink-0" />
          <Input
            type="text"
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            placeholder="Insert your YouTube link here"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <Button onClick={handleSubmission} disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Submitting..." : "Submit YouTube Link"}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

interface SubmissionUiProps {
  userId: string
  submitted: boolean
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  bracketId?: string | null
}

const SubmissionUi = ({ userId, submitted, setSubmitted, bracketId }: SubmissionUiProps) => {
  const [activeTab, setActiveTab] = useState(WriteupType.Document)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold sm:text-4xl">Writeup Submission</h1>
        <p className="text-muted-foreground text-lg">
          You can submit either a document, video, or YouTube link to explain your bracket picks
        </p>
      </div>

      <Tabs
        defaultValue={WriteupType.Document}
        onValueChange={(value) => setActiveTab(value as WriteupType)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
          <TabsTrigger value={WriteupType.Document} disabled={submitted}>
            Document Upload
          </TabsTrigger>
          <TabsTrigger value={WriteupType.Video} disabled={submitted}>
            Video Upload
          </TabsTrigger>
          <TabsTrigger value={WriteupType.YouTube} disabled={submitted}>
            YouTube Link
          </TabsTrigger>
        </TabsList>

        <TabsContent value={WriteupType.Document}>
          <TabContent
            submitted={submitted}
            setSubmitted={setSubmitted}
            userId={userId}
            activeTab={WriteupType.Document}
            bracketId={bracketId}
          />
        </TabsContent>

        <TabsContent value={WriteupType.Video}>
          <TabContent
            submitted={submitted}
            setSubmitted={setSubmitted}
            userId={userId}
            activeTab={WriteupType.Video}
            bracketId={bracketId}
          />
        </TabsContent>

        <TabsContent value={WriteupType.YouTube}>
          <TabContent
            submitted={submitted}
            setSubmitted={setSubmitted}
            userId={userId}
            activeTab={WriteupType.YouTube}
            bracketId={bracketId}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface SubmissionCompleteProps {
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  bracketSubmitted: boolean
  submissionType: string
  fileName: string
  userId: string
  bracketId?: string | null
}

const SubmissionComplete = (props: SubmissionCompleteProps) => {
  const [error, setError] = useState<string | null>(null)
  const [bracketSubmitted, setBracketSubmitted] = useState<boolean>(props.bracketSubmitted)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  useEffect(() => {
    const checkBracketSubmission = async () => {
      const res = await fetch(`/api/bracket/${props.userId}`)
      setBracketSubmitted(res.ok)
    }

    checkBracketSubmission()
  }, [props.userId])

  const handleDeleteSubmission = async () => {
    setIsDeleting(true)

    try {
      const res = await fetch(`/api/writeup/${props.userId}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (res.ok) {
        props.setSubmitted(false)
      } else {
        setError(`Error: ${data.error}`)
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold sm:text-4xl">Writeup Submission</h1>
      </div>

      <div className="space-y-4">
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-400">Submission Received</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300">
            Your submission has been received. You can view your submission details below.
          </AlertDescription>
        </Alert>

        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-400">Resubmission Information</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            To resubmit your writeup, delete your current submission and create a new writeup (only 1 submission
            allowed)
          </AlertDescription>
        </Alert>

        {!bracketSubmitted && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Bracket Required</AlertTitle>
            <AlertDescription>
              You haven't submitted a bracket. For your writeup to be judged, you need to fill out at least 1 bracket.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Submission Details</CardTitle>
          <Button variant="destructive" size="sm" onClick={handleDeleteSubmission} disabled={isDeleting}>
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          <div>
            <p className="font-semibold text-sm text-muted-foreground">Submission Type</p>
            <p className="text-lg">{props.submissionType}</p>
          </div>

          <div>
            <p className="font-semibold text-sm text-muted-foreground">File Name</p>
            <p className="text-lg break-all">{props.fileName}</p>
          </div>

          {props.bracketId && (
            <div>
              <p className="font-semibold text-sm text-muted-foreground">Bracket ID</p>
              <p className="text-lg">{props.bracketId}</p>
            </div>
          )}
        </CardContent>

        {error && (
          <CardFooter>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

const SubmissionClosed = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold sm:text-4xl">Writeup Submission</h1>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Submissions Closed</AlertTitle>
        <AlertDescription>
          The deadline for writeup submissions has passed. You can no longer submit or modify your writeup.
        </AlertDescription>
      </Alert>
    </div>
  )
}

