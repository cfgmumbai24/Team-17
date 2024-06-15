import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function SignInPage() {
  return (
    <div>
      <SignIn afterSignInUrl='/protected'/>
    </div>
  );
}

export default SignInPage;
