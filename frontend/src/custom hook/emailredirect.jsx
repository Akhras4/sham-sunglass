import React, { useEffect } from 'react';

export default function EmailRedirect({ email, onEmailProviderURL }) {
  useEffect(() => {
    const getEmailProviderURL = (emailDomain) => {
      switch (emailDomain) {
        case 'gmail.com':
          return 'https://mail.google.com/';
        case 'yahoo.com':
          return 'https://mail.yahoo.com/';
        case 'outlook.com':
        case 'hotmail.com':
          return 'https://outlook.live.com/';
        case 'icloud.com':
        case 'me.com':
        case 'mac.com':
          return 'https://www.icloud.com/mail';
        default:
          return null;
      }
    };

    if (email) {
      const emailDomain = email.split('@')[1];
      const emailProviderURL = getEmailProviderURL(emailDomain);
      if (emailProviderURL) {
        onEmailProviderURL(emailProviderURL);
      }
    }
  }, [email, onEmailProviderURL]);

  return null;
}


