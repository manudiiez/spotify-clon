import { useEffect, useRef, useState } from "react"
import { usePlayerStore } from "../store/playerStore"
import CurrentSong from "./CurrentSong"
import { NextSong, Pause, Play, PrevSong } from "../icons/Controls"
import SongControl from './SongControl'
import VolumeControl from "./VolumeControl"
import { getLastSong, saveLastSong } from "../utils/storage"
import '../styles/styles.css'
import ArrowDown from "../icons/ArrowDown"

const Player = () => {
    const { isPlaying, setIsPlaying, currentMusic, volume, setCurrentMusic } = usePlayerStore(state => state)
    const audioRef = useRef()
    const [showPlayer, setShowPlayer] = useState(false);

    const handleClickShowPlayer = () => {
        setShowPlayer(true)
    }

    const handleClickHidePlayer = () => {
        setShowPlayer(false)
    }

    const handleClick = () => {
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
            audioRef.current.volume = 0.5
        }

        setIsPlaying(!isPlaying)
    }

    const handleClickNext = () => {
        const index = currentMusic.songs.findIndex(music => music.id === currentMusic.song.id)
        if (index + 1 >= currentMusic.songs.length) {
            setCurrentMusic({ ...currentMusic, song: currentMusic.songs[0] });
            saveLastSong({ ...currentMusic, song: currentMusic.songs[0] })

        } else {
            setCurrentMusic({ ...currentMusic, song: currentMusic.songs[index + 1] });
            saveLastSong({ ...currentMusic, song: currentMusic.songs[index + 1] })
        }
        setIsPlaying(true)

    }

    const handleClickPrev = () => {
        const index = currentMusic.songs.findIndex(music => music.id === currentMusic.song.id)
        if (index - 1 >= 0) {
            setCurrentMusic({ ...currentMusic, song: currentMusic.songs[index - 1] });
            saveLastSong({ ...currentMusic, song: currentMusic.songs[index - 1] })
        } else {
            setCurrentMusic({ ...currentMusic, song: currentMusic.songs[currentMusic.songs.length - 1] });
            saveLastSong({ ...currentMusic, song: currentMusic.songs[currentMusic.songs.length - 1] })
        }
        setIsPlaying(true)
    }

    useEffect(() => {
        isPlaying
            ? audioRef.current.play()
            : audioRef.current.pause()
    }, [isPlaying])

    useEffect(() => {
        audioRef.current.volume = volume
    }, [volume])

    useEffect(() => {
        const { song, playlist, songs } = currentMusic
        if (song) {
            const src = `/music/${playlist?.id}/0${song.id}.mp3`
            audioRef.current.src = src
            audioRef.current.volume = volume
            if (isPlaying) {
                audioRef.current.play()
            }
        }
    }, [currentMusic])

    useEffect(() => {
        const mySong = getLastSong()
        if (mySong === null) {
            fetch(`/api/get-info-playlist.json?id=1`)
                .then(res => res.json())
                .then(data => {
                    const { songs, playlist } = data
                    setCurrentMusic({ songs, playlist, song: songs[0] })
                    saveLastSong({ songs, playlist, song: songs[0] })
                })

        } else {
            setCurrentMusic(mySong)
        }
    }, [])

    return (
        <div className={`absolute inset-x-2 bottom-[4.5rem] md:bottom-0 md:inset-x-0 md:relative z-50 h-[72px] md:h-[80px] bg-[${currentMusic?.playlist?.color?.dark}]  ${showPlayer && 'player--active'}`}
        >
            <div className={`playerContainer grid grid-cols-2 md:grid-cols-3 items-center px-2 py-2 md:py-0 md:px-1 overflow-hidden md:overflow-visible rounded-xl relative  h-[72px] ${showPlayer && 'player--active'}`}>
                <div className='absolute md:hidden w-full h-full top-0 left-0 z-10 opacity-75' style={{ background: currentMusic?.playlist?.color?.dark }} onClick={handleClickShowPlayer}></div>
                <div className="w-[150px] md:w-[200px] self-center md:self-star relative z-20" onClick={handleClickShowPlayer}>
                    <CurrentSong {...currentMusic.song} />
                </div>
                <div className="grid place-content-center gap-4 flex-1 justify-self-end md:justify-self-center z-20">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex justify-center gap-6">
                            <button className="hidden md:block opacity-60 hover:opacity-100 transition-opacity" onClick={handleClickPrev}>
                                <PrevSong className="text-white" />
                            </button>
                            <button className="md:bg-white rounded-full p-2 hover:scale-105 transition-transform" onClick={handleClick}>
                                {isPlaying ? <Pause className="text-white md:text-black" /> : <Play className="text-white md:text-black" />}
                            </button>
                            <button className="hidden md:block opacity-60 hover:opacity-100 transition-opacity" onClick={handleClickNext}>
                                <NextSong className="text-white" />
                            </button>
                        </div>
                        <div className="hidden md:block">
                            <SongControl audio={audioRef} />
                        </div>
                    </div>
                </div>
                <div className="hidden md:grid items-center justify-end">
                    <VolumeControl />
                </div>
            </div>
            <div className={`playerContainer2 h-screen ${showPlayer && 'player--active'}`}
                style={{ background: currentMusic?.playlist?.color?.dark }}
            >
                <div className="flex flex-col gap-16 bg-gradient-to-t h-screen from-zinc-900 via-zinc-900/90">
                    <button className="grid grid-cols-3 px-2 py-6 items-center bg-gradient-to-b from-zinc-900 via-zinc-900/90" onClick={handleClickHidePlayer}>
                        <ArrowDown className="text-white w-6 h-6" />
                        <p className="text-sm">{currentMusic?.song?.title}</p>
                    </button>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <picture className="w-72 h-72 sm:w-96 sm:h-96 shaodw-lg bg-zinc-800 rounded-md overflow-hidden"
                            transition:name={`song ${currentMusic?.song?.id} image`}
                        >
                            <img src={currentMusic?.song?.image} alt={currentMusic?.song?.title} />
                        </picture>
                        <div className="w-72 sm:w-96  flex flex-col">
                            <h3 className="font-semibold text-sm block">
                                {currentMusic?.song?.title}
                            </h3>
                            <span className="text-xs opacity-80">
                                {currentMusic?.song?.artists?.join(', ')}
                            </span>
                        </div>
                        <div className="w-72 sm:w-96">
                            <SongControl audio={audioRef} />
                        </div>
                        <div className="flex justify-center gap-6">
                            <button className="opacity-60 hover:opacity-100 transition-opacity" onClick={handleClickPrev}>
                                <PrevSong className="text-white" />
                            </button>
                            <button className="bg-white rounded-full p-2 hover:scale-105 transition-transform" onClick={handleClick}>
                                {isPlaying ? <Pause className=" text-black " /> : <Play className=" text-black" />}
                            </button>
                            <button className="opacity-60 hover:opacity-100 transition-opacity" onClick={handleClickNext}>
                                <NextSong className="text-white" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <audio ref={audioRef} />
        </div>

    )
}

export default Player

