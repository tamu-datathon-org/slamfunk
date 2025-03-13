"use client"

import { useState } from 'react';
import { IoCloudUpload } from "react-icons/io5";
import Header from 'components/Header';
import FileUpload from 'components/FileUpload';
import { WriteupType } from './types';

export default function WriteupPage() {
    const [activeTab, setActiveTab] = useState(WriteupType.Document);
    const tabs = [
        {
            type: WriteupType.Document,
            label: 'Document Upload'
        },
        {
            type: WriteupType.Video,
            label: 'Video Upload'
        },
        {
            type: WriteupType.YouTube,
            label: 'YouTube Link'
        }
    ]

    // TODO
    // - check that user is logged in
    // - check that user hasn't already submitted a writeup
    // - check that the writeup deadline hasn't passed
    // - check that the file and/or link is valid
    // - send email confirmation of writeup submission
    // - set max file size limit
    // - some sort of file validation
    // - check that the user also has a bracket submitted

    return (
        <div className='flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900'>
            <Header />
            <div className='w-full p-4 md:p-6 lg:p-8'>
                <h1 className='mt-8 text-4xl font-bold'>Writeup Submission</h1>
                <h4 className='text-gray-600 text-lg'>You can submit either a document or a video</h4>
                <div className='mt-6 w-fit grid grid-cols-3 overflow-hidden border-2 border-black rounded-lg'>
                    {tabs.map((tab, index) => (<button
                        key={tab.type}
                        className={`font-medium text-sm px-6 py-3 ${index === tabs.length-1 ? '' : 'border-r-2 border-black'} ${activeTab === tab.type ? 'bg-black text-white' : 'text-black bg-white'}`}
                        onClick={() => setActiveTab(tab.type)}
                    >
                        {tab.label}
                    </button>
                    ))}
                </div>
                <div className='mt-4'>
                    <TabContent activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}

const TabContent = ({ activeTab }) => {
    switch (activeTab) {
        case WriteupType.Document:
            return (
                <FileUpload
                    type={WriteupType.Document}
                />
            )
        case WriteupType.Video:
            return (
                <FileUpload
                    type={WriteupType.Video}
                />
            )
        case WriteupType.YouTube:
            return <YouTubeLink />
    }
}

const DocumentUpload = () => {
    const handleFileUpload = (type: WriteupType, e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        // ! CHECK FILE SIZE
        const maxSize = (type === WriteupType.Document) ? 10 * 1024 * 1024 : 150 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size too large');
            return;
        }
    }
    const handleDrop = (type: WriteupType, e: any) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        console.log(file);
        if (!file) return;
        // ! CHECK FILE SIZE
        const maxSize = (type === WriteupType.Document) ? 10 * 1024 * 1024 : 150 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size too large');
            return;
        }
    };
    return (
        <>
        <div 
            className='bg-gray-100 p-12 border-2 border-black border-dashed rounded-lg flex flex-col items-center gap-y-2'
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(WriteupType.Document, e)}
        >
            <IoCloudUpload className='text-4xl'/>
            <p>Drag and drop your documents here</p>
            <p>or</p>
            <label htmlFor='document-upload' className='cursor-pointer bg-black rounded-lg text-white px-4 py-2'>Browse documents</label>
            <input
                id='document-upload'
                type='file'
                accept='.pdf,.doc,.docx,.txt,.rtf'
                onChange={(e) => handleFileUpload(WriteupType.Document, e)}
                className='hidden'
            />
        </div>
        <div>
            <p className='mt-2 font-medium'>Supported file types:</p>
            <p className=''>.pdf .doc .docx .txt .rtf</p>
            <p className='text-sm text-gray-600'>Max file size: 10MB</p>
        </div>
        </>
    )
}

const VideoUpload = () => {
    const handleFileUpload = (type: WriteupType, e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        // ! CHECK FILE SIZE
        const maxSize = (type === WriteupType.Document) ? 10 * 1024 * 1024 : 150 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size too large');
            return;
        }
    }
    return (
        <>
        <div className='bg-gray-100 p-12 border-2 border-black border-dashed rounded-lg flex flex-col items-center gap-y-2'>
            <IoCloudUpload className='text-4xl'/>
            <p>Drag and drop your videos here</p>
            <p>or</p>
            <label htmlFor='video-upload' className='cursor-pointer bg-black rounded-lg text-white px-4 py-2'>Browse videos</label>
            <input
                id='video-upload'
                type='file'
                accept='.mp4,.mov,.avi'
                onChange={(e) => handleFileUpload(WriteupType.Video, e)}
                className='hidden'
            />
        </div>
        <div>
            <p className='mt-2 font-medium'>Supported file types:</p>
            <p className=''>.mp4 .mov .avi</p>
            <p className='text-sm text-gray-600'>Max file size: 150MB</p>
        </div>
        </>
    )
}

const YouTubeLink = () => {
    return (
        <div>
            <h2>YouTube Link</h2>
            <input type='text' />
        </div>
    )
}
