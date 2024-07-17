from qreader import QReader
import segno

qreader = QReader()

def decode(image):
    return qreader.detect_and_decode(image)

def encode(data):
    qr_code = segno.make(data)
    qr_code_data_uri = qr_code.png_data_uri(scale=5)
    return qr_code_data_uri