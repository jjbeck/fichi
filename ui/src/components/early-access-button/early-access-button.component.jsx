import React from 'react';

export default class EarlyAccessButtonComponent extends React.Component {
    onclickEvent() {
        scrollTo(window.document.body, 0, 1250);
        console.log("testing");
    }
    scrollTo(element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;
            
        var animateScroll = function(){        
            currentTime += increment;
            var val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }
    
    //t = current time //b = start value //c = change in value //d = duration
    easeInOutQuad(t, b, c, d) {
      t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };
    render() {
        return (
            <>
                <button
                    className="filled"
                    id="input-button"
                    onClick={this.onclickEvent}
                >GIVE ME EARLY ACCESS</button>
            </>
        )
    }
}