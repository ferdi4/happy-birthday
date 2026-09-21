"use strict";

function confetti() {
    var Math_random = Math.random,
        Math_cos = Math.cos,
        Math_sin = Math.sin,
        PI = Math.PI,
        TWO_PI = 2 * PI,
        animationFrameId = undefined,
        timeoutId = undefined,
        particles = [],
        splineStep = 0.2;

    var colors = [
        function() { return "rgb(57, 255, 20)"; },
        function() { return "rgb(" + (100 + Math_random() * 155 | 0) + ", 255, 20)"; },
        function() { return "rgb(0, " + (180 + Math_random() * 75 | 0) + ", 255)"; },
        function() { return "rgb(255, " + (180 + Math_random() * 75 | 0) + ", 0)"; },
        function() { return "rgb(241, 196, 15)"; }
    ];

    var container = document.createElement("div");

    function Particle(colorGenerator) {
        this.frame = 0;
        this.outer = document.createElement("div");
        this.inner = document.createElement("div");
        this.outer.appendChild(this.inner);

        var outerStyle = this.outer.style;
        var innerStyle = this.inner.style;

        outerStyle.position = "absolute";
        outerStyle.width = (3 + 9 * Math_random()) + "px";
        outerStyle.height = (3 + 9 * Math_random()) + "px";
        
        innerStyle.width = "100%";
        innerStyle.height = "100%";
        innerStyle.backgroundColor = colorGenerator();
        innerStyle.boxShadow = "0 0 6px " + innerStyle.backgroundColor;
        
        outerStyle.perspective = "50px";
        outerStyle.transform = "rotate(" + (360 * Math_random()) + "deg)";

        this.axis = "rotate3D(" + Math_cos(360 * Math_random()) + "," + Math_cos(360 * Math_random()) + ",0,";
        this.theta = 360 * Math_random();
        this.dTheta = 0.4 + 0.3 * Math_random();
        
        innerStyle.transform = this.axis + this.theta + "deg)";
        this.x = window.innerWidth * Math_random();
        this.y = -100;
        this.dx = Math_sin(-0.1 + 0.2 * Math_random());
        this.dy = 0.13 + 0.18 * Math_random();
        
        outerStyle.left = this.x + "px";
        outerStyle.top = this.y + "px";

        this.splineX = (function() {
            var i = [0.1, 0.9],
                n = 1 - splineStep,
                s = [0, 1];
            while (n) {
                var d = n * Math_random();
                for (var $ = 0, r = i.length, n = 0; $ < r; $ += 2) {
                    var o = i[$], l = i[$ + 1];
                    if (d < n + (l - o)) {
                        s.push(d += o - n);
                        break;
                    }
                    n += l - o;
                }
                for (var u = d - 0.1, f = d + 0.1, $ = i.length - 1; $ > 0; $ -= 2) {
                    var o = i[$ - 1], l = i[$];
                    if (o >= u && o < f) {
                        if (l > f) i[$ - 1] = f;
                        else i.splice($ - 1, 2);
                    } else if (o < u && l > u) {
                        if (l <= f) i[$] = u;
                        else i.splice($, 0, u, f);
                    }
                }
                for (var $ = 0, r = i.length, n = 0; $ < r; $ += 2) {
                    n += i[$ + 1] - i[$];
                }
            }
            return s.sort();
        })();

        this.splineY = [];
        for (var o = 1, l = this.splineX.length - 1; o < l; ++o) {
            this.splineY[o] = 100 * Math_random();
        }
        this.splineY[0] = this.splineY[l] = 100 * Math_random();

        this.update = function(height, dt) {
            this.frame += dt;
            this.x += this.dx * dt;
            this.y += this.dy * dt;
            this.theta += this.dTheta * dt;

            var age = (this.frame % 7777) / 7777;
            var l = 0, a = 1;
            while (age >= this.splineX[a]) {
                l = a++;
            }

            var u = this.splineY[l];
            var f = this.splineY[a];
            var d = (age - this.splineX[l]) / (this.splineX[a] - this.splineX[l]);
            var p = (1 - Math_cos(PI * d)) / 2 * (f - u) + u;

            age *= TWO_PI;
            outerStyle.left = (this.x + p * Math_cos(age)) + "px";
            outerStyle.top = (this.y + p * Math_sin(age)) + "px";
            innerStyle.transform = this.axis + this.theta + "deg)";

            return this.y > height + 100;
        };
    }

    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "0";
    container.style.overflow = "visible";
    container.style.zIndex = "9999";

    (function init() {
        if (!animationFrameId) {
            document.body.appendChild(container);
            var colorIndex = 0;
            
            (function spawn() {
                var randomColorGen = colors[Math_random() * colors.length | 0];
                var p = new Particle(randomColorGen);
                particles.push(p);
                container.appendChild(p.outer);
                timeoutId = setTimeout(spawn, 40 * Math_random());
            })();

            var lastTime = undefined;
            requestAnimationFrame(function loop(time) {
                var dt = lastTime ? time - lastTime : 0;
                lastTime = time;
                var height = window.innerHeight;
                for (var i = particles.length - 1; i >= 0; --i) {
                    if (particles[i].update(height, dt)) {
                        container.removeChild(particles[i].outer);
                        particles.splice(i, 1);
                    }
                }
                if (timeoutId || particles.length) {
                    animationFrameId = requestAnimationFrame(loop);
                } else {
                    document.body.removeChild(container);
                    animationFrameId = undefined;
                }
            });
        }
    })();
}

function initConsole() {
    var today = new Date();
    var greetingPanel = document.getElementById("greeting");
    var cheatingPanel = document.getElementById("cheating");

    var isBirthday = (13 === today.getDate() && 9 === today.getMonth());

    if (isBirthday) {
        document.body.className = "celebration-theme";
        greetingPanel.style.display = "block";
        confetti();

        var celebNeedle = document.getElementById("celebration-needle");
        if (celebNeedle) {
            setInterval(function() {
                var angle = 90 + (Math.random() - 0.5) * 22.5;
                celebNeedle.setAttribute("transform", "rotate(" + angle + ", 50, 50)");
            }, 40);
        }
    } else {
        document.body.className = "warning-theme";
        cheatingPanel.style.display = "block";

        var currentAngle = -90;
        var needle = document.getElementById("gauge-needle");
        if (needle) {
            setInterval(function() {
                var jitter = (Math.random() - 0.5) * 7.5;
                var finalAngle = Math.max(-90, Math.min(95, currentAngle + jitter));
                needle.setAttribute("transform", "rotate(" + finalAngle + ", 50, 50)");
            }, 45);
        }

        var timerElement = document.getElementById("timer");
        if (timerElement) {
            function updateCountdown() {
                var now = new Date();
                var target = new Date(now.getFullYear(), 9, 13);
                if (now > target) {
                    target.setFullYear(now.getFullYear() + 1);
                }
                var diff = target - now;

                var days = Math.floor(diff / (1000 * 60 * 60 * 24));
                var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((diff % (1000 * 60)) / 1000);

                var dStr = String(days).padStart(2, "0");
                var hStr = String(hours).padStart(2, "0");
                var mStr = String(minutes).padStart(2, "0");
                var sStr = String(seconds).padStart(2, "0");

                timerElement.innerText = dStr + "d : " + hStr + "h : " + mStr + "m : " + sStr + "s";

                var totalPeriodMs = 365 * 24 * 60 * 60 * 1000;
                var progress = ((totalPeriodMs - diff) / totalPeriodMs) * 100;
                progress = Math.max(0, Math.min(100, progress));

                currentAngle = -90 + (progress / 100) * 180;

                var temp = 1500 + (progress / 100) * 8500;
                var towerA = 22.4 + (progress / 100) * (95.0 - 22.4);
                var towerB = 21.8 + (progress / 100) * (93.0 - 21.8);
                var pressure = 6.2 + (progress / 100) * (18.5 - 6.2);
                var radiation = 0.12 + Math.pow(progress / 100, 3) * (999.0 - 0.12);

                var tempElement = document.getElementById("metric-temp");
                var percentElement = document.getElementById("metric-percent");
                var towerAElement = document.getElementById("metric-tower-a");
                var towerBElement = document.getElementById("metric-tower-b");
                var pressureElement = document.getElementById("metric-pressure");
                var radiationElement = document.getElementById("metric-radiation");
                var barFillElement = document.getElementById("progress-bar-fill");

                if (tempElement) {
                    tempElement.innerText = temp.toFixed(2) + " °C";
                }
                if (percentElement) {
                    percentElement.innerText = progress.toFixed(4) + "%";
                }
                if (towerAElement) {
                    towerAElement.innerText = towerA.toFixed(2) + " °C";
                }
                if (towerBElement) {
                    towerBElement.innerText = towerB.toFixed(2) + " °C";
                }
                if (pressureElement) {
                    pressureElement.innerText = pressure.toFixed(2) + " MPa";
                }
                if (radiationElement) {
                    radiationElement.innerText = radiation.toFixed(2) + " mSv/h";
                }
                if (barFillElement) {
                    barFillElement.style.width = progress.toFixed(4) + "%";
                }
            }

            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
    }
}

initConsole();
