import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function SignInPage() {
  return (
    <div>
      <SignIn afterSignInUrl='/'/>
    </div>
  );
}

export default SignInPage;
