ng build --configuration=production-fr
if [ -z $APP_URL ] || [ -z $API_URL ];
then
    export APP_URL="https://les-sagas-mp3-app-staging.herokuapp.com/"
    export API_URL="https://les-sagas-mp3-api-staging.herokuapp.com/api"
fi
echo "{\"webUrl\":\"$APP_URL\",\"apiUrl\":\"$API_URL\"}" > .heroku/config.json
cp .heroku/config.json www/assets/config.json
