import { useAuthUser } from "../store/useAuthStore";

function LoginPage() {
  const { isLoading, isLoggedIn, login, authUser } = useAuthUser();
  return (
    <div>
      <p>Is Loading: {isLoading ? authUser.name : authUser.age}</p>
      <p>Is Logged In: {isLoggedIn ? authUser.name : authUser.age}</p>
      <button className="btn btn-primary" onClick={login}>
        Login check
      </button>
    </div>
  );
}

export default LoginPage;
