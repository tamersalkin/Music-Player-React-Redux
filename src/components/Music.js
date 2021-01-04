import { connect } from "react-redux";

function Music({ currentSong }) {
  return (
    <div className="music-container">
      <img alt={currentSong.name} src={currentSong.cover}></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    currentSong: state.currSong.currentSong,
  };
};

export default connect(mapStateToProps, null)(Music);
