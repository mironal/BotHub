#!/bin/bash

# GitHub の WebHook の一覧を取得

# 以下の環境変数が必要
# BOTHUB_GITHUB_TOKEN: GitHub の Token(要管理者権限).
# BOTHUB_USER_NAME: https://github.com/UserName/RepoName の UserName の部分
# BOTHUB_REPO_NAME: https://github.com/UserName/RepoName の RepoName の部分

source pre_check.sh

check_user_name
check_repo_name
check_token

# GET /orgs/:org/hooks
curl --silent -H "Authorization: token ${BOTHUB_GITHUB_TOKEN}" -H "Content-Type: application/json" \
    https://api.github.com/repos/${BOTHUB_USER_NAME}/${BOTHUB_REPO_NAME}/hooks \
    | jq --compact-output ".[] | {name: .name,  id: .id}"
