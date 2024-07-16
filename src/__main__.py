import sys

sys.path.append('src')

from config import app
from routes import main

app.register_blueprint(main)

if __name__ == '__main__':
    app.run(debug=True)
