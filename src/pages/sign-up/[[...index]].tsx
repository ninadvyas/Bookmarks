import { SignUp } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignUp
        // appearance={{
        //   baseTheme: dark,
        // }}
      />
    </div>
  );
}
