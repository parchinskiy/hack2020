import React, {useEffect, useState,} from 'react';
import { Container } from 'reactstrap';
import { Route, Switch, NavLink } from 'react-router-dom';
import cx from 'classnames';
import { useStore, useGate } from 'effector-react';
import Card from './Card/Card';

import { $booksRecommended, fetchBooksFx, fetchPopularBooksFx, $booksPopular, booksGate, $currentEvents, fetchEventsFx, fetchClubsFx, $clubs } from '../src/models/index';

import styles from './App.module.css';
import AdBlock from './adblock/adblock';

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
              <h1>Привет!</h1>
              <span>Enter user ID to get recommendations</span>
              <input className={styles.loginInput} placeholder={'User Reader ID'} onChange={handleInputChange(setUserReaderId)} value={userReaderId} />
              <input className={styles.loginInput} placeholder={'User Event ID'} onChange={handleInputChange(setUserEventId)} value={userEventId} />
              <button onClick={handleSubmit} className={styles.loginSubmitButton}>Войти</button>
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
          <div className={styles.searchWrapper}>
            <input className={styles.searchForm} type="text" value="Поиск"></input>
           <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg>
          </div>
          <div className={styles.userBlock}>
            <NavLink to='/' className={styles.signOutButton} onClick={handleSignOut}>Выход</NavLink>
          </div>
        </div>
        <AdBlock></AdBlock>
        <div className={styles.mainBody}>
          <Switch>
                        <Route exact path='/'>
                          <div className={styles.booksBlock}>
                            <div className={styles.recomenTitleWrapper}>
                              <div className={styles.recomenTitle}><p className={styles.recomend}>Рекомендованные книги</p></div>
                              <a href="/books">СМОТРЕТЬ ВСЕ</a>
                            </div>
                            <div className={styles.bookRow}>{books?.slice(0,3).map(({ img_url, name, desc }) => <Card imageUrl={img_url} name={name} desc={desc}/>)}</div>
                          </div>
                          <div className={styles.booksBlock}>
                            <div className={styles.recomenTitleWrapper}>
                              <div className={styles.recomenTitle}><p className={styles.recomend}>Популярные книги</p></div>
                              <a href="">СМОТРЕТЬ ВСЕ</a>
                              </div>
                              <div className={styles.bookRow}>{popularBooks?.slice(0,3).map(({ img_url, name, desc }) => <Card imageUrl={img_url} name={name} desc={desc}/>)}</div>

                          </div>
                          <div className={styles.booksBlock}>
                          <div className={styles.recomenTitleWrapper}>
                            <div className={styles.recomenTitle}><p className={styles.recomend}>Текущие мероприятия</p></div>
                            <a href="">СМОТРЕТЬ ВСЕ</a>
                            </div>
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
