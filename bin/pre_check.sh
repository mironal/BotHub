#!/bin/bash

check_token()
{
    if [ -z "${BOTHUB_GITHUB_TOKEN+x}" ] ; then
        echo "環境変数 BOTHUB_GITHUB_TOKEN が必要です" >&2
        exit 1
    fi
}

check_hook_id()
{
    if [ -z "${BOTHUB_HOOK_ID+x}" ] ; then
        echo "環境変数 BOTHUB_GITHUB_TOKEN が必要です" >&2
        exit 1
    fi
}

check_user_name()
{
    if [ -z "${BOTHUB_USER_NAME+x}" ] ; then
        echo "環境変数 BOTHUB_USER_NAME が必要です" >&2
        exit 1
    fi
}

check_repo_name()
{
    if [ -z "${BOTHUB_REPO_NAME+x}" ] ; then
        echo "環境変数 BOTHUB_REPO_NAME が必要です" >&2
        exit 1
    fi
}
