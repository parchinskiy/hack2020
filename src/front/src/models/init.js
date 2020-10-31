import { forward } from 'effector';
import { $books, fetchBooksFx, resetBooks, booksGate } from './index';
import { api } from '../../src/utils/api';
import { booksForId as url} from '../../src/constants/urls';

$books.on(fetchBooksFx.doneData, (_, data) => data)
      .reset(resetBooks);

fetchBooksFx.use((data) => api({
   url,
   method: 'post',
   data
}));

forward({
    from: booksGate.close,
    to: [
        resetBooks
    ]
});