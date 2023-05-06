const Event = require("../models/event");
const QrCode = require("../models/qrcode");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const QRCode = require('qrcode');

exports.createEvent = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: "problem with data"
      });
    }
    //destructure the fields
    const { name, description, link, category, reward } = fields;

    if (!name || !description || !link || !category || !reward) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let event = new Event(fields);
    
    //save to the DB
    event.save((err, event) => {
      if (err) {
        return res.status(400).json({
          error: "Saving Event in DB failed"
        });
      }
      res.json(event);
    });
  });
};

exports.getQRCodeByEventId = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId).exec();
    if (!event) {
      return res.status(400).json({
        error: 'No event was found in DB'
      });
    }
    
    let qrcode = new QrCode();
    const qrCodeString = `${eventId}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeString);
    const base64Image = qrCodeImage.split(';base64,').pop();

    qrcode.event_id = eventId;
    qrcode.code_image = {
      data: Buffer.from(base64Image, 'base64'),
      contentType: 'image/png',
    };

    const savedQrCode = await qrcode.save();
    res.set("Content-Type", qrcode.code_image.contentType);
    return res.send(qrcode.code_image.data);
    
  } catch (err) {
    if (!res.headersSent) {
      res.status(400).json({
        error: "Saving QRCODE in DB failed"
      });
    }
  }
};

  
exports.getEventById = (req, res, next) => {
  eventId=req.params.eventId
  Event.find({ _id: eventId }).exec((err, event) => {
    if (err || !event) {
      return res.status(400).json({
        error: "No event was found in DB"
      });
    }
    req.profile = event;
    res.json(event)
    next();
  });
};

exports.getAllEvent = (req, res, next) => {
    Event.find().exec((err, events) => {
      if (err || !events) {
        return res.status(400).json({
          error: "No event was found in DB"
        });
      }
      res.json(events)
    });
  };
  
exports.getEvent = (req, res) => {
    return res.json(req.profile);
};