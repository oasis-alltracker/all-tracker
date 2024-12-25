export const isEmailValid = (email) => {
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailReg.test(email);
};

export const todoCompare = (a, b) => {
  if (a.nextDueDate) {
    if (b.nextDueDate) {
      return a.nextDueDate - b.nextDueDate;
    } else if (b.dateStamp) {
      return a.nextDueDate - b.dateStamp;
    } else {
      return -1;
    }
  } else if (a.dateStamp) {
    if (b.nextDueDate) {
      return a.dateStamp - b.nextDueDate;
    } else if (b.dateStamp) {
      return a.dateStamp - b.dateStamp;
    } else {
      return -1;
    }
  } else {
    if (b.nextDueDate) {
      return 1;
    } else if (b.dateStamp) {
      return 1;
    } else {
      return 0;
    }
  }
};
