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

    let currStep = response.data.structure.steps[0];

    renderToolTip(null, response.data, currStep);
}

// considering private function
function initStyling(css) {
    var $style = $(`<style>${css}</style>`, {
        type: "text/css"
    });
    let $head = $("head");

    $head.append($style);
}

// considering private function
function renderToolTip(prevToolTipRef, tooltipData, currStep){
    if(!currStep) return;

    if(prevToolTipRef) prevToolTipRef.remove();

    let currToolTip = getToolTip(tooltipData.tiplates);

    $(currStep.action.selector).after(currToolTip);

    $("div.tooltip").addClass(currStep.action.classes);
    if(currStep.action.placement){
        $("div.tooltip").addClass("in");
        $("div.tooltip").addClass(currStep.action.placement);
    }
    $("div[aria-label='Steps']").css({
        "border": "1px solid #dfe1e5",
        "border-radius": "5px",
        "padding": "5px",
        "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    });

    const content = $.parseHTML(currStep.action.contents['#content']);
    $("div[data-iridize-id='content']").append(content);

    $(".next-btn").click(function(){
        renderToolTip(currToolTip, tooltipData, getStep(tooltipData.structure.steps, currStep.followers[0].next));
    });
}

// considering private function
function getToolTip(tiplates) {
    let $tipContainer = $('<div>', {
        class: "sttip"
    });
    $tipContainer.css({
        "background-color": "#fff",
        "position": "absolute",
        "display": "inline"
    });
    let $tipParent = $('<div>', {
        class: "tooltip"
    });
    $tipParent.css({
        "position": "absolute",
        "display": "flex",
        "align-items": "center"
    });
    let tipHtml = $.parseHTML(tiplates.tip);

    $tipParent.append(tipHtml);
    $tipContainer.append($tipParent);

    return $tipContainer;
}

// considering private function
function getStep(steps, stepId) {
    return steps.find(step=>step.id === stepId);
}
