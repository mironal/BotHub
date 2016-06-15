#!/bin/bash

# 指定した ID の hook の情報を見る
#
# 以下の環境変数が必要
# BOTHUB_GITHUB_TOKEN: GitHub の Token(要管理者権限).
# BOTHUB_HOOK_ID: WebHook の ID. list_webhook.sh で確認できる.
# BOTHUB_USER_NAME: https://github.com/UserName/RepoName の UserName の部分
# BOTHUB_REPO_NAME: https://github.com/UserName/RepoName の RepoName の部分

source pre_check.sh

check_token
check_hook_id
check_user_name
check_repo_name

# PATCH /orgs/:org/hooks/:id
curl --silent  -H "Authorization: token ${BOTHUB_GITHUB_TOKEN}" -H "Content-Type: application/json" \
    https://api.github.com/repos/${BOTHUB_USER_NAME}/${BOTHUB_REPO_NAME}/hooks/${BOTHUB_HOOK_ID} \
    | jq "."
