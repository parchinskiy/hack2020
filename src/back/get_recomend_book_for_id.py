import pandas as pd
import numpy as np


# from tensorflow import keras

# from sklearn.datasets import dump_svmlight_file
# import numpy as np
# import pandas as pd
# import os
# import urllib
# import zipfile
# from sklearn.model_selection import train_test_split
# import shutil
 
# import matplotlib.pyplot as plt
# import tensorflow as tf
# from tensorflow import keras
# from keras.optimizers import Adam

# n_users, n_movies = (891404, 509258)
# n_latent_factors = 20

# movie_input = keras.layers.Input(shape=[1],name='Item')
# movie_embedding = keras.layers.Embedding(n_movies + 1, n_latent_factors, name='Movie-Embedding')(movie_input)
# movie_vec = keras.layers.Flatten(name='FlattenMovies')(movie_embedding)
 
# user_input = keras.layers.Input(shape=[1],name='User')
# user_vec = keras.layers.Flatten(name='FlattenUsers')(keras.layers.Embedding(n_users + 1, n_latent_factors,name='User-Embedding')(user_input))
 
# prod = keras.layers.dot([movie_vec, user_vec], axes=1,name='DotProduct')
# model = keras.Model([user_input, movie_input], prod)
# model.load_weights("my_h5_model.h5")
# movie_embedding_learnt = model.get_layer(name='Movie-Embedding').get_weights()[0]
# print(movie_embedding_learnt)
# pd.DataFrame(movie_embedding_learnt).to_csv('movie_embedding_learnt.csv', index=False, header=True)
# user_embedding_learnt = model.get_layer(name='User-Embedding').get_weights()[0]
# print(user_embedding_learnt)
# pd.DataFrame(user_embedding_learnt).to_csv('user_embedding_learnt.csv', index=False, header=True)

movie_embedding_learnt = pd.read_csv('movie_embedding_learnt.csv').values
user_embedding_learnt = pd.read_csv('user_embedding_learnt.csv').values

def get_recomend_id(user_id, number_of_movies=20):
    movies = user_embedding_learnt[user_id]@movie_embedding_learnt.T
    mids = np.argpartition(movies, -number_of_movies)[-number_of_movies:]
    return mids

new_book_id_to_name = pd.read_csv('new_book_id_to_name.csv', names=['new_book_id', 'name'], encoding='utf-8')
new_book_id_to_name.set_index('new_book_id', inplace=True)

def get_recomend_book_for_id(user_id, number_of_movies=20):
    arr = get_recomend_id(user_id)
    new_arr = []
    for i in range(len(arr)):
        try:
            new_arr.append(new_book_id_to_name.iloc[arr[i]]['name'])
        except:
            pass
    return new_arr
    
if __name__ == '__main__':
    print(get_recomend_book_for_id(1))