import moment from "moment";

export const isEmailValid = (email) => {
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailReg.test(email);
};

export const todoCompare = (a, b) => {
  if (a.nextDueDate) {
    if (b.nextDueDate) {
      return a.nextDueDate - b.nextDueDate;
    } else if (b.dateStamp != "noDueDate") {
      return a.nextDueDate - b.dateStamp;
    } else {
      if(a.nextDueDate <= moment(new Date()).format("YYYYMMDD")) {
        return -1;
      }
      else {
        return 1
      }
    }
  } else if (a.dateStamp != "noDueDate") {
    if (b.nextDueDate) {
      return a.dateStamp - b.nextDueDate;
    } else if (b.dateStamp != "noDueDate") {
      return a.dateStamp - b.dateStamp;
    } else {
        if(a.dateStamp <= moment(new Date()).format("YYYYMMDD")) {
          return -1;
        }
        else {
          return 1
        }
    }
  } else {
    if (b.nextDueDate) {
      if(moment(new Date()).format("YYYYMMDD") < b.nextDueDate) {
        return -1;
      }
      else {
        return 1
      }
    } else if (b.dateStamp != "noDueDate") {
      if(moment(new Date()).format("YYYYMMDD") < b.dateStamp) {
        return -1;
      }
      else {
        return 1
      }
    } else {
      return 0;
    }
  }
};
