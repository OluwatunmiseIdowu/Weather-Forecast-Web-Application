from flask import Flask, request, jsonify
import requests

weatherapp = Flask(__name__)

api_key = '2af0ade375df1f5427afa7025a54aa1a'

@weatherapp.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')

    weather_data = requests.get(
         f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&APPID={api_key}")
         

    if weather_data.json()['cod'] == '404':
         return jsonify({'error': 'No city found'})

    weather = weather_data.json()['weather'][0]['main']
    temp = round(weather_data.json()['main']['temp'])

    return jsonify({
        'weather': weather,
        'temperature': temp
    })

if __name__ == '__main__':
    weatherapp.run()



    