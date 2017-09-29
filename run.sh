rm -rf dist/
npm run build
echo rm  remote dist
rm -rf /Users/zhangyn/demo/vue/H5Product/wx/sjmarket/*
echo cp remote dist
cp -ri dist/* /Users/zhangyn/demo/vue/H5Product/wx/sjmarket
echo start server
cd ./dist
## http-server -p 9090
