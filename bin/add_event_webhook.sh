#!/bin/bash

source pre_check.sh

check_token
check_hook_id
check_user_name
check_repo_name

# PATCH /orgs/:org/hooks/:id
curl -v -X PATCH -H "Authorization: token ${BOTHUB_GITHUB_TOKEN}" -H "Content-Type: application/json" \
    https://api.github.com/repos/${BOTHUB_USER_NAME}/${BOTHUB_REPO_NAME}/hooks/${BOTHUB_HOOK_ID} \
    -d '{"events":["issue_comment", "issues", "pull_request_review_comment", "pull_request", "push", "status"]}' \
    | jq "."
