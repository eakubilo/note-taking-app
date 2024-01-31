'use client'

import { Dirent } from "fs";
import { useState } from "react"
type FileType = {
    name: string;
    content: string;
}
type Directory = {
    name: string;
    children: (Directory | FileType)[];
}

export default function Sidebar() {
    let [files, setFiles] = useState<FileType[]>([])
    let [directories, setDirectories] = useState<Directory[]>([
        {name : 'Home',
        children: []}
    ])
    let [currentDirectory, setCurrentDirectory] = useState<Directory>(directories[0])
    let [previousDirectory, setPreviousDirectory] = useState<Array<Directory>>([])
    let [disabled, setDisabled] = useState(true)
    function createFolder() {
        let folderName = prompt("What is the name of the folder?")
        if (folderName == null){
            console.warn("No folder name.")
        }else{
            currentDirectory.children = [...currentDirectory.children, {name: folderName, children: []}]
            setDirectories([...directories, {name: folderName, children: []}])
        }
    }
    function createFile() {
        let fileName = prompt("What is the name of the folder?")
        if (fileName == null){
            console.warn("No folder name.")
        }else{
            currentDirectory.children = [...currentDirectory.children, {name: fileName, content: ""}]
            setFiles([...files, {name: fileName, content: ""}])
        }
    }
    function handleClickedDirectory(directory : Directory) {
        setPreviousDirectory([...previousDirectory, currentDirectory])
        setCurrentDirectory(directory)
        setDisabled(false)
    }
    function handleBackButton() {
        const previous = previousDirectory[previousDirectory.length - 1]
        const newDirs = previousDirectory.slice(0, -1);
        setPreviousDirectory(newDirs)
        setCurrentDirectory(previous)
        if (newDirs.length == 0){
            setDisabled(true)
        }
    }
    function returnDivs(children : (Directory | FileType)[]) {
        const directories = children.filter((item): item is Directory => 'children' in item);
        const files = children.filter((item): item is FileType => 'content' in item);
    
        const renderedDirectories= directories.map((item : Directory) =>  <dd className='folder' onClick = {() => handleClickedDirectory(item)}>{item.name}</dd>)
        const renderedFiles = files.map((item : FileType) => <dd className='file'>{item.name}</dd>)
    
        return [...renderedDirectories , ...renderedFiles]
    }
    return (<div>
        <div>
        <button onClick = {handleBackButton} disabled={disabled}>
            Back
        </button>
        <button onClick={createFolder}>
        📁
        </button>
        <button onClick={createFile}>
        📄
        </button>

        {currentDirectory.name}

        </div>
        {returnDivs(currentDirectory.children)}
    </div>
    )

}
