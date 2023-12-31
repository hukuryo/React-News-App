import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_API_URL, SUPABASE_API_KEY } from "../lib/client";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/userSlice";

const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY);

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(logout(false));
    if (isLogin) {
      navigate("/");
    }
    getUsers();
  }, []);

  const getUsers = async () => {
    const { data } = await supabase.from("users").select();
    setUser(data);
  };

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (
      user.some((userData) => userData.name === username) &&
      user.some((userData) => userData.password === password)
    ) {
      dispatch(login(true));
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 space-y-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-semibold text-center">ログイン</h2>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ユーザー名
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="ユーザー名を入力してください"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              パスワード
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="パスワードを入力してください"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <button
              className="w-full mt-4 py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              type="button"
              onClick={handleLogin}
            >
              ログイン
            </button>
          </div>
        </form>
        <div className="mt-5 text-right">
          <Link to="/signup" className="hover:opacity-70 hover:underline">
            未登録の方はこちら
          </Link>
        </div>
      </div>
    </div>
  );
};
