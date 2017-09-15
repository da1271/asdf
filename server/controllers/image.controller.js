//----- Import Controller
const persOrdersModel = require("../models/persorders.model");
const downloadFile = require('download-file');
const jimpImage = require("jimp");
const images = require("images");
const QRCode = require("qrcode");
const fileSystem = require("fs");

//----- Constant Declaration
const printReadyImagePath = "../assets/images/printReadyImage/",
    printImagePath = "../assets/images/printImage/",
    qrcodePath = "../assets/images/qrcode/";

//----- Busniess Layer
//-------- Create print ready image based on Picketd Ticket and Pers_order details.
function createPrintReadyImageWithPickTicket(req, res) {

    var currentTimeStamp = Math.floor(Date.now()),
        orderId = req.body.orderId;

    console.log("createPrintReadyImageWithPickTicket " + orderId);
    persOrdersModel.find({ orderId: orderId }, function(err, result) {
        if (err) {
            throw err;
        }

        console.log("Read Pers_order collection");

        downloadLabelImage(result[0].printImg, orderId, currentTimeStamp, function() {

            createBlankImage(orderId, currentTimeStamp, function() {

                createQRCode(orderId, currentTimeStamp, function() {
                    images(printReadyImagePath + orderId + "_" + currentTimeStamp + ".png")

                    .size(500)

                    .draw(images(printImagePath + orderId + "_" + currentTimeStamp + ".png"), 0, 0)

                    .draw(images(qrcodePath + orderId + "_" + currentTimeStamp + ".png"), 320, 0)

                    .save(printReadyImagePath + orderId + "_" + currentTimeStamp + ".png", {});

                    /* jimpImage.read(printReadyImagePath + orderId + "_" + currentTimeStamp + ".png").then(function(readImage) {
                            loadedImage = readImage;
                            readImage.rotate(90);
                            return jimpImage.loadFont(jimpImage.FONT_SANS_16_BLACK);
                        })
                        .then(function(font) {
                            loadedImage.print(font, 31, 318, 'Order #-' + result[0].orderId)
                                .print(font, 31, 338, 'Date/Time: pritam')
                                .print(font, 31, 358, 'Item Quantity: ' + result[0].quantity)
                                .print(font, 31, 378, 'Sequence: pritam')
                                .print(font, 31, 398, 'SKU: ' + result[0].sku)
                                .print(font, 31, 418, 'SKU Des.: pritam')
                                .print(font, 31, 438, 'Form: pritam')
                                .print(font, 31, 458, 'Fragrance:')
                                .write(printReadyImagePath + orderId + "_" + currentTimeStamp + ".png");

                            res.send('Print ready image was successfuly created....');
                        })
                        .catch(function(err) {
                            console.error(err);
                        }); */
                });
            });
        });
    });
}

//-------- Save the print ready image in Amazon S3 backut and upate the URL in Pers_order.
function savePrintReadyImageAndUpateURL(req, res) {

}

function createFolder(folderPath, callback) {
    var exists = fileSystem.existsSync(folderPath);
    console.log('createfolder');
    if (!exists) {
        console.log('mkdir ' + folderPath);
        fileSystem.mkdir(folderPath, '0o755', function(err) {
            if (err) {
                throw err;
            }
            if (callback) {
                console.log('createfolder callback ttt');
                callback();
            }
        });
    }

}

function downloadLabelImage(printImageURL, orderId, currentTimeStamp, callback) {
    createFolder(printImagePath, function() {
        downloadFile(printImageURL, {
            directory: printImagePath,
            filename: orderId + "_" + currentTimeStamp + ".png"
        }, function(err) {
            if (err) {
                throw err
            }
            if (callback) {
                callback();
            }
        });
    });
}

function createBlankImage(orderId, currentTimeStamp, callback) {
    createFolder(printReadyImagePath, function() {
        var image = new jimpImage(500, 276, function(err, image) {
            loadedImage = image;
            image.write(printReadyImagePath + orderId + "_" + currentTimeStamp + ".png");
            if (err) {
                throw err
            }
            if (callback) {
                callback();
            }
        });
    });
}

function createQRCode(orderId, currentTimeStamp, callback) {
    createFolder(qrcodePath, function() {
        var tempQRCodePath = qrcodePath + orderId + "_" + currentTimeStamp + ".png";
        console.log(tempQRCodePath);
        QRCode.toFile(String(tempQRCodePath), orderId, {
            color: {
                dark: '#000',
                light: '#0000'
            }
        }, function(err) {
            if (err) {
                throw err
            }
            if (callback) {
                callback();
            }
        });
    });
}

//----- Export Routes.
module.exports = { createPrintReadyImageWithPickTicket, savePrintReadyImageAndUpateURL };
