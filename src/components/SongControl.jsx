import { useState, useEffect } from 'react'
import { Slider } from "./Slider"

const SongControl = ({ audio }) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        audio.current.addEventListener('timeupdate', handleTimeUpdate)
        return () => {
            audio.current.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    const handleTimeUpdate = () => {
        setCurrentTime(audio.current.currentTime)
    }

    const formatTime = time => {
        if (time == null) return `0:00`
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`

    }
    const duration = audio?.current?.duration ?? 0

    return (
        <div className="flex flex-col md:flex-row gap-x-3 text-xs pt-2">
            <span className="opacity-50 w-12 text-right hidden md:block">{formatTime(currentTime)}</span>
            <Slider
                defaultValue={[0]}
                max={audio?.current?.duration ?? 0}
                min={0}
                className="w-72 sm:w-96 md:w-[400px]"
                value={[currentTime]}
                onValueChange={(value) => {
                    audio.current.currentTime = value
                }}
            />
            <div className='md:hidden flex w-full justify-between'>
                <span className="opacity-50 w-12 text-start block ">{formatTime(currentTime)}</span>
                <span className="opacity-50 w-12 block text-right">
                    {duration ? formatTime(duration) : '0:00'}
                </span>
            </div>
            <span className="opacity-50 w-12 hidden md:block">
                {duration ? formatTime(duration) : '0:00'}
            </span>
        </div>
    )
}

export default SongControl