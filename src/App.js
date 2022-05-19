import './App.css';
import Navbar from './components/NavbarComponent';

function App() {
  return (
    <div>
      <Navbar logged={false}></Navbar>
      <div className="container-sm col-6 border border-dark p-5 my-5">
        <h2>Login</h2>
        <div className="my-5">
          <label className="form-label mb-2">Email</label>
          <input type="email" class="form-control mb-3" placeholder="Email" />
          <label className="form-label mb-2">Password</label>
          <input type="password" class="form-control" placeholder="Password" />
        </div>
        <div className="row">
          <button type="button" className="btn btn-light col-6">
            Register
          </button>
          <button type="button" className="btn btn-dark col-6">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
