window.soceurHelpers = window.soceurHelpers || {};
window.soceurHelpers.getFormDigest = function () {
    return $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + '/_api/contextinfo',
        type: 'POST',
        headers: { accept: 'application/json;odata=verbose' }
    }).then(function (data) {
        return data.d.GetContextWebInformation.FormDigestValue;
    });
}