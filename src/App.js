import React from 'react';
import Home from './Pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Pages/Shop/Shop';
import './App.css';
import Header from './Components/Header/Header';
import SignInSignUp from './Pages/SignInSignUp/SignInSignUp';
import { auth, createDoc, createUserProfileDocument, db } from './Firebase/Firebase.utils';
import { collection, doc, onSnapshot } from "firebase/firestore"
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const userRef = await createUserProfileDocument(userAuth);
      if (userRef) {
        onSnapshot(doc(db, "users", userAuth.uid), (doc) => {
          const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          console.log(source, " data: ", doc.exists());
          // this.setState({
          //   currentUser:
          //     {
          //       ...doc.data()
          //     }
          // });
          // console.log(this.state);
        });
      } else {
        this.setState({ currentUser: null });
        console.log(this.state);
      }
    });
  }


  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header currentUser={this.state.currentUser} />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='shop' element={<Shop />} />
            <Route path='/sign-in' element={<SignInSignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App