import { useAuthUser } from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthUser();
  return (
    <div>
      <button class="btn btn-neutral" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default ChatPage;
