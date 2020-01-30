let tool = {
    inherit(origin, target) {
        let F = function () { };
        F.prototype = origin.prototype;
        target.prototype = new F();
    },
    extends(origin) {
        let target = function () {
            origin.apply(this, arguments);
        };
        this.inherit(origin, target);
        return target;
    },
    single(origin) {
        let target = (function () {
            let instance;
            return function () {
                if (typeof instance === 'object') {
                    return instance;
                }
                origin && origin.apply(this, arguments);
                instance = this;
            }
        })();

        origin && this.inherit(origin, target);

        return target;
    }
}




