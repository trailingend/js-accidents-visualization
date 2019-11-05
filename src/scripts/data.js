export const home_line_data = [
    { "year": "1999", "occu": 10, "fata": 1, "inju": 2, "safe": 7 },
    { "year": "2000", "occu": 8, "fata": 0, "inju": 6, "safe": 2 },
    { "year": "2001", "occu": 16, "fata": 1, "inju": 2, "safe": 13 },
    { "year": "2002", "occu": 15, "fata": 0, "inju": 3, "safe": 12 },
    { "year": "2003", "occu": 12, "fata": 0, "inju": 0, "safe": 12 },
    { "year": "2004", "occu": 14, "fata": 5, "inju": 1, "safe": 8 },
    { "year": "2005", "occu": 5, "fata": 0, "inju": 0, "safe": 5 },
    { "year": "2006", "occu": 8, "fata": 0, "inju": 0, "safe": 8 },
    { "year": "2007", "occu": 12, "fata": 1, "inju": 2, "safe": 9 },
    { "year": "2008", "occu": 14, "fata": 2, "inju": 6, "safe": 6 },
    { "year": "2009", "occu": 25, "fata": 5, "inju": 7, "safe": 13 },
    { "year": "2010", "occu": 4, "fata": 0, "inju": 2, "safe": 2 },
    { "year": "2011", "occu": 14, "fata": 1, "inju": 1, "safe": 12 },
    { "year": "2012", "occu": 13, "fata": 0, "inju": 0, "safe": 13 },
    { "year": "2013", "occu": 32, "fata": 6, "inju": 0, "safe": 26 },
    { "year": "2014", "occu": 10, "fata": 0, "inju": 0, "safe": 10 },
    { "year": "2015", "occu": 11, "fata": 2, "inju": 2, "safe": 7 },
    { "year": "2016", "occu": 13, "fata": 1, "inju": 2, "safe": 10 },
    { "year": "2017", "occu": 11, "fata": 0, "inju": 0, "safe": 11 },
    { "year": "2018", "occu": 10, "fata": 0, "inju": 1, "safe": 9 },
    { "year": "2019", "occu": 10, "fata": 0, "inju": 0, "safe": 10 },
];

const targetSVG = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yNTYsNTEyQzExNC42MjUsNTEyLDAsMzk3LjM3NSwwLDI1NlMxMTQuNjI1LDAsMjU2LDBzMjU2LDExNC42MjUsMjU2LDI1NlMzOTcuMzc1LDUxMiwyNTYsNTEyeiBNMjU2LDY0ICBDMTQ5Ljk2OSw2NCw2NCwxNDkuOTY5LDY0LDI1NnM4NS45NjksMTkyLDE5MiwxOTJjMTA2LjAzLDAsMTkyLTg1Ljk2OSwxOTItMTkyUzM2Mi4wMzEsNjQsMjU2LDY0eiBNMjU2LDM4NCAgYy03MC42ODgsMC0xMjgtNTcuMzEyLTEyOC0xMjhjMC03MC42ODgsNTcuMzEyLTEyOCwxMjgtMTI4YzcwLjY4OCwwLDEyOCw1Ny4zMTIsMTI4LDEyOEMzODQsMzI2LjY4OCwzMjYuNjg4LDM4NCwyNTYsMzg0eiIvPjwvc3ZnPg==";

/**
 * Define marker data for each year
 */
export const home_map_data = [ {
	"year": 1999,
	"images": [{
        "imageURL": targetSVG,
        "title": "Vancouver",
        "latitude": 49.2827,
        "longitude": -123.116226
    }, {
        "imageURL": targetSVG,
        "title": "Yorkton",
        "latitude": 51.213890, 
        "longitude": -102.462776
    }, {
        "imageURL": targetSVG,
        "title": "Parksville",
        "latitude": 49.314999, 
        "longitude": -124.311996
    }]
}, {
	"year": 2000,
	"images": [{
        "imageURL": targetSVG,
        "title": "Toronto",
        "latitude": 43.651070,
        "longitude": -79.347015
    }]
}, {
	"year": 2001,
	"images": [{
        "imageURL": targetSVG,
        "title": "Vancouver",
        "latitude": 49.2827,
        "longitude": -123.116226
    }, {
        "imageURL": targetSVG,
        "title": "Yorkton",
        "latitude": 51.213890, 
        "longitude": -102.462776
    }]
}, {
	"year": 2002,
	"images": [{
        "imageURL": targetSVG,
        "title": "Toronto",
        "latitude": 43.651070,
        "longitude": -79.347015
    }, {
        "imageURL": targetSVG,
        "title": "Montreal",
        "latitude": 45.508888,
        "longitude": -73.561668
    }]
}, {
	"year": 2003,
	"images": [{
        "imageURL": targetSVG,
        "title": "Yorkton",
        "latitude": 51.213890, 
        "longitude": -102.462776
    }, {
        "imageURL": targetSVG,
        "title": "Parksville",
        "latitude": 49.314999, 
        "longitude": -124.311996
    }]
}, {
	"year": 2004,
	"images": [{
        "imageURL": targetSVG,
        "title": "Montreal",
        "latitude": 45.508888,
        "longitude": -73.561668
    }]
}, {
	"year": 2005,
	"images": [{
        "imageURL": targetSVG,
        "title": "Vancouver",
        "latitude": 49.2827,
        "longitude": -123.116226
    }, {
        "imageURL": targetSVG,
        "title": "Yorkton",
        "latitude": 51.213890, 
        "longitude": -102.462776
    }, {
        "imageURL": targetSVG,
        "title": "Parksville",
        "latitude": 49.314999, 
        "longitude": -124.311996
    }]
}, {
	"year": 2006,
	"images": [{
        "imageURL": targetSVG,
        "title": "Yorkton",
        "latitude": 51.213890, 
        "longitude": -102.462776
    }]
}, {
	"year": 2007,
	"images": [{
        "imageURL": targetSVG,
        "title": "Vancouver",
        "latitude": 49.2827,
        "longitude": -123.116226
    }]
}, {
	"year": 2008,
	"images": [{
        "imageURL": targetSVG,
        "title": "Montreal",
        "latitude": 45.508888,
        "longitude": -73.561668
    }]
}, {
    "year": 2009,
    "images": [{
        "imageURL": targetSVG,
        "title": "Yorkton",
        "latitude": 51.213890, 
        "longitude": -102.462776
    }]
}, {
    "year": 2010,
    "images": [{
        "imageURL": targetSVG,
        "title": "Vancouver",
        "latitude": 49.2827,
        "longitude": -123.116226
    }, {
        "imageURL": targetSVG,
        "title": "Yorkton",
        "latitude": 51.213890, 
        "longitude": -102.462776
    }, {
        "imageURL": targetSVG,
        "title": "Parksville",
        "latitude": 49.314999, 
        "longitude": -124.311996
    }]
}, {
    "year": 2011,
    "images": [{
        "imageURL": targetSVG,
        "title": "Yorkton",
        "latitude": 51.213890, 
        "longitude": -102.462776
    }, {
        "imageURL": targetSVG,
        "title": "Parksville",
        "latitude": 49.314999, 
        "longitude": -124.311996
    }]
}, {
    "year": 2012,
    "images": [{
        "imageURL": targetSVG,
        "title": "Toronto",
        "latitude": 43.651070,
        "longitude": -79.347015
    }, {
        "imageURL": targetSVG,
        "title": "Montreal",
        "latitude": 45.508888,
        "longitude": -73.561668
    }]
}, {
    "year": 2013,
    "images": [{
        "imageURL": targetSVG,
        "title": "Toronto",
        "latitude": 43.651070,
        "longitude": -79.347015
    }]
}, {
    "year": 2014,
    "images": [{
        "imageURL": targetSVG,
        "title": "Montreal",
        "latitude": 45.508888,
        "longitude": -73.561668
    }]
}, {
    "year": 2015,
    "images": [{
        "imageURL": targetSVG,
        "title": "Yorkton",
        "latitude": 51.213890, 
        "longitude": -102.462776
    }]
}, {
    "year": 2016,
    "images": [{
        "imageURL": targetSVG,
        "title": "Toronto",
        "latitude": 43.651070,
        "longitude": -79.347015
    }, {
        "imageURL": targetSVG,
        "title": "Montreal",
        "latitude": 45.508888,
        "longitude": -73.561668
    }]
}, {
    "year": 2017,
    "images": [{
        "imageURL": targetSVG,
        "title": "Toronto",
        "latitude": 43.651070,
        "longitude": -79.347015
    }]
}, {
    "year": 2018,
    "images": [{
        "imageURL": targetSVG,
        "title": "Yorkton",
        "latitude": 51.213890, 
        "longitude": -102.462776
    }]
}, {
    "year": 2019,
    "images": [{
        "imageURL": targetSVG,
        "title": "Vancouver",
        "latitude": 49.2827,
        "longitude": -123.116226
    }]
} ];