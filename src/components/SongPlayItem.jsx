import { usePlayerStore } from "@/store/playerStore"
import { saveLastSong } from '@/utils/storage'

const SongPlayItem = ({ children, id, albumId }) => {

    const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)
    const isPlayingSong = isPlaying && currentMusic?.song?.id === id && currentMusic?.song?.albumId === albumId

    const handleClick = async () => {
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
                saveLastSong({ songs, playlist, song: song })
            })
        setCurrentMusic({
            playlist: {
                albumId
            }
        })
        setIsPlaying(!isPlaying)
    }

    return (
        <div onClick={handleClick} className="cursor-pointer">
            {children}
        </div>
    )
}

export default SongPlayItem