import os
from flask import Flask, request, redirect
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from google.oauth2 import id_token
from google.auth.transport import requests
app = Flask(__name__)
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
@app.route('/')
def index():
    return redirect("./static/index.html")
@app.route('idtoken', methods=['POST'])
def signOn():
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(request.form["idtoken"] , requests.Request(), GOOGLE_CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        # ID token is valid. Get the user's Google Account ID from the decoded token.
        userid = idinfo['sub']
    except ValueError:
        # Invalid token
        pass

if __name__ == '__main__':
    
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    # Listen on 0.0.0.0 so port can be attached to by docker
    app.run(host='0.0.0.0', port=port)
