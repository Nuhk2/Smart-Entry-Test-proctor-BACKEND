const validateEmail = (email) => {
  const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email_regex.test(email);
};

module.exports = {
  validateEmail,
};
