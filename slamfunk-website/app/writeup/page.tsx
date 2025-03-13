"use client"

import { useEffect, useState } from 'react';
import Header from 'components/Header';
import FileUpload from 'components/FileUpload';
import { Writeup, WriteupType } from './types';
import { getSession, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { PiLinkBold } from "react-icons/pi";
import { BsCheckCircleFill, BsExclamationCircleFill, BsFillQuestionCircleFill } from "react-icons/bs";
import { FaTrashAlt } from 'react-icons/fa';

export default function WriteupPage() {
    // variables and states
    const { data:session, status } = useSession();
    const [writeupData, setWriteupData] = useState<Writeup|null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // check that the user is logged in
    // fetch writeup data if it exists for the user
    useEffect(() => {

        const fetchWriteupData = async () => {
            const session = await getSession();
            const userId = session?.user?.id;
            if (!userId) { return }
            const res = await fetch(`/api/writeup/${userId}`);
            const data = await res.json();
            if (res.ok) {
                setWriteupData(data);
                setSubmitted(true);
            }
            setLoading(false)
        }

        fetchWriteupData();

    }, [submitted])
    if (status === 'loading') {return <></>};
    if (status === 'unauthenticated') { return redirect('/login');}
    if (!session?.user?.id) { return redirect('/login'); }
    if (loading) { return <></> }

    return (
        <div className='flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900'>
            <Header />
            <div className='w-full p-4 md:p-6 lg:p-8'>
                {(writeupData && submitted) ?
                <SubmissionComplete
                    userId={session.user.id}
                    setSubmitted={setSubmitted}
                    bracketSubmitted={false}
                    submissionType={writeupData.type}
                    fileName={writeupData.filename}
                />
                : (new Date() < new Date(2025, 3, 4)) ?
                <SubmissionUi
                    userId={session.user.id}
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                />
                :
                <SubmissionClosed />
                }
            </div>
        </div>
    );
}

const TabContent = ({ submitted, setSubmitted, activeTab, userId }) => {
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
            return (
            <YouTubeLink
                setSubmitted={setSubmitted}
                userId={userId}
            />
            )
    }
}

interface YouTubeLinkProps {
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
}

const YouTubeLink = (props: YouTubeLinkProps) => {
    const [link, setLink] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const handleSubmission = async () => {
        if (link === '') {
            setError('Error: Empty YouTube link');
            return;
        } else if (!youtubeRegex.test(link)) {
            setError('Error: Invalid YouTube link. Ensure that it follows the format: https://www.youtube.com/watch?v=XXXXXXXXXXX');
            return;
        }
        const formData = new FormData();
        formData.append('id', crypto.randomUUID().toString());
        formData.append('uid', props.userId);
        formData.append('type', WriteupType.YouTube);
        formData.append('link', link);
        const res = await fetch('/api/writeup', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (res.ok) {
            setError(null);
            props.setSubmitted(true);
        } else {
            setError(`Error: ${data.error}`);
        }
    }

    return (
        <div className='mt-4 flex flex-col gap-y-2'>
            <h2 className='font-bold'>Paste in your YouTube link</h2>
            <div className='p-2 flex items-center gap-x-2 border-2 border-black rounded-lg'>
                <PiLinkBold className='text-gray-400 text-xl'/>
                <input 
                    type='text' 
                    className='w-full placeholder:text-gray-400 outline-none'
                    placeholder='Insert your YouTube link here'
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
            </div>
            <button
                onClick={handleSubmission}
                type='button'
                className='w-fit px-4 py-2 rounded-lg bg-black text-white'
            >
                Save
            </button>
            {error ? <p className='font-medium text-red-600'>{error}</p> : <></>}
        </div>
    )
}

interface SubmissionUiProps {
    userId: string;
    submitted: boolean;
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmissionUi = ({ userId, submitted, setSubmitted }: SubmissionUiProps ) => {
    const [activeTab, setActiveTab] = useState(WriteupType.Document);
    const tabs = [
        { type: WriteupType.Document, label: 'Document Upload' },
        { type: WriteupType.Video, label: 'Video Upload' },
        { type: WriteupType.YouTube, label: 'YouTube Link' }
    ]

    return (
    <>
        <h1 className='mt-8 text-4xl font-bold'>Writeup Submission</h1>
        <h4 className='text-gray-600 text-lg'>You can submit either a document or a video</h4>
        <div className='mt-6 w-fit grid grid-cols-3 overflow-hidden border-2 border-black rounded-lg'>
            {tabs.map((tab, index) => (<button
                key={tab.type}
                className={`font-medium text-sm px-6 py-3 ${index === tabs.length-1 ? '' : 'border-r-2 border-black'} ${activeTab === tab.type ? 'bg-black text-white' : 'text-black bg-white'} ${submitted ? "opacity-60" : "opacity-100"}`}
                onClick={() => {if (!submitted) { setActiveTab(tab.type) }}}
            >
                {tab.label}
            </button>
            ))}
        </div>
        <div className='mt-4'>
            <TabContent 
                submitted={submitted} 
                setSubmitted={setSubmitted}
                userId={userId}
                activeTab={activeTab}
            />
        </div>
    </>
    )
}

interface SubmissionCompleteProps {
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    bracketSubmitted: boolean;
    submissionType: string;
    fileName: string;
    userId: string;
}

const SubmissionComplete = (props: SubmissionCompleteProps) => {
    const [error, setError] = useState<string | null>(null);

    const handleDeleteSubmission = async () => {
        const res = await fetch(`/api/writeup/${props.userId}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        if (res.ok) {
            props.setSubmitted(false);
        } else {
            setError(`Error: ${data.error}`);
        }
    }

    return (
    <div>
        <h1 className='mt-8 text-4xl font-bold'>Writeup Submission</h1>
        <div className='mt-4 w-full px-4 py-2 rounded-lg bg-green-200 flex items-center gap-x-2 text-green-900'>
            <BsCheckCircleFill />
            <p className=''>
                Your submission has been received. You can view your submission details below.
            </p>
        </div>
        <div className='mt-1 w-full px-4 py-2 rounded-lg bg-blue-200 flex items-center gap-x-2 text-blue-900'>
            <BsFillQuestionCircleFill />
            <p>
                To resubmit your writeup, delete your current submission and create a new writeup (only 1 submission allowed)
            </p>
        </div>
        {props.bracketSubmitted ? 
        <></>
        :
        <div className='mt-1 w-full px-4 py-2 rounded-lg bg-red-200 flex items-center gap-x-2 text-red-900'>
            <BsExclamationCircleFill />
            <p>
                You haven't submitted a bracket. For your writeup to be judged, you need to fill out at least 1 bracket.
            </p>
        </div>
        }
        <div className='mt-4 w-fit p-4 rounded-lg border-2 border-black flex flex-col gap-y-2'>
            <div className='w-full flex items-center justify-between gap-x-8'>
                <h2 className='font-bold text-2xl'>Submission Details</h2>
                <button
                    type='button'
                    onClick={handleDeleteSubmission}
                    className='flex items-center gap-x-2 bg-red-200 rounded-lg text-red-900 font-medium px-4 py-2'
                >
                    <FaTrashAlt className='text-sm'/>
                    Delete
                </button>
            </div>
            <p>
                <span className='font-bold'>Submission Type</span>
                <br/>
                {props.submissionType}
            </p>
            <p>
                <span className='font-bold'>File Name</span>
                <br/>
                {props.fileName}
            </p>
        </div>
        {error ? <p className='mt-4 font-medium text-red-600'>{error}</p> : <></>}
    </div>
    )
}

const SubmissionClosed = () => {
    return (
    <>
        <h1 className='mt-8 text-4xl font-bold'>Writeup Submission</h1>
        <p className='mt-4'>Submissions are closed.</p>
    </>
    )
}
