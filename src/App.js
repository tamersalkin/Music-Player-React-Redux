import React, { useRef } from "react";
import { connect } from "react-redux";
import "./styles/app.scss";
import Library from "./components/Library.js";
import Music from "./components/Music.js";
import Controls from "./components/Controls.js";
import Nav from "./components/Nav.js";
import { currentSongActions } from "./redux";
import { songInfoActions } from "./redux";

function App({
  isPlaying,
  libraryStatus,
  songs,
  currentSong,
  changeCurrentSong,
  songInfo,
  changeSongInfo,
}) {
  // State
  // Ref
  const audioRef = useRef(null);
  //Event Handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Calculate percentage
    const animationPercentage = Math.round((current / duration) * 100);
    changeSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animationPercentage,
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await changeCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  return (
    <div className={`App ${libraryStatus ? "library-app-active" : ""}`}>
      <Nav />
      <Library audioRef={audioRef} />
      <Music />
      <Controls audioRef={audioRef} />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isPlaying: state.play.isPlaying,
    libraryStatus: state.libStatus.libraryStatus,
    songs: state.songs.songs,
    currentSong: state.currSong.currentSong,
    songInfo: state.songInf.songInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentSong: (newSong) => {
      dispatch(currentSongActions(newSong));
    },
    changeSongInfo: (newData) => {
      dispatch(songInfoActions(newData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
