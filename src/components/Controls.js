import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { isPlayingActions } from "../redux";
import { songsActions } from "../redux";
import { currentSongActions } from "../redux";
import { songInfoActions } from "../redux";
import { connect } from "react-redux";

function Controls({
  songInfo,
  changeSongInfo,
  audioRef,
  songs,
  changeSongs,
  currentSong,
  changeCurrentSong,
  isPlaying,
  changeIsPlaying,
}) {
  // Event Handlers
  const playMusicHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      changeIsPlaying();
    } else {
      audioRef.current.play();
      changeIsPlaying();
    }
  };
  const activeLibraryHandler = (songActive) => {
    const newSongs = songs.map((songm) => {
      if (songm.id === songActive.id) {
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

  const skipHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "back") {
      await changeCurrentSong(
        songs[(songs.length + currentIndex - 1) % songs.length]
      );
      activeLibraryHandler(
        songs[(songs.length + currentIndex - 1) % songs.length]
      );
    } else if (direction === "forward") {
      await changeCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  const getTime = (t) => {
    return Math.floor(t / 60) + ":" + ("0" + Math.floor(t % 60)).slice(-2);
  };
  const inputHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    changeSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  //Input animation inline styling
  const inputAnimationStyle = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  const trackBackground = {
    background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track" style={trackBackground}>
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={inputHandler}
          />
          <div className="animate-track" style={inputAnimationStyle}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            skipHandler("back");
          }}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          className="play"
          onClick={playMusicHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => {
            skipHandler("forward");
          }}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isPlaying: state.play.isPlaying,
    songs: state.songs.songs,
    currentSong: state.currSong.currentSong,
    songInfo: state.songInf.songInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeIsPlaying: () => dispatch(isPlayingActions()),
    changeSongs: (newData) => dispatch(songsActions(newData)),
    changeCurrentSong: (newSong) => {
      dispatch(currentSongActions(newSong));
    },
    changeSongInfo: (newData) => {
      dispatch(songInfoActions(newData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
