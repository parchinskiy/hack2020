import { createStore, createEvent, createEffect } from 'effector';
import { createGate } from 'effector-react';

export const $booksRecommended = createStore([]);

export const resetBooks = createEvent();

export const fetchBooksFx = createEffect();

export const booksGate = createGate();

export const $booksPopular = createStore([]);

export const fetchPopularBooksFx = createEffect();

export const $currentEvents = createStore([]);

export const fetchEventsFx = createEffect([]);