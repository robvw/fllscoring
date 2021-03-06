/**
    create async style testing, modeled after jasmine-node
    replaces jasmines it by a modified one:
    it(<desc>,<function(<done>)>,[timeout]);

    the runner function can be specified with a 'done' parameter, if so, the test is considered async
    to finish the async test, call the provided done function

    the timeout can be set by an optional third timeout parameter on 'it',
    which defaults to 5000 ms
    the timeout can be globally set by setting jasmine.getEnv().defaultTimeoutInterval
*/
var jit = it;
it = function (desc,runner,timeout) {
    timeout = timeout || jasmine.getEnv().defaultTimeoutInterval || 5000;
    jit(desc,function() {
        var flag = false;
        if (!runner.length) {
            //no done parameter -> sync
            runner();
        } else {
            //done parameter -> async
            runs(function() {
                runner(function done() {
                    flag = true;
                });
            });
            waitsFor(function() {
                return flag;
            },desc,timeout);
        }
    });
};