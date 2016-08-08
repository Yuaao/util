
    Date.prototype.format = function (format) {
        if (this == null || this.toTimeString() == null || this.toTimeString() == undefined || this.toTimeString() == "Invalid Date")
            return "";
        var o = {
            "M+": this.getMonth() + 1, // month
            "d+": this.getDate(), // day
            "h+": this.getHours(), // hour
            "m+": this.getMinutes(), // minute
            "s+": this.getSeconds(), // second
            "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
            "S": this.getMilliseconds()
            // millisecond
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    Date.prototype.addDays = function (d) {
        this.setDate(this.getDate() + d);
        return this;
    };
    Date.prototype.addMonths = function (m) {
        var d = this.getDate();
        this.setMonth(this.getMonth() + m);
        if (this.getDate() < d) {
            this.setDate(0);
        }
        return this;
    };
    Date.prototype.addYears = function (y) {
        var m = this.getMonth();
        this.setFullYear(this.getFullYear() + y);
        if (m < this.getMonth()) {
            this.setDate(0);
        }
        return this;
    };


    Number.prototype.toFixed = function (s) { //ie8原生的toFixed有问题
        var num = (parseInt(this * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();
        //补零处理
        var l = 0;
        if (num.indexOf(".") == -1) {
            num += ".";
            l = s;
        } else {
            l = s - (num.length - 1 - num.indexOf("."));
        }
        for (var i = 0; i < l; i++) {
            num += "0";
        }
        return num;
    };

    