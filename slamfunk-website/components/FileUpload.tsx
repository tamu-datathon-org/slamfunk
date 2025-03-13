import { IoCloudUpload, IoClose, IoDocumentText, IoVideocam } from "react-icons/io5"
import { WriteupType } from "../app/writeup/types";
import { useState } from "react";

interface FileUploadProps {
    submitted: boolean;
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
    type: WriteupType;
}

export default function FileUpload(props: FileUploadProps) {
    const maxFileSize = (props.type === WriteupType.Document) ? "10MB" : "150MB";
    const acceptedFileTypes = (props.type === WriteupType.Document) ? ".pdf .doc .docx .txt .rtf" : ".mp4 .mov .avi .mkv .wmv";
    const descriptorId = (props.type === WriteupType.Document) ? "document" : "video";

    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const err = validateFile(e.dataTransfer.files);
        if (err) {
            setError(err);
        } else {
            const file = e.dataTransfer.files[0];
            setFile(file);
            props.setSubmitted(true);
            uploadFile(file);
        }
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const err = validateFile(e.target.files);
        if (err) {
            setError(err);
        } else {
            const file = e.target.files[0];
            setFile(file);
            props.setSubmitted(true);
            uploadFile(file);
        }
    }

    const uploadFile = async (file: File) => {
        const data = new FormData();
        data.append('file', file);
        data.append('uid', props.userId);
        try {
            const response = await fetch('/api/writeup', {
                method: 'POST',
                body: data
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                console.log('File uploaded successfully');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    const validateFile = (e: FileList) => {
        // ! CHECK THAT FILE EXISTS
        if (e === null || e.length === 0) {
            return "Error: no file uploaded"
        }
        // ! CHECK THERE'S ONLY 1 FILE
        if (e.length > 1) {
            return "Error: please upload only one file"
        }
        // ! CHECK FILE SIZE
        const maxSize = (props.type === WriteupType.Document) ? 10 * 1024 * 1024 : 150 * 1024 * 1024;
        if (e[0].size > maxSize) {
            return "Error: file size too large"
        }
        return null
    }

    const removeFile = () => {
        props.setSubmitted(false);
        setFile(null);
    }

    return (
    <div>
        <div 
            className={`relative bg-gray-100 p-12 border-2 border-black ${file ? "border-solid" : "border-dashed"} rounded-lg flex flex-col items-center gap-y-2`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            {file ? 
                <>
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-x-2 items-center">
                        {props.type === WriteupType.Document ? <IoDocumentText className='text-2xl'/> : <IoVideocam className='text-2xl'/>}
                        <p>{file.name}</p> 
                    </div>
                <button
                    type='button'
                    onClick={removeFile}
                    className='w-full flex justify-end'
                >
                    <IoClose className='text-2xl'/>
                </button>
                </div>
                </>
                :
                <>
                <IoCloudUpload className='text-4xl'/>
                <p>Drag and drop your {descriptorId}s here</p>
                <p>or</p>
                <label htmlFor={descriptorId+"-upload"} className='cursor-pointer bg-black rounded-lg text-white px-4 py-2'>Browse {descriptorId}s</label>
                <input
                    id={descriptorId+"-upload"}
                    type='file'
                    accept={acceptedFileTypes.replace(/ /g, ',')}
                    onChange={handleFileUpload}
                    className='hidden'
                />
                </>
            }
        </div>
        {error ? <p className="mt-4 font-bold text-red-600">{error}</p> : <></>}
        <div className="mt-4 text-sm text-gray-600">
            <p>
                <span className="font-bold">
                    Accepted file types
                </span>
                <br/>
                {acceptedFileTypes}
            </p>
            <p className="mt-2">
                <span className="font-bold">
                    Max file size
                </span>
                <br/>
                {maxFileSize}
            </p>
        </div>
    </div>
    )
}
