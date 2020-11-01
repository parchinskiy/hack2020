import pandas as pd
import random

test = pd.read_csv('top_1000.csv', encoding='utf-8')

def get_populat_book():
    return [el[0] for el in random.sample(test.values.tolist(), 20)]
    
    
if __name__ == '__main__':
    print(get_populat_book())