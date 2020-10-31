import React, {useEffect, useState,} from 'react';
import { Container } from 'reactstrap';
import { Route, Switch, NavLink } from 'react-router-dom';
import cx from 'classnames';
import { useStore } from 'effector-react';
import Card from './Card/Card';

import { $books, fetchBooksFx } from '../src/models/index';

import styles from './App.module.css';

const App = () => {
  const [userReaderId, setUserReaderId] = useState('');
  const [userEventId, setUserEventId] = useState('');
  const [settedReaderId, setSettedReaderId] = useState('');
  const [settedEventId, setSettedEventId] = useState('');

  const {data: books} = useStore($books);

  const handleInputChange = (setFunction) => ({ target: { value }}) => {
    setFunction(value);
  };

  const handleSubmit = () => {
    if (userReaderId && userEventId) {
      setSettedReaderId(userReaderId);
    setSettedEventId(userEventId);
    } 
  };
  
  const handleSignOut = () => {
    setSettedReaderId('');
  };

  useEffect(() => {
    settedEventId && settedReaderId && fetchBooksFx({
      readerId: settedReaderId,
      eventId: settedEventId 
    });
  }, [settedReaderId, settedEventId])

  return (
        <Container fluid className={cx({
          [styles.AppLogin]: !settedReaderId,
          [styles.App]: settedReaderId
        })}>
            {!settedReaderId && !settedEventId && (<div className={styles.loginForm}>
              <h1>Welcome!</h1>
              <span>Enter user ID to get recommendations</span>
              <input className={styles.loginInput} placeholder={'User Reader ID'} onChange={handleInputChange(setUserReaderId)} value={userReaderId} />
              <input className={styles.loginInput} placeholder={'User Event ID'} onChange={handleInputChange(setUserEventId)} value={userEventId} />
              <button onClick={handleSubmit} className={styles.loginSubmitButton}>Submit</button>
            </div>)}
            {settedReaderId && settedEventId && (<AppBody userId={settedReaderId} handleSignOut={handleSignOut} books={books}/>)}
        </Container>
  );
}

const AppBody = ({ userId, handleSignOut, books }) => {
    return (
      <>
        <div className={styles.header}>
          <div className={styles.navBar}>
            <NavLink to='/books' activeClassName={styles.menuNavLinkActive} className={styles.menuNavLink}>
                              <span className={styles.linkText}>Books</span>
            </NavLink>
            <NavLink to='/events' activeClassName={styles.menuNavLinkActive} className={styles.menuNavLink}>
                              <span className={styles.linkText}>Events</span>
            </NavLink>
            <NavLink to='/clubs' activeClassName  ={styles.menuNavLinkActive} className={styles.menuNavLink}>
                              <span className={styles.linkText}>Clubs</span>
            </NavLink>
          </div>
          <div className={styles.userBlock}>
            <span>Welcome, {userId}</span>
            <NavLink to='/' className={styles.signOutButton} onClick={handleSignOut}>Sign out</NavLink>
          </div>
        </div>
        <div className={styles.mainBody}>
          <Switch>
                        <Route exact path='/'>
                          <div className={styles.booksBlock}>
                            <h2>Рекомендованные книги</h2>
                            <div className={styles.bookRow}>{books?.slice(0,3).map(({ img_url, name, desc }) => <Card imageUrl={img_url} name={name} desc={desc}/>)}</div>
                          </div>
                        </Route>
                        <Route exact path='/books'>
                        </Route>
                        <Route exact path='/events'>
                        </Route>
                        <Route exact path='/clubs'>
                        </Route>
          </Switch>
        </div>
      </>
    )
}

export default App;
