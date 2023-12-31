import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBookmark,
  faHeart,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const navigation = useNavigate();

  const logout = () => {
    const userConfirmed = window.confirm("ログアウト");
    if (userConfirmed) {
      navigation("login");
    }
  };

  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="px-8 mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold hover:opacity-70">
          <Link to={`/`}>News</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li className="hover:opacity-70 font-bold">
              <Link to={`/`}>
                <FontAwesomeIcon icon={faHome} className="pr-1" />
                ホーム
              </Link>
            </li>
            <li className="hover:opacity-70 font-bold">
              <Link to="/Stock">
                <FontAwesomeIcon icon={faBookmark} className="pr-1" />
                ストック記事
              </Link>
            </li>
            <li className="hover:opacity-70 font-bold">
              <Link to="/Favorite">
                <FontAwesomeIcon icon={faHeart} className="pr-1" />
                お気に入り記事
              </Link>
            </li>
            <li className="hover:opacity-70 font-bold">
              <Link to="/login" onClick={logout}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="pr-1"
                />
                ログアウト
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
