import { allPlaylists, songs as allSongs } from "../../lib/data";

export async function GET({ params, request }) {
    const { url } = request
    const urlObj = new URL(url)
    const id = urlObj.searchParams.get('id')
    const album = urlObj.searchParams.get('album')
    const song = allSongs.find((song) => song.id === parseInt(id) && song.albumId == parseInt(album))
    const playlist = allPlaylists.find((playlist) => parseInt(playlist.id) === song.albumId)
    const songs = allSongs.filter((item) => item.albumId === playlist?.albumId)
    return new Response(JSON.stringify({ playlist, songs, song }), {
        headers: { "content-type": "application/json" }
    })
}