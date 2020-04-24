require([
  "/static/app/SPA/js/api/api.js",
  "/static/app/SPA/js/helper/helper.js",
  "splunkjs/mvc",
  "splunkjs/mvc/textinputview",
  "splunkjs/mvc/simplexml/ready!"
], function(API, helper, mvc, TextInputView) {
  const tokens = mvc.Components.get("default");

  // populate the input field with the value of the cookie if set
  const baseURLValue = helper.splitString("baseURL", document.cookie);
  if (baseURLValue !== undefined) {
    tokens.set("baseURL", baseURLValue);
  }

  new TextInputView({
    id: "baseURL",
    value: mvc.tokenSafe("$baseURL$"),
    el: $("#base-url")
  }).render();

  // whenever the user inputs a new base URL - update the browser cookie
  tokens.on("change:baseURL", token => {
    const baseURL = token.changed.baseURL;

    const lastChar = baseURL.slice(-1);

    if (lastChar === "/") {
      
      document.cookie = `baseURL=${baseURL}; expires=Thu, 18 Dec 2030 12:00:00 UTC`;
      const successMsg = "Successfully set Base URL";
      $(".configure-msg").html(successMsg);

    } else {

      const errorMsg = 'Please ensure the URL ends with a "/"';
      $(".configure-msg").html(errorMsg);
      
    }
  });
});
