import { songsActions } from "../redux";
import { connect } from "react-redux";
import { currentSongActions } from "../redux";

function LibrarySongs({
  songs,
  changeSongs,
  song,
  audioRef,
  isPlaying,
  changeCurrentSong,
}) {
  const songChanger = async () => {
    await changeCurrentSong(song);
    if (isPlaying) {
      audioRef.current.play();
    }
    //Change active state
    const newSongs = songs.map((songm) => {
      if (songm.id === song.id) {
        return {
          ...songm,
          active: true,
        };
      } else {
        return {
          ...songm,
          active: false,
        };
      }
    });
    changeSongs(newSongs);
  };
  return (
    <div
      onClick={songChanger}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs.songs,
    isPlaying: state.play.isPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSongs: (newData) => dispatch(songsActions(newData)),
    changeCurrentSong: (newSong) => {
      dispatch(currentSongActions(newSong));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LibrarySongs);
