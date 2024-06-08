from io import BytesIO
from flask import Flask, render_template, send_file, redirect, request
import requests
import json
import os
from datetime import datetime
import requests
app = Flask(__name__)
app.url_map.strict_slashes = False


@app.route("/")
def home():
    return render_template("index.html")
