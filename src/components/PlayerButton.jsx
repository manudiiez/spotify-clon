import { Pause, Play } from "@/icons/Controls"

const PlayerButton = ({ isPlaying, handleClick }) => {

    return (
        <button className="group" onClick={handleClick}>
            {isPlaying ? <Pause className="text-white group-hover:text-green-500 w-4 h-4" /> : <Play className="text-white group-hover:text-green-500 w-4 h-4" />}
        </button>
    )
}

export default PlayerButton 