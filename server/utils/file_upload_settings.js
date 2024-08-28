const config = require("../../config/local"),
  multer = require("multer"),
  uniqid = require("uniqid");

const imageMimeTypes = [
  "bmp",
  "gif",
  "ico",
  "jpeg",
  "jpg",
  "png",
  "mp4",
  "doc",
  "docx",
  "pdf",
  "avi",
  "svg",
  "webp",
  "PNG",
  "doc",
  "docx",
  "xml",
  "heic",
];

function sanitizeName(name) {
  let regExp = /[^A-Za-z0-9-_()/]/g;
  return name.replace(regExp, "");
}

function removeNonLastDot(name) {
  let dotsSplit = name.split(".");
  if (dotsSplit.length == 1) {
    return new Error("Invalid mimetype");
  } else if (dotsSplit.length == 2) {
    return name;
  } else {
    name = name.replace(".", "");
    return removeNonLastDot(name);
  }
}

/**
 * @param mimeType
 * @description return extension by supplied mimetype'
 * @returns {(string)}
 */

function getStorage(imageDir, imageUrl) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/upload/${imageDir}`);
    },
    filename: function (req, file, cb) {
      let mimeTypeOfSavedFile;

      if (
        imageMimeTypes.indexOf(
          removeNonLastDot(file.originalname).split(".")[1].toLowerCase()
        ) != -1
      ) {
        if (file.extensionName === ".svg+xml") {
          file.savedName = `${sanitizeName(imageDir)}_${uniqid()}${".svg"}`;
        } else {
          file.savedName = `${sanitizeName(imageDir)}_${uniqid()}${
            file.extensionName
          }`;
        }
        mimeTypeOfSavedFile = file.mimetype.split("/")[0];
      } else {
        let extensionForOtherFileType = removeNonLastDot(
          file.originalname
        ).split(".")[1];
        file.savedName = `${sanitizeName(
          imageDir
        )}_${uniqid()}${extensionForOtherFileType}`;
        mimeTypeOfSavedFile = extensionForOtherFileType;
      }
      req.savedPic.push({
        id: file.savedName,
        name: file.savedName,
        url: `/upload/${imageUrl}/${file.savedName}`,
        mime_type: mimeTypeOfSavedFile,
        original_name: file.originalname,
        field_name: file.fieldname,
      });
      cb(null, file.savedName);
    },
  });
}

// ================ ORDER images =================

let userProfileImagesSetting = multer({
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  storage: getStorage(
    config.imagesDir.USERPROFILE.dir,
    config.imagesDir.USERPROFILE.url
  ),
  fileFilter: function (req, file, callback) {
    if (!file || file == undefined) {
      return callback(null, false);
    } else {
      let fileMimeType = file.mimetype;
      if (!fileMimeType) {
        return callback(new Error("No attachment found"), false);
      }
      var originalname = file.originalname;
      var splt = originalname.split(",");
      var typ = splt[splt.length - 1];
      file.extensionName = "." + typ;
      callback(null, true);
    }
  },
}).fields([
  {
    name: "images",
    maxCount: 10,
  },
]);

let cnicImagesSetting = multer({
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  storage: getStorage(
    config.imagesDir.CNICIMAGE.dir,
    config.imagesDir.CNICIMAGE.url
  ),
  fileFilter: function (req, file, callback) {
    if (!file || file == undefined) {
      return callback(null, false);
    } else {
      let fileMimeType = file.mimetype;
      if (!fileMimeType) {
        return callback(new Error("No attachment found"), false);
      }
      var originalname = file.originalname;
      var splt = originalname.split(",");
      var typ = splt[splt.length - 1];
      file.extensionName = "." + typ;
      callback(null, true);
    }
  },
}).fields([
  {
    name: "images",
    maxCount: 10,
  },
]);
let licenseImagesSetting = multer({
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  storage: getStorage(
    config.imagesDir.LICENSEIMAGE.dir,
    config.imagesDir.LICENSEIMAGE.url
  ),
  fileFilter: function (req, file, callback) {
    if (!file || file == undefined) {
      return callback(null, false);
    } else {
      let fileMimeType = file.mimetype;
      if (!fileMimeType) {
        return callback(new Error("No attachment found"), false);
      }
      var originalname = file.originalname;
      var splt = originalname.split(",");
      var typ = splt[splt.length - 1];
      file.extensionName = "." + typ;
      callback(null, true);
    }
  },
}).fields([
  {
    name: "images",
    maxCount: 10,
  },
]);

let driverImagesSetting = multer({
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  storage: getStorage(
    config.imagesDir.DRIVERIMAGE.dir,
    config.imagesDir.DRIVERIMAGE.url
  ),
  fileFilter: function (req, file, callback) {
    if (!file || file == undefined) {
      return callback(null, false);
    } else {
      let fileMimeType = file.mimetype;
      if (!fileMimeType) {
        return callback(new Error("No attachment found"), false);
      }
      var originalname = file.originalname;
      var splt = originalname.split(",");
      var typ = splt[splt.length - 1];
      file.extensionName = "." + typ;
      callback(null, true);
    }
  },
}).fields([
  {
    name: "images",
    maxCount: 10,
  },
]);

let adminProfileImagesSetting = multer({
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  storage: getStorage(
    config.imagesDir.ADMIN_PROFILE_IMAGE.dir,
    config.imagesDir.ADMIN_PROFILE_IMAGE.url
  ),
  fileFilter: function (req, file, callback) {
    if (!file || file == undefined) {
      return callback(null, false);
    } else {
      let fileMimeType = file.mimetype;
      if (!fileMimeType) {
        return callback(new Error("No attachment found"), false);
      }
      var originalname = file.originalname;
      var splt = originalname.split(",");
      var typ = splt[splt.length - 1];
      file.extensionName = "." + typ;
      callback(null, true);
    }
  },
}).fields([
  {
    name: "images",
    maxCount: 10,
  },
]);

let userProfilePicImagesSetting = multer({
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  storage: getStorage(
    config.imagesDir.USER_PROFILE_IMAGE.dir,
    config.imagesDir.USER_PROFILE_IMAGE.url
  ),
  fileFilter: function (req, file, callback) {
    if (!file || file == undefined) {
      return callback(null, false);
    } else {
      let fileMimeType = file.mimetype;
      if (!fileMimeType) {
        return callback(new Error("No attachment found"), false);
      }
      var originalname = file.originalname;
      var splt = originalname.split(",");
      var typ = splt[splt.length - 1];
      file.extensionName = "." + typ;
      callback(null, true);
    }
  },
}).fields([
  {
    name: "images",
    maxCount: 10,
  },
]);

let laundryProfilePicImagesSetting = multer({
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  storage: getStorage(
    config.imagesDir.LAUNDRY_PROFILE_IMAGE.dir,
    config.imagesDir.LAUNDRY_PROFILE_IMAGE.url
  ),
  fileFilter: function (req, file, callback) {
    if (!file || file == undefined) {
      return callback(null, false);
    } else {
      let fileMimeType = file.mimetype;
      if (!fileMimeType) {
        return callback(new Error("No attachment found"), false);
      }
      var originalname = file.originalname;
      var splt = originalname.split(",");
      var typ = splt[splt.length - 1];
      file.extensionName = "." + typ;
      callback(null, true);
    }
  },
}).fields([
  {
    name: "images",
    maxCount: 10,
  },
]);

let repairItemImagesSetting = multer({
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  storage: getStorage(
    config.imagesDir.REPAIR_ITEM_IMAGE.dir,
    config.imagesDir.REPAIR_ITEM_IMAGE.url
  ),
  fileFilter: function (req, file, callback) {
    if (!file || file == undefined) {
      return callback(null, false);
    } else {
      let fileMimeType = file.mimetype;
      if (!fileMimeType) {
        return callback(new Error("No attachment found"), false);
      }
      var originalname = file.originalname;
      var splt = originalname.split(",");
      var typ = splt[splt.length - 1];
      file.extensionName = "." + typ;
      callback(null, true);
    }
  },
}).fields([
  {
    name: "images",
    maxCount: 10,
  },
]);

let vipOrderImagesSetting = multer({
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  storage: getStorage(
    config.imagesDir.VIP_ORDER_IMAGE.dir,
    config.imagesDir.VIP_ORDER_IMAGE.url
  ),
  fileFilter: function (req, file, callback) {
    if (!file || file == undefined) {
      return callback(null, false);
    } else {
      let fileMimeType = file.mimetype;
      if (!fileMimeType) {
        return callback(new Error("No attachment found"), false);
      }
      var originalname = file.originalname;
      var splt = originalname.split(",");
      var typ = splt[splt.length - 1];
      file.extensionName = "." + typ;
      callback(null, true);
    }
  },
}).fields([
  {
    name: "images",
    maxCount: 10,
  },
]);

let laundryOrderImagesSetting = multer({
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  storage: getStorage(
    config.imagesDir.LAUNDRYORDERIMAGE.dir,
    config.imagesDir.LAUNDRYORDERIMAGE.url
  ),
  fileFilter: function (req, file, callback) {
    if (!file || file == undefined) {
      return callback(null, false);
    } else {
      let fileMimeType = file.mimetype;
      if (!fileMimeType) {
        return callback(new Error("No attachment found"), false);
      }
      var originalname = file.originalname;
      var splt = originalname.split(",");
      var typ = splt[splt.length - 1];
      file.extensionName = "." + typ;
      callback(null, true);
    }
  },
}).fields([
  {
    name: "images",
    maxCount: 10,
  },
]);
//=============================
module.exports = {
  cnicImagesSetting,
  licenseImagesSetting,
  userProfileImagesSetting,
  adminProfileImagesSetting,
  repairItemImagesSetting,
  laundryOrderImagesSetting,
  driverImagesSetting,
  userProfilePicImagesSetting,
  vipOrderImagesSetting,
  laundryProfilePicImagesSetting,
};
