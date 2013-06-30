var selected_topic = null;

/**
 * @namespace
 */
M.format_grid = M.format_grid || {};
M.format_grid.ourYUI;
M.format_grid.num_sections;
M.format_grid.editing_on;
M.format_grid.update_capability;

M.format_grid.init = function(Y, the_num_sections, the_editing_on, the_update_capability) {
    "use strict";
    this.ourYUI = Y;
    this.num_sections = the_num_sections;
    this.editing_on = the_editing_on;
    this.update_capability = the_update_capability;
};

M.format_grid.hide_sections = function () {
    //Have to hide the div's using javascript so they are visible if javascript is disabled.
    var grid_sections = getElementsByClassName(document.getElementById("middle-column"), "li", "grid_section");
    for(var i = 0; i < grid_sections.length; i++) {
        grid_sections[i].style.display = 'none';
    }
    //Remove href link from icon anchors so they don't compete with javascript onlick calls
    var icon_links = getElementsByClassName(document.getElementById("iconContainer"), "a", "icon_link");
    for(var i = 0; i < icon_links.length; i++) {
        icon_links[i].href = "#";
    }
    document.getElementById("shadebox_close").style.display = "";

    this.initialize_shadebox();
    this.update_shadebox();
    window.onresize = function() {
        this.update_shadebox();
    }
}

M.format_grid.select_topic = function(evt, topic_no) {
    if ((this.editing_on == true) && (this.update_capability == true)) {
        //Scroll to the selected topic, don't hide anything.
        //Don't do anything if the edit link has been clicked.
        if((evt.srcElement||evt.target).parentNode.nodeName == "A") {
            return;
        }
        document.getElementById("section-"+topic_no).style.display = "";
        window.scroll(0,document.getElementById("section-"+topic_no).offsetTop);
    } else {
        //Make the selected topic visible, scroll to it and hide all other topics.
        if(selected_topic != null) {
            document.getElementById('section-'+selected_topic).style.display = "none";
        }
        selected_topic = topic_no;

        document.getElementById("section-"+topic_no).style.display = "";
        //window.scroll(0,document.getElementById("section-"+topic_no).offsetTop);
        this.toggle_shadebox();
    }
    return true;
}

/** Below is shadebox code **/
M.format_grid.shadebox_open;

M.format_grid.initialize_shadebox = function() {
    this.shadebox_open = false;
    this.hide_shadebox();

    document.getElementById('shadebox_overlay').style.display="";
    document.body.appendChild(document.getElementById('shadebox'));

    var content = document.getElementById('shadebox_content');
    content.style.position = 'absolute';
    content.style.width = '800px';
    content.style.top = '50px';
    content.style.left = '50%';
    content.style.marginLeft = '-400px';
    content.style.zIndex = '9000001';
}

M.format_grid.toggle_shadebox = function() {
    if(this.shadebox_open) {
        this.hide_shadebox();
        this.shadebox_open = false;
        window.scrollTo(0, 0);
    } else {
        this.show_shadebox();
        this.shadebox_open = true;
    }
}

M.format_grid.show_shadebox = function() {
    this.update_shadebox();
    document.getElementById("shadebox").style.display = "";
    this.update_shadebox();
}

M.format_grid.hide_shadebox = function() {
    document.getElementById("shadebox").style.display = "none";
}

//code from quirksmode.org
//author unknown.
M.format_grid.get_page_size = function() {
    var xScroll, yScroll;
    if(window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if(document.body.scrollHeight > document.body.offsetHeight) { //all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else { //Explorer Mac ... also works in Explorer 6 strict and safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if(self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if(document.documentElement && document.documentElement.clientHeight) { //Explorer 6 strict mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if(document.body) { //other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    //for small pages with total height less than height of the viewport
    if(yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }

    //for small pages with total width less than width of the viewport
    if(xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }

    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
    return arrayPageSize;
}

M.format_grid.update_shadebox = function() {
    //Make the overlay fullscreen (width happens automatically, so just update the height)
    var overlay = document.getElementById("shadebox_overlay");
    var pagesize = this.get_page_size();
    overlay.style.height = pagesize[1] + "px";
}
