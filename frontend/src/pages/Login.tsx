import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin.tsx";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    login(inputs.username, inputs.password);
  };

  return (
    <main className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-transparent bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-semi-bold text-center text-gray-300">
          Login <span className="text-blue-500">Messaging App</span>
        </h1>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              className="w-full input input-bordered h-10"
            ></input>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              className="w-full input input-bordered h-10"
            ></input>
          </div>
          <Link
            to="/signup"
            className="py-2 text-sm hover:text-blue-600 ml-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button disabled={loading} className="btn btn-block btn-md my-1">
              {loading ? "Loading..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default Login;
