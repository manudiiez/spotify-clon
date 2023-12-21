
const CurrentSong = ({ image, title, artists, id }) => {
    return (
        <div className="flex items-center gap-5 relative overflow-hidden">
            <picture className="w-11 h-11 bg-zinc-800 rounded-md overflow-hidden sm:w-14 sm:h-14 md:w-16 md:h-16"
                transition:name={`song ${id} image`}
            >
                <img src={image} alt={title} />
            </picture>
            <div className="flex flex-col">
                <h3 className="font-semibold text-sm block">
                    {title}
                </h3>
                <span className="text-xs opacity-80">
                    {artists?.join(', ')}
                </span>
            </div>
        </div>
    )
}

export default CurrentSong