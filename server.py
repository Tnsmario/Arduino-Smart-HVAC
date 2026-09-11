from flask import Flask, jsonify, render_template
import serial
import time

app = Flask(__name__)

PORT_USB = 'COM3'

try:
    arduino = serial.Serial(PORT_USB, 9600, timeout=1)
    time.sleep(2)
except Exception as e:
    arduino = None
    print(f"Eroare la conexiunea placii Arduino: {e}")

last_data = {"temperatura": "--", "umiditate": "--", "prag_temp": "--", "prag_umid": "--"}

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/data')
def get_data():
    global last_data
    if arduino:
        while arduino.in_waiting > 0:
            try:
                line = arduino.readline().decode('utf-8').strip()
                data = line.split(',')

                if len(data) == 4:
                    last_data = {
                        "temperatura": float(data[0]),
                        "umiditate": float(data[1]),
                        "prag_temp": float(data[2]),
                        "prag_umid": float(data[3])
                    }
            except:
                pass

    return jsonify(last_data)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False ,port=5000)