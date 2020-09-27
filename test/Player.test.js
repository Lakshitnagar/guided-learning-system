const {module, test} = QUnit;

module('Guided Learning System', {
    before: function () {
        this.mockAlert = sinon.stub(window, "alert");
    },

    afterEach: function () {
        $("div.sttip").remove();
    }
});

test('Should handle error', function (assert) {
    var callbackResult = __5szm2kaj({error: 1});

    assert.equal(callbackResult, null, "Should return null by JSONP callback on error responsee");
    assert.equal(this.mockAlert.callCount, 1, "Should call alert only once");
});

test('Should add styling', function (assert) {
    var callbackResult = __5szm2kaj({
        data: {
            css: 'DUMMY_STYLE',
            structure: {
                steps: []
            }
        }
    });

    const isStyleExist = !!$("head style").toArray().find((style) => {
        return style.innerText === 'DUMMY_STYLE';
    });

    assert.equal(isStyleExist, true, "Should add style in head tag as received in response");
});

test('Should first render', function (assert) {
    __5szm2kaj({
        data: {
            css: 'DUMMY_STYLE',
            structure: {
                steps: []
            }
        }
    });
    let guide = $("div.sttip");
    assert.equal(guide.length, 0, "Should not render guide when steps are empty");

    __5szm2kaj({
        data: {
            css: 'DUMMY_STYLE',
            structure: {
                steps: [
                    {
                        action: {
                            selector: "body",
                            classes: "TOOLTIP CLASSES",
                            placement: "RIGHT",
                            "contents": {
                                "#content": "<p>CONTENT</p>"
                            }
                        }
                    }
                ]
            },
            tiplates: {
                tip: '<div role=\"region\" tabindex=\"999\" aria-label=\"Steps\"><div data-iridize-role=\"title\" class=\"popover-title\"><button aria-label=\"Close\" data-iridize-role=\"closeBt\">&#10005;</button></div><div class=\"popover-content\"><div data-iridize-id=\"content\"></div></div><div class=\"stFooter\" data-iridize-id=\"footer\"><div><span class=\"steps-count\">Step <span data-iridize-role=\"stepCount\"></span>/<span data-iridize-role=\"stepsCount\"></span></span><button tabindex=\"999\" class=\"prev-btn default-later-btn\" data-iridize-role=\"laterBt\">Remind me later</button><span class=\"powered-by\">Powered by </span></div><div data-iridize-role=\"nextBtPane\"><button tabindex=\"999\" class=\"prev-btn default-prev-btn\" data-iridize-role=\"prevBt\">Back</button><a tabindex=\"999\" role=\"button\" aria-label=\"Next\" class=\"next-btn\" data-iridize-role=\"nextBt\" href=\"javascript:void(0);\">Next</a></div></div></div>'
            }
        }
    });
    guide = $("div.sttip");
    assert.equal(guide.length, 1, "Should not render guide when at least one stepis there");

    const expectedHTML = '<div class="tooltip TOOLTIP CLASSES in RIGHT" style="position: absolute; display: flex; align-items: center;"><div role="region" tabindex="999" aria-label="Steps" style="border: 1px solid rgb(223, 225, 229); border-radius: 5px; padding: 5px;"><div data-iridize-role="title" class="popover-title"><button aria-label="Close" data-iridize-role="closeBt">✕</button></div><div class="popover-content"><div data-iridize-id="content"><p>CONTENT</p></div></div><div class="stFooter" data-iridize-id="footer"><div><span class="steps-count">Step <span data-iridize-role="stepCount"></span>/<span data-iridize-role="stepsCount"></span></span><button tabindex="999" class="prev-btn default-later-btn" data-iridize-role="laterBt">Remind me later</button><span class="powered-by">Powered by </span></div><div data-iridize-role="nextBtPane"><button tabindex="999" class="prev-btn default-prev-btn" data-iridize-role="prevBt">Back</button><a tabindex="999" role="button" aria-label="Next" class="next-btn" data-iridize-role="nextBt" href="javascript:void(0);">Next</a></div></div></div></div>';
    assert.equal(guide.html(), expectedHTML, "Should match rendered guide");
});
