function SignUpForm() {
  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form>
        <label>Display Name</label>
        <input type="text" />

        <label>Email</label>
        <input type="email" required />

        <label>Password</label>
        <input type="password" required />
      </form>
    </div>
  );
}
