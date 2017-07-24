$("#btReset").click(function() {
    $(".button").removeClass("disable");
    reset();
});

$("#btStart").click(function() {
    $(".button").addClass("disable");
    if (!resetted) reset();
    //bubble.sort(data);   
    setTimeout(function() {

        bubble.sort(data);
    }, 0);
    quick.sort(data);


});

$("#btQuick").click(function() {
    $(".button").addClass("disable");
    if (!resetted) reset();
    quick.sort(data);
});

// Array to be sorted
var data = new Array();
var resetted = false;

// Generate array of rundom number and reset panel
function reset() {
    data = [0, 3, 6, 9, 12, 16, 19, 22, 25, 28, 32, 35, 38, 41, 44, 48, 51, 54, 57, 60, 64, 67, 70, 73, 76, 80, 83, 86, 89, 92, 96, 99, 102];
    for (i = data.length - 1; i >= 0; --i) {
        var ridx = ~~(Math.random() * (data.length));
        data.swap(i, ridx);
    }
    var tbA = $("#sortPanelA");
    var tbB = $("#sortPanelB");
    tbA.empty();
    tbB.empty();
    var trA = $("<tr></tr>");
    var trB = $("<tr></tr>");
    for (i = 0; i < data.length; ++i) {
        var trAppendedA = trA.append("<td  id='a" + i + "'>" +
            "<div class='cc' style='height: " + data[i] + "px;'>" +
            "</div></td>");
        var trAppendedB = trB.append("<td  id='b" + i + "'>" +
            "<div class='cc' style='height: " + data[i] + "px;'>" +
            "</div></td>");
    }
    tbA.append(trAppendedA);
    tbB.append(trAppendedB);
    console.log("tbA", tbA);
    resetted = true;
}

//
// Functions queue (for visualization)
//
var wrapFunction = function(fn, context, params) {
    return function() {
        fn.apply(context, params);
    };
}

var funqueue = [];

function swapS(a, b, id) {
    var ca = $("#" + id + a).children("div");
    var cb = $("#" + id + b).children("div");
    ca.removeClass("cc").addClass("ccH1");
    cb.removeClass("cc").addClass("ccH2");
}

function swapP(a, b, id) {
    var ca = $("#" + id + a).children("div");
    var cb = $("#" + id + b).children("div");
    $("#" + id + a).empty().append(cb);
    $("#" + id + b).empty().append(ca);
}

function swapU(a, b, id) {
    var ca = $("#" + id + a).children("div");
    var cb = $("#" + id + b).children("div");
    ca.removeClass("ccH2").addClass("cc");
    cb.removeClass("ccH1").addClass("cc");
}

var memV;

function push(a) {
    memV = $("#b" + a).children("div");
}

function pop(a) {
    $("#b" + a).empty().append(memV)
}

function moveP(a, b) {
    var ca = $("#b" + a).children("div");
    $("#b" + b).empty().append(ca);
}

function pushSwap(a, b, id) {
    var fun1 = wrapFunction(swapS, this, [a, b, id]);
    var fun2 = wrapFunction(swapP, this, [a, b, id]);
    var fun3 = wrapFunction(swapU, this, [a, b, id]);
    funqueue.push(fun1);
    funqueue.push(fun2);
    funqueue.push(fun3);
}

var intQueue;

function runQueue() {
    if (funqueue.length > 0) {
        (funqueue.shift())();
    } else {
        clearInterval(intQueue);
        $(".button").removeClass("disable");
        resetted = false;
    }
}
//
// Functions queue end
//

//
// Array extension for values swapping
//
Array.prototype.swap = function(a, b) {
    var t = this[a];
    this[a] = this[b];
    this[b] = t;
}

//
// Array extension for values swapping with display
//
Array.prototype.swapVerbose = function(a, b, id) {
    pushSwap(a, b, id);
    this.swap(a, b);
}

//
// Bubble sort
//
var bubble = {
    a: null,
    sort: function(arr) {
        intQueue = setInterval(function() { runQueue() }, 0);
        this.a = arr.slice();;
        for (i = this.a.length; i > 0; i--) {
            if (this.a[i] < this.a[i - 1]) {
                this.a.swapVerbose(i - 1, i, "a");
                i = this.a.length;
            }
        }
        return this.a;
    }
}


//
// Quick sort
//
var quick = {
    a: null,
    sort: function(arr) {
        intQueue = setInterval(function() { runQueue() }, 0);
        this.a = arr.slice();
        this.qsort(0, this.a.length - 1);
        return this.a;

    },
    part: function(p, r) {
        var v = this.a[p];
        var i = p;
        var j = r;
        while (true) {
            while (this.a[j] > v) j--;
            while (this.a[i] < v) i++;
            if (i < j) {
                this.a.swapVerbose(i, j, "b");
                i++;
                j--;
            } else {
                return j;
            }
        }
    },
    qsort: function(p, r) {
        if (p < r) {
            var q = this.part(p, r);
            this.qsort(p, q);
            this.qsort(q + 1, r);
        }
    }
}

reset();