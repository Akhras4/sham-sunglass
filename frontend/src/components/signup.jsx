import React from 'react'
import { Link } from 'react-router-dom'
import './signup.css'
import Nav from './nav'

export default function Signup() {
  return (
    <div>
        <Nav />
          <form>
        <div className="con-main">
          <div className="con-left">
            <img src="https://i.postimg.cc/L84K23G6/x.avif" width="80%" height="80%" alt="Logo" />
          </div>
          <div className="con-right">
            <div className="con-signup">
              <h3>Join today.</h3>
              <Link className="but-acc" to="#">
                <img src="https://i.postimg.cc/YCXc9mwN/2993685-brand-brands-google-logo-logos-icon.png" width="30px" height="30px"  alt="Google Logo" />
                Sign up with Google
              </Link>
              <Link className="but-acc" to="#">
                <img src="https://i.postimg.cc/Zq0GyKTG/104490-apple-icon.png" width="30px" height="30px"  alt="Apple Logo" />
                Sign up with Apple
              </Link>
              <div className="line">
                <div className="line-bo"></div>
                <p className="ps">or</p>
                <div className="line-bo"></div>
              </div>
              <Link className="but-acc" id="but-acc" to="#" onClick=''>
                Create account
              </Link>
              <p>By signing up, you agree to the <Link id="link-t" to="#">Terms of Service</Link> and <Link to="" id="link-t">Privacy Policy</Link>, including<Link to="" id="link-t"> Cookie Use.</Link></p>
              <h3>Already have an account?</h3>
              <Link className="but-acc" id="but-acc1" to="#">Sign in</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
