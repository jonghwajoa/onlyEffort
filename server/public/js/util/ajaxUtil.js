const ajaxUtil = {
  /**
   * @param {String} url
   * @returns responseText
   */
  sendGetAjax(url, success) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (success(xhr.status)) {
          resolve(xhr.responseText);
        } else {
          reject({ status: xhr.status, message: xhr.responseText });
        }
      };

      xhr.open('GET', url, true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send();
      xhr.onerror = () => reject(req.status);
    });
  }
};
