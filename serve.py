#!/usr/bin/env python3
# Kinky Dungeon pure-web edition - local launcher (ASCII only, no Chinese output)
# Usage: double-click start.bat, or run `python serve.py` in this folder.
# Then open http://127.0.0.1:8080/ in your browser.
import http.server
import socketserver
import os
import sys

# Switch to this script's directory so Chinese paths in the folder name are never hardcoded.
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8080


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Allow CORS and disable caching for local testing.
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Write access log to stderr so 404s are visible in the server window.
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print("Kinky Dungeon web server started ->  http://127.0.0.1:%d/" % PORT)
        print("Open the URL above in your browser. Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Server stopped.")
