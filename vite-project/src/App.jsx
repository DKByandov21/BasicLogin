import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [username, setUsername] = useState('');
  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [isSignUpActive, setSignUpActive] = useState(false);

  const handleToggle = () => {
    setSignUpActive((prev) => !prev);
  };

  const IsValidate = () => {
    let result = true;
    if(username === '' || username === null){
      result = false;
      toast.warning("Please Enter Username")   
      
    }
    if(email1 === '' || email1 === null){
      result = false;
      toast.warning("Please Enter Email")
    }
    if(password1 === '' || password1 === null){
      result = false;
      toast.warning("Please Enter Password")   
      
    }
    return result;
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    let review = {username,email1,password1};
    if (IsValidate()){

      fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body:JSON.stringify(review)
      }).then ((resp) => {
        toast.success('Registered successfully.')
      }).catch ((err)=>{
        toast.error('Failed :'+err.message);
      });
    };
    }
  const handleLogin = async (e) => {
    e.preventDefault();

    if (validate()) {
      fetch("http://localhost:3001/users?email1=" + email)
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          console.log(resp[0]["password1"]);
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid email");
          } else {
            if (resp[0]["password1"] === password) {
              toast.success("Successful");
              sessionStorage.setItem('email', email);
            } else {
              toast.error(`Please Enter valid credentials`);
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to:" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (email === '' || email === null) {
      result = false;
      toast.warning("Please Enter email");
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  return (
    <div className={`container ${isSignUpActive ? 'active' : ''}`}>
      <div className={`form-container sign-up ${isSignUpActive ? '' : 'hidden'}`}>
        <form onSubmit={handleRegister}>
          <h1>Create Account</h1>

          <span>or use your email for registration</span>
          <input 
            type="text" 
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
           />
          <input 
            type="email" 
            placeholder="Email" 
            value={email1}
            onChange={(e) => setEmail1(e.target.value)}
            />
          <input 
            type="password" 
            placeholder="Password" 
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <button>Sign Up</button>
        </form>
      </div>
      <div className={`form-container sign-in ${isSignUpActive ? 'hidden' : ''}`}>
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>

          <span>or use your email password</span>
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forget Your Password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className={`toggle-panel toggle-left ${isSignUpActive ? '' : 'hidden'}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" onClick={handleToggle}>
              Sign In
            </button>
          </div>
          <div className={`toggle-panel toggle-right ${isSignUpActive ? 'hidden' : ''}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" onClick={handleToggle}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
