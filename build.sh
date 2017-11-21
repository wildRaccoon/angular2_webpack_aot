#bash
rm -rfv dist/@a_package
rm -rfv node_modules/@a_package

./node_modules/.bin/barrelsby --delete -d src/@a_package/ --verbose

cd ./src/@a_package
ls
../../node_modules/.bin/tsc 
cd ../../


cp -v src/@a_package/**/*.scss ./dist/@a_package/**/
cp -v src/@a_package/**/*.html ./dist/@a_package/**/
cp -v src/@a_package/package.json ./dist/@a_package/

mkdir -v node_modules/@a_package
cp -v -r ./dist/@a_package/ ./node_modules/