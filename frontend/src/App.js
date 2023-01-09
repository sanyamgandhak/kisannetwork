import FirstPage from './components/FirstPage.jsx'
import SecondPage from './components/SecondPage.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
function App() {
  return (
   <Router>
 <Routes>
 <Route exact path="/" element={<FirstPage/>}> </Route>
<Route path="/contact" element={<SecondPage/>}></Route>
 </Routes>

   </Router>
  );
}

export default App;
