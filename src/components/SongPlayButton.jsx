import { Pause, Play } from '@/icons/Controls'
import { usePlayerStore } from '@/store/playerStore'

const SongPlayButton = ({ id, albumId, className }) => {
    const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)
    const isPlayingSong = isPlaying && currentMusic?.song?.id === id && currentMusic?.song?.albumId === albumId


    return (
        <button className={className}>
            {
                isPlayingSong ? <Pause className="w-3 h-3" />
                    : <Play className="w-3 h-3" />
            }
        </button>
    )
}

export default SongPlayButton