#!/usr/bin/python3
from mechanicalsoup import *
import json

browser = StatefulBrowser(user_agent='MechanicalSoup')
browser.open("https://www.wisesayings.com/gamer-quotes/")
page = browser.get_current_page()
quotes = page.findAll("div", class_="quote")
_json = []
for q in quotes:
    q_elements = q.findAll("b")
    try:
        phrase = q_elements[1].text.replace("\xa0", "").strip()
        _json.append(phrase)
    except:
        print(q_elements)
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(_json, f, indent=4)
