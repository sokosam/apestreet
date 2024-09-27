# import json

# table = {}

# with open(r"company_tickers.json", "r") as file:
#     data = json.load(file)
#     for i in data:
#         # print(i)
#         table[data[i]["ticker"]] = data[i]["title"]

import praw
import pprint
import json

# stock_list =set()
# with open(r"company_tickers.json", "r") as file:
#     data = json.load(file)
#     for i in data:
#         stock_list.add(data[i]["ticker"].upper()) 


# reddit = praw.Reddit(client_id="RLCIr6zkr3R1jmsiblBq-g", client_secret="tHHz55olEVMyL3oUNOe3Guxn4JNLpw", user_agent="Scrapper")

# sub = reddit.subreddit("wallstreetbets")
# for submission in sub.new(limit=100):
#     print(submission.selftext)

# sub = reddit.submission(id="1epnmkn")
# pprint.pprint(vars(sub))
# print(sub.link_flair_text)
# print(sub._fetched)

# cnt = 0
# for i in sub.selftext.split():
#     if len(i) > 1 and  (i  in stock_list or i[1:] in stock_list):
#         print(i)
#         cnt+=1
    # elif i.lower() in stock_list:
    #     print(i)
    #     cnt+=1



# print(sub.selftext)
# pprint.pprint(vars(sub))



# print(reddit.auth.limits)
