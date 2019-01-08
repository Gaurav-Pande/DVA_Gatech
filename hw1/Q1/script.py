import json
import http.client
import sys
import csv
import collections
import time

class Movies:

    def __init__(self,api):
        self.api = api

    def get_movies_by_genre(self):
        start_time = time.time()
        conn = http.client.HTTPSConnection("api.themoviedb.org")
        payload = "{}"
        results = 0
        for page in range(1,16):
            conn.request("GET",
                         "/3/discover/movie?with_genres=35&primary_release_date.gte=2000-01-01&page="+str(page)+
                         "&include_video=false&include_adult=false&sort_by=popularity.desc&api_key="+
                         self.api, payload)
            res = conn.getresponse()
            data = res.read()
            unicode_data = data.decode('utf-8')
            json_data = json.loads(unicode_data)
            results += len(json_data['results'])
            with open('movie_ID_name.csv', 'a') as csvfile:
                for item in json_data['results']:
                    writer = csv.writer(csvfile, delimiter=',')
                    movie_id = item['id']
                    movie_title = item['title']
                    writer.writerow([movie_id,movie_title])
                    #print (item['id'],item['popularity'],item['title'],item['release_date'])
        end_time = time.time() - start_time
        


    def get_similar_movies(self):
        start_time = time.time()
        conn = http.client.HTTPSConnection("api.themoviedb.org")
        payload = "{}"
        with open('movie_ID_name.csv','r') as csvfile:
            reader = csv.reader(csvfile,delimiter=',')
            num_of_request = 0
            with open('movie_ID_sim_movie_ID.csv', 'a') as csvfile_w:
                for row in reader:
                    num_of_request += 1
                    conn.request("GET",
                                 "/3/movie/"+row[0]+"/similar?api_key="+self.api,
                                 payload)
                    res = conn.getresponse()
                    data = res.read()
                    unicode_data = data.decode("utf-8")
                    json_data = json.loads(unicode_data)
                    results = 0
                    dic = collections.defaultdict(list)
                    for item in json_data['results']:
                        results += 1
                        if results <= 5:
                            if item['id'] not in dic.keys():
                                    dic[row[0]].append(item['id'])
                                    writer = csv.writer(csvfile_w, delimiter=',')
                                    movie_id = row[0]
                                    movie_sim_id = item['id']
                                    writer.writerow([movie_id, movie_sim_id])
                        else:
                            continue
                    if num_of_request == 40 and time.time()-start_time <= 10:
                        time.sleep(1)
                        num_of_request = 0
        end_time = time.time() - start_time


    def format_csv_file(self):
        with open('movie_ID_sim_movie_ID.csv','r') as csvfile:
            r = csv.reader(csvfile)
            data = [line for line in r]
        with open('movie_ID_sim_movie_ID.csv', 'w', newline='') as f:
            w = csv.writer(f)
            w.writerow(['Source', 'Target'])
            w.writerows(data)


if __name__ == '__main__':
    api_key = str(sys.argv[1])
    ob = Movies(api_key)
    ob.get_movies_by_genre()
    ob.get_similar_movies()
    ob.format_csv_file()
