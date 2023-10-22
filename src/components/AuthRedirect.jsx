export default function AuthRedirect() {
  return (
    <div className="flex flex-col">
      <div>You must be logged in to see this page.</div>
      <div>
        <a href="/auth" className="primary-button flex items-center justify-center">Login</a>
      </div>
    </div>
  );
}
