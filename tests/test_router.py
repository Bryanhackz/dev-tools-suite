import unittest
from wsgiref.util import setup_testing_defaults
from router import application

class RouterTests(unittest.TestCase):
    def _make_request(self, path: str, method: str = "GET") -> tuple[str, bytes]:
        environ = {}
        setup_testing_defaults(environ)
        environ["PATH_INFO"] = path
        environ["REQUEST_METHOD"] = method
        
        status_holder = {}
        def start_response(status, headers):
            status_holder["status"] = status
            
        response = application(environ, start_response)
        return status_holder["status"], response[0]

    def test_health_endpoint(self):
        status, body = self._make_request("/health")
        self.assertEqual(status, "200 OK")
        self.assertEqual(body, b'{"ok": true}')

    def test_index_endpoint(self):
        status, body = self._make_request("/")
        self.assertEqual(status, "200 OK")
        self.assertIn(b"<!DOCTYPE html>", body)

    def test_legal_endpoint(self):
        status, body = self._make_request("/legal")
        self.assertEqual(status, "200 OK")
        self.assertIn(b"<!DOCTYPE html>", body)

    def test_not_found(self):
        status, body = self._make_request("/ruta-inexistente")
        self.assertEqual(status, "404 Not Found")

    def test_method_not_allowed(self):
        status, body = self._make_request("/", method="POST")
        self.assertEqual(status, "405 Method Not Allowed")

if __name__ == "__main__":
    unittest.main()
