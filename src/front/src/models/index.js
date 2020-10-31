import { createStore, createEvent, createEffect } from 'effector';
import { createGate } from 'effector-react';

export const $books = createStore([]);

export const resetBooks = createEvent();

export const fetchBooksFx = createEffect();

export const booksGate = createGate();