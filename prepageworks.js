(function () {


    var service = {

        setView: function () {
            var a = "", c = "", b = "<h3>prepageworks.com</h3>";

            for (var i = 1; i <= 352; i++) {
                a = i;
                if (i < 100) a = "00" + i;
                if (i >= 10 && i < 100) a = "0" + i;
                b += "<obj class=\"off\" id=\"key" + a + "\"> </obj>";
            }

            b += "<div class=\"talk\"><canvas width=\"600\" height=\"800\" class=\"talkCanvas\"> </canvas></div>";
            document.body.innerHTML = b;

        },

        bghBlock: function (key, stops, colors) {

            var canvas = document.getElementById(key).getElementsByTagName("canvas")[0];
            if (canvas.getContext) {
                var ctx = canvas.getContext("2d");
                gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                // Add the colors with fixed stops at 1/4 of the width.
                for (var i = 0; i < colors.length; i++)
                    gradient.addColorStop(stops[i], colors[i]);
                // Use the gradient.
                ctx.fillStyle = gradient;
                // Now fill with a solid color

                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.closePath();
            }
        },

        headingTextType: function (key) {

            var canvas = document.getElementById(key).getElementsByTagName("canvas")[0];
            if (canvas.getContext) {
                var ctx = canvas.getContext("2d");
                ctx.font = "normal 140px Arial Black, sans-serif";
                ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
                ctx.fillText("Off-Screen Dev", 0, 108);
                ctx.closePath();
            }
        },


        wrapText: function (context, text, x, y, maxWidth, lineHeight) {

            var words = text.split(' ');
            var line = '';

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
            context.fillText(line, x, y);
        },

        addText: function (text) {

            var canvas = document.getElementsByClassName("talkCanvas")[0];
            var context = canvas.getContext('2d');


            context.clearRect(0, 0, canvas.width, canvas.height);

            var maxWidth = 520;
            var lineHeight = 25;
            var x = (canvas.width - maxWidth) / 2;
            var y = 60;

            context.font = '10.5pt Segoe UI';
            context.fillStyle = '#333';

            service.wrapText(context, text, x, y, maxWidth, lineHeight);
        },



        replacesNode: function (b) {

            var a = document.createElement("Temp");
            a.innerHTML = b;
            var c = document.getElementById(a.firstChild.id);
            c.parentNode.replaceChild(a.firstChild, c);
        }
    }


    function processData(data) {
        // taking care of data
        try {

            if (typeof JSON.parse) {
                var JS = {};
                JS = JSON.parse(data);

                if (JS.ctx.service1)
                    if (JS.ctx.service1.service == "replacesNode")
                        service.replacesNode(JS.ctx.service1.data);
                if (JS.ctx.service2)
                    if (JS.ctx.service2.service == "bghBlock")
                        service.bghBlock(JS.ctx.service2.key, JS.ctx.service2.stops, JS.ctx.service2.colors);
                if (JS.ctx.service3)
                    if (JS.ctx.service3.service == "replacesNode")
                        service.replacesNode(JS.ctx.service3.data);
                if (JS.ctx.service4.service == "headingTextType")
                    service.headingTextType(JS.ctx.service4.key);
                if (JS.ctx.service5)
                    if (JS.ctx.service5.service == "replacesNode")
                        service.replacesNode(JS.ctx.service5.data);
                if (JS.ctx.service6)
                    if (JS.ctx.service6.service == "bghBlock")
                        service.bghBlock(JS.ctx.service6.key, JS.ctx.service6.stops, JS.ctx.service6.colors);
                if (JS.ctx.service7)
                    if (JS.ctx.service7.service == "replacesNode")
                        service.replacesNode(JS.ctx.service7.data);
                if (JS.ctx.service8)
                    if (JS.ctx.service8.service == "bghBlock")
                        service.bghBlock(JS.ctx.service8.key, JS.ctx.service8.stops, JS.ctx.service8.colors);
            }

        } catch (ex) {

            try {
                service.replacesNode(data);
            } catch (ex) {
                ;
            }
        }
    }

    function handler() {
        if (this.readyState == this.DONE) {
            if (this.status == 200 && this.responseXML != null && this.responseXML.getElementsByTagName('*')[0].textContent || this.status == 200 && JSON.parse(this.responseText)) {
                // success!


                processData(this.responseText);
  
                return;
            }
            // something went wrong
            processData(null);
        }
    }

    function LoadFiles(url) {
        var client = new XMLHttpRequest();
        client.onreadystatechange = handler;
        client.open("GET", url, false);
        client.send(null);
    }


    document.onmouseover = function (event) {

        if (event.target.className.match(/(C)(\d{3})/)) {

            var a = event.target.parentNode.offsetLeft + 200;
            var b = event.target.parentNode.offsetTop + 70;

            var c = document.getElementsByClassName("talk")[0];
            c.style.display = "block";
            c.style.left = a + "px";
            c.style.top = b + "px";

            //            alert(event.target.innerText);
            var d = 'The talk pages, based on the structure of the site, are being developed to provide support about each of the boxed objects services. Based on HTML5 canvas, I\'m looking towards an experience where changing screen, page, and font options will be as fluid as possible within the site\'s development.';
            service.addText(d);
        }

        return false;
    }

    document.ondblclick = function (event) {

        if (event.target.className == "talkCanvas") {

            var a = document.getElementsByClassName("talk")[0];
            a.style.display = "none";
        }

        return false;
    }



    window.onload = function () {
        if (typeof document.createNodeIterator != "undefined") {
            service.setView();
            LoadFiles("jSon0010.txt");
            LoadFiles("page0010.xml");
            LoadFiles("page0020.xml");

        }
        else
            alert("Site requires to date browser.");
    }




    document.oncontextmenu = function () {
        var a = "", b = "", c = "";

        scroll(0, 0);
        document.getElementsByClassName("talk")[0].style.display = "none";

        var filter = function (node) {
            return node.className.match(/[CD]/) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        };


        try {

            var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, filter, false);

            var node = iterator.nextNode();

            while (node !== null) {

                a = node.className;
                b = node.parentNode.className;
                c = a.match(/\w/);

                switch (c[0]) {
                    case "C": a = a.replace(/C/, "D"); b = b.replace(/A/, "B"); break;
                    case "D": a = a.replace(/D/, "C"); b = b.replace(/B/, "A"); break;
                    default: break;
                }

                node.className = a;
                node.parentNode.className = b;

                node = iterator.nextNode();
            }

        } catch (ex) {
            ;
        }

        return false;
    }




})();
