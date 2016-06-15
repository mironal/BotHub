#!/bin/bash

check_token()
{
    if [ -z "${BUTLER_GITHUB_TOKEN+x}" ] ; then
        echo "環境変数 BUTLER_GITHUB_TOKEN が必要です" >&2
        exit 1
    fi
}

check_hook_id()
{
    if [ -z "${BUTLER_HOOK_ID+x}" ] ; then
        echo "環境変数 BUTLER_GITHUB_TOKEN が必要です" >&2
        exit 1
    fi
}

check_user_name()
{
    if [ -z "${BUTLER_USER_NAME+x}" ] ; then
        echo "環境変数 BUTLER_USER_NAME が必要です" >&2
        exit 1
    fi
}

check_repo_name()
{
    if [ -z "${BUTLER_REPO_NAME+x}" ] ; then
        echo "環境変数 BUTLER_REPO_NAME が必要です" >&2
        exit 1
    fi
}
