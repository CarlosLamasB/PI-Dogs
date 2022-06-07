import './App.css';
import { Route} from "react-router-dom";
import Initial from './components/Initial/Initial.jsx';
import Home from './components/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Form from './components/Form/Form.jsx';
import DogDetail from './components/DogDetail/DogDetail.jsx';

function App() {
  return (
    <div className="App"style={{position:"absolute", height:'100%', width:'100%'}}>
      <Route path='/' exact component={Initial} />
      <Route path='/Home' component={Navbar} />
      <Route path='/Home' exact component={Home} />
      <Route path='/Form' component={Navbar}/> 
      <Route path='/Form'exact component={Form}/>
      <Route path='/dog/:id' component={Navbar} />  
      <Route path='/dog/:id'  component={DogDetail}/>
      

    </div>
  );
}

export default App;
