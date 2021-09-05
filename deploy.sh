#!/usr/bin/env sh

now=$(date "+%Y-%m-%d %H:%M:%S")
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build
cd dist
git init
git add -A
git commit -m "$now"
git push -f git@github.com:scripthqs/vuecms.git master:gh-pages

echo "进入项目目录"
cd D:/user/Desktop/scripthqs/vuecms
echo "开始提交"
git add -A && git commit -m "$now" && git pull && git push
echo "提交完成"
read

