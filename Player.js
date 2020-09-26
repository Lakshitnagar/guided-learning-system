// Loading jQuery
jQueryScript = document.createElement('script');
jQueryScript.type = 'text/javascript';
jQueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';

document.getElementsByTagName("head")[0].append(jQueryScript);

// Loading JSONP
GLSScript = document.createElement('script');
GLSScript.type = 'text/javascript';
GLSScript.src = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';

document.getElementsByTagName("head")[0].append(GLSScript);

function __5szm2kaj(response) {
    if (response.error === 1) {
        alert(`Guided Learning System : ${response.errormsg}`);
        return;
    }

    initStyling(response.data.css);
}

function initStyling(css) {
    var $style = $(`<style>${css}</style>`, {
        type: "text/css"
    });
    let $head = $("head");

    $head.append($style);
}
