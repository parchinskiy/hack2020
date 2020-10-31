import { forward } from 'effector';
import { $booksRecommended, fetchBooksFx, resetBooks, booksGate, $booksPopular, fetchPopularBooksFx, fetchEventsFx, $currentEvents, $clubs, fetchClubsFx} from './index';
import { api } from '../../src/utils/api';
import { booksForId, popularBooks, currentEvents } from '../../src/constants/urls';

$booksRecommended.on(fetchBooksFx.doneData, (_, data) => data)
      .reset(resetBooks);

$booksPopular.on(fetchBooksFx.doneData, (_, data) => data.data)
.reset(resetBooks);

$currentEvents.on(fetchEventsFx.doneData, (_, data) => data.data).reset(resetBooks);

$clubs.on(fetchClubsFx.doneData, (_, data) => data.data).reset(resetBooks);

fetchClubsFx.use((data) => api({
    url: currentEvents,
    method: 'post',
    data
}));

fetchEventsFx.use((data) => api({
    url: currentEvents,
    method: 'post',
    data
}));


fetchBooksFx.use((data) => api({
   url: booksForId,
   method: 'post',
   data
}));

fetchPopularBooksFx.use((data) => api({
    url: popularBooks,
    method: 'post',
    data
}));

forward({
    from: booksGate.close,
    to: [
        resetBooks
    ]
});