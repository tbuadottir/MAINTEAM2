import json
from pymongo import MongoClient

# connect to the MongoDB server
client = MongoClient('localhost', 27017)

# create a new database
db = client['my_database']

# create a new collection
clues = db['clues']

# load the JSON file
with open('example.json') as f:
    data = json.load(f)

# insert the data into the collection
clues.insert_many(data)

# close the connection
client.close()
