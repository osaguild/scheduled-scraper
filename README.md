# scheduled-scraper

It is automatically executed and data is stored using github actions. to make it easy for everyone to use, we saved it in json format and made it available through the github api.

## scraping data

| name                    | description | url                                                                                                   | data             | since      |
| :---------------------- | :---------- | :---------------------------------------------------------------------------------------------------- | :--------------- | :--------- |
| kaldi sale info         | TBD         | https://map.kaldi.co.jp/kaldi/articleList?account=kaldi&accmd=1&ftop=1&kkw001=2010-03-12T13%3A10%3A35 | ./data/kaldi     | 2022-08-05 |
| shamaison building info | TBD         | https://www.shamaison.com                                                                             | ./data/shamaison | 2022-08-09 |

## how to use

through the github api is better way to use. example commands are below.

| use case       | command                                                                                       |
| :------------- | :-------------------------------------------------------------------------------------------- |
| get file lists | `curl 'https://api.github.com/repos/osaguild/scheduled-scraper/contents/data/kaldi?ref=main'` |
