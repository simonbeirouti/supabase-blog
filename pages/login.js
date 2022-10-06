import supabase from "../utils/supabase";

export default function LoginPage() {
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    await supabase.auth.signIn({ email });
  }
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <button type="submit" onSubmit={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}
