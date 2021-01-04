import LibrarySongs from "./LibrarySongs";
import { connect } from "react-redux";

function Library({ songs, audioRef, libraryStatus }) {
  return (
    <div className={`library ${libraryStatus ? "library-active" : ""}`}>
      <h2>Library</h2>
      <div>
        {songs.map((song) => (
          <LibrarySongs song={song} key={song.id} audioRef={audioRef} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    libraryStatus: state.libStatus.libraryStatus,
    songs: state.songs.songs,
  };
};

export default connect(mapStateToProps, null)(Library);
