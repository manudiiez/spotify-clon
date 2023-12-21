import { usePlayerStore } from "@/store/playerStore"


const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)

export const handleClickSong = (id, albumId) => {
    const isPlayingSong = isPlaying && currentMusic?.song?.id === id && currentMusic?.song?.albumId === albumId

    if (isPlayingSong) {
        setIsPlaying(false)
        return
    }
    fetch(`/api/get-info-song.json?id=${id}&album=${albumId}`)
        .then(res => res.json())
        .then(data => {
            const { songs, playlist, song } = data
            setIsPlaying(true)
            setCurrentMusic({ songs, playlist, song: song })
            // removeLastSong()
            // saveLastSong(currentMusic)
        })
    setCurrentMusic({
        playlist: {
            albumId
        }
    })
    setIsPlaying(!isPlaying)
}