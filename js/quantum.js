// This does several things but it's used here for equation numbering.
window.MathJax = {
    tex: {
        tags: 'ams'
    }
};

// This is used to map reference IDs so figures and sections can be linked in the text.
var reference_map = {};

// Fills in references based on content of reference map.
function fillReferences() {
    var refs = document.querySelectorAll("ref-x");

    for (var index in refs) {
        let element = refs[index];
        let target = element.innerHTML;
        element.innerHTML = `<a href="#${target}">${reference_map[target]}</a>`;
    }
}

// Enumerates the figures and places links in the reference map.
function labelFigures() {
    let figcount = 0;

    var figures = document.querySelectorAll("figure");

    for (var index in figures) {
        let element = figures[index];
        if (element.localName == "figure") {
            figcount++;
            let refname = "Figure " + figcount;
            let el = element.lastElementChild;
            el.localName;
            el.innerHTML = refname + ": " + el.innerHTML;
            reference_map[element.getAttribute("id")] = refname;
        }
    }
}

// Generates a random string of given length.
function random_string(length) {
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Places footnotes into a collapsed box, expanded by clicking the index.
function hideFootnotes() {
    var footnotes = document.querySelectorAll("footnote-x");
    for (var index in footnotes) {
        let original = footnotes[index].innerHTML;
        let rn = random_string(10);

        footnotes[index].innerHTML = `<input type="checkbox" id="footnote-${rn}" /><label for="footnote-${rn}"><sup></sup></label><span><br>${original}<br></span>`;
    }
}

// Generates numbers for headings and places links in the reference map.
function labelHeaderNumbers() {
    // Counters for heading numbers.
    let h1count = 0;
    let h2count = 0;
    let h3count = 0;
    let h4count = 0;
    let h5count = 0;
    let h6count = 0;
    let h7count = 0;

    // Find all header tags in order.
    var headers = document.querySelectorAll("h1,h2,h3,h4,h5,h6,h7");

    // Update header innerHTML with section numbers.
    for (var index in headers) {
        let element = headers[index];

        if (element.localName == "h1") {
            h1count++;
            let refname = h1count.toString();
            element.innerHTML = refname + " - " + element.innerHTML;
            element.setAttribute("refname", refname);
            reference_map[element.getAttribute("id")] = refname;
            h2count = 0;
            h3count = 0;
            h4count = 0;
            h5count = 0;
            h6count = 0;
            h7count = 0;
        }
        else if (element.localName == "h2") {
            h2count++;
            let refname = h1count + "." + h2count;
            element.innerHTML = refname + " - " + element.innerHTML;
            element.setAttribute("refname", refname);
            reference_map[element.getAttribute("id")] = refname;
            h3count = 0;
            h4count = 0;
            h5count = 0;
            h6count = 0;
            h7count = 0;

        }
        else if (element.localName == "h3") {
            h3count++;
            let refname = h1count + "." + h2count + "." + h3count;
            element.innerHTML = refname + " - " + element.innerHTML;
            element.setAttribute("refname", refname);
            reference_map[element.getAttribute("id")] = refname;
            h4count = 0;
            h5count = 0;
            h6count = 0;
            h7count = 0;
        }
        else if (element.localName == "h4") {
            h4count++;
            let refname = h1count + "." + h2count + "." + h3count + "." + h4count;
            element.innerHTML = refname + " - " + element.innerHTML;
            element.setAttribute("refname", refname);
            reference_map[element.getAttribute("id")] = refname;
            h5count = 0;
            h6count = 0;
            h7count = 0;
        }
        else if (element.localName == "h5") {
            h5count++;
            let refname = h1count + "." + h2count + "." + h3count + "." + h4count + "." + h5count;
            element.innerHTML = refname + " - " + element.innerHTML;
            element.setAttribute("refname", refname);
            reference_map[element.getAttribute("id")] = refname;
            h6count = 0;
            h7count = 0;
        }
        else if (element.localName == "h6") {
            h6count++;
            let refname = h1count + "." + h2count + "." + h3count + "." + h4count + "." + h5count + "." + h6count;
            element.innerHTML = refname + " - " + element.innerHTML;
            element.setAttribute("refname", refname);
            reference_map[element.getAttribute("id")] = refname;
            h7count = 0;
        }
        else if (element.localName == "h7") {
            h7count++;
            let refname = h1count + "." + h2count + "." + h3count + "." + h4count + "." + h5count + "." + h6count + "." + h7count;
            element.innerHTML = refname + " - " + element.innerHTML;
            element.setAttribute("refname", refname);
            reference_map[element.getAttribute("id")] = refname;
        }
    }
}

// Generate table of contents.
function generateTOC() {
    var toc = document.getElementsByClassName("toc")[0];
    var headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6, h7");

    var tocstring = `<table>`;

    for (var i = 0; i < headers.length; i++) {
        let h = headers[i];
        let strings = h.innerHTML.split(" - ");
        let num = strings[0];
        let title = strings[1];

        if (h.getAttribute("id") !== null) {
            let id = h.getAttribute("id");
            tocstring += `<tr class="${h.localName}"><td>${num}</td><td class="${h.localName}"><a href="#${id}">${". . . ".repeat(h.localName[1]-1)}${title}</a><td></tr>`;
        }
        else {
            tocstring += `<tr class="${h.localName}"><td>${num}</td><td class="${h.localName}">${". . . ".repeat(h.localName[1]-1)}${title}<td></tr>`;
        }

        console.log(num, title);
    }
    console.log(tocstring);
    tocstring += `</table>`;
    toc.innerHTML = tocstring;
}
