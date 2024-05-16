import { SignIn } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignIn
        // appearance={{
        //   baseTheme: dark,
        // }}
      />
    </div>
  );
}
