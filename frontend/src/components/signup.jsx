import React,{useState,useRef} from 'react'
import { Link } from 'react-router-dom'
import './signup.css'
import Nav from './nav'
import axios from 'axios'
import CloseButton from 'react-bootstrap/CloseButton';

export default function Signup() {
  const dialogRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr]=useState([]);


  const showDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/login', {
        email:email,
        Password:password,
    })
    .then(response => {
      window.location.href = response.data.redirect;
    })
    .catch(errors => {
        const Errors = errors.response.data.errors;
        setErr(Errors )
        console.log(Errors)
    });
  };
  return (
    <div>
        <Nav />
        <div className="con-main">
          <div className="con-left">
            <img src="https://i.postimg.cc/L84K23G6/x.avif" width="80%" height="80%" alt="Logo" />
          </div>
          <div className="con-right">
            <div className="con-signup">
              <h3 >Join today.</h3>
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
              <Link className="but-acc" id="but-acc" to="/creataccount" onClick=''>
                Create account
              </Link>
              <p>By signing up, you agree to the <Link id="link-t" to="#">Terms of Service</Link> and <Link to="" id="link-t">Privacy Policy</Link>, including<Link to="" id="link-t"> Cookie Use.</Link></p>
              <h3>Already have an account?</h3>
              <button className="but-acc" id="but-acc1" onClick={() => showDialog ()}>Sign in</button>
            </div>
          </div>
        <dialog id="dialog-co" ref={dialogRef} >
          <form onSubmit={handleSubmit} >
            <div id="dialog-bor" >
              <div id="dialog-step">
                <div>
                <CloseButton variant="black" onClick={() => {closeDialog()}} />
                </div>
                <div className="dialog-f">
                  <h1> login </h1>
                  <div className="name">
                    <label>email</label>
                    <input type="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value);setErr("")}} required minLength="1" maxLength="50" />
                  </div>
                  <div className="name">
                    <label>password</label>
                    <input type="password" name="email" value={password} onChange={(e) => {setPassword(e.target.value);setErr("")}} required />
                  </div>
                  <div className='but-dialo'>
                  <button className="but-acc" id="but-acc1" type='submit'>Sign in</button>
                  </div>
                  {err && <p>{err}</p>}
                </div>
              </div>
            </div>
          </form> 
        </dialog>
     </div>
  
    </div>
  );
};
