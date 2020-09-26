const { module, test } = QUnit;

module('Guided Learning System', {
    before: function () {
        this.mockAlert = sinon.stub(window, "alert" );
    }
});

test('Error', function(assert) {
    var callbackResult = __5szm2kaj({error:1});

    assert.equal(callbackResult, null, "Should return null by JSONP callback on error responsee");
    assert.equal(this.mockAlert.callCount, 1, "Should call alert only once");
});

test('Styling', function(assert) {
    var callbackResult = __5szm2kaj({data:{css:'DUMMY_STYLE'}});

    const isStyleExist = !!$("head style").toArray().find((style)=>{
        return style.innerText === 'DUMMY_STYLE';
    });

    assert.equal(isStyleExist, true, "Should add style in head tag as received in response");
});
