// "use strict";

let val = 88;

function func() {
    return this;
}
function func2() {
    "use scrict";
    return this;
}

let obj = {
    val : 90,
    
    a   : function () {
        return this;
    },
    b() {
        return this;
    },
    c   : function () {
        "use strict";
        return this;
    },
    d() {
        "use scrict";
        return this;
    },
    xxx : {
        val : 92,
        e   : function () {
            return this;
        },
        f() {
            return this;
        }
    }
};

console.log(func().val);
console.log(func2().val);
console.log(obj.a().val);
console.log(obj.b().val);
console.log(obj.c().val);
console.log(obj.d().val);
console.log(obj.xxx.e().val);
console.log(obj.xxx.f().val);
