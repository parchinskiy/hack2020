from flask import Flask, request, json
from flask_cors import CORS, cross_origin
from bs4 import BeautifulSoup
import pandas, random, requests, re

from .src.back.get_recomend_book_for_id import get_recomend_book_for_id
from .src.back.get_popular_book import get_popular_book

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

baseurl = 'https://www.litres.ru'

headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:45.0) Gecko/20100101 Firefox/45.0'
}

df = pandas.read_excel('temp.xlsx', index_col=None)

def get_random_item(start,stop):
    random_list = []
    while True:
        num = random.randrange(start,stop)
        if num in random_list:
            continue
        random_list.append(num)
        if len(random_list) == 10:
            break
    return random_list


def get_events_list(age):
    event_list = df[df['Возрастной ценз участников мероприятия'].astype(int) < age]
    return [item[1] for item in random.sample(event_list.values.tolist(),10)]

def convert_string_to_url_view(search_string):
    l = search_string.split()
    return '+'.join(l)

def find_desc_for_book(book_name):
    request_url = 'https://www.litres.ru/pages/rmd_search_arts/?q={}'.format(convert_string_to_url_view(book_name))

    session = requests.session()
    response = requests.get(request_url, headers = headers)
    if re.search("ничего не найдено",response.text):
        return None

    soup = BeautifulSoup(response.text, 'html.parser')
    book = soup.find_all('a', class_='cover_href')
    url = book[0].get('href')

    response = requests.get(baseurl + url,headers = headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    desc = soup.find('div',class_='biblio_book_descr_publishers').contents[0].contents[0]
    img_url = re.search("cover.dataset.src = '(.*?)[']",response.text).group(1)
    return (img_url,desc)

def return_mock_data():
    arr = [{'name':'Война и мир','img_url':'https://cv4.litres.ru/pub/c/elektronnaya-kniga/cover_415/25452548-lev-tolstoy-voyna-i-mir-tom-1.jpg','desc':'В книгу входит первый том романа-эпопеи «Война и мир». Для старшего школьного возраста.'},
			{'name':'Убийственно красиво','img_url':'https://cv6.litres.ru/pub/c/elektronnaya-kniga/cover_415/171263-piter-dzheyms-ubiystvenno-krasivo.jpg','desc':'В книгу входит первый том романа-эпопеи «Война и мир». Для старшего школьного возраста.'},
			{'name':'Шелкопряд','img_url':'https://cv9.litres.ru/pub/c/elektronnaya-kniga/cover_415/8592497-robert-gelbreyt-shelkopryad.jpg','desc':'В книгу входит первый том романа-эпопеи «Война и мир». Для старшего школьного возраста.'}]
    answer = {'user_id':'user_id','data':arr}
    return answer

@app.route('/api/getRecomendBookForId', methods=['POST'])
@cross_origin()
def get_recomend_book_for_id():
    reader_id = request.values.get('readerId')
    evet_id   = request.values.get('eventId')
    books = get_recomend_book_for_id(reader_id)
    addational = [find_desc_for_book(book) for book in books]
    data = []
    for i in range(len(books)):
        data.append({'name' : books[i], 'img_url' : addational[0], 'desc' : addational[1]})
    return json.jsonify(data)

@app.route('/api/getPopularBook')
@cross_origin()
def get_popular_book():
    return json.jsonify(get_populat_book())

@app.route('/api/getRecomendEventsForId', methods=['POST'])
@cross_origin()
def get_recomend_events_for_id():
    reader_id = request.values.get('readerId')
    evet_id   = request.values.get('evetId')
    return json.jsonify(return_mock_data())

@app.route('/api/getCurrentEvents')
@cross_origin()
def get_current_events():
    events_list = get_events_list()
    answer = {'events':events_list}
    return json.jsonify(answer)

app.run(host='194.58.97.42')
