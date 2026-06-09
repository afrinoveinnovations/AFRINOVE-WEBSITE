import qrcode

# Create QR code instance
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H, # High error correction for printing on documents
    box_size=20, # Large box size for high resolution
    border=4,
)

# Add data
url = "https://www.afrinove.com"
qr.add_data(url)
qr.make(fit=True)

# Create an image from the QR Code instance
img = qr.make_image(fill_color="black", back_color="white")

# Save it to a file
img.save("afrinove_official_qr.png")
print("QR code successfully generated and saved as afrinove_official_qr.png")
