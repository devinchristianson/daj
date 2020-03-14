import os
from flask import Flask, redirect
app = Flask(__name__)
@app.route('/')
def index():
    return redirect("./static/index.html")
if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    # Listen on 0.0.0.0 so port can be attached to by docker
    app.run(host='0.0.0.0', port=port)