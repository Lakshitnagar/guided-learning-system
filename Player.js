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
    if(typeof $ === 'undefined') {
        setTimeout(()=>{
            __5szm2kaj(response);
    }, 1000);
        return;
    }
    initStyling(response.data.css);

    let crossDomainStepId = getUrlParameter("GLSCurrStepId");

    let currStep = crossDomainStepId ? getStep(response.data.structure.steps, crossDomainStepId) : response.data.structure.steps[0];

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
    if(prevToolTipRef) prevToolTipRef.remove();
    if(!currStep || currStep.id==="eol0") return;
    if(prevToolTipRef) prevToolTipRef.remove();

    if(currStep.next && currStep.next.event==="click"){
        $(currStep.action.selector).attr('href', $(currStep.action.selector).attr('href')+"&GLSCurrStepId="+currStep.followers[0].next);
    }

    let currToolTip = getToolTip(tooltipData.tiplates);

    if($(currStep.action.selector).length===0 && currStep.action.selector==="input[value=\"Google Search\"]"){
        currStep.action.selector = "button[aria-label=\"Google Search\"] div";
    }

    $(currStep.action.selector).after(currToolTip);

    $("div.tooltip").addClass(currStep.action.classes);
    if(currStep.action.placement){
        $("div.tooltip").addClass("in");
        $("div.tooltip").addClass(currStep.action.placement);
    }
    $("div[aria-label='Steps']").css({
        "background-color": "#fff",
        "border": "1px solid #dfe1e5",
        "border-radius": "5px",
        "padding": "5px",
        "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        "min-width": "330px"
    });

    const content = $.parseHTML(currStep.action.contents['#content']);
    $("div.popover-title").prepend("Guided Learning System");
    $("div[data-iridize-id='content']").append(content);
    $("span[data-iridize-role='stepsCount']").text(tooltipData.structure.steps.length);
    $("span[data-iridize-role='stepCount']").text(currStep.action.stepOrdinal);
    if(currStep.action.roleTexts && currStep.action.roleTexts.nextBt){
        $(".next-btn").text(currStep.action.roleTexts.nextBt);
    }

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

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
