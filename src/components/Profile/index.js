import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { ThemeContext } from "../../utils/ThemeContext";
import { toggleShowName } from "../../store/profile/actions";
import "./style.css";

export const Profile = () => {
  const theme = useContext(ThemeContext);
  const showName = useSelector((state) => state.showName);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleShowName);
  };
  return (
    <div className="profile">
      <button onClick={theme.changeTheme}>Toggle theme</button>
      <Checkbox
        onChange={handleClick}
        inputProps={{ "aria-label": "primary checkbox" }}
      />

      {showName && <div>Show name is true</div>}
      <h3 style={{ color: theme.theme === "light" ? "red" : "black" }}>
        This is profile page
      </h3>
      <img src="../images/profile.png" alt="logo"></img>
    </div>
  );
};

const withContext = (Component) => {
  return (props) => {
    const theme = useContext(ThemeContext);

    return <Component {...props} theme={theme} />;
  };
};

export const ThemedProfile = withContext(Profile);
