import { useRef } from "react"
import { usePlayerStore } from "@/store/playerStore"
import { Slider } from "./Slider"
import { Volume, VolumeSilence } from "@/icons/Controls"

const VolumeControl = () => {

    const { volume, setVolume } = usePlayerStore(state => state)
    const previusVolumeRef = useRef(volume)

    const isVolumeSilenced = volume < 0.1

    const handleClickVolumen = () => {
        if (isVolumeSilenced) {
            setVolume(previusVolumeRef.current)
        } else {
            previusVolumeRef.current = volume
            setVolume(0)
        }
    }

    return (
        <div className="flex justify-center gap-x-2 text-white">
            <button className="opacity-70 hover:opacity-100 transition" onClick={handleClickVolumen}>
                {isVolumeSilenced ? <VolumeSilence /> : <Volume />}
            </button>
            <Slider
                defaultValue={[100]}
                max={100}
                min={0}
                className="w-[95px]"
                value={[volume * 100]}
                onValueChange={(value) => {
                    const [newVolume] = value
                    const volumeValue = newVolume / 100
                    setVolume(volumeValue)
                }}
            />
        </div>
    )
}

export default VolumeControl