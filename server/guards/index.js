"use strict";
const AccessControl = require("accesscontrol");

const flatList = [
  // Admin permissions
  {
    role: "admin",
    resource: "teachers",
    action: "read",
    possession: "any",
    attributes: ["*"],
  },
  {
    role: "admin",
    resource: "teachers",
    action: "create",
    possession: "any",
    attributes: ["*"],
  },
  {
    role: "admin",
    resource: "teachers",
    action: "update",
    possession: "any",
    attributes: ["*"],
  },
  {
    role: "admin",
    resource: "teachers",
    action: "delete",
    possession: "any",
    attributes: ["*"],
  },
  {
    role: "admin",
    resource: "students",
    action: "read",
    possession: "any",
    attributes: ["*"],
  },
  {
    role: "admin",
    resource: "students",
    action: "create",
    possession: "any",
    attributes: ["*"],
  },
  {
    role: "admin",
    resource: "students",
    action: "update",
    possession: "any",
    attributes: ["*"],
  },
  {
    role: "admin",
    resource: "students",
    action: "delete",
    possession: "any",
    attributes: ["*"],
  },

  // ... other admin permissions ...

  // Teacher permissions
  {
    role: "teacher",
    resource: "teachers",
    action: "read",
    possession: "any",
    attributes: ["*"],
  },
  {
    role: "teacher",
    resource: "students",
    action: "create",
    possession: "any",
    attributes: ["*"],
  },
  // ... other teacher permissions ...

  // Student permissions
  {
    role: "student",
    resource: "students",
    action: "read",
    possession: "any",
    attributes: ["*"],
  },
  // ... other student permissions ...
];
//====== we area initilizing accessControl object here by passing faltList array in AccessControl constuctor ===========
let ac = new AccessControl(flatList);

const checkPermissions = (
  resource,
  action,
  possession,
  attributes,
  extra_actions
) => {
  return async (req, res, next) => {
    try {
      console.log({ req: req.user.role });
      const permission = ac.permission({
        role: req.user.role,
        action: action,
        resource: resource,
        possession: possession,
        attributes: attributes,
      });

      if (permission.granted) {
        let pers = permission.attributes.filter((attr) => attr !== "*");
        let flag = false;
        if (pers.length > 0) {
          let find = pers.find((per) => per === extra_actions);
          if (find) {
            flag = true;
          } else {
            flag = false;
          }
          if (pers.length > 0 && flag) {
            return next();
          } else {
            throw "error";
          }
        }
        return next();
      } else throw "error";
    } catch (e) {
      console.log(e);
      return res.status(403).send({
        status: 403,
        message:
          "you do not have access to this resource. Please contact your admin to get access to this resource. Thank you.",
      });
    }
  };
};
module.exports = {
  checkPermissions,
};
