# 必要な GitHub の WebHook のイベントを有効にするコマンド達

## hook id の取得

`BOTHUB_GITHUB_TOKEN=<your github token. needs admin repo hook> BOTHUB_USER_NAME=<your name> BOTHUB_REPO_NAME=<repo name> ./list_webhook.sh`

> {"name":"amazonsns", "id": hook id}

## 一旦確認

`BOTHUB_GITHUB_TOKEN=<your github token> BOTHUB_USER_NAME=<your name> BOTHUB_REPO_NAME=<repo name> BOTHUB_HOOK_ID=<hook id> ./show_webhook.sh`

下のような結果が表示されて events に push しか登録されていないのが確認できるはず。

```
{
  // ...
  "name": "amazonsns",
  "events": [
    "push"
  ],
  // ...
}
```

## 必要なイベントを追加

`BOTHUB_GITHUB_TOKEN=<your github token> BOTHUB_USER_NAME=<your name> BOTHUB_REPO_NAME=<repo name> BOTHUB_HOOK_ID=<hook id> ./add_event_webhook.sh`

## 再び確認

さっきと同様に `show_webhook.sh` を実行すると以下のように色々なイベントが登録されていると思います。

```
{
  // ...
  "events": [
    "issues",
    "issue_comment",
    "pull_request",
    "pull_request_review_comment",
    "push",
    "status"
  ],
  // ...
}
```

これでおっけー

