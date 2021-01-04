import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { libraryStatusActions } from "../redux";

const Nav = ({ libraryStatusActions }) => {
  return (
    <nav className="nav">
      <h1>Musicante</h1>
      <button
        onClick={() => {
          libraryStatusActions();
        }}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    libraryStatusActions: () => dispatch(libraryStatusActions()),
  };
};

export default connect(null, mapDispatchToProps)(Nav);
