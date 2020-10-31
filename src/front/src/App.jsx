import React, {useEffect, useState,} from 'react';
import { Container } from 'reactstrap';
import { Route, Switch, NavLink } from 'react-router-dom';
import cx from 'classnames';
import { useStore, useGate } from 'effector-react';
import Card from './Card/Card';

import { $booksRecommended, fetchBooksFx, fetchPopularBooksFx, $booksPopular, booksGate, $currentEvents, fetchEventsFx, fetchClubsFx, $clubs } from '../src/models/index';

import styles from './App.module.css';

const App = () => {
  useGate(booksGate);
  const [userReaderId, setUserReaderId] = useState('');
  const [userEventId, setUserEventId] = useState('');
  const [settedReaderId, setSettedReaderId] = useState('');
  const [settedEventId, setSettedEventId] = useState('');

  const {data: books} = useStore($booksRecommended);
  const popularBooks = useStore($booksPopular);
  const currentEvents = useStore($currentEvents);
  const clubs = useStore($clubs);

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
    setSettedEventId('');
  };

  useEffect(() => {
    if (settedEventId && settedReaderId) {
      fetchBooksFx({
      readerId: settedReaderId,
      eventId: settedEventId 
      });
      fetchPopularBooksFx({
        readerId: settedReaderId,
        eventId: settedEventId
      });
      fetchEventsFx({
        readerId: settedReaderId,
        eventId: settedEventId
      });
      fetchClubsFx({
        readerId: settedReaderId,
        eventId: settedEventId
      });
    }
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
            {settedReaderId && settedEventId && (<AppBody userId={settedReaderId} handleSignOut={handleSignOut} books={books} popularBooks={popularBooks} events={currentEvents} clubs={clubs}/>)}
        </Container>
  );
}

const AppBody = ({ userId, handleSignOut, books, popularBooks, events, clubs }) => {
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
            <NavLink to='/popular-books' activeClassName  ={styles.menuNavLinkActive} className={styles.menuNavLink}>
                              <span className={styles.linkText}>Popular books</span>
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
                          <div className={styles.mainBlock}>
                            <h2>Рекомендованные книги</h2>
                            <div className={styles.bookRow}>{books?.slice(0,3).map(({ img_url, name, desc }) => <Card imageUrl={img_url} name={name} desc={desc}/>)}</div>
                          </div>
                          <div className={styles.mainBlock}>
                            <h2>Популярные книги</h2>
                            <div className={styles.bookRow}>{popularBooks?.slice(0,3).map(({ img_url, name, desc }) => <Card imageUrl={img_url} name={name} desc={desc}/>)}</div>
                          </div>
                          <div className={styles.mainBlock}>
                            <h2>Текущие мероприятия</h2>
                            <div className={styles.bookRow}>{events?.slice(0,3).map(({ img_url, name, desc }) => <Card imageUrl={img_url} name={name} desc={desc}/>)}</div>
                          </div>
                        </Route>
                        <Route exact path='/books'>
                          <div className={styles.booksTable}>
                            {books?.map(({ img_url, name, desc }) => <Card imageUrl={img_url} name={name} desc={desc} />)} 
                          </div>
                        </Route>
                        <Route exact path='/events'>
                          <div className={styles.booksTable}>
                            {events?.map(({ img_url, name, desc }) => <Card imageUrl={img_url} name={name} desc={desc} />)} 
                          </div>
                        </Route>
                        <Route exact path='/popular-books'>
                          <div className={styles.booksTable}>
                            {popularBooks?.map(({ img_url, name, desc }) => <Card imageUrl={img_url} name={name} desc={desc} />)} 
                          </div>
                        </Route>
                        <Route exact path='/clubs'>
                          <div className={styles.booksTable}>
                            {clubs?.map(({ img_url, name, desc }) => <Card imageUrl={img_url} name={name} desc={desc} />)} 
                          </div>
                        </Route>
          </Switch>
        </div>
      </>
    )
}

export default App;
