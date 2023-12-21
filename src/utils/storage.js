

export const saveLastSong = (currentSong) => {
    localStorage.setItem('currentSong', JSON.stringify(currentSong))
}

export const getLastSong = () => {
    const mySong = JSON.parse(localStorage.getItem('currentSong'));
    return mySong
}